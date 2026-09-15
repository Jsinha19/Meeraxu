import { useCallback, useEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { GlobalStyles } from "./components/GlobalStyles";
import { Navbar } from "./components/Navbar";
import Home from "./pages/HomeV2";
import About from "./pages/About";
import { Contact } from "./pages/Contact";
import { ProjectDetail } from "./pages/ProjectDetail";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { TermsAndConditions } from "./pages/TermsAndConditions";
import { Chatbot } from "./components/Chatbot";
import AdminLayout from "./admin/layouts/AdminLayout";
import AdminLogin from "./admin/pages/Login";
import AdminDashboard from "./admin/pages/Dashboard";
import AdminServices from "./admin/pages/Services";
import AdminProjects from "./admin/pages/Projects";
import AdminContactForms from "./admin/pages/ContactForms";

function LoaderLetters({ text, className = "", delayOffset = 0 }) {
  return (
    <span className={`startup-loader__letters ${className}`} aria-label={text}>
      {text.split("").map((letter, index) => (
        <span
          key={`${letter}-${index}`}
          className="startup-loader__letter"
          style={{ animationDelay: `${delayOffset + index * 38}ms` }}
          aria-hidden="true"
        >
          {letter === " " ? "\u00a0" : letter}
        </span>
      ))}
    </span>
  );
}

function StartupLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const phaseTimers = [
      window.setTimeout(() => setPhase(1), 1600),
      window.setTimeout(() => setPhase(2), 3200),
      window.setTimeout(() => setPhase(3), 4800),
      window.setTimeout(() => {
        document.body.style.overflow = previousOverflow;
        setIsLeaving(true);
        window.setTimeout(onComplete, 1200);
      }, 6400),
    ];
    const startedAt = Date.now();
    const duration = 6100;
    const progressTimer = window.setInterval(() => {
      const elapsed = Date.now() - startedAt;
      const nextProgress = Math.min(
        100,
        Math.round((elapsed / duration) * 100),
      );
      setProgress(nextProgress);

      if (nextProgress >= 100) {
        window.clearInterval(progressTimer);
      }
    }, 24);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearInterval(progressTimer);
      phaseTimers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [onComplete]);

  const loaderPhases = [
    { brand: "INNOVATION", descriptor: "ENGINEERING THE NEXT SIGNAL" },
    { brand: "INTELLIGENCE", descriptor: "AUTOMATION WITH PURPOSE" },
    { brand: "INSIGHTS", descriptor: "INTELLIGENCE FORWARD" },
    { brand: "MEERAXU", descriptor: "INTELLIGENCE FORWARD" },
  ];
  const currentPhase = loaderPhases[phase];

  return (
    <div
      aria-label="Loading Meeraxu Intelligence"
      className={`startup-loader ${isLeaving ? "startup-loader--leaving" : ""}`}
    >
      <div className="startup-loader__frame" />
      <div className="startup-loader__stars" />
      <div className="startup-loader__content">
        <div className="startup-loader__eyebrow">INITIALIZING INTELLIGENCE</div>
        <div
          key={`${currentPhase.brand}-${phase}`}
          className={`startup-loader__brand ${phase !== 3 ? "startup-loader__brand--changing" : ""} ${
            phase === 3 ? "startup-loader__brand--final" : ""
          }`}
        >
          {phase === 3 ? (
            <div className="startup-loader__final-lockup">
              <span className="startup-loader__final-word">MEERAXU</span>
              <LoaderLetters
                text="INTELLIGENCE"
                className="startup-loader__final-word startup-loader__final-word--violet"
                delayOffset={720}
              />
            </div>
          ) : (
            <LoaderLetters text={currentPhase.brand} />
          )}
        </div>
        <div className="startup-loader__descriptor">
          {currentPhase.descriptor} <i /> HUMAN IMPACT
        </div>
      </div>
      <div className="startup-loader__progress-wrap">
        <div className="startup-loader__progress-track">
          <div
            className="startup-loader__progress-bar"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span>{progress}%</span>
      </div>
    </div>
  );
}

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="min-w-0 w-full overflow-x-clip pt-0">{children}</main>
      <Chatbot />
    </>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

export default function App() {
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const handleIntroComplete = useCallback(() => setIsIntroComplete(true), []);

  return (
    <BrowserRouter>
      <GlobalStyles />
      <StartupLoader onComplete={handleIntroComplete} />
      <ScrollToTop />
      <div className="scan-line" />
      {isIntroComplete && (
        <div className="app-shell app-shell--ready">
          <Routes>
            <Route
              path="/"
              element={
                <PublicLayout>
                  <Home />
                </PublicLayout>
              }
            />
            <Route
              path="/about"
              element={
                <PublicLayout>
                  <About />
                </PublicLayout>
              }
            />
            <Route
              path="/contact"
              element={
                <PublicLayout>
                  <Contact />
                </PublicLayout>
              }
            />
            <Route
              path="/project/:projectId"
              element={
                <PublicLayout>
                  <ProjectDetail />
                </PublicLayout>
              }
            />
            <Route
              path="/privacy-policy"
              element={
                <PublicLayout>
                  <PrivacyPolicy />
                </PublicLayout>
              }
            />
            <Route
              path="/terms-and-conditions"
              element={
                <PublicLayout>
                  <TermsAndConditions />
                </PublicLayout>
              }
            />

            <Route path="/admin">
              <Route index element={<AdminLogin />} />
              <Route path="login" element={<AdminLogin />} />
              <Route element={<AdminLayout />}>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="services" element={<AdminServices />} />
                <Route path="projects" element={<AdminProjects />} />
                <Route path="contact-forms" element={<AdminContactForms />} />
              </Route>
            </Route>
            <Route
              path="/superadmin"
              element={<Navigate to="/admin/login" replace />}
            />
            <Route
              path="/superadmin/login"
              element={<Navigate to="/admin/login" replace />}
            />
          </Routes>
        </div>
      )}
    </BrowserRouter>
  );
}
