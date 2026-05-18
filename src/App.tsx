/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  Linkedin, 
  Mail, 
  Download, 
  ArrowRight, 
  Truck, 
  Package, 
  BarChart3, 
  MapPin, 
  Briefcase, 
  ChevronRight,
  Sun,
  Moon,
  Upload,
  Camera,
  CheckCircle2,
  Send,
  Loader2,
  ExternalLink
} from 'lucide-react';
import { CV_DATA } from './data';

// --- Sub-components for cleaner structure ---

const NavLink = ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: () => void; key?: string }) => (
  <a 
    href={href}
    className="text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
    onClick={onClick}
  >
    {children}
  </a>
);

const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="p-8 rounded-3xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 shadow-sm"
  >
    <div className="p-3 bg-neutral-100 dark:bg-neutral-700 rounded-2xl w-fit mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-sm text-neutral-500 dark:text-neutral-400">{desc}</p>
  </motion.div>
);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formMessage, setFormMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Load image from localStorage safely
    try {
      const savedImage = localStorage.getItem('taha_profile_image');
      if (savedImage) setProfileImage(savedImage);
    } catch (e) {
      console.warn("Storage access failed", e);
    }

    // Toggle theme
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#000000';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#F9F9F9';
    }

    // Scroll progress handler
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (height > 0) {
        setScrollProgress((winScroll / height) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDarkMode]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Image too large. Please upload less than 5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfileImage(base64String);
        try {
          localStorage.setItem('taha_profile_image', base64String);
        } catch (err) {
          console.warn("Could not save to local storage", err);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setFormStatus('success');
        setFormMessage(result.message);
        (e.target as HTMLFormElement).reset();
      } else {
        throw new Error(result.error || 'Submission failed');
      }
    } catch (err) {
      setFormStatus('error');
      setFormMessage(err instanceof Error ? err.message : 'An error occurred. Please try again.');
    }
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className={`min-h-screen font-sans transition-colors duration-500 overflow-x-hidden ${isDarkMode ? 'dark' : ''}`}>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[100] pointer-events-none">
        <motion.div 
          className="h-full bg-neutral-900 dark:bg-white" 
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-display font-bold tracking-tight cursor-default select-none"
          >
            T.ANWAR
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10">
            {['Home', 'About', 'Experience', 'Skills', 'Portfolio', 'Contact'].map((item) => (
              <NavLink key={item} href={`#${item.toLowerCase()}`} onClick={closeMenu}>{item}</NavLink>
            ))}
            
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              aria-label="Toggle Theme"
              className="p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center space-x-4">
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2" aria-label="Toggle Theme">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2" aria-label="Toggle Menu">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t dark:border-white/10 glass overflow-hidden"
            >
              <div className="px-6 py-8 flex flex-col space-y-6">
                {['Home', 'About', 'Experience', 'Skills', 'Portfolio', 'Contact'].map((item) => (
                  <NavLink key={item} href={`#${item.toLowerCase()}`} onClick={closeMenu}>{item}</NavLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main>
        {/* Hero Section */}
        <section id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border border-neutral-200 dark:border-neutral-800 mb-6 font-display">
                Available for New Challenges
              </span>
              <h1 className="text-6xl md:text-8xl font-display font-bold leading-tight mb-6 tracking-tighter">
                {CV_DATA.name.split(' ')[0]} <br />
                <span className="text-neutral-500 dark:text-neutral-700">{CV_DATA.name.split(' ')[1]}</span>
              </h1>
              <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 mb-10 max-w-lg leading-relaxed">
                {CV_DATA.tagline}
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#contact" className="px-8 py-4 bg-neutral-900 text-white dark:bg-white dark:text-black rounded-full font-medium flex items-center gap-2 hover:scale-105 transition-all shadow-lg active:scale-95">
                  Get in Touch <ArrowRight size={18} />
                </a>
                <button className="px-8 py-4 border border-neutral-300 dark:border-neutral-700 rounded-full font-medium flex items-center gap-2 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors shadow-sm">
                  <Download size={18} /> Download CV
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="relative group"
            >
              <div className="aspect-square rounded-[3rem] overflow-hidden bg-neutral-200 dark:bg-neutral-800 relative shadow-2xl border-4 border-white/10">
                {profileImage ? (
                  <img 
                    src={profileImage} 
                    alt="Taha Anwar Profile" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-neutral-400 p-12 text-center">
                    <div className="p-4 rounded-3xl bg-neutral-300 dark:bg-neutral-700 mb-4">
                      <Camera size={48} strokeWidth={1} />
                    </div>
                    <p className="text-sm font-medium">Click the upload icon below to add your portrait</p>
                  </div>
                )}
                
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-6 right-6 p-4 rounded-full bg-white dark:bg-black text-neutral-900 dark:text-white shadow-2xl hover:scale-110 transition-transform cursor-pointer z-10 border border-black/5 dark:border-white/10"
                >
                  <Upload size={20} />
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageUpload} 
                  className="hidden" 
                  accept="image/*" 
                />
              </div>
              
              <div className="absolute -z-10 -top-8 -right-8 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
              <div className="absolute -z-10 -bottom-8 -left-8 w-64 h-64 bg-neutral-500/10 rounded-full blur-3xl" />
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 bg-neutral-50/50 dark:bg-neutral-900/40 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <div className="space-y-8">
                <div>
                  <span className="text-sm font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 block mb-4">Profile Discovery</span>
                  <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight">Behind the Professional</h2>
                </div>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {CV_DATA.about}
                </p>
                <div className="grid grid-cols-2 gap-8 pt-4">
                  <div>
                    <h4 className="text-3xl font-display font-bold mb-1 tracking-tighter">05+</h4>
                    <p className="text-xs text-neutral-500 uppercase tracking-widest font-bold">Years Experience</p>
                  </div>
                  <div>
                    <h4 className="text-3xl font-display font-bold mb-1 tracking-tighter">50+</h4>
                    <p className="text-xs text-neutral-500 uppercase tracking-widest font-bold">Remote Sites Managed</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FeatureCard icon={<Truck />} title="Logistics" desc="Expert optimization of transport networks." />
                <FeatureCard icon={<Package />} title="Inventory" desc="Precision control and demand alignment." />
                <FeatureCard icon={<BarChart3 />} title="Planning" desc="Data-driven forecasting and strategy." />
                <FeatureCard icon={<MapPin />} title="Remote Ops" desc="Handling complex field logistics." />
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-24 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tight">Career Timeline</h2>
              <p className="text-neutral-500 max-w-2xl mx-auto text-lg leading-relaxed">A journey through leading organizations, transforming supply chains and optimizing global operations.</p>
            </div>

            <div className="space-y-12">
              {CV_DATA.experience.map((exp, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="flex flex-col md:flex-row gap-8 items-start p-8 md:p-12 rounded-[3.5rem] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm transition-all duration-500 hover:shadow-xl hover:border-neutral-300 dark:hover:border-neutral-700"
                >
                  <div className="md:w-1/3">
                    <div className="flex items-center gap-3 mb-2">
                       <Briefcase size={20} className="text-neutral-400" />
                       <span className="text-sm font-bold uppercase tracking-widest text-neutral-400">{exp.period}</span>
                    </div>
                    <h3 className="text-3xl font-display font-bold mb-1">{exp.role}</h3>
                    <p className="text-xl text-neutral-500 flex items-center gap-2">
                       {exp.company} <ChevronRight size={16} />
                    </p>
                  </div>
                  
                  <div className="md:w-2/3">
                    <ul className="space-y-5">
                      {exp.description.map((item, j) => (
                        <li key={j} className="flex gap-4 text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed">
                          <CheckCircle2 size={24} className="text-blue-500 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-24 bg-neutral-900 text-white px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-5xl md:text-6xl font-display font-bold mb-8 tracking-tighter">
                  Professional <br />
                  <span className="text-neutral-500">Arsenal</span>
                </h2>
                <p className="text-neutral-400 text-xl mb-12 leading-relaxed">
                  Leveraging a diverse set of technical and leadership skills to navigate the complexities of modern logistics.
                </p>
                <div className="space-y-5">
                  {['Supply Chain Efficiency', 'Logistics Strategy', 'Inventory Accuracy', 'Stakeholder alignment'].map((s, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-4 text-2xl font-display font-medium"
                    >
                      <div className="w-2.5 h-2.5 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                      {s}
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="grid gap-6">
                {CV_DATA.skills.map((skillGroup, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    className="p-10 rounded-[2.5rem] bg-neutral-800/40 border border-neutral-700/50 backdrop-blur-md"
                  >
                    <h3 className="text-sm text-neutral-500 font-bold uppercase tracking-widest mb-6">{skillGroup.category}</h3>
                    <div className="flex flex-wrap gap-3">
                      {skillGroup.items.map((skill, j) => (
                        <span key={j} className="px-5 py-2.5 rounded-2xl bg-neutral-700/50 text-base font-medium hover:bg-white hover:text-black transition-all duration-300 cursor-default select-none">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 px-6 relative">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-stretch">
              <div>
                <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 tracking-tight">Let's Build the <span className="text-neutral-500">Next Big Hub.</span></h2>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-12 leading-relaxed">
                  Looking for a logistical strategy that scales? Whether you're hiring for a critical role or just want to discuss supply chain trends, I'm here.
                </p>
                
                <div className="space-y-8">
                  <motion.a 
                    href="mailto:taahaanwaar@gmail.com" 
                    className="flex items-center gap-6 p-6 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 transition-colors group"
                  >
                    <div className="p-4 rounded-2xl bg-white dark:bg-neutral-800 shadow-sm group-hover:scale-110 transition-transform">
                      <Mail className="text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-neutral-400 uppercase tracking-widest">Email Me</p>
                      <p className="text-xl font-bold">taahaanwaar@gmail.com</p>
                    </div>
                  </motion.a>

                  <motion.a 
                    href="#" 
                    className="flex items-center gap-6 p-6 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 transition-colors group"
                  >
                    <div className="p-4 rounded-2xl bg-white dark:bg-neutral-800 shadow-sm group-hover:scale-110 transition-transform">
                      <Linkedin className="text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-neutral-400 uppercase tracking-widest">Connect</p>
                      <p className="text-xl font-bold">Taha Anwar LinkedIn</p>
                    </div>
                  </motion.a>
                </div>
              </div>

              <div className="p-10 rounded-[3.5rem] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl relative overflow-hidden">
                <form onSubmit={handleContactSubmit} className="space-y-6 relative z-10">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-bold uppercase tracking-widest text-neutral-400 ml-1">Full Name</label>
                    <input 
                      id="name"
                      name="name"
                      type="text" 
                      required
                      placeholder="Enter your name"
                      className="w-full px-6 py-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border-none focus:ring-2 focus:ring-blue-500 outline-none transition-shadow text-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-bold uppercase tracking-widest text-neutral-400 ml-1">Work Email</label>
                    <input 
                      id="email"
                      name="email"
                      type="email" 
                      required
                      placeholder="email@company.com"
                      className="w-full px-6 py-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border-none focus:ring-2 focus:ring-blue-500 outline-none transition-shadow text-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-bold uppercase tracking-widest text-neutral-400 ml-1">Message</label>
                    <textarea 
                      id="message"
                      name="message"
                      rows={4}
                      required
                      placeholder="Let's talk about your logistical needs..."
                      className="w-full px-6 py-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border-none focus:ring-2 focus:ring-blue-500 outline-none transition-shadow text-lg resize-none"
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={formStatus === 'submitting'}
                    className="w-full py-5 rounded-2xl bg-black dark:bg-white text-white dark:text-black font-bold text-xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {formStatus === 'submitting' ? (
                      <>
                        <Loader2 className="animate-spin" size={24} />
                       Processing...
                      </>
                    ) : (
                      <>
                        <Send size={20} /> Send Proposal
                      </>
                    )}
                  </button>

                  <AnimatePresence>
                    {formStatus === 'success' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-center font-medium"
                      >
                        {formMessage}
                      </motion.div>
                    )}
                    {formStatus === 'error' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-center font-medium"
                      >
                        {formMessage}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
                
                {/* Visual accents in the form */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-20 border-t dark:border-white/10 px-6 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between gap-12 mb-16">
            <div className="space-y-6 max-w-sm">
              <div className="text-2xl font-display font-bold underline decoration-neutral-500 underline-offset-8">T.ANWAR</div>
              <p className="text-neutral-500 leading-relaxed">
                Expert supply chain and logistics solutions for modern businesses. From remote site operations to global distribution networks.
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-16">
              <div className="space-y-4">
                <p className="text-sm font-bold uppercase tracking-widest">Navigation</p>
                <div className="flex flex-col space-y-3">
                  <a href="#home" className="text-neutral-500 hover:text-black dark:hover:text-white transition-colors">Home</a>
                  <a href="#about" className="text-neutral-500 hover:text-black dark:hover:text-white transition-colors">About</a>
                  <a href="#experience" className="text-neutral-500 hover:text-black dark:hover:text-white transition-colors">Career</a>
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-sm font-bold uppercase tracking-widest">Resources</p>
                <div className="flex flex-col space-y-3">
                  <a href="#" className="text-neutral-500 hover:text-black dark:hover:text-white transition-colors underline decoration-dotted">Download CV</a>
                  <a href="#portfolio" className="text-neutral-500 hover:text-black dark:hover:text-white transition-colors">Case Studies</a>
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-sm font-bold uppercase tracking-widest">Connect</p>
                <div className="flex flex-col space-y-3">
                  <a href="#" className="text-neutral-500 hover:text-black dark:hover:text-white transition-colors flex items-center gap-2">LinkedIn <ExternalLink size={14} /></a>
                  <a href="mailto:taahaanwaar@gmail.com" className="text-neutral-500 hover:text-black dark:hover:text-white transition-colors">Email</a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-12 border-t dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 opacity-60">
            <p className="text-sm text-neutral-500 italic">Built for performance and reliability.</p>
            <p className="text-sm text-neutral-500">© {new Date().getFullYear()} Taha Anwar. Optimization 1.0 (Vercel Ready)</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

