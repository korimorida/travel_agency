import React from 'react'

export const Footer = (): JSX.Element => (
  <footer style={{ 
    padding: '24px',
    background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0a0e27 100%)',
    borderTop: '2px solid #00ff88',
    boxShadow: '0 -8px 32px rgba(0, 255, 136, 0.15)',
    marginTop: '48px'
  }}>
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ 
        marginBottom: '16px',
        background: 'linear-gradient(135deg, #00ff88, #00d4ff)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        fontWeight: '600',
        fontSize: '14px'
      }}>
        Контакты: +7 (123) 456-78-90
      </div>
      <div style={{ display: 'flex', gap: '16px', color: '#a0a0a0', fontSize: '14px' }}>
        <a 
          href="https://wa.me/71234567890"
          style={{
            color: '#00d4ff',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            textShadow: '0 0 10px rgba(0, 212, 255, 0.3)'
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLAnchorElement).style.color = '#00ff88'
            (e.target as HTMLAnchorElement).style.textShadow = '0 0 10px rgba(0, 255, 136, 0.6)'
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLAnchorElement).style.color = '#00d4ff'
            (e.target as HTMLAnchorElement).style.textShadow = '0 0 10px rgba(0, 212, 255, 0.3)'
          }}
        >
          WhatsApp
        </a>
        <span style={{ color: '#666' }}>|</span>
        <a 
          href="https://t.me/travelagency"
          style={{
            color: '#00d4ff',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            textShadow: '0 0 10px rgba(0, 212, 255, 0.3)'
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLAnchorElement).style.color = '#00ff88'
            (e.target as HTMLAnchorElement).style.textShadow = '0 0 10px rgba(0, 255, 136, 0.6)'
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLAnchorElement).style.color = '#00d4ff'
            (e.target as HTMLAnchorElement).style.textShadow = '0 0 10px rgba(0, 212, 255, 0.3)'
          }}
        >
          Telegram
        </a>
      </div>
    </div>
  </footer>
)

export default Footer
