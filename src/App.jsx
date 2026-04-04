import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import * as THREE from "three";
import {
  Mail, Phone, ExternalLink, Menu, X, Copy, Check,
  Cpu, Globe, Server, Database, Bot, Cloud, Code2, Briefcase, GraduationCap,
  ChevronRight, Sparkles, ArrowUpRight, Zap, Star, Award, GitBranch,
  BrainCircuit, Users
} from "lucide-react";
import { FaLinkedin } from "react-icons/fa";

/* ─── THEME ──────────────────────────────────────────────── */
const c = {
  bg: "#020810",
  blue: "#2563eb",
  blueBright: "#3b82f6",
  blueGlow: "#1d4ed8",
  blueLight: "#60a5fa",
  blueDim: "#1e40af18",
  cyan: "#06b6d4",
  violet: "#7c3aed",
  border: "#1a2e4a",
  text: "#f0f6ff",
  textMuted: "#94a3b8",
  textDim: "#475569",
};

/* ─── DATA ───────────────────────────────────────────────── */
const PROJECTS = [
  {
    id: 1, title: "Agentic AI Job Portal", tag: "FEATURED",
    stack: ["React", "FastAPI", "PostgreSQL", "Docker"],
    desc: "AI-powered job recommendation with RAG pipelines for semantic resume-job matching, multi-agent architecture, and an AI Interview Bot for automated candidate screening.",
    link: "https://github.com/shaikhanis", Icon: Bot, accent: "#2563eb",
  },
  {
    id: 2, title: "Agentic RAG Mental Health Assistant", tag: "AI",
    stack: ["LangGraph", "LangChain", "React", "FastAPI"],
    desc: "AI mental health assistant using Retrieval-Augmented Generation for context-aware responses. Multi-agent workflows with memory and tool-calling for improved reasoning.",
    link: "https://github.com/shaikhanis", Icon: BrainCircuit, accent: "#06b6d4",
  },
  {
    id: 3, title: "Freelancer Web Application", tag: "FULL STACK",
    stack: ["React", "Spring Boot", "MySQL"],
    desc: "Secure full-stack platform with JWT authentication, RBAC with Spring Security, and scalable backend APIs using Spring Boot REST architecture and JPA/Hibernate.",
    link: "https://github.com/shaikhanis", Icon: Users, accent: "#7c3aed",
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

/* ─── ANIMATIONS ─────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] } }),
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

/* ══════════════════════════════════════════════════════════
   THREE.JS MULTI-LAYER BACKGROUND — 10 PARTICLE SYSTEMS
══════════════════════════════════════════════════════════ */
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

    /* ══ L1: DEEP STAR FIELD ══ */
    const s1n = isMobile ? 2500 : 6000;
    const s1p = new Float32Array(s1n * 3);
    for (let i = 0; i < s1n; i++) {
      s1p[i*3]   = rng(-50, 50);
      s1p[i*3+1] = rng(-90, 90);
      s1p[i*3+2] = rng(-30, -8);
    }
    const s1g = new THREE.BufferGeometry();
    s1g.setAttribute("position", new THREE.BufferAttribute(s1p, 3));
    const s1m = new THREE.PointsMaterial({ color: 0xffffff, size: 0.03, transparent: true, opacity: 0.5, sizeAttenuation: true });
    scene.add(new THREE.Points(s1g, s1m));

    /* ══ L2: BLUE NEBULA ══ */
    const s2n = isMobile ? 2000 : 4500;
    const s2p = new Float32Array(s2n * 3);
    for (let i = 0; i < s2n; i++) {
      s2p[i*3]   = rng(-32, 32);
      s2p[i*3+1] = rng(-75, 75);
      s2p[i*3+2] = rng(-14, 0);
    }
    const s2g = new THREE.BufferGeometry();
    s2g.setAttribute("position", new THREE.BufferAttribute(s2p, 3));
    const s2m = new THREE.PointsMaterial({ color: 0x3b82f6, size: 0.055, transparent: true, opacity: 0.32, sizeAttenuation: true });
    const blueCloud = new THREE.Points(s2g, s2m);
    scene.add(blueCloud);

    /* ══ L3: CYAN MIST ══ */
    const s3n = isMobile ? 1000 : 2500;
    const s3p = new Float32Array(s3n * 3);
    for (let i = 0; i < s3n; i++) {
      s3p[i*3]   = rng(-26, 26);
      s3p[i*3+1] = rng(-70, 70);
      s3p[i*3+2] = rng(-10, 1);
    }
    const s3g = new THREE.BufferGeometry();
    s3g.setAttribute("position", new THREE.BufferAttribute(s3p, 3));
    const s3m = new THREE.PointsMaterial({ color: 0x06b6d4, size: 0.042, transparent: true, opacity: 0.22, sizeAttenuation: true });
    const cyanCloud = new THREE.Points(s3g, s3m);
    scene.add(cyanCloud);

    /* ══ L4: VIOLET DUST ══ */
    const s4n = isMobile ? 700 : 1800;
    const s4p = new Float32Array(s4n * 3);
    for (let i = 0; i < s4n; i++) {
      s4p[i*3]   = rng(-20, 20);
      s4p[i*3+1] = rng(-65, 65);
      s4p[i*3+2] = rng(-8, 1);
    }
    const s4g = new THREE.BufferGeometry();
    s4g.setAttribute("position", new THREE.BufferAttribute(s4p, 3));
    const s4m = new THREE.PointsMaterial({ color: 0x7c3aed, size: 0.05, transparent: true, opacity: 0.18, sizeAttenuation: true });
    const violetCloud = new THREE.Points(s4g, s4m);
    scene.add(violetCloud);

    /* ══ L5: NEURAL NETWORK NODES + EDGES ══ */
    const nn = isMobile ? 50 : 100;
    const npos = Array.from({ length: nn }, () => new THREE.Vector3(rng(-20, 20), rng(-60, 60), rng(-6, 0)));
    const npArr = new Float32Array(nn * 3);
    npos.forEach((p, i) => { npArr[i*3]=p.x; npArr[i*3+1]=p.y; npArr[i*3+2]=p.z; });
    const nGeo = new THREE.BufferGeometry();
    nGeo.setAttribute("position", new THREE.BufferAttribute(npArr, 3));
    const nMat = new THREE.PointsMaterial({ color: 0x60a5fa, size: 0.16, transparent: true, opacity: 0.65, sizeAttenuation: true });
    scene.add(new THREE.Points(nGeo, nMat));
    const edges = [];
    for (let i = 0; i < nn; i++) for (let j = i+1; j < nn; j++) {
      if (npos[i].distanceTo(npos[j]) < 9) { edges.push(npos[i].x, npos[i].y, npos[i].z, npos[j].x, npos[j].y, npos[j].z); }
    }
    const eGeo = new THREE.BufferGeometry();
    eGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(edges), 3));
    scene.add(new THREE.LineSegments(eGeo, new THREE.LineBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.1 })));

    /* ══ L6: SHOOTING STARS ══ */
    const shooters = [];
    const shootN = isMobile ? 10 : 22;
    for (let i = 0; i < shootN; i++) {
      const len = rng(1.8, 4.5);
      const sg = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0), new THREE.Vector3(-len, -len * 0.28, 0)
      ]);
      const sl = new THREE.Line(sg, new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: rng(0.25, 0.65) }));
      sl.position.set(rng(-20, 22), rng(10, 55), rng(-5, 0));
      sl.userData = { spd: rng(0.07, 0.2), resetY: rng(15, 65) };
      scene.add(sl);
      shooters.push(sl);
    }

    /* ══ L7: DNA DOUBLE HELIX ══ */
    const dna1 = [], dna2 = [], rungs = [];
    const dnaN = 150;
    for (let i = 0; i < dnaN; i++) {
      const t = (i / dnaN) * Math.PI * 12;
      const y = (i / dnaN) * 55 - 27;
      const r = 1.1;
      dna1.push(new THREE.Vector3(Math.cos(t)*r + 5.5, y, Math.sin(t)*r - 3));
      dna2.push(new THREE.Vector3(Math.cos(t+Math.PI)*r + 5.5, y, Math.sin(t+Math.PI)*r - 3));
      if (i % 9 === 0) { rungs.push(dna1[i], dna2[i]); }
    }
    const dnaGroup = new THREE.Group();
    dnaGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(dna1), new THREE.LineBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.45 })));
    dnaGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(dna2), new THREE.LineBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.45 })));
    dnaGroup.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(rungs), new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.09 })));
    scene.add(dnaGroup);

    /* ══ L8: WIREFRAME GEOMETRY ══ */
    const wires = [
      { geo: new THREE.TorusKnotGeometry(1.7, 0.4, 160, 32), col: 0x2563eb, op: 0.09, pos: [-6, 7, -5] },
      { geo: new THREE.IcosahedronGeometry(1.3, 1), col: 0x06b6d4, op: 0.08, pos: [5.5, -7, -3] },
      { geo: new THREE.OctahedronGeometry(1.4, 1), col: 0x7c3aed, op: 0.07, pos: [-5, -16, -3] },
      { geo: new THREE.DodecahedronGeometry(1.2, 0), col: 0x06b6d4, op: 0.07, pos: [6, 16, -4] },
      { geo: new THREE.TetrahedronGeometry(1.1, 1), col: 0x3b82f6, op: 0.08, pos: [-7, -30, -3] },
      { geo: new THREE.TorusGeometry(1.3, 0.45, 12, 48), col: 0x2563eb, op: 0.07, pos: [4, 28, -4] },
    ];
    const wireMeshes = wires.map(({ geo, col, op, pos }) => {
      const m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: col, wireframe: true, transparent: true, opacity: op }));
      m.position.set(...pos);
      scene.add(m);
      return m;
    });

    /* ══ L9: ENERGY RINGS ══ */
    const rings = [];
    [[4, 9, -5, 0x3b82f6], [-5, -9, -4, 0x06b6d4], [7, -22, -5, 0x7c3aed], [-4, 22, -4, 0x2563eb], [3, -38, -5, 0x06b6d4], [-6, 38, -5, 0x7c3aed]].forEach(([x, y, z, col]) => {
      const rg = new THREE.TorusGeometry(rng(0.7, 1.2), 0.035, 8, 44);
      const rm = new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: rng(0.14, 0.28) });
      const ring = new THREE.Mesh(rg, rm);
      ring.position.set(x, y, z);
      ring.userData = { baseY: y, spd: rng(0.25, 0.65), ph: rng(0, Math.PI * 2) };
      scene.add(ring);
      rings.push(ring);
    });

    /* ══ L10: AURORA RIBBONS ══ */
    const ribbons = [];
    [[0x3b82f6, -8, 0], [0x06b6d4, -18, 1.4], [0x7c3aed, -28, 2.8], [0x2563eb, 8, 0.7]].forEach(([col, yOff, ph]) => {
      const pts = Array.from({ length: 90 }, (_, i) => new THREE.Vector3((i/89)*44-22, yOff, -9));
      const rGeo = new THREE.BufferGeometry().setFromPoints(pts);
      const rMat = new THREE.LineBasicMaterial({ color: col, transparent: true, opacity: 0.05 });
      const ribbon = new THREE.Line(rGeo, rMat);
      ribbon.userData = { pts, yOff, ph };
      scene.add(ribbon);
      ribbons.push(ribbon);
    });

    let mx = 0, my = 0;
    const onMM = (e) => { mx = (e.clientX/W()-0.5)*2; my = -(e.clientY/window.innerHeight-0.5)*2; };
    const onScroll = () => { camera.position.y = -(window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight)) * 38; };
    const onResize = () => { camera.aspect = W()/H(); camera.updateProjectionMatrix(); renderer.setSize(W(), H()); };
    window.addEventListener("mousemove", onMM);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    let t = 0, raf;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      t += 0.005;
      blueCloud.rotation.y   = t*0.03  + mx*0.05;
      blueCloud.rotation.x   = t*0.012 + my*0.025;
      cyanCloud.rotation.y   = -t*0.022+ mx*0.035;
      violetCloud.rotation.y = t*0.018;
      violetCloud.rotation.z = t*0.007;
      s1m.opacity  = 0.40 + Math.sin(t*2.2)*0.10;
      s2m.opacity  = 0.25 + Math.sin(t*1.5)*0.07;
      s3m.opacity  = 0.16 + Math.cos(t*1.8)*0.06;
      const rotSpeeds = [
        [0.003,0.005,0], [0.004,0,0.003], [0.003,0.002,0],
        [0.002,0.004,0], [0.005,0,0.003], [0.002,0.003,0.002]
      ];
      const floatOffsets = [6, -6, -14, 14, -28, 26];
      wireMeshes.forEach((m, i) => {
        m.rotation.x += rotSpeeds[i][0];
        m.rotation.y += rotSpeeds[i][1];
        m.rotation.z += rotSpeeds[i][2];
        m.position.y = floatOffsets[i] + Math.sin(t*(0.4+i*0.07))*0.8;
      });
      dnaGroup.rotation.y = t*0.18;
      rings.forEach((r) => {
        r.rotation.x += 0.009;
        r.rotation.y += 0.007;
        r.position.y = r.userData.baseY + Math.sin(t*r.userData.spd + r.userData.ph)*1.4;
        r.material.opacity = 0.10 + Math.abs(Math.sin(t*r.userData.spd + r.userData.ph))*0.18;
      });
      shooters.forEach((s) => {
        s.position.x -= s.userData.spd;
        s.position.y -= s.userData.spd*0.38;
        if (s.position.x < -28 || s.position.y < -65) {
          s.position.set(rng(14, 26), s.userData.resetY, rng(-5,0));
        }
      });
      ribbons.forEach((rib) => {
        rib.userData.pts.forEach((p, i) => {
          p.y = rib.userData.yOff
              + Math.sin(i*0.17 + t*0.75 + rib.userData.ph)*1.6
              + Math.cos(i*0.08 + t*0.45)*0.9;
        });
        rib.geometry.setFromPoints(rib.userData.pts);
        rib.material.opacity = 0.03 + Math.abs(Math.sin(t*0.55+rib.userData.ph))*0.07;
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
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }}>
      <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
    </div>
  );
}

/* ─── SECTION ────────────────────────────────────────────── */
function Section({ id, children, style }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section id={id} ref={ref} style={{ position: "relative", zIndex: 1, ...style }}>
      <motion.div initial="hidden" animate={inView ? "visible" : "hidden"}>{children}</motion.div>
    </section>
  );
}

/* ─── GLOW DIVIDER ───────────────────────────────────────── */
function GlowDivider() {
  return (
    <div style={{ position: "relative", height: 1, zIndex: 1 }}>
      <div style={{ position: "absolute", left: "8%", right: "8%", height: 1, background: `linear-gradient(90deg, transparent, ${c.blue}55, ${c.cyan}55, ${c.violet}44, transparent)` }} />
      <div style={{ position: "absolute", left: "20%", right: "20%", height: 10, top: -5, background: `radial-gradient(ellipse, ${c.blue}25, transparent 70%)`, filter: "blur(5px)" }} />
    </div>
  );
}

/* ─── SCROLL HELPER ──────────────────────────────────────── */
/**
 * Closes the mobile menu first, then after the menu animation
 * finishes (~350ms), smoothly scrolls to the target section.
 * This prevents the layout-shift from the collapsing menu
 * from fighting the scroll position.
 */
function useScrollTo(setOpen) {
  return (id) => {
    // Close the drawer immediately
    setOpen(false);
    // Wait for the AnimatePresence exit animation (height: 0, ~300ms) to finish
    setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      const navHeight = 70; // account for fixed navbar
      const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: "smooth" });
    }, 350);
  };
}

/* ─── NAVBAR ─────────────────────────────────────────────── */
function Navbar({ active }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const scrollTo = useScrollTo(setOpen);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Desktop scrollTo (no drawer to close)
  const desktopScrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const navHeight = 70;
    const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const links = ["home", "skills", "experience", "projects", "contact"];

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(2,8,16,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(28px)" : "none",
        borderBottom: scrolled ? `1px solid rgba(59,130,246,0.15)` : "1px solid transparent",
        transition: "all 0.4s ease",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(16px,4vw,24px)", display: "flex", alignItems: "center", justifyContent: "space-between", height: 70 }}>
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.05 }} onClick={() => desktopScrollTo("home")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ position: "relative" }}>
            <div style={{ width: 38, height: 38, borderRadius: 11, background: `linear-gradient(135deg, ${c.blue}, ${c.cyan})`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 14, color: "#fff", fontFamily: "monospace", boxShadow: `0 0 22px ${c.blue}55` }}>SA</div>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
              style={{ position: "absolute", inset: -4, borderRadius: "50%", border: `1px dashed ${c.blue}50`, pointerEvents: "none" }} />
          </div>
          <span style={{ color: c.text, fontWeight: 700, fontSize: 17, letterSpacing: "-0.3px" }}>Shaikh Anis</span>
        </motion.div>

        {/* Desktop links */}
        <div style={{ display: "flex", gap: 2, alignItems: "center" }} className="nav-desktop">
          {links.map((s) => (
            <motion.button key={s} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              onClick={() => desktopScrollTo(s)}
              style={{ background: active===s ? `${c.blue}18` : "none", border: active===s ? `1px solid ${c.blue}40` : "1px solid transparent", cursor: "pointer", padding: "7px 15px", borderRadius: 8, color: active===s ? c.blueBright : c.textMuted, fontWeight: active===s ? 600 : 400, fontSize: 14, transition: "all 0.2s", fontFamily: "inherit" }}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </motion.button>
          ))}
          <motion.a href="mailto:shaikhaniscoder07@gmail.com"
            whileHover={{ scale: 1.05, boxShadow: `0 0 28px ${c.blue}66` }} whileTap={{ scale: 0.97 }}
            style={{ marginLeft: 10, padding: "9px 22px", borderRadius: 10, background: `linear-gradient(135deg, ${c.blue}, ${c.blueGlow})`, color: "#fff", fontWeight: 600, fontSize: 14, textDecoration: "none", display: "flex", alignItems: "center", gap: 7, boxShadow: `0 0 16px ${c.blue}33` }}>
            <Sparkles size={13} /> Hire Me
          </motion.a>
        </div>

        {/* Mobile hamburger */}
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => setOpen(!open)}
          className="nav-mobile-btn"
          style={{ background: "none", border: `1px solid ${c.border}`, color: c.text, borderRadius: 8, padding: 8, cursor: "pointer", display: "none" }}>
          {open ? <X size={18} /> : <Menu size={18} />}
        </motion.button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ background: "rgba(2,8,16,0.98)", backdropFilter: "blur(24px)", borderTop: `1px solid ${c.border}`, overflow: "hidden" }}
          >
            <div style={{ padding: "16px 24px 24px" }}>
              {links.map((s) => (
                <motion.button
                  key={s}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => scrollTo(s)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    width: "100%",
                    textAlign: "left",
                    background: active===s ? `${c.blue}14` : "none",
                    border: "none",
                    borderBottom: `1px solid ${c.border}`,
                    color: active===s ? c.blueBright : c.textMuted,
                    padding: "16px 12px",
                    fontSize: 16,
                    fontWeight: active===s ? 700 : 400,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    borderRadius: active===s ? 10 : 0,
                    transition: "all 0.2s",
                  }}
                >
                  {active===s && (
                    <motion.span
                      layoutId="mobileActiveDot"
                      style={{ width: 6, height: 6, borderRadius: "50%", background: c.blueBright, display: "block", flexShrink: 0 }}
                    />
                  )}
                  <span>{s.charAt(0).toUpperCase() + s.slice(1)}</span>
                  <ChevronRight size={14} style={{ marginLeft: "auto", opacity: 0.4 }} />
                </motion.button>
              ))}

              <motion.a
                href="mailto:shaikhaniscoder07@gmail.com"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 20, padding: "15px", borderRadius: 14, background: `linear-gradient(135deg, ${c.blue}, ${c.blueGlow})`, color: "#fff", fontWeight: 700, fontSize: 15, textDecoration: "none", boxShadow: `0 0 22px ${c.blue}44` }}>
                <Sparkles size={15} /> Hire Me
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ─── TICKER ─────────────────────────────────────────────── */
function Ticker() {
  return (
    <div style={{ overflow: "hidden", borderTop: `1px solid rgba(59,130,246,0.14)`, borderBottom: `1px solid rgba(59,130,246,0.14)`, background: "rgba(37,99,235,0.04)", padding: "14px 0" }}>
      <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{ display: "flex", whiteSpace: "nowrap", width: "max-content" }}>
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 12, paddingRight: 32, color: c.textMuted, fontSize: 12, fontWeight: 500, letterSpacing: "0.06em" }}>
            <motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity, delay: i*0.08 }}>
              <Zap size={10} color={c.blueBright} />
            </motion.span>
            {item.toUpperCase()}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── HERO ───────────────────────────────────────────────── */
function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, 70]);
  const opacity = useTransform(scrollY, [0, 320], [1, 0]);

  return (
    <section id="home" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", position: "relative", overflow: "visible" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "-30%", left: "-15%", width: "min(800px,140vw)", height: "min(800px,140vw)", borderRadius: "50%", background: `radial-gradient(circle, ${c.blue}16 0%, transparent 62%)` }} />
        <div style={{ position: "absolute", top: "5%", right: "-20%", width: "min(600px,100vw)", height: "min(600px,100vw)", borderRadius: "50%", background: `radial-gradient(circle, ${c.cyan}10 0%, transparent 62%)` }} />
        <div style={{ position: "absolute", bottom: "-8%", left: "30%", width: "min(400px,70vw)", height: "min(400px,70vw)", borderRadius: "50%", background: `radial-gradient(circle, ${c.violet}10 0%, transparent 62%)` }} />
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.032 }}>
          <defs>
            <pattern id="grid" width="54" height="54" patternUnits="userSpaceOnUse">
              <path d="M 54 0 L 0 0 0 54" fill="none" stroke={c.blueBright} strokeWidth="0.55"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <motion.div style={{ y, opacity, flex: 1, display: "flex", alignItems: "center", position: "relative", zIndex: 1 }}>
        <div className="hero-grid" style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(100px,15vw,140px) clamp(16px,4vw,24px) clamp(40px,6vw,60px)", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px,5vw,60px)", alignItems: "center" }}>
          <div>
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="avail-mobile"
              style={{ display: "none", alignItems: "center", gap: 8, background: `${c.blue}15`, border: `1px solid ${c.blue}40`, borderRadius: 100, padding: "6px 14px", marginBottom: 24 }}>
              <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.8, repeat: Infinity }}
                style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 10px #22c55e", display: "block" }} />
              <span style={{ color: c.blueBright, fontSize: 13, fontWeight: 500 }}>Available for opportunities</span>
            </motion.div>

            <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${c.blue}12`, border: `1px solid ${c.blue}35`, borderRadius: 100, padding: "7px 18px", marginBottom: 28 }}>
              <motion.span animate={{ rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }}>
                <Cpu size={13} color={c.cyan} />
              </motion.span>
              <span style={{ color: c.textMuted, fontSize: 13, fontWeight: 500 }}>Full Stack & Agentic AI Developer</span>
            </motion.div>

            <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible"
              style={{ fontSize: "clamp(44px,8.5vw,84px)", fontWeight: 900, lineHeight: 1.0, letterSpacing: "-3px", color: c.text, marginBottom: 22, fontFamily: "'Syne', sans-serif" }}>
              Shaikh<br />
              <span style={{ background: `linear-gradient(135deg, ${c.blueBright} 0%, ${c.cyan} 50%, ${c.violet} 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Anis.</span>
            </motion.h1>

            <motion.p custom={2} variants={fadeUp} initial="hidden" animate="visible"
              style={{ fontSize: "clamp(14px,2vw,16px)", color: c.textDim, lineHeight: 1.78, marginBottom: 40, maxWidth: 500 }}>
              Building scalable applications and intelligent AI systems using React, FastAPI, LangChain & RAG pipelines. Based in Coimbatore, India.
            </motion.p>

            <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible"
              style={{ display: "flex", gap: "clamp(18px,4vw,38px)", marginBottom: 42, flexWrap: "wrap" }}>
              {[["400+", "DSA Problems", c.blueBright], ["3+", "AI Projects", c.cyan], ["8.6", "CGPA", c.violet]].map(([num, label, col]) => (
                <div key={label}>
                  <div style={{ fontSize: "clamp(24px,4vw,34px)", fontWeight: 900, letterSpacing: "-1.5px", color: col, textShadow: `0 0 24px ${col}50` }}>{num}</div>
                  <div style={{ fontSize: 11, color: c.textDim, marginTop: 3, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.09em" }}>{label}</div>
                </div>
              ))}
            </motion.div>

            <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <motion.a href="mailto:shaikhaniscoder07@gmail.com"
                whileHover={{ scale: 1.04, boxShadow: `0 0 40px ${c.blue}66` }} whileTap={{ scale: 0.97 }}
                style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "clamp(12px,2vw,14px) clamp(24px,3vw,32px)", borderRadius: 13, background: `linear-gradient(135deg, ${c.blue}, ${c.blueGlow})`, color: "#fff", fontWeight: 700, fontSize: "clamp(13px,2vw,15px)", textDecoration: "none", boxShadow: `0 0 22px ${c.blue}44` }}>
                <Mail size={15} /> Contact Me
              </motion.a>
              <motion.a href="https://github.com/shaikhanis" target="_blank" rel="noreferrer"
                whileHover={{ scale: 1.04, borderColor: c.blue }} whileTap={{ scale: 0.97 }}
                style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "clamp(12px,2vw,14px) clamp(24px,3vw,32px)", borderRadius: 13, background: "transparent", border: `1px solid ${c.border}`, color: c.text, fontWeight: 700, fontSize: "clamp(13px,2vw,15px)", textDecoration: "none", transition: "border-color 0.25s" }}>
                <GitBranch size={15} /> GitHub
              </motion.a>
            </motion.div>
          </div>

          {/* Hero Card */}
          <motion.div className="hero-card" custom={3} variants={scaleIn} initial="hidden" animate="visible"
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 30 }}>
            <motion.div animate={{ y: [-10, 10, -10] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              style={{ position: "relative", padding: "28px 118px 28px" }}>
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "clamp(290px,34vw,370px)", height: "clamp(290px,34vw,370px)", borderRadius: "50%", border: `1px dashed rgba(59,130,246,0.22)`, pointerEvents: "none" }} />
              <motion.div animate={{ rotate: -360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "clamp(248px,30vw,318px)", height: "clamp(248px,30vw,318px)", borderRadius: "50%", border: `1px solid rgba(6,182,212,0.14)`, pointerEvents: "none" }} />
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "clamp(200px,24vw,255px)", height: "clamp(200px,24vw,255px)", borderRadius: "50%", border: `1px dashed rgba(124,58,237,0.14)`, pointerEvents: "none" }} />

              <div style={{ width: "clamp(228px,27vw,292px)", borderRadius: 28, background: "transparent", border: `1px solid rgba(59,130,246,0.25)`, boxShadow: `0 0 120px ${c.blue}28, 0 50px 90px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)`, padding: "clamp(24px,3vw,34px)", textAlign: "center", position: "relative" }}>
                <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                  style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, borderRadius: "50%", border: `1px dashed ${c.blue}44`, pointerEvents: "none" }} />
                <div style={{ position: "relative", width: 90, height: 90, margin: "0 auto 20px" }}>
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    style={{ position: "absolute", inset: -6, borderRadius: "50%", background: `conic-gradient(${c.blue}, ${c.cyan}, ${c.violet}, ${c.blue})`, opacity: 0.5 }} />
                  <div style={{ position: "relative", width: 90, height: 90, borderRadius: "50%", background: `linear-gradient(135deg, ${c.blue}, ${c.cyan})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 900, color: "#fff", boxShadow: `0 0 44px ${c.blue}66`, fontFamily: "monospace", zIndex: 1 }}>SA</div>
                </div>
                <p style={{ color: c.text, fontWeight: 800, fontSize: 19, marginBottom: 4, fontFamily: "'Syne', sans-serif" }}>Shaikh Anis</p>
                <p style={{ color: c.textDim, fontSize: 13, marginBottom: 6 }}>B.E. CSE · SKCT · 2026</p>
                <p style={{ color: c.textDim, fontSize: 12, marginBottom: 22 }}>Coimbatore, India</p>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: `${c.blue}20`, border: `1px solid ${c.blue}45`, borderRadius: 100, padding: "7px 16px" }}>
                  <Award size={13} color={c.blueBright} />
                  <span style={{ color: c.blueBright, fontSize: 12, fontWeight: 700 }}>NPTEL Topper</span>
                </div>
                {[
                  { label: "⚡ FastAPI",   left: -114, top: 24  },
                  { label: "🤖 AI Agents", right: -122, top: 48  },
                  { label: "⚛️ React",     left: -100,  bottom: 48 },
                  { label: "🐳 Docker",    right: -112, bottom: 26 },
                ].map(({ label, left, right, top, bottom }, i) => (
                  <motion.div key={label} animate={{ y: [0, -9, 0] }} transition={{ duration: 3.2+i*0.6, repeat: Infinity, delay: i*0.5 }}
                    style={{ position: "absolute", ...(left!==undefined?{left}:{right}), ...(top!==undefined?{top}:{bottom}), background: "rgba(5,12,24,0.92)", border: `1px solid rgba(59,130,246,0.3)`, borderRadius: 100, padding: "7px 14px", fontSize: 11, color: c.textMuted, fontWeight: 600, whiteSpace: "nowrap", boxShadow: `0 6px 26px rgba(0,0,0,0.55), 0 0 16px ${c.blue}22`, backdropFilter: "blur(14px)" }}>
                    {label}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.7 }}
              style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(34,197,94,0.07)", border: `1px solid rgba(34,197,94,0.25)`, borderRadius: 100, padding: "10px 22px" }}>
              <motion.span animate={{ opacity: [1, 0.3, 1], scale: [1, 1.25, 1] }} transition={{ duration: 2, repeat: Infinity }}
                style={{ width: 9, height: 9, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 14px #22c55e", display: "block", flexShrink: 0 }} />
              <span style={{ color: "#22c55e", fontSize: 13, fontWeight: 700 }}>Available for opportunities</span>
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
    <Section id="skills" style={{ padding: "clamp(80px,10vw,120px) 0" }}>
      <GlowDivider />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(44px,6vw,84px) clamp(16px,4vw,24px) 0" }}>
        <motion.div variants={fadeUp} custom={0} style={{ textAlign: "center", marginBottom: "clamp(50px,7vw,76px)" }}>
          <p style={{ color: c.cyan, fontSize: 12, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 14 }}>What I Work With</p>
          <h2 style={{ fontSize: "clamp(30px,5.5vw,60px)", fontWeight: 900, color: c.text, letterSpacing: "-2px", fontFamily: "'Syne', sans-serif" }}>
            Technical{" "}
            <span style={{ background: `linear-gradient(135deg, ${c.blueBright}, ${c.cyan})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Arsenal</span>
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,280px), 1fr))", gap: "clamp(14px,2vw,22px)" }}>
          {SKILLS.map((group, i) => (
            <motion.div key={group.category} custom={i} variants={fadeUp}
              whileHover={{ y: -7, borderColor: `${c.blue}80`, boxShadow: `0 0 44px ${c.blue}20, 0 22px 44px rgba(0,0,0,0.28)` }}
              style={{ background: "transparent", border: `1px solid rgba(59,130,246,0.15)`, borderRadius: 18, padding: "clamp(18px,3vw,28px)", transition: "all 0.35s ease", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -28, right: -28, width: 90, height: 90, borderRadius: "50%", background: `${c.blue}07`, pointerEvents: "none" }} />
              <div style={{ display: "flex", alignItems: "center", gap: 13, marginBottom: 18 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `linear-gradient(135deg, ${c.blue}28, ${c.cyan}18)`, border: `1px solid ${c.blue}28`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <group.Icon size={20} color={c.blueBright} />
                </div>
                <span style={{ color: c.text, fontWeight: 700, fontSize: 15 }}>{group.category}</span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {group.items.map((item) => (
                  <motion.span key={item} whileHover={{ scale: 1.09, background: `${c.blue}28` }}
                    style={{ background: `${c.blue}10`, border: `1px solid ${c.blue}22`, borderRadius: 8, padding: "5px 12px", color: c.textMuted, fontSize: 12, fontWeight: 500, cursor: "default", transition: "background 0.2s" }}>
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeUp} custom={7} style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginTop: "clamp(34px,5vw,58px)" }}>
          {[
            { icon: <Award size={14} />, label: "NPTEL Student Topper — SKCT", col: c.blueBright },
            { icon: <Star size={14} />, label: "Google Data Analytics — Coursera", col: c.cyan },
            { icon: <Cpu size={14} />, label: "Advanced React — Coursera", col: c.violet },
            { icon: <Code2 size={14} />, label: "Java — NPTEL Certified", col: c.blueBright },
          ].map(({ icon, label, col }) => (
            <motion.div key={label} whileHover={{ scale: 1.05, borderColor: col }}
              style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "transparent", border: `1px solid ${c.blue}28`, borderRadius: 100, padding: "9px 20px", color: col, fontSize: 13, fontWeight: 600, transition: "border-color 0.25s" }}>
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
    <Section id="experience" style={{ padding: "clamp(80px,10vw,120px) 0" }}>
      <GlowDivider />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(44px,6vw,84px) clamp(16px,4vw,24px) 0" }}>
        <motion.div variants={fadeUp} custom={0} style={{ marginBottom: "clamp(42px,6vw,68px)" }}>
          <p style={{ color: c.cyan, fontSize: 12, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 14 }}>Work History</p>
          <h2 style={{ fontSize: "clamp(30px,5.5vw,60px)", fontWeight: 900, color: c.text, letterSpacing: "-2px", fontFamily: "'Syne', sans-serif" }}>Experience</h2>
        </motion.div>

        <motion.div custom={1} variants={fadeUp}
          whileHover={{ borderColor: `${c.blue}60`, boxShadow: `0 0 55px ${c.blue}14, 0 34px 64px rgba(0,0,0,0.28)` }}
          style={{ background: "transparent", border: `1px solid rgba(59,130,246,0.18)`, borderRadius: 24, padding: "clamp(24px,4vw,42px)", marginBottom: 28, position: "relative", overflow: "hidden", transition: "all 0.35s ease" }}>
          <div style={{ position: "absolute", top: 0, left: 0, width: 4, height: "100%", background: `linear-gradient(180deg, ${c.blue}, ${c.cyan}, ${c.violet})` }} />
          <div style={{ position: "absolute", top: -50, right: -50, width: 180, height: 180, borderRadius: "50%", background: `radial-gradient(circle, ${c.blue}09, transparent 70%)`, pointerEvents: "none" }} />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16, marginBottom: 26 }}>
            <div style={{ display: "flex", gap: "clamp(12px,2vw,18px)", alignItems: "center" }}>
              <div style={{ width: 58, height: 58, borderRadius: 16, background: `linear-gradient(135deg, ${c.blue}, ${c.blueGlow})`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 16, color: "#fff", flexShrink: 0, boxShadow: `0 0 28px ${c.blue}44` }}>GW</div>
              <div>
                <h3 style={{ color: c.text, fontWeight: 800, fontSize: "clamp(15px,2.5vw,19px)", marginBottom: 5, lineHeight: 1.3, fontFamily: "'Syne', sans-serif" }}>Agentic AI Full Stack Developer Trainee</h3>
                <p style={{ color: c.textMuted, fontSize: 14 }}>Genworx.ai · Chennai, India</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
              <span style={{ background: `${c.blue}20`, border: `1px solid ${c.blue}45`, color: c.blueBright, borderRadius: 100, padding: "5px 16px", fontSize: 12, fontWeight: 700 }}>Internship</span>
              <span style={{ color: c.textDim, fontSize: 13 }}>Aug 2025 – Feb 2026</span>
            </div>
          </div>

          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              "Developed 3+ full-stack applications using React, Angular, and FastAPI, improving modular architecture, reusability, and development speed.",
              "Designed and implemented Agentic AI workflows using LangChain and LangGraph enabling dynamic decision-making, tool orchestration, and adaptive execution.",
              "Built RAG pipelines integrating PostgreSQL and vector databases for semantic search, contextual retrieval, and improved recommendation relevance.",
              "Applied Docker containerization and explored Kubernetes concepts including deployments, services, and scaling strategies.",
            ].map((point, i) => (
              <motion.li key={i} custom={i+2} variants={fadeUp} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: `${c.blue}18`, border: `1px solid ${c.blue}40`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                  <ChevronRight size={12} color={c.blueBright} />
                </div>
                <span style={{ color: c.textMuted, fontSize: "clamp(13px,2vw,14px)", lineHeight: 1.72 }}>{point}</span>
              </motion.li>
            ))}
          </ul>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {["React", "Angular", "FastAPI", "LangChain", "LangGraph", "RAG", "Docker", "PostgreSQL"].map(t => (
              <span key={t} style={{ background: `${c.blue}10`, border: `1px solid ${c.blue}28`, borderRadius: 8, padding: "5px 13px", color: c.blueBright, fontSize: 12, fontWeight: 600 }}>{t}</span>
            ))}
          </div>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,300px), 1fr))", gap: 22 }}>
          {[
            { icon: <GraduationCap size={22} color={c.cyan} />, degree: "B.E. Computer Science & Engineering", school: "Sri Krishna College of Technology · 2022–2026", grade: "CGPA: 8.6", col: c.cyan },
            { icon: <Briefcase size={22} color={c.violet} />, degree: "Higher Secondary Education", school: "St. Antony's Matric Hr Sec School", grade: "Class 12: 91% · Class 10: 90%", col: c.violet },
          ].map(({ icon, degree, school, grade, col }) => (
            <motion.div key={degree} custom={6} variants={fadeUp}
              whileHover={{ borderColor: col, boxShadow: `0 0 32px ${col}14` }}
              style={{ background: "transparent", border: `1px solid rgba(59,130,246,0.15)`, borderRadius: 18, padding: "clamp(18px,3vw,28px)", display: "flex", gap: 18, alignItems: "flex-start", transition: "all 0.3s ease" }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: `${col}16`, border: `1px solid ${col}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{icon}</div>
              <div>
                <p style={{ color: c.text, fontWeight: 700, fontSize: 15, marginBottom: 5 }}>{degree}</p>
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

/* ─── PROJECTS ───────────────────────────────────────────── */
function Projects() {
  return (
    <Section id="projects" style={{ padding: "clamp(80px,10vw,120px) 0" }}>
      <GlowDivider />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(44px,6vw,84px) clamp(16px,4vw,24px) 0" }}>
        <motion.div variants={fadeUp} custom={0} style={{ textAlign: "center", marginBottom: "clamp(50px,7vw,76px)" }}>
          <p style={{ color: c.cyan, fontSize: 12, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 14 }}>My Work</p>
          <h2 style={{ fontSize: "clamp(30px,5.5vw,60px)", fontWeight: 900, color: c.text, letterSpacing: "-2px", fontFamily: "'Syne', sans-serif" }}>
            Featured{" "}
            <span style={{ background: `linear-gradient(135deg, ${c.blueBright}, ${c.cyan})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Projects</span>
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,320px), 1fr))", gap: "clamp(18px,2.5vw,28px)" }}>
          {PROJECTS.map((proj, i) => (
            <motion.div key={proj.id} custom={i+1} variants={fadeUp}
              whileHover={{ y: -12, boxShadow: `0 36px 80px ${proj.accent}20, 0 0 0 1px ${proj.accent}45` }}
              style={{ background: "transparent", border: `1px solid rgba(59,130,246,0.15)`, borderRadius: 24, padding: "clamp(24px,3vw,34px)", position: "relative", overflow: "hidden", transition: "all 0.4s ease" }}>
              <div style={{ position: "absolute", top: 0, right: 0, width: 140, height: 140, borderRadius: "0 24px 0 140px", background: `${proj.accent}0b`, pointerEvents: "none" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, width: 90, height: 90, borderRadius: "0 90px 0 24px", background: `${proj.accent}06`, pointerEvents: "none" }} />

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
                <motion.div whileHover={{ scale: 1.14, rotate: 7 }}
                  style={{ width: 60, height: 60, borderRadius: 17, background: `${proj.accent}20`, border: `1px solid ${proj.accent}38`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 24px ${proj.accent}22` }}>
                  <proj.Icon size={30} color={proj.accent} strokeWidth={1.5} />
                </motion.div>
                <span style={{ background: `${proj.accent}18`, border: `1px solid ${proj.accent}42`, color: proj.accent, borderRadius: 100, padding: "5px 16px", fontSize: 11, fontWeight: 800, letterSpacing: "0.09em" }}>{proj.tag}</span>
              </div>

              <h3 style={{ color: c.text, fontWeight: 800, fontSize: "clamp(15px,2.5vw,18px)", marginBottom: 14, lineHeight: 1.35, fontFamily: "'Syne', sans-serif" }}>{proj.title}</h3>
              <p style={{ color: c.textDim, fontSize: "clamp(12px,2vw,14px)", lineHeight: 1.72, marginBottom: 24 }}>{proj.desc}</p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
                {proj.stack.map((s) => (
                  <span key={s} style={{ background: `${c.blue}10`, border: `1px solid ${c.blue}22`, borderRadius: 8, padding: "4px 11px", color: c.textMuted, fontSize: 11, fontWeight: 500 }}>{s}</span>
                ))}
              </div>

              <motion.a href={proj.link} target="_blank" rel="noreferrer" whileHover={{ gap: 14 }}
                style={{ display: "inline-flex", alignItems: "center", gap: 8, color: proj.accent, fontWeight: 700, fontSize: 14, textDecoration: "none", transition: "gap 0.2s" }}>
                <ExternalLink size={14} /> View Project
              </motion.a>

              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${proj.accent}, ${proj.accent}00)` }} />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─── CONTACT ────────────────────────────────────────────── */
function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText("shaikhaniscoder07@gmail.com"); setCopied(true); setTimeout(() => setCopied(false), 2200); };

  return (
    <Section id="contact" style={{ padding: "clamp(80px,10vw,120px) 0" }}>
      <GlowDivider />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(44px,6vw,84px) clamp(16px,4vw,24px) 0" }}>
        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(36px,5vw,68px)", alignItems: "start" }}>
          <div>
            <motion.p variants={fadeUp} custom={0} style={{ color: c.cyan, fontSize: 12, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 14 }}>Get In Touch</motion.p>
            <motion.h2 variants={fadeUp} custom={1}
              style={{ fontSize: "clamp(30px,5.5vw,60px)", fontWeight: 900, color: c.text, letterSpacing: "-2px", marginBottom: 22, lineHeight: 1.05, fontFamily: "'Syne', sans-serif" }}>
              Let's Build<br />Something{" "}
              <span style={{ background: `linear-gradient(135deg, ${c.blueBright}, ${c.cyan})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Great</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} style={{ color: c.textDim, fontSize: "clamp(13px,2vw,15px)", lineHeight: 1.78, marginBottom: 46 }}>
              Open to full-time roles, freelance projects, and AI/Full Stack collaborations. Based in Coimbatore — available remotely worldwide.
            </motion.p>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { icon: <Mail size={16} color={c.blueBright} />, label: "shaikhaniscoder07@gmail.com", href: "mailto:shaikhaniscoder07@gmail.com" },
                { icon: <Phone size={16} color={c.cyan} />, label: "+91 7548899769", href: "tel:+917548899769" },
                { icon: <FaLinkedin size={16} color={c.blueBright} />, label: "LinkedIn Profile", href: "https://linkedin.com" },
                { icon: <GitBranch size={16} color={c.violet} />, label: "GitHub Profile", href: "https://github.com/shaikhanis" },
              ].map(({ icon, label, href }, i) => (
                <motion.a key={label} custom={i+3} variants={fadeUp} href={href} target="_blank" rel="noreferrer"
                  whileHover={{ x: 9 }}
                  style={{ display: "inline-flex", alignItems: "center", gap: 14, color: c.textMuted, textDecoration: "none", fontSize: 14, fontWeight: 500, transition: "color 0.2s" }}>
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: `${c.blue}12`, border: `1px solid ${c.blue}22`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{icon}</div>
                  <span style={{ fontSize: "clamp(12px,2vw,14px)" }}>{label}</span>
                  <ArrowUpRight size={13} style={{ marginLeft: "auto", opacity: 0.38 }} />
                </motion.a>
              ))}
            </div>
          </div>

          <motion.div variants={scaleIn} custom={1}>
            <div style={{ background: "transparent", border: `1px solid rgba(59,130,246,0.18)`, borderRadius: 28, padding: "clamp(24px,4vw,42px)", boxShadow: `0 0 90px ${c.blue}12`, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -55, right: -55, width: 190, height: 190, borderRadius: "50%", background: `radial-gradient(circle, ${c.blue}09, transparent 70%)`, pointerEvents: "none" }} />

              <p style={{ color: c.textDim, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.13em", marginBottom: 20 }}>Drop a message</p>

              <motion.div onClick={copy} whileHover={{ borderColor: c.blue, boxShadow: `0 0 26px ${c.blue}20` }} whileTap={{ scale: 0.98 }}
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(3,11,22,0.5)", border: `1px solid ${c.border}`, borderRadius: 14, padding: "14px 18px", cursor: "pointer", marginBottom: 16, transition: "all 0.2s" }}>
                <span style={{ color: c.textMuted, fontSize: "clamp(11px,1.8vw,13px)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>shaikhaniscoder07@gmail.com</span>
                <AnimatePresence mode="wait">
                  {copied
                    ? <motion.span key="c" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Check size={16} color="#22c55e" /></motion.span>
                    : <motion.span key="d" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Copy size={16} color={c.blueBright} /></motion.span>}
                </AnimatePresence>
              </motion.div>

              <motion.a href="mailto:shaikhaniscoder07@gmail.com"
                whileHover={{ scale: 1.02, boxShadow: `0 0 34px ${c.blue}55` }} whileTap={{ scale: 0.97 }}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 9, padding: 16, borderRadius: 14, background: `linear-gradient(135deg, ${c.blue}, ${c.blueGlow})`, color: "#fff", fontWeight: 700, fontSize: 15, textDecoration: "none", marginBottom: 24, boxShadow: `0 0 22px ${c.blue}44` }}>
                <Mail size={16} /> Send Email
              </motion.a>

              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${c.border})` }} />
                <span style={{ color: c.textDim, fontSize: 12 }}>or connect on</span>
                <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${c.border}, transparent)` }} />
              </div>

              <div style={{ display: "flex", gap: 12 }}>
                {[
                  { label: "LinkedIn", icon: <FaLinkedin size={15} />, href: "https://linkedin.com" },
                  { label: "GitHub", icon: <GitBranch size={15} />, href: "https://github.com/shaikhanis" },
                ].map(({ label, icon, href }) => (
                  <motion.a key={label} href={href} target="_blank" rel="noreferrer"
                    whileHover={{ scale: 1.05, borderColor: c.blue }}
                    style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: 14, borderRadius: 14, border: `1px solid ${c.border}`, color: c.textMuted, fontWeight: 600, fontSize: 14, textDecoration: "none", transition: "border-color 0.2s" }}>
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
    <footer style={{ borderTop: `1px solid rgba(59,130,246,0.12)`, background: "transparent", padding: "34px clamp(16px,4vw,24px)", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: `linear-gradient(135deg, ${c.blue}, ${c.cyan})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 900, color: "#fff", boxShadow: `0 0 16px ${c.blue}44` }}>SA</div>
          <span style={{ color: c.textMuted, fontSize: 13 }}>Shaikh Anis · Coimbatore, India</span>
        </div>
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          <p style={{ color: c.textDim, fontSize: 13 }}>Built with React & Three.js</p>
          <p style={{ color: c.textDim, fontSize: 13 }}>© 2025 All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}

/* ─── GLOBAL STYLES ──────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800;900&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      background: #020810;
      color: #f0f6ff;
      font-family: 'DM Sans', sans-serif;
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
    }
    h1, h2, h3 { font-family: 'Syne', sans-serif; }
    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: #020810; }
    ::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #2563eb, #06b6d4); border-radius: 4px; }
    @media (max-width: 768px) {
      .hero-grid { grid-template-columns: 1fr !important; }
      .hero-card { display: none !important; }
      .contact-grid { grid-template-columns: 1fr !important; }
      .nav-desktop { display: none !important; }
      .nav-mobile-btn { display: flex !important; }
    }
    @media (max-width: 480px) { .hero-grid { padding-top: 96px !important; } }
    .avail-mobile { display: none; }
    @media (max-width: 768px) { .avail-mobile { display: inline-flex !important; } }
  `}</style>
);

/* ─── APP ────────────────────────────────────────────────── */
export default function App() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = ["home", "skills", "experience", "projects", "contact"];
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.25 }
    );
    sections.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <GlobalStyles />
      <ThreeBackground />
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