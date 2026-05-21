import { motion } from 'motion/react';
import { colors } from '../../config/theme';
import { fadeInUp } from '../../animations/variants';

interface TestimonialCardProps {
  name: string;
  text: string;
  rating: number;
}

export default function TestimonialCard({ name, text, rating }: TestimonialCardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      style={{
        background: '#fff',
        borderRadius: '20px',
        padding: 'clamp(1.5rem, 3vw, 2rem)',
        boxShadow: '0 8px 32px rgba(38, 70, 83, 0.06)',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '-10px',
          right: '1.5rem',
          fontSize: '4rem',
          color: colors.secondary + '30',
          fontFamily: 'Georgia, serif',
          lineHeight: 1,
        }}
      >
        ״
      </div>

      <div style={{ marginBottom: '1rem' }}>
        {'★'.repeat(rating)}
        {'☆'.repeat(5 - rating)}
      </div>

      <p
        style={{
          color: colors.dark + 'cc',
          fontSize: '0.95rem',
          lineHeight: 1.8,
          marginBottom: '1.25rem',
        }}
      >
        {text}
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 700,
            fontSize: '1rem',
          }}
        >
          {name.charAt(0)}
        </div>
        <span style={{ fontWeight: 700, color: colors.dark }}>{name}</span>
      </div>
    </motion.div>
  );
}
