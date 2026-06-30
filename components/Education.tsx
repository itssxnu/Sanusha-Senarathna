"use client";

import dynamic from "next/dynamic";

const Education3D = dynamic(() => import("./Education3D"), { ssr: false });

const entries = [
  {
    period: "2024 — Present",
    degree: "BSc (Hons) in Data Science",
    school: "Sri Lanka Institute of Information Technology (SLIIT)",
    tags: ["Data Science", "Machine Learning", "FastAPI", "Spring Boot"],
  },
  {
    period: "2013 — 2021",
    degree: "GCE Advanced Level (Physical Science)",
    school: "Kingswood College, Kandy",
    tags: ["Physics", "Combined Maths", "Chemistry", "General IT"],
  },
];

export default function Education() {
  return (
    <section id="education" className="section-band section-alt">
      <div className="section-label rv">05</div>
      <h2 className="s-title rv">
        <em>Education</em>
      </h2>

      <div className="section-grid-layout">
        <div className="edu-wrap">
          {entries.map((entry) => (
            <article className="edu-entry rv" key={entry.degree}>
              <div className="edu-period">{entry.period}</div>
              <h3 className="edu-degree">{entry.degree}</h3>
              <div className="edu-school">{entry.school}</div>
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
          <Education3D />
        </div>
      </div>
    </section>
  );
}
