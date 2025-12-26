import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent
} from "framer-motion";

/**
 * Simple className merge helper (replacement for cn)
 */
const cn = (...classes) => classes.filter(Boolean).join(" ");

export const StickyScroll = ({ content, contentClassName }) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start center", "end start"]
  });

  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map(
      (_, index) => index / cardLength
    );

    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (
          distance <
          Math.abs(latest - cardsBreakpoints[acc])
        ) {
          return index;
        }
        return acc;
      },
      0
    );

    setActiveCard(closestBreakpointIndex);
  });

  const backgroundColors = [
    "#0f172a", // slate-900
    "#000000", // black
    "#171717"  // neutral-900
  ];

  const linearGradients = [
    "linear-gradient(to bottom right, #06b6d4, #10b981)",
    "linear-gradient(to bottom right, #ec4899, #6366f1)",
    "linear-gradient(to bottom right, #f97316, #eab308)"
  ];

const backgroundGradient =
  linearGradients[activeCard % linearGradients.length];


  return (
    <motion.div
      ref={ref}
      animate={{
        backgroundColor:
          backgroundColors[
            activeCard % backgroundColors.length
          ]
      }}
      className="relative flex h-[30rem] justify-center space-x-10 overflow-y-auto rounded-md p-10"
    >
      {/* LEFT CONTENT */}
      <div className="relative flex items-start px-4">
        <div className="max-w-2xl">
          {content && content.map((item, index) => (
            <div key={item.title + index} className="my-20">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3
                }}
                className="text-2xl font-bold text-slate-100"
              >
                {item.title}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3
                }}
                className="mt-10 max-w-sm text-slate-300"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>

      {/* RIGHT STICKY VISUAL */}
      <div
        style={{ background: backgroundGradient }}
        className={cn(
          "sticky top-10 hidden h-60 w-80 overflow-hidden rounded-md lg:block",
          contentClassName
        )}
      >
        {content[activeCard]?.content ?? null}
      </div>
    </motion.div>
  );
};
