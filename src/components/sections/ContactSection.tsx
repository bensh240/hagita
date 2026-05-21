import { useState, useRef, useEffect, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { content } from '../../config/content';
import { gsap } from '../../animations/gsapSetup';
import { getWhatsAppUrl, buildWhatsAppMessage } from '../../utils/whatsapp';

export default function ContactSection() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;
    const ctx = gsap.context(() => {
      const children = contentRef.current!.children;
      gsap.fromTo(children,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: contentRef.current, start: 'top 80%', toggleActions: 'play none none none' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    window.open(getWhatsAppUrl(buildWhatsAppMessage(name, phone, message)), '_blank');
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '1.1rem 1.25rem',
    borderRadius: '4px',
    border: '1px solid var(--color-border)',
    background: 'var(--color-bg)',
    fontSize: '0.92rem',
    color: 'var(--color-text)',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  };

  const focusHandler = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = 'var(--color-accent)';
  };
  const blurHandler = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = 'var(--color-border)';
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      style={{
        background: 'var(--color-bg)',
        padding: 'clamp(8rem, 15vw, 14rem) 0',
        overflow: 'hidden',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <div ref={contentRef} style={{
        maxWidth: '600px',
        marginInline: 'auto',
        paddingInline: 'var(--container-padding-x)',
        textAlign: 'center',
      }}>
        <div style={{
          color: 'var(--color-accent)',
          fontSize: '0.78rem',
          fontWeight: 500,
          letterSpacing: '0.2em',
          marginBottom: '1.5rem',
        }}>
          צור קשר
        </div>

        <h2 style={{
          color: 'var(--color-text)',
          fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
          fontWeight: 900,
          letterSpacing: '-0.03em',
          lineHeight: 1,
          marginBottom: '1.5rem',
        }}>
          {content.contact.heading}
        </h2>

        <p style={{
          color: 'var(--color-text-dim)',
          fontSize: '1rem',
          lineHeight: 1.8,
          marginBottom: '3rem',
        }}>
          {content.contact.subtitle}
        </p>

        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'right' }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <input type="text" placeholder={content.contact.form.name} value={name} onChange={(e) => setName(e.target.value)} required style={inputStyle} onFocus={focusHandler} onBlur={blurHandler} />
            <input type="tel" placeholder={content.contact.form.phone} value={phone} onChange={(e) => setPhone(e.target.value)} required style={inputStyle} onFocus={focusHandler} onBlur={blurHandler} />
          </div>
          <textarea placeholder={content.contact.form.message} value={message} onChange={(e) => setMessage(e.target.value)} rows={5} style={{ ...inputStyle, resize: 'vertical' }} onFocus={focusHandler} onBlur={blurHandler} />

          <motion.button
            type="submit"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              padding: '1.1rem 2rem',
              borderRadius: '4px',
              background: 'var(--color-accent)',
              color: '#0a0a0a',
              fontSize: '0.95rem',
              fontWeight: 700,
              marginTop: '0.5rem',
              transition: 'background 0.3s ease',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--color-accent-light)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--color-accent)'; }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {content.contact.form.submit}
          </motion.button>
        </form>
      </div>
    </section>
  );
}
