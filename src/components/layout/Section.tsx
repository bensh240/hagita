import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import type { CSSProperties, ReactNode } from 'react';

interface SectionProps {
  id: string;
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}

export default function Section({ id, children, style, className }: SectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.section
      ref={ref}
      id={id}
      className={`section ${className ?? ''}`}
      style={{
        ...style,
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(40px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
      }}
    >
      <div className="container">
        {children}
      </div>
    </motion.section>
  );
}
