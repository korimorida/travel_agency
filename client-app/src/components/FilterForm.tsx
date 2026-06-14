import React from 'react'

type Props = {
  onFilter?: (q: Record<string, string>) => void
}

export const FilterForm = ({ onFilter }: Props): JSX.Element => {
  const [query, setQuery] = React.useState('')

  return (
    <form 
      onSubmit={(e) => { e.preventDefault(); onFilter?.({ q: query }) }} 
      style={{ display: 'flex', gap: 12, marginBottom: 24 }}
    >
      <input 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Поиск по названию или стране"
        style={{
          padding: '10px 14px',
          borderRadius: 8,
          border: '1px solid rgba(0, 255, 136, 0.3)',
          background: '#1a1f3a',
          color: '#e0e0e0',
          flex: 1,
          transition: 'all 0.3s ease',
          fontSize: '14px'
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.8)'
          e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 255, 136, 0.2)'
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.3)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      />
      <button 
        type="submit"
        style={{
          padding: '10px 24px',
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
        Поиск
      </button>
    </form>
  )
}

export default FilterForm
