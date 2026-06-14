import React, { useState, useMemo } from 'react'
import hotels from '../data/hotels.json'
import { Input } from 'ui-library'
import ProductCard from '../components/ProductCard'
import { Link } from 'react-router-dom'

const Hotels = (): JSX.Element => {
  const [search, setSearch] = useState('')
  const [countryFilter, setCountryFilter] = useState('')
  const [isCountryOpen, setIsCountryOpen] = useState(false)

  const countryOptions = useMemo(
    () => Array.from(new Set(hotels.map(h => h.country).filter(Boolean))).sort(),
    []
  )

  const filteredHotels = useMemo(() => {
    return hotels.filter(h => {
      const matchesText =
        h.name.toLowerCase().includes(search.toLowerCase()) ||
        h.desc.toLowerCase().includes(search.toLowerCase())
      const matchesCountry = countryFilter ? h.country === countryFilter : true
      return matchesText && matchesCountry
    })
  }, [search, countryFilter])

  return (
    <div>
      <h2 style={{ 
        color: '#ffffff',
        fontSize: '28px',
        marginBottom: '24px',
        background: 'linear-gradient(135deg, #00ff88, #00d4ff)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}>
        Каталог отелей
      </h2>
      <div style={{ marginBottom: 24, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <Input value={search} onChange={setSearch} placeholder="Поиск по названию или описанию" />
        <div style={{ position: 'relative' }}>
          <button
            type="button"
            style={{ 
              padding: '10px 14px', 
              borderRadius: 8, 
              border: '1px solid rgba(0, 255, 136, 0.3)', 
              minWidth: 180, 
              background: '#1a1f3a',
              color: '#e0e0e0',
              textAlign: 'left',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onClick={() => setIsCountryOpen(prev => !prev)}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.8)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.3)'
            }}
          >
            {countryFilter || 'Страна'}
          </button>
          {isCountryOpen && (
            <div style={{ 
              position: 'absolute', 
              zIndex: 10, 
              marginTop: 4, 
              background: '#1a1f3a', 
              border: '1px solid rgba(0, 255, 136, 0.3)',
              borderRadius: 8, 
              boxShadow: '0 8px 32px rgba(0, 255, 136, 0.15)', 
              maxHeight: 200, 
              overflowY: 'auto', 
              minWidth: 180
            }}>
              <div
                onClick={() => { setCountryFilter(''); setIsCountryOpen(false) }}
                style={{ 
                  padding: '10px 14px', 
                  cursor: 'pointer', 
                  color: '#a0a0a0',
                  borderBottom: '1px solid rgba(0, 255, 136, 0.1)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 255, 136, 0.1)'
                  e.currentTarget.style.color = '#00ff88'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = '#a0a0a0'
                }}
              >
                Все страны
              </div>
              {countryOptions.map(country => (
                <div
                  key={country}
                  onClick={() => { setCountryFilter(country); setIsCountryOpen(false) }}
                  style={{ 
                    padding: '10px 14px', 
                    cursor: 'pointer',
                    color: '#a0a0a0',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 255, 136, 0.1)'
                    e.currentTarget.style.color = '#00ff88'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = '#a0a0a0'
                  }}
                >
                  {country}
                </div>
              ))}
              {countryOptions.length === 0 && <div style={{ padding: '10px 14px', color: '#666' }}>Нет стран</div>}
            </div>
          )}
        </div>
      </div>
      <div style={{ display: 'grid', gap: 16 }}>
        {filteredHotels.map((h) => (
          <Link key={h.id} to={`/hotel/${h.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <ProductCard
              id={h.id}
              name={h.name}
              desc={h.desc}
              rating={h.rating}
              popularity={h.popularity}
              country={h.country}
              price={h.price}
              maxPeople={h.maxPeople}
              durationMin={h.durationMin}
              durationMax={h.durationMax}
              startDate={h.startDate}
              endDate={h.endDate}
              image={h.photos[0]}
              buttonText="Узнать подробнее"
              layout="left"
            />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Hotels
