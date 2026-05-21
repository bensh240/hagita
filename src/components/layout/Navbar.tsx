import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { content } from '../../config/content';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        left: 0,
        zIndex: 1000,
        padding: scrolled ? '0.75rem 0' : '1.25rem 0',
        background: scrolled ? 'rgba(10, 10, 10, 0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(1.2)' : 'none',
        borderBottom: scrolled ? '1px solid var(--color-border)' : 'none',
        transition: 'all 0.4s ease',
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          marginInline: 'auto',
          paddingInline: 'var(--container-padding-x)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); handleClick('#hero'); }}
          style={{
            fontSize: '1.2rem',
            fontWeight: 800,
            color: '#fff',
            letterSpacing: '-0.02em',
          }}
        >
          {content.brand.name}
          <span style={{ color: 'var(--color-accent)' }}>.</span>
        </a>

        <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }} className="desktop-nav">
          {content.nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleClick(link.href); }}
              style={{
                color: 'var(--color-text-dim)',
                fontWeight: 400,
                fontSize: '0.82rem',
                letterSpacing: '0.05em',
                transition: 'color 0.3s',
                position: 'relative',
              }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.color = 'var(--color-text)'; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'var(--color-text-dim)'; }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="תפריט"
          style={{ display: 'none', flexDirection: 'column', gap: '5px', padding: '4px' }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: 'block',
                width: '20px',
                height: '1.5px',
                background: '#fff',
                transition: 'all 0.3s',
                transform: menuOpen
                  ? i === 0 ? 'rotate(45deg) translate(4.5px, 4.5px)'
                  : i === 1 ? 'scaleX(0)'
                  : 'rotate(-45deg) translate(4.5px, -4.5px)'
                  : 'none',
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mobile-menu"
            style={{
              background: 'rgba(10, 10, 10, 0.98)',
              backdropFilter: 'blur(20px)',
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: '1.5rem var(--container-padding-x)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {content.nav.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleClick(link.href); }}
                  style={{
                    color: 'var(--color-text-muted)',
                    fontWeight: 500,
                    fontSize: '1rem',
                    padding: '1rem 0',
                    borderBottom: '1px solid var(--color-border)',
                    transition: 'color 0.3s',
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu { display: none !important; }
        }
      `}</style>
    </motion.nav>
  );
}
