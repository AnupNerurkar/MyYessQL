import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 80;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      baseX: number;
      baseY: number;

      constructor(w: number, h: number) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.baseX = this.x;
        this.baseY = this.y;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.size = Math.random() * 1.5 + 0.5;
      }

      update(w: number, h: number, mouse: { x: number; y: number }) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;

        // Mouse interaction (repulsion)
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;
        
        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          const directionX = dx / distance;
          const directionY = dy / distance;
          this.x -= directionX * force * 2;
          this.y -= directionY * force * 2;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = '#C9A84C';
        ctx.fill();
      }
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const init = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    const mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    resize();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw lines
      ctx.strokeStyle = 'rgba(201, 168, 76, 0.08)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        p.update(canvas.width, canvas.height, mouse);
        p.draw(ctx);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="hero">
      <canvas ref={canvasRef} className="hero-canvas" />
      <div className="container hero-content">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="label" style={{ color: 'var(--accent-color)' }}>
            Institutional Protocol v1.4
          </span>
          <h1 className="hero-title">
            Your Exit.<br />
            <span className="italic font-light">Your Terms.</span>
          </h1>
          <p className="hero-sub">
            Nexus digitizes the complex tapestry of graduation clearance into a single,
            sovereign digital ledger. No queues. No stamps. Just proof.
          </p>
          <div className="hero-btns">
            <button className="btn-primary">Establish Connection</button>
            <button className="btn-secondary">Authority Entry</button>
          </div>
        </motion.div>
      </div>
      
      <div className="ticker-bar">
        <div className="ticker-track">
            {['LIBRARY CLEARANCE: 98%', 'LAB PROTOCOL: ACTIVE', 'ACCOUNTS OFFICE: NO LATENCY', 'REGISTRAR: SYNCED', 'DEPT OF ARCHITECTURE: AUDITING', 'SPORTS COMPLEX: CLOSED'].map((item, i) => (
                <span key={i} className="ticker-item label">{item}</span>
            ))}
            {['LIBRARY CLEARANCE: 98%', 'LAB PROTOCOL: ACTIVE', 'ACCOUNTS OFFICE: NO LATENCY', 'REGISTRAR: SYNCED', 'DEPT OF ARCHITECTURE: AUDITING', 'SPORTS COMPLEX: CLOSED'].map((item, i) => (
                <span key={`dup-${i}`} className="ticker-item label">{item}</span>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
