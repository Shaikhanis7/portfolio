import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import {
  Mail, Phone, ExternalLink, Menu, X, Copy, Check,
  Cpu, Globe, Server, Database, Bot, Cloud, Code2, Briefcase, GraduationCap,
  ChevronRight, Sparkles, ArrowUpRight, Zap, Star, Award, GitBranch,
  BrainCircuit, Users, Mic, MapPin, Calendar
} from "lucide-react";
import { FaLinkedin } from "react-icons/fa";

/* ─── PALETTE ─────────────────────────────────────────────── */
const c = {
  bg: "#020810",
  blue: "#2563eb",
  blueBright: "#3b82f6",
  blueGlow: "#1d4ed8",
  cyan: "#06b6d4",
  violet: "#7c3aed",
  border: "#0f1e35",
  text: "#eef4ff",
  textMuted: "#7a9cc0",
  textDim: "#334d6e",
  glass: "rgba(4,12,30,0.55)",
};

/* ─── DATA ───────────────────────────────────────────────── */
const PROJECTS = [
  {
    id: 1, title: "IntelliHire", subtitle: "Agentic AI Recruitment Platform", tag: "FEATURED",
    stack: ["React", "FastAPI", "PostgreSQL", "Celery", "Redis", "AWS", "Groq LLM", "Gemini Embeddings"],
    desc: "End-to-end agentic sourcing engine with a 6-pass pipeline that autonomously searches candidates, applies hybrid vector + LLM scoring, and delivers ranked, briefed shortlists.",
    link: "https://github.com/Shaikhanis7/IntelliHire", Icon: Bot, accent: "#2563eb",
  },
  {
    id: 2, title: "MindfulAI", subtitle: "Agentic RAG Mental Health Assistant", tag: "AI",
    stack: ["LangGraph", "LangChain", "FastAPI", "React", "ChromaDB", "Groq LLM", "IndicTrans2", "DeepFace"],
    desc: "Full-stack AI mental wellness platform with agentic RAG chat, real-time crisis detection, DeepFace emotion analysis, 12-language support, voice I/O, mood tracking.",
    link: "https://github.com/Shaikhanis7/final_sem_project", Icon: BrainCircuit, accent: "#06b6d4",
  },
  {
    id: 3, title: "Hindi STT", subtitle: "Whisper Medium Fine-tuned", tag: "ML / NLP",
    stack: ["Python", "Whisper Medium", "HuggingFace", "Seq2SeqTrainer", "Kathbath", "Transformers"],
    desc: "Fine-tuned OpenAI Whisper Medium on AI4Bharat Kathbath Hindi dataset. Achieved 47.1% WER reduction (0.41→0.22) and 69.4% CER reduction. Published on HuggingFace Hub.",
    link: "https://huggingface.co/ShaikhAnis007/whisper-medium-hindi",
    colab: "https://colab.research.google.com/drive/1fHOK2ymEmDiWI4_XShxcZKnP3OjySqLg?usp=sharing",
    Icon: Mic, accent: "#7c3aed", badge: "WER ↓47.1%",
  },
  {
    id: 4, title: "Freelancer App", subtitle: "Full Stack Web Platform", tag: "FULL STACK",
    stack: ["React", "Spring Boot", "MySQL", "JWT", "Spring Security"],
    desc: "Secure full-stack platform with JWT authentication, RBAC with Spring Security, and scalable backend APIs using Spring Boot REST architecture and JPA/Hibernate.",
    link: "https://github.com/Shaikhanis7", Icon: Users, accent: "#ec4899",
  },
];

const SKILLS = [
  { category: "Languages", items: ["Java", "Python", "C++", "JavaScript", "TypeScript"], Icon: Code2, accent: "#3b82f6" },
  { category: "Frontend", items: ["React", "Angular", "HTML", "CSS"], Icon: Globe, accent: "#06b6d4" },
  { category: "Backend", items: ["Spring Boot", "FastAPI"], Icon: Server, accent: "#7c3aed" },
  { category: "Databases", items: ["PostgreSQL", "MySQL", "MongoDB"], Icon: Database, accent: "#ec4899" },
  { category: "AI / ML", items: ["LangChain", "LangGraph", "RAG", "AI Agents", "Transformers", "Whisper", "HuggingFace", "PyTorch", "Fine-tuning"], Icon: Bot, accent: "#3b82f6" },
  { category: "DevOps", items: ["Docker", "Kubernetes", "AWS", "GCP", "CI/CD"], Icon: Cloud, accent: "#06b6d4" },
];

const TICKER_ITEMS = [
  "Full Stack Developer","Agentic AI Engineer","LangChain & LangGraph",
  "RAG Pipelines","React & Angular","FastAPI & Spring Boot",
  "Docker & Kubernetes","500+ DSA Problems","Whisper Fine-tuning","HuggingFace",
];

/* ─── ANIMATIONS ──────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(5px)" },
  visible: (i = 0) => ({ opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.75, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] } }),
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.88, filter: "blur(8px)" },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};
const slideLeft = {
  hidden: { opacity: 0, x: -40, filter: "blur(4px)" },
  visible: (i = 0) => ({ opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] } }),
};

/* ─── MAGNETIC CURSOR ─────────────────────────────────────── */
function MagneticCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  useEffect(() => {
    if (window.innerWidth < 1024) return;
    let raf;
    window.addEventListener("mousemove", e => { target.current = { x: e.clientX, y: e.clientY }; });
    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.11;
      pos.current.y += (target.current.y - pos.current.y) * 0.11;
      if (cursorRef.current) cursorRef.current.style.transform = `translate(${pos.current.x - 18}px,${pos.current.y - 18}px)`;
      if (dotRef.current) dotRef.current.style.transform = `translate(${target.current.x - 3}px,${target.current.y - 3}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const over = () => { if (cursorRef.current) { cursorRef.current.style.width = "52px"; cursorRef.current.style.height = "52px"; cursorRef.current.style.opacity = "0.5"; } };
    const out = () => { if (cursorRef.current) { cursorRef.current.style.width = "36px"; cursorRef.current.style.height = "36px"; cursorRef.current.style.opacity = "0.28"; } };
    document.querySelectorAll("a,button").forEach(el => { el.addEventListener("mouseenter", over); el.addEventListener("mouseleave", out); });
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <>
      <div ref={cursorRef} style={{ position: "fixed", width: 36, height: 36, borderRadius: "50%", border: `1.5px solid ${c.cyan}`, opacity: 0.28, pointerEvents: "none", zIndex: 9999, top: 0, left: 0, transition: "width 0.22s, height 0.22s, opacity 0.22s" }} />
      <div ref={dotRef} style={{ position: "fixed", width: 6, height: 6, borderRadius: "50%", background: c.cyan, pointerEvents: "none", zIndex: 9999, top: 0, left: 0 }} />
    </>
  );
}

/* ─── WATER WAVE WEBGL BACKGROUND ────────────────────────── */
function WaterBackground() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const compileShader = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const vs = compileShader(gl.VERTEX_SHADER, `
      attribute vec2 p; void main(){gl_Position=vec4(p,0.,1.);}
    `);
    const fs = compileShader(gl.FRAGMENT_SHADER, `
      precision highp float;
      uniform float T;
      uniform vec2 R;
      uniform vec2 M;

      float wave(vec2 uv,float fr,float sp,float am,float ph){
        return am*sin(uv.x*fr+T*sp+ph)*cos(uv.y*fr*.65+T*sp*.55+ph*1.4);
      }

      void main(){
        vec2 uv=gl_FragCoord.xy/R;
        vec2 p=uv-.5; p.x*=R.x/R.y;
        vec2 m=(M/R-.5); m.x*=R.x/R.y;

        float md=length(p-m);
        float mw=.022*exp(-md*3.2)*sin(md*20.-T*5.);

        float w=wave(uv,5.,0.5,0.03,0.)
               +wave(uv,8.5,0.35,0.02,2.)
               +wave(uv,13.,0.65,0.013,4.5)
               +wave(uv,3.2,0.22,0.038,1.8)
               +wave(uv,20.,1.0,0.008,3.2)
               +wave(uv,28.,1.6,0.004,5.1)
               +mw;

        // Deep ocean colors
        vec3 deep =vec3(0.005,0.018,0.06);
        vec3 mid  =vec3(0.012,0.06, 0.2);
        vec3 surf =vec3(0.025,0.15, 0.42);
        vec3 crest=vec3(0.08, 0.42, 0.82);
        vec3 foam =vec3(0.22, 0.68, 1.0);

        float t=smoothstep(-.09,.09,w);
        vec3 col=mix(deep,mid,smoothstep(.0,.32,t));
        col=mix(col,surf,smoothstep(.28,.6,t));
        col=mix(col,crest,smoothstep(.56,.78,t));
        col=mix(col,foam,smoothstep(.75,.97,t));

        // Caustic sparkle
        float caus=pow(abs(sin(w*32.+T*2.2)),8.)*.055;
        col+=caus*vec3(.15,.55,1.);

        // Subtle ripple lines
        float rip=sin(w*60.+T*1.5)*.012+.012;
        col+=rip*vec3(.1,.4,.9);

        // Vignette depth
        float vig=1.-smoothstep(.28,1.0,length(p*vec2(.85,1.15)));
        col*=.5+.5*vig;

        // Dark overlay — keep portfolio readable
        col*=.32;
        col+=vec3(0.,.003,.015);

        gl_FragColor=vec4(col,1.);
      }
    `);

    const prog = gl.createProgram();
    gl.attachShader(prog, vs); gl.attachShader(prog, fs);
    gl.linkProgram(prog); gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW);
    const ap = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(ap);
    gl.vertexAttribPointer(ap, 2, gl.FLOAT, false, 0, 0);

    const uT = gl.getUniformLocation(prog, "T");
    const uR = gl.getUniformLocation(prog, "R");
    const uM = gl.getUniformLocation(prog, "M");

    let mouse = { x: 0, y: 0 };
    const mm = e => { mouse = { x: e.clientX, y: canvas.height - e.clientY }; };
    window.addEventListener("mousemove", mm);
    window.addEventListener("touchmove", e => {
      const t = e.touches[0];
      mouse = { x: t.clientX, y: canvas.height - t.clientY };
    }, { passive: true });

    let time = 0, raf;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      time += 0.013;
      gl.uniform1f(uT, time);
      gl.uniform2f(uR, canvas.width, canvas.height);
      gl.uniform2f(uM, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", mm);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }} />;
}

/* ─── SECTION WRAPPER ─────────────────────────────────────── */
function Section({ id, children, style }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <section id={id} ref={ref} style={{ position: "relative", zIndex: 1, ...style }}>
      <motion.div initial="hidden" animate={inView ? "visible" : "hidden"}>{children}</motion.div>
    </section>
  );
}

/* ─── GLOW DIVIDER ────────────────────────────────────────── */
function GlowDivider() {
  return (
    <div style={{ position: "relative", height: 1, zIndex: 1, maxWidth: 1160, margin: "0 auto", padding: "0 20px" }}>
      <div style={{ height: 1, background: `linear-gradient(90deg,transparent,${c.blue}80,${c.cyan}80,${c.violet}60,transparent)` }} />
      <div style={{ position: "absolute", left: "20%", right: "20%", height: 16, top: -8, background: `radial-gradient(ellipse,${c.blue}38,transparent 70%)`, filter: "blur(8px)" }} />
    </div>
  );
}

/* ─── NAVBAR ──────────────────────────────────────────────── */
function Navbar({ active }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 28);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const goto = id => {
    setOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 66, behavior: "smooth" });
    }, 260);
  };
  const links = ["home","skills","experience","projects","contact"];

  return (
    <motion.nav initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: scrolled ? "rgba(2,8,16,0.88)" : "transparent", backdropFilter: scrolled ? "blur(28px) saturate(160%)" : "none", borderBottom: scrolled ? "1px solid rgba(59,130,246,0.1)" : "none", transition: "all 0.4s ease" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 66 }}>
        <motion.div whileHover={{ scale: 1.03 }} onClick={() => goto("home")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ position: "relative" }}>
            <div style={{ width: 38, height: 38, borderRadius: 11, background: `linear-gradient(135deg,${c.blue},${c.cyan})`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 13, color: "#fff", fontFamily: "monospace", boxShadow: `0 0 20px ${c.blue}55` }}>SA</div>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
              style={{ position: "absolute", inset: -4, borderRadius: "50%", border: `1px dashed ${c.blue}45`, pointerEvents: "none" }} />
          </div>
          <div>
            <div style={{ color: c.text, fontWeight: 800, fontSize: 15, fontFamily: "'Syne',sans-serif", lineHeight: 1.1 }}>Shaikh Anis</div>
            <div style={{ color: c.textDim, fontSize: 10, letterSpacing: "0.07em", fontWeight: 500, textTransform: "uppercase" }}>Full Stack · AI</div>
          </div>
        </motion.div>

        <div className="nav-desktop" style={{ display: "flex", gap: 2, alignItems: "center" }}>
          {links.map(s => (
            <motion.button key={s} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} onClick={() => goto(s)}
              style={{ background: active===s?`${c.blue}18`:"none", border: active===s?`1px solid ${c.blue}40`:"1px solid transparent", cursor: "pointer", padding: "6px 14px", borderRadius: 8, color: active===s?c.blueBright:c.textMuted, fontWeight: active===s?700:400, fontSize: 13, transition: "all 0.2s", fontFamily: "inherit" }}>
              {s.charAt(0).toUpperCase()+s.slice(1)}
            </motion.button>
          ))}
          <motion.a href="mailto:shaikhaniscoder07@gmail.com" whileHover={{ scale: 1.05, boxShadow: `0 0 26px ${c.blue}70` }} whileTap={{ scale: 0.97 }}
            style={{ marginLeft: 10, padding: "8px 20px", borderRadius: 10, background: `linear-gradient(135deg,${c.blue},${c.blueGlow})`, color: "#fff", fontWeight: 700, fontSize: 13, textDecoration: "none", display: "flex", alignItems: "center", gap: 6, boxShadow: `0 0 14px ${c.blue}35` }}>
            <Sparkles size={12} /> Hire Me
          </motion.a>
        </div>

        <motion.button whileTap={{ scale: 0.9 }} onClick={() => setOpen(!open)}
          className="nav-mobile-btn"
          style={{ background: "none", border: `1px solid ${c.border}`, color: c.text, borderRadius: 8, padding: "7px 9px", cursor: "pointer", display: "none", alignItems: "center" }}>
          <AnimatePresence mode="wait">
            {open
              ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}><X size={17} /></motion.span>
              : <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}><Menu size={17} /></motion.span>}
          </AnimatePresence>
        </motion.button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ background: "rgba(2,8,16,0.97)", backdropFilter: "blur(24px)", borderTop: `1px solid ${c.border}`, overflow: "hidden" }}>
            <div style={{ padding: "10px 20px 20px" }}>
              {links.map((s, i) => (
                <motion.button key={s} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                  onClick={() => goto(s)}
                  style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", background: active===s?`${c.blue}14`:"none", border: "none", borderBottom: `1px solid ${c.border}`, color: active===s?c.blueBright:c.textMuted, padding: "14px 10px", fontSize: 15, fontWeight: active===s?700:400, cursor: "pointer", fontFamily: "inherit" }}>
                  {active===s && <span style={{ width: 5, height: 5, borderRadius: "50%", background: c.blueBright, display: "block", flexShrink: 0 }} />}
                  <span>{s.charAt(0).toUpperCase()+s.slice(1)}</span>
                  <ChevronRight size={13} style={{ marginLeft: "auto", opacity: 0.4 }} />
                </motion.button>
              ))}
              <motion.a href="mailto:shaikhaniscoder07@gmail.com" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7, marginTop: 16, padding: 14, borderRadius: 12, background: `linear-gradient(135deg,${c.blue},${c.blueGlow})`, color: "#fff", fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
                <Sparkles size={13} /> Hire Me
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ─── TICKER ──────────────────────────────────────────────── */
function Ticker() {
  return (
    <div style={{ overflow: "hidden", borderTop: "1px solid rgba(59,130,246,0.1)", borderBottom: "1px solid rgba(59,130,246,0.1)", background: "rgba(37,99,235,0.03)", padding: "10px 0", position: "relative" }}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 56, background: `linear-gradient(90deg,${c.bg},transparent)`, zIndex: 1, pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 56, background: `linear-gradient(270deg,${c.bg},transparent)`, zIndex: 1, pointerEvents: "none" }} />
      <motion.div animate={{ x: ["0%","-50%"] }} transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
        style={{ display: "flex", whiteSpace: "nowrap", width: "max-content" }}>
        {[...TICKER_ITEMS,...TICKER_ITEMS].map((item,i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 9, paddingRight: 30, color: c.textMuted, fontSize: 10, fontWeight: 600, letterSpacing: "0.1em" }}>
            <motion.span animate={{ opacity: [0.3,1,0.3] }} transition={{ duration: 2.5, repeat: Infinity, delay: i*0.07 }}>
              <Zap size={8} color={i%2===0?c.blueBright:c.cyan} />
            </motion.span>
            {item.toUpperCase()}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── HERO ────────────────────────────────────────────────── */
function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0,500], [0,80]);
  const opacity = useTransform(scrollY, [0,420], [1,0]);
  const [typed, setTyped] = useState("");
  const roles = ["Full Stack Developer","Agentic AI Engineer","LangChain Expert","RAG Architect"];
  const ri = useRef(0), ci = useRef(0), del = useRef(false);
  useEffect(() => {
    const iv = setInterval(() => {
      const cur = roles[ri.current];
      if (!del.current) {
        if (ci.current < cur.length) setTyped(cur.slice(0, ++ci.current));
        else setTimeout(() => { del.current = true; }, 1600);
      } else {
        if (ci.current > 0) setTyped(cur.slice(0, --ci.current));
        else { del.current = false; ri.current = (ri.current+1)%roles.length; }
      }
    }, 52);
    return () => clearInterval(iv);
  }, []);

  const socials = [
    { href: "https://www.linkedin.com/in/shaikh-anis-s/", label: "LinkedIn", icon: <FaLinkedin size={13}/>, color: "#0a66c2", bg: "rgba(10,102,194,0.13)", border: "rgba(10,102,194,0.32)" },
    { href: "https://leetcode.com/u/Shaikh_the_coder/", label: "LeetCode", icon: <Code2 size={13}/>, color: "#ffa116", bg: "rgba(255,161,22,0.1)", border: "rgba(255,161,22,0.3)" },
    { href: "https://www.geeksforgeeks.org/profile/shaikhanibqym?tab=activity", label: "GFG", icon: <Cpu size={13}/>, color: "#2f8d46", bg: "rgba(47,141,70,0.1)", border: "rgba(47,141,70,0.3)" },
    { href: "https://huggingface.co/ShaikhAnis007", label: "HuggingFace", icon: <Mic size={13}/>, color: c.cyan, bg: "rgba(6,182,212,0.1)", border: "rgba(6,182,212,0.3)" },
  ];

  return (
    <section id="home" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse 80% 60% at 18% 38%, rgba(37,99,235,0.11) 0%, transparent 60%), radial-gradient(ellipse 55% 45% at 82% 18%, rgba(6,182,212,0.07) 0%, transparent 60%)" }} />
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.016, pointerEvents: "none" }}>
        <defs><pattern id="gr" width="52" height="52" patternUnits="userSpaceOnUse"><path d="M 52 0 L 0 0 0 52" fill="none" stroke={c.blueBright} strokeWidth="0.45"/></pattern></defs>
        <rect width="100%" height="100%" fill="url(#gr)" />
      </svg>

      <motion.div style={{ y, opacity, flex: 1, display: "flex", alignItems: "center", position: "relative", zIndex: 1 }}>
        <div className="hero-grid" style={{
          maxWidth: 1160, margin: "0 auto", width: "100%",
          padding: "clamp(88px,12vw,118px) 20px clamp(24px,4vw,40px)",
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "clamp(20px,4vw,48px)", alignItems: "center",
        }}>
          {/* ── LEFT ── */}
          <div style={{ minWidth: 0 }}>
            {/* Mobile available */}
            <motion.div className="avail-mobile" custom={0} variants={fadeUp} initial="hidden" animate="visible"
              style={{ display: "none", alignItems: "center", gap: 7, background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.25)", borderRadius: 100, padding: "5px 13px", marginBottom: 12, width: "fit-content" }}>
              <motion.span animate={{ opacity:[1,.2,1], scale:[1,1.3,1] }} transition={{ duration: 2, repeat: Infinity }}
                style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 10px #22c55e", display: "block" }} />
              <span style={{ color: "#22c55e", fontSize: 11, fontWeight: 600 }}>Available for opportunities</span>
            </motion.div>

            <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible"
              style={{ display: "inline-flex", alignItems: "center", gap: 7, background: `${c.blue}13`, border: `1px solid ${c.blue}30`, borderRadius: 100, padding: "5px 14px", marginBottom: 12 }}>
              <motion.span animate={{ rotate: 360 }} transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}><Cpu size={11} color={c.cyan}/></motion.span>
              <span style={{ color: c.textMuted, fontSize: 11, fontWeight: 500 }}>Full Stack & Agentic AI Developer</span>
            </motion.div>

            <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible"
              style={{ fontSize: "clamp(34px,5.8vw,70px)", fontWeight: 900, lineHeight: 0.94, letterSpacing: "-2px", color: c.text, marginBottom: 10, fontFamily: "'Syne',sans-serif" }}>
              Shaikh<br/>
              <span style={{ background: `linear-gradient(135deg,${c.blueBright} 0%,${c.cyan} 45%,${c.violet} 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Anis.</span>
            </motion.h1>

            <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible"
              style={{ fontSize: "clamp(12px,1.5vw,15px)", fontWeight: 700, color: c.cyan, marginBottom: 10, minHeight: 20, fontFamily: "'Syne',sans-serif", display: "flex", alignItems: "center", gap: 3 }}>
              {typed}
              <motion.span animate={{ opacity: [1,0,1] }} transition={{ duration: 0.85, repeat: Infinity }}
                style={{ display: "inline-block", width: 2, height: "1em", background: c.cyan, borderRadius: 1 }} />
            </motion.div>

            <motion.p custom={3} variants={fadeUp} initial="hidden" animate="visible"
              style={{ fontSize: "clamp(11px,1.3vw,13px)", color: c.textDim, lineHeight: 1.78, marginBottom: 10, maxWidth: 420 }}>
              Building scalable applications and intelligent AI systems using React, FastAPI, LangChain & RAG pipelines.
            </motion.p>

            <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible"
              style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 14, flexWrap: "wrap" }}>
              <MapPin size={11} color={c.textDim}/><span style={{ color: c.textDim, fontSize: 11 }}>Coimbatore, India</span>
              <span style={{ color: c.textDim, opacity: 0.4 }}>·</span>
              <Calendar size={11} color={c.textDim}/><span style={{ color: c.textDim, fontSize: 11 }}>B.E. CSE · 2026</span>
            </motion.div>

            {/* ── SOCIALS ROW ── */}
            <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible"
              style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
              <span style={{ color: c.textDim, fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>Find me</span>
              {socials.map(({ href, label, icon, color, bg, border }) => (
                <motion.a key={label} href={href} target="_blank" rel="noreferrer"
                  whileHover={{ scale: 1.08, y: -2, boxShadow: `0 5px 14px ${color}28` }} whileTap={{ scale: 0.93 }}
                  style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "6px 11px", borderRadius: 8, background: bg, border: `1px solid ${border}`, color, fontWeight: 600, fontSize: 11, textDecoration: "none", backdropFilter: "blur(8px)", whiteSpace: "nowrap" }}>
                  {icon}<span className="soc-label">{label}</span>
                </motion.a>
              ))}
            </motion.div>

            {/* ── STATS ── */}
            <motion.div custom={5} variants={fadeUp} initial="hidden" animate="visible"
              style={{ display: "flex", gap: "clamp(12px,3vw,32px)", marginBottom: 18, flexWrap: "wrap" }}>
              {[["500+","DSA Problems",c.blueBright],["4+","Projects",c.cyan],["8.6","CGPA",c.violet]].map(([num,label,col]) => (
                <motion.div key={label} whileHover={{ y: -3 }}>
                  <div style={{ fontSize: "clamp(20px,3vw,30px)", fontWeight: 900, letterSpacing: "-0.8px", color: col, textShadow: `0 0 18px ${col}55`, fontFamily: "'Syne',sans-serif" }}>{num}</div>
                  <div style={{ fontSize: 9, color: c.textDim, marginTop: 1, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>{label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* ── CTAs ── */}
            <motion.div custom={6} variants={fadeUp} initial="hidden" animate="visible"
              style={{ display: "flex", gap: 9, flexWrap: "wrap" }}>
              <motion.a href="mailto:shaikhaniscoder07@gmail.com"
                whileHover={{ scale: 1.04, boxShadow: `0 0 34px ${c.blue}75` }} whileTap={{ scale: 0.97 }}
                style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "11px 24px", borderRadius: 11, background: `linear-gradient(135deg,${c.blue},${c.blueGlow})`, color: "#fff", fontWeight: 700, fontSize: "clamp(11px,1.3vw,13px)", textDecoration: "none", boxShadow: `0 0 18px ${c.blue}45` }}>
                <Mail size={13}/> Contact Me
              </motion.a>
              <motion.a href="https://github.com/Shaikhanis7" target="_blank" rel="noreferrer"
                whileHover={{ scale: 1.04, borderColor: `${c.blue}70` }} whileTap={{ scale: 0.97 }}
                style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "11px 24px", borderRadius: 11, background: "transparent", border: `1px solid ${c.border}`, color: c.text, fontWeight: 700, fontSize: "clamp(11px,1.3vw,13px)", textDecoration: "none", backdropFilter: "blur(10px)" }}>
                <GitBranch size={13}/> GitHub
              </motion.a>
            </motion.div>
          </div>

          {/* ── RIGHT: profile card ── */}
          <motion.div className="hero-card" custom={3} variants={scaleIn} initial="hidden" animate="visible"
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <motion.div animate={{ y: [-8,8,-8] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              style={{ position: "relative", padding: "24px 100px 24px" }}>

              {[290,240,196].map((sz,i) => (
                <motion.div key={sz}
                  animate={{ rotate: i%2===0?360:-360 }}
                  transition={{ duration: [26,18,13][i], repeat: Infinity, ease: "linear" }}
                  style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: sz, height: sz, borderRadius: "50%", border: `1px ${i===1?"solid":"dashed"} rgba(${i===0?"59,130,246":i===1?"6,182,212":"124,58,237"},0.2)`, pointerEvents: "none" }} />
              ))}

              <div style={{ width: "clamp(188px,21vw,248px)", borderRadius: 22, background: c.glass, backdropFilter: "blur(22px)", border: "1px solid rgba(59,130,246,0.2)", boxShadow: `0 0 90px ${c.blue}1e, 0 36px 56px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.055)`, padding: "clamp(18px,2.5vw,28px)", textAlign: "center", position: "relative" }}>
                {/* shimmer */}
                <div style={{ position: "absolute", inset: 0, borderRadius: 22, overflow: "hidden", pointerEvents: "none" }}>
                  <motion.div animate={{ x: ["-100%","220%"] }} transition={{ duration: 4, repeat: Infinity, repeatDelay: 3.5 }}
                    style={{ position: "absolute", top: 0, left: 0, width: "45%", height: "100%", background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.044),transparent)" }} />
                </div>
                {/* avatar */}
                <div style={{ position: "relative", width: 68, height: 68, margin: "0 auto 12px" }}>
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
                    style={{ position: "absolute", inset: -4, borderRadius: "50%", background: `conic-gradient(${c.blue},${c.cyan},${c.violet},${c.blue})`, opacity: 0.75 }} />
                  <div style={{ position: "relative", width: 68, height: 68, borderRadius: "50%", background: `linear-gradient(135deg,${c.blue},${c.cyan})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 900, color: "#fff", fontFamily: "monospace", zIndex: 1, boxShadow: `0 0 34px ${c.blue}65` }}>SA</div>
                </div>
                <p style={{ color: c.text, fontWeight: 800, fontSize: 16, marginBottom: 2, fontFamily: "'Syne',sans-serif" }}>Shaikh Anis</p>
                <p style={{ color: c.textDim, fontSize: 11, marginBottom: 3 }}>B.E. CSE · SKCT · 2026</p>
                <p style={{ color: c.textDim, fontSize: 10, marginBottom: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 3 }}>
                  <MapPin size={9}/> Coimbatore, India
                </p>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 5, background: `${c.blue}22`, border: `1px solid ${c.blue}45`, borderRadius: 100, padding: "5px 13px" }}>
                  <Award size={11} color={c.blueBright}/>
                  <span style={{ color: c.blueBright, fontSize: 10, fontWeight: 700 }}>NPTEL Topper</span>
                </div>

                {/* floating tags — outside card overflow */}
                {[
                  { label:"⚡ FastAPI",  s:{ left:-96,  top:"16%"    } },
                  { label:"🤖 Agents",   s:{ right:-100, top:"36%"   } },
                  { label:"⚛️ React",    s:{ left:-86,  bottom:"26%" } },
                  { label:"🎙️ Whisper",  s:{ right:-94, bottom:"12%" } },
                ].map(({ label, s }, i) => (
                  <motion.div key={label}
                    animate={{ y:[0,-7,0] }}
                    transition={{ duration: 3.3+i*.6, repeat: Infinity, delay: i*.5 }}
                    style={{ position: "absolute", ...s, background: "rgba(2,8,20,0.9)", backdropFilter: "blur(14px)", border: "1px solid rgba(59,130,246,0.3)", borderRadius: 100, padding: "5px 11px", fontSize: 9, color: c.textMuted, fontWeight: 600, whiteSpace: "nowrap", boxShadow: `0 5px 16px rgba(0,0,0,0.5), 0 0 12px ${c.blue}22`, zIndex: 10 }}>
                    {label}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:1.1, duration:0.6 }}
              style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(34,197,94,0.07)", border: "1px solid rgba(34,197,94,0.24)", borderRadius: 100, padding: "7px 15px" }}>
              <motion.span animate={{ opacity:[1,.2,1], scale:[1,1.3,1] }} transition={{ duration:2, repeat:Infinity }}
                style={{ width:7, height:7, borderRadius:"50%", background:"#22c55e", boxShadow:"0 0 10px #22c55e", display:"block", flexShrink:0 }} />
              <span style={{ color:"#22c55e", fontSize:11, fontWeight:700 }}>Available for opportunities</span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
      <Ticker />
    </section>
  );
}

/* ─── SKILLS ──────────────────────────────────────────────── */
function Skills() {
  return (
    <Section id="skills" style={{ padding: "clamp(68px,9vw,108px) 0" }}>
      <GlowDivider />
      <div style={{ maxWidth:1160, margin:"0 auto", padding:"clamp(40px,6vw,76px) 20px 0" }}>
        <motion.div variants={fadeUp} custom={0} style={{ textAlign:"center", marginBottom:"clamp(36px,5vw,62px)" }}>
          <p style={{ color:c.cyan, fontSize:10, fontWeight:700, letterSpacing:"0.26em", textTransform:"uppercase", marginBottom:11 }}>What I Work With</p>
          <h2 style={{ fontSize:"clamp(26px,4.8vw,54px)", fontWeight:900, color:c.text, letterSpacing:"-1.5px", fontFamily:"'Syne',sans-serif" }}>
            Technical <span style={{ background:`linear-gradient(135deg,${c.blueBright},${c.cyan})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Arsenal</span>
          </h2>
        </motion.div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,240px),1fr))", gap:"clamp(11px,1.6vw,17px)" }}>
          {SKILLS.map((g,i) => (
            <motion.div key={g.category} custom={i} variants={fadeUp}
              whileHover={{ y:-7, borderColor:`${g.accent}62`, boxShadow:`0 0 32px ${g.accent}14` }}
              style={{ background:c.glass, backdropFilter:"blur(14px)", border:"1px solid rgba(59,130,246,0.11)", borderRadius:17, padding:"clamp(14px,2.2vw,22px)", transition:"all 0.3s ease", position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:-22, right:-22, width:72, height:72, borderRadius:"50%", background:`${g.accent}06`, pointerEvents:"none" }} />
              <div style={{ display:"flex", alignItems:"center", gap:11, marginBottom:13 }}>
                <div style={{ width:38, height:38, borderRadius:10, background:`linear-gradient(135deg,${g.accent}26,${g.accent}12)`, border:`1px solid ${g.accent}26`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <g.Icon size={18} color={g.accent}/>
                </div>
                <span style={{ color:c.text, fontWeight:700, fontSize:13, fontFamily:"'Syne',sans-serif" }}>{g.category}</span>
              </div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                {g.items.map(item => (
                  <motion.span key={item} whileHover={{ scale:1.08, background:`${g.accent}24` }}
                    style={{ background:`${g.accent}0f`, border:`1px solid ${g.accent}1e`, borderRadius:6, padding:"4px 9px", color:c.textMuted, fontSize:11, fontWeight:500, transition:"background 0.2s" }}>
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div variants={fadeUp} custom={7} style={{ display:"flex", flexWrap:"wrap", gap:8, justifyContent:"center", marginTop:"clamp(26px,4vw,46px)" }}>
          {[
            { icon:<Award size={11}/>, label:"NPTEL Student Topper — SKCT", col:c.blueBright },
            { icon:<Star size={11}/>, label:"Google Data Analytics — Coursera", col:c.cyan },
            { icon:<Cpu size={11}/>, label:"Advanced React — Coursera", col:c.violet },
            { icon:<Code2 size={11}/>, label:"Java — NPTEL Certified", col:c.blueBright },
            { icon:<Mic size={11}/>, label:"Hindi STT — HuggingFace Published", col:c.cyan },
          ].map(({ icon,label,col }) => (
            <motion.div key={label} whileHover={{ scale:1.05, borderColor:col, boxShadow:`0 0 13px ${col}26` }}
              style={{ display:"inline-flex", alignItems:"center", gap:7, background:c.glass, backdropFilter:"blur(10px)", border:`1px solid ${c.border}`, borderRadius:100, padding:"7px 14px", color:col, fontSize:11, fontWeight:600, transition:"all 0.22s" }}>
              {icon} {label}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

/* ─── EXPERIENCE ──────────────────────────────────────────── */
function Experience() {
  return (
    <Section id="experience" style={{ padding:"clamp(68px,9vw,108px) 0" }}>
      <GlowDivider />
      <div style={{ maxWidth:1160, margin:"0 auto", padding:"clamp(40px,6vw,76px) 20px 0" }}>
        <motion.div variants={fadeUp} custom={0} style={{ marginBottom:"clamp(32px,5vw,56px)" }}>
          <p style={{ color:c.cyan, fontSize:10, fontWeight:700, letterSpacing:"0.26em", textTransform:"uppercase", marginBottom:11 }}>Work History</p>
          <h2 style={{ fontSize:"clamp(26px,4.8vw,54px)", fontWeight:900, color:c.text, letterSpacing:"-1.5px", fontFamily:"'Syne',sans-serif" }}>Experience</h2>
        </motion.div>

        <motion.div custom={1} variants={fadeUp}
          whileHover={{ borderColor:`${c.blue}45`, boxShadow:`0 0 45px ${c.blue}10, 0 28px 55px rgba(0,0,0,0.2)` }}
          style={{ background:c.glass, backdropFilter:"blur(18px)", border:"1px solid rgba(59,130,246,0.13)", borderRadius:21, padding:"clamp(18px,3.2vw,38px)", marginBottom:18, position:"relative", overflow:"hidden", transition:"all 0.4s ease" }}>
          <div style={{ position:"absolute", top:0, left:0, width:3, height:"100%", background:`linear-gradient(180deg,${c.blue},${c.cyan},${c.violet})`, borderRadius:"3px 0 0 3px" }} />
          <motion.div animate={{ x:["-100%","220%"] }} transition={{ duration:5, repeat:Infinity, repeatDelay:4 }}
            style={{ position:"absolute", top:0, left:0, width:"34%", height:"100%", background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.025),transparent)", pointerEvents:"none" }} />

          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:13, marginBottom:22 }}>
            <div style={{ display:"flex", gap:"clamp(10px,1.8vw,15px)", alignItems:"center" }}>
              <motion.div whileHover={{ scale:1.08, rotate:4 }}
                style={{ width:50, height:50, borderRadius:14, background:`linear-gradient(135deg,${c.blue},${c.blueGlow})`, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:15, color:"#fff", flexShrink:0, boxShadow:`0 0 25px ${c.blue}45`, fontFamily:"monospace" }}>GW</motion.div>
              <div>
                <h3 style={{ color:c.text, fontWeight:800, fontSize:"clamp(13px,2vw,17px)", marginBottom:3, lineHeight:1.3, fontFamily:"'Syne',sans-serif" }}>Agentic AI Full Stack Developer Trainee</h3>
                <p style={{ color:c.textMuted, fontSize:12 }}>Genworx.ai · Chennai, India</p>
              </div>
            </div>
            <div style={{ display:"flex", gap:8, alignItems:"center", flexWrap:"wrap" }}>
              <span style={{ background:`${c.blue}22`, border:`1px solid ${c.blue}40`, color:c.blueBright, borderRadius:100, padding:"4px 13px", fontSize:11, fontWeight:700 }}>Internship</span>
              <span style={{ color:c.textDim, fontSize:11, display:"flex", alignItems:"center", gap:3 }}><Calendar size={10}/> Aug 2025 – Feb 2026</span>
            </div>
          </div>

          <ul style={{ listStyle:"none", padding:0, margin:"0 0 22px", display:"flex", flexDirection:"column", gap:10 }}>
            {[
              "Developed 3+ full-stack applications using React, Angular, and FastAPI, improving modular architecture, reusability, and development speed.",
              "Designed and implemented Agentic AI workflows using LangChain and LangGraph enabling dynamic decision-making, tool orchestration, and adaptive execution.",
              "Built RAG pipelines integrating PostgreSQL and vector databases for semantic search, contextual retrieval, and improved recommendation relevance.",
              "Applied Docker containerization and explored Kubernetes concepts including deployments, services, and scaling strategies.",
            ].map((pt,i) => (
              <motion.li key={i} custom={i+2} variants={slideLeft} style={{ display:"flex", gap:11, alignItems:"flex-start" }}>
                <div style={{ width:19, height:19, borderRadius:"50%", background:`${c.blue}18`, border:`1px solid ${c.blue}36`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:2 }}>
                  <ChevronRight size={10} color={c.blueBright}/>
                </div>
                <span style={{ color:c.textMuted, fontSize:"clamp(11px,1.5vw,13px)", lineHeight:1.75 }}>{pt}</span>
              </motion.li>
            ))}
          </ul>
          <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
            {["React","Angular","FastAPI","LangChain","LangGraph","RAG","Docker","PostgreSQL"].map(t => (
              <motion.span key={t} whileHover={{ scale:1.07 }}
                style={{ background:`${c.blue}11`, border:`1px solid ${c.blue}24`, borderRadius:7, padding:"4px 10px", color:c.blueBright, fontSize:11, fontWeight:600 }}>{t}</motion.span>
            ))}
          </div>
        </motion.div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,260px),1fr))", gap:14 }}>
          {[
            { icon:<GraduationCap size={19} color={c.cyan}/>, degree:"B.E. Computer Science & Engineering", school:"Sri Krishna College of Technology · 2022–2026", grade:"CGPA: 8.6", col:c.cyan },
            { icon:<Briefcase size={19} color={c.violet}/>, degree:"Higher Secondary Education", school:"St. Antony's Matric Hr Sec School", grade:"Class 12: 91% · Class 10: 90%", col:c.violet },
          ].map(({ icon,degree,school,grade,col }) => (
            <motion.div key={degree} custom={6} variants={fadeUp}
              whileHover={{ borderColor:col, boxShadow:`0 0 24px ${col}15`, y:-5 }}
              style={{ background:c.glass, backdropFilter:"blur(14px)", border:"1px solid rgba(59,130,246,0.11)", borderRadius:16, padding:"clamp(14px,2.2vw,22px)", display:"flex", gap:13, alignItems:"flex-start", transition:"all 0.3s ease" }}>
              <div style={{ width:43, height:43, borderRadius:12, background:`${col}15`, border:`1px solid ${col}26`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{icon}</div>
              <div style={{ minWidth:0 }}>
                <p style={{ color:c.text, fontWeight:700, fontSize:13, marginBottom:3, fontFamily:"'Syne',sans-serif" }}>{degree}</p>
                <p style={{ color:c.textDim, fontSize:11, marginBottom:4 }}>{school}</p>
                <p style={{ color:col, fontSize:11, fontWeight:700 }}>{grade}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─── PROJECTS ────────────────────────────────────────────── */
function Projects() {
  return (
    <Section id="projects" style={{ padding:"clamp(68px,9vw,108px) 0" }}>
      <GlowDivider />
      <div style={{ maxWidth:1160, margin:"0 auto", padding:"clamp(40px,6vw,76px) 20px 0" }}>
        <motion.div variants={fadeUp} custom={0} style={{ textAlign:"center", marginBottom:"clamp(36px,5vw,62px)" }}>
          <p style={{ color:c.cyan, fontSize:10, fontWeight:700, letterSpacing:"0.26em", textTransform:"uppercase", marginBottom:11 }}>My Work</p>
          <h2 style={{ fontSize:"clamp(26px,4.8vw,54px)", fontWeight:900, color:c.text, letterSpacing:"-1.5px", fontFamily:"'Syne',sans-serif" }}>
            Featured <span style={{ background:`linear-gradient(135deg,${c.blueBright},${c.cyan})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Projects</span>
          </h2>
        </motion.div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,270px),1fr))", gap:"clamp(12px,1.8vw,20px)" }}>
          {PROJECTS.map((proj,i) => (
            <motion.div key={proj.id} custom={i+1} variants={fadeUp}
              whileHover={{ y:-11, boxShadow:`0 32px 72px ${proj.accent}1e, 0 0 0 1px ${proj.accent}36` }}
              style={{ background:c.glass, backdropFilter:"blur(16px)", border:"1px solid rgba(59,130,246,0.12)", borderRadius:21, padding:"clamp(16px,2.2vw,26px)", position:"relative", overflow:"hidden", transition:"all 0.4s ease" }}>
              <div style={{ position:"absolute", top:0, right:0, width:130, height:130, borderRadius:"0 21px 0 130px", background:`${proj.accent}0a`, pointerEvents:"none" }} />
              <motion.div animate={{ x:["-100%","220%"] }} transition={{ duration:3.5, repeat:Infinity, repeatDelay:5 }}
                style={{ position:"absolute", top:0, left:0, width:"30%", height:"100%", background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.032),transparent)", pointerEvents:"none" }} />

              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:16 }}>
                <motion.div whileHover={{ scale:1.12, rotate:7 }}
                  style={{ width:50, height:50, borderRadius:14, background:`${proj.accent}1e`, border:`1px solid ${proj.accent}36`, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:`0 0 20px ${proj.accent}22` }}>
                  <proj.Icon size={24} color={proj.accent} strokeWidth={1.5}/>
                </motion.div>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:5 }}>
                  <span style={{ background:`${proj.accent}1c`, border:`1px solid ${proj.accent}40`, color:proj.accent, borderRadius:100, padding:"4px 12px", fontSize:10, fontWeight:800, letterSpacing:"0.08em" }}>{proj.tag}</span>
                  {proj.badge && <span style={{ background:"rgba(34,197,94,0.1)", border:"1px solid rgba(34,197,94,0.28)", color:"#22c55e", borderRadius:100, padding:"3px 9px", fontSize:10, fontWeight:700 }}>{proj.badge}</span>}
                </div>
              </div>
              <div style={{ marginBottom:9 }}>
                <h3 style={{ color:c.text, fontWeight:900, fontSize:"clamp(14px,2vw,17px)", marginBottom:2, fontFamily:"'Syne',sans-serif" }}>{proj.title}</h3>
                <p style={{ color:proj.accent, fontSize:11, fontWeight:600, opacity:0.8 }}>{proj.subtitle}</p>
              </div>
              <p style={{ color:c.textDim, fontSize:"clamp(11px,1.3vw,12px)", lineHeight:1.8, marginBottom:16 }}>{proj.desc}</p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginBottom:17 }}>
                {proj.stack.map(s => (
                  <span key={s} style={{ background:`${c.blue}0d`, border:`1px solid ${c.blue}1c`, borderRadius:5, padding:"3px 8px", color:c.textMuted, fontSize:10, fontWeight:500 }}>{s}</span>
                ))}
              </div>
              <div style={{ display:"flex", gap:13, flexWrap:"wrap" }}>
                <motion.a href={proj.link} target="_blank" rel="noreferrer" whileHover={{ x:3 }}
                  style={{ display:"inline-flex", alignItems:"center", gap:5, color:proj.accent, fontWeight:700, fontSize:12, textDecoration:"none" }}>
                  <ExternalLink size={11}/> {proj.id===3?"HuggingFace Hub":"View Project"} <ArrowUpRight size={10}/>
                </motion.a>
                {proj.colab && (
                  <motion.a href={proj.colab} target="_blank" rel="noreferrer" whileHover={{ x:3 }}
                    style={{ display:"inline-flex", alignItems:"center", gap:5, color:c.cyan, fontWeight:700, fontSize:12, textDecoration:"none" }}>
                    <ExternalLink size={11}/> Colab <ArrowUpRight size={10}/>
                  </motion.a>
                )}
              </div>
              <div style={{ position:"absolute", bottom:0, left:0, right:0, height:2, background:`linear-gradient(90deg,${proj.accent}70,${proj.accent}18,transparent)` }} />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─── CONTACT ─────────────────────────────────────────────── */
function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText("shaikhaniscoder07@gmail.com"); setCopied(true); setTimeout(() => setCopied(false),2200); };

  return (
    <Section id="contact" style={{ padding:"clamp(68px,9vw,108px) 0" }}>
      <GlowDivider />
      <div style={{ maxWidth:1160, margin:"0 auto", padding:"clamp(40px,6vw,76px) 20px 0" }}>
        <div className="contact-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"clamp(24px,5vw,56px)", alignItems:"start" }}>
          <div style={{ minWidth:0 }}>
            <motion.p variants={fadeUp} custom={0} style={{ color:c.cyan, fontSize:10, fontWeight:700, letterSpacing:"0.26em", textTransform:"uppercase", marginBottom:11 }}>Get In Touch</motion.p>
            <motion.h2 variants={fadeUp} custom={1}
              style={{ fontSize:"clamp(26px,4.8vw,54px)", fontWeight:900, color:c.text, letterSpacing:"-1.5px", marginBottom:16, lineHeight:1.02, fontFamily:"'Syne',sans-serif" }}>
              Let's Build<br/>Something{" "}
              <span style={{ background:`linear-gradient(135deg,${c.blueBright},${c.cyan})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Great</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} style={{ color:c.textDim, fontSize:"clamp(11px,1.4vw,13px)", lineHeight:1.85, marginBottom:30 }}>
              Open to full-time roles, freelance projects, and AI / Full Stack collaborations. Based in Coimbatore — available remotely worldwide.
            </motion.p>
            <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
              {[
                { icon:<Mail size={13} color={c.blueBright}/>, label:"shaikhaniscoder07@gmail.com", href:"mailto:shaikhaniscoder07@gmail.com" },
                { icon:<Phone size={13} color={c.cyan}/>, label:"+91 7548899769", href:"tel:+917548899769" },
                { icon:<FaLinkedin size={13} color={c.blueBright}/>, label:"LinkedIn — shaikh-anis-s", href:"https://www.linkedin.com/in/shaikh-anis-s/" },
              ].map(({ icon,label,href },i) => (
                <motion.a key={label} custom={i+3} variants={fadeUp} href={href} target="_blank" rel="noreferrer"
                  whileHover={{ x:8, background:`${c.blue}0d` }}
                  style={{ display:"inline-flex", alignItems:"center", gap:11, color:c.textMuted, textDecoration:"none", fontSize:12, fontWeight:500, padding:"8px 11px", borderRadius:10, transition:"all 0.2s" }}>
                  <div style={{ width:36, height:36, borderRadius:10, background:`${c.blue}11`, border:`1px solid ${c.blue}1e`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{icon}</div>
                  <span style={{ fontSize:"clamp(10px,1.4vw,12px)" }}>{label}</span>
                  <ArrowUpRight size={11} style={{ marginLeft:"auto", opacity:0.28 }}/>
                </motion.a>
              ))}
            </div>
          </div>

          <motion.div variants={scaleIn}>
            <div style={{ background:c.glass, backdropFilter:"blur(22px)", border:"1px solid rgba(59,130,246,0.14)", borderRadius:22, padding:"clamp(18px,3vw,36px)", position:"relative", overflow:"hidden", boxShadow:`0 0 70px ${c.blue}0c` }}>
              <motion.div animate={{ x:["-100%","220%"] }} transition={{ duration:5, repeat:Infinity, repeatDelay:4 }}
                style={{ position:"absolute", top:0, left:0, width:"36%", height:"100%", background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.024),transparent)", pointerEvents:"none" }} />
              <p style={{ color:c.textDim, fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.14em", marginBottom:14 }}>Drop a message</p>
              <motion.div onClick={copy} whileHover={{ borderColor:c.blue }} whileTap={{ scale:0.98 }}
                style={{ display:"flex", justifyContent:"space-between", alignItems:"center", background:"rgba(2,8,20,0.5)", border:`1px solid ${c.border}`, borderRadius:11, padding:"10px 14px", cursor:"pointer", marginBottom:11, transition:"border-color 0.22s" }}>
                <span style={{ color:c.textMuted, fontSize:"clamp(10px,1.3vw,11px)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>shaikhaniscoder07@gmail.com</span>
                <AnimatePresence mode="wait">
                  {copied
                    ? <motion.span key="c" initial={{ scale:0 }} animate={{ scale:1 }} exit={{ scale:0 }}><Check size={13} color="#22c55e"/></motion.span>
                    : <motion.span key="d" initial={{ scale:0 }} animate={{ scale:1 }} exit={{ scale:0 }}><Copy size={13} color={c.blueBright}/></motion.span>}
                </AnimatePresence>
              </motion.div>
              <motion.a href="mailto:shaikhaniscoder07@gmail.com"
                whileHover={{ scale:1.02, boxShadow:`0 0 30px ${c.blue}50` }} whileTap={{ scale:0.97 }}
                style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:7, padding:13, borderRadius:11, background:`linear-gradient(135deg,${c.blue},${c.blueGlow})`, color:"#fff", fontWeight:700, fontSize:13, textDecoration:"none", marginBottom:18, boxShadow:`0 0 18px ${c.blue}3e` }}>
                <Mail size={13}/> Send Email
              </motion.a>
              <div style={{ display:"flex", alignItems:"center", gap:9, marginBottom:13 }}>
                <div style={{ flex:1, height:1, background:`linear-gradient(90deg,transparent,${c.border})` }} />
                <span style={{ color:c.textDim, fontSize:10 }}>or connect on</span>
                <div style={{ flex:1, height:1, background:`linear-gradient(90deg,${c.border},transparent)` }} />
              </div>
              <div style={{ display:"flex", gap:7, flexWrap:"wrap" }}>
                {[
                  { label:"LinkedIn",    icon:<FaLinkedin size={12}/>, href:"https://www.linkedin.com/in/shaikh-anis-s/" },
                  { label:"GitHub",      icon:<GitBranch size={12}/>,  href:"https://github.com/Shaikhanis7" },
                  { label:"LeetCode",    icon:<Code2 size={12}/>,      href:"https://leetcode.com/u/Shaikh_the_coder/" },
                  { label:"GFG",         icon:<Cpu size={12}/>,        href:"https://www.geeksforgeeks.org/profile/shaikhanibqym?tab=activity" },
                  { label:"HuggingFace", icon:<Mic size={12}/>,        href:"https://huggingface.co/ShaikhAnis007" },
                ].map(({ label,icon,href }) => (
                  <motion.a key={label} href={href} target="_blank" rel="noreferrer"
                    whileHover={{ scale:1.06, borderColor:c.blue }}
                    style={{ flex:"1 1 auto", minWidth:"calc(33% - 6px)", display:"flex", alignItems:"center", justifyContent:"center", gap:5, padding:"10px 5px", borderRadius:10, border:`1px solid ${c.border}`, color:c.textMuted, fontWeight:600, fontSize:"clamp(9px,1.2vw,10px)", textDecoration:"none", transition:"all 0.2s", background:"rgba(2,8,20,0.28)" }}>
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

/* ─── FOOTER ──────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ borderTop:"1px solid rgba(59,130,246,0.08)", padding:"24px 20px", position:"relative", zIndex:1 }}>
      <div style={{ maxWidth:1160, margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
        <div style={{ display:"flex", alignItems:"center", gap:9 }}>
          <div style={{ width:30, height:30, borderRadius:8, background:`linear-gradient(135deg,${c.blue},${c.cyan})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:900, color:"#fff", boxShadow:`0 0 13px ${c.blue}45` }}>SA</div>
          <div>
            <div style={{ color:c.text, fontWeight:700, fontSize:12, fontFamily:"'Syne',sans-serif" }}>Shaikh Anis</div>
            <div style={{ color:c.textDim, fontSize:10 }}>Coimbatore, India</div>
          </div>
        </div>
        <div style={{ display:"flex", gap:"clamp(12px,2.5vw,24px)", alignItems:"center", flexWrap:"wrap" }}>
          <p style={{ color:c.textDim, fontSize:10 }}>Built with React & WebGL Water</p>
          <p style={{ color:c.textDim, fontSize:10 }}>© 2025 All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}

/* ─── SCROLL PROGRESS ─────────────────────────────────────── */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness:100, damping:30, restDelta:0.001 });
  return <motion.div style={{ position:"fixed", top:0, left:0, right:0, height:2, zIndex:200, background:`linear-gradient(90deg,${c.blue},${c.cyan},${c.violet})`, transformOrigin:"0%", scaleX }} />;
}

/* ─── GLOBAL CSS ──────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800;900&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
    html{scroll-behavior:smooth;}
    body{background:#020810;color:#eef4ff;font-family:'DM Sans',sans-serif;-webkit-font-smoothing:antialiased;overflow-x:hidden;width:100%;max-width:100vw;}
    h1,h2,h3{font-family:'Syne',sans-serif;}
    ::-webkit-scrollbar{width:3px;}
    ::-webkit-scrollbar-track{background:#020810;}
    ::-webkit-scrollbar-thumb{background:linear-gradient(180deg,#2563eb,#06b6d4,#7c3aed);border-radius:3px;}
    ::selection{background:rgba(37,99,235,0.28);color:#eef4ff;}
    img,canvas,video{max-width:100%;}
    @media(max-width:768px){
      .hero-grid{grid-template-columns:1fr!important;}
      .hero-card{display:none!important;}
      .contact-grid{grid-template-columns:1fr!important;}
      .nav-desktop{display:none!important;}
      .nav-mobile-btn{display:flex!important;}
      .avail-mobile{display:inline-flex!important;}
    }
    @media(max-width:480px){
      .hero-grid{padding-top:88px!important;}
      .soc-label{display:none;}
    }
  `}</style>
);

/* ─── APP ─────────────────────────────────────────────────── */
export default function App() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.18 }
    );
    ["home","skills","experience","projects","contact"].forEach(id => {
      const el = document.getElementById(id); if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <GlobalStyles />
      <MagneticCursor />
      <ScrollProgress />
      <WaterBackground />
      <div style={{ background:"transparent", minHeight:"100vh", position:"relative", width:"100%", overflowX:"hidden" }}>
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