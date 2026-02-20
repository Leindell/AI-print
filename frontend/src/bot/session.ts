import { Context, Middleware } from 'telegraf';
import db from './db';

interface SessionStore<T> {
  get: (key: string) => Promise<T | undefined>;
  set: (key: string, session: T) => Promise<void>;
  delete: (key: string) => Promise<void>;
}

export function sqliteSession<C extends Context>(options?: {
  property?: string;
  store?: SessionStore<any>;
  getSessionKey?: (ctx: C) => string | undefined;
}): Middleware<C> {
  const property = options?.property || 'session';
  
  const getSessionKey = options?.getSessionKey || function(ctx: C) {
    if (ctx.from && ctx.chat) {
      return `${ctx.from.id}:${ctx.chat.id}`;
    }
    return undefined;
  };

  return async (ctx, next) => {
    const key = getSessionKey(ctx);
    if (!key) {
      return next();
    }

    let session = {};
    
    // Load session
    const row = db.prepare('SELECT session FROM sessions WHERE key = ?').get(key) as { session: string } | undefined;
    if (row) {
      try {
        session = JSON.parse(row.session);
      } catch (e) {
        console.error('Failed to parse session:', e);
      }
    }

    Object.defineProperty(ctx, property, {
      get: function() { return session; },
      set: function(newValue) { session = Object.assign({}, newValue); }
    });

    await next();

    // Save session
    if (Object.keys(session).length === 0) {
      db.prepare('DELETE FROM sessions WHERE key = ?').run(key);
    } else {
      const sessionStr = JSON.stringify(session);
      db.prepare('INSERT OR REPLACE INTO sessions (key, session) VALUES (?, ?)').run(key, sessionStr);
    }
  };
}
