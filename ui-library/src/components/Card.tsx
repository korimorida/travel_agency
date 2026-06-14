import React from 'react'

export type CardProps = {
  title: string
  children?: React.ReactNode
}

export const Card = ({ title, children }: CardProps): JSX.Element => {
  const style = {
    border: '1px solid rgba(0, 255, 136, 0.2)',
    borderRadius: '12px',
    padding: '16px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(0, 255, 136, 0.1)',
    background: 'linear-gradient(135deg, #1a1f3a 0%, #2d1b69 50%, #1a1f3a 100%)',
    transition: 'all 0.3s ease'
  }

  return (
    <article 
      style={style as React.CSSProperties} 
      data-testid="ui-card"
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.6)'
        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 255, 136, 0.2), inset 0 1px 0 rgba(0, 255, 136, 0.1)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.2)'
        e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(0, 255, 136, 0.1)'
      }}
    >
      <h3 style={{ margin: '0 0 12px 0', color: '#00d4ff' }}>{title}</h3>
      <div style={{ color: '#a0a0a0' }}>{children}</div>
    </article>
  )
}
