import React from 'react'

export type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary'
}

export const Button = ({ children, onClick, variant = 'primary' }: ButtonProps): JSX.Element => {
  const style = {
    padding: '10px 16px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 600,
    transition: 'all 0.3s ease',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    fontSize: '14px',
    boxShadow: variant === 'primary' ? '0 4px 15px rgba(0, 255, 136, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.2)',
    backgroundColor: variant === 'primary' ? 'transparent' : '#1a1f3a',
    color: variant === 'primary' ? '#0a0e27' : '#e0e0e0',
    background: variant === 'primary' 
      ? 'linear-gradient(135deg, #00ff88, #00d4ff)' 
      : 'linear-gradient(135deg, #1a1f3a, #2d1b69)',
    border: variant === 'primary' ? 'none' : '1px solid rgba(0, 255, 136, 0.3)'
  }

  return (
    <button 
      style={style as React.CSSProperties} 
      onClick={onClick} 
      data-testid="ui-button"
      onMouseEnter={(e) => {
        (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)'
        if (variant === 'primary') {
          (e.target as HTMLButtonElement).style.boxShadow = '0 8px 25px rgba(0, 255, 136, 0.5)'
        }
      }}
      onMouseLeave={(e) => {
        (e.target as HTMLButtonElement).style.transform = 'translateY(0)'
        if (variant === 'primary') {
          (e.target as HTMLButtonElement).style.boxShadow = '0 4px 15px rgba(0, 255, 136, 0.3)'
        }
      }}
    >
      {children}
    </button>
  )
}
