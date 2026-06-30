"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const projects = [
  {
    id: "PROJECT_01",
    name: "RecruitAI - Enterprise CV Matching & Auditing",
    desc: "A decoupled dual-service microservice platform built for enterprise resume parsing and candidate ranking. Features Gemini API schema mapping, vector-based similarity scoring, and demographic bias auditing.",
    stack: ["Java", "Spring Boot", "FastAPI", "MySQL", "SentenceTransformers", "Scikit-learn", "Gemini API"],
    role: "Architected the dual-service microservice platform, integrated Gemini API schema mapping, vector scoring pipelines, and demographic auditing algorithms.",
    highlights: [
      "Designed and developed a decoupled dual-service microservice platform for enterprise resume parsing and candidate ranking",
      "Integrated multi-modal CV parsing utilizing PyPDF2 and Tesseract OCR mapped to structured JSON via Google Gemini API",
      "Implemented semantic skill matching and vector cosine similarity scoring using local SentenceTransformers",
      "Built an algorithmic fairness engine auditing demographic parity across 12 protected traits using synthetic mutations",
    ],
    preview: ["AI", "RAG", "BIAS"],
  },
  {
    id: "PROJECT_02",
    name: "Kidney Disease Identification System",
    desc: "An intelligent healthcare diagnostics classification tool designed to predict chronic kidney disease outcomes using advanced machine learning models trained on preprocessed clinical datasets.",
    stack: ["Python", "Scikit-learn", "Pandas", "NumPy"],
    role: "Handled data exploration, clean preprocessing, and missing value logic; built, trained, and evaluated Scikit-learn classification models.",
    highlights: [
      "Performed exploratory data analysis, feature preprocessing, and missing-value handling on healthcare datasets",
      "Trained and evaluated classification models using Scikit-learn to predict chronic kidney disease outcomes",
      "Assessed model performance using accuracy, precision, recall, and F1-score metrics",
    ],
    preview: ["ML", "CLF", "PRED"],
  },
  {
    id: "PROJECT_03",
    name: "Full-Stack Web-Based Fashion Store",
    desc: "A complete e-commerce marketplace featuring catalog browsing, role-based administration dashboard, secure checkout payment processes, and an integrated AI shopping assistant chatbot.",
    stack: ["Spring Boot", "Java", "MySQL", "HTML", "CSS"],
    role: "Developed the core web app, customer auth flow, database schema design, shopping cart logic, admin stocks dashboard, and AI chatbot recommended helper.",
    highlights: [
      "Developed a full-stack e-commerce marketplace featuring product catalog browsing, dynamic filtering, shopping cart, and wishlist functions",
      "Built a secure customer authentication flow with role-based routing and an interactive admin dashboard for stock tracking and inventory CRUD",
      "Integrated payment processors for checkout, along with automatic email notifications for order confirmations",
      "Integrated an AI-powered chatbot for product recommendations, customer assistance, and user engagement",
    ],
    preview: ["SHOP", "AUTH", "BOT"],
  },
  {
    id: "PROJECT_04",
    name: "HD Resorts – Travel Discovery Companion",
    desc: "A progressive web app and cross-platform mobile client for travel discovery and accommodation booking. Includes secure JWT session management, Cloudinary integration, and custom mapping.",
    stack: ["React Native", "Expo", "Node.js", "Express.js", "MongoDB", "Cloudinary"],
    role: "Created the React Native mobile client, Expo router navigation system, route guards, REST API services, Cloudinary image upload forms, and Google maps endpoints.",
    highlights: [
      "Built a cross-platform progressive web app (PWA) and mobile client utilizing Expo Router for navigation and role-based route guards",
      "Developed a modular REST API using Express.js and MongoDB Atlas with security authentication via JSON Web Tokens (JWT)",
      "Integrated Cloudinary for dynamic multipart form file uploads of listings, user profile photos, and review images",
      "Implemented rating/review systems and custom map points for tourist attraction discovery across Sri Lanka",
    ],
    preview: ["APP", "API", "MAPS"],
  },
];

export default function Projects() {
  const [activeProject, setActiveProject] = useState<(typeof projects)[number] | null>(null);

  useEffect(() => {
    if (!activeProject) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveProject(null);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.classList.add("modal-open");

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("modal-open");
    };
  }, [activeProject]);

  return (
    <section id="projects" className="section-band">
      <div className="section-label rv">03</div>
      <h2 className="s-title rv">
        Selected <em>Work</em>
      </h2>

      <div className="proj-grid">
        {projects.map((project) => (
          <button
            className="proj-card rv"
            key={project.id}
            onClick={() => setActiveProject(project)}
            type="button"
          >
            <div className="proj-preview" aria-hidden="true">
              {project.preview.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <div className="proj-id">
              {project.id}
              <span className="proj-arrow">↗</span>
            </div>
            <h3 className="proj-name">{project.name}</h3>
            <p className="proj-desc">{project.desc}</p>
            <div className="proj-stack">
              {project.stack.map((tag, index) => (
                <span className={index === 0 ? "t t-hi" : "t"} key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>

      {activeProject && createPortal(
        <div
          data-lenis-prevent=""
          className="project-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          onMouseDown={() => setActiveProject(null)}
        >
          <div 
            data-lenis-prevent=""
            className="project-modal-panel" 
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setActiveProject(null)}
              type="button"
              aria-label="Close project details"
            >
              ×
            </button>

            <div className="modal-preview" aria-hidden="true">
              <div className="modal-screen">
                {activeProject.preview.map((item, index) => (
                  <span key={item} style={{ animationDelay: `${index * 160}ms` }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="modal-copy">
              <div className="proj-id">{activeProject.id}</div>
              <h3 id="project-modal-title">{activeProject.name}</h3>
              <p>{activeProject.desc}</p>
              <p className="modal-role">{activeProject.role}</p>

              <ul>
                {activeProject.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>

              <div className="proj-stack">
                {activeProject.stack.map((tag, index) => (
                  <span className={index === 0 ? "t t-hi" : "t"} key={tag}>
                    {tag}
                  </span>
                ))}
              </div>

              <div className="modal-actions">
                <a className="btn btn-primary" href="#contact" onClick={() => setActiveProject(null)}>
                  Discuss Project →
                </a>
                <button className="btn btn-secondary" onClick={() => setActiveProject(null)} type="button">
                  Back to Work
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </section>
  );
}
