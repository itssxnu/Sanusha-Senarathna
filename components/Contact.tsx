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
    <section id="contact" className="section-band">
      <div className="section-label rv">05</div>
      <h2 className="s-title rv">
        Get In <em>Touch</em>
      </h2>

      <div className="contact-grid">
        <div className="contact-left rv-left">
          <h3>Open to collaborations</h3>
          <p>
            Got a project idea, a data problem, or just want to talk tech?
            Reach out — I&apos;m always up for interesting conversations.
          </p>

          <div className="c-links">
            <a href="mailto:itssxnu@gmail.com" className="c-link">
              <span className="c-icon">✉</span>
              itssxnu@gmail.com
            </a>
            <a href="tel:+94771477130" className="c-link">
              <span className="c-icon">☎</span>
              +94 771477130
            </a>
            <a href="https://github.com/itssxnu" target="_blank" className="c-link">
              <span className="c-icon">⌥</span>
              github.com/itssxnu
            </a>
            <a href="https://linkedin.com/in/sanusha-senarathna" target="_blank" className="c-link">
              <span className="c-icon">in</span>
              linkedin.com/in/sanusha-senarathna
            </a>
          </div>
        </div>

        <div className="rv-right">
          <form className="cform" onSubmit={sendForm}>
            <div className="fg">
              <label htmlFor="name">Name</label>
              <input id="name" type="text" placeholder="Your name" />
            </div>
            <div className="fg">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" placeholder="your@email.com" />
            </div>
            <div className="fg">
              <label htmlFor="message">Message</label>
              <textarea id="message" placeholder="What's on your mind?"></textarea>
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
