import { content } from '../../config/content';

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--color-bg)',
        color: 'var(--color-text)',
        padding: '3rem 0',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <div style={{
        maxWidth: '1400px',
        marginInline: 'auto',
        paddingInline: 'var(--container-padding-x)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <div>
          <span style={{ fontSize: '1rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
            {content.brand.name}
            <span style={{ color: 'var(--color-accent)' }}>.</span>
          </span>
        </div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <a
            href={content.footer.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--color-text-dim)', fontSize: '0.8rem', letterSpacing: '0.1em', transition: 'color 0.3s' }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.color = 'var(--color-text)'; }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'var(--color-text-dim)'; }}
          >
            Instagram
          </a>
          <a
            href={content.footer.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--color-text-dim)', fontSize: '0.8rem', letterSpacing: '0.1em', transition: 'color 0.3s' }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.color = 'var(--color-text)'; }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'var(--color-text-dim)'; }}
          >
            Facebook
          </a>
        </div>
        <p style={{ fontSize: '0.72rem', color: 'var(--color-text-dim)', letterSpacing: '0.03em' }}>
          {content.footer.copyright}
        </p>
      </div>
    </footer>
  );
}
