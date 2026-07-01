"use client";

import { useEffect, useState, useRef } from "react";

const quotes = [
  "Training the neural network to align your pixels...",
  "Overfitting the models for your display...",
  "Debugging the space-time continuum...",
  "Converting coffee into clean code...",
  "Normalizing database coordinates...",
  "Optimizing gradient descent gradients...",
  "Reticulating 3D splines in the background...",
  "Teaching machine learning models how to love...",
  "Cleaning up stray compiler semicolons...",
  "Minimizing loss functions of our patience...",
  "Bootstrapping cognitive parameters..."
];

export default function Loader() {
  const [active, setActive] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [logoTyped, setLogoTyped] = useState(false);
  const [progress, setProgress] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [welcomeVisible, setWelcomeVisible] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);

  const textRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Logo typing sequence on initial mount
  useEffect(() => {
    const fullText = "SXNU.dev";
    let currentLength = 0;

    const typingTimer = window.setInterval(() => {
      currentLength += 1;
      setTypedText(fullText.slice(0, currentLength));
      if (currentLength >= fullText.length) {
        window.clearInterval(typingTimer);
        setLogoTyped(true);
      }
    }, 120);

    return () => {
      window.clearInterval(typingTimer);
    };
  }, []);

  // Main loader progress & transition loop (triggered after logo finishes typing)
  useEffect(() => {
    if (!logoTyped) return;

    let modelLoaded = false;
    let progressTimer = 0;
    let quoteTimer = 0;
    let safetyTimeout = 0;
    let localProgress = 0;

    // Cycle quotes every 1.6s
    quoteTimer = window.setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 1600);

    const completeLoading = () => {
      setLoadingComplete(true);
      setWelcomeVisible(true);
      window.clearInterval(progressTimer);
      window.clearInterval(quoteTimer);

      // Show welcome text for 1800ms before starting exit transition
      window.setTimeout(() => {
        startExitTransition();
      }, 1800);
    };

    // Incremental progress simulation
    progressTimer = window.setInterval(() => {
      if (modelLoaded) {
        // Fast fill to 100% when resources are ready
        localProgress += Math.random() * 8 + 4;
        if (localProgress >= 100) {
          localProgress = 100;
          setProgress(100);
          completeLoading();
        } else {
          setProgress(Math.floor(localProgress));
        }
      } else {
        // Normal simulation
        if (localProgress < 85) {
          localProgress += Math.random() * 2 + 0.5;
        } else if (localProgress < 98) {
          // Slow down and wait for model loaded event
          localProgress += Math.random() * 0.3 + 0.05;
        }
        setProgress(Math.floor(localProgress));
      }
    }, 40);

    const handleModelLoaded = () => {
      modelLoaded = true;
    };

    // Listen to model loaded custom event from Face3D
    window.addEventListener("model-loaded", handleModelLoaded);

    // Safety timeout (10 seconds max)
    safetyTimeout = window.setTimeout(() => {
      modelLoaded = true;
    }, 10000);

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
          void loaderText.offsetHeight;

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

            // Fade out the overlay background
            overlay.style.transition = "opacity 0.8s ease-in-out";
            overlay.style.opacity = "0";
          });

          const revealTime = 850; 
          setTimeout(() => {
            if (parentLogo) {
              parentLogo.style.transition = "none";
              parentLogo.style.opacity = "1";
            }
          }, revealTime);

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
      window.clearInterval(progressTimer);
      window.clearInterval(quoteTimer);
      window.clearTimeout(safetyTimeout);
    };
  }, [logoTyped]);

  if (!active) return null;

  return (
    <div
      ref={overlayRef}
      data-liquid-ignore
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#04070a",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        pointerEvents: isTransitioning ? "none" : "auto",
        gap: "2.5rem",
      }}
    >
      <style>{`
        @keyframes fadeInWelcome {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

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
        <span>{typedText.slice(0, 4)}</span>
        <span style={{ color: "var(--accent)" }}>{typedText.slice(4)}</span>
        {!isTransitioning && (
          <span className="loader-cursor">|</span>
        )}
      </div>

      {logoTyped && !isTransitioning && (
        <div 
          className="loader-details"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.2rem",
            width: "280px",
            maxWidth: "80%",
            opacity: welcomeVisible && loadingComplete ? 0.8 : 1,
            transition: "opacity 0.3s ease",
            animation: "fadeInWelcome 0.5s ease forwards",
          }}
        >
          {/* Progress Bar */}
          <div style={{
            width: "100%",
            height: "4px",
            background: "var(--dim)",
            borderRadius: "2px",
            overflow: "hidden",
            position: "relative",
          }}>
            <div style={{
              height: "100%",
              width: `${progress}%`,
              background: "var(--accent)",
              borderRadius: "2px",
              transition: progress === 100 ? "width 0.2s ease-out" : "width 0.1s ease-out",
              boxShadow: "0 0 10px var(--accent)",
            }} />
          </div>

          {/* Details Column */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.4rem",
            textAlign: "center",
            minHeight: "44px",
          }}>
            <span style={{
              color: "var(--accent)",
              fontFamily: "var(--font-mono-app)",
              fontSize: "12px",
              fontWeight: 700,
            }}>
              {progress}%
            </span>
            <span style={{
              color: "var(--muted)",
              fontFamily: "var(--font-mono-app)",
              fontSize: "10.5px",
              lineHeight: "1.4",
              transition: "opacity 0.2s ease",
            }}>
              {loadingComplete ? "Initialization successful!" : quotes[quoteIndex]}
            </span>
          </div>

          {/* Welcome Message banner */}
          <div style={{
            minHeight: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            {welcomeVisible && (
              <span style={{
                color: "var(--text)",
                fontFamily: "var(--font-mono-app)",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                opacity: 0.9,
                animation: "fadeInWelcome 0.35s ease forwards",
              }}>
                Welcome to my space
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
