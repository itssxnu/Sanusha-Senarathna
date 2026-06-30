"use client";

import { FormEvent, useState } from "react";

export default function Contact() {
  const [sent, setSent] = useState(false);

  const sendForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
    window.setTimeout(() => setSent(false), 2500);
  };

  return (
    <section id="contact" className="section-band section-alt">
      <div className="section-label rv">06</div>
      <h2 className="s-title rv">
        Get In <em>Touch</em>
      </h2>

      <div className="contact-grid-modern">
        {/* Left Column: For Work, Collabs & Grown-Up Things */}
        <div className="contact-column rv-left">
          <h3 className="c-title-modern">For Work, Collabs & Grown-Up Things</h3>
          
          <div className="contact-info-list">
            <a href="mailto:itssxnu@gmail.com" className="contact-info-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="contact-info-icon"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              <span>itssxnu@gmail.com</span>
            </a>
            
            <a href="tel:+94771477130" className="contact-info-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="contact-info-icon"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>+94 771477130</span>
            </a>

            <a href="https://linkedin.com/in/sanusha-senarathna" target="_blank" className="contact-info-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="contact-info-icon"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              <span>linkedin.com/in/sanusha-senarathna</span>
            </a>

            <a href="https://github.com/itssxnu" target="_blank" className="contact-info-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="contact-info-icon"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              <span>github.com/itssxnu</span>
            </a>
            
            <div className="contact-info-item-static">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="contact-info-icon"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>Colombo, Sri Lanka</span>
            </div>
          </div>

          <div className="contact-action-row">
            <a 
              href="/Sanusha_Senarathna_Resume.pdf" 
              download 
              className="btn-resume-download"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
              <span>Resume</span>
            </a>
          </div>
        </div>

        {/* Right Column: Contact message form */}
        <div className="rv-right">
          <form className="cform" onSubmit={sendForm}>
            <div className="fg">
              <label htmlFor="name">Name</label>
              <input id="name" type="text" placeholder="Your name" required />
            </div>
            <div className="fg">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" placeholder="your@email.com" required />
            </div>
            <div className="fg">
              <label htmlFor="message">Message</label>
              <textarea id="message" placeholder="What's on your mind?" required></textarea>
            </div>
            <button className={`btn btn-primary ${sent ? "is-sent" : ""}`} type="submit">
              {sent ? "Sent ✓" : "Send Message →"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
