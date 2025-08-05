import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import { useRef } from 'react';

export default function Hero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  // Simplified parallax effects to avoid errors
  const y = useTransform(
    scrollYProgress, 
    [0, 1], 
    [0, 300]
  );
  
  // More gradual fade-out to keep content visible longer
  const opacity = useTransform(
    scrollYProgress, 
    [0, 0.3, 0.5], 
    [1, 0.8, 0]
  );
  
  // Multi-step scaling for a more dynamic feel
  const scale = useTransform(
    scrollYProgress, 
    [0, 0.2, 0.5], 
    [1, 0.9, 0.8]
  );
  
  // Enhanced text movement with slight bounce effect (simplified)
  const textY = useTransform(
    scrollYProgress, 
    [0, 0.2, 0.5], 
    [0, -50, -120]
  );
  
  // Enhance depth perception with more pronounced 3D rotation (simplified)
  const rotateX = useTransform(
    scrollYProgress, 
    [0, 0.25, 0.5], 
    [0, -2.5, -8]
  );
  
  const rotateY = useTransform(
    scrollYProgress, 
    [0, 0.25, 0.5], 
    [0, 1, 2]
  );
  
  const depth = useTransform(
    scrollYProgress, 
    [0, 0.25, 0.5], 
    [1, 1.1, 1.25]
  );
  
  // Enhanced text shadow effect for better 3D appearance (simplified)
  const textShadow = useTransform(
    scrollYProgress, 
    [0, 0.25, 0.5], 
    [
      '0px 2px 4px rgba(111, 78, 55, 0.1)', 
      '0px 3px 6px rgba(111, 78, 55, 0.2)', 
      '0px 5px 10px rgba(111, 78, 55, 0.4)'
    ]
  );
  
  // Enhanced circular decorative elements with multi-dimensional parallax (simplified)
  // Circle 1 - top left
  const circleY1 = useTransform(
    scrollYProgress, 
    [0, 0.25, 0.5, 1], 
    [0, -50, -100, -180]
  );
  const circleX1 = useTransform(
    scrollYProgress, 
    [0, 0.5], 
    [0, -50]
  );
  const circleScale1 = useTransform(
    scrollYProgress, 
    [0, 0.25, 0.5], 
    [1, 1.1, 1.25]
  );
  const circleRotate1 = useTransform(
    scrollYProgress, 
    [0, 0.5], 
    [0, -15]
  );
  
  // Circle 2 - bottom right (simplified)
  const circleY2 = useTransform(
    scrollYProgress, 
    [0, 0.25, 0.5, 1], 
    [0, -30, -60, -120]
  );
  const circleX2 = useTransform(
    scrollYProgress, 
    [0, 0.5], 
    [0, 30]
  );
  const circleScale2 = useTransform(
    scrollYProgress, 
    [0, 0.5], 
    [1, 0.9]
  );
  const circleRotate2 = useTransform(
    scrollYProgress, 
    [0, 0.25, 0.5], 
    [0, 25, 60]
  );
  
  // Circle 3 - top right (simplified)
  const circleY3 = useTransform(
    scrollYProgress, 
    [0, 0.25, 0.5, 1], 
    [0, -80, -150, -250]
  );
  const circleX3 = useTransform(
    scrollYProgress, 
    [0, 0.5], 
    [0, -20]
  );
  const circleRotate3 = useTransform(
    scrollYProgress, 
    [0, 0.5], 
    [0, 30]
  );
  const circleOpacity3 = useTransform(
    scrollYProgress, 
    [0, 0.3, 0.5], 
    [0.3, 0.15, 0]
  );
  
  // Add a fourth circle for more visual interest (simplified)
  const circleY4 = useTransform(
    scrollYProgress, 
    [0, 0.25, 0.5, 1], 
    [0, -40, -90, -160]
  );
  const circleScale4 = useTransform(
    scrollYProgress, 
    [0, 0.5], 
    [1, 1.3]
  );
  const circleOpacity4 = useTransform(
    scrollYProgress, 
    [0, 0.5], 
    [0.2, 0.05]
  );

  return (
    <section ref={sectionRef} className="h-screen w-full relative flex items-center justify-center overflow-hidden">
      <motion.div 
        style={{ 
          y: textY, 
          opacity, 
          scale,
          rotateX,
          rotateY,
          z: depth,
          textShadow
        }}
        className="container mx-auto text-center z-10 px-4 section-content"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 1.2, 
            ease: "easeOut" 
          }}
          className="mb-12"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-2 text-mocha/80"
          >
            <span className="inline-block px-4 py-1 border border-mocha/20 rounded-full text-sm font-sans tracking-widest">EST. 2010</span>
          </motion.div>
          
          <motion.div
            className="overflow-hidden relative"
          >
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-9xl font-serif font-bold tracking-tight leading-none"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 50, 
                damping: 20,
                delay: 0.3
              }}
            >
              <motion.span 
                className="text-charcoal mb-2 relative block"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ 
                  duration: 1, 
                  delay: 0.5, 
                  ease: "easeOut"
                }}
              >
                Artisan Coffee
              </motion.span>
              <motion.div className="overflow-hidden">
                <motion.span 
                  className="text-mocha bg-gradient-to-r from-mocha to-mocha/70 bg-clip-text text-transparent block"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ 
                    duration: 1, 
                    delay: 0.8, 
                    ease: "easeOut"
                  }}
                >
                  Crafted with Passion
                </motion.span>
              </motion.div>
            </motion.h1>
            {/* Decorative line under heading */}
            <motion.div
              className="h-1 w-32 md:w-48 bg-gradient-to-r from-mocha to-transparent mx-auto mt-4"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: 1.2 }}
            />
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-8 text-xl md:text-2xl text-charcoal/70 max-w-2xl mx-auto font-light"
          >
            Experience the perfect blend of tradition and innovation in every cup
          </motion.p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="relative"
        >
          <a 
            href="#our-story" 
            className="inline-block px-10 py-5 mt-8 bg-mocha text-cream rounded-full hover:bg-charcoal transition-all font-sans font-medium text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 relative overflow-hidden group"
          >
            <span className="relative z-10">Explore Our Story</span>
            <motion.span 
              className="absolute inset-0 bg-gradient-to-r from-mocha/80 to-mocha opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            ></motion.span>
          </a>
        </motion.div>
      </motion.div>
      
      {/* Enhanced animated scroll indicator with multi-part animation */}
      <motion.div 
        style={{ opacity }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-charcoal/70 z-10 flex flex-col items-center"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="text-xs uppercase tracking-widest mb-2 font-sans"
        >
          Scroll to discover
        </motion.p>
        
        <motion.div
          initial={{ y: 0, opacity: 0.4, scale: 1, rotateZ: 0 }}
          animate={{ y: 12, opacity: 1, scale: 1.1, rotateZ: 5 }}
          transition={{ 
            y: {
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            },
            opacity: {
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            },
            scale: {
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            },
            rotateZ: {
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }
          }}
          className="bg-gradient-to-b from-cream/80 to-cream/50 rounded-full p-3 shadow-lg backdrop-blur-sm border border-mocha/5 group hover:shadow-xl hover:from-cream/90 hover:to-cream/60 transition-all cursor-pointer"
        >
          <motion.svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-8 w-8 group-hover:text-mocha transition-colors" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </motion.svg>
          
          {/* Subtle ripple effect - simplified to avoid array-based animation */}
          <motion.div
            className="absolute inset-0 rounded-full"
            initial={{
              boxShadow: "0 0 0 0 rgba(111, 78, 55, 0)",
              scale: 0.8
            }}
            animate={{
              boxShadow: "0 0 0 10px rgba(111, 78, 55, 0.1)",
              scale: 1.2
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </motion.div>
      </motion.div>
      
      {/* Enhanced background texture with multi-layered parallax */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        {/* Base color gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-cream/30 to-cream bg-element opacity-90"></div>
        
        {/* Wood texture with subtle movement - simplified */}
        <motion.div 
          style={{
            y: useTransform(scrollYProgress, [0, 1], [0, -30])
          }}
          className="absolute inset-0 bg-[url('/wood-texture.svg')] bg-repeat bg-element opacity-10 mix-blend-multiply"
        ></motion.div>
        
        {/* Subtle grain overlay - simplified */}
        <motion.div 
          style={{
            y: useTransform(scrollYProgress, [0, 1], [0, -15])
          }}
          className="absolute inset-0 bg-[url('/noise-texture.svg')] bg-repeat bg-element opacity-5 mix-blend-overlay"
        ></motion.div>
        
        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-radial-gradient pointer-events-none"></div>
      </motion.div>
      
      {/* Enhanced decorative coffee bean shapes with multi-dimensional parallax */}
      <motion.div 
        style={{ 
          y: circleY1, 
          x: circleX1, 
          scale: circleScale1, 
          rotate: circleRotate1 
        }}
        className="absolute top-20 -left-20 w-64 h-64 rounded-full bg-gradient-to-br from-mocha/10 to-transparent backdrop-blur-sm bg-element z-0"
      ></motion.div>
      <motion.div 
        style={{ 
          y: circleY2, 
          x: circleX2, 
          scale: circleScale2, 
          rotate: circleRotate2 
        }}
        className="absolute bottom-40 -right-32 w-96 h-96 rounded-full bg-gradient-to-tl from-mocha/8 to-transparent backdrop-blur-sm bg-element z-0"
      ></motion.div>
      <motion.div 
        style={{ 
          y: circleY3, 
          x: circleX3, 
          rotate: circleRotate3, 
          opacity: circleOpacity3 
        }}
        className="absolute -top-20 right-1/4 w-40 h-40 rounded-full bg-gradient-to-tr from-mocha/10 to-transparent backdrop-blur-sm bg-element z-0"
      ></motion.div>
      
      {/* Added fourth decorative element for enhanced visual depth */}
      <motion.div 
        style={{ 
          y: circleY4, 
          scale: circleScale4, 
          opacity: circleOpacity4 
        }}
        className="absolute bottom-32 left-1/4 w-72 h-72 rounded-full bg-gradient-to-tl from-mocha/5 to-transparent backdrop-blur-md bg-element z-0"
      ></motion.div>
      
      {/* Enhanced coffee bean illustration with parallax movement - simplified */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.08 }}
        transition={{ delay: 1, duration: 2 }}
        style={{
          y: useTransform(scrollYProgress, [0, 1], [0, 50]),
          rotate: useTransform(scrollYProgress, [0, 1], [0, 10]),
          scale: useTransform(scrollYProgress, [0, 1], [1, 1.15])
        }}
        className="absolute bottom-0 right-0 w-3/4 h-3/4 bg-[url('/coffee-bean-illustration.svg')] bg-no-repeat bg-contain bg-right-bottom opacity-5 z-0 origin-bottom-right"
      ></motion.div>
      
      {/* Add subtle floating coffee bean particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(5)].map((_, i) => (
          <motion.div 
            key={i}
            className="absolute w-16 h-16 bg-[url('/coffee-bean-small.svg')] bg-no-repeat bg-contain opacity-5"
            style={{
              x: `${10 + i * 20}%`,
              y: `${15 + i * 15}%`,
            }}
            initial={{
              y: `${15 + i * 15}%`,
              rotate: 0,
              scale: 1
            }}
            animate={{
              y: `${20 + i * 15}%`,
              rotate: i % 2 === 0 ? 15 : -15,
              scale: 1.1
            }}
            transition={{
              duration: 5 + i,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.7
            }}
          />
        ))}
      </div>
    </section>
  );
}
