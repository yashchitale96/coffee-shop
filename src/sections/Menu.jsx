import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRef } from 'react';

export default function Menu() {
  const sectionRef = useRef(null);
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  // Set up scroll-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Parallax transformations
  const headerY = useTransform(scrollYProgress, [0, 0.5], [50, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.7,
        ease: [0.23, 1, 0.32, 1] // Cubic bezier for a more premium feel
      } 
    }
  };

  const coffeeItems = [
    {
      name: "Signature Espresso",
      description: "Rich and complex with notes of chocolate and caramel",
      price: "$4.50",
      image: "/coffee-signature.jpg",
      badges: ["Bestseller", "House Special"]
    },
    {
      name: "Pour Over",
      description: "Bright and clean with floral and fruity notes",
      price: "$5.25",
      image: "/coffee-pour.jpg",
      badges: ["Single Origin"]
    },
    {
      name: "Cold Brew",
      description: "Smooth and sweet with low acidity, steeped for 24 hours",
      price: "$5.50",
      image: "/coffee-cold.jpg",
      badges: ["24-Hour Brew"]
    },
    {
      name: "Cappuccino",
      description: "Equal parts espresso, steamed milk, and silky foam",
      price: "$5.00",
      image: "/coffee-cappuccino.jpg",
      badges: ["Classic"]
    },
    {
      name: "Mocha Latte",
      description: "Espresso with chocolate, steamed milk and whipped cream",
      price: "$5.75",
      image: "/coffee-mocha.jpg",
      badges: ["Fan Favorite"]
    },
    {
      name: "Matcha Latte",
      description: "Ceremonial grade matcha whisked with steamed milk",
      price: "$6.00",
      image: "/coffee-matcha.jpg",
      badges: ["Organic"]
    }
  ];

  return (
    <section 
      ref={sectionRef} 
      id="menu" 
      className="min-h-screen w-full py-24 relative bg-gradient-to-b from-[#f8f5f2] to-cream"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('/coffee-beans-pattern.svg')] bg-repeat opacity-[0.02]"></div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="text-center mb-20"
        >
          <motion.div className="inline-block mb-3">
            <span className="text-xs text-mocha/60 tracking-widest uppercase font-sans font-medium bg-mocha/5 px-3 py-1 rounded-full">
              Discover
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 bg-gradient-to-r from-mocha to-charcoal bg-clip-text text-transparent">
            Our Menu
          </h2>
          <p className="text-xl text-charcoal/70 max-w-2xl mx-auto font-light">
            Carefully crafted beverages made with precision and passion
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {coffeeItems.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 relative group"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-mocha to-transparent rounded-t-2xl"></div>
              
              <div className="h-48 bg-mocha/5 rounded-xl mb-6 overflow-hidden">
                <div 
                  className={`w-full h-full bg-[url('${item.image}')] bg-cover bg-center group-hover:scale-110 transition-transform duration-700`}
                ></div>
              </div>
              
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-serif font-bold text-charcoal">{item.name}</h3>
                <span className="text-xl font-serif font-bold text-mocha">{item.price}</span>
              </div>
              
              <p className="text-charcoal/70 mb-4 h-12">{item.description}</p>
              
              {item.badges && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.badges.map((badge, i) => (
                    <span 
                      key={i}
                      className="inline-block px-3 py-1 text-xs font-medium bg-mocha/10 text-mocha rounded-full"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              )}
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 bg-mocha/10 text-mocha font-medium rounded-lg hover:bg-mocha hover:text-cream transition-all duration-300"
              >
                Add to Order
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 1.2 }}
          className="mt-24 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-mocha/10 to-transparent rounded-2xl -z-10"></div>
          
          <div className="max-w-4xl mx-auto px-8 py-12 bg-white/50 backdrop-blur-sm rounded-2xl shadow-xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-left">
                <h3 className="text-2xl font-serif font-bold text-charcoal mb-4">Seasonal Specials</h3>
                <p className="text-lg text-charcoal/80 mb-6 italic">
                  "We also offer a rotating selection of seasonal specialties featuring unique flavor profiles and limited edition beans. Ask our baristas about today's features!"
                </p>
                <motion.a 
                  href="#featured-blend" 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-6 py-3 bg-mocha text-cream rounded-full hover:bg-charcoal transition-all shadow-lg group"
                >
                  <span>See Our Featured Blend</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.a>
              </div>
              
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-cream flex-shrink-0 shadow-lg">
                <motion.div 
                  className="w-full h-full bg-[url('/coffee-seasonal.jpg')] bg-cover bg-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                ></motion.div>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-mocha/10"></div>
          <div className="absolute -bottom-8 -right-8 w-20 h-20 rounded-full border border-mocha/10"></div>
        </motion.div>
      </div>
      
      {/* Enhanced decorative elements with motion */}
      <motion.div 
        className="absolute top-40 left-10 -z-10"
        initial={{ opacity: 0, rotate: -10 }}
        whileInView={{ opacity: 0.15, rotate: 0 }}
        transition={{ duration: 1.5 }}
      >
        <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 8H19C20.1 8 21 8.9 21 10V13C21 14.1 20.1 15 19 15H18V8Z" fill="#6F4E37"/>
          <path d="M2 8H18V17C18 18.1 17.1 19 16 19H4C2.9 19 2 18.1 2 17V8Z" fill="#6F4E37"/>
          <path d="M11 5V3C11 2.4 10.6 2 10 2H6C5.4 2 5 2.4 5 3V5H11Z" fill="#6F4E37"/>
        </svg>
      </motion.div>
      <motion.div 
        className="absolute bottom-20 right-10 -z-10"
        initial={{ opacity: 0, rotate: 10 }}
        whileInView={{ opacity: 0.15, rotate: 0 }}
        transition={{ duration: 1.5 }}
      >
        <svg width="150" height="150" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 3C4.2 3 2 5.2 2 8V16C2 18.8 4.2 21 7 21H17C19.8 21 22 18.8 22 16V8C22 5.2 19.8 3 17 3H7Z" fill="#6F4E37"/>
          <path d="M7 5C5.3 5 4 6.3 4 8V16C4 17.7 5.3 19 7 19H17C18.7 19 20 17.7 20 16V8C20 6.3 18.7 5 17 5H7Z" fill="white"/>
          <path d="M9 8C7.3 8 6 9.3 6 11V13C6 14.7 7.3 16 9 16H15C16.7 16 18 14.7 18 13V11C18 9.3 16.7 8 15 8H9Z" fill="#6F4E37"/>
        </svg>
      </motion.div>
    </section>
  );
}
