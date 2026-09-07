import { useEffect, useRef } from 'react';

export default function EngineerBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Grid parameters
    const gridSize = 50;
    const cols = Math.ceil(width / gridSize) + 2;
    const rows = Math.ceil(height / gridSize) + 2;

    // Particles for matrix effect
    interface Particle {
      x: number;
      y: number;
      speed: number;
      char: string;
      opacity: number;
      size: number;
    }

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ';
    const particles: Particle[] = [];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: 1 + Math.random() * 3,
        char: chars[Math.floor(Math.random() * chars.length)],
        opacity: 0.1 + Math.random() * 0.5,
        size: 10 + Math.random() * 14
      });
    }

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    let time = 0;

    const animate = () => {
      time += 0.01;
      ctx.fillStyle = 'rgba(10, 10, 15, 0.15)';
      ctx.fillRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Draw neon grid
      ctx.strokeStyle = 'rgba(0, 255, 0, 0.08)';
      ctx.lineWidth = 0.5;

      for (let i = 0; i < cols; i++) {
        ctx.beginPath();
        for (let j = 0; j < rows; j++) {
          const x = i * gridSize;
          const y = j * gridSize;

          // Calculate distance from mouse
          const dx = x - mx;
          const dy = y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 300;

          if (dist < maxDist) {
            const factor = 1 - dist / maxDist;
            const warpX = x + (dx / dist) * factor * 20 * Math.sin(time * 2 + i);
            const warpY = y + (dy / dist) * factor * 20 * Math.cos(time * 2 + j);

            if (j === 0) ctx.moveTo(warpX, warpY);
            else ctx.lineTo(warpX, warpY);

            // Glow near cursor
            ctx.strokeStyle = `rgba(0, 255, 0, ${0.1 + factor * 0.4})`;
          } else {
            if (j === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      // Horizontal grid lines
      for (let j = 0; j < rows; j++) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(0, 255, 0, 0.06)';
        for (let i = 0; i < cols; i++) {
          const x = i * gridSize;
          const y = j * gridSize;
          const dx = x - mx;
          const dy = y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 300;

          if (dist < maxDist) {
            const factor = 1 - dist / maxDist;
            const warpX = x + (dx / dist) * factor * 20 * Math.sin(time * 2 + i);
            const warpY = y + (dy / dist) * factor * 20 * Math.cos(time * 2 + j);
            if (i === 0) ctx.moveTo(warpX, warpY);
            else ctx.lineTo(warpX, warpY);
          } else {
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      // Draw connection nodes at intersections near mouse
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gridSize;
          const y = j * gridSize;
          const dx = x - mx;
          const dy = y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 200) {
            const factor = 1 - dist / 200;
            ctx.beginPath();
            ctx.arc(x, y, 2 + factor * 3, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 255, 0, ${factor * 0.8})`;
            ctx.fill();

            // Pink accent for closest nodes
            if (dist < 80) {
              ctx.beginPath();
              ctx.arc(x, y, 1 + factor * 2, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(255, 0, 110, ${factor * 0.6})`;
              ctx.fill();
            }
          }
        }
      }

      // Matrix rain particles
      particles.forEach(p => {
        p.y += p.speed;
        if (p.y > height) {
          p.y = -20;
          p.x = Math.random() * width;
          p.char = chars[Math.floor(Math.random() * chars.length)];
        }

        ctx.font = `${p.size}px 'Fira Code', monospace`;
        ctx.fillStyle = `rgba(0, 255, 0, ${p.opacity * 0.3})`;
        ctx.fillText(p.char, p.x, p.y);
      });

      // Cursor glow
      const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, 150);
      gradient.addColorStop(0, 'rgba(0, 255, 0, 0.05)');
      gradient.addColorStop(0.5, 'rgba(255, 0, 110, 0.02)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
