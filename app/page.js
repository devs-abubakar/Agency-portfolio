"use client";
import React, { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import WhyChooseUs from "./components/WhyChooseUs";
import About from "./components/About";
import Projects from "./components/Projects";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AIAssistant from "./components/AIAssistant";
import Cursor from "./components/Customcursor";
import { InteractiveScrollSection } from "./components/Interactivescroll";
import Loader from "./components/Loader";
import Lenis from "@studio-freight/lenis";

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [loaderVisible, setLoaderVisible] = useState(true);
  const [contentLoaded, setContentLoaded] = useState(false);
  const lenisRef = useRef(null);

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Simulate content load
  useEffect(() => {
    const timer = setTimeout(() => setContentLoaded(true), 3000); // replace with actual content loading
    return () => clearTimeout(timer);
  }, []);

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    if (!loaderVisible) {
      lenisRef.current = new Lenis({
        duration: 1.2,
        easing: (t) => t, // linear easing
        smooth: true,
        direction: "vertical",
      });

      function raf(time) {
        lenisRef.current.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
    }
  }, [loaderVisible]);

  return (
    <>
      {/* Loader */}
      {loaderVisible && (
        <Loader
          contentLoaded={contentLoaded}
          onAnimationComplete={() => setLoaderVisible(false)}
        />
      )}

      {/* Main App */}
      {!loaderVisible && (
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
              <InteractiveScrollSection />
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
          <AIAssistant />
          <Cursor />
        </div>
      )}
    </>
  );
};

export default App;
