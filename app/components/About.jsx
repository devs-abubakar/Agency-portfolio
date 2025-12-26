'use client';
import React, { useLayoutEffect, useRef } from 'react';
import { Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const team = [
  {
    name: "Abdul Rehman",
    role: "Founder & Creative Director",
    image: "/images/AbdulRehman.jpeg",
    bio: "Visionary leader with 10+ years in digital transformation.",
    socials: {
      linkedin: "https://linkedin.com/in/abdulrehman",
      facebook: "https://facebook.com/abdulrehman",
      instagram: "https://instagram.com/abdulrehman"
    }
  },
  {
    name: "Muhammad",
    role: "Co-Founder & Designer",
    image: "/images/Muhammad.jpeg",
    bio: "Creative mind behind our successful brand identities.",
    socials: {
      linkedin: "https://linkedin.com/in/muhammad",
      facebook: "https://facebook.com/muhammad",
      instagram: "https://instagram.com/muhammad"
    }
  },
  {
    name: "Ammar",
    role: "E-Commerce Strategist",
    image: "/images/Ammar.jpeg",
    bio: "Marketing strategist with a proven track record of driving revenue growth.",
    socials: {
      linkedin: "https://www.facebook.com/share/17d5fX9beY/",
      facebook: "https://www.linkedin.com/in/ammar-siddiqui-340944260?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      instagram: "https://instagram.com/ammar"
    }
  },
  {
    name: "Abu Bakar",
    role: "Web Developer & UI/UX Specialist",
    image: "https://picsum.photos/400/500?random=24",
    bio: "Architecture expert specializing in high-load React apps.",
    socials: {
      linkedin: "https://linkedin.com/in/abubakar",
      facebook: "https://facebook.com/abubakar",
      instagram: "https://instagram.com/abubakar"
    }
  }
];

const About = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Header Animation
      gsap.from(headerRef.current.children, {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
        }
      });

      // Team Cards Stagger
      gsap.from(cardsRef.current, {
        y: 100,
        opacity: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef} 
      className="py-24 bg-brand-dark overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div 
          ref={headerRef}
          className="flex flex-col md:flex-row items-start md:items-end justify-between mb-20 gap-8"
        >
          <div className="md:w-3/5">
            <h2 className="text-blue-500 font-bold uppercase tracking-[0.3em] text-xs mb-4">
              Who We Are
            </h2>
            <h3 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight">
              A Collective of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Digital Architects
              </span>
            </h3>
          </div>
          <div className="md:w-2/5">
            <p className="text-slate-400 text-lg leading-relaxed border-l-2 border-blue-500/30 pl-6">
              Aivora Digitals was born from the idea that every business deserves a world-class digital presence. We are a distributed team of specialists obsessed with results.
            </p>
          </div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {team.map((member, idx) => (
            <div 
              key={idx} 
              ref={el => cardsRef.current[idx] = el}
              className="group relative"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] sm:aspect-[3/4] rounded-2xl overflow-hidden mb-5 bg-slate-900">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover sm:grayscale lg:group-hover:grayscale-0 lg:group-hover:scale-110 transition-all duration-700 ease-out"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500"></div>
                
                {/* Social Overlay */}
                <div className="absolute inset-x-0 bottom-4 flex justify-center gap-3 lg:inset-0 lg:items-center lg:opacity-0 lg:translate-y-10 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 transition-all duration-500 ease-out">
                  {member.socials.linkedin && (
                    <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-blue-600 hover:border-blue-500 transition-all">
                      <Linkedin className="w-4 h-4 text-white" />
                    </a>
                  )}
                  {member.socials.facebook && (
                    <a href={member.socials.facebook} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-blue-600 hover:border-blue-500 transition-all">
                      <Facebook className="w-4 h-4 text-white" />
                    </a>
                  )}
                  {member.socials.instagram && (
                    <a href={member.socials.instagram} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-pink-500 hover:border-pink-400 transition-all">
                      <Instagram className="w-4 h-4 text-white" />
                    </a>
                  )}
                </div>
              </div>

              {/* Text Content */}
              <div className="relative transform group-hover:-translate-y-2 transition-transform duration-500">
                <h4 className="text-2xl font-display font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                  {member.name}
                </h4>
                <p className="text-blue-500 text-xs uppercase tracking-widest font-bold mb-3">
                  {member.role}
                </p>
                <p className="text-slate-500 text-sm leading-relaxed max-w-[90%]">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
