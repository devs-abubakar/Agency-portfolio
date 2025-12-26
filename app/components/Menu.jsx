import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '../Cursorcontext';

const menuItems = [
  { label: "Work", href: "#work" },
  { label: "Intelligence", href: "#agency" },
  { label: "Solutions", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export const Menu = ({ closeMenu }) => {
  const { setHover } = useCursor();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "");
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    },
    exit: {
      opacity: 0,
      transition: { staggerChildren: 0.05, staggerDirection: -1, when: "afterChildren" }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }},
    exit: { y: 50, opacity: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      exit="exit"
      variants={containerVariants}
      className="fixed inset-0 w-full h-screen bg-primary z-40 flex flex-col justify-center items-center"
    >
      <motion.div className="flex flex-col items-center gap-2">
        {menuItems.map((item, index) => (
          <motion.a
            key={index}
            href={item.href}
            variants={itemVariants}
            className="font-display text-5xl md:text-8xl font-bold uppercase text-white hover:text-dark transition-colors duration-300 tracking-tight"
            onClick={closeMenu}
            onMouseEnter={() => setHover(true, item.label)}
            onMouseLeave={() => setHover(false)}
          >
            {item.label}
          </motion.a>
        ))}
      </motion.div>
    </motion.div>
  );
};
