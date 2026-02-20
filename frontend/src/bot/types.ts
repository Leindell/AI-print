import { Context, Scenes } from 'telegraf';

export interface OrderSession extends Scenes.WizardSessionData {
  service?: string;
  unitPrice?: number;
  size?: string;
  qty?: number;
  comment?: string;
  files?: { file_id: string; type: 'document' | 'photo' }[];
}

export interface BotContext extends Context {
  session: {
    __scenes: Scenes.WizardSessionData;
    order: OrderSession;
  };
  scene: Scenes.SceneContextScene<BotContext, Scenes.WizardSessionData>;
  wizard: Scenes.WizardContextWizard<BotContext>;
}
