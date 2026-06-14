import React, { useState, useMemo } from 'react'
import tours from '../data/tours.json'
import TourCard from '../components/TourCard'

type SortBy = 'rating' | 'price' | 'popularity'

interface FiltersState {
  type: string
  country: string
}

type FilterKey = keyof FiltersState

const isSortBy = (value: string): value is SortBy =>
  value === 'price' || value === 'rating' || value === 'popularity'

const Tours = (): JSX.Element => {
  const [filters, setFilters] = useState<FiltersState>({
    type: '',
    country: ''
  })

  const [sortBy, setSortBy] = useState<SortBy>('price')
  const [isTypeOpen, setIsTypeOpen] = useState<boolean>(false)
  const [isCountryOpen, setIsCountryOpen] = useState<boolean>(false)

  const tagOptions = useMemo<string[]>(
    () => Array.from(new Set(tours.flatMap(t => t.tags))).sort(),
    []
  )

  const countryOptions = useMemo<string[]>(
    () => Array.from(new Set(tours.map(t => t.country))).sort(),
    []
  )

  const filteredAndSortedTours = useMemo(() => {
    const filtered = tours.filter(t => {
      if (filters.type && !t.tags.includes(filters.type)) return false
      if (filters.country && t.country !== filters.country) return false
      return true
    })

    filtered.sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0)
      if (sortBy === 'popularity') return (b.popularity || 0) - (a.popularity || 0)
      return 0
    })

    return filtered
  }, [filters, sortBy])

  const handleFilterChange = (key: FilterKey, value: string): void => {
    setFilters(prev => ({ ...prev, [key]: value }))
    if (key === 'type') setIsTypeOpen(false)
    if (key === 'country') setIsCountryOpen(false)
  }

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
        Каталог туров
      </h2>

      <div style={{ marginBottom: 24, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
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
            onClick={() => { setIsTypeOpen(prev => !prev); setIsCountryOpen(false) }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.8)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.3)'
            }}
          >
            {filters.type || 'Тип тура'}
          </button>

          {isTypeOpen && (
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
                onClick={() => handleFilterChange('type', '')}
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
                Все типы
              </div>

              {tagOptions.map(tag => (
                <div
                  key={tag}
                  onClick={() => handleFilterChange('type', tag)}
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
                  {tag}
                </div>
              ))}

              {tagOptions.length === 0 && <div style={{ padding: '10px 14px', color: '#666' }}>Нет тегов</div>}
            </div>
          )}
        </div>

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
            onClick={() => { setIsCountryOpen(prev => !prev); setIsTypeOpen(false) }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.8)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.3)'
            }}
          >
            {filters.country || 'Страна'}
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
                onClick={() => handleFilterChange('country', '')}
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
                  onClick={() => handleFilterChange('country', country)}
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

        <select
          value={sortBy}
          onChange={(e) => {
            const value = e.target.value
            if (isSortBy(value)) setSortBy(value)
          }}
          style={{
            padding: '10px 12px',
            borderRadius: 8,
            border: '1px solid rgba(0, 255, 136, 0.3)',
            background: '#1a1f3a',
            color: '#e0e0e0',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.8)'
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.3)'
          }}
        >
          <option value="price">По цене</option>
          <option value="rating">По рейтингу</option>
          <option value="popularity">По популярности</option>
        </select>
      </div>

      <div style={{ display: 'grid', gap: 16 }}>
        {filteredAndSortedTours.map((t) => (
          <TourCard
            key={t.id}
            id={t.id}
            title={t.title}
            short={t.short}
            price={t.price}
            rating={t.rating}
            popularity={t.popularity}
            country={t.country}
            maxPeople={t.maxPeople}
            durationMin={t.durationMin}
            durationMax={t.durationMax}
            startDate={t.startDate}
            endDate={t.endDate}
            photos={t.photos}
            tags={t.tags}
          />
        ))}
      </div>
    </div>
  )
}

export default Tours
