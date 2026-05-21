import { useRef, useEffect } from 'react';
import { content } from '../../config/content';
import { gsap } from '../../animations/gsapSetup';

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (imageRef.current) {
        gsap.fromTo(imageRef.current,
          { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' },
          {
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            duration: 1.4,
            ease: 'power4.inOut',
            scrollTrigger: {
              trigger: imageRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (textRef.current) {
        const children = textRef.current.children;
        gsap.fromTo(children,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 1,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: textRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { number: '15+', label: 'שנות ניסיון' },
    { number: '2,000+', label: 'משתתפים' },
    { number: '50+', label: 'סדנאות בשנה' },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{
        background: 'var(--color-bg)',
        padding: 'clamp(8rem, 15vw, 14rem) 0',
        overflow: 'hidden',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <div style={{
        maxWidth: '1400px',
        marginInline: 'auto',
        paddingInline: 'var(--container-padding-x)',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'clamp(4rem, 8vw, 8rem)',
        alignItems: 'center',
      }}
        className="about-grid"
      >
        <div
          ref={imageRef}
          style={{
            position: 'relative',
            borderRadius: '4px',
            overflow: 'hidden',
            aspectRatio: '4/5',
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=80&auto=format"
            alt="שפית במטבח"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '4rem 2rem 2rem',
            background: 'linear-gradient(to top, rgba(10,10,10,0.9), transparent)',
          }}>
            <div style={{ color: '#fff', fontSize: '1.3rem', fontWeight: 800 }}>חגית</div>
            <div style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
              שפית ומנחת סדנאות בישול
            </div>
          </div>
        </div>

        <div ref={textRef}>
          <div style={{
            color: 'var(--color-accent)',
            fontSize: '0.78rem',
            fontWeight: 500,
            letterSpacing: '0.2em',
            marginBottom: '1.5rem',
            textTransform: 'uppercase',
          }}>
            אודות
          </div>

          <h2 style={{
            color: 'var(--color-text)',
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            lineHeight: 1,
            marginBottom: '3rem',
          }}>
            {content.about.heading}
          </h2>

          {content.about.paragraphs.map((paragraph, i) => (
            <p
              key={i}
              style={{
                color: 'var(--color-text-muted)',
                fontSize: '1rem',
                lineHeight: 2,
                marginBottom: '1.25rem',
              }}
            >
              {paragraph}
            </p>
          ))}

          <div style={{
            display: 'flex',
            gap: 'clamp(2rem, 4vw, 4rem)',
            marginTop: '3.5rem',
            paddingTop: '2.5rem',
            borderTop: '1px solid var(--color-border)',
          }}>
            {stats.map((stat) => (
              <div key={stat.label}>
                <div style={{
                  fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                  fontWeight: 900,
                  color: 'var(--color-text)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                }}>
                  {stat.number}
                </div>
                <div style={{
                  fontSize: '0.78rem',
                  color: 'var(--color-text-dim)',
                  marginTop: '0.6rem',
                  fontWeight: 400,
                  letterSpacing: '0.05em',
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
