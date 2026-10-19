/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, X, ExternalLink, Sparkles, CheckCircle2, ChevronRight, Mail, Github, Twitter, Linkedin, Award, Code, Palette, Play } from 'lucide-react';

// Interfaces
interface Project {
  id: string;
  title: string;
  category: 'Branding' | 'Motion' | '3D' | 'Web';
  client: string;
  year: string;
  image: string;
  description: string;
  deliverables: string[];
  metrics: string;
  awards?: string;
}

interface Article {
  id: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
  summary: string;
  content: string;
}

export default function App() {
  // State
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'All' | 'Branding' | 'Motion' | '3D' | 'Web'>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [aboutTab, setAboutTab] = useState<'philosophy' | 'experience' | 'recognition' | 'clients'>('philosophy');
  
  // Inquiry Form State
  const [formStep, setFormStep] = useState(1);
  const [projectType, setProjectType] = useState<string>('Branding & Visual Identity');
  const [budget, setBudget] = useState<string>('$10k - $25k');
  const [timeline, setTimeline] = useState<string>('1 - 3 Months');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientMessage, setClientMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Spotlight Canvas Ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const revealImgRef = useRef<HTMLDivElement | null>(null);

  // Spotlight Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    const imgLayer = revealImgRef.current;
    if (!canvas || !imgLayer) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const SPOTLIGHT_R = 260;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const mouse = { x: -999, y: -999 };
    const smooth = { x: -999, y: -999 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;
    const loop = () => {
      smooth.x += (mouse.x - smooth.x) * 0.1;
      smooth.y += (mouse.y - smooth.y) * 0.1;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const grad = ctx.createRadialGradient(smooth.x, smooth.y, 0, smooth.x, smooth.y, SPOTLIGHT_R);
      grad.addColorStop(0, 'rgba(255,255,255,1)');
      grad.addColorStop(0.4, 'rgba(255,255,255,1)');
      grad.addColorStop(0.6, 'rgba(255,255,255,0.75)');
      grad.addColorStop(0.75, 'rgba(255,255,255,0.4)');
      grad.addColorStop(0.88, 'rgba(255,255,255,0.12)');
      grad.addColorStop(1, 'rgba(255,255,255,0)');

      ctx.beginPath();
      ctx.arc(smooth.x, smooth.y, SPOTLIGHT_R, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      const dataUrl = canvas.toDataURL();
      imgLayer.style.webkitMaskImage = `url(${dataUrl})`;
      imgLayer.style.maskImage = `url(${dataUrl})`;
      imgLayer.style.webkitMaskSize = '100% 100%';
      imgLayer.style.maskSize = '100% 100%';

      animationFrameId = requestAnimationFrame(loop);
    };
    animationFrameId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Projects data
  const projects: Project[] = [
    {
      id: 'lumina',
      title: 'Lumina Spatial OS',
      category: 'Web',
      client: 'Lumina Technologies',
      year: '2026',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      description: 'Next-generation spatial computing interface and design system engineered for immersive AR/VR workspaces.',
      deliverables: ['Design System', 'Spatial UI Components', 'Brand Identity', 'Interactive Prototyping'],
      metrics: '350% increase in user session duration & Red Dot Best of the Best 2025',
      awards: 'Red Dot Best of the Best 2025'
    },
    {
      id: 'kinetic',
      title: 'Kinetic Soundwave',
      category: 'Motion',
      client: 'Aura Audio Lab',
      year: '2025',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      description: 'Generative sound branding and fluid motion typography for high-end acoustic hardware launches.',
      deliverables: ['3D Motion Design', 'Generative Soundscapes', 'Product Launch Video', 'Typography'],
      metrics: '12M+ organic views on social launch channels'
    },
    {
      id: 'chroma',
      title: 'Chroma Botanica',
      category: 'Branding',
      client: 'Botanica Essence',
      year: '2025',
      image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1200&q=80',
      description: 'Organic identity and sustainable packaging system for luxury botanical skincare products.',
      deliverables: ['Brand Strategy', 'Visual Identity', 'Sustainable Packaging', 'E-commerce UI'],
      metrics: 'Sold out 90% of inventory within 48 hours of launch'
    },
    {
      id: 'velox',
      title: 'Velox Hypercar UI',
      category: '3D',
      client: 'Velox Motors',
      year: '2025',
      image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80',
      description: 'Futuristic digital cockpit dashboard and holographic HUD experience for electric hypercars.',
      deliverables: ['Real-time 3D UI', 'HMI Architecture', 'Driver Experience', 'Motion Design'],
      metrics: 'Featured at Geneva Motor Show Concept Pavilion'
    },
    {
      id: 'solaris',
      title: 'Solaris Energy Hub',
      category: 'Web',
      client: 'Solaris Clean Tech',
      year: '2026',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      description: 'Immersive storytelling website showcasing renewable smart grids and decentralized energy networks.',
      deliverables: ['WebGL Experiences', 'Interactive Data Visualization', 'Brand Guidelines'],
      metrics: 'Awwwards Site of the Day & Developer Award'
    },
    {
      id: 'neura',
      title: 'Neura AI Workspace',
      category: 'Branding',
      client: 'Neura Intelligence',
      year: '2026',
      image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80',
      description: 'Brand identity and product ecosystem for an advanced human-AI collaboration platform.',
      deliverables: ['Logo & Typography', 'Design System', 'Marketing Website', 'Motion Guidelines'],
      metrics: 'Series A funding secured at $45M valuation'
    }
  ];

  // Articles data
  const articles: Article[] = [
    {
      id: 'art-1',
      title: 'The Architecture of Fluid Motion in Modern Web Design',
      date: 'October 12, 2026',
      readTime: '5 min read',
      category: 'Motion Design',
      summary: 'Exploring how physics-based animation and micro-interactions elevate digital products from functional to emotional.',
      content: 'Fluid motion is no longer just decorative; it is the cognitive glue that helps users build mental models of digital spaces. By leveraging spring physics, non-linear easing, and GPU-accelerated canvas masks, designers can create interfaces that feel alive and responsive...'
    },
    {
      id: 'art-2',
      title: 'Spatial Computing & The Death of Flat UI Paradigms',
      date: 'September 28, 2026',
      readTime: '7 min read',
      category: 'Spatial UI',
      summary: 'Why spatial design systems require depth, lighting consistency, and typography anchored in three-dimensional coordinates.',
      content: 'As mixed reality headsets and spatial displays become ubiquitous, traditional 2D CSS layout paradigms fall short. We examine how depth, gaze-based interaction, and volumetric sound transform human-computer interaction...'
    },
    {
      id: 'art-3',
      title: 'Minimalism Reconsidered: Warmth in Digital Craft',
      date: 'September 14, 2026',
      readTime: '4 min read',
      category: 'Branding',
      summary: 'Balancing Swiss typographical rigor with tactile organic textures to create memorable high-end brand identities.',
      content: 'Cold minimalism has dominated tech for a decade. Today, boutique studios are reintroducing warmth through subtle imperfections, tactile paper grains, custom serif typography, and organic color palettes...'
    }
  ];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#E4E4E4] text-[#F4F1E8] font-['Inter'] selection:bg-[#75C5DE] selection:text-[#111111]">
      
      {/* SPLASH SCREEN */}
      <div className="splash" id="splash">
        <div className="splash-row splash-row-top">
          <div className="splash-box"></div>
          <div className="splash-box"></div>
          <div className="splash-box"></div>
          <div className="splash-box"></div>
          <div className="splash-box"></div>
        </div>
        <div className="splash-row splash-row-bottom">
          <div className="splash-box"></div>
          <div className="splash-box"></div>
          <div className="splash-box"></div>
          <div className="splash-box"></div>
          <div className="splash-box"></div>
        </div>
      </div>

      {/* LOGO */}
      <div className="logo-wrapper">
        <div className="inner">
          <a href="#" aria-label="Home" className="flex items-center gap-2">
            <img src="https://framerusercontent.com/images/VMcS7YYTM5PXfXvlHc9u3hSCMM.svg" alt="Logo"/>
          </a>
        </div>
      </div>

      {/* BURGER MENU BUTTON */}
      <div className="burger-wrapper">
        <div className="inner">
          <button 
            className={`burger-btn ${menuOpen ? 'open' : ''}`} 
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>
      </div>

      {/* MENU PANEL */}
      <div className={`menu-panel ${menuOpen ? 'open' : ''}`} id="menu-panel">
        <nav>
          <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#blog" onClick={() => setMenuOpen(false)}>Blog</a>
          <a href="#contact" onClick={() => { setMenuOpen(false); setInquiryOpen(true); }}>Contact</a>
        </nav>
        <div className="menu-contact">
          <a href="mailto:studio@norakessler.com" className="menu-email">studio@norakessler.com</a>
          <div className="menu-socials">
            <a href="https://pinterest.com" target="_blank" rel="noreferrer">Pinterest</a>
            <a href="https://behance.net" target="_blank" rel="noreferrer">Behance</a>
            <a href="https://letterboxd.com" target="_blank" rel="noreferrer">Letterboxd</a>
            <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>
        <div style={{ marginTop: '32px' }}>
          <button className="menu-cta-btn" onClick={() => { setMenuOpen(false); setInquiryOpen(true); }}>
            <span className="menu-cta-bg"></span>
            <span className="menu-cta-text">Let's talk</span>
            <span className="menu-cta-circle">
              <svg width="14" height="14" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 13L13 5M13 5H6M13 5V12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </button>
        </div>
      </div>

      {/* HERO SECTION */}
      <main className="hero">
        {/* Big text behind image */}
        <div className="hero-big-text creator-text-animate">
          <h2>Visuals</h2>
        </div>

        {/* Base image */}
        <div 
          className="hero-base-img hero-image-animate"
          style={{ backgroundImage: "url('https://soft-zoom-63098134.figma.site/_assets/v11/5c9f982199fde1d9b85a20e5396f0fa7bacaf9a3.png?w=2560')" }}
        ></div>

        {/* Reveal layer & Canvas */}
        <canvas id="reveal-canvas" ref={canvasRef}></canvas>
        <div 
          className="hero-reveal-img" 
          id="reveal-img"
          ref={revealImgRef}
          style={{ backgroundImage: "url('https://soft-zoom-63098134.figma.site/_assets/v11/6be2165e31648955b4e071f4cf2a50bc572b9bfd.png?w=1536')" }}
        ></div>

        {/* Content */}
        <div className="hero-content">
          <div className="hero-content-inner">
            <h1 className="hero-headline" id="headline">
              {"I build compelling visual stories & motion that make ideas shine.".split(' ').map((word, i) => (
                <span 
                  key={i} 
                  className="word-reveal" 
                  style={{ animationDelay: `${1 + i * 0.05}s` }}
                >
                  {word}&nbsp;
                </span>
              ))}
            </h1>
            <button className="cta-btn cta-animate" onClick={() => setInquiryOpen(true)}>
              <span className="cta-btn-bg"></span>
              <span className="cta-btn-text">Start a project now</span>
              <span className="cta-btn-circle">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 13L13 5M13 5H6M13 5V12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </main>

      {/* PORTFOLIO / WORK SECTION */}
      <section id="work" className="py-24 px-6 md:px-16 bg-[#111111] text-[#F4F1E8]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-[#75C5DE] font-mono text-sm tracking-widest uppercase mb-3 block">Selected Works</span>
              <h2 className="text-4xl md:text-6xl font-light tracking-tight">Crafting Digital Excellence</h2>
            </div>
            
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 bg-[#1A1A1A] p-1.5 rounded-full border border-[#333333]">
              {(['All', 'Branding', 'Motion', '3D', 'Web'] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    activeFilter === cat 
                      ? 'bg-[#75C5DE] text-[#111111]' 
                      : 'text-[#9A9590] hover:text-[#F4F1E8]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <div 
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer bg-[#1A1A1A] rounded-2xl overflow-hidden border border-[#2A2A2A] hover:border-[#75C5DE] transition-all duration-500 flex flex-col"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#222]">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 left-4 bg-[#111111]/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-[#75C5DE] border border-[#333]">
                    {project.category}
                  </div>
                  {project.awards && (
                    <div className="absolute top-4 right-4 bg-[#75C5DE] text-[#111] px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" /> {project.awards}
                    </div>
                  )}
                </div>
                <div className="p-8 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="flex justify-between items-center text-sm text-[#9A9590] mb-2 font-mono">
                      <span>{project.client}</span>
                      <span>{project.year}</span>
                    </div>
                    <h3 className="text-2xl font-semibold mb-3 group-hover:text-[#75C5DE] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-[#9A9590] text-sm leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-6 border-t border-[#2A2A2A] flex items-center justify-between text-sm font-medium">
                    <span className="text-[#F4F1E8] group-hover:text-[#75C5DE] transition-colors flex items-center gap-2">
                      View Case Study <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="text-xs text-[#666] font-mono">{project.metrics.split('&')[0]}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-24 px-6 md:px-16 bg-[#E4E4E4] text-[#111111]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <span className="text-[#555] font-mono text-sm tracking-widest uppercase mb-3 block">About The Studio</span>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight mb-6">
                Where design rigor meets unrestrained imagination.
              </h2>
              <p className="text-[#555] text-lg leading-relaxed mb-8">
                Founded by Nora Kessler, our independent creative studio partners with forward-thinking visionaries, disruptive tech leaders, and luxury brands to craft immersive digital experiences.
              </p>
              
              {/* Tab Selector */}
              <div className="flex flex-wrap gap-3 border-t border-[#D0D0D0] pt-6">
                {(['philosophy', 'experience', 'recognition', 'clients'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setAboutTab(tab)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                      aboutTab === tab 
                        ? 'bg-[#111111] text-[#F4F1E8]' 
                        : 'bg-[#D5D5D5] text-[#444] hover:bg-[#C8C8C8]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 bg-[#F4F1E8] rounded-3xl p-8 md:p-12 border border-[#D5D5D5]">
              {aboutTab === 'philosophy' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold">Design Philosophy</h3>
                  <p className="text-[#444] leading-relaxed">
                    We believe that true aesthetic resonance arises from uncompromising attention to detail, tactile typography, and fluid physics-based motion. Every pixel is intentional; every interaction tells a story.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    <div className="p-5 rounded-2xl bg-[#EBE7DF] border border-[#DDD5C9]">
                      <h4 className="font-semibold text-lg mb-2">01. Emotion First</h4>
                      <p className="text-sm text-[#666]">Interfaces should evoke wonder and curiosity, forging memorable brand connections.</p>
                    </div>
                    <div className="p-5 rounded-2xl bg-[#EBE7DF] border border-[#DDD5C9]">
                      <h4 className="font-semibold text-lg mb-2">02. Uncompromising Craft</h4>
                      <p className="text-sm text-[#666]">We obsess over typographic hierarchy, micro-interactions, and buttery-smooth frame rates.</p>
                    </div>
                  </div>
                </div>
              )}

              {aboutTab === 'experience' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold">Studio Experience</h3>
                  <div className="space-y-4">
                    <div className="border-l-2 border-[#111] pl-4 py-1">
                      <span className="text-xs font-mono text-[#666]">2022 — Present</span>
                      <h4 className="font-semibold text-lg">Principal Director & Founder</h4>
                      <p className="text-sm text-[#555]">Studio Kessler, London & San Francisco</p>
                    </div>
                    <div className="border-l-2 border-[#CCC] pl-4 py-1">
                      <span className="text-xs font-mono text-[#666]">2019 — 2022</span>
                      <h4 className="font-semibold text-lg">Lead Design Technologist</h4>
                      <p className="text-sm text-[#555]">Pentagram Design Lab</p>
                    </div>
                    <div className="border-l-2 border-[#CCC] pl-4 py-1">
                      <span className="text-xs font-mono text-[#666]">2016 — 2019</span>
                      <h4 className="font-semibold text-lg">Senior Motion Designer</h4>
                      <p className="text-sm text-[#555]">R/GA & Apple Interactive Group</p>
                    </div>
                  </div>
                </div>
              )}

              {aboutTab === 'recognition' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold">Awards & Honors</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-[#EBE7DF] border border-[#DDD5C9]">
                      <span className="text-xs font-mono text-[#75C5DE] bg-[#111] px-2 py-0.5 rounded">2025</span>
                      <h4 className="font-semibold mt-2">Red Dot Best of the Best</h4>
                      <p className="text-xs text-[#666] mt-1">Lumina Spatial OS</p>
                    </div>
                    <div className="p-4 rounded-xl bg-[#EBE7DF] border border-[#DDD5C9]">
                      <span className="text-xs font-mono text-[#75C5DE] bg-[#111] px-2 py-0.5 rounded">2025</span>
                      <h4 className="font-semibold mt-2">Awwwards Site of the Year Nominee</h4>
                      <p className="text-xs text-[#666] mt-1">Solaris Energy Hub</p>
                    </div>
                    <div className="p-4 rounded-xl bg-[#EBE7DF] border border-[#DDD5C9]">
                      <span className="text-xs font-mono text-[#75C5DE] bg-[#111] px-2 py-0.5 rounded">2024</span>
                      <h4 className="font-semibold mt-2">FWA of the Day (x3)</h4>
                      <p className="text-xs text-[#666] mt-1">Interactive Web Experiences</p>
                    </div>
                    <div className="p-4 rounded-xl bg-[#EBE7DF] border border-[#DDD5C9]">
                      <span className="text-xs font-mono text-[#75C5DE] bg-[#111] px-2 py-0.5 rounded">2023</span>
                      <h4 className="font-semibold mt-2">Type Directors Club Award</h4>
                      <p className="text-xs text-[#666] mt-1">Kinetic Soundwave Typography</p>
                    </div>
                  </div>
                </div>
              )}

              {aboutTab === 'clients' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold">Trusted Collaborators</h3>
                  <p className="text-[#555] text-sm">Proud to have partnered with world-class brands and innovative startups.</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                    {['Apple', 'Nike', 'Lumina', 'Velox', 'Botanica', 'Aura Audio', 'Neura AI', 'Solaris', 'Vogue Global'].map((client, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-[#EBE7DF] border border-[#DDD5C9] text-center font-medium text-[#222]">
                        {client}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* BLOG / INSIGHTS SECTION */}
      <section id="blog" className="py-24 px-6 md:px-16 bg-[#111111] text-[#F4F1E8]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-[#75C5DE] font-mono text-sm tracking-widest uppercase mb-3 block">Insights & Essays</span>
              <h2 className="text-4xl md:text-6xl font-light tracking-tight">Thoughts on Craft & Code</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((article) => (
              <div 
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className="group cursor-pointer bg-[#1A1A1A] rounded-2xl p-8 border border-[#2A2A2A] hover:border-[#75C5DE] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#9A9590] mb-4">
                    <span className="bg-[#262626] text-[#75C5DE] px-3 py-1 rounded-full">{article.category}</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-[#75C5DE] transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-[#9A9590] text-sm leading-relaxed">
                    {article.summary}
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-[#2A2A2A] flex items-center justify-between text-sm text-[#F4F1E8]">
                  <span className="font-mono text-xs text-[#666]">{article.date}</span>
                  <span className="group-hover:translate-x-1 transition-transform flex items-center gap-1 text-[#75C5DE]">
                    Read Article <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="bg-[#0B0B0B] text-[#F4F1E8] pt-20 pb-12 px-6 md:px-16 border-t border-[#222]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#222]">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[#75C5DE] font-mono text-sm tracking-widest uppercase block">Ready to collaborate?</span>
            <h2 className="text-4xl md:text-6xl font-light tracking-tight">Let's build something extraordinary together.</h2>
            <button 
              onClick={() => setInquiryOpen(true)}
              className="mt-4 px-8 py-4 rounded-full bg-[#75C5DE] text-[#111] font-medium hover:bg-white transition-colors flex items-center gap-3 text-lg cursor-pointer"
            >
              Start a project now <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="text-sm font-mono text-[#9A9590] uppercase tracking-wider mb-4">Navigation</h4>
              <ul className="space-y-3">
                <li><a href="#work" className="hover:text-[#75C5DE] transition-colors">Work</a></li>
                <li><a href="#about" className="hover:text-[#75C5DE] transition-colors">About</a></li>
                <li><a href="#blog" className="hover:text-[#75C5DE] transition-colors">Blog</a></li>
                <li><button onClick={() => setInquiryOpen(true)} className="hover:text-[#75C5DE] transition-colors text-left">Contact</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-mono text-[#9A9590] uppercase tracking-wider mb-4">Socials</h4>
              <ul className="space-y-3">
                <li><a href="https://pinterest.com" target="_blank" rel="noreferrer" className="hover:text-[#75C5DE] transition-colors">Pinterest</a></li>
                <li><a href="https://behance.net" target="_blank" rel="noreferrer" className="hover:text-[#75C5DE] transition-colors">Behance</a></li>
                <li><a href="https://letterboxd.com" target="_blank" rel="noreferrer" className="hover:text-[#75C5DE] transition-colors">Letterboxd</a></li>
                <li><a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-[#75C5DE] transition-colors">GitHub</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-mono text-[#9A9590] uppercase tracking-wider mb-4">Office</h4>
              <p className="text-sm text-[#9A9590] leading-relaxed">
                Studio Kessler<br/>
                45 Redchurch St<br/>
                Shoreditch, London E2 7DD
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#666] font-mono gap-4">
          <p>© 2026 Creative Studio Showcase. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#F4F1E8]">Privacy Policy</a>
            <a href="#" className="hover:text-[#F4F1E8]">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* PROJECT DETAIL MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#1A1A1A] border border-[#333] rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8 relative text-[#F4F1E8]">
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-[#2A2A2A] hover:bg-[#3A3A3A] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <span className="text-[#75C5DE] font-mono text-xs uppercase tracking-widest">{selectedProject.category} / {selectedProject.year}</span>
            <h2 className="text-3xl md:text-4xl font-semibold mt-2 mb-4">{selectedProject.title}</h2>
            <p className="text-[#9A9590] mb-6 font-mono text-sm">Client: {selectedProject.client}</p>

            <div className="rounded-2xl overflow-hidden mb-8 aspect-[16/9] border border-[#2A2A2A]">
              <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-[#75C5DE]">Overview</h3>
                <p className="text-[#CCC] leading-relaxed">{selectedProject.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-[#75C5DE]">Key Deliverables</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.deliverables.map((item, idx) => (
                    <span key={idx} className="px-3 py-1.5 rounded-lg bg-[#252525] border border-[#333] text-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-[#75C5DE]">Impact & Metrics</h3>
                <p className="text-[#CCC] bg-[#222] p-4 rounded-xl border border-[#333] font-mono text-sm">{selectedProject.metrics}</p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#333] flex justify-end">
              <button 
                onClick={() => { setSelectedProject(null); setInquiryOpen(true); }}
                className="px-6 py-3 rounded-full bg-[#75C5DE] text-[#111] font-medium hover:bg-white transition-colors flex items-center gap-2"
              >
                Inquire About Similar Project <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ARTICLE READER MODAL */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#1A1A1A] border border-[#333] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 relative text-[#F4F1E8]">
            <button 
              onClick={() => setSelectedArticle(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-[#2A2A2A] hover:bg-[#3A3A3A] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center justify-between text-xs font-mono text-[#9A9590] mb-4">
              <span className="bg-[#262626] text-[#75C5DE] px-3 py-1 rounded-full">{selectedArticle.category}</span>
              <span>{selectedArticle.readTime}</span>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-semibold mb-3">{selectedArticle.title}</h2>
            <p className="text-xs font-mono text-[#666] mb-6">{selectedArticle.date}</p>

            <div className="space-y-4 text-[#CCC] leading-relaxed border-t border-[#333] pt-6">
              <p className="text-lg font-medium text-[#F4F1E8]">{selectedArticle.summary}</p>
              <p>{selectedArticle.content}</p>
              <p>As we look toward the future of interactive media, the synthesis of rigorous visual design and high-performance engineering remains paramount. When form and function operate in absolute harmony, digital products cease to be tools and become experiences.</p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#333] flex justify-end">
              <button 
                onClick={() => setSelectedArticle(null)}
                className="px-6 py-2.5 rounded-full bg-[#2A2A2A] text-white hover:bg-[#3A3A3A] transition-colors text-sm"
              >
                Close Essay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PROJECT INQUIRY MODAL */}
      {inquiryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#161616] border border-[#333] rounded-3xl max-w-xl w-full p-8 md:p-10 relative text-[#F4F1E8]">
            <button 
              onClick={() => { setInquiryOpen(false); setFormSubmitted(false); setFormStep(1); }}
              className="absolute top-6 right-6 p-2 rounded-full bg-[#262626] hover:bg-[#363636] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {!formSubmitted ? (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <span className="text-[#75C5DE] font-mono text-xs uppercase tracking-widest">Project Inquiry</span>
                  <h2 className="text-2xl md:text-3xl font-semibold mt-1">Let's discuss your vision</h2>
                  <p className="text-[#9A9590] text-sm mt-1">Step {formStep} of 3</p>
                </div>

                {formStep === 1 && (
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-[#CCC]">What type of project do you have in mind?</label>
                    <div className="grid grid-cols-1 gap-3">
                      {['Branding & Visual Identity', 'Motion Design & 3D', 'Immersive Web Experience', 'Full Product Ecosystem'].map((type) => (
                        <button
                          type="button"
                          key={type}
                          onClick={() => setProjectType(type)}
                          className={`p-4 rounded-xl border text-left font-medium transition-all ${
                            projectType === type 
                              ? 'border-[#75C5DE] bg-[#75C5DE]/10 text-[#75C5DE]' 
                              : 'border-[#2A2A2A] bg-[#1F1F1F] text-[#CCC] hover:border-[#444]'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormStep(2)}
                      className="w-full mt-6 py-4 rounded-full bg-[#75C5DE] text-[#111] font-semibold hover:bg-white transition-colors flex items-center justify-center gap-2"
                    >
                      Continue <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {formStep === 2 && (
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-[#CCC]">Estimated Budget & Timeline</label>
                    <div>
                      <span className="text-xs font-mono text-[#9A9590] block mb-2">Budget Range</span>
                      <div className="grid grid-cols-3 gap-2">
                        {['$10k - $25k', '$25k - $50k', '$50k+'].map((b) => (
                          <button
                            type="button"
                            key={b}
                            onClick={() => setBudget(b)}
                            className={`py-3 px-2 rounded-xl border text-xs sm:text-sm font-medium transition-all text-center ${
                              budget === b 
                                ? 'border-[#75C5DE] bg-[#75C5DE]/10 text-[#75C5DE]' 
                                : 'border-[#2A2A2A] bg-[#1F1F1F] text-[#CCC] hover:border-[#444]'
                            }`}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2">
                      <span className="text-xs font-mono text-[#9A9590] block mb-2">Target Timeline</span>
                      <div className="grid grid-cols-3 gap-2">
                        {['< 1 Month', '1 - 3 Months', '3+ Months'].map((t) => (
                          <button
                            type="button"
                            key={t}
                            onClick={() => setTimeline(t)}
                            className={`py-3 px-2 rounded-xl border text-xs sm:text-sm font-medium transition-all text-center ${
                              timeline === t 
                                ? 'border-[#75C5DE] bg-[#75C5DE]/10 text-[#75C5DE]' 
                                : 'border-[#2A2A2A] bg-[#1F1F1F] text-[#CCC] hover:border-[#444]'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                      <button
                        type="button"
                        onClick={() => setFormStep(1)}
                        className="w-1/3 py-4 rounded-full bg-[#262626] text-white font-medium hover:bg-[#363636] transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormStep(3)}
                        className="w-2/3 py-4 rounded-full bg-[#75C5DE] text-[#111] font-semibold hover:bg-white transition-colors flex items-center justify-center gap-2"
                      >
                        Continue <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {formStep === 3 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono text-[#9A9590] mb-1">Your Name</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Jane Doe"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full bg-[#1F1F1F] border border-[#333] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#75C5DE]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-[#9A9590] mb-1">Email Address</label>
                      <input 
                        type="email" 
                        required
                        placeholder="jane@company.com"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        className="w-full bg-[#1F1F1F] border border-[#333] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#75C5DE]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-[#9A9590] mb-1">Project Details</label>
                      <textarea 
                        rows={3}
                        placeholder="Tell us about your goals, challenges, and timeline..."
                        value={clientMessage}
                        onChange={(e) => setClientMessage(e.target.value)}
                        className="w-full bg-[#1F1F1F] border border-[#333] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#75C5DE]"
                      ></textarea>
                    </div>

                    <div className="flex gap-3 mt-6">
                      <button
                        type="button"
                        onClick={() => setFormStep(2)}
                        className="w-1/3 py-4 rounded-full bg-[#262626] text-white font-medium hover:bg-[#363636] transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="w-2/3 py-4 rounded-full bg-[#75C5DE] text-[#111] font-semibold hover:bg-white transition-colors flex items-center justify-center gap-2"
                      >
                        Send Inquiry <CheckCircle2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </form>
            ) : (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-[#75C5DE]/20 text-[#75C5DE] rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-semibold">Inquiry Received</h3>
                <p className="text-[#9A9590] text-sm max-w-sm mx-auto leading-relaxed">
                  Thank you, <span className="text-white font-medium">{clientName}</span>. We have received your project details for <span className="text-[#75C5DE]">{projectType}</span> and will get back to you within 24 hours.
                </p>
                <div className="pt-6">
                  <button
                    onClick={() => { setInquiryOpen(false); setFormSubmitted(false); setFormStep(1); }}
                    className="px-8 py-3 rounded-full bg-[#75C5DE] text-[#111] font-medium hover:bg-white transition-colors"
                  >
                    Back to Studio
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
