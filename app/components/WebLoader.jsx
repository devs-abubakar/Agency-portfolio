
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LOADING_STEPS, TECH_INSIGHTS } from './constants';


export const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [insightIndex] = useState(() => Math.floor(Math.random() * TECH_INSIGHTS.length));

  useEffect(() => {
    let startTime = Date.now();
    const totalDuration = LOADING_STEPS.reduce((acc, step) => acc + step.duration, 0);

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / totalDuration) * 100, 100);
      setProgress(newProgress);

      // Update step index based on current progress
      let accumulatedTime = 0;
      for (let i = 0; i < LOADING_STEPS.length; i++) {
        accumulatedTime += LOADING_STEPS[i].duration;
        if (elapsed < accumulatedTime) {
          setCurrentStepIndex(i);
          break;
        }
      }

      if (newProgress < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        setTimeout(onComplete, 500);
      }
    };

    requestAnimationFrame(updateProgress);
  }, [onComplete]);

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full bg-[#020617] overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[80px]" />

      <div className="z-10 flex flex-col items-center max-w-md w-full px-6">
        {/* Logo Icon */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mb-8"
        >
          <div className="relative w-20 h-20 flex items-center justify-center">
             <div className="absolute inset-0 border-2 border-blue-500/30 rounded-2xl rotate-45" />
             <div className="absolute inset-0 border border-cyan-400/50 rounded-2xl -rotate-12 animate-pulse" />
             <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-cyan-300">
               A
             </span>
          </div>
        </motion.div>

        {/* Brand Name */}
        <h1 className="text-2xl font-bold tracking-tight mb-2 text-white/90">
          AIVORA <span className="text-blue-500">DIGITALS</span>
        </h1>

        {/* Progress Bar Container */}
        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mb-4 relative">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 bg-[length:200%_100%]"
            style={{ width: `${progress}%` }}
            animate={{ backgroundPosition: ["0% 0%", "100% 0%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Dynamic Status Text */}
        <div className="h-6 mb-12">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentStepIndex}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-xs font-medium text-blue-400/80 uppercase tracking-widest"
            >
              {LOADING_STEPS[currentStepIndex].label}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Insight Card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
        >
          <p className="text-sm italic text-white/60 mb-3 font-light leading-relaxed">
            "{TECH_INSIGHTS[insightIndex].quote}"
          </p>
          <p className="text-[10px] font-bold text-white/40 uppercase tracking-tighter">
            — {TECH_INSIGHTS[insightIndex].author}
          </p>
        </motion.div>
      </div>

      {/* Floating Particle Effect (Simplified) */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: Math.random(),
            }}
            animate={{
              y: [null, Math.random() * -100 - 50],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>
    </div>
  );
};
