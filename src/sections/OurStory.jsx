import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRef } from 'react';

export default function OurStory() {
  const sectionRef = useRef(null);
  const [contentRef, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
    rootMargin: "-100px 0px",
  });

  // Set up scroll-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Parallax transformations
  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.1]);
  const bgCircleY1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const bgCircleY2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const textX = useTransform(scrollYProgress, [0.1, 0.6], [-50, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  
  // Content reveal animation variants
  const contentVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
        ease: "easeOut"
      }
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" }
    },
  };

  return (
    <section 
      ref={sectionRef}
      id="our-story" 
      className="min-h-screen w-full flex items-center py-24 relative bg-gradient-to-b from-cream to-cream/90 overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('/coffee-pattern.png')] bg-repeat opacity-[0.03]"></div>
      
      <div className="container mx-auto px-4 md:px-8 section-content relative z-10">
        <motion.div 
          ref={contentRef}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={contentVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Enhanced image with parallax effect and animations */}
          <motion.div 
            style={{ y: imageY, scale: imageScale }}
            className="md:order-2 relative"
          >
            <motion.div 
              variants={itemVariants} 
              className="overflow-hidden rounded-2xl transform origin-bottom relative"
            >
              <motion.div 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-80 md:h-[500px] bg-[url('/coffee-beans.jpg')] bg-cover bg-center rounded-2xl shadow-2xl"
              >
                {/* Add grain overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-charcoal/20 to-transparent mix-blend-multiply rounded-2xl"></div>
              </motion.div>
            </motion.div>
            
            {/* Enhanced decorative elements */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-gradient-to-br from-mocha to-mocha/80 flex items-center justify-center shadow-xl"
            >
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="text-cream font-serif text-base"
              >
                Since 2010
              </motion.span>
            </motion.div>
            
            {/* Added floating bean illustration */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: [0, -15, 0], opacity: 0.8 }}
              transition={{ 
                y: { duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
                opacity: { duration: 1, delay: 1 } 
              }}
              className="absolute -top-10 -right-10 w-24 h-24 text-mocha/20"
            >
              <svg viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M50,0 C77.6142,0 100,22.3858 100,50 C100,77.6142 77.6142,100 50,100 C22.3858,100 0,77.6142 0,50 C0,22.3858 22.3858,0 50,0 Z M50,20 C33.4315,20 20,33.4315 20,50 C20,66.5685 33.4315,80 50,80 C66.5685,80 80,66.5685 80,50 C80,33.4315 66.5685,20 50,20 Z" />
              </svg>
            </motion.div>
          </motion.div>
          
          {/* Enhanced text content with reveal animations */}
          <motion.div 
            style={{ x: textX }}
            className="md:order-1"
          >
            <motion.div variants={itemVariants} className="mb-2">
              <span className="text-xs text-mocha/60 tracking-widest uppercase font-sans font-medium">Our journey</span>
            </motion.div>
            
            <motion.h2 
              style={{ opacity: titleOpacity }}
              variants={itemVariants}
              className="text-4xl md:text-6xl font-serif font-bold mb-8 relative inline-block"
            >
              <span className="bg-gradient-to-r from-mocha to-mocha/80 bg-clip-text text-transparent">Our Story</span>
              <motion.span 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute -bottom-4 left-0 h-1 bg-gradient-to-r from-mocha to-transparent"
              ></motion.span>
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl text-charcoal/80 mb-6 leading-relaxed font-light"
            >
              Founded in 2010, our journey began with a simple passion for <span className="font-medium text-charcoal">exceptional coffee</span>. We traveled the world in search of the finest beans, forming relationships with farmers who share our commitment to quality and sustainability.
            </motion.p>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl text-charcoal/80 mb-8 leading-relaxed font-light"
            >
              Every cup we serve is the result of careful sourcing, precise roasting, and meticulous brewing. Our artisans train for years to perfect their craft, ensuring that each coffee experience is <span className="font-medium text-mocha">remarkable</span>.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-6 mb-8"
            >
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-mocha/10 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-mocha" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <span className="font-medium">Ethically Sourced</span>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-mocha/10 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-mocha" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="font-medium">Small Batch Roasted</span>
              </div>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              className="p-6 border border-mocha/10 rounded-xl bg-cream/50 backdrop-blur-sm mb-8 relative overflow-hidden"
            >
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-mocha/5"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-mocha/30 to-transparent"></div>
              <p className="text-lg text-charcoal/90 italic relative z-10">
                "Today, we continue to innovate while honoring traditional methods, creating a unique coffee experience that bridges the past and present."
              </p>
              <p className="mt-4 font-serif text-right text-mocha font-medium">— James Harrison, Founder</p>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              className="mt-10 relative"
            >
              <motion.a 
                href="#menu" 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-mocha text-cream rounded-full hover:bg-charcoal transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 group"
              >
                <span>Explore Our Menu</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.a>
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.2, 1], opacity: [0, 0.3, 0.1] }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute -z-10 inset-0 bg-mocha/20 rounded-full filter blur-xl"
              ></motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Background elements with parallax */}
      <motion.div 
        style={{ y: bgCircleY1 }}
        className="absolute top-20 left-20 w-40 h-40 rounded-full bg-mocha/10 bg-element -z-10"
      ></motion.div>
      <motion.div 
        style={{ y: bgCircleY2 }}
        className="absolute bottom-20 right-20 w-60 h-60 rounded-full bg-mocha/5 bg-element -z-10"
      ></motion.div>
      
      {/* Coffee bean pattern */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/coffee-pattern.png')] opacity-[0.03] bg-repeat -z-20"></div>
    </section>
  );
}
