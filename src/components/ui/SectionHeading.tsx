import { motion } from 'motion/react';
import { colors } from '../../config/theme';
import { fadeInUp } from '../../animations/variants';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  light?: boolean;
}

export default function SectionHeading({ title, subtitle, light }: SectionHeadingProps) {
  return (
    <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 5vw, 4rem)' }}>
      <motion.h2
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{ color: light ? '#fff' : colors.dark, marginBottom: '0.75rem' }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            color: light ? 'rgba(255,255,255,0.8)' : colors.dark + 'aa',
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            maxWidth: '600px',
            marginInline: 'auto',
          }}
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{
          width: '60px',
          height: '4px',
          borderRadius: '2px',
          background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
          marginInline: 'auto',
          marginTop: '1rem',
        }}
      />
    </div>
  );
}
