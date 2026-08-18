import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiCheckCircle, FiMail, FiMapPin, FiPhone, FiSend } from "react-icons/fi";
import PageTransition from "../components/PageTransition";
import AnimatedSection from "../components/AnimatedSection";

const initialForm = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleNameChange = (e) => {
    const lettersAndSpaces = e.target.value.replace(/[^A-Za-z\s]/g, "");
    setForm((prev) => ({ ...prev, name: lettersAndSpaces }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    else if (!/^[A-Za-z\s]+$/.test(form.name.trim())) {
      next.name = "Name can only contain letters and spaces.";
    }
    if (!form.email.trim()) next.email = "Please enter your email.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "That doesn't look like a valid email.";
    if (!form.subject.trim()) next.subject = "Please add a subject.";
    if (!form.message.trim()) next.message = "Please write a message.";
    else if (form.message.trim().length < 10) next.message = "Message should be at least 10 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 900);
  };

  const resetForm = () => {
    setForm(initialForm);
    setErrors({});
    setSubmitted(false);
  };

  return (
    <PageTransition>
      <AnimatedSection className="section" density="low" intensity={0.25} radar={false}>
        <motion.div
          className="about-hero"
          style={{ padding: "20px 0 50px" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-eyebrow" style={{ textAlign: "center", display: "block" }}>
            Get in touch
          </span>
          <h1>
            Let&apos;s <span className="gradient-text">start a conversation</span>
          </h1>
          <p>
            Have a question, a pitch, or feedback on an article? We'd love to
            hear from you.
          </p>
        </motion.div>

        <div className="contact-grid">
          <motion.div
            className="contact-info-card"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3>Contact Information</h3>
            <p>Reach out directly — we typically reply within one business day.</p>

            <div className="contact-info-item">
              <span className="icon-wrap"><FiMail size={16} /></span>
              hello@devnotes.blog
            </div>
            <div className="contact-info-item">
              <span className="icon-wrap"><FiPhone size={16} /></span>
              +1 (555) 010-2024
            </div>
            <div className="contact-info-item">
              <span className="icon-wrap"><FiMapPin size={16} /></span>
              Remote-first &middot; Worldwide
            </div>
          </motion.div>

          <motion.div
            className="contact-form-card"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  className="form-success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="form-success-icon">
                    <FiCheckCircle size={30} />
                  </div>
                  <h3>Message sent!</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: 14.5 }}>
                    Thanks for reaching out, {form.name.split(" ")[0]}. We'll get
                    back to you soon.
                  </p>
                  <button className="btn btn-outline" onClick={resetForm}>
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  noValidate
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ display: "flex", flexDirection: "column", gap: 20 }}
                >
                  <div className="form-row">
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={handleNameChange}
                        className={errors.name ? "error" : ""}
                        placeholder="Jane Doe"
                      />
                      {errors.name && <span className="form-error">{errors.name}</span>}
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={handleChange("email")}
                        className={errors.email ? "error" : ""}
                        placeholder="jane@example.com"
                      />
                      {errors.email && <span className="form-error">{errors.email}</span>}
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Subject</label>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={handleChange("subject")}
                      className={errors.subject ? "error" : ""}
                      placeholder="What's this about?"
                    />
                    {errors.subject && <span className="form-error">{errors.subject}</span>}
                  </div>

                  <div className="form-group">
                    <label>Message</label>
                    <textarea
                      rows={5}
                      value={form.message}
                      onChange={handleChange("message")}
                      className={errors.message ? "error" : ""}
                      placeholder="Tell us what's on your mind..."
                    />
                    {errors.message && <span className="form-error">{errors.message}</span>}
                  </div>

                  <button className="btn btn-primary" type="submit" disabled={submitting}>
                    {submitting ? "Sending..." : (
                      <>
                        Send Message <FiSend size={15} />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </AnimatedSection>
    </PageTransition>
  );
}
