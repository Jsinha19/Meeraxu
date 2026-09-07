export function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300..800&family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap');

      :root {
        --bg: #050d12;
        --surface: #0b1a22;
        --border: rgba(139, 92, 246, 0.12);
        --purple: #8B5CF6;
        --purple-dim: rgba(139, 92, 246, 0.18);
        --purple-glow: rgba(139, 92, 246, 0.35);
        --purple-dark: #6D28D9;
        --white: #eaf6f3;
        --muted: rgba(234, 246, 243, 0.5);
        --card-bg: rgba(11, 26, 34, 0.75);
        --font-display: 'Bricolage Grotesque', sans-serif;
        --font-body: 'Space Grotesk', sans-serif;
        --font-mono: 'JetBrains Mono', monospace;
        --font-editorial: 'Instrument Serif', serif;
      }

      html { 
        scroll-behavior: auto;
        background-color: var(--bg);
        color: var(--white);
      }

      body {
        font-family: var(--font-body);
        background-color: var(--bg);
        color: var(--white);
        cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='12' r='7' fill='none' stroke='%23A855F7' stroke-width='1.8'/%3E%3Ccircle cx='12' cy='12' r='2.2' fill='%23FFFFFF'/%3E%3C/svg%3E") 12 12, auto;
      }

      a, button, input, textarea {
        cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='12' r='7' fill='none' stroke='%23A855F7' stroke-width='1.8'/%3E%3Ccircle cx='12' cy='12' r='2.2' fill='%23FFFFFF'/%3E%3C/svg%3E") 12 12, pointer;
      }

      h1, h2, h3, h4 { 
        font-family: var(--font-display);
      }
      
      h5, h6 { 
        font-family: var(--font-body);
      }
      
      code, pre {
        font-family: var(--font-mono);
      }
      
      .eyebrow, .tag, .label {
        font-family: var(--font-mono);
      }
      
      .editorial, .editorial-accent {
        font-family: var(--font-editorial);
        font-style: italic;
      }

      .gradient-text {
        background: linear-gradient(135deg, var(--purple) 0%, var(--purple-dark) 60%, #c4b5fd 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .glass {
        background: var(--card-bg);
        border: 1px solid var(--border);
        backdrop-filter: blur(18px);
      }

      body::before {
        content: '';
        position: fixed;
        inset: 0;
        pointer-events: none;
        z-index: 0;
        background-image:
          linear-gradient(rgba(139, 92, 246, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(139, 92, 246, 0.03) 1px, transparent 1px);
        background-size: 60px 60px;
      }

      .tag {
        display: inline-flex;
        align-items: center;
        padding: 4px 12px;
        border-radius: 999px;
        font-size: 0.72rem;
        font-weight: 500;
        letter-spacing: 0.03em;
        background: var(--purple-dim);
        color: var(--purple);
        border: 1px solid var(--border);
      }

      .btn-primary {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 14px 32px;
        border-radius: 10px;
        background: linear-gradient(135deg, var(--purple) 0%, var(--purple-dark) 100%);
        color: #050d12;
        font-family: var(--font-body);
        font-weight: 700;
        font-size: 0.95rem;
        letter-spacing: 0.02em;
        cursor: pointer;
        border: none;
        transition: box-shadow 0.3s, transform 0.15s;
      }

      .btn-primary:hover {
        box-shadow: 0 0 40px var(--purple-glow);
      }

      .btn-outline {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 13px 32px;
        border-radius: 10px;
        background: transparent;
        color: var(--purple);
        font-family: var(--font-body);
        font-weight: 700;
        font-size: 0.95rem;
        cursor: pointer;
        border: 1.5px solid var(--purple);
        transition: background 0.2s, box-shadow 0.3s;
      }

      .btn-outline:hover {
        background: var(--purple-dim);
        box-shadow: 0 0 24px var(--purple-glow);
      }

      .service-card {
        position: relative;
        overflow: hidden;
      }

      .service-card::after {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: inherit;
        pointer-events: none;
        background: linear-gradient(135deg, transparent 0%, rgba(139, 92, 246, 0.08) 100%);
        opacity: 0;
        transition: opacity 0.3s;
      }

      .service-card:hover::after {
        opacity: 1;
      }

      .scan-line {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        z-index: 999;
        background: repeating-linear-gradient(
          0deg,
          rgba(139, 92, 246, 0.03),
          rgba(139, 92, 246, 0.03) 1px,
          transparent 1px,
          transparent 2px
        );
        animation: scan 8s linear infinite;
      }

      @keyframes scan {
        0% { transform: translateY(0); }
        100% { transform: translateY(100vh); }
      }

      @keyframes beam-spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }

      @keyframes dashTrace {
        0% { stroke-dashoffset: 400; }
        100% { stroke-dashoffset: 0; }
      }

      @keyframes dashTraceRev {
        0% { stroke-dashoffset: 0; }
        100% { stroke-dashoffset: 360; }
      }

      /* Responsive global helpers */
      .page-shell {
        width: 100%;
        min-width: 0;
        overflow-x: clip;
      }

      .nav-container {
        width: min(1280px, 100%);
      }

      @media (max-width: 768px) {
        .legal-page h1 {
          font-size: clamp(2rem, 10vw, 3rem) !important;
          line-height: 1.05 !important;
          overflow-wrap: anywhere;
        }

        .legal-page h2 {
          font-size: 1.3rem !important;
        }

        .legal-page [style*="padding: 32px"] {
          padding: 20px !important;
          margin-bottom: 28px !important;
        }

        .legal-page [style*="marginLeft: 24"] {
          margin-left: 18px !important;
        }

        .legal-page [style*="maxWidth: \"1400px\""] {
          padding-left: 16px !important;
          padding-right: 16px !important;
        }

        .nav-container {
          padding-left: 16px !important;
          padding-right: 16px !important;
          gap: 12px !important;
        }

        .navbar-actions {
          gap: 8px !important;
        }

        .navbar-actions > button {
          padding-left: 10px !important;
          padding-right: 10px !important;
          font-size: 10px !important;
        }

        .footer-grid {
          grid-template-columns: 1fr !important;
          gap: 32px !important;
        }

        .marquee {
          mask-image: linear-gradient(90deg, transparent, #000 4%, #000 96%, transparent);
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 4%, #000 96%, transparent);
        }

        .marquee-track span {
          font-size: 16px !important;
        }
      }

      /* Ensure no horizontal overflow anywhere */
      section, main, footer, header {
        max-width: 100vw;
        overflow-x: hidden;
      }
    `}</style>
  );
}
