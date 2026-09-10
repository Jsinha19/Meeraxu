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
    text: "For project discussions, partnerships, and general inquiries.",
  },
  {
    icon: Phone,
    title: "Phone Line",
    info: "+91 75681 85591",
    text: "Reach out to discuss your next project with our team.",
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
    if (data.message.trim() && data.message.trim().length < 20)
      errs.message = "Message should be at least 20 characters.";
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
    <section className="px-6 py-[48px] pb-6 bg-[rgba(139,92,246,0.04)]">
      <div className="max-w-[1180px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.62 }}
          className="text-center mb-[40px] mt-0"
        >
          <h2 className="text-[clamp(2rem,4vw,2.8rem)] font-extrabold">
            Contact <span className="gradient-text">Details + Info</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(280px,0.9fr)_minmax(0,1.1fr)] gap-[20px] items-stretch">
          {/* Left Side - Image with Overlay Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.62 }}
            className="relative rounded-[28px] overflow-hidden min-h-[420px] lg:min-h-0 h-full"
          >
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=700&h=700&q=90"
              alt="Contact and communication"
              className="w-full h-full object-cover block absolute inset-0"
            />

            <div
              style={{
                background:
                  "linear-gradient(135deg, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.55) 100%)",
              }}
              className="absolute inset-0 z-[1]"
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative z-[2] flex flex-col p-6 justify-start gap-[28px] h-full"
            >
              <div>
                <div className="inline-flex items-center gap-[8px] mb-[14px] px-[12px] py-[6px] rounded-[20px] bg-[rgba(139,92,246,0.2)] border border-[rgba(139,92,246,0.4)] w-fit">
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      color: "var(--purple)",
                    }}
                    className="text-[0.75rem] font-bold tracking-[0.08em]"
                  >
                    Reach Out
                  </span>
                </div>
                <h3 className="text-[2.1rem] font-extrabold leading-[1.1] mt-0 max-w-[260px]">
                  Need More Information?
                </h3>
              </div>

              <div className="grid gap-[12px]">
                {CONTACT_DETAILS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="flex gap-[16px] items-start"
                    >
                      <div className="flex items-center justify-center w-[32px] h-[32px] rounded-[10px] bg-[rgba(139,92,246,0.3)] shrink-0">
                        <Icon size={18} color="var(--purple)" />
                      </div>
                      <div>
                        <p
                          style={{ color: "var(--purple)" }}
                          className="text-[0.9rem] font-bold mb-[3px]"
                        >
                          {item.title}
                        </p>
                        <p className="text-[1rem] font-bold mb-[4px]">
                          {item.info}
                        </p>
                        <p className="text-[0.85rem] color-[rgba(234,246,243,0.8)] leading-[1.5]">
                          {item.text}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.62, delay: 0.08 }}
            className="flex flex-col gap-[16px] h-full border-none rounded-[28px] p-6"
          >
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
                className="text-[0.75rem] font-bold tracking-[0.08em] mb-[8px] uppercase"
              >
                Start a Conversation
              </p>
              <h2 className="text-[2.5rem] font-extrabold leading-[1.2]">
                Send Message
              </h2>
            </motion.div>

            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-[12px_16px] bg-[rgba(76,175,80,0.1)] border border-[rgba(76,175,80,0.3)] rounded-[8px] text-[#4CAF50] text-[0.9rem]"
              >
                {successMessage}
              </motion.div>
            )}

            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-[12px_16px] bg-[rgba(255,87,34,0.1)] border border-[rgba(255,87,34,0.3)] rounded-[8px] text-[#FF5722] text-[0.9rem]"
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
              className="glass rounded-[22px] p-[28px_24px] grid gap-[20px]"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[12px]">
                <label className="grid gap-[8px] text-[var(--muted)] text-[0.84rem] font-semibold">
                  <span>
                    Full Name <span style={{ color: "var(--purple)" }}>*</span>
                  </span>
                  <input
                    className="w-full border border-[var(--border)] bg-[rgba(11,26,34,0.9)] text-[var(--white)] rounded-[10px] p-[12px_14px] text-[0.92rem] outline-none transition-all duration-200 focus:border-[var(--purple)] focus:ring-2 focus:ring-[rgba(139,92,246,0.16)]"
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
                    <span className="text-[#ef4444] text-[0.78rem] mt-1 block">
                      ⚠ {fieldErrors.name}
                    </span>
                  )}
                </label>

                <label className="grid gap-[8px] text-[var(--muted)] text-[0.84rem] font-semibold">
                  <span>
                    Email <span style={{ color: "var(--purple)" }}>*</span>
                  </span>
                  <input
                    className="w-full border border-[var(--border)] bg-[rgba(11,26,34,0.9)] text-[var(--white)] rounded-[10px] p-[12px_14px] text-[0.92rem] outline-none transition-all duration-200 focus:border-[var(--purple)] focus:ring-2 focus:ring-[rgba(139,92,246,0.16)]"
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
                    <span className="text-[#ef4444] text-[0.78rem] mt-1 block">
                      ⚠ {fieldErrors.email}
                    </span>
                  )}
                </label>
              </div>

              <label className="grid gap-[8px] text-[var(--muted)] text-[0.84rem] font-semibold">
                Project Type
                <div className="relative">
                  <select
                    className="w-full border border-[var(--border)] bg-[rgba(11,26,34,0.9)] text-[var(--white)] rounded-[10px] p-[12px_14px] pr-[40px] text-[0.92rem] outline-none appearance-none cursor-pointer transition-all duration-200 focus:border-[var(--purple)] focus:ring-2 focus:ring-[rgba(139,92,246,0.16)]"
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
                    className="absolute right-[14px] top-1/2 -translate-y-1/2 pointer-events-none"
                  >
                    ▾
                  </span>
                </div>
                {fieldErrors.project && touched.project && (
                  <span className="text-[#ef4444] text-[0.78rem] mt-1 block">
                    ⚠ {fieldErrors.project}
                  </span>
                )}
              </label>

              <label className="grid gap-[8px] text-[var(--muted)] text-[0.84rem] font-semibold">
                Subject
                <input
                  className="w-full border border-[var(--border)] bg-[rgba(11,26,34,0.9)] text-[var(--white)] rounded-[10px] p-[12px_14px] text-[0.92rem] outline-none transition-all duration-200 focus:border-[var(--purple)] focus:ring-2 focus:ring-[rgba(139,92,246,0.16)]"
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
                  <span className="text-[#ef4444] text-[0.78rem] mt-1 block">
                    ⚠ {fieldErrors.subject}
                  </span>
                )}
              </label>

              <label className="grid gap-[8px] text-[var(--muted)] text-[0.84rem] font-semibold">
                Message
                <textarea
                  className="w-full border border-[var(--border)] bg-[rgba(11,26,34,0.9)] text-[var(--white)] rounded-[10px] p-[12px_14px] text-[0.92rem] outline-none resize-y min-h-[130px] transition-all duration-200 focus:border-[var(--purple)] focus:ring-2 focus:ring-[rgba(139,92,246,0.16)]"
                  style={
                    fieldErrors.message && touched.message
                      ? { borderColor: "#ef4444" }
                      : {}
                  }
                  name="message"
                  rows={5}
                  placeholder="Tell us about your project, goals, and timeline..."
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={loading}
                />
                <div className="flex justify-between items-center mt-1">
                  {fieldErrors.message && touched.message ? (
                    <span className="text-[#ef4444] text-[0.78rem]">
                      ⚠ {fieldErrors.message}
                    </span>
                  ) : (
                    <span />
                  )}
                  <span
                    style={{
                      color:
                        formData.message.length < 20
                          ? "var(--muted)"
                          : "var(--purple)",
                    }}
                    className="text-[0.75rem]"
                  >
                    {formData.message.length} / 20 min chars
                  </span>
                </div>
              </label>

              <div className="flex items-center justify-between gap-[10px] flex-wrap">
                <div
                  style={{ color: "var(--muted)" }}
                  className="inline-flex items-center gap-[8px] text-[0.8rem]"
                >
                  <ShieldCheck size={15} color="var(--purple)" /> Private and
                  secure handling
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-primary"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Inquiry"} <Send size={16} />
                </motion.button>
              </div>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <section className="py-[84px] px-6">
      <div className="max-w-[1180px] mx-auto">
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
                className="glass rounded-[16px] overflow-hidden"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  style={{ color: "var(--white)" }}
                  className="w-full text-left border-none bg-transparent p-[18px] flex items-center justify-between gap-[14px] cursor-pointer"
                >
                  <span className="text-[1rem] font-bold">{faq.question}</span>
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
