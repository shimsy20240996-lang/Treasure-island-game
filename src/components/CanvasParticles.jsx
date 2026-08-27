import React, { useEffect, useRef } from 'react';

export const CanvasParticles = ({ mood = 'ocean', reducedMotion = false }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (reducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Particle pool
    const particleCount = mood === 'victory' ? 65 : mood === 'fire' ? 50 : 35;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * (mood === 'victory' ? 4.5 : 2.5) + 1,
        speedX: (Math.random() - 0.5) * (mood === 'fire' ? 1.5 : 0.6),
        speedY: mood === 'fire' ? -(Math.random() * 1.5 + 0.5) : (Math.random() - 0.3) * 0.7,
        opacity: Math.random() * 0.6 + 0.2,
        color: mood === 'victory' 
          ? ['#ffd700', '#f5b041', '#ffffff', '#eab308'][Math.floor(Math.random() * 4)]
          : mood === 'fire'
          ? ['#ef4444', '#f97316', '#f59e0b'][Math.floor(Math.random() * 3)]
          : ['#38bdf8', '#0ea5e9', '#d4af37', '#e2e8f0'][Math.floor(Math.random() * 4)]
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.shadowBlur = mood === 'victory' ? 10 : 4;
        ctx.shadowColor = p.color;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mood, reducedMotion]);

  if (reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.65
      }}
    />
  );
};

export default CanvasParticles;
