import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRef } from 'react';

export default function VisitUs() {
  const sectionRef = useRef(null);
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  // Set up scroll-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Enhanced parallax effects
  const y = useTransform(scrollYProgress, [0, 1], [100, -50]);
  const mapScale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1.05]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  
  // Box shadows for cards
  const cardShadow = useTransform(
    scrollYProgress,
    [0, 0.5],
    ['0px 10px 30px rgba(0,0,0,0.1)', '0px 20px 40px rgba(0,0,0,0.2)']
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1] 
      } 
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="visit-us" 
      className="min-h-screen w-full py-24 bg-gradient-to-b from-cream/90 to-cream relative"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('/coffee-beans-pattern.svg')] bg-repeat opacity-[0.02]"></div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          style={{ opacity: headerOpacity }}
          className="text-center mb-20"
        >
          <motion.div className="inline-block mb-3">
            <span className="text-xs text-mocha/60 tracking-widest uppercase font-sans font-medium bg-mocha/5 px-3 py-1 rounded-full">
              Come See Us
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 bg-gradient-to-r from-mocha to-charcoal bg-clip-text text-transparent">
            Visit Us
          </h2>
          <p className="text-xl text-charcoal/70 max-w-2xl mx-auto font-light">
            Experience our warm atmosphere and exceptional coffee in person
          </p>
          
          <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, type: "spring" }}
            className="w-20 h-1 bg-gradient-to-r from-mocha to-transparent mx-auto mt-8"
          ></motion.div>
        </motion.div>
        
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
        >
          <motion.div 
            variants={itemVariants}
            style={{ scale: mapScale }}
          >
            <motion.div 
              className="rounded-2xl overflow-hidden shadow-2xl"
              style={{ boxShadow: cardShadow }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
            >
              <iframe 
                title="Coffee Shop Location"
                width="100%" 
                height="450" 
                frameBorder="0" 
                style={{ border: 0 }} 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1183124908125!2d-74.0059!3d40.7127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM40zMCcwNi4wIk4gNzTCsDAwJzIxLjIiVw!5e0!3m2!1sen!2sus!4v1628534744204!5m2!1sen!2sus" 
                allowFullScreen
                loading="lazy"
              />
            </motion.div>
          </motion.div>
          
          <motion.div 
            variants={itemVariants} 
            className="flex flex-col gap-10"
            style={{ y }}
          >
            <motion.div 
              className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-500 border-t border-mocha/10"
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-mocha/10 rounded-full flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-mocha" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-serif font-bold text-mocha">Hours & Location</h3>
              </div>
              
              <div className="mb-6 pl-16">
                <p className="text-lg font-medium text-charcoal mb-2">Address:</p>
                <p className="text-charcoal/80 text-lg">123 Coffee Street<br />New York, NY 10001</p>
              </div>
              
              <div className="mb-6 pl-16">
                <p className="text-lg font-medium text-charcoal mb-2">Hours:</p>
                <div className="grid grid-cols-2 gap-2">
                  <p className="text-charcoal/80">Monday - Friday:</p>
                  <p className="text-charcoal font-medium">7:00 AM - 8:00 PM</p>
                  <p className="text-charcoal/80">Saturday:</p>
                  <p className="text-charcoal font-medium">8:00 AM - 9:00 PM</p>
                  <p className="text-charcoal/80">Sunday:</p>
                  <p className="text-charcoal font-medium">8:00 AM - 7:00 PM</p>
                </div>
              </div>
              
              <div className="pl-16">
                <p className="text-lg font-medium text-charcoal mb-2">Contact:</p>
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-mocha mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <p className="text-charcoal/80">(212) 555-1234</p>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-mocha mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <p className="text-charcoal/80">hello@coffeeshop.com</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-gradient-to-br from-mocha to-mocha/90 p-8 rounded-2xl text-cream shadow-xl relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-cream/10 rounded-full -translate-y-20 translate-x-20 blur-2xl"></div>
              
              <div className="flex items-center mb-6 relative z-10">
                <div className="w-12 h-12 bg-cream/10 backdrop-blur-sm rounded-full flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cream" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-serif font-bold">Special Events</h3>
              </div>
              
              <p className="text-cream/90 mb-6 text-lg relative z-10 pl-16">
                Join us for weekly coffee tastings every Thursday at 6:00 PM. Learn about different coffee regions and brewing methods from our expert baristas.
              </p>
              
              <div className="pl-16 relative z-10">
                <motion.a 
                  href="#" 
                  className="inline-flex items-center px-6 py-3 bg-cream text-mocha rounded-full hover:bg-white transition-all font-sans font-medium shadow-lg group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Reserve a Spot</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Background elements */}
      <div className="absolute top-40 right-10 w-60 h-60 rounded-full bg-mocha/5 -z-10"></div>
      <div className="absolute bottom-20 left-10 w-40 h-40 rounded-full bg-mocha/10 -z-10"></div>
    </section>
  );
}
