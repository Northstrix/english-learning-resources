"use client";

import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
  memo,
  CSSProperties,
} from "react";
import { Dices } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
  animate,
} from "framer-motion";
import RefinedChronicleButton from "./RefinedChronicleButton";

interface InternalGlowingEffectProps {
  blur?: number;
  inactiveZone?: number;
  proximity?: number;
  spread?: number;
  className?: string;
  disabled?: boolean;
  movementDuration?: number;
  borderWidth?: number;
  gradient?: string;
  staticMode?: boolean;
  staticAngle?: number;
  borderRadius: string;
}

const InternalGlowingEffect = memo(
  ({
    blur = 0,
    inactiveZone = 0.7,
    proximity = 0,
    spread = 20,
    className,
    movementDuration = 2,
    borderWidth = 1,
    disabled = false,
    gradient,
    staticMode = false,
    staticAngle = 0,
    borderRadius,
  }: InternalGlowingEffectProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const lastPosition = useRef({ x: 0, y: 0 });
    const animationFrameRef = useRef<number>(0);

    const handleMove = useCallback(
      (e?: MouseEvent | { x: number; y: number }) => {
        if (!containerRef.current || staticMode) return;
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);

        animationFrameRef.current = requestAnimationFrame(() => {
          const element = containerRef.current!;
          const { left, top, width, height } = element.getBoundingClientRect();
          const mouseX = e?.x ?? lastPosition.current.x;
          const mouseY = e?.y ?? lastPosition.current.y;

          if (e) lastPosition.current = { x: mouseX, y: mouseY };

          const center = [left + width * 0.5, top + height * 0.5];
          const distanceFromCenter = Math.hypot(mouseX - center[0], mouseY - center[1]);
          const inactiveRadius = 0.5 * Math.min(width, height) * inactiveZone;

          if (distanceFromCenter < inactiveRadius) {
            element.style.setProperty("--active", "0");
            return;
          }

          const isActive =
            mouseX > left - proximity &&
            mouseX < left + width + proximity &&
            mouseY > top - proximity &&
            mouseY < top + height + proximity;

          element.style.setProperty("--active", isActive ? "1" : "0");
          if (!isActive) return;

          const currentAngle = parseFloat(element.style.getPropertyValue("--start")) || 0;
          const targetAngle =
            (180 * Math.atan2(mouseY - center[1], mouseX - center[0])) / Math.PI + 90;
          const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180;
          const newAngle = currentAngle + angleDiff;

          animate(currentAngle, newAngle, {
            duration: movementDuration,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (value) => element.style.setProperty("--start", String(value)),
          });
        });
      },
      [inactiveZone, proximity, movementDuration, staticMode]
    );

    useEffect(() => {
      if (disabled) return;
      const element = containerRef.current;
      if (!element) return;

      if (staticMode) {
        element.style.setProperty("--start", String(staticAngle));
        element.style.setProperty("--active", "1");
        return;
      }

      const handlePointerMove = (e: PointerEvent) => handleMove(e);
      const handleScroll = () => handleMove();

      document.body.addEventListener("pointermove", handlePointerMove, { passive: true });
      window.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        document.body.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("scroll", handleScroll);
      };
    }, [handleMove, disabled, staticMode, staticAngle]);

    const fallbackGradient = `radial-gradient(circle, var(--primary) 10%, transparent 20%),
radial-gradient(circle at 40% 40%, var(--primary) 5%, transparent 15%),
repeating-conic-gradient(from 236.84deg at 50% 50%,var(--primary) 0%,var(--primary) calc(25% / 5),transparent calc(50% / 5),var(--primary) calc(75% / 5),var(--primary) calc(100% / 5))`;

    return (
      <div
        ref={containerRef}
        style={
          {
            "--blur": `${blur}px`,
            "--spread": spread,
            "--start": staticMode ? staticAngle : "0",
            "--active": staticMode ? "1" : "0",
            "--glowingeffect-border-width": `${borderWidth}px`,
            "--gradient": gradient || fallbackGradient,
            borderRadius,
          } as CSSProperties
        }
        className={cn(
          "pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity z-20",
          blur > 0 && "blur-[var(--blur)]",
          className,
          disabled && "hidden"
        )}
      >
        <div
          className={cn(
            "glow rounded-[inherit]",
            'after:content-[""] after:rounded-[inherit] after:absolute after:inset-0',
            "after:[border:var(--glowingeffect-border-width)_solid_transparent]",
            "after:[background:var(--gradient)] after:[background-attachment:fixed]",
            "after:opacity-[var(--active)] after:transition-opacity after:duration-300",
            "after:[mask-clip:padding-box,border-box]",
            "after:[mask-composite:intersect]",
            "after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]"
          )}
        />
      </div>
    );
  }
);

InternalGlowingEffect.displayName = "InternalGlowingEffect";

export interface DraggableFlashCardProps {
  word: string;
  definition?: string;
  imageUrl?: string;
  className?: string;
  initialX?: number;
  initialY?: number;
  width?: number | string;
  height?: number | string;
  onFlipChange?: (flipped: boolean) => void;
}

function getLegacyBackdropStyle({
  supportsBackdropFilter,
  bodyOpacity,
  borderOpacity,
  blurStrength,
}: {
  supportsBackdropFilter: boolean;
  bodyOpacity: number;
  borderOpacity: number;
  blurStrength: number;
}) {
  const body = `rgba(10, 10, 10, ${bodyOpacity})`;
  const border = `rgba(255, 255, 255, ${borderOpacity})`;

  if (supportsBackdropFilter) {
    return {
      background: body,
      borderColor: border,
      backdropFilter: `blur(${blurStrength}px)`,
      WebkitBackdropFilter: `blur(${blurStrength}px)`,
    } as React.CSSProperties;
  }

  return {
    background: body,
    borderColor: border,
  } as React.CSSProperties;
}

export default function DraggableFlashCard({
  word,
  definition = "",
  imageUrl,
  className,
  initialX = 0,
  initialY = 0,
  width: propWidth = "100%",
  height: propHeight = "100%",
  onFlipChange,
}: DraggableFlashCardProps) {
  const [mounted, setMounted] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const x = useMotionValue(initialX);
  const y = useMotionValue(initialY);
  const rotateY = useMotionValue(0);
  const springRotateY = useSpring(rotateY, {
    stiffness: 110,
    damping: 18,
    mass: 0.9,
  });

  const velocityX = useVelocity(x);
  const velocityY = useVelocity(y);

  const FINAL_GLASS = useMemo(
    () => ({
      bodyOpacity: 0.36,
      borderOpacity: 0.14,
      blurStrength: 7.64,
    }),
    []
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    x.set(initialX);
    y.set(initialY);
  }, [initialX, initialY, x, y]);

  const frontOpacity = useTransform(springRotateY, [0, 89.9, 90, 180], [1, 1, 0, 0]);
  const backOpacity = useTransform(springRotateY, [0, 90, 90.1, 180], [0, 0, 1, 1]);

  const toggleFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !isFlipped;
    setIsFlipped(next);
    onFlipChange?.(next);
    rotateY.set(next ? 180 : 0);
  };

  const handleDragEnd = (_e: any, info: any) => {
    const vx = velocityX.get() || info.velocity.x || 0;
    const vy = velocityY.get() || info.velocity.y || 0;
    const magnitude = Math.sqrt(vx * vx + vy * vy);
    const bounce = Math.min(0.8, magnitude / 1000);

    animate(x, x.get() + vx * 0.15, {
      type: "spring",
      stiffness: 40,
      damping: 18,
      mass: 0.8,
      bounce,
    });
    animate(y, y.get() + vy * 0.15, {
      type: "spring",
      stiffness: 40,
      damping: 18,
      mass: 0.8,
      bounce,
    });
  };

  if (!mounted) return null;

  const supportsBackdropFilter =
    typeof window !== "undefined" &&
    (window.CSS?.supports?.("backdrop-filter", "blur(24px)") ||
      window.CSS?.supports?.("-webkit-backdrop-filter", "blur(24px)"));

  const glassStyle = getLegacyBackdropStyle({
    supportsBackdropFilter: !!supportsBackdropFilter,
    bodyOpacity: FINAL_GLASS.bodyOpacity,
    borderOpacity: FINAL_GLASS.borderOpacity,
    blurStrength: FINAL_GLASS.blurStrength,
  });

  const sharedFaceStyle: CSSProperties = {
    ...glassStyle,
    border: `1px solid rgba(255, 255, 255, ${FINAL_GLASS.borderOpacity})`,
    borderRadius: "0px",
    overflow: "hidden",
    position: "absolute",
    inset: 0,
    zIndex: 10,
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    transformStyle: "preserve-3d",
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      whileDrag={{ scale: 1.01, zIndex: 50 }}
      style={{
        position: className?.includes("relative") ? "relative" : "absolute",
        width: propWidth,
        height: propHeight,
        x,
        y,
        rotateY: springRotateY,
        transformStyle: "preserve-3d",
        perspective: 3000,
        zIndex: 10,
      }}
      className={cn("select-none shadow-2xl cursor-grab active:cursor-grabbing", className)}
    >
      <InternalGlowingEffect borderRadius="0px" spread={80} proximity={64} inactiveZone={0.01} />

      <motion.div
        className="front-face"
        style={{
          ...sharedFaceStyle,
          opacity: frontOpacity,
          pointerEvents: isFlipped ? "none" : "auto",
          background: `rgba(10, 10, 10, ${FINAL_GLASS.bodyOpacity})`,
        }}
      >
        <div className="relative h-full w-full">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={word}
              className="absolute inset-0 h-full w-full object-cover opacity-80"
              draggable={false}
            />
          )}
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative z-20 flex h-full w-full flex-col p-6">
            <div className="flex items-start justify-start">
              <div className="flex items-center gap-2 px-2 py-1 bg-black/40 border border-white/10 backdrop-blur-md">
                <Dices className="h-3 w-3 text-white/70" />
                <span className="text-[11.4px] tracking-[0.2em] text-white/70">
                  Flashcard
                </span>
              </div>
            </div>

            <div className="mt-auto pt-4">
              <RefinedChronicleButton
                onClick={toggleFlip}
                width="100%"
                backgroundColor="#fff"
                textColor="#000"
                hoverBackgroundColor="hsl(var(--primary))"
                hoverTextColor="#fff"
              >
                Reveal
              </RefinedChronicleButton>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="back-face"
        style={{
          ...sharedFaceStyle,
          opacity: backOpacity,
          pointerEvents: isFlipped ? "auto" : "none",
          rotateY: 180,
          background: `linear-gradient(180deg, rgba(20,20,20,0.92) 0%, rgba(10,10,10,0.96) 100%)`,
        }}
      >
        <div className="relative z-20 flex h-full w-full flex-col p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2 px-2 py-1 bg-white/5 border border-white/10 backdrop-blur-md">
              <Dices className="h-3 w-3 text-primary" />
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/70">
                Vocabulary
              </span>
            </div>
          </div>

          <div className="flex-1 mt-3 sm:mt-14 md:mt-10 tablet-lg:mt-16 flex flex-col items-center justify-start text-center pt-8">
            <h3 className="text-2xl md:text-3xl font-black tracking-tighter text-white mb-4">
              {word}
            </h3>
            <div className="h-0.5 w-8 bg-primary/40 mb-4" />
            <p className="text-sm leading-relaxed text-white/70 italic max-w-xs m-0">
              {definition || "No definition provided."}
            </p>
          </div>

          <div className="mt-auto pt-4">
            <RefinedChronicleButton
              onClick={toggleFlip}
              width="100%"
              backgroundColor="rgba(255, 255, 255, 0.05)"
              textColor="#fff"
              borderColor="rgba(255, 255, 255, 0.1)"
              borderVisible={true}
              hoverBackgroundColor="hsl(var(--primary))"
              hoverTextColor="#fff"
            >
              Hide
            </RefinedChronicleButton>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}