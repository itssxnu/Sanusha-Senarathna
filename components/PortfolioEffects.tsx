"use client";

import { useEffect } from "react";
import Lenis from "lenis";

type LiquidGLInstance = unknown;

type LiquidGLApi = {
  (options: {
    snapshot?: string;
    target: string;
    resolution?: number;
    refraction?: number;
    bevelDepth?: number;
    bevelWidth?: number;
    frost?: number;
    shadow?: boolean;
    specular?: boolean;
    reveal?: "none" | "fade";
    tilt?: boolean;
    tiltFactor?: number;
    magnify?: number;
    on?: {
      init?: (instance: LiquidGLInstance) => void;
    };
  }): LiquidGLInstance | LiquidGLInstance[] | undefined;
  registerDynamic?: (elements: string | Element[] | NodeListOf<Element>) => void;
  syncWith?: (config?: { lenis?: Lenis; gsap?: boolean }) => void;
};

declare global {
  interface Window {
    liquidGL?: LiquidGLApi;
    __portfolioLiquidNavReady__?: boolean;
  }
}

const phrases = [
  "Data Science Undergrad.",
  "Web Developer.",
  "Problem Solver.",
  "Building with AI.",
];

export default function PortfolioEffects() {
  useEffect(() => {
    // Initialize Lenis smooth scroll only on desktop viewports (>1000px)
    const isDesktop = typeof window !== "undefined" && window.innerWidth > 1000;
    let lenis: Lenis | null = null;
    let lenisRafId = 0;

    if (isDesktop) {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      const scrollRaf = (time: number) => {
        lenis?.raf(time);
        lenisRafId = requestAnimationFrame(scrollRaf);
      };
      lenisRafId = requestAnimationFrame(scrollRaf);
    }
    const liquidTimeouts: number[] = [];
    let liquidInterval = 0;

    const initLiquidGlass = () => {
      if (window.__portfolioLiquidNavReady__) return true;
      if (typeof window.liquidGL !== "function") return false;

      const navbar = document.querySelector(".navbar.liquidGL");
      if (!navbar) return false;

      window.__portfolioLiquidNavReady__ = true;

      window.liquidGL({
        snapshot: "body",
        target: ".navbar.liquidGL",
        resolution: 1.15,
        refraction: 0.045,
        bevelDepth: 0.14,
        bevelWidth: 0.12,
        frost: 1.4,
        shadow: true,
        specular: true,
        reveal: "none",
        tilt: false,
        tiltFactor: 2.2,
        magnify: 1.03,
        on: {
          init() {
            document.body.classList.add("liquid-nav-ready");
          },
        },
      });

      window.liquidGL.registerDynamic?.(
        ".hero, .section-band, .marquee-band, .tech-stack-container",
      );

      if (window.liquidGL.syncWith && lenis) {
        window.liquidGL.syncWith({ lenis });
      }
      return true;
    };

    // Start retrying WebGL glass initialization immediately on mount
    liquidInterval = window.setInterval(() => {
      if (initLiquidGlass()) {
        window.clearInterval(liquidInterval);
        liquidInterval = 0;
      }
    }, 50);

    const dot = document.createElement("div");
    const ring = document.createElement("div");
    dot.id = "cur-dot";
    ring.id = "cur-ring";
    document.body.append(dot, ring);

    let mx = 0;
    let my = 0;
    let rx = 0;
    let ry = 0;
    let cursorRaf = 0;

    const moveCursor = (event: MouseEvent) => {
      mx = event.clientX;
      my = event.clientY;
      dot.style.left = `${mx}px`;
      dot.style.top = `${my}px`;
    };

    const animateCursor = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = `${rx}px`;
      ring.style.top = `${ry}px`;
      cursorRaf = requestAnimationFrame(animateCursor);
    };

    document.addEventListener("mousemove", moveCursor);
    animateCursor();

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
          }
        });
      },
      { threshold: 0.1 },
    );

    document.querySelectorAll("section").forEach((section) => {
      section
        .querySelectorAll<HTMLElement>(".rv,.rv-left,.rv-right")
        .forEach((element, index) => {
          element.style.setProperty("--rv-delay", `${Math.min(index * 80, 420)}ms`);
          revealObserver.observe(element);
        });
    });

    const skillObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const fill = entry.target.querySelector<HTMLElement>(".skill-fill");
          if (fill?.dataset.p) {
            fill.style.width = `${fill.dataset.p}%`;
          }
        });
      },
      { threshold: 0.3 },
    );

    document
      .querySelectorAll(".skill-row")
      .forEach((element) => skillObserver.observe(element));

    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          if (!entry.isIntersecting || !target.dataset.target) return;

          const endVal = target.dataset.target;
          const isNum = !isNaN(Number(endVal));

          if (isNum) {
            // Numeric odometer count up
            const end = Number(endVal);
            const duration = 1200; // ms
            const startTime = performance.now();

            const tick = (now: number) => {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const easeProgress = progress * (2 - progress); // Ease out quad
              const current = Math.floor(easeProgress * end);
              target.textContent = String(current);

              if (progress < 1) {
                requestAnimationFrame(tick);
              } else {
                target.textContent = String(end);
              }
            };
            requestAnimationFrame(tick);
          } else {
            // Text character scrambler decode effect
            const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            const finalString = endVal;
            const duration = 1200; // ms
            const startTime = performance.now();
            
            const tick = (now: number) => {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              
              if (progress < 1) {
                let result = "";
                for (let i = 0; i < finalString.length; i++) {
                  if (Math.random() < progress) {
                    result += finalString[i];
                  } else {
                    result += chars[Math.floor(Math.random() * chars.length)];
                  }
                }
                target.textContent = result;
                requestAnimationFrame(tick);
              } else {
                target.textContent = finalString;
              }
            };
            requestAnimationFrame(tick);
          }

          counterObserver.unobserve(target);
        });
      },
      { threshold: 0.3 },
    );

    document
      .querySelectorAll(".counter-n[data-target]")
      .forEach((element) => counterObserver.observe(element));

    const magneticElements = document.querySelectorAll<HTMLElement>(
      ".btn, .btn-primary, .btn-secondary, .nav-logo, .nav-logo a, .nav-links a, .c-link, .modal-close, .magnetic, .btn-floating-cv"
    );

    const handleMagneticMove = (e: MouseEvent) => {
      if (window.innerWidth <= 1000) return;
      const el = e.currentTarget as HTMLElement;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);

      const isButton =
        el.classList.contains("btn") ||
        el.classList.contains("btn-primary") ||
        el.classList.contains("btn-secondary");

      const strength = isButton ? 0.22 : 0.35;
      const lift = isButton ? -3 : 0;

      el.style.transition = "transform 0.12s cubic-bezier(0.25, 1, 0.5, 1)";
      el.style.transform = `translate(${x * strength}px, ${y * strength + lift}px)`;
    };

    const handleMagneticLeave = (e: MouseEvent) => {
      if (window.innerWidth <= 1000) return;
      const el = e.currentTarget as HTMLElement;
      el.style.transition = "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)";
      el.style.transform = "";
    };

    magneticElements.forEach((el) => {
      el.addEventListener("mousemove", handleMagneticMove);
      el.addEventListener("mouseleave", handleMagneticLeave);
    });

    const typed = document.getElementById("typed-text");
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let typeTimeout = 0;

    const type = () => {
      if (!typed) return;
      const phrase = phrases[phraseIndex];

      if (!deleting) {
        charIndex += 1;
        typed.textContent = phrase.slice(0, charIndex);
        if (charIndex === phrase.length) {
          deleting = true;
          typeTimeout = window.setTimeout(type, 1800);
          return;
        }
      } else {
        charIndex -= 1;
        typed.textContent = phrase.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
        }
      }

      typeTimeout = window.setTimeout(type, deleting ? 50 : 90);
    };

    const startTypewriter = () => {
      if (typeTimeout === 0) {
        typeTimeout = window.setTimeout(type, 200);
      }
    };

    if (document.body.classList.contains("site-loaded")) {
      startTypewriter();
    } else {
      window.addEventListener("site-loaded", startTypewriter);
    }

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      cancelAnimationFrame(cursorRaf);
      window.clearTimeout(typeTimeout);
      window.removeEventListener("site-loaded", startTypewriter);
      revealObserver.disconnect();
      skillObserver.disconnect();
      counterObserver.disconnect();
      magneticElements.forEach((el) => {
        el.removeEventListener("mousemove", handleMagneticMove);
        el.removeEventListener("mouseleave", handleMagneticLeave);
      });
      dot.remove();
      ring.remove();
      lenis?.destroy();
      cancelAnimationFrame(lenisRafId);
      if (liquidInterval) window.clearInterval(liquidInterval);
      liquidTimeouts.forEach((timeout) => window.clearTimeout(timeout));
    };
  }, []);

  return null;
}
