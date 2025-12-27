"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Loader({ onAnimationComplete, contentLoaded }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const columnsRef = useRef(null);
  const [columnCount, setColumnCount] = useState(7);
  const [animationDone, setAnimationDone] = useState(false);

  useEffect(() => {
    const updateColumns = () => {
      setColumnCount(window.innerWidth < 768 ? 4 : 7);
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);

    const ctx = gsap.context(() => {
      const chars = textRef.current.querySelectorAll(".char");

      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
        onComplete: () => {
          setAnimationDone(true); // Animation fully done
        },
      });

      // TEXT IN
      tl.fromTo(
        chars,
        { y: 120, opacity: 0, rotateX: -90 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.05,
        }
      );

      // HOLD
      tl.to({}, { duration: 0.6 });

      // TEXT FALL
      tl.to(chars, {
        y: window.innerHeight,
        opacity: 0,
        rotateZ: () => gsap.utils.random(-15, 15),
        duration: 1.3,
        stagger: { each: 0.03, from: "random" },
        ease: "power4.in",
      });

      // CURTAIN REVEAL
      const columns = columnsRef.current.children;
      tl.to(
        columns,
        {
          yPercent: -100,
          duration: 1.4,
          stagger: 0.1,
          ease: "expo.inOut",
        },
        "-=0.6"
      );
    }, containerRef);

    return () => {
      window.removeEventListener("resize", updateColumns);
      ctx.revert();
    };
  }, []);

  // Hide loader only if animation done AND content is loaded
  useEffect(() => {
    if (animationDone && contentLoaded) {
      if (typeof onAnimationComplete === "function") {
        onAnimationComplete();
      }
    }
  }, [animationDone, contentLoaded, onAnimationComplete]);

  const text = "Aivora Digitals";

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#020617]"
    >
      {/* CURTAIN */}
      <div
        ref={columnsRef}
        className="absolute inset-0 flex pointer-events-none"
      >
        {Array.from({ length: columnCount }).map((_, i) => (
          <div
            key={i}
            className="flex-1 h-full bg-[#051040] border-r border-blue-900/20 last:border-r-0"
          />
        ))}
      </div>

      {/* TEXT */}
      <div
        ref={textRef}
        className="relative z-10 perspective-[1000px] select-none"
      >
        <h1 className="flex text-4xl md:text-7xl lg:text-8xl font-medium tracking-tight text-white">
          {text.split("").map((char, i) => (
            <span
              key={i}
              className={`char inline-block ${
                char === " " ? "mx-3 md:mx-5" : ""
              }`}
            >
              {char}
            </span>
          ))}
        </h1>
      </div>
    </div>
  );
}
