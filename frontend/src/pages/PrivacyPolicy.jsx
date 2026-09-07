import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Footer } from "../components/Footer";

// Privacy Policy Sections
const sections = [
  { id: "information-collection", label: "Information We Collect" },
  { id: "how-we-use", label: "How We Use Information" },
  { id: "sharing-disclosure", label: "Sharing & Disclosure" },
  { id: "data-security", label: "Data Security" },
  { id: "your-rights", label: "Your Rights & Choices" },
  { id: "contact", label: "Contact Us" },
];

export function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState("information-collection");
  const contentRef = useRef(null);

  useEffect(() => {
    let ticking = false;
    const updateActiveSection = () => {
      const activationOffset = 160;
      let currentSection = sections[0].id;
      let closestDistance = Infinity;

      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (!element) return;
        const rect = element.getBoundingClientRect();
        const distance = Math.abs(rect.top - activationOffset);

        if (rect.top <= activationOffset) {
          currentSection = section.id;
          closestDistance = distance;
        } else if (
          currentSection === sections[0].id &&
          distance < closestDistance
        ) {
          closestDistance = distance;
          currentSection = section.id;
        }
      });

      if (window.scrollY < 250) currentSection = "information-collection";
      setActiveSection((prev) =>
        prev === currentSection ? prev : currentSection,
      );
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateActiveSection);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    updateActiveSection();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const handleSectionClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (!element) return;
    setActiveSection(sectionId);
    const elementPosition =
      element.getBoundingClientRect().top + window.scrollY - 110;
    window.scrollTo({ top: elementPosition, behavior: "smooth" });
  };

  const NavItems = ({ isMobileNav = false }) => (
    <>
      {sections.map((sec) => {
        const isActive = activeSection === sec.id;
        return (
          <button
            key={sec.id}
            onClick={() => handleSectionClick(sec.id)}
            className={`transition-all duration-300 font-[var(--font-body)] cursor-pointer outline-none shrink-0 ${
              isMobileNav
                ? "px-[14px] py-[8px] rounded-[8px] text-[0.85rem] text-center whitespace-nowrap"
                : "px-[14px] py-[10px] rounded-[10px] text-[0.9rem] text-left whitespace-normal"
            } ${
              isActive
                ? "border border-[#a855f7]/40 bg-[linear-gradient(135deg,rgba(168,85,247,0.25),rgba(139,92,246,0.15))] text-[var(--white)] font-semibold"
                : "border border-transparent bg-transparent text-[#e2e8f0]/60 font-medium hover:text-[var(--white)]"
            }`}
          >
            {sec.label}
          </button>
        );
      })}
    </>
  );

  return (
    <div className="page-shell legal-page w-full min-h-screen bg-[var(--bg)] text-[var(--white)] overflow-x-hidden">
      {/* HERO SECTION */}
      <div className="pt-[48px] pb-[70px] mt-[-14px] bg-[linear-gradient(180deg,rgba(20,5,40,0.4)_0%,transparent_50%)]">
        <div className="max-w-[1100px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center"
          >
            <div className="px-[11px] py-[4px] rounded-full bg-[#a855f7]/[0.12] border border-[#a855f7]/25 mb-[8px]">
              <span className="text-[0.5rem] font-bold tracking-[0.08em] uppercase text-[#a855f7]/90">
                Data Protection
              </span>
            </div>
            <h1 className="font-[var(--font-display)] text-[2.5rem] sm:text-[3rem] mb-[12px] text-[var(--white)]">
              Privacy Policy
            </h1>
            <p className="text-[1.1rem] text-[#e2e8f0]/70 leading-[1.2] max-w-[900px]">
              Learn how Meeraxu Intelligence collects, protects, and manages
              your personal data.
            </p>
          </motion.div>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="pb-[80px]">
        <div className="max-w-[1400px] mx-auto px-6">
          {/* MOBILE TABS */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex lg:hidden gap-[8px] overflow-x-auto pb-[16px] mb-[32px] no-scrollbar"
          >
            <NavItems isMobileNav={true} />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-0 lg:gap-[60px] items-start relative">
            {/* DESKTOP SIDEBAR */}
            <aside className="hidden lg:flex sticky top-[120px] h-fit flex-col gap-[6px] self-start z-20">
              <div className="text-[0.75rem] font-bold tracking-[0.08em] uppercase text-[#a855f7]/70 mb-[12px]">
                On This Page
              </div>
              <NavItems isMobileNav={false} />
            </aside>

            {/* SECTIONS LIST */}
            <div ref={contentRef}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-[0.95rem] leading-[1.8] text-[#e2e8f0]/80"
              >
                {/* SECTION 1 */}
                <motion.section
                  id="information-collection"
                  className="mb-[40px] p-[24px] sm:p-[32px] rounded-[16px] border border-[#a855f7]/[0.12] bg-[linear-gradient(135deg,rgba(168,85,247,0.05),rgba(139,92,246,0.03))] backdrop-blur-[8px] scroll-mt-[120px]"
                >
                  <h2 className="text-[1.6rem] font-bold text-[var(--white)] mb-[18px] tracking-[-0.01em]">
                    Information We Collect
                  </h2>
                  <p>
                    At Meeraxu Intelligence, we collect details to provide
                    better services to all our users. The types of information
                    we collect include:
                  </p>
                  <ul className="ml-[24px] mt-[14px] flex flex-col gap-[10px] list-disc">
                    <li>
                      <span className="text-[#a855f7]/90 font-semibold">
                        Personal Data:
                      </span>{" "}
                      Name, email address, phone number, and billing information
                      provided during account creation.
                    </li>
                    <li>
                      <span className="text-[#a855f7]/90 font-semibold">
                        Usage Data:
                      </span>{" "}
                      IP address, browser type, device identifiers, visited
                      pages, and time spent on the platform.
                    </li>
                    <li>
                      <span className="text-[#a855f7]/90 font-semibold">
                        Cookies & Tracking:
                      </span>{" "}
                      Data gathered via cookies and similar tracking
                      technologies to improve performance.
                    </li>
                  </ul>
                </motion.section>

                {/* SECTION 2 */}
                <motion.section
                  id="how-we-use"
                  className="mb-[40px] p-[24px] sm:p-[32px] rounded-[16px] border border-[#a855f7]/[0.12] bg-[linear-gradient(135deg,rgba(168,85,247,0.05),rgba(139,92,246,0.03))] backdrop-blur-[8px] scroll-mt-[120px]"
                >
                  <h2 className="text-[1.6rem] font-bold text-[var(--white)] mb-[18px] tracking-[-0.01em]">
                    How We Use Your Information
                  </h2>
                  <p>
                    We use the information we collect for various business
                    purposes, including:
                  </p>
                  <ul className="ml-[24px] mt-[14px] flex flex-col gap-[10px] list-disc">
                    <li>
                      Providing, operating, and maintaining our platform and
                      services.
                    </li>
                    <li>
                      Improving, personalizing, and expanding platform
                      functionality.
                    </li>
                    <li>
                      Communicating updates, security alerts, and promotional
                      messages.
                    </li>
                    <li>
                      Detecting, preventing, and addressing technical issues or
                      fraud.
                    </li>
                  </ul>
                </motion.section>

                {/* SECTION 3 */}
                <motion.section
                  id="sharing-disclosure"
                  className="mb-[40px] p-[24px] sm:p-[32px] rounded-[16px] border border-[#a855f7]/[0.12] bg-[linear-gradient(135deg,rgba(168,85,247,0.05),rgba(139,92,246,0.03))] backdrop-blur-[8px] scroll-mt-[120px]"
                >
                  <h2 className="text-[1.6rem] font-bold text-[var(--white)] mb-[18px] tracking-[-0.01em]">
                    Sharing & Disclosure
                  </h2>
                  <p>
                    We do not sell your personal data. We may share information
                    with trusted third parties under the following conditions:
                  </p>
                  <ul className="ml-[24px] mt-[14px] flex flex-col gap-[10px] list-disc">
                    <li>
                      <span className="text-[#a855f7]/90 font-semibold">
                        Service Providers:
                      </span>{" "}
                      Third-party vendors assisting in hosting, analytics, and
                      customer support.
                    </li>
                    <li>
                      <span className="text-[#a855f7]/90 font-semibold">
                        Legal Requirements:
                      </span>{" "}
                      If required to comply with applicable laws, court orders,
                      or governmental regulations.
                    </li>
                    <li>
                      <span className="text-[#a855f7]/90 font-semibold">
                        Business Transfers:
                      </span>{" "}
                      In connection with a merger, acquisition, or sale of
                      company assets.
                    </li>
                  </ul>
                </motion.section>

                {/* SECTION 4 */}
                <motion.section
                  id="data-security"
                  className="mb-[40px] p-[24px] sm:p-[32px] rounded-[16px] border border-[#a855f7]/[0.12] bg-[linear-gradient(135deg,rgba(168,85,247,0.05),rgba(139,92,246,0.03))] backdrop-blur-[8px] scroll-mt-[120px]"
                >
                  <h2 className="text-[1.6rem] font-bold text-[var(--white)] mb-[18px] tracking-[-0.01em]">
                    Data Security
                  </h2>
                  <p>
                    We prioritize the security of your data and use robust
                    administrative, technical, and physical safeguards. While we
                    strive to protect your personal information using
                    industry-standard encryption, no internet transmission or
                    electronic storage method is 100% secure.
                  </p>
                </motion.section>

                {/* SECTION 5 */}
                <motion.section
                  id="your-rights"
                  className="mb-[40px] p-[24px] sm:p-[32px] rounded-[16px] border border-[#a855f7]/[0.12] bg-[linear-gradient(135deg,rgba(168,85,247,0.05),rgba(139,92,246,0.03))] backdrop-blur-[8px] scroll-mt-[120px]"
                >
                  <h2 className="text-[1.6rem] font-bold text-[var(--white)] mb-[18px] tracking-[-0.01em]">
                    Your Rights & Choices
                  </h2>
                  <p className="mb-[12px]">
                    Depending on your location, you have certain rights
                    regarding your personal information:
                  </p>
                  <ul className="ml-[24px] flex flex-col gap-[10px] list-disc">
                    <li>
                      Accessing, updating, or requesting the deletion of your
                      data.
                    </li>
                    <li>
                      Opting out of marketing and promotional email
                      communications.
                    </li>
                    <li>
                      Restricting or objecting to specific processing
                      activities.
                    </li>
                  </ul>
                </motion.section>

                {/* SECTION 6 */}
                <motion.section
                  id="contact"
                  className="mb-[40px] p-[24px] sm:p-[32px] rounded-[16px] border border-[#a855f7]/[0.12] bg-[linear-gradient(135deg,rgba(168,85,247,0.05),rgba(139,92,246,0.03))] backdrop-blur-[8px] scroll-mt-[120px]"
                >
                  <h2 className="text-[1.6rem] font-bold text-[var(--white)] mb-[18px] tracking-[-0.01em]">
                    Contact Us
                  </h2>
                  <p>
                    If you have any questions, concerns, or requests regarding
                    this Privacy Policy, please reach out to us at:
                  </p>
                  <div className="mt-[18px] p-[16px] rounded-[12px] bg-[#a855f7]/[0.08] border border-[#a855f7]/15">
                    <p className="mb-[8px]">
                      <span className="text-[#a855f7]/90 font-semibold">
                        Email:
                      </span>{" "}
                      admin@meeracuintelligence.com
                    </p>
                    <p>
                      <span className="text-[#a855f7]/90 font-semibold">
                        Phone:
                      </span>{" "}
                      +91 75681 85591
                    </p>
                  </div>
                </motion.section>

                {/* LAST UPDATED */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-[0.85rem] text-[#94a3b8]/60 mt-[32px] pt-[24px] border-t border-[#a855f7]/10 text-center"
                >
                  Last updated: {new Date().toLocaleDateString()}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
