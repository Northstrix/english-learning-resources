'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const ModalOverlay = ({ 
  children, 
  onClose 
}: { 
  children: React.ReactNode; 
  onClose: () => void; 
}) => {
  return (
    <div className="fixed inset-0 z-[2500] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      {children}
    </div>
  );
};