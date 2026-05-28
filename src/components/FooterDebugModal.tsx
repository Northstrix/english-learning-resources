'use client';

import React, { useState, useEffect } from 'react';
import { Settings, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Slider } from '@/components/ui/slider';

export default function FooterDebugModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(10);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--footer-credits-size', `${fontSize}px`);
  }, [fontSize]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-[3000] p-3 bg-primary rounded-full shadow-2xl hover:scale-110 transition-transform"
      >
        <Settings className="w-5 h-5 text-white" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[4000] flex items-end justify-end p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className="w-full max-w-sm bg-[#0a0a0a] border border-white/10 p-6 pointer-events-auto shadow-2xl"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex flex-col">
                  <h3 className="text-sm font-black tracking-widest uppercase m-0 leading-tight text-white">Footer Styling</h3>
                  <span className="text-[10px] text-white/40 font-mono">Credits Size Adjustment</span>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white p-2">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-8">
                <div>
                  <div className="flex justify-between text-[10px] mb-2 font-mono uppercase text-primary">
                    <span>Credits Font Size</span>
                    <span>{fontSize}px</span>
                  </div>
                  <Slider 
                    value={[fontSize]} 
                    min={8} 
                    max={20} 
                    step={0.5} 
                    onValueChange={(v) => setFontSize(v[0])} 
                  />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
