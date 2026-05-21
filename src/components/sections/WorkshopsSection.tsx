import { useRef, useEffect } from 'react';
import { content } from '../../config/content';
import { gsap } from '../../animations/gsapSetup';
import { getWhatsAppUrl } from '../../utils/whatsapp';

const workshopImages: Record<string, string> = {
  'בישול בריא': 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80&auto=format',
  'סושי': 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80&auto=format',
  'בצקים ומאפים': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80&auto=format',
  'אפייה': 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=800&q=80&auto=format',
  'עוגות': 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80&auto=format',
  'סדנאות בקבוצות': 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80&auto=format',
  'קיטו': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80&auto=format',
  'אוכל לפטיני': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80&auto=format',
};

export default function WorkshopsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(headingRef.current,
          { y: 80, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: headingRef.current, start: 'top 85%', toggleActions: 'play none none none' },
          }
        );
      }

      const track = trackRef.current!;
      const cards = track.querySelectorAll('.ws-card');
      const totalScroll = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${totalScroll}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1, scale: 1,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="workshops"
      style={{
        background: 'var(--color-bg)',
        overflow: 'hidden',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <div style={{ padding: 'clamp(4rem, 8vw, 6rem) 0 3rem' }}>
        <div ref={headingRef} style={{
          maxWidth: '1400px',
          marginInline: 'auto',
          paddingInline: 'var(--container-padding-x)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: '2rem',
          flexWrap: 'wrap',
        }}>
          <div>
            <div style={{
              color: 'var(--color-accent)',
              fontSize: '0.78rem',
              fontWeight: 500,
              letterSpacing: '0.2em',
              marginBottom: '1.5rem',
            }}>
              סדנאות
            </div>
            <h2 style={{
              color: 'var(--color-text)',
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              lineHeight: 1,
            }}>
              {content.workshops.heading}
            </h2>
          </div>
          <p style={{
            color: 'var(--color-text-dim)',
            fontSize: '0.9rem',
            maxWidth: '350px',
            lineHeight: 1.7,
          }}>
            {content.workshops.subtitle}
          </p>
        </div>
      </div>

      <div
        ref={trackRef}
        style={{
          display: 'flex',
          gap: '1.5rem',
          paddingRight: 'var(--container-padding-x)',
          paddingLeft: 'var(--container-padding-x)',
          paddingBottom: 'clamp(4rem, 8vw, 6rem)',
        }}
      >
        {content.workshops.items.map((workshop, idx) => {
          const image = workshopImages[workshop.title];
          return (
            <div
              key={workshop.title}
              className="ws-card"
              onClick={() => {
                window.open(
                  getWhatsAppUrl(`היי חגית! אשמח לשמוע פרטים על סדנת ${workshop.title}`),
                  '_blank'
                );
              }}
              style={{
                position: 'relative',
                width: 'clamp(320px, 35vw, 450px)',
                aspectRatio: '3/4',
                borderRadius: '4px',
                overflow: 'hidden',
                cursor: 'pointer',
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                const img = e.currentTarget.querySelector('img') as HTMLElement;
                if (img) img.style.transform = 'scale(1.08)';
              }}
              onMouseLeave={(e) => {
                const img = e.currentTarget.querySelector('img') as HTMLElement;
                if (img) img.style.transform = 'scale(1)';
              }}
            >
              <img
                src={image}
                alt={workshop.title}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.2) 50%, transparent 100%)',
              }} />

              <div style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                padding: '0.3rem 0.8rem',
                background: 'var(--color-accent)',
                color: '#0a0a0a',
                fontSize: '0.8rem',
                fontWeight: 700,
                borderRadius: '2px',
              }}>
                {workshop.price}
              </div>

              <div style={{
                position: 'absolute',
                top: '1.5rem',
                left: '1.5rem',
                color: 'var(--color-text-dim)',
                fontSize: '7rem',
                fontWeight: 900,
                lineHeight: 1,
                opacity: 0.08,
              }}>
                {String(idx + 1).padStart(2, '0')}
              </div>

              <div style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                left: 0,
                padding: '2.5rem 2rem',
              }}>
                <h3 style={{
                  color: '#fff',
                  fontSize: 'clamp(1.5rem, 2.5vw, 1.8rem)',
                  fontWeight: 800,
                  marginBottom: '0.75rem',
                  letterSpacing: '-0.01em',
                }}>
                  {workshop.title}
                </h3>
                <p style={{
                  color: 'var(--color-text-muted)',
                  fontSize: '0.85rem',
                  lineHeight: 1.7,
                  marginBottom: '1.25rem',
                }}>
                  {workshop.description}
                </p>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'var(--color-accent)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                }}>
                  <span>לפרטים והרשמה</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
