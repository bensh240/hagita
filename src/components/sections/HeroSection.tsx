import { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { content } from '../../config/content';
import { gsap } from '../../animations/gsapSetup';

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !imageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(imageRef.current, {
        scale: 1.15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      gsap.to(overlayRef.current, {
        opacity: 0.95,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '40% top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const lines = content.hero.headline.split('\n');

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: '700px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
      }}
    >
      <div
        ref={imageRef}
        style={{
          position: 'absolute',
          inset: '-10%',
          backgroundImage: 'url(https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1920&q=85&auto=format)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
          willChange: 'transform',
        }}
      />

      <div
        ref={overlayRef}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.5) 40%, rgba(10,10,10,0.85) 100%)',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 10,
          padding: '0 var(--container-padding-x)',
          paddingBottom: 'clamp(4rem, 10vh, 8rem)',
          maxWidth: '1400px',
          width: '100%',
          marginInline: 'auto',
        }}
      >
        {loaded && (
          <>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '60px' }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{
                height: '2px',
                background: 'var(--color-accent)',
                marginBottom: '1.5rem',
              }}
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{
                color: 'var(--color-accent)',
                fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
                fontWeight: 500,
                letterSpacing: '0.15em',
                marginBottom: '1.5rem',
                textTransform: 'uppercase',
              }}
            >
              {content.brand.tagline}
            </motion.p>

            <h1 style={{
              color: '#fff',
              fontSize: 'clamp(3.5rem, 10vw, 8rem)',
              lineHeight: 0.95,
              fontWeight: 900,
              letterSpacing: '-0.04em',
              marginBottom: '2.5rem',
            }}>
              {lines.map((line, lineIdx) => (
                <span key={lineIdx} style={{ display: 'block' }}>
                  {line.split(' ').map((word, i) => (
                    <span key={i} style={{ display: 'inline-block', overflow: 'hidden', marginLeft: '0.25em' }}>
                      <motion.span
                        initial={{ y: '120%' }}
                        animate={{ y: '0%' }}
                        transition={{
                          duration: 1.2,
                          delay: 0.7 + lineIdx * 0.15 + i * 0.06,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        style={{ display: 'inline-block' }}
                      >
                        {word}
                      </motion.span>
                    </span>
                  ))}
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 1.5 }}
              style={{
                color: 'var(--color-text-muted)',
                fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
                maxWidth: '450px',
                lineHeight: 1.8,
              }}
            >
              {content.hero.subtitle}
            </motion.p>
          </>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1.5 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <span style={{ color: 'var(--color-text-dim)', fontSize: '0.7rem', letterSpacing: '0.15em', fontWeight: 300 }}>
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(to bottom, var(--color-text-dim), transparent)',
          }}
        />
      </motion.div>
    </section>
  );
}
