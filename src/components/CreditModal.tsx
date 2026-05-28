"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { ModalOverlay } from "@/components/ModalOverlay";
import { useIsMobile } from "@/hooks/use-mobile";
import RefinedChronicleButton from "@/components/RefinedChronicleButton";
import HighlightHover from "@/components/HighlightHover";

const creditsMarkdown = `
[Resizable Navbar](https://ui.aceternity.com/components/resizable-navbar) by [Aceternity UI](https://ui.aceternity.com/)

[Chronicle Button](https://codepen.io/Haaguitos/pen/OJrVZdJ) by [Haaguitos](https://codepen.io/Haaguitos)

[すりガラスなプロフィールカード](https://codepen.io/ash_creator/pen/zYaPZLB) by [あしざわ - Webクリエイター](https://codepen.io/ash_creator)

[framer-motion](https://www.npmjs.com/package/framer-motion)

[Lucide React](https://www.npmjs.com/package/lucide-react)

[Agency Layout - cpc-landing-page](https://codepen.io/fchaussin/pen/PwbPEVV) by [Freask'O](https://codepen.io/fchaussin)

[gsap/component ❍ Interactive Table with Image Hover & Idle Animation](https://codepen.io/filipz/pen/EaVNXmb) by [Filip Zrnzevic](https://codepen.io/filipz)

[Custom Checkbox](https://21st.dev/Edil-ozi/custom-checkbox/default) by [Edil Ozi](https://21st.dev/Edil-ozi)

[チェックしないと押せないボタン](https://codepen.io/ash_creator/pen/JjZReNm) by [あしざわ - Webクリエイター](https://codepen.io/ash_creator)

[JTB studios - Link](https://codepen.io/zzznicob/pen/GRPgKLM) by [Nico](https://codepen.io/zzznicob)

[Hover Link Animation](https://21st.dev/community/components/rubenerik/hover-link-animation/default) by [Ruben](https://21st.dev/rubenerik)

[Skills animation](https://codepen.io/giorgi-chelidze/pen/jEWwEyG) by [Giorgi Chelidze](https://codepen.io/giorgi-chelidze)

[Grok](https://grok.com/)

[Google AI Mode](https://google.com/aimode)
`;


function renderEntry(entry: string) {
  const EXCEPTIONS: { key: string; replacement: string }[] = [
    { key: "gsap/component", replacement: "[gsap/component]" },
  ];

  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  const applyExceptions = (text: string) => {
    for (const ex of EXCEPTIONS) {
      const idx = text.indexOf(ex.key);
      if (idx !== -1) {
        return text.slice(0, idx) + ex.replacement + text.slice(idx + ex.key.length);
      }
    }
    return text;
  };

  while ((match = regex.exec(entry)) !== null) {
    if (match.index > lastIndex) {
      parts.push(
        <span key={key++} style={{
          color: "hsl(var(--muted-foreground))",
          transform: "translateY(-8px)",
          display: "inline-block",
          marginLeft: "5px",
          marginRight: "5px",
        }}>
          {applyExceptions(entry.slice(lastIndex, match.index))}
        </span>
      );
    }

    let label = match[1];
    label = applyExceptions(label);

    parts.push(
      <HighlightHover
        key={key++}
        as="a"
        href={match[2]}
        target="_blank"
        rel="noopener noreferrer"
        className="cursor-pointer"
        style={{
          color: "hsl(var(--muted-foreground))",
          textDecoration: "none",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </HighlightHover>
    );
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < entry.length) {
    parts.push(
      <span key={key++} style={{ color: "hsl(var(--foreground))" }}>
        {entry.slice(lastIndex)}
      </span>
    );
  }

  return parts;
}

export default function CreditModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const isMobile = useIsMobile();
  const baseBorderRadius = 0;

  if (!isOpen) return null;

  const creditEntries = creditsMarkdown
    .trim()
    .split(/\n{2,}/)
    .map((e) => e.trim())
    .filter(Boolean);

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay onClose={onClose}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: isMobile ? 100 : 0 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: isMobile ? 100 : 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{ overflow: "visible" }}
            onClick={onClose}
          >
            <motion.div
              layout
              transition={{ duration: 0.35, ease: "easeInOut" }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="credit-modal-title"
              className="bg-background flex flex-col relative border text-foreground"
              style={{
                width: "min(480px, 90vw)",
                height: "min(720px, 86vh)",
                borderColor: "hsl(var(--border))",
                borderRadius: baseBorderRadius,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-4 border-b border-border"
                style={{
                  minHeight: 72,
                  borderTopLeftRadius: baseBorderRadius,
                  borderTopRightRadius: baseBorderRadius,
                  userSelect: "none",
                }}
              >
                <div style={{ width: "36px" }} />
                <span
                  id="credit-modal-title"
                  className="font-headline font-black text-xl select-none mx-auto tracking-tighter"
                  style={{ userSelect: "none" }}
                >
                  <span style={{ display: "block" }}>Credit</span>
                </span>
                <button
                  onClick={onClose}
                  className="p-2 text-white/40 hover:text-white transition-colors"
                  aria-label="Close"
                  type="button"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div
                className="flex-grow overflow-y-auto px-6 py-4 custom-scrollbar"
                style={{ borderTop: "1px solid hsl(var(--border))", textAlign: "center" }}
              >
                <div className="h-5"/>
                <ul
                  style={{
                    listStyleType: "none",
                    padding: 0,
                    margin: 0,
                    lineHeight: 1.75,
                    textAlign: "center",
                  }}
                >
                  {creditEntries.map((entry, idx) => (
                    <li
                      key={idx}
                      style={{
                        marginBottom: idx === creditEntries.length - 1 ? 0 : 20,
                        wordWrap: "break-word",
                        wordBreak: "break-word",
                        whiteSpace: "normal",
                        fontSize: "0.875rem",
                        direction: "ltr"
                      }}
                    >
                      {renderEntry(entry)}
                    </li>
                  ))}
                </ul>
                <div className="h-5"/>
              </div>

              {/* Footer */}
              <div
                className="flex-shrink-0 p-6 border-t border-border bg-background"
                style={{
                  borderBottomLeftRadius: baseBorderRadius,
                  borderBottomRightRadius: baseBorderRadius,
                }}
              >
                <RefinedChronicleButton
                  onClick={onClose}
                  className="w-full"
                  variant="default"
                  backgroundColor="#fff"
                  hoverBackgroundColor="hsl(var(--primary))"
                  textColor="#000"
                  hoverTextColor="#fff"
                  borderRadius={0}
                  fontWeight={900}
                  buttonHeight={isMobile ? "2.75rem" : "2.875rem"}
                  width="100%"
                  type="button"
                >
                  OK
                </RefinedChronicleButton>
              </div>
            </motion.div>
          </motion.div>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
}
