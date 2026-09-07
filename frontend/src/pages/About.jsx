import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { Footer } from "../components/Footer";
import { projectsAPI } from "../api/client";

function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden px-4 py-28 sm:px-6 sm:py-24">
      {/* Background Orbs */}
      <motion.div
        animate={{ x: [0, 32, -18, 0], y: [0, -28, 22, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-28 -top-20 h-[380px] w-[380px] rounded-full bg-[rgba(139,92,246,0.08)] blur-[46px]"
      />
      <motion.div
        animate={{ x: [0, -25, 20, 0], y: [0, 30, -16, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -bottom-40 -right-28 h-[430px] w-[430px] rounded-full bg-[rgba(14,165,233,0.08)] blur-[54px]"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-[1180px] grid-cols-1 items-center gap-[52px] lg:grid-cols-[minmax(0,1.04fr)_minmax(320px,0.96fr)] lg:gap-[46px]">
        {/* Hero Text */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.6 }}
            className="mb-[22px]"
          >
            <span className="tag flex w-fit items-center gap-1.5">
              <Sparkles size={12} /> AI Engineering & Innovation
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.72 }}
            className="mb-5 text-[clamp(2.35rem,12vw,3.6rem)] font-extrabold tracking-tight sm:text-[clamp(2.5rem,6vw,5rem)] sm:leading-[1.06]"
          >
            We build AI that turns complexity into{" "}
            <span className="gradient-text">clear momentum</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.66 }}
            className="max-w-[640px] text-[1.02rem] leading-[1.82] text-[var(--muted)]"
          >
            Meeraxu helps teams design, launch, and scale AI systems that are
            useful on day one and stronger over time. We combine strategic
            thinking, deep engineering, and focused execution.
          </motion.p>
        </div>

        {/* Video Card */}
        <motion.div
          className="glass relative mx-auto max-w-[620px] overflow-visible rounded-[18px] p-2.5 sm:rounded-[26px] sm:p-4 lg:w-full"
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.24, duration: 0.76 }}
        >
          <div className="pointer-events-none absolute inset-0 rounded-[18px] bg-gradient-to-b from-[rgba(139,92,246,0.12)] to-[rgba(14,165,233,0.06)] sm:rounded-[26px]" />
          <div className="absolute -left-3 -top-5 z-0 h-[120px] w-[120px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.25)_2px,transparent_2px)] [background-size:12px_12px] opacity-60 sm:-left-5" />
          <div className="absolute -bottom-7 -right-4 z-0 h-[95px] w-[95px] rounded-[40%_60%_50%_48%] border-[3px] border-[rgba(139,92,246,0.5)] sm:-right-7" />

          <motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="relative z-10 overflow-hidden rounded-[24px] bg-gradient-to-br from-[var(--purple)] via-[var(--purple-dark)] to-[var(--purple-light)] p-[4px] shadow-[0_8px_32px_rgba(139,92,246,0.2)]"
          >
            <div className="overflow-hidden [border-radius:20px] sm:[border-radius:28%_68%_68%_28%/_28%_28%_68%_68%]">
              <video
                autoPlay
                muted
                loop
                playsInline
                poster="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80"
                className="aspect-[16/10] w-full object-cover"
              >
                <source
                  src="https://videos.pexels.com/video-files/6804104/6804104-sd_960_506_25fps.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          </motion.div>

          <div className="relative z-10 mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            <div className="rounded-[14px] border border-white/10 bg-white/[0.04] p-3">
              <strong className="block text-xs font-bold">Strategy-led</strong>
              <span className="block text-[0.78rem] leading-[1.5] text-[var(--muted)]">
                From business goal to AI roadmap
              </span>
            </div>
            <div className="rounded-[14px] border border-white/10 bg-white/[0.04] p-3">
              <strong className="block text-xs font-bold">
                Execution-ready
              </strong>
              <span className="block text-[0.78rem] leading-[1.5] text-[var(--muted)]">
                Designed for real production teams
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function StoryAndVision() {
  return (
    <section className="relative z-10 border-t border-[var(--border)] px-4 py-[76px] sm:px-6 sm:py-[112px] sm:pb-[128px]">
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-8 lg:grid-cols-[minmax(240px,0.72fr)_minmax(0,1fr)] lg:gap-[90px]">
        <div className="static top-[120px] self-start lg:sticky">
          <div className="font-mono text-[0.72rem] font-medium tracking-[0.12em] text-[var(--purple)] uppercase">
            Who We Are
          </div>
          <h2 className="mt-[18px] text-[2.7rem] leading-[1.04] tracking-tight sm:text-[clamp(2.4rem,5vw,4.6rem)]">
            We build <span className="text-[var(--purple)]">practical</span> AI.
          </h2>
        </div>
        <div className="max-w-[680px]">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mb-[28px] text-[1rem] leading-[1.9] text-[var(--muted)] sm:text-[1.08rem]"
          >
            We partner with visionary leaders who understand that true
            transformation requires more than tooling. It requires expertise,
            commitment, and a relentless focus on outcomes that matter.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-[28px] text-[1rem] leading-[1.9] text-[var(--muted)] sm:text-[1.08rem]"
          >
            Every system we build is custom. Every integration is purposeful.
            Every decision traces back to your business impact. We don't
            optimize for metrics—we optimize for results that compound.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="border-l-2 border-[var(--purple)] bg-[rgba(139,92,246,0.07)] p-7 text-[1.04rem] leading-[1.75] text-[var(--white)]"
          >
            "We're not here to build features. We're here to build competitive
            advantages. Your intelligence should feel like an unfair advantage,
            not a technology purchase."
            <div className="mt-4 font-mono text-[0.72rem] font-medium tracking-[0.08em] text-[var(--purple)] uppercase">
              — Our founding principle
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, isActive, onHover, isSlider, isMobile }) {
  const navigate = useNavigate();
  return (
    <motion.div
      layout
      onMouseEnter={onHover}
      onClick={() => navigate(`/project/${project._id}`)}
      className="relative h-[360px] min-w-0 flex-1 cursor-pointer overflow-hidden rounded-[16px] border border-[var(--border)] bg-[var(--surface)] sm:h-[420px]"
      animate={{
        flex: isSlider ? "0 0 auto" : isActive ? 3 : 1.08,
        width: isSlider
          ? isActive
            ? isMobile
              ? 280
              : 450
            : isMobile
              ? 160
              : 240
          : "auto",
      }}
    >
      <motion.img
        src={project.image}
        alt={project.title}
        animate={{ scale: isActive ? 1.035 : 1 }}
        transition={{ duration: 1.25 }}
        className="h-full w-full object-cover transition-transform duration-1000 ease-out"
      />
      <div
        className={`absolute inset-0 transition-colors duration-400 ${
          isActive
            ? "bg-gradient-to-b from-[rgba(5,13,18,0.05)] via-transparent to-[rgba(5,13,18,0.94)]"
            : "bg-gradient-to-b from-transparent via-transparent to-[rgba(5,13,18,0.9)]"
        }`}
      />
      <motion.div
        animate={{ opacity: isActive ? 0 : 0.9, y: isActive ? 8 : 0 }}
        className="absolute bottom-[18px] left-[18px] right-[18px] font-semibold text-[var(--white)] [writing-mode:vertical-rl] [transform:rotate(180deg)] text-[0.85rem] sm:text-base"
      >
        <span>{project.title}</span>
      </motion.div>
      <motion.div
        animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 18 }}
        className="absolute bottom-4 left-4 right-4 text-[var(--white)] sm:bottom-6 sm:left-6 sm:right-6"
      >
        <div className="font-mono text-[0.7rem] font-medium tracking-[0.1em] text-[var(--purple)]">
          {project.category?.toUpperCase()}
        </div>
        <h3 className="my-2 text-[1.45rem] font-bold">{project.title}</h3>
        <div className="flex items-center gap-2 text-[0.86rem] text-[var(--white)]">
          Explore Project <ArrowRight size={18} />
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectCardSkeleton() {
  return (
    <div className="h-[360px] flex-1 overflow-hidden rounded-[16px] bg-white/[0.06] sm:h-[420px]">
      <motion.div
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="h-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent"
      />
    </div>
  );
}

function HomeProjects({ projects = [], loading = false }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isSlider = projects.length > 4;
  const scroll = (distance) =>
    scrollContainerRef.current?.scrollBy({
      left: distance,
      behavior: "smooth",
    });

  return (
    <section className="relative z-10 border-y border-[var(--border)] bg-[rgba(11,26,34,0.45)] px-4 py-[76px] sm:px-6 sm:py-[104px] sm:pb-[116px]">
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-8 block items-end justify-between gap-6 sm:flex">
          <div>
            <span className="font-mono text-[0.72rem] font-medium tracking-[0.12em] text-[var(--purple)] uppercase">
              OUR PROJECTS
            </span>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3.5rem)] leading-[1.08] tracking-tight font-bold">
              Built for <span className="gradient-text">real impact</span>
            </h2>
            <p className="mt-3.5 max-w-[560px] leading-[1.7] text-[var(--muted)]">
              A showcase of intelligent systems, automation platforms, and
              AI-driven experiences crafted for modern businesses.
            </p>
          </div>
          {isSlider && (
            <div className="mt-5 flex shrink-0 gap-2.5 sm:mt-0">
              <button
                onClick={() => scroll(-340)}
                aria-label="Previous projects"
                className="grid h-[44px] min-h-[44px] w-[44px] place-items-center rounded-[10px] border border-[var(--border)] bg-[var(--card-bg)] text-[var(--white)] transition-colors hover:border-[var(--purple)] hover:text-[var(--purple)]"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => scroll(340)}
                aria-label="Next projects"
                className="grid h-[44px] min-h-[44px] w-[44px] place-items-center rounded-[10px] border border-[var(--border)] bg-[var(--card-bg)] text-[var(--white)] transition-colors hover:border-[var(--purple)] hover:text-[var(--purple)]"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex min-h-[360px] gap-3.5 overflow-hidden sm:min-h-[420px]">
            {[0, 1, 2, 3].map((item) => (
              <ProjectCardSkeleton key={item} />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="rounded-[14px] border border-dashed border-[var(--border)] px-6 py-[64px] text-center text-[var(--muted)]">
            No projects yet. New projects will appear here soon.
          </div>
        ) : (
          <div
            ref={scrollContainerRef}
            className={`flex min-h-[360px] gap-3.5 overflow-hidden sm:min-h-[420px] ${
              isSlider
                ? "overflow-x-auto pb-2 scrollbar-none"
                : "grid grid-cols-2 sm:flex"
            }`}
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={project._id}
                project={{ ...project, image: project.imageUrl }}
                isActive={activeIndex === index}
                onHover={() => setActiveIndex(index)}
                isSlider={isSlider}
                isMobile={isMobile}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function HomeCTA() {
  return (
    <section className="relative z-10 px-4 py-[76px] sm:px-6 sm:py-[112px]">
      <motion.div
        className="glass relative mx-auto max-w-[900px] overflow-hidden rounded-[24px] px-5 py-[52px] text-center sm:px-10 sm:py-[72px]"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.72 }}
      >
        <motion.div
          animate={{ scale: [1, 1.14, 1], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 5.5, repeat: Infinity }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--purple)] sm:h-[360px] sm:w-[360px]"
        />
        <h2 className="relative text-[clamp(2rem,4vw,3.4rem)] leading-[1.08] tracking-tight font-bold">
          Ready to build with <span className="gradient-text">Meeraxu</span>?
        </h2>
        <p className="relative mx-auto mb-7 mt-[18px] max-w-[600px] leading-[1.75] text-[var(--muted)]">
          If you are exploring automation, AI products, or end-to-end
          transformation, we can help you map the next step with clarity.
        </p>
        <Link
          to="/contact#contact-form"
          className="btn-primary relative inline-flex items-center gap-2"
        >
          Enquire Now <ArrowRight size={20} />
        </Link>
      </motion.div>
    </section>
  );
}

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    projectsAPI
      .getAll()
      .then((data) => setProjects(Array.isArray(data) ? data : []))
      .catch((error) => {
        console.error("Failed to fetch projects:", error);
        setProjects([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="bg-[var(--bg)] text-[var(--white)]">
      <Hero />
      <StoryAndVision />
      <HomeProjects projects={projects} loading={loading} />
      <HomeCTA />
      <Footer />
    </main>
  );
}
