'use client';

import { useEffect, useMemo, useRef } from "react";
import { motion, type Transition } from "framer-motion";
import { cn } from "@/lib/utils";

interface HighlightHoverProps {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
  effect?: Transition;
  highlightColor?: string;
  barThickness?: number;
  gapRatio?: number;
  maxWidth?: string | number;
  isRTL?: boolean;
}

export const HighlightHover = ({
  children,
  as: Tag = "span",
  className,
  effect = { type: "spring", stiffness: 260, damping: 24 },
  highlightColor = "hsl(var(--primary))",
  barThickness = 0.12,
  gapRatio = 0.03,
  maxWidth = "100%",
  isRTL = false,
  ...rest
}: HighlightHoverProps) => {
  const ref = useRef<HTMLElement>(null);
  const MotionTag = useMemo(() => motion(Tag), [Tag]);

  useEffect(() => {
    const applyVars = () => {
      if (ref.current) {
        const size = parseFloat(getComputedStyle(ref.current).fontSize);
        ref.current.style.setProperty("--hh-bar", `${size * barThickness}px`);
        ref.current.style.setProperty("--hh-gap", `${size * gapRatio}px`);
      }
    };
    applyVars();
    window.addEventListener("resize", applyVars);
    return () => window.removeEventListener("resize", applyVars);
  }, [barThickness, gapRatio]);

  const barAnim = {
    rest: {
      height: "var(--hh-bar)",
      backgroundColor: "hsl(var(--muted-foreground))",
      bottom: "calc(-1 * var(--hh-gap))",
    },
    hover: {
      height: "100%",
      bottom: 0,
      backgroundColor: highlightColor,
      transition: effect,
    },
  };

  const textAnim = {
    rest: {
      color: "hsl(var(--muted-foreground))",
      paddingLeft: "0px",
      paddingRight: "0px",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    hover: {
      color: "#ffffff",
      paddingLeft: "6px",
      paddingRight: "6px",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  const wrapperStyle: React.CSSProperties = {
    display: "inline-block",
    maxWidth: typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth,
    overflowWrap: "anywhere",
    wordBreak: "break-word",
  };

  return (
    <MotionTag
      ref={ref as any}
      whileHover="hover"
      initial="rest"
      animate="rest"
      className={cn(
        "relative inline-block cursor-pointer select-none overflow-hidden",
        className
      )}
      style={wrapperStyle}
      {...(rest as any)}
    >
      <motion.span
        aria-hidden="true"
        variants={barAnim}
        className="absolute w-full left-0 bg-current block"
        style={{
          height: "var(--hh-bar)",
          bottom: "calc(-1 * var(--hh-gap))",
          transformOrigin: "bottom center",
          borderRadius: 0,
        }}
      />
      <motion.span
        variants={textAnim}
        className="relative z-[1] inline-block"
        style={{ display: "inline-block", whiteSpace: "normal" }}
      >
        {children}
      </motion.span>
    </MotionTag>
  );
};

export default HighlightHover;
