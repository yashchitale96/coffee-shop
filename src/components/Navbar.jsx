import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Enhanced transform effects based on scroll
  const navbarBg = useTransform(
    scrollYProgress,
    [0, 0.05],
    ["rgba(255, 253, 208, 0)", "rgba(255, 253, 208, 0.95)"]
  );
  
  const textColor = useTransform(
    scrollYProgress,
    [0, 0.05],
    ["rgba(111, 78, 55, 1)", "rgba(54, 69, 79, 0.9)"]
  );

  const navShadow = useTransform(
    scrollYProgress,
    [0, 0.05],
    ["0px 0px 0px rgba(0,0,0,0)", "0px 10px 20px rgba(111, 78, 55, 0.1)"]
  );
  
  // For mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Toggle scroll lock when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);
  
  // Update navbar style on scroll
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <>
      <div className="relative w-full h-0">
        <motion.header
          className={`fixed top-0 left-0 w-full z-50 px-6 py-4 transition-all duration-300 ${scrolled ? 'backdrop-blur-sm' : ''}`}
          style={{ 
            backgroundColor: navbarBg,
            boxShadow: navShadow
          }}
        >
          <div className="container mx-auto flex justify-between items-center">
          <a href="#" className="flex items-center">
            <motion.span 
              className="text-2xl font-serif font-bold" 
              style={{ color: textColor }}
            >
              <span className="inline-block mr-1">☕</span>
              Artisan Roast
            </motion.span>
          </a>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {['Home', 'Our Story', 'Menu', 'Featured', 'Visit'].map((item, index) => (
              <motion.a 
                key={item} 
                href={item === 'Home' ? '#' : `#${item.toLowerCase().replace(' ', '-')}`}
                className="relative text-charcoal hover:text-mocha transition-colors py-2 group"
                whileHover={{ scale: 1.05 }}
              >
                {item}
                <motion.span 
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-mocha group-hover:w-full transition-all duration-300"
                  layoutId="navIndicator"
                ></motion.span>
              </motion.a>
            ))}
            <motion.a 
              href="#" 
              className="px-6 py-2.5 bg-mocha text-cream rounded-full hover:bg-mocha/90 transition-all shadow-lg hover:shadow-mocha/20 hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Order Online
            </motion.a>
          </nav>
          
          {/* Mobile menu button */}
          <motion.button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="md:hidden text-mocha relative z-50"
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
              />
            </svg>
          </motion.button>
        </div>
      </motion.header>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, clipPath: "circle(0% at top right)" }}
          animate={{ opacity: 1, clipPath: "circle(150% at top right)" }}
          exit={{ opacity: 0, clipPath: "circle(0% at top right)" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 bg-gradient-to-b from-cream to-cream/95 z-40 md:hidden pt-24 backdrop-blur-sm"
        >
          <nav className="container mx-auto px-6 py-8 flex flex-col space-y-8 text-center">
            {[
              { name: "Home", href: "#" },
              { name: "Our Story", href: "#our-story" },
              { name: "Menu", href: "#menu" },
              { name: "Featured Blend", href: "#featured-blend" },
              { name: "Visit Us", href: "#visit-us" }
            ].map((item, index) => (
              <motion.a 
                key={item.name}
                href={item.href}
                className="text-2xl font-serif font-medium text-charcoal hover:text-mocha transition-all relative overflow-hidden group"
                onClick={() => setIsMenuOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                {item.name}
                <motion.span 
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-mocha group-hover:w-1/2 transition-all duration-300"
                ></motion.span>
              </motion.a>
            ))}
            <motion.a 
              href="#" 
              onClick={() => setIsMenuOpen(false)} 
              className="mx-auto px-8 py-4 bg-mocha text-cream rounded-full hover:bg-charcoal transition-all shadow-lg w-fit"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Order Online
            </motion.a>
          </nav>
        </motion.div>
      )}
      </div>
    </>
  );
}
