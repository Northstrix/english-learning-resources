'use client';

import React, { useState, useEffect } from 'react';
import { Settings, X, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

/**
 * ControlGroup is moved outside to prevent re-mounting on every state change,
 * which was causing the loss of focus and dragging state.
 */
function ControlGroup({ label, value, onChange }: { 
  label: string, 
  value: number, 
  onChange: (val: number[]) => void 
}) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between text-[10px] font-mono uppercase tracking-tighter">
        <span className="text-white/40">{label}</span>
        <span className="text-primary font-bold">{value.toFixed(2)}rem</span>
      </div>
      <div className="relative h-6 flex items-center">
        <Slider 
          value={[value]} 
          min={0.125} 
          max={5.0} 
          step={0.05} 
          onValueChange={onChange} 
          className="cursor-pointer"
        />
      </div>
    </div>
  );
}

export default function DebugModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const [values, setValues] = useState({
    h2SizeMobile: 1.875,
    h2SizeDesktop: 2.275,
    h2MtMobile: 2.0,
    h2MtDesktop: 3.33,
    h2MbMobile: 0.75,
    h2MbDesktop: 0.75,
    pSizeMobile: 1.0,
    pSizeDesktop: 1.125,
    pMtMobile: 0.0,
    pMtDesktop: 0.0,
    pMbMobile: 1.0,
    pMbDesktop: 1.0,
    disclaimerMb: 3.0,
  });

  useEffect(() => {
    const root = document.documentElement;
    
    root.style.setProperty('--h2-size-mobile', `${values.h2SizeMobile}rem`);
    root.style.setProperty('--h2-size-desktop', `${values.h2SizeDesktop}rem`);
    root.style.setProperty('--h2-mt-mobile', `${values.h2MtMobile}rem`);
    root.style.setProperty('--h2-mt-desktop', `${values.h2MtDesktop}rem`);
    root.style.setProperty('--h2-mb-mobile', `${values.h2MbMobile}rem`);
    root.style.setProperty('--h2-mb-desktop', `${values.h2MbDesktop}rem`);
    
    root.style.setProperty('--p-size-mobile', `${values.pSizeMobile}rem`);
    root.style.setProperty('--p-size-desktop', `${values.pSizeDesktop}rem`);
    root.style.setProperty('--p-mt-mobile', `${values.pMtMobile}rem`);
    root.style.setProperty('--p-mt-desktop', `${values.pMtDesktop}rem`);
    root.style.setProperty('--p-mb-mobile', `${values.pMbMobile}rem`);
    root.style.setProperty('--p-mb-desktop', `${values.pMbDesktop}rem`);
    
    root.style.setProperty('--disclaimer-mb', `${values.disclaimerMb}rem`);
  }, [values]);

  const updateValue = (key: keyof typeof values, val: number[]) => {
    setValues((prev) => ({ ...prev, [key]: val[0] }));
  };

  const handleCopy = () => {
    const config = JSON.stringify(values, null, 2);
    navigator.clipboard.writeText(config);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[3000] p-3 bg-primary rounded-full shadow-2xl hover:scale-110 transition-transform"
      >
        <Settings className="w-6 h-6 text-white" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[4000] flex items-end justify-end p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className="w-full max-w-md bg-[#0a0a0a] border border-white/10 p-6 pointer-events-auto shadow-2xl overflow-y-auto max-h-[90vh] custom-scrollbar"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex flex-col">
                  <h3 className="text-lg font-black tracking-tighter uppercase m-0 leading-tight">Style Debugger</h3>
                  <span className="text-[10px] text-white/40 font-mono">Mobile vs Desktop Granular Controls</span>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white p-2">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-12">
                {/* H2 Tuning */}
                <div className="space-y-6 pt-4 border-t border-white/5">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-primary">Heading 2 (H2)</label>
                  
                  {/* Mobile H2 */}
                  <div className="space-y-6">
                    <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest block mb-2 border-b border-white/5 pb-1">Mobile</span>
                    <ControlGroup label="Size" value={values.h2SizeMobile} onChange={(v) => updateValue('h2SizeMobile', v)} />
                    <ControlGroup label="Top Margin" value={values.h2MtMobile} onChange={(v) => updateValue('h2MtMobile', v)} />
                    <ControlGroup label="Bottom Margin" value={values.h2MbMobile} onChange={(v) => updateValue('h2MbMobile', v)} />
                  </div>

                  {/* Desktop H2 */}
                  <div className="space-y-6 pt-4">
                    <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest block mb-2 border-b border-white/5 pb-1">Desktop</span>
                    <ControlGroup label="Size" value={values.h2SizeDesktop} onChange={(v) => updateValue('h2SizeDesktop', v)} />
                    <ControlGroup label="Top Margin" value={values.h2MtDesktop} onChange={(v) => updateValue('h2MtDesktop', v)} />
                    <ControlGroup label="Bottom Margin" value={values.h2MbDesktop} onChange={(v) => updateValue('h2MbDesktop', v)} />
                  </div>
                </div>

                {/* Paragraph Tuning */}
                <div className="space-y-6 pt-4 border-t border-white/5">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-primary">Paragraph (P)</label>
                  
                  {/* Mobile P */}
                  <div className="space-y-6">
                    <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest block mb-2 border-b border-white/5 pb-1">Mobile</span>
                    <ControlGroup label="Size" value={values.pSizeMobile} onChange={(v) => updateValue('pSizeMobile', v)} />
                    <ControlGroup label="Top Margin" value={values.pMtMobile} onChange={(v) => updateValue('pMtMobile', v)} />
                    <ControlGroup label="Bottom Margin" value={values.pMbMobile} onChange={(v) => updateValue('pMbMobile', v)} />
                  </div>

                  {/* Desktop P */}
                  <div className="space-y-6 pt-4">
                    <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest block mb-2 border-b border-white/5 pb-1">Desktop</span>
                    <ControlGroup label="Size" value={values.pSizeDesktop} onChange={(v) => updateValue('pSizeDesktop', v)} />
                    <ControlGroup label="Top Margin" value={values.pMtDesktop} onChange={(v) => updateValue('pMtDesktop', v)} />
                    <ControlGroup label="Bottom Margin" value={values.pMbDesktop} onChange={(v) => updateValue('pMbDesktop', v)} />
                  </div>
                </div>

                {/* Global Spacing */}
                <div className="space-y-4 pt-4 border-t border-white/5">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-primary">Miscellaneous</label>
                  <ControlGroup label="Disclaimer Bottom Margin" value={values.disclaimerMb} onChange={(v) => updateValue('disclaimerMb', v)} />
                </div>

                <div className="pt-8 pb-4">
                  <div className="bg-[#111] p-4 border border-white/5 mb-4">
                    <pre className="text-[9px] text-white/40 font-mono overflow-hidden">
                      {JSON.stringify(values, null, 2)}
                    </pre>
                  </div>
                  <Button 
                    onClick={handleCopy}
                    className="w-full flex items-center justify-center gap-2 font-black"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'CONFIG COPIED!' : 'COPY CONFIG JSON'}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
