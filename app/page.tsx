import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Experience from "../components/Experience";
import Education from "../components/Education";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import PortfolioEffects from "../components/PortfolioEffects";
import Loader from "../components/Loader";

export default function Home() {
  return (
    <main>
      <Loader />
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Contact />
      <PortfolioEffects />
      <Footer />
    </main>
  );
}
