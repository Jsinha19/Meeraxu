import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { projectsAPI } from "../api/client";

function ProjectDocumentation({ project }) {
  const [activePhaseIndex, setActivePhaseIndex] = useState(null);
  const isViewingPhaseDetail = activePhaseIndex !== null;
  const activePhase = isViewingPhaseDetail
    ? project.phases[activePhaseIndex]
    : null;
  const phases = project.phases || [];

  const sidebarItems = isViewingPhaseDetail
    ? [
        {
          label: "<- Back to Overview",
          id: "back",
          onClick: () => setActivePhaseIndex(null),
        },
        ...phases.map((phase, index) => ({
          label: phase.title || `Phase ${index + 1}`,
          id: `phase-${index}`,
          isActive: index === activePhaseIndex,
          onClick: () => setActivePhaseIndex(index),
        })),
      ]
    : [
        { label: project.category || "Overview", id: "category" },
        ...phases.map((phase, index) => ({
          label: phase.title || `Phase ${index + 1}`,
          id: `phase-${index}`,
          onClick: () => setActivePhaseIndex(index),
        })),
      ];

  return (
    <div className="project-doc-shell">
      <div className="project-doc-body">
        <aside className="project-sidebar">
          <nav className="sidebar-menu">
            {sidebarItems.map((item, index) => (
              <button
                type="button"
                key={item.id}
                className={`sidebar-item ${item.isActive || (index === 0 && !isViewingPhaseDetail) ? "active" : ""}`}
                onClick={item.onClick || (() => {})}
              >
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        <main className="project-main-panel">
          <div className="page-body">
            {!isViewingPhaseDetail ? (
              <>
                <div className="project-category-badge">
                  {project.category || "PROJECT"}
                </div>
                <div className="hero-title">
                  <h1>{project.title || "Project"}</h1>
                </div>
                {project.image && (
                  <div className="project-media-container">
                    <img
                      src={project.image}
                      alt={project.title || "Project image"}
                      className="project-media-image"
                    />
                  </div>
                )}
                <div className="lead-text">
                  {project.description ||
                    "A comprehensive project showcasing innovation and technical excellence."}
                </div>
                {phases.length > 0 && (
                  <div className="phases-section">
                    <h2>Implementation Phases</h2>
                    <div className="phases-list">
                      {phases.map((phase, index) => (
                        <button
                          key={index}
                          type="button"
                          className="phase-block"
                          onClick={() => setActivePhaseIndex(index)}
                        >
                          <div className="phase-block-content">
                            <h4>{phase.title || `Phase ${index + 1}`}</h4>
                            {phase.sub && <p>{phase.sub}</p>}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="phase-detail-container">
                <div className="phase-detail-header">
                  <span className="phase-detail-badge">
                    PHASE {activePhase.n || `0${activePhaseIndex + 1}`}
                  </span>
                  <h1>
                    {activePhase.title || `Phase ${activePhaseIndex + 1}`}
                  </h1>
                </div>
                {activePhase.sub && (
                  <div className="phase-detail-subtitle">{activePhase.sub}</div>
                )}
                {activePhase.body && (
                  <div className="phase-detail-body">{activePhase.body}</div>
                )}
                {activePhase.bullets?.length > 0 && (
                  <div className="phase-detail-bullets-card">
                    <h3>Key Highlights &amp; Deliverables</h3>
                    <div className="bullets-grid">
                      {activePhase.bullets.map((bullet, index) => (
                        <div key={index} className="bullet-card-item">
                          <span className="bullet-icon">✦</span>
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>

      <style>{`
        .project-doc-shell{width:100%;min-height:100vh;background:var(--bg);color:var(--white);padding-top:16px}.project-doc-body{display:grid;grid-template-columns:280px 1fr;min-height:calc(100vh - 16px)}.project-sidebar{background:rgba(5,13,18,.96);border-right:1px solid rgba(139,92,246,.25);display:flex;flex-direction:column}.sidebar-menu{display:flex;flex-direction:column;gap:4px;padding:12px;flex:1}.sidebar-item{width:100%;border:0;background:transparent;color:rgba(234,246,243,.72);padding:10px 14px;border-radius:8px;text-align:left;font-size:.9rem;display:flex;align-items:center;justify-content:space-between;transition:all .2s;cursor:pointer}.sidebar-item.active{background:rgba(139,92,246,.18);color:#d8c9ff;font-weight:600;border:1px solid rgba(139,92,246,.3)}.sidebar-item:hover{background:rgba(139,92,246,.08)}.project-main-panel{background:var(--bg);min-width:0}.page-body{padding:12px 72px 40px;min-height:calc(100vh - 16px)}.project-category-badge{font-size:.65rem;font-weight:700;letter-spacing:.12em;color:#a78bfa;text-transform:uppercase;margin-bottom:6px}.hero-title h1{margin:0;font-size:clamp(2rem,3.2vw,3rem);line-height:1.1;letter-spacing:-.03em;font-weight:800;background:linear-gradient(135deg,var(--white),rgba(234,246,243,.85));-webkit-background-clip:text;-webkit-text-fill-color:transparent}.project-media-container{margin:28px 0 36px;width:100%;max-width:840px;border-radius:10px;overflow:hidden;border:1px solid rgba(139,92,246,.2);background:rgba(11,26,34,.5)}.project-media-image{width:100%;max-height:420px;object-fit:cover;display:block}.lead-text{margin-bottom:36px;padding-left:8px;font-size:.98rem;line-height:1.7;letter-spacing:.015em;word-spacing:.04em;color:rgba(234,246,243,.88);white-space:pre-line;max-width:530px}.phases-section{margin-top:32px}.phases-section h2{font-size:1.25rem;margin-bottom:16px;color:rgba(234,246,243,.9);letter-spacing:-.02em}.phases-list{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.phase-block{display:flex;flex-direction:column;padding:16px;border:1px solid rgba(139,92,246,.2);border-radius:8px;background:rgba(11,26,34,.4);cursor:pointer;transition:all .2s;text-align:left;appearance:none;box-sizing:border-box;height:100%}.phase-block:hover{background:rgba(139,92,246,.08);border-color:rgba(139,92,246,.4);transform:translateY(-2px)}.phase-block-content{display:flex;flex-direction:column;gap:6px}.phase-block-content h4{margin:0;color:#fff;font-size:.98rem;line-height:1.25}.phase-block-content p{margin:0;color:rgba(234,246,243,.68);line-height:1.35;font-size:.85rem}.phase-detail-container{max-width:760px;animation:projectFadeIn .3s ease-in-out}.phase-detail-header{margin-bottom:16px}.phase-detail-badge{display:inline-block;font-size:.65rem;font-weight:800;letter-spacing:.15em;color:#c4b5fd;background:rgba(139,92,246,.15);border:1px solid rgba(139,92,246,.3);padding:4px 10px;border-radius:20px;margin-bottom:12px}.phase-detail-header h1{margin:0;font-size:clamp(1.8rem,3vw,2.8rem);line-height:1.1;color:#fff}.phase-detail-subtitle{margin-bottom:20px;font-size:1.1rem;font-weight:600;color:#d8c9ff;line-height:1.45}.phase-detail-body{margin-bottom:32px;font-size:.96rem;line-height:1.65;color:rgba(234,246,243,.82);white-space:pre-line;max-width:530px}.phase-detail-bullets-card{background:rgba(11,26,34,.45);border:1px solid rgba(139,92,246,.22);border-radius:12px;padding:22px;backdrop-filter:blur(8px)}.phase-detail-bullets-card h3{margin:0 0 16px;font-size:1.05rem;color:#f3f0ff}.bullets-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}.bullet-card-item{display:flex;align-items:center;gap:10px;padding:12px 14px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:8px;color:rgba(234,246,243,.88);font-size:.9rem}.bullet-icon{color:#a78bfa;font-size:.8rem;flex-shrink:0}@keyframes projectFadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
        @media(max-width:1120px){.project-doc-shell{padding-top:10px}.project-doc-body{grid-template-columns:1fr}.project-sidebar{border-right:0;border-bottom:1px solid rgba(139,92,246,.35)}.sidebar-menu{flex-direction:row;overflow-x:auto}.sidebar-item{width:auto;white-space:nowrap}.page-body{padding:20px 32px 32px}.phases-list{grid-template-columns:repeat(2,1fr)}.project-media-container,.lead-text,.phase-detail-container{max-width:100%}}
        @media(max-width:760px){.page-body{padding:16px 16px 32px}.lead-text{padding-left:0}.phases-list,.bullets-grid{grid-template-columns:1fr}}
      `}</style>
    </div>
  );
}

export function ProjectDetail() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    projectsAPI
      .getOne(projectId)
      .then((data) => {
        if (active)
          setProject({
            ...data,
            image: data.imageUrl || data.image || "",
            description:
              data.description ||
              "A comprehensive project showcasing innovation and technical excellence.",
          });
      })
      .catch((error) => {
        console.error("Failed to fetch project:", error);
        if (active) navigate("/about");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    window.scrollTo(0, 0);
    return () => {
      active = false;
    };
  }, [projectId, navigate]);

  if (loading)
    return (
      <div className="project-detail-loading">
        <span />
        Loading project...
      </div>
    );
  if (!project) return null;
  return <ProjectDocumentation project={project} />;
}
