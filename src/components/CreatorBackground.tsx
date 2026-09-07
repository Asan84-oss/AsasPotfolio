import { useEffect, useRef } from 'react';

export default function CreatorBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    interface Blob {
      x: number;
      y: number;
      radius: number;
      color: string;
      speedX: number;
      speedY: number;
      phase: number;
      phaseSpeed: number;
    }

    const blobs: Blob[] = [
      { x: width * 0.2, y: height * 0.3, radius: 300, color: 'rgba(210, 180, 140, 0.15)', speedX: 0.3, speedY: 0.2, phase: 0, phaseSpeed: 0.005 },
      { x: width * 0.7, y: height * 0.6, radius: 250, color: 'rgba(180, 160, 200, 0.12)', speedX: -0.2, speedY: 0.3, phase: 2, phaseSpeed: 0.007 },
      { x: width * 0.5, y: height * 0.2, radius: 200, color: 'rgba(200, 190, 170, 0.1)', speedX: 0.15, speedY: -0.25, phase: 4, phaseSpeed: 0.004 },
      { x: width * 0.8, y: height * 0.8, radius: 280, color: 'rgba(190, 170, 150, 0.13)', speedX: -0.25, speedY: -0.15, phase: 1, phaseSpeed: 0.006 },
      { x: width * 0.3, y: height * 0.7, radius: 220, color: 'rgba(220, 200, 180, 0.11)', speedX: 0.2, speedY: 0.1, phase: 3, phaseSpeed: 0.008 }
    ];

    const handleResize = () => {
      if (!mountedRef.current) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    let time = 0;

    const drawBlob = (blob: Blob) => {
      const points = 8;
      const angleStep = (Math.PI * 2) / points;

      ctx.beginPath();
      for (let i = 0; i <= points; i++) {
        const angle = i * angleStep;
        const wobble = Math.sin(time * blob.phaseSpeed * 100 + blob.phase + angle * 2) * 30;
        const r = blob.radius + wobble;
        const x = blob.x + Math.cos(angle) * r;
        const y = blob.y + Math.sin(angle) * r;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          const prevAngle = (i - 1) * angleStep;
          const prevWobble = Math.sin(time * blob.phaseSpeed * 100 + blob.phase + prevAngle * 2) * 30;
          const prevR = blob.radius + prevWobble;
          const cpX = blob.x + Math.cos(prevAngle + angleStep / 2) * (prevR + blob.radius) * 0.6;
          const cpY = blob.y + Math.sin(prevAngle + angleStep / 2) * (prevR + blob.radius) * 0.6;
          ctx.quadraticCurveTo(cpX, cpY, x, y);
        }
      }
      ctx.closePath();

      const gradient = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.radius);
      gradient.addColorStop(0, blob.color);
      gradient.addColorStop(1, 'rgba(250, 248, 245, 0)');
      ctx.fillStyle = gradient;
      ctx.fill();
    };

    const animate = () => {
      if (!mountedRef.current) return;
      time += 0.016;

      ctx.fillStyle = '#FAF8F5';
      ctx.fillRect(0, 0, width, height);

      blobs.forEach(blob => {
        blob.x += blob.speedX;
        blob.y += blob.speedY;
        blob.phase += blob.phaseSpeed;

        if (blob.x < -blob.radius) blob.x = width + blob.radius;
        if (blob.x > width + blob.radius) blob.x = -blob.radius;
        if (blob.y < -blob.radius) blob.y = height + blob.radius;
        if (blob.y > height + blob.radius) blob.y = -blob.radius;

        drawBlob(blob);
      });

      // Subtle noise texture
      ctx.globalAlpha = 0.02;
      for (let i = 0; i < 1000; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        ctx.fillStyle = Math.random() > 0.5 ? '#000' : '#fff';
        ctx.fillRect(x, y, 1, 1);
      }
      ctx.globalAlpha = 1;

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      mountedRef.current = false;
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
      if (canvas && ctx) {
        ctx.clearRect(0, 0, width, height);
      }
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
