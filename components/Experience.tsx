"use client";

import dynamic from "next/dynamic";

const Experience3D = dynamic(() => import("./Experience3D"), { ssr: false });

const entries = [
  {
    period: "2024 — Present",
    role: "Freelance Full Stack Developer",
    company: "Self-Employed",
    highlights: [
      "Delivered custom web applications end-to-end for clients—from requirements gathering and architecture through deployment and post-launch support.",
      "Built and iterated on frontend interfaces and backend logic based on client feedback, maintaining clean, maintainable codebases across projects.",
      "Managed version control, timelines, and written communication independently, mirroring the ownership expected in a startup engineering environment.",
    ],
    tags: ["Full Stack", "System Architecture", "Client Relations", "Git & Deployment"],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="section-band">
      <div className="section-label rv">04</div>
      <h2 className="s-title rv">
        Work <em>Experience</em>
      </h2>

      <div className="section-grid-layout">
        <div className="edu-wrap">
          {entries.map((entry) => (
            <article className="edu-entry rv" key={entry.role}>
              <div className="edu-period">{entry.period}</div>
              <h3 className="edu-degree">{entry.role}</h3>
              <div className="edu-school">{entry.company}</div>
              <ul style={{ paddingLeft: "1.1rem", margin: "1rem 0", color: "var(--muted)", fontSize: "14px", lineHeight: "1.8", display: "grid", gap: "0.55rem", listStyle: "square" }}>
                {entry.highlights.map((highlight, idx) => (
                  <li key={idx}>{highlight}</li>
                ))}
              </ul>
              <div className="edu-chips">
                {entry.tags.map((tag, index) => (
                  <span className={index === 0 ? "t t-hi" : "t"} key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
        <div className="section-3d-canvas-wrap" style={{ transform: "translateX(-40px)" }}>
          <Experience3D />
        </div>
      </div>
    </section>
  );
}
