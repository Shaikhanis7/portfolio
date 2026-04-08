# Shaikh Anis — Portfolio

<div align="center">

![Portfolio Banner](https://img.shields.io/badge/Full%20Stack%20%26%20Agentic%20AI%20Developer-Shaikh%20Anis-2563eb?style=for-the-badge&logoColor=white)

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Portfolio-06b6d4?style=for-the-badge)](https://shaikhanis.dev)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin)](https://linkedin.com)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github)](https://github.com/shaikhanis)
[![Email](https://img.shields.io/badge/Email-Hire%20Me-2563eb?style=for-the-badge&logo=gmail)](mailto:shaikhaniscoder07@gmail.com)

</div>

---

## About

Personal developer portfolio for **Shaikh Anis** — Full Stack & Agentic AI Developer based in Coimbatore, India. Built with React 18, Three.js, and Framer Motion featuring a deep space aesthetic with 10-layer Three.js particle systems, animated DNA helixes, neural network graphs, and shooting stars.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite |
| 3D Graphics | Three.js (r128) |
| Animations | Framer Motion v11 |
| Icons | Lucide React + React Icons |
| Fonts | Syne (display) · DM Sans (body) |
| Styling | Inline CSS + CSS-in-JS |

---

## Features

- **10-layer Three.js background** — star fields, nebula clouds, neural network, DNA double helix, wireframe geometries, energy rings, aurora ribbons, shooting stars
- **Parallax scroll** — camera follows page scroll through the 3D scene
- **Mouse tracking** — particle clouds react to cursor movement
- **Framer Motion** — staggered section reveals, hover lift effects, hero parallax
- **Active nav detection** — IntersectionObserver highlights the current section
- **Mobile responsive** — hero card hides, grid collapses, offcanvas drawer nav
- **Smooth scroll** — drawer closes first, then scrolls after animation completes
- **Copy to clipboard** — one-click email copy in the contact section

---

## Sections

| Section | Description |
|---|---|
| **Hero** | Name, title, stats (400+ DSA, 3+ AI projects, 8.6 CGPA), floating tech badges, availability status |
| **Skills** | 6 skill groups — Languages, Frontend, Backend, Databases, AI/ML, DevOps + certification badges |
| **Experience** | Internship at Genworx.ai (Agentic AI Full Stack Developer Trainee) + education cards |
| **Projects** | IntelliHire (Featured), Agentic RAG Mental Health Assistant, Freelancer Web App |
| **Contact** | Email copy, direct mail button, LinkedIn + GitHub links |

---

## Projects Showcased

### IntelliHire — Agentic AI Recruitment Platform
Autonomous recruitment engine with a 6-pass pipeline. Searches candidates, applies hybrid vector + LLM scoring, and delivers ranked shortlists.
`React` `FastAPI` `PostgreSQL` `Celery` `Redis` `AWS` `Groq LLM` `Gemini Embeddings`
→ [github.com/Shaikhanis7/IntelliHire](https://github.com/Shaikhanis7/IntelliHire)

### Agentic RAG Mental Health Assistant
Multi-agent AI assistant with Retrieval-Augmented Generation, memory, and tool-calling for contextual mental health responses.
`LangGraph` `LangChain` `React` `FastAPI`

### Freelancer Web Application
Full-stack platform with JWT auth, RBAC with Spring Security, REST APIs, and JPA/Hibernate ORM.
`React` `Spring Boot` `MySQL`

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/shaikhanis/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start dev server
npm run dev
# → http://localhost:5173

# Build for production
npm run build
```

---

## Project Structure

```
src/
├── App.jsx           # All components (single-file architecture)
│   ├── ThreeBackground   # 10-layer Three.js canvas
│   ├── Navbar            # Fixed nav with active detection
│   ├── Ticker            # Scrolling skills marquee
│   ├── Hero              # Landing section with 3D card
│   ├── Skills            # Tech arsenal grid
│   ├── Experience        # Work & education timeline
│   ├── Projects          # Featured project cards
│   ├── Contact           # Contact form & links
│   └── Footer
├── main.jsx          # Entry point
└── index.html
```

---

## Three.js Scene Layers

| Layer | Description |
|---|---|
| L1 | Deep star field — 6,000 white particles |
| L2 | Blue nebula cloud — slow rotation |
| L3 | Cyan mist — counter-rotation |
| L4 | Violet dust — subtle drift |
| L5 | Neural network — 100 nodes with edges |
| L6 | Shooting stars — 22 animated comets |
| L7 | DNA double helix — blue + cyan strands |
| L8 | Wireframe geometries — TorusKnot, Icosahedron, Octahedron, Dodecahedron |
| L9 | Energy rings — 6 floating torus rings |
| L10 | Aurora ribbons — sine-wave light bands |

---

## Performance

- `Math.min(devicePixelRatio, 2)` — caps pixel ratio for mobile
- Particle counts halved on screens < 768px
- `passive: true` on scroll listeners
- RAF-based animation loop with proper cleanup on unmount

---

## Contact

| Channel | Details |
|---|---|
| Email | shaikhaniscoder07@gmail.com |
| Phone | +91 7548899769 |
| Location | Coimbatore, India |
| Availability | Open to full-time, freelance & remote |

---

## Achievements

- **NPTEL Student Topper** — Sri Krishna College of Technology
- **Google Data Analytics** — Coursera Certified
- **Advanced React** — Coursera Certified
- **Java** — NPTEL Certified
- **400+ DSA Problems** solved
- **CGPA: 8.6** — B.E. CSE, SKCT (2022–2026)

---

<div align="center">

Built with React & Three.js · © 2025 Shaikh Anis · Coimbatore, India

</div>
