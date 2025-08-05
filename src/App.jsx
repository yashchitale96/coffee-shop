import { useRef, useEffect } from 'react';
import { useScroll, useMotionValueEvent, motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Scene from './components/3D/Scene';
import Hero from './sections/Hero';
import OurStory from './sections/OurStory';
import Menu from './sections/Menu';
import FeaturedBlend from './sections/FeaturedBlend';
import VisitUs from './sections/VisitUs';
import Footer from './sections/Footer';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

function App() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const menuRef = useRef(null);
  const featuredRef = useRef(null);
  const visitRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start', 'end']
  });
  
  // Track scroll progress for debugging
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    console.log("Scroll progress:", latest);
  });
  
  // Set up GSAP ScrollTrigger animations
  useEffect(() => {
    // Create a smooth parallax effect between sections
    const sections = [
      { ref: heroRef, offset: 0 },
      { ref: storyRef, offset: 0.1 },
      { ref: menuRef, offset: 0.2 },
      { ref: featuredRef, offset: 0.3 },
      { ref: visitRef, offset: 0.1 }
    ];
    
    sections.forEach((section, index) => {
      if (!section.ref.current) return;
      
      // Create parallax effect for background elements
      const bgElements = section.ref.current.querySelectorAll('.bg-element');
      bgElements.forEach((element) => {
        gsap.fromTo(
          element,
          { y: -30, opacity: 0 },
          {
            y: 30,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section.ref.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            }
          }
        );
      });
      
      // Create reveal animation for section content
      gsap.fromTo(
        section.ref.current.querySelector('.section-content'),
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section.ref.current,
            start: "top 80%",
            end: "top 30%",
            scrub: 1,
          }
        }
      );
    });
    
    return () => {
      // Clean up all ScrollTriggers on unmount
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      <Navbar />
      <Scene />
      
      <main ref={containerRef} className="relative z-10 overflow-hidden">
        <div ref={heroRef}>
          <Hero />
        </div>
        <div ref={storyRef}>
          <OurStory />
        </div>
        <div ref={menuRef}>
          <Menu />
        </div>
        <div ref={featuredRef}>
          <FeaturedBlend />
        </div>
        <div ref={visitRef}>
          <VisitUs />
        </div>
        <Footer />
      </main>
    </>
  )
}

export default App
