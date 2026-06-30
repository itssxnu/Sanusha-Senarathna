import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="section-band">
      <div className="about-layout">
        <div>
          <div className="section-label rv">01</div>
          <h2 className="s-title rv">
            About <em>Me</em>
          </h2>

          <div className="about-body rv">
            <p>
              I&apos;m a <strong>Data Science undergraduate at SLIIT</strong> with hands-on experience building AI-powered and full-stack applications using Python, Java, TypeScript, FastAPI, Spring Boot, React, and modern LLM technologies.
            </p>
            <p>
              I specialize in developing intelligent systems involving <strong>semantic search, resume analysis, NLP, and automation workflows</strong>, with a strong foundation in software engineering, API development, database design, and machine learning.
            </p>
            <p>
              I&apos;m passionate about building practical AI products, experimenting with emerging technologies, and delivering scalable solutions to real-world problems.
            </p>
          </div>

          <div className="about-counters rv">
            <div className="counter-box">
              <span className="counter-n" data-target="17">
                0
              </span>
              <span className="counter-l">Projects Built</span>
            </div>
            <div className="counter-box">
              <span className="counter-n" data-target="DS">
                --
              </span>
              <span className="counter-l">Major Focus</span>
            </div>
            <div className="counter-box">
              <span className="counter-n" data-target="LK">
                --
              </span>
              <span className="counter-l">Sri Lanka</span>
            </div>
          </div>

          <div className="about-cv-grid rv">
            <div>
              <h3 className="about-subheading-mono">Certifications</h3>
              <ul className="about-cv-list">
                <li className="about-cv-item">
                  <strong>Introduction to Data Science</strong> Cisco Academy
                </li>
                <li className="about-cv-item">
                  <strong>Pandas & Data Visualization</strong> Kaggle Learn
                </li>
                <li className="about-cv-item">
                  <strong>AI/ML Engineer Stage 1-2</strong> SLIIT
                </li>
              </ul>
            </div>

            <div>
              <h3 className="about-subheading-mono">Soft Skills</h3>
              <ul className="about-cv-list soft-skills">
                <li className="about-cv-item about-cv-bullet">
                  <span>&gt;</span> Problem Solving & Analytics
                </li>
                <li className="about-cv-item about-cv-bullet">
                  <span>&gt;</span> Effective Communication
                </li>
                <li className="about-cv-item about-cv-bullet">
                  <span>&gt;</span> Team Collaboration
                </li>
                <li className="about-cv-item about-cv-bullet">
                  <span>&gt;</span> Quick Adaptability & Self-learning
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="about-photo-container rv-right">
          <div className="corner-bracket top-left"></div>
          <div className="corner-bracket top-right"></div>
          <div className="corner-bracket bottom-left"></div>
          <div className="corner-bracket bottom-right"></div>
          <div className="scanlines"></div>
          <Image 
            src="/profile2.png" 
            alt="Sanusha Senarathna - Data Scientist and Full-Stack Software Developer Portfolio Profile" 
            width={400}
            height={400}
            className="about-photo"
          />
        </div>
      </div>
    </section>
  );
}
