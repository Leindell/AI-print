import React from 'react';
import { motion } from 'motion/react';

export const About: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 text-center text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-4 text-4xl font-bold">О студии</h1>
        <p className="text-zinc-400">Мы — команда профессионалов, любящих свое дело.</p>
      </motion.div>
    </div>
  );
};
