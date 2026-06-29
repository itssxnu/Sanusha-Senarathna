"use client";

import { useEffect, useState, useRef } from "react";

export default function Loader() {
  const [active, setActive] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let modelLoaded = false;
    let timeoutId = 0;

    const checkLoadingComplete = () => {
      if (modelLoaded) {
        clearTimeout(timeoutId);
        startExitTransition();
      }
    };

    const handleModelLoaded = () => {
      modelLoaded = true;
      checkLoadingComplete();
    };

    // Listen to model loaded custom event
    window.addEventListener("model-loaded", handleModelLoaded);

    // Safety timeout (1.5 seconds max)
    timeoutId = window.setTimeout(() => {
      modelLoaded = true;
      startExitTransition();
    }, 1500);

    const startExitTransition = () => {
      setIsTransitioning(true);

      setTimeout(() => {
        const logoEl = document.querySelector(".nav-logo a");
        const loaderText = textRef.current;
        const overlay = overlayRef.current;

        if (logoEl && loaderText && overlay) {
          // Get target and current coordinates
          const currentRect = loaderText.getBoundingClientRect();
          const targetRect = logoEl.getBoundingClientRect();

          // Lock styles to current center coordinates
          loaderText.style.transition = "none";
          loaderText.style.position = "fixed";
          loaderText.style.top = `${currentRect.top}px`;
          loaderText.style.left = `${currentRect.left}px`;
          loaderText.style.width = `${currentRect.width}px`;
          loaderText.style.height = `${currentRect.height}px`;
          loaderText.style.margin = "0";
          loaderText.style.transform = "translate(0, 0)";

          // Hide the navbar logo temporarily
          const parentLogo = logoEl.parentElement as HTMLElement;
          if (parentLogo) {
            parentLogo.style.transition = "opacity 0.2s ease";
            parentLogo.style.opacity = "0";
          }

          // Trigger a DOM repaint
          loaderText.offsetHeight;

          // Animate to destination
          requestAnimationFrame(() => {
            loaderText.style.transition = "all 0.9s cubic-bezier(0.25, 1, 0.5, 1)";
            loaderText.style.top = `${targetRect.top}px`;
            loaderText.style.left = `${targetRect.left}px`;
            loaderText.style.width = `${targetRect.width}px`;
            loaderText.style.height = `${targetRect.height}px`;
            loaderText.style.fontSize = window.getComputedStyle(logoEl).fontSize;
            loaderText.style.letterSpacing = window.getComputedStyle(logoEl).letterSpacing;
            loaderText.style.fontWeight = window.getComputedStyle(logoEl).fontWeight;
            loaderText.style.textShadow = "none";
            loaderText.style.color = "var(--accent)";

            // Fade out the overlay background
            overlay.style.transition = "opacity 0.8s ease-in-out";
            overlay.style.opacity = "0";
          });

          // Finish and cleanup
          // 1. Reveal the actual navbar logo slightly early (e.g. at 850ms) so it's fully painted
          // when the loader text vanishes. Adjust this to be earlier (e.g., 800ms) if you still see a gap.
          const revealTime = 850; 
          setTimeout(() => {
            if (parentLogo) {
              parentLogo.style.transition = "none";
              parentLogo.style.opacity = "1";
            }
          }, revealTime);

          // 2. Unmount the loader text and trigger typewriter/reveals slightly later (e.g. at 950ms)
          // to create a seamless overlap window. Increase this (e.g., 1000ms) to extend the overlap.
          const unmountTime = 950;
          setTimeout(() => {
            document.body.classList.add("site-loaded");
            window.dispatchEvent(new Event("site-loaded"));
            setActive(false);
          }, unmountTime);
        } else {
          // Fallback if logo element isn't found
          if (overlay) {
            overlay.style.transition = "opacity 0.8s ease-in-out";
            overlay.style.opacity = "0";
          }
          setTimeout(() => {
            document.body.classList.add("site-loaded");
            window.dispatchEvent(new Event("site-loaded"));
            setActive(false);
          }, 800);
        }
      }, 100);
    };

    return () => {
      window.removeEventListener("model-loaded", handleModelLoaded);
      clearTimeout(timeoutId);
    };
  }, []);

  if (!active) return null;

  return (
    <div
      ref={overlayRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#04070a",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        pointerEvents: isTransitioning ? "none" : "auto",
      }}
    >
      <div
        ref={textRef}
        className="loader-text-element"
        style={{
          color: "#fff",
          fontFamily: 'var(--font-display), "Outfit", sans-serif',
          fontSize: "clamp(2rem, 8vw, 4rem)",
          fontWeight: 900,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          textShadow: "0 0 20px rgba(0, 245, 196, 0.4)",
          transition: "none",
          position: "relative",
          display: "inline-block",
        }}
      >
        SXNU.dev
        {!isTransitioning && (
          <span className="loader-cursor">|</span>
        )}
      </div>
    </div>
  );
}
