import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { 
  Zap, 
  Bot,
  Puzzle,
  TrendingUp,
  BarChart3,
  Handshake,
  Maximize,
  Sparkles
} from 'lucide-react';
import { getDeepDiveInsight } from '../services/geminiService';
import { Interactive3DSection } from './MovingModel';

const CARDS = [
  {
    id: 1,
    tag: "AI Strategy",
    title: "Business-First AI (No Hype)",
    description:
      "We don’t chase trends. We build AI-powered web design, AI ads, and systems that solve real business problems and generate measurable results.",
    icon: <Bot className="w-6 h-6 text-blue-400" />,
  },
  {
    id: 2,
    tag: "Automation",
    title: "Automation That Saves Time & Money",
    description:
      "Our AI automation reduces manual work, cuts operational costs, and frees your team to focus on growth instead of repetitive tasks.",
    icon: <Zap className="w-6 h-6 text-emerald-400" />,
  },
  {
    id: 3,
    tag: "Customization",
    title: "Custom-Built, Not Copy-Paste",
    description:
      "No templates. No shortcuts. Every AI website, ad system, and strategy is tailored specifically to your business goals.",
    icon: <Puzzle className="w-6 h-6 text-purple-400" />,
  },
  {
    id: 4,
    tag: "Scalability",
    title: "Scalable From Day One",
    description:
      "Our solutions are designed to grow with your business — from early-stage startups to fast-scaling brands.",
    icon: <TrendingUp className="w-6 h-6 text-cyan-400" />,
  },
  {
    id: 5,
    tag: "Analytics",
    title: "Data-Driven Decisions",
    description:
      "We rely on data, not guesswork. Every optimization is based on performance metrics to maximize ROI.",
    icon: <BarChart3 className="w-6 h-6 text-rose-400" />,
  },
  {
    id: 6,
    tag: "Support",
    title: "Long-Term Partner Mindset",
    description:
      "We don’t vanish after delivery. We continuously support, improve, and scale your systems as your business evolves.",
    icon: <Handshake className="w-6 h-6 text-yellow-400" />,
  }
];

// Card Component
const InfoCard = ({ card }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-20% 0px -20% 0px" });
  const [insight, setInsight] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAskAI = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const result = await getDeepDiveInsight(card.title, card.description);
      setInsight(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, filter: 'blur(10px)', y: 50 }}
      animate={isInView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : { opacity: 0.3, filter: 'blur(8px)', y: 20 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="mb-16 last:mb-0 group"
    >
      <div className="p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-500 group-hover:bg-white/10 group-hover:border-white/20">
        <div className="flex items-center gap-4 mb-4 sm:mb-6">
          <div className="p-2 sm:p-3 rounded-xl bg-white/5 border border-white/5 group-hover:scale-110 transition-transform duration-500">
            {card.icon}
          </div>
          <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-gray-500">{card.tag}</span>
        </div>
        <h3 className="text-2xl sm:text-3xl md:text-3xl font-heading text-blue-400 font-bold mb-2 sm:mb-4">{card.title}</h3>
        <p className="text-gray-400 leading-relaxed text-sm sm:text-base md:text-lg">
          {card.description}
        </p>
        
        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/5">
            <button 
              onClick={handleAskAI}
              disabled={loading}
              className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors disabled:opacity-50"
            >
                <Sparkles size={16} className={loading ? "animate-spin" : ""} />
                {loading ? "Decrypting Intelligence..." : "Ask AI for deeper insights"}
            </button>

            {insight && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 sm:mt-6 p-4 sm:p-6 rounded-xl bg-blue-500/5 border border-blue-500/20 overflow-hidden"
              >
                <div className="mb-2 sm:mb-4">
                  <h4 className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">Neural Insight</h4>
                  <p className="text-gray-200 text-sm italic leading-relaxed">"{insight.insight}"</p>
                </div>
                <div>
                  <h4 className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">Technical Manifest</h4>
                  <p className="text-gray-400 text-xs leading-relaxed">{insight.technicalDetails}</p>
                </div>
              </motion.div>
            )}
        </div>
      </div>
    </motion.div>
  );
};

// Main Section
export const InteractiveScrollSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="relative bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8 lg:gap-12">
        
        {/* Left: Scrollable Cards */}
        <div className="w-full lg:w-1/2 py-16 lg:py-32">
          <div className="mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-4 lg:mb-6">
              The Engine of<br />
              <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Digital Evolution</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed">
              Explore our core capabilities through this interactive sequence. 
              Scroll through the cards and the 3D model on the right adapts in real-time.
            </p>
          </div>

          <div className="space-y-8 sm:space-y-12">
            {CARDS.map((card) => (
              <InfoCard key={card.id} card={card} />
            ))}
          </div>

          {/* Bottom spacer */}
          <div className="h-24 lg:h-48" />
        </div>

        {/* Right: 3D Section */}
        <div className="w-full lg:w-1/2">
          {/* Desktop: full interactive 3D */}
          <div className="hidden lg:block sticky top-0 h-screen">
            <Interactive3DSection scrollYProgress={scrollYProgress}/>
          </div>

          {/* Mobile fallback */}
          <div className="block lg:hidden w-full h-64 rounded-2xl bg-gradient-to-tr from-blue-600 via-purple-600 to-cyan-400 flex items-center justify-center text-white text-lg font-bold">
            3D Preview
          </div>
        </div>
      </div>
    </div>
  );
};
