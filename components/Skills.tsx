"use client";

import React, { useEffect, useRef } from "react";

interface TechItem {
  name: string;
  icon: string;
  color: string; // Glow RGBA color
  isMono?: boolean; // If true, stays white on hover (no brand color reset)
}

interface TechRow {
  rowId: number;
  items: TechItem[];
}

const techRows: TechRow[] = [
  {
    rowId: 1,
    items: [
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg", color: "rgba(255, 224, 82, 0.3)" },
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg", color: "rgba(247, 223, 30, 0.3)" },
      { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg", color: "rgba(49, 120, 198, 0.3)" },
      { name: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg", color: "rgba(168, 185, 204, 0.25)" },
      { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg", color: "rgba(0, 89, 156, 0.3)" },
      { name: "Kotlin", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg", color: "rgba(241, 142, 33, 0.3)" },
      { name: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg", color: "rgba(227, 79, 38, 0.3)" },
      { name: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg", color: "rgba(21, 114, 182, 0.3)" },
      { name: "Bash", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg", color: "rgba(78, 170, 42, 0.3)" },
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", color: "rgba(97, 218, 251, 0.35)" },
      { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg", color: "rgba(255, 255, 255, 0.35)", isMono: true },
      { name: "Bootstrap", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg", color: "rgba(119, 41, 113, 0.3)" }
    ]
  },
  {
    rowId: 2,
    items: [
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg", color: "rgba(67, 133, 61, 0.3)" },
      { name: "Django", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg", color: "rgba(9, 46, 32, 0.35)" },
      { name: "Flask", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg", color: "rgba(255, 255, 255, 0.3)", isMono: true },
      { name: "FastAPI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg", color: "rgba(5, 153, 137, 0.3)" },
      { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg", color: "rgba(255, 111, 0, 0.35)" },
      { name: "PyTorch", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg", color: "rgba(238, 76, 44, 0.35)" },
      { name: "Scikit-learn", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg", color: "rgba(247, 147, 39, 0.3)" },
      { name: "OpenCV", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg", color: "rgba(93, 201, 80, 0.3)" },
      { name: "NumPy", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg", color: "rgba(1, 72, 133, 0.3)" },
      { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg", color: "rgba(6, 182, 212, 0.3)" }
    ]
  },
  {
    rowId: 3,
    items: [
      { name: "Pandas", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg", color: "rgba(21, 8, 79, 0.35)" },
      { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg", color: "rgba(0, 117, 143, 0.3)" },
      { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg", color: "rgba(51, 103, 145, 0.3)" },
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg", color: "rgba(79, 165, 73, 0.35)" },
      { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg", color: "rgba(255, 202, 40, 0.3)" },
      { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg", color: "rgba(216, 44, 32, 0.3)" },
      { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg", color: "rgba(36, 150, 237, 0.3)" },
      { name: "Azure", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg", color: "rgba(0, 137, 214, 0.3)" }
    ]
  },
  {
    rowId: 4,
    items: [
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg", color: "rgba(240, 80, 50, 0.35)" },
      { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg", color: "rgba(255, 255, 255, 0.35)", isMono: true },
      { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg", color: "rgba(255, 214, 0, 0.25)" },
      { name: "AWS", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/amazonwebservices.svg", color: "rgba(255, 153, 0, 0.3)" },
      { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg", color: "rgba(0, 122, 204, 0.3)" },
      { name: "Vercel", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/vercel.svg", color: "rgba(255, 255, 255, 0.35)", isMono: true }
    ]
  },
  {
    rowId: 5,
    items: [
      { name: "Jupyter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jupyter/jupyter-original.svg", color: "rgba(243, 118, 26, 0.3)" },
      { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg", color: "rgba(242, 78, 29, 0.3)" },
      { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg", color: "rgba(255, 108, 55, 0.3)" },
      { name: "Photoshop", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-original.svg", color: "rgba(49, 197, 244, 0.3)" }
    ]
  },
  {
    rowId: 6,
    items: [
      { name: "Hugging Face", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/huggingface.svg", color: "rgba(255, 214, 0, 0.3)" },
      { name: "MS Office", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/windows8/windows8-original.svg", color: "rgba(235, 60, 0, 0.3)" }
    ]
  }
];

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 60;
    const connectionDistance = 110;
    const mouseDistance = 160;

    let mouseX: number | null = null;
    let mouseY: number | null = null;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;

      constructor(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        // Slow speed for clean background ambient feel
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.radius = Math.random() * 1.5 + 1.2;
        // Randomly select teal or purple matching our theme
        this.color = Math.random() > 0.5 ? "0, 245, 196" : "189, 0, 255";
      }

      update(w: number, h: number, mx: number | null, my: number | null) {
        // Handle mouse attraction force
        if (mx !== null && my !== null) {
          const dx = mx - this.x;
          const dy = my - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouseDistance) {
            const force = (mouseDistance - dist) / mouseDistance;
            this.vx += (dx / dist) * force * 0.035;
            this.vy += (dy / dist) * force * 0.035;
          }
        }

        // Apply friction/drag to attraction velocity to keep particles under control
        this.vx *= 0.98;
        this.vy *= 0.98;

        // Base velocity
        this.x += this.vx + (this.vx > 0 ? 0.08 : -0.08);
        this.y += this.vy + (this.vy > 0 ? 0.08 : -0.08);

        // Boundary wrapping with padding
        const pad = 20;
        if (this.x < -pad) this.x = w + pad;
        if (this.x > w + pad) this.x = -pad;
        if (this.y < -pad) this.y = h + pad;
        if (this.y > h + pad) this.y = -pad;
      }

      draw(c: CanvasRenderingContext2D) {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = `rgba(${this.color}, 0.22)`;
        c.fill();
      }
    }

    const resize = () => {
      const rect = container.getBoundingClientRect();
      // Account for device pixel ratio for super crisp rendering
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);

      // Re-populate if resizing changes container dimensions significantly
      if (particles.length === 0) {
        for (let i = 0; i < particleCount; i++) {
          particles.push(new Particle(rect.width, rect.height));
        }
      }
    };

    // Trigger initial sizing
    resize();
    window.addEventListener("resize", resize);

    // Mouse events bound to container
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = null;
      mouseY = null;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    // Main animation loop
    const animate = () => {
      const rect = container.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Draw connections first (layering behind nodes)
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        
        // Connect to mouse
        if (mouseX !== null && mouseY !== null) {
          const dx = mouseX - p1.x;
          const dy = mouseY - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouseDistance) {
            const alpha = (1 - dist / mouseDistance) * 0.16;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouseX, mouseY);
            ctx.strokeStyle = `rgba(0, 245, 196, ${alpha})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }

        // Connect to other particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.09;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            // Blend colors slightly based on node combinations
            const strokeColor = p1.color === p2.color ? p1.color : "0, 245, 196";
            ctx.strokeStyle = `rgba(${strokeColor}, ${alpha})`;
            ctx.lineWidth = 0.65;
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      particles.forEach((p) => {
        p.update(rect.width, rect.height, mouseX, mouseY);
        p.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Clean up to prevent leaks
    return () => {
      window.removeEventListener("resize", resize);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section id="skills" className="section-band section-alt">
      <div className="section-label rv">02</div>
      <h2 className="s-title rv" style={{ textAlign: "center", marginBottom: "3rem" }}>
        Tech <em>Stack</em>
      </h2>

      <div className="tech-stack-container" ref={containerRef}>
        {/* Dynamic Canvas Neural Network Animation background */}
        <canvas className="tech-canvas" ref={canvasRef} aria-hidden="true" />
        
        {/* Ambient spotlight glowing overlay backing the grid */}
        <div className="tech-backlight" aria-hidden="true" />

        {techRows.map((row) => (
          <div className="tech-row rv" key={row.rowId}>
            {row.items.map((tech) => (
              <div
                className="tech-card"
                key={tech.name}
                style={{
                  "--glow-color": tech.color,
                } as React.CSSProperties}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={tech.icon}
                  alt={tech.name}
                  className={`tech-icon-img ${tech.isMono ? "tech-monochrome" : ""}`}
                  loading="lazy"
                />
                <span className="tech-name">{tech.name}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
