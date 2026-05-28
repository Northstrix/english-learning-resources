"use client";

import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CustomCheckbox from "@/components/ui/CustomCheckbox";
import { useSafeHtml } from "@/hooks/use-safe-html";
import { shuffleArray } from "@/utils/test-utils";

interface Props {
  question: any;
  globalIndex: number;
  totalQuestions: number;
  answers: Record<string, string[]>;
  onAnswerChange: (id: string, values: string[]) => void;
}

export default function QuestionCard({
  question,
  globalIndex,
  totalQuestions,
  answers,
  onAnswerChange,
}: Props) {
  const { parseHtml } = useSafeHtml();
  const [showFeedback, setShowFeedback] = useState(false);
  
  const shuffledOptions = useMemo(() => {
    const baseOptions = question.options.map((opt: any) => ({
      value: opt.id,
      text: opt.text
    }));
    return shuffleArray(baseOptions);
  }, [question.id, question.options]);

  const currentAnswer = answers[question.id] || [];
  const hasAnswered = currentAnswer.length > 0;
  
  useEffect(() => {
    if (hasAnswered) {
      setShowFeedback(true);
    }
  }, [hasAnswered]);

  const isCorrect = useMemo(() => {
    if (!hasAnswered) return false;
    const correctSet = new Set(question.correctValues);
    const answerSet = new Set(currentAnswer);
    return correctSet.size === answerSet.size && [...correctSet].every(val => answerSet.has(val));
  }, [currentAnswer, hasAnswered, question.correctValues]);

  const showNumbering = globalIndex > 0;

  return (
    <motion.div 
      layout
      className="rounded-none border border-white/10 bg-[#0d0d0d] p-4 sm:p-6 space-y-6 relative group overflow-hidden"
    >
      <div className="space-y-4 text-left">
        <h4
          className="font-headline font-black text-white sm:text-lg text-base leading-tight mt-0 mb-0"
          {...parseHtml(question.text)}
        />

        {question.subtext && (
          <p
            className="text-[#aaaaaa] sm:text-sm text-xs leading-relaxed mt-0 mb-0"
            {...parseHtml(question.subtext)}
          />
        )}

        {question.image && (
          <div
            className="relative w-full rounded-none overflow-hidden border border-white/5 mt-4 flex justify-center items-center"
            style={{
              height: "16rem",
              backgroundColor: question.imageBgColor || "#000",
            }}
          >
            <img
              src={question.image}
              alt="Question context"
              className="h-[82%] w-auto object-contain block mx-auto select-none pointer-events-none"
              draggable={false}
            />
          </div>
        )}
      </div>

      <div className="pt-4 text-left">
        <CustomCheckbox
          groupDirection="column"
          groupGap={16}
          maxSelected={ (question.correctValues?.length || 0) > 1 ? 99 : 1 }
          options={shuffledOptions.map((opt: any) => ({
            value: opt.value,
            label: <span className="font-body text-sm text-white/80" {...parseHtml(opt.text)} />,
            checkboxProps: {
              backgroundColor: "#0a0a0a",
              accentColor: "hsl(var(--primary))",
              borderColor: "rgba(255,255,255,0.1)",
              outlineHoverColor: "hsl(var(--primary))",
              labelFontSize: "15px",
              borderRadius: "0px",
              borderWidth: 1.5,
              labelColor: "rgba(255,255,255,0.7)",
            },
          }))}
          values={currentAnswer}
          onGroupChange={(vals) => onAnswerChange(question.id, vals)}
        />
      </div>

      <AnimatePresence initial={false}>
        {showFeedback && (
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.1 }}
              className="pt-6 text-left"
            >
              {isCorrect ? (
                <p className="text-[hsl(var(--theme-green))] font-bold text-sm m-0 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--theme-green))]" />
                  Correct!
                </p>
              ) : (
                <p className="text-[hsl(var(--theme-red))] font-bold text-sm m-0 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--theme-red))]" />
                  Incorrect
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {showNumbering && (
        <span className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 text-[#aaaaaa] text-[10px] font-mono tracking-tighter opacity-40 group-hover:opacity-100 transition-opacity">
          {globalIndex} / {totalQuestions}
        </span>
      )}

      <style jsx>{`
        .italic { font-style: italic; }
        .bold { font-weight: 700; }
      `}</style>
    </motion.div>
  );
}