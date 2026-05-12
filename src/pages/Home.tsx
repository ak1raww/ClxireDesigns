import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import Services from '../components/Services';
import About from '../components/About';
import Projects from '../components/Projects';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import { motion, useScroll, useSpring } from 'motion/react';

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-orange-600 z-[60] origin-left"
        style={{ scaleX }}
      />

      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <About />
        <Projects />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
