"use client"
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import About from './components/About';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AIAssistant from './components/AIAssistant';
import Cursor from './components/Customcursor';
import { InteractiveScrollSection } from './components/Interactivescroll';


const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 selection:bg-blue-500/30 selection:text-blue-200">
      <Navbar isScrolled={isScrolled} />
      
      <main>
        <section id="home">
          <Hero />
        </section>

        <section id="services" className="pt-20">
          <Services />
        </section>

        <section id="why-us">

<InteractiveScrollSection/>
        </section>
        <section id="about" className="py-20">
          <About />
        </section>

        <section id="projects" className="py-20">
          <Projects />
        </section>

        <section id="testimonials" className="py-20 bg-slate-900/50">
          <Testimonials />
        </section>

        <section id="contact" className="py-20">
          <Contact />
        </section>
      </main>
      <Footer />

      {/* Persistent AI Assistant Demo */}
      <AIAssistant />
      <Cursor/>
    </div>
  );
};

export default App;
