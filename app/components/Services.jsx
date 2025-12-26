
import React, { useEffect, useRef } from 'react';
import { Code, Megaphone, Bot, Palette, Layout, Video, ShoppingBag, Terminal } from 'lucide-react';

const services = [
  {
    icon: <Code className="w-8 h-8" />,
    title: "Web Development",
    desc: "Custom-built, high-performance web applications using React, Next.js, and modern tech stacks.",
    gradient: "from-blue-600 to-cyan-500"
  },
  {
    icon: <Megaphone className="w-8 h-8" />,
    title: "Ads & Marketing",
    desc: "Data-driven advertising campaigns that maximize conversion and lower your acquisition cost.",
    gradient: "from-blue-700 to-indigo-600"
  },
  {
    icon: <Bot className="w-8 h-8" />,
    title: "AI Chatbots",
    desc: "Intelligent customer service bots that handle inquiries and close sales 24/7.",
    gradient: "from-indigo-600 to-purple-600"
  },
  {
    icon: <Palette className="w-8 h-8" />,
    title: "Graphic Designing",
    desc: "Breathtaking visual identities and branding that make your business unforgettable.",
    gradient: "from-cyan-500 to-blue-600"
  },
  {
    icon: <Layout className="w-8 h-8" />,
    title: "WordPress Sites",
    desc: "Premium, scalable WordPress solutions tailored for ease of use and SEO performance.",
    gradient: "from-blue-600 to-blue-900"
  },
  {
    icon: <Video className="w-8 h-8" />,
    title: "Video Editing",
    desc: "Cinematic post-production for social media, ads, and corporate presentations.",
    gradient: "from-blue-500 to-indigo-400"
  },
  {
    icon: <ShoppingBag className="w-8 h-8" />,
    title: "Storify Shops",
    desc: "Complete e-commerce setups designed for maximum conversion and seamless checkout.",
    gradient: "from-indigo-700 to-blue-500"
  },
  {
    icon: <Terminal className="w-8 h-8" />,
    title: "Custom SaaS",
    desc: "Scale your business with dedicated custom software architecture and cloud integration.",
    gradient: "from-blue-400 to-blue-700"
  }
];

const Services = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1 }
    );

    const children = scrollRef.current?.children;
    if (children) {
      Array.from(children).forEach((child) => observer.observe(child));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-24">
        <h2 className="text-blue-500 font-bold uppercase tracking-widest text-sm mb-4">Our Services</h2>
        <h3 className="text-5xl md:text-7xl font-black mb-8 tracking-tight">
          Everything You Need to <br />
          <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Scale Digitally</span>
        </h3>
        <p className="max-w-2xl mx-auto text-slate-400 text-lg">
          We combine technical excellence with strategic marketing to deliver results that transform businesses.
        </p>
      </div>

      <div ref={scrollRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, idx) => (
          <div 
            key={idx} 
            className="group relative p-10 rounded-[2.5rem] bg-slate-900/50 border border-slate-800 hover:border-blue-500/50 transition-all duration-500 overflow-hidden opacity-0 translate-y-10"
            style={{ transitionDelay: `${idx * 100}ms` }}
          >
            {/* Hover Gradient Effect */}
            <div className={`absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-20 blur-[80px] transition-all duration-700 group-hover:scale-150`}></div>
            
            <div className={`mb-8 p-4 inline-block rounded-2xl bg-gradient-to-br ${service.gradient} shadow-xl shadow-blue-500/20 text-white transform group-hover:rotate-6 transition-transform duration-500`}>
              {service.icon}
            </div>
            
            <h4 className="text-2xl font-bold mb-4 text-blue-900 group-hover:text-blue-400 transition-colors">{service.title}</h4>
            <p className="text-slate-400 text-base leading-relaxed mb-8">
              {service.desc}
            </p>
            
            <div className="flex items-center text-blue-400 font-black text-sm cursor-pointer group/link uppercase tracking-widest">
              Learn More 
              <span className="ml-2 transform group-hover/link:translate-x-2 transition-transform duration-300">→</span>
            </div>
            
            {/* Background Accent */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
