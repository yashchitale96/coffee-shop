import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRef } from 'react';

export default function FeaturedBlend() {
  const sectionRef = useRef(null);
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

  // Set up scroll-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Advanced parallax transformations
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 10]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.3], [0.05, 0.15]);
  
  // For decorative elements
  const circleScale = useTransform(scrollYProgress, [0, 1], [0.8, 1.2]);
  const circleOpacity = useTransform(scrollYProgress, [0, 0.5], [0.1, 0.3]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1] // Custom easing function
      } 
    }
  };

  return (
    <section 
      ref={sectionRef} 
      id="featured-blend" 
      className="min-h-screen w-full flex items-center py-24 relative bg-gradient-to-br from-mocha to-mocha/90 text-cream overflow-hidden"
    >
      {/* Enhanced background elements */}
      <motion.div 
        className="absolute inset-0"
        style={{ opacity: bgOpacity }}
      >
        <div className="absolute inset-0 bg-[url('/coffee-pattern.png')] bg-repeat mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal/30 to-transparent"></div>
      </motion.div>
      
      {/* Decorative circles */}
      <motion.div 
        style={{ scale: circleScale, opacity: circleOpacity }}
        className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-cream/10 blur-xl"
      ></motion.div>
      <motion.div 
        style={{ scale: circleScale, opacity: circleOpacity }}
        className="absolute -bottom-40 -left-20 w-96 h-96 rounded-full bg-cream/5 blur-xl"
      ></motion.div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          style={{ y, scale }}
          className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
        >
          <motion.div variants={itemVariants} className="order-2 md:order-1">
            <motion.div className="mb-4">
              <span className="inline-block px-3 py-1 border border-cream/30 text-xs tracking-widest uppercase rounded-full text-cream/70">Limited Edition</span>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">
              Featured Blend: 
              <span className="block mt-4 text-5xl md:text-6xl text-cream opacity-90">Ethiopian Yirgacheffe</span>
            </h2>
            
            <p className="text-cream/90 text-xl mb-8 leading-relaxed font-light">
              Our current featured blend showcases the exceptional flavors of Ethiopia's Yirgacheffe region. These beans are grown at high elevations, producing a bright, complex coffee with distinctive floral and citrus notes.
            </p>
            
            <div className="flex flex-col gap-8 mb-10">
              <motion.div 
                variants={itemVariants}
                className="flex items-center gap-5 group"
                whileHover={{ x: 10 }}
              >
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cream/20 to-cream/5 flex items-center justify-center shadow-lg backdrop-blur-sm group-hover:bg-cream/30 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-serif mb-1">Flavor Profile</h3>
                  <p className="text-cream/80 text-lg">Floral, citrus, honey with a clean finish</p>
                </div>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="flex items-center gap-5 group"
                whileHover={{ x: 10 }}
              >
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cream/20 to-cream/5 flex items-center justify-center shadow-lg backdrop-blur-sm group-hover:bg-cream/30 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-serif mb-1">Roast Level</h3>
                  <p className="text-cream/80 text-lg">Medium roast to highlight natural sweetness</p>
                </div>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="flex items-center gap-5 group"
                whileHover={{ x: 10 }}
              >
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cream/20 to-cream/5 flex items-center justify-center shadow-lg backdrop-blur-sm group-hover:bg-cream/30 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-serif mb-1">Origin</h3>
                  <p className="text-cream/80 text-lg">Single origin from Yirgacheffe, Ethiopia</p>
                </div>
              </motion.div>
            </div>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-5"
            >
              <motion.a 
                href="#" 
                className="px-8 py-4 bg-cream text-mocha rounded-full text-center hover:bg-white hover:shadow-glow transition-all font-sans font-semibold text-lg shadow-xl"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                Shop Now
              </motion.a>
              <motion.a 
                href="#" 
                className="px-8 py-4 border-2 border-cream/80 text-cream rounded-full text-center hover:bg-cream/20 transition-all font-sans font-semibold text-lg"
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.a>
            </motion.div>
          </motion.div>
          
          <motion.div 
            variants={itemVariants} 
            className="order-1 md:order-2"
            style={{ rotate }}
          >
            <div className="relative">
              <motion.div 
                whileHover={{ scale: 1.05, rotate: -5 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="rounded-full w-[300px] h-[300px] md:w-[450px] md:h-[450px] bg-gradient-to-br from-cream/20 to-cream/5 mx-auto overflow-hidden shadow-2xl backdrop-blur-sm"
              >
                <div className="w-full h-full bg-[url('/coffee-bag.jpg')] bg-cover bg-center rounded-full transition-transform duration-700 relative">
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-mocha/30 to-transparent mix-blend-overlay rounded-full"></div>
                  
                  {/* Shine effect */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-tr from-transparent via-cream/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-1000"
                    animate={{
                      backgroundPosition: ["200% 0%", "-100% 100%"],
                    }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "mirror",
                      duration: 3,
                    }}
                  ></motion.div>
                </div>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="absolute -bottom-10 -right-10 bg-gradient-to-br from-cream to-cream/90 text-mocha rounded-full w-36 h-36 flex flex-col items-center justify-center shadow-xl"
              >
                <span className="text-xl font-serif font-bold">Limited</span>
                <span className="text-xl font-serif font-bold">Edition</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
