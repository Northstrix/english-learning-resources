'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface NodeData {
  text: string;
  color?: string;
  isPrimary?: boolean;
}

interface TourCardProps {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  description: string;
  backgroundText: string;
  visualization: {
    nodes: NodeData[];
  };
}

class SimulationNode {
  x: number;
  y: number;
  radius: number;
  color: string;
  text: string;
  dx: number;
  dy: number;
  isPrimary: boolean;
  opacity: number;
  textWidth: number = 0;

  constructor(x: number, y: number, radius: number, color: string, text: string, isPrimary: boolean = false) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.text = text;
    this.dx = (Math.random() - 0.5) * 1.5;
    this.dy = (Math.random() - 0.5) * 1.5;
    this.isPrimary = isPrimary;
    this.opacity = 0;
  }

  update(ctx: CanvasRenderingContext2D, bounds: { width: number, height: number }, isActive: boolean) {
    if (this.textWidth === 0) {
      ctx.font = `bold ${this.isPrimary ? '18px' : '16px'} Inter`;
      this.textWidth = ctx.measureText(this.text).width;
    }

    const gap = 12;
    const totalWidth = this.radius + gap + this.textWidth;
    
    if (isActive) {
      this.opacity = Math.min(this.opacity + 0.05, 1);
      
      this.x += this.dx;
      this.y += this.dy;

      const leftBoundary = this.radius;
      const rightBoundary = bounds.width - (totalWidth - this.radius);
      const topBoundary = this.radius;
      const bottomBoundary = bounds.height - this.radius;

      if (this.x < leftBoundary) {
        this.x = leftBoundary;
        this.dx = Math.abs(this.dx);
      } else if (this.x > rightBoundary) {
        this.x = rightBoundary;
        this.dx = -Math.abs(this.dx);
      }

      if (this.y < topBoundary) {
        this.y = topBoundary;
        this.dy = Math.abs(this.dy);
      } else if (this.y > bottomBoundary) {
        this.y = bottomBoundary;
        this.dy = -Math.abs(this.dy);
      }
    } else {
      this.opacity = Math.max(this.opacity - 0.05, 0);
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.opacity <= 0) return;

    ctx.save();
    ctx.globalAlpha = this.opacity;
    
    ctx.shadowBlur = 12;
    ctx.shadowColor = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
    
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#fff";
    ctx.font = `bold ${this.isPrimary ? '18px' : '16px'} Inter`;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(this.text, this.x + this.radius + 12, this.y);
    ctx.restore();
  }
}

export default function TourCard({ id, title, category, date, readTime, description, backgroundText, visualization }: TourCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [currentBgText, setCurrentBgText] = useState(backgroundText);
  const [bgFontSize, setBgFontSize] = useState('8rem');
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<SimulationNode[]>([]);
  const requestRef = useRef<number>(0);

  const updateFontSize = () => {
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth;
      const calculatedSize = Math.max(width * 0.2, 60);
      setBgFontSize(`${calculatedSize}px`);
    }
  };

  useEffect(() => {
    updateFontSize();
    setCurrentBgText(backgroundText);

    const timer = setTimeout(() => {
      updateFontSize();
    }, 1000);

    window.addEventListener('resize', updateFontSize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateFontSize);
    };
  }, [backgroundText]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isHovered) {
      setShouldRender(true);
    } else {
      timeout = setTimeout(() => {
        setShouldRender(false);
      }, 2000);
    }
    return () => clearTimeout(timeout);
  }, [isHovered]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !shouldRender) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      nodesRef.current = visualization.nodes.map((node) => {
        const isPrimary = node.isPrimary;
        const x = centerX + (Math.random() - 0.5) * (canvas.width * 0.4);
        const y = centerY + (Math.random() - 0.5) * (canvas.height * 0.4);
        return new SimulationNode(x, y, isPrimary ? 10 : 8, node.color || '#146DE9', node.text, isPrimary);
      });
    };

    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const primaryNode = nodesRef.current.find(n => n.isPrimary);
      
      if (primaryNode && primaryNode.opacity > 0) {
        ctx.save();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        nodesRef.current.forEach(node => {
          if (node !== primaryNode && node.opacity > 0) {
            ctx.beginPath();
            ctx.moveTo(primaryNode.x, primaryNode.y);
            ctx.lineTo(node.x, node.y);
            ctx.stroke();
          }
        });
        ctx.restore();
      }

      nodesRef.current.forEach(node => {
        node.update(ctx, { width: canvas.width, height: canvas.height }, isHovered);
        node.draw(ctx);
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(requestRef.current);
    };
  }, [visualization, shouldRender, isHovered]);

  return (
    <Link href={`/blog/${id}`} className="block h-full no-underline">
      <motion.div 
        ref={containerRef}
        className="group bg-[#0a0a0a] border border-[#1e1e1e] flex flex-col h-full relative overflow-hidden px-1"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial="initial"
        whileHover="animate"
        style={{ borderRadius: '0px' }}
      >
        <div className="px-5 py-6 flex flex-col gap-6">
          <div className="relative w-full aspect-[21/9] overflow-hidden border border-[#1e1e1e] bg-[#0d0d0d]">
            <motion.div 
              initial={{ opacity: 1 }}
              animate={{ opacity: isHovered ? 0 : 1 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <span 
                className="font-headline font-black uppercase tracking-tighter select-none opacity-30"
                style={{ 
                  WebkitTextStroke: '1px rgba(255, 255, 255, 0.53)',
                  color: 'transparent',
                  fontSize: bgFontSize
                }}
              >
                {currentBgText}
              </span>
            </motion.div>

            <AnimatePresence>
              {shouldRender && (
                <motion.canvas 
                  ref={canvasRef} 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="w-full h-full block absolute inset-0"
                />
              )}
            </AnimatePresence>
          </div>
          
          <div className="flex-1 flex flex-col gap-4 items-start">
            <div className="font-headline relative text-left">
              <h3 className="text-xl md:text-2xl tracking-tighter leading-none relative z-10 transition-colors duration-300 text-white font-black">
                <span className="relative inline-block">
                  <span className="relative z-10">{title}</span>
                  <span 
                    className={cn(
                      "absolute inset-y-0 inset-x-0 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 -z-10 origin-left"
                    )} 
                  />
                </span>
              </h3>
              <div className="flex items-center gap-3 mt-2 text-[10.5px] font-mono tracking-widest text-[#aaaaaa]">
                <span className="text-primary font-bold">{category}</span>
                <span className="opacity-30">|</span>
                <span className="opacity-60">{date}</span>
                <span className="opacity-30">|</span>
                <span className="opacity-60">{readTime}</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-[#aaaaaa] opacity-60">
              {description}
            </p>
          </div>
        </div>

        <div className="mt-auto px-6 py-6 flex items-center justify-between gap-6 w-[calc(100%+8px)] bg-[#111] -mx-1 border-t border-white/5">
          <div className="relative font-body text-left">
            <span className="font-medium text-lg text-white transition-colors duration-300">
              Read Article
            </span>
          </div>
          <div className="w-10 h-10 border border-white/10 flex items-center justify-center bg-transparent group-hover:bg-primary group-hover:border-primary transition-all duration-300">
            <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
              <path d="M8.14645 3.14645C8.34171 2.95118 8.65827 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65827 12.8536 7.85355L8.85355 11.8536C8.65827 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65827 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
