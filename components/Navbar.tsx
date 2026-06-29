"use client";

import { useEffect, useRef } from "react";

export default function Navbar() {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const floatingCvRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const totalHeight = docHeight - winHeight;
      const scrollY = window.scrollY;

      // Update progress bar width
      if (progressBarRef.current && totalHeight > 0) {
        const progress = (scrollY / totalHeight) * 100;
        progressBarRef.current.style.width = `${progress}%`;
      }

      // Show/hide floating CV button past the hero page (approx 400px)
      if (floatingCvRef.current) {
        if (scrollY > 400) {
          floatingCvRef.current.classList.add("visible");
        } else {
          floatingCvRef.current.classList.remove("visible");
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on load to establish correct states
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Scroll Progress Bar - fixed to top of viewport */}
      <div 
        ref={progressBarRef}
        className="scroll-progress-bar" 
        aria-hidden="true"
      />

      <nav className="navbar">
        <div className="nav-logo" style={{ opacity: 0 }}>
          <a href="#hero">SXNU.dev</a>
        </div>

        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#projects">Work</a></li>
          <li><a href="#education">Education</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        <div className="nav-status">
          <span className="status-dot"></span>
          Open to Work
        </div>
      </nav>

      {/* Floating CV Button (bottom-right action CV download) */}
      <a
        ref={floatingCvRef}
        href="/resume.pdf"
        download
        className="btn-floating-cv"
        aria-label="Download CV"
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
        <span className="btn-floating-cv-text">Download CV</span>
      </a>
    </>
  );
}