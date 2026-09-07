import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Footer } from "../components/Footer";

const sections = [
  { id: "agreement", label: "Agreement to Terms" },
  { id: "intellectual-property", label: "Intellectual Property" },
  { id: "user-responsibilities", label: "User Responsibilities" },
  { id: "user-contributions", label: "User Contributions" },
  { id: "warranties-liability", label: "Disclaimer & Liability" },
  { id: "contact", label: "Contact Us" },
];

export function TermsAndConditions() {
  const [activeSection, setActiveSection] = useState("agreement");
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

      if (window.scrollY < 250) currentSection = "agreement";
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
                Legal Terms
              </span>
            </div>
            <h1 className="font-[var(--font-display)] text-[2rem] sm:text-[2.5rem] md:text-[3rem] mb-[12px] text-[var(--white)]">
              Terms & Conditions
            </h1>
            <p className="text-[0.95rem] sm:text-[1.1rem] text-[#e2e8f0]/70 leading-[1.2] max-w-[900px]">
              Please review the terms and conditions governing the usage of
              Meeraxu Intelligence services.
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
                  id="agreement"
                  className="mb-[40px] p-[24px] sm:p-[32px] rounded-[16px] border border-[#a855f7]/[0.12] bg-[linear-gradient(135deg,rgba(168,85,247,0.05),rgba(139,92,246,0.03))] backdrop-blur-[8px] scroll-mt-[120px]"
                >
                  <h2 className="text-[1.4rem] sm:text-[1.6rem] font-bold text-[var(--white)] mb-[18px] tracking-[-0.01em]">
                    Agreement to Terms
                  </h2>
                  <p>
                    These Terms and Conditions constitute a legally binding
                    agreement made between you and Meeraxu Intelligence
                    ("Company," "we," "us," or "our"). By accessing or using our
                    platform, you agree that you have read, understood, and
                    agree to be bound by all of these terms.
                  </p>
                </motion.section>

                {/* SECTION 2 */}
                <motion.section
                  id="intellectual-property"
                  className="mb-[40px] p-[24px] sm:p-[32px] rounded-[16px] border border-[#a855f7]/[0.12] bg-[linear-gradient(135deg,rgba(168,85,247,0.05),rgba(139,92,246,0.03))] backdrop-blur-[8px] scroll-mt-[120px]"
                >
                  <h2 className="text-[1.4rem] sm:text-[1.6rem] font-bold text-[var(--white)] mb-[18px] tracking-[-0.01em]">
                    Intellectual Property Rights
                  </h2>
                  <p>
                    Unless otherwise indicated, the Site and services are our
                    proprietary property. All source code, databases,
                    functionality, software, website designs, audio, video,
                    text, photographs, and graphics on the Site (collectively,
                    the "Content") are owned or controlled by us and protected
                    by copyright and trademark laws.
                  </p>
                </motion.section>

                {/* SECTION 3 */}
                <motion.section
                  id="user-responsibilities"
                  className="mb-[40px] p-[24px] sm:p-[32px] rounded-[16px] border border-[#a855f7]/[0.12] bg-[linear-gradient(135deg,rgba(168,85,247,0.05),rgba(139,92,246,0.03))] backdrop-blur-[8px] scroll-mt-[120px]"
                >
                  <h2 className="text-[1.4rem] sm:text-[1.6rem] font-bold text-[var(--white)] mb-[18px] tracking-[-0.01em]">
                    User Responsibilities & Conduct
                  </h2>
                  <p>
                    By using the Site, you represent and warrant that all
                    registration information you submit is accurate, and you
                    agree not to engage in prohibited activities including:
                  </p>
                  <ul className="ml-[24px] mt-[14px] flex flex-col gap-[10px] list-disc">
                    <li>
                      Systematically retrieving data or content to compile a
                      collection or database.
                    </li>
                    <li>
                      Attempting to trick, defraud, or mislead us and other
                      users.
                    </li>
                    <li>
                      Circumventing, disabling, or interfering with
                      security-related features.
                    </li>
                    <li>
                      Accessing the platform through automated or non-human
                      scripts or bots.
                    </li>
                  </ul>
                </motion.section>

                {/* SECTION 4 */}
                <motion.section
                  id="user-contributions"
                  className="mb-[40px] p-[24px] sm:p-[32px] rounded-[16px] border border-[#a855f7]/[0.12] bg-[linear-gradient(135deg,rgba(168,85,247,0.05),rgba(139,92,246,0.03))] backdrop-blur-[8px] scroll-mt-[120px]"
                >
                  <h2 className="text-[1.4rem] sm:text-[1.6rem] font-bold text-[var(--white)] mb-[18px] tracking-[-0.01em]">
                    User Generated Contributions & Licensing
                  </h2>
                  <p>
                    The Site may invite you to chat, contribute to, or
                    participate in blogs and forums. You retain full ownership
                    of all user contributions. However, by posting
                    Contributions, you grant us an unrestricted, royalty-free,
                    perpetual license to use, host, reproduce, and publish such
                    content for platform operations and enhancements.
                  </p>
                </motion.section>

                {/* SECTION 5 */}
                <motion.section
                  id="warranties-liability"
                  className="mb-[40px] p-[24px] sm:p-[32px] rounded-[16px] border border-[#a855f7]/[0.12] bg-[linear-gradient(135deg,rgba(168,85,247,0.05),rgba(139,92,246,0.03))] backdrop-blur-[8px] scroll-mt-[120px]"
                >
                  <h2 className="text-[1.4rem] sm:text-[1.6rem] font-bold text-[var(--white)] mb-[18px] tracking-[-0.01em]">
                    Disclaimer of Warranties & Liability
                  </h2>
                  <p className="mb-[12px]">
                    The site is provided on an "as-is" and "as-available" basis.
                    Your use of the site and our services is at your sole risk.
                    To the fullest extent permitted by law, we disclaim all
                    express or implied warranties.
                  </p>
                  <p>
                    In no event will Meeraxu Intelligence, its directors, or
                    employees be liable for any direct, indirect, consequential,
                    exemplary, or punitive damages arising from your use of the
                    platform or services.
                  </p>
                </motion.section>

                {/* SECTION 6 */}
                <motion.section
                  id="contact"
                  className="mb-[40px] p-[24px] sm:p-[32px] rounded-[16px] border border-[#a855f7]/[0.12] bg-[linear-gradient(135deg,rgba(168,85,247,0.05),rgba(139,92,246,0.03))] backdrop-blur-[8px] scroll-mt-[120px]"
                >
                  <h2 className="text-[1.4rem] sm:text-[1.6rem] font-bold text-[var(--white)] mb-[18px] tracking-[-0.01em]">
                    Contact Us
                  </h2>
                  <p>
                    In order to resolve a complaint regarding the Site or to
                    receive further information regarding use of the Site,
                    please contact us at:
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
