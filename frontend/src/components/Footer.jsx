// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";

// // Kinetic Logo Component
// const KineticLogo = ({ size = 24, className = "" }) => (
//   <svg
//     width={size}
//     height={size}
//     viewBox="0 0 100 100"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//     className={className}
//   >
//     <defs>
//       <linearGradient id="ftrWing1" x1="0%" y1="0%" x2="100%" y2="100%">
//         <stop offset="0%" stopColor="#A855F7" />
//         <stop offset="100%" stopColor="#7C3AED" />
//       </linearGradient>
//       <linearGradient id="ftrWing2" x1="100%" y1="0%" x2="0%" y2="100%">
//         <stop offset="0%" stopColor="#7C3AED" />
//         <stop offset="100%" stopColor="#4C1D95" />
//       </linearGradient>
//     </defs>

//     <g className="origin-[50px_42.5px] animate-[spin_12s_linear_infinite]">
//       <circle
//         cx="50"
//         cy="42.5"
//         r="38"
//         stroke="#A855F7"
//         strokeWidth="1.2"
//         strokeDasharray="4 4"
//         className="opacity-60"
//       />
//       <circle
//         cx="50"
//         cy="42.5"
//         r="30"
//         stroke="#C4B5FD"
//         strokeWidth="0.8"
//         strokeDasharray="2 4"
//         className="opacity-40"
//       />
//     </g>

//     <line
//       x1="50"
//       y1="2"
//       x2="50"
//       y2="83"
//       stroke="#A855F7"
//       strokeWidth="0.5"
//       strokeDasharray="2 3"
//       className="opacity-30"
//     />
//     <line
//       x1="8"
//       y1="42.5"
//       x2="92"
//       y2="42.5"
//       stroke="#A855F7"
//       strokeWidth="0.5"
//       strokeDasharray="2 3"
//       className="opacity-30"
//     />

//     <path
//       d="M34 9 L10 72.5 L50 42.5 Z"
//       fill="url(#ftrWing1)"
//       className="opacity-95"
//     />
//     <path
//       d="M66 9 L90 72.5 L50 42.5 Z"
//       fill="url(#ftrWing2)"
//       className="opacity-95"
//     />
//     <path
//       d="M50 42.5 L90 72.5 L50 62.5 L10 72.5 Z"
//       fill="#D8B4FE"
//       stroke="#D8B4FE"
//       strokeWidth="1"
//       strokeLinejoin="round"
//       className="opacity-[0.98]"
//     />
//     <circle cx="50" cy="42.5" r="3.5" fill="#FFFFFF" />
//   </svg>
// );

// // Social Icons
// const LinkedInIcon = () => (
//   <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
//     <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
//   </svg>
// );

// const InstagramIcon = () => (
//   <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
//     <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm4.846-10.354c0 .795.645 1.44 1.44 1.44s1.44-.645 1.44-1.44-.645-1.44-1.44-1.44-1.44.645-1.44 1.44z" />
//   </svg>
// );

// const ThreadsIcon = () => (
//   <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
//     <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.207-6.807-5.967 6.807H2.306l7.644-8.74L.592 2.25h6.832l4.71 6.233 5.412-6.233zM17.55 19.41h1.832L6.281 4.75H4.31l13.24 14.66z" />
//   </svg>
// );

// export function Footer() {
//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const navColumns = [
//     {
//       heading: "Services",
//       links: [
//         { label: "AI Dashboards", path: "#" },
//         { label: "LLM Solutions", path: "#" },
//         { label: "Intelligent Automation", path: "#" },
//         { label: "AI Agent", path: "#" },
//       ],
//     },
//     {
//       heading: "Company",
//       links: [
//         { label: "Home", path: "/" },
//         { label: "About Us", path: "/about" },
//         { label: "Contact", path: "/contact" },
//       ],
//     },
//     {
//       heading: "Contact",
//       links: [
//         {
//           label: "admin@meeraxuintelligence.com",
//           path: "mailto:admin@meeraxuintelligence.com",
//           external: true,
//         },
//         {
//           label: "+91 75681 85591",
//           path: "tel:+917568185591",
//           external: true,
//         },
//         { label: "Book a Call", path: "/contact#contact-form" },
//       ],
//     },
//   ];

//   const socialLinks = [
//     {
//       Icon: LinkedInIcon,
//       url: "https://www.linkedin.com/in/meeraxu-intelligence-1b669641b/",
//       label: "LinkedIn",
//     },
//     {
//       Icon: InstagramIcon,
//       url: "https://www.instagram.com/meeraxu.intelligence/",
//       label: "Instagram",
//     },
//     {
//       Icon: ThreadsIcon,
//       url: "https://x.com/meeraxu",
//       label: "X",
//     },
//   ];

//   return (
//     <footer className="relative z-[2] border-t border-[#8B5CF6]/20 bg-[#09090B] px-6 pb-10 pt-16">
//       <div className="mx-auto max-w-[1160px]">
//         {/* Main Grid */}
//         <div className="mb-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.2fr] lg:gap-12">
//           {/* Brand Column */}
//           <div>
//             <div className="mb-4 flex items-center gap-2.5">
//               <KineticLogo size={40} />
//               <span className="font-display text-lg font-extrabold tracking-wider text-white">
//                 MEERAXU
//                 <span className="text-base font-semibold tracking-widest text-[#A855F7]">
//                   \
//                 </span>
//               </span>
//             </div>
//             <p className="max-w-[260px] text-sm leading-relaxed text-slate-400">
//               Building the intelligent infrastructure for tomorrow's
//               enterprises. AI solutions for every field.
//             </p>
//             <div className="mt-6 flex gap-3.5">
//               {socialLinks.map((social, i) => (
//                 <motion.a
//                   key={i}
//                   href={social.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   title={social.label}
//                   whileHover={{ y: -3 }}
//                   className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#8B5CF6]/20 bg-[#8B5CF6]/5 text-slate-400 transition-colors duration-200 hover:border-[#8B5CF6]/50 hover:text-[#A855F7]"
//                 >
//                   <social.Icon />
//                 </motion.a>
//               ))}
//             </div>
//           </div>

//           {/* Navigation Columns */}
//           {navColumns.map((col) => (
//             <div key={col.heading}>
//               <h4 className="mb-4 font-mono text-xs font-bold uppercase tracking-wider text-[#A855F7]">
//                 {col.heading}
//               </h4>
//               <ul className="m-0 flex flex-col gap-3 p-0 list-none">
//                 {col.links.map((link) => (
//                   <li key={link.label}>
//                     {link.external ? (
//                       <a
//                         href={link.path}
//                         className="text-sm text-slate-400 no-underline transition-colors duration-200 hover:text-white"
//                       >
//                         {link.label}
//                       </a>
//                     ) : (
//                       <Link
//                         to={link.path}
//                         className="text-sm text-slate-400 no-underline transition-colors duration-200 hover:text-white"
//                       >
//                         {link.label}
//                       </Link>
//                     )}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>

//         {/* Bottom Bar */}
//         <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#8B5CF6]/15 pt-7">
//           <p className="m-0 text-xs text-slate-500">
//             © 2025 Meeraxu Intelligence. All rights reserved.
//           </p>
//           <div className="flex flex-wrap items-center gap-6">
//             <Link
//               to="/privacy-policy"
//               className="text-xs text-slate-400 no-underline transition-colors duration-200 hover:text-[#A855F7]"
//             >
//               Privacy Policy
//             </Link>
//             <Link
//               to="/terms-and-conditions"
//               className="text-xs text-slate-400 no-underline transition-colors duration-200 hover:text-[#A855F7]"
//             >
//               Terms of Service
//             </Link>
//             <motion.button
//               onClick={scrollToTop}
//               whileHover={{ y: -2 }}
//               className="flex cursor-pointer items-center gap-1 rounded-md border border-[#8B5CF6]/20 bg-transparent px-3 py-1.5 text-xs text-slate-400 transition-all duration-200 hover:border-[#8B5CF6]/50 hover:text-[#A855F7]"
//             >
//               ↑ Back to Top
//             </motion.button>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Kinetic Logo Component (Original bright brand colors restored)
const KineticLogo = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="ftrWing1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#A855F7" />
        <stop offset="100%" stopColor="#7C3AED" />
      </linearGradient>
      <linearGradient id="ftrWing2" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#7C3AED" />
        <stop offset="100%" stopColor="#4C1D95" />
      </linearGradient>
    </defs>

    <g className="origin-[50px_42.5px] animate-[spin_12s_linear_infinite]">
      <circle
        cx="50"
        cy="42.5"
        r="38"
        stroke="#A855F7"
        strokeWidth="1.2"
        strokeDasharray="4 4"
        className="opacity-60"
      />
      <circle
        cx="50"
        cy="42.5"
        r="30"
        stroke="#C4B5FD"
        strokeWidth="0.8"
        strokeDasharray="2 4"
        className="opacity-40"
      />
    </g>

    <line
      x1="50"
      y1="2"
      x2="50"
      y2="83"
      stroke="#A855F7"
      strokeWidth="0.5"
      strokeDasharray="2 3"
      className="opacity-30"
    />
    <line
      x1="8"
      y1="42.5"
      x2="92"
      y2="42.5"
      stroke="#A855F7"
      strokeWidth="0.5"
      strokeDasharray="2 3"
      className="opacity-30"
    />

    <path
      d="M34 9 L10 72.5 L50 42.5 Z"
      fill="url(#ftrWing1)"
      className="opacity-95"
    />
    <path
      d="M66 9 L90 72.5 L50 42.5 Z"
      fill="url(#ftrWing2)"
      className="opacity-95"
    />
    <path
      d="M50 42.5 L90 72.5 L50 62.5 L10 72.5 Z"
      fill="#D8B4FE"
      stroke="#D8B4FE"
      strokeWidth="1"
      strokeLinejoin="round"
      className="opacity-[0.98]"
    />
    <circle cx="50" cy="42.5" r="3.5" fill="#FFFFFF" />
  </svg>
);

// Social Icons
const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm4.846-10.354c0 .795.645 1.44 1.44 1.44s1.44-.645 1.44-1.44-.645-1.44-1.44-1.44-1.44.645-1.44 1.44z" />
  </svg>
);

const ThreadsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.207-6.807-5.967 6.807H2.306l7.644-8.74L.592 2.25h6.832l4.71 6.233 5.412-6.233zM17.55 19.41h1.832L6.281 4.75H4.31l13.24 14.66z" />
  </svg>
);

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navColumns = [
    {
      heading: "Services",
      links: [
        { label: "AI Dashboards", path: "#" },
        { label: "LLM Solutions", path: "#" },
        { label: "Intelligent Automation", path: "#" },
        { label: "AI Agent", path: "#" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "Home", path: "/" },
        { label: "About Us", path: "/about" },
        { label: "Contact", path: "/contact" },
      ],
    },
    {
      heading: "Contact",
      links: [
        {
          label: "admin@meeraxuintelligence.com",
          path: "mailto:admin@meeraxuintelligence.com",
          external: true,
        },
        {
          label: "+91 75681 85591",
          path: "tel:+917568185591",
          external: true,
        },
        { label: "Book a Call", path: "/contact#contact-form" },
      ],
    },
  ];

  const socialLinks = [
    {
      Icon: LinkedInIcon,
      url: "https://www.linkedin.com/in/meeraxu-intelligence-1b669641b/",
      label: "LinkedIn",
    },
    {
      Icon: InstagramIcon,
      url: "https://www.instagram.com/meeraxu.intelligence/",
      label: "Instagram",
    },
    {
      Icon: ThreadsIcon,
      url: "https://x.com/meeraxu",
      label: "X",
    },
  ];

  return (
    <footer className="relative z-[2] overflow-hidden border-t border-[#8B5CF6]/20 bg-[#09090B] px-6 pb-8 pt-12">
      <div className="mx-auto max-w-[1160px]">
        {/* Main Grid */}
        <div className="mb-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.2fr] lg:gap-12">
          {/* Brand Column */}
          <div>
            <div className="mb-4 flex items-center gap-2.5">
              <KineticLogo size={40} />
              <span className="font-display text-lg font-extrabold tracking-wider text-white">
                MEERAXU
                <span className="text-base font-semibold tracking-widest text-[#A855F7]">
                  \
                </span>
              </span>
            </div>
            <p className="max-w-[260px] text-sm leading-relaxed text-slate-400">
              Building the intelligent infrastructure for tomorrow's
              enterprises. AI solutions for every field.
            </p>
            <div className="mt-6 flex gap-3.5">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.label}
                  whileHover={{ y: -3 }}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#8B5CF6]/20 bg-[#8B5CF6]/5 text-slate-400 transition-colors duration-200 hover:border-[#8B5CF6]/50 hover:text-[#A855F7]"
                >
                  <social.Icon />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          {navColumns.map((col) => (
            <div key={col.heading}>
              <h4 className="mb-4 font-mono text-xs font-bold uppercase tracking-wider text-[#A855F7]">
                {col.heading}
              </h4>
              <ul className="m-0 flex flex-col gap-3 p-0 list-none">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.path}
                        className="text-sm text-slate-400 no-underline transition-colors duration-200 hover:text-white"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.path}
                        className="text-sm text-slate-400 no-underline transition-colors duration-200 hover:text-white"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Watermark Section - Reduced Logo & Text Size */}
      <div className="mx-auto my-2 flex max-w-[1160px] select-none items-center justify-start gap-3 sm:gap-4">
        {/* Kinetic Logo Sized Down */}
        <KineticLogo
          size={140}
          className="h-16 w-16 shrink-0 sm:h-20 sm:w-20 md:h-24 md:w-24 lg:h-28 lg:w-28"
        />

        {/* Text Container with Scale Reduced */}
        <div className="w-full overflow-hidden flex items-center">
          <svg viewBox="0 0 880 100" className="w-full h-auto overflow-visible">
            <defs>
              <filter
                id="verySubtleGlow"
                x="-10%"
                y="-10%"
                width="120%"
                height="120%"
              >
                <feDropShadow
                  dx="0"
                  dy="0"
                  stdDeviation="1.5"
                  floodColor="#A855F7"
                  floodOpacity="0.25"
                />
              </filter>
            </defs>

            <text
              x="5"
              y="75"
              fill="none"
              stroke="#A855F7"
              strokeWidth="1.6"
              fontSize="95"
              fontWeight="500"
              letterSpacing="5"
              filter="url(#verySubtleGlow)"
              fontFamily="ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
            >
              <tspan fontSize="115" fontWeight="600" dy="6">
                M
              </tspan>
              <tspan dy="-6">eeraxu</tspan>
            </text>
          </svg>
        </div>
      </div>

      <div className="mx-auto max-w-[1160px]">
        {/* Bottom Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#8B5CF6]/15 pt-5">
          <p className="m-0 text-xs text-slate-500">
            © 2025 Meeraxu Intelligence. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Link
              to="/privacy-policy"
              className="text-xs text-slate-400 no-underline transition-colors duration-200 hover:text-[#A855F7]"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-and-conditions"
              className="text-xs text-slate-400 no-underline transition-colors duration-200 hover:text-[#A855F7]"
            >
              Terms of Service
            </Link>
            <motion.button
              onClick={scrollToTop}
              whileHover={{ y: -2 }}
              className="flex cursor-pointer items-center gap-1 rounded-md border border-[#8B5CF6]/20 bg-transparent px-3 py-1.5 text-xs text-slate-400 transition-all duration-200 hover:border-[#8B5CF6]/50 hover:text-[#A855F7]"
            >
              ↑ Back to Top
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
