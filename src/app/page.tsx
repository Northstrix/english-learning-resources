'use client';

import React, { useRef, useEffect } from 'react';
import TourCard from '@/components/TourCard';
import { blogs } from '@/lib/blog-data';

class HeroSimulationNode {
  x: number;
  y: number;
  radius: number;
  color: string;
  text: string;
  dx: number;
  dy: number;
  isPrimary: boolean;
  textWidth: number = 0;

  constructor(x: number, y: number, radius: number, color: string, text: string, isPrimary: boolean = false) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.text = text;
    this.dx = (Math.random() - 0.5) * 1.2;
    this.dy = (Math.random() - 0.5) * 1.2;
    this.isPrimary = isPrimary;
  }

  update(ctx: CanvasRenderingContext2D, bounds: { width: number, height: number }) {
    if (this.textWidth === 0) {
      ctx.font = `bold ${this.isPrimary ? '20px' : '16px'} Inter`;
      this.textWidth = ctx.measureText(this.text).width;
    }

    const gap = 12;
    const totalWidth = this.radius + gap + this.textWidth;
    
    this.x += this.dx;
    this.y += this.dy;

    const leftBoundary = this.radius;
    const rightBoundary = bounds.width - (totalWidth - this.radius);
    const topBoundary = this.radius;
    const bottomBoundary = bounds.height - this.radius;

    if (this.x < leftBoundary) { this.x = leftBoundary; this.dx = Math.abs(this.dx); }
    else if (this.x > rightBoundary) { this.x = rightBoundary; this.dx = -Math.abs(this.dx); }

    if (this.y < topBoundary) { this.y = topBoundary; this.dy = Math.abs(this.dy); }
    else if (this.y > bottomBoundary) { this.y = bottomBoundary; this.dy = -Math.abs(this.dy); }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.shadowBlur = 15;
    ctx.shadowColor = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
    
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#fff";
    ctx.font = `bold ${this.isPrimary ? '20px' : '16px'} Inter`;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(this.text, this.x + this.radius + 12, this.y);
    ctx.restore();
  }
}

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<HeroSimulationNode[]>([]);
  const requestRef = useRef<number>(0);

  const heroNodes = [
    { text: 'English', isPrimary: true, color: '#146DE9' },
    { text: 'Nuances', color: '#aaaaaa' },
    { text: 'Vocabulary', color: '#aaaaaa' },
    { text: 'Tenses', color: '#aaaaaa' },
    { text: 'Culture', color: '#aaaaaa' }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      const nodes: HeroSimulationNode[] = [];
      heroNodes.forEach((node) => {
        let x, y, tooClose;
        let attempts = 0;
        do {
          x = centerX + (Math.random() - 0.5) * (canvas.width * 0.6);
          y = centerY + (Math.random() - 0.5) * (canvas.height * 0.6);
          tooClose = nodes.some(n => Math.abs(n.x - x) < 40 && Math.abs(n.y - y) < 40);
          attempts++;
        } while (tooClose && attempts < 100);
        
        nodes.push(new HeroSimulationNode(x, y, node.isPrimary ? 12 : 8, node.color, node.text, node.isPrimary));
      });
      nodesRef.current = nodes;
    };

    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const primaryNode = nodesRef.current.find(n => n.isPrimary);
      
      if (primaryNode) {
        ctx.save();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        nodesRef.current.forEach(node => {
          if (node !== primaryNode) {
            ctx.beginPath();
            ctx.moveTo(primaryNode.x, primaryNode.y);
            ctx.lineTo(node.x, node.y);
            ctx.stroke();
          }
        });
        ctx.restore();
      }

      nodesRef.current.forEach(node => {
        node.update(ctx, { width: canvas.width, height: canvas.height });
        node.draw(ctx);
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div className="px-6 md:px-12 pb-12 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="relative w-full min-h-[260px] max-h-[520px] h-[40vh] mb-6 border border-white/5 bg-[#0D0D0D] overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </section>

      <section id="blog" className="space-y-8">
        <div className="flex items-end justify-between border-b border-white/10 pb-6">
          <h2 className="text-3xl md:text-4xl tracking-tighter font-headline font-black text-white leading-none mt-0 mb-0">Blog</h2>
        </div>
        
        <div className="grid grid-cols-1 min-[860px]:grid-cols-2 gap-8">
          {blogs.map((blog) => (
            <TourCard key={blog.id} {...blog} />
          ))}
        </div>
      </section>
    </div>
  );
}
