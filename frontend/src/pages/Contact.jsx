import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Mail,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Footer } from "../components/Footer";
import { contactFormsAPI } from "../api/client";

const CONTACT_DETAILS = [
  {
    icon: Mail,
    title: "Direct Email",
    info: "admin@meeraxuintelligence.com",
  },
  {
    icon: Phone,
    title: "Phone Line",
    info: "+91 75681 85591",
  },
];

const LinkedinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.204-.012-3.583-.069-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.79 4 4c0 2.21-1.791 4-4 4zm4.846-10.354c0 .795.645 1.44 1.44 1.44s1.44-.645 1.44-1.44-.645-1.44-1.44-1.44-1.44.645-1.44 1.44z" />
  </svg>
);

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.207-6.807-5.967 6.807H2.306l7.644-8.74L.592 2.25h6.832l4.71 6.233 5.412-6.233zM17.55 19.41h1.832L6.281 4.75H4.31l13.24 14.66z" />
  </svg>
);

const SOCIAL_LINKS = [
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/meeraxu-intelligence-1b669641b/",
  },
  {
    icon: InstagramIcon,
    label: "Instagram",
    url: "https://www.instagram.com/meeraxu.intelligence/",
  },
  {
    icon: XIcon,
    label: "X",
    url: "https://x.com/meeraxu",
  },
];

const CONTACT_FAQS = [
  {
    question: "How quickly do you reply after form submission?",
    answer:
      "Most messages receive a response within one business day, often earlier for active project requests.",
  },
  {
    question: "What should I include in the message?",
    answer:
      "Share your current challenge, target outcome, timeline, and any tools or systems involved.",
  },
  {
    question: "Do you support startups and small teams?",
    answer:
      "Yes. We work with early-stage startups, growth teams, and enterprise organizations.",
  },
  {
    question: "Can we start with a discovery session?",
    answer:
      "Absolutely. We can begin with a focused discovery call to scope priorities and quick wins.",
  },
];

function ContactHero() {
  return (
    <section className="pt-[112px] px-6 pb-0 min-h-auto flex items-center relative overflow-hidden">
      <motion.div
        animate={{ x: [0, 30, -18, 0], y: [0, -26, 20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: -90,
          left: -130,
          width: 380,
          height: 380,
          borderRadius: "50%",
          background: "rgba(139, 92, 246, 0.08)",
          filter: "blur(48px)",
          pointerEvents: "none",
        }}
      />
      <motion.div
        animate={{ x: [0, -24, 18, 0], y: [0, 30, -12, 0] }}
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          right: -120,
          bottom: -160,
          width: 430,
          height: 430,
          borderRadius: "50%",
          background: "rgba(14, 165, 233, 0.07)",
          filter: "blur(56px)",
          pointerEvents: "none",
        }}
      />

      <div className="max-w-[1180px] mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-[20px]"
        >
          <span className="tag flex items-center w-fit">
            <Sparkles size={12} className="mr-[6px]" /> Contact Meeraxu
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.72 }}
          className="text-[clamp(2.5rem,6vw,5.2rem)] leading-[1.07] tracking-[-0.03em] mb-[24px] max-w-[1100px] font-extrabold"
        >
          Get in <span className="gradient-text">Touch</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26, duration: 0.64 }}
          style={{ color: "var(--muted)" }}
          className="leading-[1.8] max-w-[1000px] mb-[40px] text-[1.05rem]"
        >
          Have a question or ready to start your AI journey? We'd love to hear
          from you.
        </motion.p>
      </div>
    </section>
  );
}

const PROJECT_TYPES = [
  "AI-Powered Analytics Platform",
  "Automation Workflow Engine",
  "ML Model Optimization",
  "Enterprise Integration Suite",
  "Custom AI Chatbot / Agent",
  "Data Pipeline & ETL",
  "Other / Not Sure Yet",
];

function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    project: "",
    message: "",
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validate = (data) => {
    const errs = {};
    if (!data.name.trim()) errs.name = "Full name is required.";
    else if (data.name.trim().length < 2)
      errs.name = "Name must be at least 2 characters.";
    if (!data.email.trim()) errs.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      errs.email = "Enter a valid email address.";
    if (data.subject.trim() && data.subject.trim().length < 4)
      errs.subject = "Subject must be at least 4 characters.";
    return errs;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    if (touched[name]) {
      setFieldErrors(validate(updated));
    }
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setFieldErrors(validate(formData));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const allTouched = {
      name: true,
      email: true,
      subject: true,
      project: true,
      message: true,
    };
    setTouched(allTouched);
    const errs = validate(formData);
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      await contactFormsAPI.submit({
        name: formData.name,
        email: formData.email,
        subject: formData.project
          ? `[${formData.project}] ${formData.subject || "No subject"}`
          : formData.subject || "No subject",
        message: formData.message || "(No message provided)",
      });

      setSuccessMessage(
        "Thank you! Your message has been sent successfully. Our team will contact you soon.",
      );
      setFormData({
        name: "",
        email: "",
        subject: "",
        project: "",
        message: "",
      });
      setTouched({});
      setFieldErrors({});

      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    } catch (error) {
      setErrorMessage(
        "Error sending message. Please try again later or contact us directly.",
      );
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-6 py-[36px] pb-6 bg-[rgba(139,92,246,0.04)]">
      <div className="max-w-[1080px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(260px,0.85fr)_minmax(0,1.1fr)] gap-[20px] items-start">
          {/* Left Side Container */}
          <div className="flex flex-col h-full pt-[52px]">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.62 }}
              className="relative rounded-[24px] overflow-hidden flex-1 flex flex-col"
            >
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=700&h=700&q=90"
                alt="Contact and communication"
                className="w-full h-full object-cover block absolute inset-0"
              />

              <div
                style={{
                  background:
                    "linear-gradient(135deg, rgba(4, 8, 14, 0.9) 0%, rgba(7, 10, 18, 0.74) 52%, rgba(7, 10, 18, 0.88) 100%)",
                }}
                className="absolute inset-0 z-[1]"
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative z-[2] flex flex-col p-6 justify-between gap-[16px] h-full"
              >
                <div>
                  <h3 className="max-w-[280px] translate-y-[18px] text-[2.4rem] font-extrabold leading-[1.05] text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.8)]">
                    Need More Information?
                  </h3>
                </div>

                <div className="grid gap-[16px]">
                  {CONTACT_DETAILS.map((item) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex gap-[14px] items-start"
                      >
                        <div className="flex items-center justify-center w-[30px] h-[30px] rounded-[8px] bg-[rgba(139,92,246,0.3)] shrink-0">
                          <Icon size={16} color="var(--purple)" />
                        </div>
                        <div>
                          <p
                            style={{ color: "var(--purple)" }}
                            className="text-[0.85rem] font-bold mb-[2px]"
                          >
                            {item.title}
                          </p>
                          <p className="mb-[3px] text-[0.95rem] font-bold text-white [text-shadow:0_1px_10px_rgba(0,0,0,0.8)]">
                            {item.info}
                          </p>
                          {item.text && (
                            <p className="text-[0.8rem] text-[rgba(234,246,243,0.8)] leading-[1.4]">
                              {item.text}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                  <div className="flex items-center gap-[10px] pt-[4px]">
                    {SOCIAL_LINKS.map(({ icon: Icon, label, url }) => (
                      <motion.a
                        key={label}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        title={label}
                        whileHover={{ y: -3 }}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#8B5CF6]/45 bg-[#0b0a14]/75 text-[#C4B5FD] shadow-[0_0_14px_rgba(139,92,246,0.14)] transition-colors duration-200 hover:border-[#A855F7] hover:bg-[#8B5CF6]/20 hover:text-white"
                      >
                        <Icon size={16} />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Side Container */}
          <div className="flex flex-col gap-[12px]">
            {/* Start a Conversation Header - Outside Box */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--muted)",
                }}
                className="text-[0.75rem] font-bold tracking-[0.08em] mb-[4px] uppercase"
              >
                Start a Conversation
              </p>
              <h2 className="text-[2.2rem] font-extrabold leading-[1.1]">
                Send Message
              </h2>
            </motion.div>

            {/* Form Box */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.62, delay: 0.08 }}
              className="flex flex-col border-none rounded-[24px] glass p-6 gap-[16px]"
            >
              {successMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-[10px_14px] bg-[rgba(76,175,80,0.1)] border border-[rgba(76,175,80,0.3)] rounded-[8px] text-[#4CAF50] text-[0.85rem]"
                >
                  {successMessage}
                </motion.div>
              )}

              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-[10px_14px] bg-[rgba(255,87,34,0.1)] border border-[rgba(255,87,34,0.3)] rounded-[8px] text-[#FF5722] text-[0.85rem]"
                >
                  {errorMessage}
                </motion.div>
              )}

              <motion.form
                id="contact-form"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                onSubmit={handleSubmit}
                className="grid gap-[16px]"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px]">
                  <label className="grid gap-[6px] text-[var(--muted)] text-[0.8rem] font-semibold">
                    <span>
                      Full Name{" "}
                      <span style={{ color: "var(--purple)" }}>*</span>
                    </span>
                    <input
                      className="w-full border border-[rgba(139,92,246,0.35)] bg-[rgba(11,26,34,0.96)] text-[var(--white)] rounded-[8px] p-[10px_12px] text-[0.88rem] outline-none shadow-[inset_0_0_18px_rgba(139,92,246,0.06)] transition-all duration-200 hover:border-[rgba(168,85,247,0.65)] focus:border-[var(--purple)] focus:ring-2 focus:ring-[rgba(139,92,246,0.2)]"
                      style={
                        fieldErrors.name && touched.name
                          ? { borderColor: "#ef4444" }
                          : {}
                      }
                      type="text"
                      name="name"
                      placeholder="e.g. Jane Smith"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={loading}
                    />
                    {fieldErrors.name && touched.name && (
                      <span className="text-[#ef4444] text-[0.75rem] mt-0.5 block">
                        ⚠ {fieldErrors.name}
                      </span>
                    )}
                  </label>

                  <label className="grid gap-[6px] text-[var(--muted)] text-[0.8rem] font-semibold">
                    <span>
                      Email <span style={{ color: "var(--purple)" }}>*</span>
                    </span>
                    <input
                      className="w-full border border-[rgba(139,92,246,0.35)] bg-[rgba(11,26,34,0.96)] text-[var(--white)] rounded-[8px] p-[10px_12px] text-[0.88rem] outline-none shadow-[inset_0_0_18px_rgba(139,92,246,0.06)] transition-all duration-200 hover:border-[rgba(168,85,247,0.65)] focus:border-[var(--purple)] focus:ring-2 focus:ring-[rgba(139,92,246,0.2)]"
                      style={
                        fieldErrors.email && touched.email
                          ? { borderColor: "#ef4444" }
                          : {}
                      }
                      type="email"
                      name="email"
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={loading}
                    />
                    {fieldErrors.email && touched.email && (
                      <span className="text-[#ef4444] text-[0.75rem] mt-0.5 block">
                        ⚠ {fieldErrors.email}
                      </span>
                    )}
                  </label>
                </div>

                <label className="grid gap-[6px] text-[var(--muted)] text-[0.8rem] font-semibold">
                  Project Type
                  <div className="relative">
                    <select
                      className="w-full border border-[rgba(139,92,246,0.35)] bg-[rgba(11,26,34,0.96)] text-[var(--white)] rounded-[8px] p-[10px_12px] pr-[36px] text-[0.88rem] outline-none appearance-none cursor-pointer shadow-[inset_0_0_18px_rgba(139,92,246,0.06)] transition-all duration-200 hover:border-[rgba(168,85,247,0.65)] focus:border-[var(--purple)] focus:ring-2 focus:ring-[rgba(139,92,246,0.2)]"
                      name="project"
                      value={formData.project}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={loading}
                      style={
                        fieldErrors.project && touched.project
                          ? { borderColor: "#ef4444" }
                          : {}
                      }
                    >
                      <option value="">— Select a project type —</option>
                      {PROJECT_TYPES.map((pt) => (
                        <option key={pt} value={pt}>
                          {pt}
                        </option>
                      ))}
                    </select>
                    <span
                      style={{ color: "var(--purple)" }}
                      className="absolute right-[12px] top-1/2 -translate-y-1/2 pointer-events-none text-[0.8rem]"
                    >
                      ▾
                    </span>
                  </div>
                  {fieldErrors.project && touched.project && (
                    <span className="text-[#ef4444] text-[0.75rem] mt-0.5 block">
                      ⚠ {fieldErrors.project}
                    </span>
                  )}
                </label>

                <label className="grid gap-[6px] text-[var(--muted)] text-[0.8rem] font-semibold">
                  Subject
                  <input
                    className="w-full border border-[rgba(139,92,246,0.35)] bg-[rgba(11,26,34,0.96)] text-[var(--white)] rounded-[8px] p-[10px_12px] text-[0.88rem] outline-none shadow-[inset_0_0_18px_rgba(139,92,246,0.06)] transition-all duration-200 hover:border-[rgba(168,85,247,0.65)] focus:border-[var(--purple)] focus:ring-2 focus:ring-[rgba(139,92,246,0.2)]"
                    style={
                      fieldErrors.subject && touched.subject
                        ? { borderColor: "#ef4444" }
                        : {}
                    }
                    type="text"
                    name="subject"
                    placeholder="Brief description of your inquiry"
                    value={formData.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={loading}
                  />
                  {fieldErrors.subject && touched.subject && (
                    <span className="text-[#ef4444] text-[0.75rem] mt-0.5 block">
                      ⚠ {fieldErrors.subject}
                    </span>
                  )}
                </label>

                <label className="grid gap-[6px] text-[var(--muted)] text-[0.8rem] font-semibold">
                  Message
                  <textarea
                    className="w-full border border-[rgba(139,92,246,0.35)] bg-[rgba(11,26,34,0.96)] text-[var(--white)] rounded-[8px] p-[10px_12px] text-[0.88rem] outline-none resize-y min-h-[110px] shadow-[inset_0_0_18px_rgba(139,92,246,0.06)] transition-all duration-200 hover:border-[rgba(168,85,247,0.65)] focus:border-[var(--purple)] focus:ring-2 focus:ring-[rgba(139,92,246,0.2)]"
                    style={
                      fieldErrors.message && touched.message
                        ? { borderColor: "#ef4444" }
                        : {}
                    }
                    name="message"
                    rows={4}
                    placeholder="Tell us about your project, goals, and timeline..."
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={loading}
                  />
                </label>

                <div className="flex items-center justify-between gap-[10px] flex-wrap pt-1">
                  <div
                    style={{ color: "var(--muted)" }}
                    className="inline-flex items-center gap-[6px] text-[0.78rem]"
                  >
                    <ShieldCheck size={14} color="var(--purple)" /> Private and
                    secure handling
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send Inquiry"} <Send size={15} />
                  </motion.button>
                </div>
              </motion.form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <section className="relative overflow-hidden px-6 py-[84px]">
      <motion.div
        animate={{ opacity: [0.18, 0.3, 0.18], scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-1/2 top-24 h-56 w-56 -translate-x-1/2 rounded-full bg-[rgba(139,92,246,0.12)] blur-[90px]"
      />
      <div className="relative mx-auto max-w-[920px]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.62 }}
          className="text-center mb-[30px]"
        >
          <span className="tag mb-[12px] inline-flex items-center">
            <Sparkles size={12} className="mr-[6px]" /> FAQ
          </span>
          <h2 className="text-[clamp(2rem,4vw,2.8rem)] mb-[12px] font-extrabold">
            Answers to common <span className="gradient-text">questions</span>
          </h2>
          <p
            style={{ color: "var(--muted)" }}
            className="leading-[1.75] max-w-[760px] mx-auto"
          >
            If your question is not listed here, contact us and we will guide
            you personally.
          </p>
        </motion.div>

        <div className="grid gap-[12px]">
          {CONTACT_FAQS.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={faq.question}
                className="glass group overflow-hidden rounded-[16px] border border-[rgba(139,92,246,0.16)] transition-colors duration-300 hover:border-[rgba(168,85,247,0.55)] hover:shadow-[0_0_28px_rgba(139,92,246,0.12)]"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  style={{ color: "var(--white)" }}
                  className="flex w-full cursor-pointer items-center justify-between gap-[14px] border-none bg-transparent p-[18px] text-left"
                >
                  <span className="text-[1rem] font-bold transition-colors duration-300 group-hover:text-[#C4B5FD]">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={18} color="var(--purple)" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div
                        style={{ color: "var(--muted)" }}
                        className="p-[0_18px_18px] leading-[1.75] text-[0.92rem]"
                      >
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  useEffect(() => {
    if (window.location.hash) {
      const elementId = window.location.hash.slice(1);
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: "auto", block: "start" });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <>
      <ContactHero />
      <ContactSection />
      <ContactFAQ />
      <Footer />
    </>
  );
}
