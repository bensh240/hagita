import { useRef, useEffect } from 'react';
import { Marquee } from '../ui/marquee';
import { content } from '../../config/content';
import { gsap } from '../../animations/gsapSetup';

function ReviewCard({ name, text, rating }: { name: string; text: string; rating: number }) {
  return (
    <div style={{
      width: '380px',
      flexShrink: 0,
      padding: '2.5rem',
      borderRadius: '4px',
      background: 'var(--color-bg-card)',
      border: '1px solid var(--color-border)',
    }}>
      <div style={{ display: 'flex', gap: '2px', marginBottom: '1.5rem' }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} style={{ color: i < rating ? 'var(--color-accent)' : 'var(--color-border)', fontSize: '0.75rem' }}>★</span>
        ))}
      </div>
      <p style={{
        color: 'var(--color-text-muted)',
        fontSize: '0.92rem',
        lineHeight: 1.9,
        marginBottom: '2rem',
      }}>
        &ldquo;{text}&rdquo;
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: 'var(--color-bg-elevated)',
          border: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--color-accent)',
          fontWeight: 700,
          fontSize: '0.75rem',
        }}>
          {name.charAt(0)}
        </div>
        <span style={{ fontWeight: 600, color: 'var(--color-text)', fontSize: '0.85rem' }}>{name}</span>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !headingRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current!,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      style={{
        background: 'var(--color-bg-elevated)',
        padding: 'clamp(6rem, 12vw, 10rem) 0',
        overflow: 'hidden',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <div style={{
        maxWidth: '1400px',
        marginInline: 'auto',
        paddingInline: 'var(--container-padding-x)',
        marginBottom: 'clamp(3rem, 6vw, 5rem)',
      }}>
        <div ref={headingRef}>
          <div style={{
            color: 'var(--color-accent)',
            fontSize: '0.78rem',
            fontWeight: 500,
            letterSpacing: '0.2em',
            marginBottom: '1.5rem',
          }}>
            המלצות
          </div>
          <h2 style={{
            color: 'var(--color-text)',
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            lineHeight: 1,
          }}>
            {content.testimonials.heading}
          </h2>
        </div>
      </div>

      <Marquee pauseOnHover className="[--duration:45s] [--gap:1.5rem]">
        {content.testimonials.items.map((t) => (
          <ReviewCard key={t.name} name={t.name} text={t.text} rating={t.rating} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="mt-6 [--duration:40s] [--gap:1.5rem]">
        {[...content.testimonials.items].reverse().map((t) => (
          <ReviewCard key={t.name + '-r'} name={t.name} text={t.text} rating={t.rating} />
        ))}
      </Marquee>
    </section>
  );
}
