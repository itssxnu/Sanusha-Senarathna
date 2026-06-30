"use client";

import dynamic from "next/dynamic";
import Marquee from "./Marquee";

const Face3D = dynamic(() => import("./Face3D"), {
  ssr: false,
});

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-content">

        <div className="hero-left">

          <span className="hero-tag">
            Data Science • Web Development • SLIIT
          </span>

          <h1 className="hero-title">
            SANUSHA SENARATHNA
          </h1>

          <h2 className="hero-subtitle">
            Data Science Undergraduate
          </h2>

          <p className="hero-typewriter">
            <span id="typed-text" aria-live="polite"></span>
            <span className="typed-cursor">|</span>
          </p>

          <p className="hero-description">
            Building intelligent systems, machine learning applications,
            and modern web experiences. Passionate about solving
            real-world problems through data and software.
          </p>

          <div className="hero-buttons">
            <a href="#projects" className="btn-primary">
              View My Work
            </a>

            <a href="#contact" className="btn-secondary">
              Let&apos;s Talk
            </a>

            <a 
              href="/Sanusha_Senarathna_Resume.pdf" 
              download 
              className="btn-secondary btn-cv-download"
            >
              <svg 
                className="download-icon" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <polyline points="19 12 12 19 5 12" />
              </svg>
              Download CV
            </a>
          </div>

        </div>

        <div className="hero-right">
          <Face3D />
        </div>

      </div>

      <div className="hero-scroll-indicator">
        <span className="scroll-text">Scroll to explore</span>
        <div className="scroll-mouse-wrap">
          <div className="scroll-radar"></div>
          <div className="scroll-mouse">
            <div className="scroll-wheel"></div>
          </div>
        </div>
      </div>

      <Marquee />
    </section>
  );
}
