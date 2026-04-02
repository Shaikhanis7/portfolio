import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import {
  Mail, Phone, ExternalLink, Menu, X, Copy, Check,
  Cpu, Globe, Server, Database, Bot, Cloud, Code2, Briefcase, GraduationCap,
  ChevronRight, Sparkles, ArrowUpRight, Zap, Star, Award, GitBranch,
  BrainCircuit, Users
} from "lucide-react";
import { FaLinkedin } from "react-icons/fa";

/* ─── THEME & DATA ─────────────────────────────────────── */
const colors = {
  bg: "#050d1a",
  bgCard: "#0a1628",
  bgCardHover: "#0f1e36",
  border: "#1a2e4a",
  borderHover: "#2563eb",
  blue: "#2563eb",
  blueBright: "#3b82f6",
  blueGlow: "#1d4ed8",
  blueLight: "#60a5fa",
  blueDim: "#1e40af22",
  cyan: "#06b6d4",
  text: "#f0f6ff",
  textMuted: "#94a3b8",
  textDim: "#475569",
};

const PROJECTS = [
  {
    id: 1,
    title: "Agentic AI Job Portal",
    tag: "FEATURED",
    stack: ["React", "FastAPI", "PostgreSQL", "Docker"],
    desc: "AI-powered job recommendation with RAG pipelines for semantic resume-job matching, multi-agent architecture, and an AI Interview Bot for automated candidate screening.",
    link: "https://github.com/shaikhanis",
    Icon: Bot,
    accent: "#2563eb",
  },
  {
    id: 2,
    title: "Agentic RAG Mental Health Assistant",
    tag: "AI",
    stack: ["LangGraph", "LangChain", "React", "FastAPI"],
    desc: "AI mental health assistant using Retrieval-Augmented Generation for context-aware responses. Multi-agent workflows with memory and tool-calling for improved reasoning.",
    link: "https://github.com/shaikhanis",
    Icon: BrainCircuit,
    accent: "#06b6d4",
  },
  {
    id: 3,
    title: "Freelancer Web Application",
    tag: "FULL STACK",
    stack: ["React", "Spring Boot", "MySQL"],
    desc: "Secure full-stack platform with JWT authentication, RBAC with Spring Security, and scalable backend APIs using Spring Boot REST architecture and JPA/Hibernate.",
    link: "https://github.com/shaikhanis",
    Icon: Users,
    accent: "#0891b2",
  },
];

const SKILLS = [
  { category: "Languages", items: ["Java", "Python", "C++", "JavaScript", "TypeScript"], Icon: Code2 },
  { category: "Frontend", items: ["React", "Angular", "HTML", "CSS"], Icon: Globe },
  { category: "Backend", items: ["Spring Boot", "FastAPI"], Icon: Server },
  { category: "Databases", items: ["PostgreSQL", "MySQL", "MongoDB"], Icon: Database },
  { category: "AI / ML", items: ["LangChain", "LangGraph", "RAG", "AI Agents", "Transformers"], Icon: Bot },
  { category: "DevOps", items: ["Docker", "Kubernetes", "AWS", "GCP", "CI/CD"], Icon: Cloud },
];

const TICKER_ITEMS = [
  "Full Stack Developer", "Agentic AI Engineer", "LangChain & LangGraph",
  "RAG Pipelines", "React & Angular", "FastAPI & Spring Boot",
  "Docker & Kubernetes", "400+ DSA Problems",
];

/* ─── ANIMATION VARIANTS ─────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] } }),
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

/* ─── SECTION WRAPPER ─────────────────────────────────────── */
function Section({ id, children, style }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section id={id} ref={ref} style={style}>
      <motion.div initial="hidden" animate={inView ? "visible" : "hidden"}>
        {children}
      </motion.div>
    </section>
  );
}

/* ─── NAVBAR ─────────────────────────────────────────────── */
function Navbar({ active }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setOpen(false); };
  const links = ["home", "skills", "experience", "projects", "contact"];

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(5,13,26,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${colors.border}` : "1px solid transparent",
        transition: "all 0.4s ease",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        <motion.div whileHover={{ scale: 1.05 }} onClick={() => scrollTo("home")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg, ${colors.blue}, ${colors.cyan})`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, color: "#fff", fontFamily: "monospace" }}>SA</div>
          <span style={{ color: colors.text, fontWeight: 700, fontSize: 17, letterSpacing: "-0.3px" }}>Shaikh Anis</span>
        </motion.div>

        <div style={{ display: "flex", gap: 4, alignItems: "center" }} className="nav-desktop">
          {links.map((s) => (
            <motion.button key={s} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} onClick={() => scrollTo(s)}
              style={{ background: "none", border: "none", cursor: "pointer", padding: "8px 14px", borderRadius: 8, color: active === s ? colors.blueBright : colors.textMuted, fontWeight: active === s ? 600 : 400, fontSize: 14, transition: "color 0.2s", fontFamily: "inherit" }}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </motion.button>
          ))}
          <motion.a href="mailto:shaikhaniscoder07@gmail.com" whileHover={{ scale: 1.05, boxShadow: `0 0 20px ${colors.blue}66` }} whileTap={{ scale: 0.97 }}
            style={{ marginLeft: 8, padding: "9px 20px", borderRadius: 10, background: `linear-gradient(135deg, ${colors.blue}, ${colors.blueGlow})`, color: "#fff", fontWeight: 600, fontSize: 14, textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
            <Sparkles size={14} /> Hire Me
          </motion.a>
        </div>

        <motion.button whileTap={{ scale: 0.9 }} onClick={() => setOpen(!open)} className="nav-mobile-btn"
          style={{ background: "none", border: `1px solid ${colors.border}`, color: colors.text, borderRadius: 8, padding: 8, cursor: "pointer", display: "none" }}>
          {open ? <X size={18} /> : <Menu size={18} />}
        </motion.button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            style={{ background: colors.bgCard, borderTop: `1px solid ${colors.border}`, padding: "12px 24px" }}>
            {links.map((s) => (
              <motion.button key={s} whileTap={{ scale: 0.97 }} onClick={() => scrollTo(s)}
                style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", color: active === s ? colors.blueBright : colors.textMuted, padding: "12px 0", fontSize: 15, fontWeight: active === s ? 600 : 400, cursor: "pointer", fontFamily: "inherit" }}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ─── TICKER ─────────────────────────────────────────────── */
function Ticker() {
  return (
    <div style={{ overflow: "hidden", borderTop: `1px solid ${colors.border}`, borderBottom: `1px solid ${colors.border}`, background: `${colors.blueDim}`, padding: "14px 0" }}>
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        style={{ display: "flex", whiteSpace: "nowrap", width: "max-content" }}
      >
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 16, paddingRight: 32, color: colors.textMuted, fontSize: 13, fontWeight: 500, letterSpacing: "0.05em" }}>
            <Zap size={12} color={colors.blueBright} />
            {item.toUpperCase()}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── HERO ──────────────────────────────────────────────── */
function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, 80]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section id="home" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "-20%", left: "-10%", width: 700, height: 700, borderRadius: "50%", background: `radial-gradient(circle, ${colors.blue}18 0%, transparent 70%)` }} />
        <div style={{ position: "absolute", top: "10%", right: "-15%", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, ${colors.cyan}12 0%, transparent 70%)` }} />
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.05 }}>
          <defs><pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M 48 0 L 0 0 0 48" fill="none" stroke={colors.blueBright} strokeWidth="0.5" /></pattern></defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <motion.div style={{ y, opacity, flex: 1, display: "flex", alignItems: "center" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "120px 24px 60px", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }} className="hero-grid">
          <div>
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${colors.blue}15`, border: `1px solid ${colors.blue}40`, borderRadius: 100, padding: "6px 14px", marginBottom: 28 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e" }} />
              <span style={{ color: colors.blueBright, fontSize: 13, fontWeight: 500 }}>Available for opportunities</span>
            </motion.div>

            <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible"
              style={{ fontSize: "clamp(46px, 7vw, 76px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-2px", color: colors.text, marginBottom: 16, fontFamily: "'Syne', sans-serif" }}>
              Shaikh<br />
              <span style={{ background: `linear-gradient(135deg, ${colors.blueBright}, ${colors.cyan})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Anis</span>
            </motion.h1>

            <motion.p custom={2} variants={fadeUp} initial="hidden" animate="visible"
              style={{ fontSize: 18, color: colors.textMuted, marginBottom: 12, fontWeight: 400 }}>
              Full Stack & <span style={{ color: colors.blueBright, fontWeight: 600 }}>Agentic AI</span> Developer
            </motion.p>

            <motion.p custom={3} variants={fadeUp} initial="hidden" animate="visible"
              style={{ fontSize: 15, color: colors.textDim, lineHeight: 1.7, marginBottom: 40, maxWidth: 480 }}>
              Building scalable applications and intelligent AI systems using React, FastAPI, LangChain & RAG. Based in Coimbatore, India.
            </motion.p>

            <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible"
              style={{ display: "flex", gap: 32, marginBottom: 40 }}>
              {[["400+", "DSA Problems"], ["3+", "AI Projects"], ["8.6", "CGPA"]].map(([num, label]) => (
                <div key={label}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: colors.text, letterSpacing: "-1px" }}>
                    <span style={{ color: colors.blueBright }}>{num}</span>
                  </div>
                  <div style={{ fontSize: 12, color: colors.textDim, marginTop: 2, fontWeight: 500 }}>{label}</div>
                </div>
              ))}
            </motion.div>

            <motion.div custom={5} variants={fadeUp} initial="hidden" animate="visible" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <motion.a href="mailto:shaikhaniscoder07@gmail.com" whileHover={{ scale: 1.04, boxShadow: `0 0 30px ${colors.blue}55` }} whileTap={{ scale: 0.97 }}
                style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 28px", borderRadius: 12, background: `linear-gradient(135deg, ${colors.blue}, ${colors.blueGlow})`, color: "#fff", fontWeight: 600, fontSize: 15, textDecoration: "none" }}>
                <Mail size={16} /> Contact Me
              </motion.a>
              <motion.a href="https://github.com/shaikhanis" target="_blank" rel="noreferrer" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 28px", borderRadius: 12, background: "transparent", border: `1px solid ${colors.border}`, color: colors.text, fontWeight: 600, fontSize: 15, textDecoration: "none" }}>
                <GitBranch size={16} /> GitHub
              </motion.a>
            </motion.div>
          </div>

          <motion.div custom={3} variants={scaleIn} initial="hidden" animate="visible" style={{ display: "flex", justifyContent: "center" }}>
            <motion.div animate={{ y: [-8, 8, -8] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} style={{ position: "relative" }}>
              <div style={{ width: 300, borderRadius: 24, background: `linear-gradient(135deg, ${colors.bgCard}, #0d1f38)`, border: `1px solid ${colors.border}`, boxShadow: `0 0 80px ${colors.blue}22, 0 40px 80px rgba(0,0,0,0.5)`, padding: 32, textAlign: "center" }}>
                <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, borderRadius: "50%", border: `1px dashed ${colors.blue}44` }} />
                <div style={{ width: 80, height: 80, borderRadius: "50%", background: `linear-gradient(135deg, ${colors.blue}, ${colors.cyan})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, fontWeight: 800, color: "#fff", margin: "0 auto 20px", boxShadow: `0 0 30px ${colors.blue}55` }}>SA</div>
                <p style={{ color: colors.text, fontWeight: 700, fontSize: 18, marginBottom: 4 }}>Shaikh Anis</p>
                <p style={{ color: colors.textDim, fontSize: 13, marginBottom: 20 }}>B.E. CSE · SKCT · 2026</p>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `${colors.blue}20`, border: `1px solid ${colors.blue}40`, borderRadius: 100, padding: "6px 14px", marginBottom: 20 }}>
                  <Award size={13} color={colors.blueBright} />
                  <span style={{ color: colors.blueBright, fontSize: 12, fontWeight: 600 }}>NPTEL Topper</span>
                </div>
                {[
                  { label: "⚡ FastAPI", x: -80, y: 0 },
                  { label: "🤖 AI Agents", x: 80, y: 20 },
                  { label: "⚛️ React", x: -70, y: 130 },
                  { label: "🐳 Docker", x: 75, y: 140 },
                ].map(({ label, x, y: yPos }, i) => (
                  <motion.div key={label} animate={{ y: [0, -6, 0] }} transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
                    style={{ position: "absolute", transform: `translate(${x}px, ${yPos - 50}px)`, background: colors.bgCard, border: `1px solid ${colors.border}`, borderRadius: 100, padding: "5px 12px", fontSize: 11, color: colors.textMuted, fontWeight: 500, whiteSpace: "nowrap", boxShadow: `0 4px 20px rgba(0,0,0,0.3)` }}>
                    {label}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
      <Ticker />
    </section>
  );
}

/* ─── SKILLS ─────────────────────────────────────────────── */
function Skills() {
  return (
    <Section id="skills" style={{ padding: "100px 0", background: `linear-gradient(180deg, ${colors.bg} 0%, #071224 100%)` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <motion.div variants={fadeUp} custom={0} style={{ textAlign: "center", marginBottom: 64 }}>
          <p style={{ color: colors.blueBright, fontSize: 13, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>What I Work With</p>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800, color: colors.text, letterSpacing: "-1px" }}>
            Technical <span style={{ background: `linear-gradient(135deg, ${colors.blueBright}, ${colors.cyan})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Arsenal</span>
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {SKILLS.map((group, i) => (
            <motion.div key={group.category} custom={i} variants={fadeUp}
              whileHover={{ y: -4, borderColor: colors.blue, boxShadow: `0 0 30px ${colors.blue}20` }}
              style={{ background: colors.bgCard, border: `1px solid ${colors.border}`, borderRadius: 16, padding: 24, cursor: "default", transition: "border-color 0.3s, box-shadow 0.3s" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: `${colors.blue}20`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <group.Icon size={18} color={colors.blueBright} />
                </div>
                <span style={{ color: colors.text, fontWeight: 600, fontSize: 15 }}>{group.category}</span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {group.items.map((item) => (
                  <motion.span key={item} whileHover={{ scale: 1.06, background: `${colors.blue}30` }}
                    style={{ background: `${colors.blue}12`, border: `1px solid ${colors.blue}25`, borderRadius: 8, padding: "4px 12px", color: colors.textMuted, fontSize: 12, fontWeight: 500, transition: "background 0.2s" }}>
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeUp} custom={7} style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginTop: 48 }}>
          {[
            { icon: <Award size={14} />, label: "NPTEL Student Topper — SKCT" },
            { icon: <Star size={14} />, label: "Google Data Analytics — Coursera" },
            { icon: <Cpu size={14} />, label: "Advanced React — Coursera" },
            { icon: <Code2 size={14} />, label: "Java — NPTEL Certified" },
          ].map(({ icon, label }) => (
            <motion.div key={label} whileHover={{ scale: 1.04 }}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${colors.blue}12`, border: `1px solid ${colors.blue}30`, borderRadius: 100, padding: "8px 18px", color: colors.blueBright, fontSize: 13, fontWeight: 500 }}>
              {icon} {label}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

/* ─── EXPERIENCE ─────────────────────────────────────────── */
function Experience() {
  return (
    <Section id="experience" style={{ padding: "100px 0", background: colors.bg }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <motion.div variants={fadeUp} custom={0} style={{ marginBottom: 60 }}>
          <p style={{ color: colors.blueBright, fontSize: 13, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>Work History</p>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800, color: colors.text, letterSpacing: "-1px" }}>Experience</h2>
        </motion.div>

        <motion.div custom={1} variants={fadeUp} whileHover={{ borderColor: colors.blue, boxShadow: `0 0 40px ${colors.blue}18` }}
          style={{ background: colors.bgCard, border: `1px solid ${colors.border}`, borderRadius: 20, padding: 36, marginBottom: 32, transition: "border-color 0.3s, box-shadow 0.3s", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, width: 4, height: "100%", background: `linear-gradient(180deg, ${colors.blue}, ${colors.cyan})` }} />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16, marginBottom: 20 }}>
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: `linear-gradient(135deg, ${colors.blue}, ${colors.blueGlow})`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 16, color: "#fff" }}>GW</div>
              <div>
                <h3 style={{ color: colors.text, fontWeight: 700, fontSize: 18, marginBottom: 4 }}>Agentic AI Full Stack Developer Trainee</h3>
                <p style={{ color: colors.textMuted, fontSize: 14 }}>Genworx.ai · Chennai, India</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
              <span style={{ background: `${colors.blue}20`, border: `1px solid ${colors.blue}40`, color: colors.blueBright, borderRadius: 100, padding: "4px 14px", fontSize: 12, fontWeight: 600 }}>Internship</span>
              <span style={{ color: colors.textDim, fontSize: 13 }}>Aug 2025 – Feb 2026</span>
            </div>
          </div>

          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              "Developed 3+ full-stack applications using React, Angular, and FastAPI, improving modular architecture, reusability, and development speed.",
              "Designed and implemented Agentic AI workflows using LangChain and LangGraph enabling dynamic decision-making, tool orchestration, and adaptive execution.",
              "Built RAG pipelines integrating PostgreSQL and vector databases for semantic search, contextual retrieval, and improved recommendation relevance.",
              "Applied Docker containerization and explored Kubernetes concepts including deployments, services, and scaling strategies.",
            ].map((point, i) => (
              <motion.li key={i} custom={i + 2} variants={fadeUp} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <ChevronRight size={16} color={colors.blueBright} style={{ marginTop: 2, flexShrink: 0 }} />
                <span style={{ color: colors.textMuted, fontSize: 14, lineHeight: 1.65 }}>{point}</span>
              </motion.li>
            ))}
          </ul>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {["React", "Angular", "FastAPI", "LangChain", "LangGraph", "RAG", "Docker", "PostgreSQL"].map(t => (
              <span key={t} style={{ background: `${colors.blue}12`, border: `1px solid ${colors.blue}25`, borderRadius: 8, padding: "4px 12px", color: colors.blueBright, fontSize: 12, fontWeight: 500 }}>{t}</span>
            ))}
          </div>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
          {[
            { icon: <GraduationCap size={22} color={colors.blueBright} />, degree: "B.E. Computer Science & Engineering", school: "Sri Krishna College of Technology · 2022–2026", grade: "CGPA: 8.6" },
            { icon: <Briefcase size={22} color={colors.blueBright} />, degree: "Higher Secondary Education", school: "St. Antony's Matric Hr Sec School", grade: "Class 12: 91% · Class 10: 90%" },
          ].map(({ icon, degree, school, grade }) => (
            <motion.div key={degree} custom={6} variants={fadeUp} whileHover={{ borderColor: colors.blue }}
              style={{ background: colors.bgCard, border: `1px solid ${colors.border}`, borderRadius: 16, padding: 24, display: "flex", gap: 16, alignItems: "flex-start", transition: "border-color 0.3s" }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: `${colors.blue}20`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{icon}</div>
              <div>
                <p style={{ color: colors.text, fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{degree}</p>
                <p style={{ color: colors.textDim, fontSize: 13, marginBottom: 6 }}>{school}</p>
                <p style={{ color: colors.blueBright, fontSize: 13, fontWeight: 600 }}>{grade}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─── PROJECTS ──────────────────────────────────────────── */
function Projects() {
  return (
    <Section id="projects" style={{ padding: "100px 0", background: `linear-gradient(180deg, #071224 0%, ${colors.bg} 100%)` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <motion.div variants={fadeUp} custom={0} style={{ textAlign: "center", marginBottom: 64 }}>
          <p style={{ color: colors.blueBright, fontSize: 13, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>My Work</p>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800, color: colors.text, letterSpacing: "-1px" }}>
            Featured <span style={{ background: `linear-gradient(135deg, ${colors.blueBright}, ${colors.cyan})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Projects</span>
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
          {PROJECTS.map((proj, i) => (
            <motion.div key={proj.id} custom={i + 1} variants={fadeUp}
              whileHover={{ y: -8, boxShadow: `0 24px 60px ${proj.accent}20, 0 0 0 1px ${proj.accent}40` }}
              style={{ background: colors.bgCard, border: `1px solid ${colors.border}`, borderRadius: 20, padding: 28, position: "relative", overflow: "hidden", cursor: "default", transition: "box-shadow 0.35s, border-color 0.35s" }}>

              <div style={{ position: "absolute", top: 0, right: 0, width: 120, height: 120, borderRadius: "0 20px 0 120px", background: `${proj.accent}10` }} />

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                <motion.div whileHover={{ scale: 1.1, rotate: 5 }}
                  style={{ width: 56, height: 56, borderRadius: 14, background: `${proj.accent}20`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <proj.Icon size={28} color={proj.accent} strokeWidth={1.5} />
                </motion.div>
                <span style={{ background: `${proj.accent}20`, border: `1px solid ${proj.accent}40`, color: proj.accent, borderRadius: 100, padding: "4px 14px", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em" }}>{proj.tag}</span>
              </div>

              <h3 style={{ color: colors.text, fontWeight: 700, fontSize: 17, marginBottom: 12, lineHeight: 1.4 }}>{proj.title}</h3>
              <p style={{ color: colors.textDim, fontSize: 14, lineHeight: 1.65, marginBottom: 20 }}>{proj.desc}</p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
                {proj.stack.map((s) => (
                  <span key={s} style={{ background: `${colors.blue}12`, border: `1px solid ${colors.blue}25`, borderRadius: 8, padding: "3px 10px", color: colors.textMuted, fontSize: 11, fontWeight: 500 }}>{s}</span>
                ))}
              </div>

              <motion.a href={proj.link} target="_blank" rel="noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, color: proj.accent, fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
                <ExternalLink size={14} /> View Project
              </motion.a>

              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${proj.accent}, transparent)` }} />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─── CONTACT ───────────────────────────────────────────── */
function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText("shaikhaniscoder07@gmail.com"); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <Section id="contact" style={{ padding: "100px 0", background: colors.bg }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }} className="contact-grid">
          <div>
            <motion.p variants={fadeUp} custom={0} style={{ color: colors.blueBright, fontSize: 13, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>Get In Touch</motion.p>
            <motion.h2 variants={fadeUp} custom={1} style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800, color: colors.text, letterSpacing: "-1px", marginBottom: 20, lineHeight: 1.1 }}>
              Let's Build<br />Something <span style={{ background: `linear-gradient(135deg, ${colors.blueBright}, ${colors.cyan})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Great</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} style={{ color: colors.textDim, fontSize: 15, lineHeight: 1.7, marginBottom: 40 }}>
              Open to full-time roles, freelance projects, and AI/Full Stack collaborations. Based in Coimbatore — available remotely worldwide.
            </motion.p>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { icon: <Mail size={16} color={colors.blueBright} />, label: "shaikhaniscoder07@gmail.com", href: "mailto:shaikhaniscoder07@gmail.com" },
                { icon: <Phone size={16} color={colors.blueBright} />, label: "+91 7548899769", href: "tel:+917548899769" },
                { icon: <FaLinkedin size={16} color={colors.blueBright} />, label: "LinkedIn Profile", href: "https://linkedin.com" },
                { icon: <GitBranch size={16} color={colors.blueBright} />, label: "GitHub Profile", href: "https://github.com/shaikhanis" },
              ].map(({ icon, label, href }, i) => (
                <motion.a key={label} custom={i + 3} variants={fadeUp} href={href} target="_blank" rel="noreferrer"
                  whileHover={{ x: 6, color: colors.blueBright }}
                  style={{ display: "inline-flex", alignItems: "center", gap: 12, color: colors.textMuted, textDecoration: "none", fontSize: 14, fontWeight: 500, transition: "color 0.2s" }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: `${colors.blue}15`, border: `1px solid ${colors.blue}25`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {icon}
                  </div>
                  {label}
                  <ArrowUpRight size={13} style={{ marginLeft: "auto", opacity: 0.5 }} />
                </motion.a>
              ))}
            </div>
          </div>

          <motion.div variants={scaleIn} custom={1}>
            <div style={{ background: colors.bgCard, border: `1px solid ${colors.border}`, borderRadius: 24, padding: 36, boxShadow: `0 0 60px ${colors.blue}12` }}>
              <p style={{ color: colors.textDim, fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>Drop a message</p>

              <motion.div onClick={copy} whileHover={{ borderColor: colors.blue, boxShadow: `0 0 20px ${colors.blue}20` }} whileTap={{ scale: 0.98 }}
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: colors.bg, border: `1px solid ${colors.border}`, borderRadius: 12, padding: "14px 18px", cursor: "pointer", marginBottom: 16, transition: "border-color 0.2s, box-shadow 0.2s" }}>
                <span style={{ color: colors.textMuted, fontSize: 13 }}>shaikhaniscoder07@gmail.com</span>
                <AnimatePresence mode="wait">
                  {copied
                    ? <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Check size={16} color="#22c55e" /></motion.span>
                    : <motion.span key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Copy size={16} color={colors.blueBright} /></motion.span>
                  }
                </AnimatePresence>
              </motion.div>

              <motion.a href="mailto:shaikhaniscoder07@gmail.com" whileHover={{ scale: 1.02, boxShadow: `0 0 25px ${colors.blue}55` }} whileTap={{ scale: 0.97 }}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "14px", borderRadius: 12, background: `linear-gradient(135deg, ${colors.blue}, ${colors.blueGlow})`, color: "#fff", fontWeight: 600, fontSize: 15, textDecoration: "none", marginBottom: 20 }}>
                <Mail size={16} /> Send Email
              </motion.a>

              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ flex: 1, height: 1, background: colors.border }} />
                <span style={{ color: colors.textDim, fontSize: 12 }}>or connect on</span>
                <div style={{ flex: 1, height: 1, background: colors.border }} />
              </div>

              <div style={{ display: "flex", gap: 12 }}>
                {[
                  { label: "LinkedIn", icon: <FaLinkedin size={15} />, href: "https://linkedin.com" },
                  { label: "GitHub", icon: <GitBranch size={15} />, href: "https://github.com/shaikhanis" }
                ].map(({ label, icon, href }) => (
                  <motion.a key={label} href={href} target="_blank" rel="noreferrer" whileHover={{ scale: 1.04, borderColor: colors.blue }}
                    style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px", borderRadius: 12, border: `1px solid ${colors.border}`, color: colors.textMuted, fontWeight: 600, fontSize: 14, textDecoration: "none", transition: "border-color 0.2s" }}>
                    {icon} {label}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

/* ─── FOOTER ─────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${colors.border}`, background: colors.bg, padding: "32px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: `linear-gradient(135deg, ${colors.blue}, ${colors.cyan})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#fff" }}>SA</div>
          <span style={{ color: colors.textMuted, fontSize: 13 }}>Shaikh Anis · Coimbatore, India</span>
        </div>
        <p style={{ color: colors.textDim, fontSize: 13 }}>© 2025 All rights reserved</p>
      </div>
    </footer>
  );
}

/* ─── GLOBAL STYLES ──────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { background: #050d1a; color: #f0f6ff; font-family: 'DM Sans', sans-serif; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
    h1, h2, h3 { font-family: 'Syne', sans-serif; }
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #050d1a; }
    ::-webkit-scrollbar-thumb { background: #1e3a5f; border-radius: 3px; }
    @media (max-width: 768px) {
      .hero-grid { grid-template-columns: 1fr !important; }
      .hero-grid > div:last-child { display: none; }
      .contact-grid { grid-template-columns: 1fr !important; }
      .nav-desktop { display: none !important; }
      .nav-mobile-btn { display: flex !important; }
    }
  `}</style>
);

/* ─── APP ────────────────────────────────────────────────── */
export default function App() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = ["home", "skills", "experience", "projects", "contact"];
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.4 }
    );
    sections.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <GlobalStyles />
      <div style={{ background: colors.bg, minHeight: "100vh" }}>
        <Navbar active={active} />
        <Hero />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </>
  );
}