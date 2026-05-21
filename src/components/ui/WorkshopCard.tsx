import { useRef, type MouseEvent } from 'react';
import { motion } from 'motion/react';
import { colors } from '../../config/theme';
import { fadeInUp } from '../../animations/variants';

interface WorkshopCardProps {
  title: string;
  description: string;
  icon: string;
  color: string;
  price: string;
  onCTA: () => void;
}

export default function WorkshopCard({ title, description, icon, color, price, onCTA }: WorkshopCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 12;
    const rotateY = (centerX - x) / 12;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  };

  return (
    <motion.div
      variants={fadeInUp}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        background: '#fff',
        borderRadius: '20px',
        padding: 'clamp(1.5rem, 3vw, 2.5rem)',
        boxShadow: '0 8px 32px rgba(38, 70, 83, 0.08)',
        transition: 'transform 0.15s ease, box-shadow 0.3s ease',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        transformStyle: 'preserve-3d',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 60px rgba(38, 70, 83, 0.15)';
      }}
      whileHover={{}}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
          height: '4px',
          background: `linear-gradient(90deg, ${color}, ${color}80)`,
        }}
      />

      <div
        style={{
          fontSize: '3rem',
          marginBottom: '1rem',
          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
        }}
      >
        {icon}
      </div>

      <h3 style={{ color: colors.dark, marginBottom: '0.75rem' }}>{title}</h3>

      <p
        style={{
          color: colors.dark + 'aa',
          fontSize: '0.95rem',
          lineHeight: 1.7,
          marginBottom: '1.5rem',
        }}
      >
        {description}
      </p>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span
          style={{
            fontWeight: 900,
            fontSize: '1.4rem',
            color,
          }}
        >
          {price}
        </span>

        <button
          onClick={onCTA}
          style={{
            padding: '0.6rem 1.5rem',
            borderRadius: '50px',
            background: color,
            color: '#fff',
            fontWeight: 700,
            fontSize: '0.9rem',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.transform = 'scale(1.05)';
            (e.target as HTMLElement).style.boxShadow = `0 4px 15px ${color}50`;
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.transform = 'scale(1)';
            (e.target as HTMLElement).style.boxShadow = 'none';
          }}
        >
          לפרטים
        </button>
      </div>
    </motion.div>
  );
}
