import React from 'react'

export type InputProps = {
  value: string
  onChange: (v: string) => void
  placeholder?: string
}

export const Input = ({ value, onChange, placeholder }: InputProps): JSX.Element => {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{ 
        padding: '10px 12px',
        borderRadius: 8,
        border: '1px solid rgba(0, 255, 136, 0.3)',
        background: '#1a1f3a',
        color: '#e0e0e0',
        fontSize: '14px',
        transition: 'all 0.3s ease',
        flex: 1,
        minWidth: '200px'
      }}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.8)'
        e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 255, 136, 0.2)'
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.3)'
        e.currentTarget.style.boxShadow = 'none'
      }}
      data-testid="ui-input"
    />
  )
}
