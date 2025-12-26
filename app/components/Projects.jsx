
import React, { useState } from 'react';
import { ExternalLink, Search } from 'lucide-react';

const categories = ["All", "Web", "Marketing", "E-commerce"];

const projects = [
  {
    title: "Nova Horizon",
    category: "Web",
    image: "https://picsum.photos/800/600?random=31"
  },
  {
    title: "EcoSphere Ads",
    category: "Marketing",
    image: "https://picsum.photos/800/600?random=32"
  },
  {
    title: "Luxe Storify",
    category: "E-commerce",
    image: "https://picsum.photos/800/600?random=33"
  },
  {
    title: "Quantum Portal",
    category: "Web",
    image: "https://picsum.photos/800/600?random=34"
  },
  {
    title: "Vibe Marketing",
    category: "Marketing",
    image: "https://picsum.photos/800/600?random=35"
  },
  {
    title: "Artisanal Hub",
    category: "E-commerce",
    image: "https://picsum.photos/800/600?random=36"
  }
];

const Projects= () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
        <div>
          <h2 className="text-blue-500 font-bold uppercase tracking-widest text-sm mb-4 text-center md:text-left">Selected Projects</h2>
          <h3 className="text-4xl md:text-5xl font-black text-center md:text-left">Crafting <span className="text-blue-400">Digital Landmarks</span></h3>
        </div>
        
        <div className="flex items-center p-1 bg-slate-900 rounded-2xl border border-slate-800">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                activeCategory === cat ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, idx) => (
          <div
  key={idx}
  className="group relative rounded-3xl overflow-hidden cursor-pointer
             aspect-[4/3] max-h-[320px] sm:max-h-[360px] lg:max-h-none"
>
  <img
    src={project.image}
    alt={project.title}
    className="w-full h-full object-cover
               transition-transform duration-700
               lg:group-hover:scale-125"
  />

  {/* Overlay */}
  <div
    className="
      absolute inset-x-0 bottom-0
      bg-gradient-to-t from-blue-900/90 via-blue-900/60 to-transparent
      p-5 sm:p-6
      lg:inset-0 lg:translate-y-full lg:group-hover:translate-y-0
      transition-transform duration-500
      flex flex-col justify-end
    "
  >
    <span className="text-blue-300 text-xs font-bold uppercase tracking-widest mb-1">
      {project.category}
    </span>
    <h4 className="text-xl sm:text-2xl font-black mb-2">
      {project.title}
    </h4>
    <div className="flex items-center text-white font-bold text-sm">
      View Project <ExternalLink className="ml-2 w-4 h-4" />
    </div>
  </div>

  {/* Search Icon (desktop only) */}
  <div className="
      hidden lg:flex
      absolute top-4 right-4 p-3
      bg-white/10 backdrop-blur-md
      rounded-full opacity-0
      group-hover:opacity-100 transition-opacity
    ">
    <Search className="w-5 h-5" />
  </div>
</div>

        ))}
      </div>
    </div>
  );
};

export default Projects;
