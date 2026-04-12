import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue, useInView } from "framer-motion";
import * as THREE from "three";
import {
  Mail, Phone, ExternalLink, Menu, X, Copy, Check,
  Cpu, Globe, Server, Database, Bot, Cloud, Code2, Briefcase, GraduationCap,
  ChevronRight, Sparkles, ArrowUpRight, Zap, Star, Award, GitBranch,
  BrainCircuit, Users, Mic, MapPin, Calendar
} from "lucide-react";
import { FaLinkedin } from "react-icons/fa";

/* ─── PALETTE ─────────────────────────────────────────────── */
const c = {
  bg: "#030912",
  blue: "#2563eb",
  blueBright: "#3b82f6",
  blueGlow: "#1d4ed8",
  blueLight: "#60a5fa",
  blueDim: "#1e40af12",
  cyan: "#06b6d4",
  violet: "#7c3aed",
  pink: "#ec4899",
  border: "#162035",
  text: "#eef4ff",
  textMuted: "#8ba4c2",
  textDim: "#3d5270",
  glass: "rgba(6,15,35,0.6)",
};

/* ─── DATA ───────────────────────────────────────────────── */
const PROJECTS = [
  {
    id: 1, title: "IntelliHire", subtitle: "Agentic AI Recruitment Platform", tag: "FEATURED",
    stack: ["React", "FastAPI", "PostgreSQL", "Celery", "Redis", "AWS", "Groq LLM", "Gemini Embeddings"],
    desc: "End-to-end agentic sourcing engine with a 6-pass pipeline that autonomously searches candidates, applies hybrid vector + LLM scoring, and delivers ranked, briefed shortlists.",
    link: "https://github.com/Shaikhanis7/IntelliHire", Icon: Bot, accent: "#2563eb", accentDark: "#1d40af",
  },
  {
    id: 2, title: "MindfulAI", subtitle: "Agentic RAG Mental Health Assistant", tag: "AI",
    stack: ["LangGraph", "LangChain", "FastAPI", "React", "ChromaDB", "Groq LLM", "IndicTrans2", "DeepFace"],
    desc: "Full-stack AI mental wellness platform with agentic RAG chat, real-time crisis detection & emergency alerts, DeepFace emotion analysis, 12-language support, voice I/O, mood tracking.",
    link: "https://github.com/Shaikhanis7/final_sem_project", Icon: BrainCircuit, accent: "#06b6d4", accentDark: "#0e7490",
  },
  {
    id: 3, title: "Hindi STT", subtitle: "Whisper Medium Fine-tuned", tag: "ML / NLP",
    stack: ["Python", "Whisper Medium", "HuggingFace", "Seq2SeqTrainer", "Kathbath", "Transformers"],
    desc: "Fine-tuned OpenAI Whisper Medium on AI4Bharat Kathbath Hindi speech dataset. Achieved 47.1% WER reduction (0.41→0.22) and 69.4% CER reduction. Model published on HuggingFace Hub.",
    link: "https://huggingface.co/ShaikhAnis007/whisper-medium-hindi",
    colab: "https://colab.research.google.com/drive/1fHOK2ymEmDiWI4_XShxcZKnP3OjySqLg?usp=sharing",
    Icon: Mic, accent: "#7c3aed", accentDark: "#5b21b6",
    badge: "WER ↓47.1%",
  },
  {
    id: 4, title: "Freelancer App", subtitle: "Full Stack Web Platform", tag: "FULL STACK",
    stack: ["React", "Spring Boot", "MySQL", "JWT", "Spring Security"],
    desc: "Secure full-stack platform with JWT authentication, RBAC with Spring Security, and scalable backend APIs using Spring Boot REST architecture and JPA/Hibernate.",
    link: "https://github.com/Shaikhanis7", Icon: Users, accent: "#ec4899", accentDark: "#9d174d",
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
  "Full Stack Developer", "Agentic AI Engineer", "LangChain & LangGraph",
  "RAG Pipelines", "React & Angular", "FastAPI & Spring Boot",
  "Docker & Kubernetes", "500+ DSA Problems", "Whisper Fine-tuning", "HuggingFace",
];

/* ─── ANIMATION VARIANTS ──────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 50, filter: "blur(6px)" },
  visible: (i = 0) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }
  }),
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.85, filter: "blur(8px)" },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};
const slideLeft = {
  hidden: { opacity: 0, x: -60, filter: "blur(6px)" },
  visible: (i = 0) => ({
    opacity: 1, x: 0, filter: "blur(0px)",
    transition: { duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }
  }),
};

/* ─── MAGNETIC CURSOR ─────────────────────────────────────── */
function MagneticCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (window.innerWidth < 768) return;
    let raf;
    const move = (e) => { targetRef.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", move);
    const tick = () => {
      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.12;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.12;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${posRef.current.x - 20}px, ${posRef.current.y - 20}px)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${targetRef.current.x - 4}px, ${targetRef.current.y - 4}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const hoverEls = document.querySelectorAll("a, button, [data-magnetic]");
    const over = () => { cursorRef.current && (cursorRef.current.style.width = "60px", cursorRef.current.style.height = "60px", cursorRef.current.style.opacity = "0.6"); };
    const out = () => { cursorRef.current && (cursorRef.current.style.width = "40px", cursorRef.current.style.height = "40px", cursorRef.current.style.opacity = "0.35"); };
    hoverEls.forEach(el => { el.addEventListener("mouseenter", over); el.addEventListener("mouseleave", out); });
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div ref={cursorRef} style={{ position: "fixed", width: 40, height: 40, borderRadius: "50%", border: `1.5px solid ${c.blueBright}`, opacity: 0.35, pointerEvents: "none", zIndex: 9999, top: 0, left: 0, transition: "width 0.3s, height 0.3s, opacity 0.3s", mixBlendMode: "difference" }} />
      <div ref={dotRef} style={{ position: "fixed", width: 8, height: 8, borderRadius: "50%", background: c.blueBright, opacity: 0.9, pointerEvents: "none", zIndex: 9999, top: 0, left: 0 }} />
    </>
  );
}

/* ─── THREE.JS BACKGROUND ─────────────────────────────────── */
function ThreeBackground() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const W = () => window.innerWidth;
    const H = () => document.documentElement.scrollHeight;
    const isMobile = W() < 768;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W(), H());
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, W() / H(), 0.1, 2000);
    camera.position.z = 8;
    const rng = (a, b) => a + Math.random() * (b - a);

    const s1n = isMobile ? 2000 : 5000;
    const s1p = new Float32Array(s1n * 3);
    for (let i = 0; i < s1n; i++) { s1p[i*3]=rng(-55,55); s1p[i*3+1]=rng(-95,95); s1p[i*3+2]=rng(-30,-8); }
    const s1g = new THREE.BufferGeometry(); s1g.setAttribute("position", new THREE.BufferAttribute(s1p, 3));
    const s1m = new THREE.PointsMaterial({ color: 0xffffff, size: 0.028, transparent: true, opacity: 0.45, sizeAttenuation: true });
    scene.add(new THREE.Points(s1g, s1m));

    const s2n = isMobile ? 1500 : 4000;
    const s2p = new Float32Array(s2n * 3);
    for (let i = 0; i < s2n; i++) { s2p[i*3]=rng(-34,34); s2p[i*3+1]=rng(-80,80); s2p[i*3+2]=rng(-14,0); }
    const s2g = new THREE.BufferGeometry(); s2g.setAttribute("position", new THREE.BufferAttribute(s2p, 3));
    const s2m = new THREE.PointsMaterial({ color: 0x3b82f6, size: 0.06, transparent: true, opacity: 0.3, sizeAttenuation: true });
    const blueCloud = new THREE.Points(s2g, s2m); scene.add(blueCloud);

    const s3n = isMobile ? 800 : 2200;
    const s3p = new Float32Array(s3n * 3);
    for (let i = 0; i < s3n; i++) { s3p[i*3]=rng(-28,28); s3p[i*3+1]=rng(-70,70); s3p[i*3+2]=rng(-10,1); }
    const s3g = new THREE.BufferGeometry(); s3g.setAttribute("position", new THREE.BufferAttribute(s3p, 3));
    const s3m = new THREE.PointsMaterial({ color: 0x06b6d4, size: 0.045, transparent: true, opacity: 0.2, sizeAttenuation: true });
    const cyanCloud = new THREE.Points(s3g, s3m); scene.add(cyanCloud);

    const s4n = isMobile ? 500 : 1500;
    const s4p = new Float32Array(s4n * 3);
    for (let i = 0; i < s4n; i++) { s4p[i*3]=rng(-22,22); s4p[i*3+1]=rng(-65,65); s4p[i*3+2]=rng(-8,1); }
    const s4g = new THREE.BufferGeometry(); s4g.setAttribute("position", new THREE.BufferAttribute(s4p, 3));
    const s4m = new THREE.PointsMaterial({ color: 0x7c3aed, size: 0.055, transparent: true, opacity: 0.17, sizeAttenuation: true });
    const violetCloud = new THREE.Points(s4g, s4m); scene.add(violetCloud);

    const nn = isMobile ? 45 : 90;
    const npos = Array.from({ length: nn }, () => new THREE.Vector3(rng(-20,20), rng(-60,60), rng(-6,0)));
    const npArr = new Float32Array(nn * 3);
    npos.forEach((p, i) => { npArr[i*3]=p.x; npArr[i*3+1]=p.y; npArr[i*3+2]=p.z; });
    const nGeo = new THREE.BufferGeometry(); nGeo.setAttribute("position", new THREE.BufferAttribute(npArr, 3));
    const nMat = new THREE.PointsMaterial({ color: 0x60a5fa, size: 0.18, transparent: true, opacity: 0.7, sizeAttenuation: true });
    scene.add(new THREE.Points(nGeo, nMat));
    const edges = [];
    for (let i = 0; i < nn; i++) for (let j = i+1; j < nn; j++) {
      if (npos[i].distanceTo(npos[j]) < 8.5) { edges.push(npos[i].x, npos[i].y, npos[i].z, npos[j].x, npos[j].y, npos[j].z); }
    }
    const eGeo = new THREE.BufferGeometry(); eGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(edges), 3));
    scene.add(new THREE.LineSegments(eGeo, new THREE.LineBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.09 })));

    const shooters = [];
    const shootN = isMobile ? 8 : 20;
    for (let i = 0; i < shootN; i++) {
      const len = rng(2, 5);
      const sg = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0,0,0), new THREE.Vector3(-len,-len*0.28,0)]);
      const sl = new THREE.Line(sg, new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: rng(0.2,0.6) }));
      sl.position.set(rng(-20,22), rng(10,55), rng(-5,0));
      sl.userData = { spd: rng(0.08,0.22), resetY: rng(15,65) };
      scene.add(sl); shooters.push(sl);
    }

    const dna1=[], dna2=[], rungs=[];
    const dnaN=130;
    for (let i=0; i<dnaN; i++) {
      const t=(i/dnaN)*Math.PI*10, y=(i/dnaN)*50-25, r=1.1;
      dna1.push(new THREE.Vector3(Math.cos(t)*r+6, y, Math.sin(t)*r-3));
      dna2.push(new THREE.Vector3(Math.cos(t+Math.PI)*r+6, y, Math.sin(t+Math.PI)*r-3));
      if (i%8===0) { rungs.push(dna1[i], dna2[i]); }
    }
    const dnaGroup = new THREE.Group();
    dnaGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(dna1), new THREE.LineBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.4 })));
    dnaGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(dna2), new THREE.LineBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.4 })));
    dnaGroup.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(rungs), new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.08 })));
    scene.add(dnaGroup);

    const wires = [
      { geo: new THREE.TorusKnotGeometry(1.7,0.4,160,32), col: 0x2563eb, op: 0.09, pos: [-6,7,-5] },
      { geo: new THREE.IcosahedronGeometry(1.3,1), col: 0x06b6d4, op: 0.08, pos: [5.5,-7,-3] },
      { geo: new THREE.OctahedronGeometry(1.4,1), col: 0x7c3aed, op: 0.07, pos: [-5,-16,-3] },
      { geo: new THREE.DodecahedronGeometry(1.2,0), col: 0x06b6d4, op: 0.07, pos: [6,16,-4] },
      { geo: new THREE.TorusGeometry(1.3,0.45,12,48), col: 0x2563eb, op: 0.08, pos: [4,28,-4] },
    ];
    const wireMeshes = wires.map(({ geo, col, op, pos }) => {
      const m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: col, wireframe: true, transparent: true, opacity: op }));
      m.position.set(...pos); scene.add(m); return m;
    });

    const rings = [];
    [[4,9,-5,0x3b82f6],[-5,-9,-4,0x06b6d4],[7,-22,-5,0x7c3aed],[-4,22,-4,0x2563eb],[3,-38,-5,0x06b6d4]].forEach(([x,y,z,col]) => {
      const rg = new THREE.TorusGeometry(rng(0.7,1.2),0.035,8,44);
      const ring = new THREE.Mesh(rg, new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: rng(0.14,0.28) }));
      ring.position.set(x,y,z); ring.userData = { baseY: y, spd: rng(0.25,0.65), ph: rng(0,Math.PI*2) };
      scene.add(ring); rings.push(ring);
    });

    let mx=0, my=0;
    const onMM = (e) => { mx=(e.clientX/W()-0.5)*2; my=-(e.clientY/window.innerHeight-0.5)*2; };
    const onScroll = () => { camera.position.y=-(window.scrollY/Math.max(1,document.body.scrollHeight-window.innerHeight))*40; };
    const onResize = () => { camera.aspect=W()/H(); camera.updateProjectionMatrix(); renderer.setSize(W(),H()); };
    window.addEventListener("mousemove", onMM);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    let t=0, raf;
    const tick = () => {
      raf = requestAnimationFrame(tick); t+=0.005;
      blueCloud.rotation.y=t*0.03+mx*0.05; blueCloud.rotation.x=t*0.012+my*0.025;
      cyanCloud.rotation.y=-t*0.022+mx*0.035;
      violetCloud.rotation.y=t*0.018; violetCloud.rotation.z=t*0.007;
      s1m.opacity=0.38+Math.sin(t*2.2)*0.1; s2m.opacity=0.22+Math.sin(t*1.5)*0.07;
      const rs=[[0.003,0.005,0],[0.004,0,0.003],[0.003,0.002,0],[0.002,0.004,0],[0.002,0.003,0.002]];
      const fo=[6,-6,-14,14,26];
      wireMeshes.forEach((m,i) => {
        m.rotation.x+=rs[i][0]; m.rotation.y+=rs[i][1]; m.rotation.z+=rs[i][2];
        m.position.y=fo[i]+Math.sin(t*(0.4+i*0.07))*0.8;
      });
      dnaGroup.rotation.y=t*0.16;
      rings.forEach((r) => {
        r.rotation.x+=0.009; r.rotation.y+=0.007;
        r.position.y=r.userData.baseY+Math.sin(t*r.userData.spd+r.userData.ph)*1.4;
      });
      shooters.forEach((s) => {
        s.position.x-=s.userData.spd; s.position.y-=s.userData.spd*0.38;
        if (s.position.x<-28||s.position.y<-65) { s.position.set(rng(14,26), s.userData.resetY, rng(-5,0)); }
      });
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMM);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}

/* ─── GLOW ORBS (CSS) ─────────────────────────────────────── */
function GlowOrbs() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "-20%", left: "-10%", width: "60vw", height: "60vw", borderRadius: "50%", background: `radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 65%)`, animation: "orbFloat1 18s ease-in-out infinite" }} />
      <div style={{ position: "absolute", top: "30%", right: "-15%", width: "50vw", height: "50vw", borderRadius: "50%", background: `radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 65%)`, animation: "orbFloat2 22s ease-in-out infinite" }} />
      <div style={{ position: "absolute", bottom: "10%", left: "30%", width: "40vw", height: "40vw", borderRadius: "50%", background: `radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 65%)`, animation: "orbFloat3 15s ease-in-out infinite" }} />
    </div>
  );
}

/* ─── SECTION WRAPPER ─────────────────────────────────────── */
function Section({ id, children, style }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section id={id} ref={ref} style={{ position: "relative", zIndex: 1, ...style }}>
      <motion.div initial="hidden" animate={inView ? "visible" : "hidden"}>{children}</motion.div>
    </section>
  );
}

/* ─── GLOW DIVIDER ────────────────────────────────────────── */
function GlowDivider() {
  return (
    <div style={{ position: "relative", height: 1, zIndex: 1, margin: "0 auto", maxWidth: 1200, padding: "0 clamp(16px,4vw,24px)" }}>
      <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${c.blue}70, ${c.cyan}70, ${c.violet}55, transparent)` }} />
      <div style={{ position: "absolute", left: "25%", right: "25%", height: 14, top: -7, background: `radial-gradient(ellipse, ${c.blue}30, transparent 70%)`, filter: "blur(6px)" }} />
    </div>
  );
}

function useScrollTo(setOpen) {
  return (id) => {
    setOpen && setOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: "smooth" });
    }, 350);
  };
}

/* ─── NAVBAR ──────────────────────────────────────────────── */
function Navbar({ active }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const scrollTo = useScrollTo(setOpen);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navScrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 70, behavior: "smooth" });
  };

  const links = ["home", "skills", "experience", "projects", "contact"];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(3,9,18,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(32px) saturate(180%)" : "none",
        borderBottom: scrolled ? `1px solid rgba(59,130,246,0.12)` : "1px solid transparent",
        transition: "all 0.5s ease"
      }}>
      {scrolled && <div style={{ position: "absolute", bottom: 0, left: "10%", right: "10%", height: 1, background: `linear-gradient(90deg, transparent, ${c.blue}40, transparent)` }} />}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(16px,4vw,24px)", display: "flex", alignItems: "center", justifyContent: "space-between", height: 70 }}>
        <motion.div whileHover={{ scale: 1.04 }} onClick={() => navScrollTo("home")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 11 }}>
          <div style={{ position: "relative" }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              background: `linear-gradient(135deg, ${c.blue}, ${c.cyan})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 900, fontSize: 14, color: "#fff", fontFamily: "monospace",
              boxShadow: `0 0 24px ${c.blue}60`
            }}>SA</div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              style={{ position: "absolute", inset: -5, borderRadius: "50%", border: `1px dashed ${c.blue}45`, pointerEvents: "none" }}
            />
          </div>
          <div>
            <div style={{ color: c.text, fontWeight: 800, fontSize: 16, letterSpacing: "-0.3px", fontFamily: "'Syne', sans-serif", lineHeight: 1.1 }}>Shaikh Anis</div>
            <div style={{ color: c.textDim, fontSize: 11, letterSpacing: "0.06em", fontWeight: 500, textTransform: "uppercase" }}>Full Stack · AI</div>
          </div>
        </motion.div>

        {/* Desktop nav */}
        <div className="nav-desktop" style={{ display: "flex", gap: 2, alignItems: "center" }}>
          {links.map((s) => (
            <motion.button key={s} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} onClick={() => navScrollTo(s)}
              style={{
                background: active===s ? `${c.blue}18` : "none",
                border: active===s ? `1px solid ${c.blue}40` : "1px solid transparent",
                cursor: "pointer", padding: "7px 16px", borderRadius: 9,
                color: active===s ? c.blueBright : c.textMuted,
                fontWeight: active===s ? 700 : 400, fontSize: 14,
                transition: "all 0.25s", fontFamily: "inherit",
              }}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </motion.button>
          ))}
          <motion.a
            href="mailto:shaikhaniscoder07@gmail.com"
            whileHover={{ scale: 1.05, boxShadow: `0 0 32px ${c.blue}80` }}
            whileTap={{ scale: 0.97 }}
            style={{
              marginLeft: 12, padding: "9px 24px", borderRadius: 11,
              background: `linear-gradient(135deg, ${c.blue}, ${c.blueGlow})`,
              color: "#fff", fontWeight: 700, fontSize: 14, textDecoration: "none",
              display: "flex", alignItems: "center", gap: 7,
              boxShadow: `0 0 18px ${c.blue}40`,
            }}>
            <Sparkles size={13} /> Hire Me
          </motion.a>
        </div>

        {/* Mobile menu btn */}
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => setOpen(!open)}
          className="nav-mobile-btn"
          style={{ background: open ? `${c.blue}18` : "none", border: `1px solid ${c.border}`, color: c.text, borderRadius: 9, padding: "8px 10px", cursor: "pointer", display: "none", alignItems: "center", justifyContent: "center" }}>
          <AnimatePresence mode="wait">
            {open ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}><X size={18} /></motion.span>
                  : <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}><Menu size={18} /></motion.span>}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ background: "rgba(3,9,18,0.98)", backdropFilter: "blur(28px)", borderTop: `1px solid ${c.border}`, overflow: "hidden" }}>
            <div style={{ padding: "12px 20px 24px" }}>
              {links.map((s, i) => (
                <motion.button key={s}
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => scrollTo(s)}
                  style={{
                    display: "flex", alignItems: "center", gap: 14, width: "100%",
                    textAlign: "left", background: active===s ? `${c.blue}14` : "none",
                    border: "none", borderBottom: `1px solid ${c.border}`,
                    color: active===s ? c.blueBright : c.textMuted,
                    padding: "15px 12px", fontSize: 15, fontWeight: active===s ? 700 : 400,
                    cursor: "pointer", fontFamily: "inherit", borderRadius: active===s ? 10 : 0,
                  }}>
                  {active===s && <motion.span layoutId="mDot" style={{ width: 6, height: 6, borderRadius: "50%", background: c.blueBright, display: "block", flexShrink: 0 }} />}
                  <span>{s.charAt(0).toUpperCase() + s.slice(1)}</span>
                  <ChevronRight size={14} style={{ marginLeft: "auto", opacity: 0.4 }} />
                </motion.button>
              ))}
              <motion.a href="mailto:shaikhaniscoder07@gmail.com"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 18, padding: 16, borderRadius: 14, background: `linear-gradient(135deg, ${c.blue}, ${c.blueGlow})`, color: "#fff", fontWeight: 700, fontSize: 15, textDecoration: "none", boxShadow: `0 0 24px ${c.blue}44` }}>
                <Sparkles size={15} /> Hire Me
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
    <div style={{
      overflow: "hidden",
      borderTop: `1px solid rgba(59,130,246,0.12)`,
      borderBottom: `1px solid rgba(59,130,246,0.12)`,
      background: "rgba(37,99,235,0.03)",
      padding: "13px 0", position: "relative"
    }}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 80, background: `linear-gradient(90deg, ${c.bg}, transparent)`, zIndex: 1, pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 80, background: `linear-gradient(270deg, ${c.bg}, transparent)`, zIndex: 1, pointerEvents: "none" }} />
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
        style={{ display: "flex", whiteSpace: "nowrap", width: "max-content" }}>
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 12, paddingRight: 36, color: c.textMuted, fontSize: 11, fontWeight: 600, letterSpacing: "0.1em" }}>
            <motion.span animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.2, 1] }} transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.09 }}>
              <Zap size={9} color={i % 2 === 0 ? c.blueBright : c.cyan} />
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
  const y = useTransform(scrollY, [0, 500], [0, 90]);
  // Fixed: extended opacity range so social links don't disappear too early
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);
  const [typed, setTyped] = useState("");
  const roles = ["Full Stack Developer", "Agentic AI Engineer", "LangChain Expert", "RAG Architect"];
  const roleRef = useRef(0);
  const charRef = useRef(0);
  const deletingRef = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const current = roles[roleRef.current];
      if (!deletingRef.current) {
        if (charRef.current < current.length) {
          setTyped(current.slice(0, ++charRef.current));
        } else {
          setTimeout(() => { deletingRef.current = true; }, 1800);
        }
      } else {
        if (charRef.current > 0) {
          setTyped(current.slice(0, --charRef.current));
        } else {
          deletingRef.current = false;
          roleRef.current = (roleRef.current + 1) % roles.length;
        }
      }
    }, 55);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", position: "relative", overflow: "visible" }}>
      {/* Gradient overlays */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "-25%", left: "-10%", width: "min(900px,140vw)", height: "min(900px,140vw)", borderRadius: "50%", background: `radial-gradient(circle, ${c.blue}14 0%, transparent 60%)` }} />
        <div style={{ position: "absolute", top: "10%", right: "-18%", width: "min(700px,100vw)", height: "min(700px,100vw)", borderRadius: "50%", background: `radial-gradient(circle, ${c.cyan}09 0%, transparent 60%)` }} />
        <div style={{ position: "absolute", bottom: "-5%", left: "35%", width: "min(500px,70vw)", height: "min(500px,70vw)", borderRadius: "50%", background: `radial-gradient(circle, ${c.violet}09 0%, transparent 60%)` }} />
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.025 }}>
          <defs><pattern id="g" width="58" height="58" patternUnits="userSpaceOnUse"><path d="M 58 0 L 0 0 0 58" fill="none" stroke={c.blueBright} strokeWidth="0.5"/></pattern></defs>
          <rect width="100%" height="100%" fill="url(#g)" />
        </svg>
      </div>

      <motion.div style={{ y, opacity, flex: 1, display: "flex", alignItems: "center", position: "relative", zIndex: 1 }}>
        <div className="hero-grid" style={{
          maxWidth: 1200, margin: "0 auto",
          padding: "clamp(100px,14vw,140px) clamp(16px,4vw,24px) clamp(40px,6vw,60px)",
          width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "clamp(32px,5vw,60px)", alignItems: "center"
        }}>
          {/* LEFT */}
          <div>
            {/* Mobile availability badge */}
            <motion.div className="avail-mobile" custom={0} variants={fadeUp} initial="hidden" animate="visible"
              style={{ display: "none", alignItems: "center", gap: 8, background: `rgba(34,197,94,0.08)`, border: `1px solid rgba(34,197,94,0.25)`, borderRadius: 100, padding: "7px 16px", marginBottom: 22, width: "fit-content" }}>
              <motion.span animate={{ opacity: [1,0.3,1], scale: [1,1.3,1] }} transition={{ duration: 2, repeat: Infinity }}
                style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 12px #22c55e", display: "block" }} />
              <span style={{ color: "#22c55e", fontSize: 12, fontWeight: 600 }}>Available for opportunities</span>
            </motion.div>

            {/* Badge */}
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible"
              style={{ display: "inline-flex", alignItems: "center", gap: 9, background: `${c.blue}14`, border: `1px solid ${c.blue}35`, borderRadius: 100, padding: "8px 20px", marginBottom: 28 }}>
              <motion.span animate={{ rotate: 360 }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }}><Cpu size={13} color={c.cyan} /></motion.span>
              <span style={{ color: c.textMuted, fontSize: 13, fontWeight: 500 }}>Full Stack & Agentic AI Developer</span>
            </motion.div>

            {/* Name */}
            <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible"
              style={{ fontSize: "clamp(46px,9vw,88px)", fontWeight: 900, lineHeight: 0.95, letterSpacing: "-3px", color: c.text, marginBottom: 20, fontFamily: "'Syne', sans-serif" }}>
              Shaikh<br />
              <span style={{ background: `linear-gradient(135deg, ${c.blueBright} 0%, ${c.cyan} 45%, ${c.violet} 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Anis.</span>
            </motion.h1>

            {/* Typewriter */}
            <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible"
              style={{ fontSize: "clamp(15px,2.5vw,19px)", fontWeight: 700, color: c.cyan, marginBottom: 20, height: 28, fontFamily: "'Syne', sans-serif", display: "flex", alignItems: "center", gap: 4 }}>
              {typed}
              <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.9, repeat: Infinity }} style={{ display: "inline-block", width: 2, height: "1em", background: c.cyan, borderRadius: 1 }} />
            </motion.div>

            <motion.p custom={3} variants={fadeUp} initial="hidden" animate="visible"
              style={{ fontSize: "clamp(13px,1.8vw,15px)", color: c.textDim, lineHeight: 1.85, marginBottom: 28, maxWidth: 480 }}>
              Building scalable applications and intelligent AI systems using React, FastAPI, LangChain & RAG pipelines.
            </motion.p>

            {/* Location */}
            <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible"
              style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 28 }}>
              <MapPin size={14} color={c.textDim} />
              <span style={{ color: c.textDim, fontSize: 13 }}>Coimbatore, India</span>
              <span style={{ color: c.textDim, fontSize: 13, marginLeft: 4 }}>·</span>
              <Calendar size={14} color={c.textDim} style={{ marginLeft: 4 }} />
              <span style={{ color: c.textDim, fontSize: 13 }}>B.E. CSE · 2026</span>
            </motion.div>

            {/* Social icon row — moved up above stats */}
            <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible"
              style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 32 }}>
              <span style={{ color: c.textDim, fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginRight: 4 }}>Find me on</span>
              {[
                { href: "https://www.linkedin.com/in/shaikh-anis-s/", label: "LinkedIn", icon: <FaLinkedin size={15} />, color: "#0a66c2", bg: "rgba(10,102,194,0.12)", border: "rgba(10,102,194,0.3)" },
                { href: "https://leetcode.com/u/Shaikh_the_coder/", label: "LeetCode", icon: <Code2 size={15} />, color: "#ffa116", bg: "rgba(255,161,22,0.1)", border: "rgba(255,161,22,0.28)" },
                { href: "https://www.geeksforgeeks.org/profile/shaikhanibqym?tab=activity", label: "GFG", icon: <Cpu size={15} />, color: "#2f8d46", bg: "rgba(47,141,70,0.1)", border: "rgba(47,141,70,0.28)" },
                { href: "https://huggingface.co/ShaikhAnis007", label: "HuggingFace", icon: <Mic size={15} />, color: c.cyan, bg: `rgba(6,182,212,0.1)`, border: `rgba(6,182,212,0.28)` },
              ].map(({ href, label, icon, color, bg, border }) => (
                <motion.a key={label} href={href} target="_blank" rel="noreferrer"
                  whileHover={{ scale: 1.1, y: -3, boxShadow: `0 8px 24px ${color}30` }}
                  whileTap={{ scale: 0.95 }}
                  title={label}
                  style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "9px 15px", borderRadius: 11, background: bg, border: `1px solid ${border}`, color, fontWeight: 600, fontSize: 12, textDecoration: "none", transition: "all 0.25s", backdropFilter: "blur(10px)" }}>
                  {icon}
                  <span className="social-label">{label}</span>
                </motion.a>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div custom={5} variants={fadeUp} initial="hidden" animate="visible"
              style={{ display: "flex", gap: "clamp(20px,4vw,44px)", marginBottom: 40, flexWrap: "wrap" }}>
              {[["500+", "DSA Problems", c.blueBright], ["4+", "Projects", c.cyan], ["8.6", "CGPA", c.violet]].map(([num, label, col], i) => (
                <motion.div key={label} whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300 }}>
                  <div style={{ fontSize: "clamp(26px,4.5vw,38px)", fontWeight: 900, letterSpacing: "-1.5px", color: col, textShadow: `0 0 28px ${col}60`, fontFamily: "'Syne', sans-serif" }}>{num}</div>
                  <div style={{ fontSize: 11, color: c.textDim, marginTop: 3, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>{label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div custom={6} variants={fadeUp} initial="hidden" animate="visible"
              style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <motion.a href="mailto:shaikhaniscoder07@gmail.com"
                whileHover={{ scale: 1.04, boxShadow: `0 0 50px ${c.blue}80` }}
                whileTap={{ scale: 0.97 }}
                style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "clamp(13px,2vw,15px) clamp(26px,3vw,36px)", borderRadius: 14, background: `linear-gradient(135deg, ${c.blue}, ${c.blueGlow})`, color: "#fff", fontWeight: 700, fontSize: "clamp(13px,1.8vw,15px)", textDecoration: "none", boxShadow: `0 0 26px ${c.blue}50` }}>
                <Mail size={15} /> Contact Me
              </motion.a>
              <motion.a href="https://github.com/Shaikhanis7" target="_blank" rel="noreferrer"
                whileHover={{ scale: 1.04, borderColor: `${c.blue}80` }}
                whileTap={{ scale: 0.97 }}
                style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "clamp(13px,2vw,15px) clamp(26px,3vw,36px)", borderRadius: 14, background: "transparent", border: `1px solid ${c.border}`, color: c.text, fontWeight: 700, fontSize: "clamp(13px,1.8vw,15px)", textDecoration: "none", transition: "border-color 0.25s" }}>
                <GitBranch size={15} /> GitHub
              </motion.a>
            </motion.div>
          </div>

          {/* RIGHT: Profile card */}
          <motion.div className="hero-card" custom={3} variants={scaleIn} initial="hidden" animate="visible"
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
            <motion.div animate={{ y: [-12, 10, -12] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              style={{ position: "relative", padding: "36px 140px 36px" }}>
              {/* Orbit rings */}
              {[390, 330, 272].map((size, i) => (
                <motion.div key={size}
                  animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                  transition={{ duration: [28, 20, 14][i], repeat: Infinity, ease: "linear" }}
                  style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: size, height: size, borderRadius: "50%", border: `1px ${i === 1 ? "solid" : "dashed"} rgba(${i===0?'59,130,246':i===1?'6,182,212':'124,58,237'},0.18)`, pointerEvents: "none" }} />
              ))}

              <div style={{
                width: "clamp(240px,28vw,300px)", borderRadius: 30,
                background: c.glass, backdropFilter: "blur(24px)",
                border: `1px solid rgba(59,130,246,0.22)`,
                boxShadow: `0 0 140px ${c.blue}22, 0 60px 100px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)`,
                padding: "clamp(26px,3vw,38px)", textAlign: "center", position: "relative",
              }}>
                <div style={{ position: "absolute", inset: 0, borderRadius: 30, overflow: "hidden", pointerEvents: "none" }}>
                  <motion.div animate={{ x: ["-100%", "200%"] }} transition={{ duration: 4, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
                    style={{ position: "absolute", top: 0, left: 0, width: "50%", height: "100%", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)" }} />
                </div>

                <div style={{ position: "relative", width: 92, height: 92, margin: "0 auto 22px" }}>
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    style={{ position: "absolute", inset: -6, borderRadius: "50%", background: `conic-gradient(${c.blue}, ${c.cyan}, ${c.violet}, ${c.blue})`, opacity: 0.7 }} />
                  <div style={{ position: "relative", width: 92, height: 92, borderRadius: "50%", background: `linear-gradient(135deg, ${c.blue}, ${c.cyan})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, fontWeight: 900, color: "#fff", boxShadow: `0 0 50px ${c.blue}70`, fontFamily: "monospace", zIndex: 1 }}>SA</div>
                </div>

                <p style={{ color: c.text, fontWeight: 800, fontSize: 20, marginBottom: 4, fontFamily: "'Syne', sans-serif" }}>Shaikh Anis</p>
                <p style={{ color: c.textDim, fontSize: 13, marginBottom: 6 }}>B.E. CSE · SKCT · 2026</p>
                <p style={{ color: c.textDim, fontSize: 12, marginBottom: 24, display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
                  <MapPin size={11} /> Coimbatore, India
                </p>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: `${c.blue}22`, border: `1px solid ${c.blue}45`, borderRadius: 100, padding: "8px 18px" }}>
                  <Award size={14} color={c.blueBright} />
                  <span style={{ color: c.blueBright, fontSize: 12, fontWeight: 700 }}>NPTEL Topper</span>
                </div>

                {[
                  { label: "⚡ FastAPI",   style: { left: -130, top: "18%" } },
                  { label: "🤖 AI Agents", style: { right: -136, top: "35%" } },
                  { label: "⚛️ React",     style: { left: -116, bottom: "28%" } },
                  { label: "🎙️ Whisper",   style: { right: -124, bottom: "14%" } },
                ].map(({ label, style }, i) => (
                  <motion.div key={label}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3.4 + i * 0.65, repeat: Infinity, delay: i * 0.55 }}
                    style={{
                      position: "absolute",
                      ...style,
                      background: "rgba(3,9,18,0.92)", backdropFilter: "blur(16px)",
                      border: `1px solid rgba(59,130,246,0.3)`,
                      borderRadius: 100, padding: "8px 16px", fontSize: 11,
                      color: c.textMuted, fontWeight: 600, whiteSpace: "nowrap",
                      boxShadow: `0 8px 28px rgba(0,0,0,0.5), 0 0 20px ${c.blue}25`,
                      zIndex: 10,
                    }}>
                    {label}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Available badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.7 }}
              style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(34,197,94,0.07)", border: `1px solid rgba(34,197,94,0.25)`, borderRadius: 100, padding: "11px 24px" }}>
              <motion.span animate={{ opacity: [1,0.2,1], scale: [1,1.3,1] }} transition={{ duration: 2, repeat: Infinity }}
                style={{ width: 9, height: 9, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 16px #22c55e", display: "block", flexShrink: 0 }} />
              <span style={{ color: "#22c55e", fontSize: 13, fontWeight: 700 }}>Available for opportunities</span>
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
    <Section id="skills" style={{ padding: "clamp(80px,10vw,120px) 0" }}>
      <GlowDivider />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(50px,6vw,90px) clamp(16px,4vw,24px) 0" }}>
        <motion.div variants={fadeUp} custom={0} style={{ textAlign: "center", marginBottom: "clamp(50px,7vw,80px)" }}>
          <motion.p style={{ color: c.cyan, fontSize: 11, fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 14 }}>What I Work With</motion.p>
          <h2 style={{ fontSize: "clamp(30px,5.5vw,62px)", fontWeight: 900, color: c.text, letterSpacing: "-2px", fontFamily: "'Syne', sans-serif" }}>
            Technical{" "}
            <span style={{ background: `linear-gradient(135deg, ${c.blueBright}, ${c.cyan})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Arsenal</span>
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,270px), 1fr))", gap: "clamp(14px,2vw,20px)" }}>
          {SKILLS.map((group, i) => (
            <motion.div key={group.category} custom={i} variants={fadeUp}
              whileHover={{ y: -8, borderColor: `${group.accent}70` }}
              style={{
                background: c.glass, backdropFilter: "blur(16px)",
                border: `1px solid rgba(59,130,246,0.13)`,
                borderRadius: 20, padding: "clamp(18px,3vw,26px)",
                transition: "all 0.35s ease", position: "relative", overflow: "hidden",
                boxShadow: "0 4px 24px rgba(0,0,0,0.2)"
              }}>
              <div style={{ position: "absolute", top: -30, right: -30, width: 100, height: 100, borderRadius: "50%", background: `${group.accent}08`, pointerEvents: "none" }} />
              <div style={{ display: "flex", alignItems: "center", gap: 13, marginBottom: 18 }}>
                <div style={{ width: 46, height: 46, borderRadius: 13, background: `linear-gradient(135deg, ${group.accent}28, ${group.accent}14)`, border: `1px solid ${group.accent}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <group.Icon size={21} color={group.accent} />
                </div>
                <span style={{ color: c.text, fontWeight: 700, fontSize: 15, fontFamily: "'Syne', sans-serif" }}>{group.category}</span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {group.items.map((item) => (
                  <motion.span key={item} whileHover={{ scale: 1.1, background: `${group.accent}28` }}
                    style={{ background: `${group.accent}10`, border: `1px solid ${group.accent}22`, borderRadius: 8, padding: "5px 12px", color: c.textMuted, fontSize: 12, fontWeight: 500, cursor: "default", transition: "background 0.2s" }}>
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certs */}
        <motion.div variants={fadeUp} custom={7} style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginTop: "clamp(36px,5vw,60px)" }}>
          {[
            { icon: <Award size={13} />, label: "NPTEL Student Topper — SKCT", col: c.blueBright },
            { icon: <Star size={13} />, label: "Google Data Analytics — Coursera", col: c.cyan },
            { icon: <Cpu size={13} />, label: "Advanced React — Coursera", col: c.violet },
            { icon: <Code2 size={13} />, label: "Java — NPTEL Certified", col: c.blueBright },
            { icon: <Mic size={13} />, label: "Hindi STT — HuggingFace Published", col: c.cyan },
          ].map(({ icon, label, col }) => (
            <motion.div key={label} whileHover={{ scale: 1.05, borderColor: col, boxShadow: `0 0 18px ${col}30` }}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, background: c.glass, backdropFilter: "blur(12px)", border: `1px solid ${c.border}`, borderRadius: 100, padding: "9px 18px", color: col, fontSize: 12, fontWeight: 600, transition: "all 0.25s" }}>
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
    <Section id="experience" style={{ padding: "clamp(80px,10vw,120px) 0" }}>
      <GlowDivider />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(50px,6vw,90px) clamp(16px,4vw,24px) 0" }}>
        <motion.div variants={fadeUp} custom={0} style={{ marginBottom: "clamp(44px,6vw,72px)" }}>
          <p style={{ color: c.cyan, fontSize: 11, fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 14 }}>Work History</p>
          <h2 style={{ fontSize: "clamp(30px,5.5vw,62px)", fontWeight: 900, color: c.text, letterSpacing: "-2px", fontFamily: "'Syne', sans-serif" }}>Experience</h2>
        </motion.div>

        <motion.div custom={1} variants={fadeUp}
          whileHover={{ borderColor: `${c.blue}50`, boxShadow: `0 0 60px ${c.blue}12, 0 40px 70px rgba(0,0,0,0.25)` }}
          style={{ background: c.glass, backdropFilter: "blur(20px)", border: `1px solid rgba(59,130,246,0.15)`, borderRadius: 26, padding: "clamp(24px,4vw,44px)", marginBottom: 24, position: "relative", overflow: "hidden", transition: "all 0.4s ease" }}>
          <div style={{ position: "absolute", top: 0, left: 0, width: 4, height: "100%", background: `linear-gradient(180deg, ${c.blue}, ${c.cyan}, ${c.violet})`, borderRadius: "4px 0 0 4px" }} />
          <div style={{ position: "absolute", top: -60, right: -60, width: 220, height: 220, borderRadius: "50%", background: `radial-gradient(circle, ${c.blue}10, transparent 70%)`, pointerEvents: "none" }} />
          <motion.div animate={{ x: ["-100%", "200%"] }} transition={{ duration: 5, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
            style={{ position: "absolute", top: 0, left: 0, width: "40%", height: "100%", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent)", pointerEvents: "none" }} />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16, marginBottom: 28 }}>
            <div style={{ display: "flex", gap: "clamp(12px,2vw,18px)", alignItems: "center" }}>
              <motion.div whileHover={{ scale: 1.1, rotate: 5 }}
                style={{ width: 62, height: 62, borderRadius: 18, background: `linear-gradient(135deg, ${c.blue}, ${c.blueGlow})`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 18, color: "#fff", flexShrink: 0, boxShadow: `0 0 34px ${c.blue}50`, fontFamily: "monospace" }}>GW</motion.div>
              <div>
                <h3 style={{ color: c.text, fontWeight: 800, fontSize: "clamp(15px,2.5vw,19px)", marginBottom: 5, lineHeight: 1.3, fontFamily: "'Syne', sans-serif" }}>Agentic AI Full Stack Developer Trainee</h3>
                <p style={{ color: c.textMuted, fontSize: 14 }}>Genworx.ai · Chennai, India</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
              <span style={{ background: `${c.blue}22`, border: `1px solid ${c.blue}45`, color: c.blueBright, borderRadius: 100, padding: "5px 16px", fontSize: 12, fontWeight: 700 }}>Internship</span>
              <span style={{ color: c.textDim, fontSize: 13, display: "flex", alignItems: "center", gap: 5 }}><Calendar size={12} /> Aug 2025 – Feb 2026</span>
            </div>
          </div>

          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "flex", flexDirection: "column", gap: 13 }}>
            {[
              "Developed 3+ full-stack applications using React, Angular, and FastAPI, improving modular architecture, reusability, and development speed.",
              "Designed and implemented Agentic AI workflows using LangChain and LangGraph enabling dynamic decision-making, tool orchestration, and adaptive execution.",
              "Built RAG pipelines integrating PostgreSQL and vector databases for semantic search, contextual retrieval, and improved recommendation relevance.",
              "Applied Docker containerization and explored Kubernetes concepts including deployments, services, and scaling strategies.",
            ].map((point, i) => (
              <motion.li key={i} custom={i+2} variants={slideLeft}
                style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{ width: 24, height: 24, borderRadius: "50%", background: `${c.blue}18`, border: `1px solid ${c.blue}40`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                  <ChevronRight size={12} color={c.blueBright} />
                </div>
                <span style={{ color: c.textMuted, fontSize: "clamp(13px,1.8vw,14px)", lineHeight: 1.75 }}>{point}</span>
              </motion.li>
            ))}
          </ul>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {["React", "Angular", "FastAPI", "LangChain", "LangGraph", "RAG", "Docker", "PostgreSQL"].map(t => (
              <motion.span key={t} whileHover={{ scale: 1.08 }}
                style={{ background: `${c.blue}12`, border: `1px solid ${c.blue}28`, borderRadius: 8, padding: "5px 13px", color: c.blueBright, fontSize: 12, fontWeight: 600 }}>{t}</motion.span>
            ))}
          </div>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,290px), 1fr))", gap: 20 }}>
          {[
            { icon: <GraduationCap size={22} color={c.cyan} />, degree: "B.E. Computer Science & Engineering", school: "Sri Krishna College of Technology · 2022–2026", grade: "CGPA: 8.6", col: c.cyan },
            { icon: <Briefcase size={22} color={c.violet} />, degree: "Higher Secondary Education", school: "St. Antony's Matric Hr Sec School", grade: "Class 12: 91% · Class 10: 90%", col: c.violet },
          ].map(({ icon, degree, school, grade, col }) => (
            <motion.div key={degree} custom={6} variants={fadeUp}
              whileHover={{ borderColor: col, boxShadow: `0 0 36px ${col}18`, y: -6 }}
              style={{ background: c.glass, backdropFilter: "blur(16px)", border: `1px solid rgba(59,130,246,0.13)`, borderRadius: 20, padding: "clamp(18px,3vw,28px)", display: "flex", gap: 18, alignItems: "flex-start", transition: "all 0.3s ease" }}>
              <div style={{ width: 52, height: 52, borderRadius: 15, background: `${col}16`, border: `1px solid ${col}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{icon}</div>
              <div>
                <p style={{ color: c.text, fontWeight: 700, fontSize: 15, marginBottom: 5, fontFamily: "'Syne', sans-serif" }}>{degree}</p>
                <p style={{ color: c.textDim, fontSize: 13, marginBottom: 7 }}>{school}</p>
                <p style={{ color: col, fontSize: 13, fontWeight: 700 }}>{grade}</p>
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
    <Section id="projects" style={{ padding: "clamp(80px,10vw,120px) 0" }}>
      <GlowDivider />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(50px,6vw,90px) clamp(16px,4vw,24px) 0" }}>
        <motion.div variants={fadeUp} custom={0} style={{ textAlign: "center", marginBottom: "clamp(50px,7vw,80px)" }}>
          <p style={{ color: c.cyan, fontSize: 11, fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 14 }}>My Work</p>
          <h2 style={{ fontSize: "clamp(30px,5.5vw,62px)", fontWeight: 900, color: c.text, letterSpacing: "-2px", fontFamily: "'Syne', sans-serif" }}>
            Featured{" "}
            <span style={{ background: `linear-gradient(135deg, ${c.blueBright}, ${c.cyan})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Projects</span>
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,300px), 1fr))", gap: "clamp(16px,2.5vw,24px)" }}>
          {PROJECTS.map((proj, i) => (
            <motion.div key={proj.id} custom={i+1} variants={fadeUp}
              whileHover={{ y: -14, boxShadow: `0 40px 90px ${proj.accent}22, 0 0 0 1px ${proj.accent}40` }}
              style={{ background: c.glass, backdropFilter: "blur(18px)", border: `1px solid rgba(59,130,246,0.14)`, borderRadius: 26, padding: "clamp(22px,3vw,32px)", position: "relative", overflow: "hidden", transition: "all 0.4s ease" }}>
              <div style={{ position: "absolute", top: 0, right: 0, width: 160, height: 160, borderRadius: "0 26px 0 160px", background: `${proj.accent}0c`, pointerEvents: "none" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, width: 100, height: 100, borderRadius: "0 100px 0 26px", background: `${proj.accent}07`, pointerEvents: "none" }} />
              <motion.div animate={{ x: ["-100%", "200%"] }} transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
                style={{ position: "absolute", top: 0, left: 0, width: "35%", height: "100%", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)", pointerEvents: "none" }} />

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 }}>
                <motion.div whileHover={{ scale: 1.15, rotate: 8 }}
                  style={{ width: 62, height: 62, borderRadius: 18, background: `${proj.accent}22`, border: `1px solid ${proj.accent}40`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 28px ${proj.accent}28` }}>
                  <proj.Icon size={30} color={proj.accent} strokeWidth={1.5} />
                </motion.div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                  <span style={{ background: `${proj.accent}20`, border: `1px solid ${proj.accent}45`, color: proj.accent, borderRadius: 100, padding: "5px 16px", fontSize: 11, fontWeight: 800, letterSpacing: "0.09em" }}>{proj.tag}</span>
                  {proj.badge && (
                    <span style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", color: "#22c55e", borderRadius: 100, padding: "4px 12px", fontSize: 11, fontWeight: 700 }}>{proj.badge}</span>
                  )}
                </div>
              </div>

              <div style={{ marginBottom: 12 }}>
                <h3 style={{ color: c.text, fontWeight: 900, fontSize: "clamp(17px,2.5vw,20px)", marginBottom: 3, lineHeight: 1.2, fontFamily: "'Syne', sans-serif" }}>{proj.title}</h3>
                <p style={{ color: proj.accent, fontSize: 13, fontWeight: 600, opacity: 0.8 }}>{proj.subtitle}</p>
              </div>

              <p style={{ color: c.textDim, fontSize: "clamp(12px,1.8vw,13px)", lineHeight: 1.8, marginBottom: 22 }}>{proj.desc}</p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 24 }}>
                {proj.stack.map((s) => (
                  <span key={s} style={{ background: `${c.blue}0e`, border: `1px solid ${c.blue}20`, borderRadius: 7, padding: "4px 10px", color: c.textMuted, fontSize: 11, fontWeight: 500 }}>{s}</span>
                ))}
              </div>

              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <motion.a href={proj.link} target="_blank" rel="noreferrer"
                  whileHover={{ x: 4 }}
                  style={{ display: "inline-flex", alignItems: "center", gap: 7, color: proj.accent, fontWeight: 700, fontSize: 13, textDecoration: "none" }}>
                  <ExternalLink size={13} /> {proj.id === 3 ? "HuggingFace Hub" : "View Project"}
                  <ArrowUpRight size={12} />
                </motion.a>
                {proj.colab && (
                  <motion.a href={proj.colab} target="_blank" rel="noreferrer"
                    whileHover={{ x: 4 }}
                    style={{ display: "inline-flex", alignItems: "center", gap: 7, color: c.cyan, fontWeight: 700, fontSize: 13, textDecoration: "none" }}>
                    <ExternalLink size={13} /> Colab <ArrowUpRight size={12} />
                  </motion.a>
                )}
              </div>

              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${proj.accent}80, ${proj.accent}20, transparent)` }} />
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
  const copy = () => { navigator.clipboard.writeText("shaikhaniscoder07@gmail.com"); setCopied(true); setTimeout(() => setCopied(false), 2400); };

  return (
    <Section id="contact" style={{ padding: "clamp(80px,10vw,120px) 0" }}>
      <GlowDivider />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(50px,6vw,90px) clamp(16px,4vw,24px) 0" }}>
        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(36px,5vw,70px)", alignItems: "start" }}>
          {/* LEFT — only email and phone */}
          <div>
            <motion.p variants={fadeUp} custom={0} style={{ color: c.cyan, fontSize: 11, fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 14 }}>Get In Touch</motion.p>
            <motion.h2 variants={fadeUp} custom={1}
              style={{ fontSize: "clamp(30px,5.5vw,62px)", fontWeight: 900, color: c.text, letterSpacing: "-2px", marginBottom: 22, lineHeight: 1.02, fontFamily: "'Syne', sans-serif" }}>
              Let's Build<br />Something{" "}
              <span style={{ background: `linear-gradient(135deg, ${c.blueBright}, ${c.cyan})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Great</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2}
              style={{ color: c.textDim, fontSize: "clamp(13px,1.8vw,15px)", lineHeight: 1.85, marginBottom: 44 }}>
              Open to full-time roles, freelance projects, and AI / Full Stack collaborations. Based in Coimbatore — available remotely worldwide.
            </motion.p>

            {/* Only email and phone in the contact list */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { icon: <Mail size={15} color={c.blueBright} />, label: "shaikhaniscoder07@gmail.com", href: "mailto:shaikhaniscoder07@gmail.com" },
                { icon: <Phone size={15} color={c.cyan} />, label: "+91 7548899769", href: "tel:+917548899769" },
                { icon: <FaLinkedin size={15} color={c.blueBright} />, label: "LinkedIn — shaikh-anis-s", href: "https://www.linkedin.com/in/shaikh-anis-s/" },
              ].map(({ icon, label, href }, i) => (
                <motion.a key={label} custom={i+3} variants={fadeUp}
                  href={href} target="_blank" rel="noreferrer"
                  whileHover={{ x: 10, background: `${c.blue}10` }}
                  style={{ display: "inline-flex", alignItems: "center", gap: 14, color: c.textMuted, textDecoration: "none", fontSize: 14, fontWeight: 500, padding: "10px 14px", borderRadius: 13, transition: "all 0.25s" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 13, background: `${c.blue}12`, border: `1px solid ${c.blue}22`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{icon}</div>
                  <span style={{ fontSize: "clamp(12px,1.8vw,14px)" }}>{label}</span>
                  <ArrowUpRight size={13} style={{ marginLeft: "auto", opacity: 0.35 }} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* RIGHT — email card + all social buttons */}
          <motion.div variants={scaleIn}>
            <div style={{
              background: c.glass, backdropFilter: "blur(24px)",
              border: `1px solid rgba(59,130,246,0.16)`,
              borderRadius: 28, padding: "clamp(24px,4vw,44px)",
              boxShadow: `0 0 100px ${c.blue}10, 0 60px 80px rgba(0,0,0,0.25)`,
              position: "relative", overflow: "hidden"
            }}>
              <div style={{ position: "absolute", top: -70, right: -70, width: 220, height: 220, borderRadius: "50%", background: `radial-gradient(circle, ${c.blue}10, transparent 70%)`, pointerEvents: "none" }} />
              <motion.div animate={{ x: ["-100%", "200%"] }} transition={{ duration: 5, repeat: Infinity, repeatDelay: 4 }}
                style={{ position: "absolute", top: 0, left: 0, width: "40%", height: "100%", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent)", pointerEvents: "none" }} />

              <p style={{ color: c.textDim, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 20 }}>Drop a message</p>

              <motion.div onClick={copy}
                whileHover={{ borderColor: c.blue, boxShadow: `0 0 28px ${c.blue}22` }}
                whileTap={{ scale: 0.98 }}
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(3,11,22,0.5)", border: `1px solid ${c.border}`, borderRadius: 14, padding: "13px 18px", cursor: "pointer", marginBottom: 14, transition: "all 0.25s" }}>
                <span style={{ color: c.textMuted, fontSize: "clamp(11px,1.6vw,13px)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>shaikhaniscoder07@gmail.com</span>
                <AnimatePresence mode="wait">
                  {copied
                    ? <motion.span key="c" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }}><Check size={16} color="#22c55e" /></motion.span>
                    : <motion.span key="d" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Copy size={16} color={c.blueBright} /></motion.span>}
                </AnimatePresence>
              </motion.div>

              <motion.a href="mailto:shaikhaniscoder07@gmail.com"
                whileHover={{ scale: 1.02, boxShadow: `0 0 40px ${c.blue}60` }}
                whileTap={{ scale: 0.97 }}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 9, padding: 16, borderRadius: 14, background: `linear-gradient(135deg, ${c.blue}, ${c.blueGlow})`, color: "#fff", fontWeight: 700, fontSize: 15, textDecoration: "none", marginBottom: 24, boxShadow: `0 0 24px ${c.blue}44` }}>
                <Mail size={16} /> Send Email
              </motion.a>

              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${c.border})` }} />
                <span style={{ color: c.textDim, fontSize: 12 }}>or connect on</span>
                <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${c.border}, transparent)` }} />
              </div>

              {/* All social links in the card */}
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {[
                  { label: "LinkedIn", icon: <FaLinkedin size={14} />, href: "https://www.linkedin.com/in/shaikh-anis-s/" },
                  { label: "GitHub", icon: <GitBranch size={14} />, href: "https://github.com/Shaikhanis7" },
                  { label: "LeetCode", icon: <Code2 size={14} />, href: "https://leetcode.com/u/Shaikh_the_coder/" },
                  { label: "GFG", icon: <Cpu size={14} />, href: "https://www.geeksforgeeks.org/profile/shaikhanibqym?tab=activity" },
                  { label: "HuggingFace", icon: <Mic size={14} />, href: "https://huggingface.co/ShaikhAnis007" },
                ].map(({ label, icon, href }) => (
                  <motion.a key={label} href={href} target="_blank" rel="noreferrer"
                    whileHover={{ scale: 1.06, borderColor: c.blue, boxShadow: `0 0 16px ${c.blue}22` }}
                    style={{ flex: "1 1 auto", minWidth: "calc(33% - 8px)", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "13px 8px", borderRadius: 13, border: `1px solid ${c.border}`, color: c.textMuted, fontWeight: 600, fontSize: "clamp(10px,1.5vw,12px)", textDecoration: "none", transition: "all 0.25s", background: "rgba(3,9,18,0.3)" }}>
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
    <footer style={{ borderTop: `1px solid rgba(59,130,246,0.1)`, padding: "36px clamp(16px,4vw,24px)", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
          <div style={{ width: 36, height: 36, borderRadius: 11, background: `linear-gradient(135deg, ${c.blue}, ${c.cyan})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 900, color: "#fff", boxShadow: `0 0 18px ${c.blue}50` }}>SA</div>
          <div>
            <div style={{ color: c.text, fontWeight: 700, fontSize: 14, fontFamily: "'Syne', sans-serif" }}>Shaikh Anis</div>
            <div style={{ color: c.textDim, fontSize: 12 }}>Coimbatore, India</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "clamp(18px,3vw,32px)", alignItems: "center", flexWrap: "wrap" }}>
          <p style={{ color: c.textDim, fontSize: 12 }}>Built with React & Three.js</p>
          <p style={{ color: c.textDim, fontSize: 12 }}>© 2025 All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}

/* ─── SCROLL PROGRESS ─────────────────────────────────────── */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return (
    <motion.div style={{
      position: "fixed", top: 0, left: 0, right: 0, height: 2, zIndex: 200,
      background: `linear-gradient(90deg, ${c.blue}, ${c.cyan}, ${c.violet})`,
      transformOrigin: "0%", scaleX,
    }} />
  );
}

/* ─── GLOBAL STYLES ───────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800;900&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { background: #030912; color: #eef4ff; font-family: 'DM Sans', sans-serif; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
    h1, h2, h3 { font-family: 'Syne', sans-serif; }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: #030912; }
    ::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #2563eb, #06b6d4, #7c3aed); border-radius: 4px; }
    ::selection { background: rgba(37,99,235,0.35); color: #eef4ff; }

    @keyframes orbFloat1 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(3%,4%) scale(1.06); } }
    @keyframes orbFloat2 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-4%,-3%) scale(1.08); } }
    @keyframes orbFloat3 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(2%,-5%) scale(1.05); } }

    @media (max-width: 768px) {
      .hero-grid { grid-template-columns: 1fr !important; }
      .hero-card { display: none !important; }
      .contact-grid { grid-template-columns: 1fr !important; }
      .nav-desktop { display: none !important; }
      .nav-mobile-btn { display: flex !important; }
      .avail-mobile { display: inline-flex !important; }
    }
    @media (max-width: 480px) {
      .hero-grid { padding-top: 100px !important; }
      .social-label { display: none; }
    }
  `}</style>
);

/* ─── APP ─────────────────────────────────────────────────── */
export default function App() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = ["home", "skills", "experience", "projects", "contact"];
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.2 }
    );
    sections.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <GlobalStyles />
      <MagneticCursor />
      <ScrollProgress />
      <ThreeBackground />
      <GlowOrbs />
      <div style={{ background: "transparent", minHeight: "100vh", position: "relative" }}>
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