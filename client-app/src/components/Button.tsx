import React from 'react'

export type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
}

export const Button = ({ children, onClick }: ButtonProps): JSX.Element => (
  <button 
    onClick={onClick} 
    style={{ 
      padding: '10px 16px',
      borderRadius: 8,
      border: 'none',
      background: 'linear-gradient(135deg, #00ff88, #00d4ff)',
      color: '#0a0e27',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(0, 255, 136, 0.3)',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      fontSize: '14px'
    }}
    onMouseEnter={(e) => {
      const target = e.target as HTMLButtonElement
      target.style.transform = 'translateY(-2px)'
      target.style.boxShadow = '0 8px 25px rgba(0, 255, 136, 0.5)'
    }}
    onMouseLeave={(e) => {
      const target = e.target as HTMLButtonElement
      target.style.transform = 'translateY(0)'
      target.style.boxShadow = '0 4px 15px rgba(0, 255, 136, 0.3)'
    }}
  >
    {children}
  </button>
)

export default Button
