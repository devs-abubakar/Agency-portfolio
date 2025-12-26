import React, { useEffect, useRef, useState } from "react";
import {
  Bot,
  Zap,
  Puzzle,
  TrendingUp,
  BarChart3,
  Handshake,
} from "lucide-react";

const features = [
  {
    id: 1,
    title: "Business-First AI (No Hype)",
    description:
      "We don’t chase trends. We build AI-powered web design, AI ads, and systems that solve real business problems and generate measurable results.",
    icon: <Bot />,
    image: "https://picsum.photos/800/600?random=21",
  },
  {
    id: 2,
    title: "Automation That Saves Time & Money",
    description:
      "Our AI automation reduces manual work, cuts operational costs, and frees your team to focus on growth instead of repetitive tasks.",
    icon: <Zap />,
    image: "https://picsum.photos/800/600?random=22",
  },
  {
    id: 3,
    title: "Custom-Built, Not Copy-Paste",
    description:
      "No templates. No shortcuts. Every AI website, ad system, and strategy is tailored specifically to your business goals.",
    icon: <Puzzle />,
    image: "https://picsum.photos/800/600?random=23",
  },
  {
    id: 4,
    title: "Scalable From Day One",
    description:
      "Our solutions are designed to grow with your business — from early-stage startups to fast-scaling brands.",
    icon: <TrendingUp />,
    image: "https://picsum.photos/800/600?random=24",
  },
  {
    id: 5,
    title: "Data-Driven Decisions",
    description:
      "We rely on data, not guesswork. Every optimization is based on performance metrics to maximize ROI.",
    icon: <BarChart3 />,
    image: "https://picsum.photos/800/600?random=25",
  },
  {
    id: 6,
    title: "Long-Term Partner Mindset",
    description:
      "We don’t vanish after delivery. We continuously support, improve, and scale your systems as your business evolves.",
    icon: <Handshake />,
    image: "https://picsum.photos/800/600?random=26",
  },
];

const WhyChooseUs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const containerRef = useRef(null);

  const isDesktop =
    typeof window !== "undefined" && window.innerWidth >= 1024;

  useEffect(() => {
    if (!isDesktop) return;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const progress = Math.abs(rect.top) / (rect.height - window.innerHeight);
      const index = Math.min(Math.floor(progress * features.length), features.length - 1);
      if (rect.top <= 0) setActiveTab(index);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDesktop]);

  return (
    <section
      ref={containerRef}
      className="relative bg-slate-900/30 py-16 lg:py-20"
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-12">
        {/* LEFT SIDE CONTENT */}
        <div className="lg:w-1/2 lg:sticky lg:top-32 lg:h-[calc(100vh)] flex flex-col justify-center">
          <h2 className="text-blue-500 font-bold uppercase tracking-widest text-sm mb-4">
            Why Aivora?
          </h2>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-black mb-8 lg:mb-12">
            Built on Trust,
            <br />
            <span className="text-blue-400">Powered by Innovation</span>
          </h3>

          <div className="space-y-6 lg:space-y-8">
            {features.map((feature, idx) => (
              <div
                key={feature.id}
                onClick={() => {
                  if (!isDesktop) {
                    setActiveTab(idx);
                  } else {
                    const target =
                      containerRef.current.offsetTop +
                      idx * window.innerHeight * 0.5;
                    window.scrollTo({ top: target, behavior: "smooth" });
                  }
                }}
                className={`transition-all duration-500 flex items-start space-x-4 lg:space-x-6 cursor-pointer ${
                  isDesktop
                    ? activeTab === idx
                      ? "opacity-100 translate-x-4"
                      : "opacity-30"
                    : "opacity-100"
                }`}
              >
                <div
                  className={`p-3 rounded-xl transition-colors ${
                    activeTab === idx ? "bg-blue-600" : "bg-slate-800"
                  }`}
                >
                  {React.cloneElement(feature.icon, {
                    className: `w-7 h-7 ${
                      activeTab === idx ? "text-white" : "text-slate-400"
                    }`,
                  })}
                </div>

                <div className="flex-1">
                  <h4 className="text-lg sm:text-xl font-bold mb-2">
                    {feature.title}
                  </h4>
                  {(activeTab === idx || !isDesktop) && (
                    <p className="text-slate-400 max-w-sm mb-4">
                      {feature.description}
                    </p>
                  )}
                  {/* MOBILE IMAGE */}
                  {!isDesktop && activeTab === idx && (
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full rounded-2xl object-cover border border-slate-800"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE VISUAL (DESKTOP ONLY) */}
        <div className="hidden lg:block lg:w-1/2">
          <div className="sticky top-32 h-[60vh] w-full rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/10 border border-slate-800">
            {features.map((feature, idx) => (
              <img
                key={feature.id}
                src={feature.image}
                alt={feature.title}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                  activeTab === idx ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
          </div>

          {/* Dynamic scroll spacer based on number of features */}
          <div style={{ height: `${(features.length - 1) * 50}vh` }} />
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
