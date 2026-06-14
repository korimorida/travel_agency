import React, { useState, useMemo } from 'react'
import { Card, Button } from 'ui-library'
import tours from '../data/tours.json'
import TourCard from '../components/TourCard'

interface Tour {
  id: number
  title: string
  short: string
  price: number
  rating: number
  popularity: number
  country: string
  maxPeople: number
  durationMin: number
  durationMax: number
  startDate: string
  endDate: string
  photos: string[]
  tags: string[]
}

interface SearchFormState {
  country: string
  departure: string
  durationFrom: string
  durationTo: string
  peopleCount: string
}

type SearchFormKey = keyof SearchFormState

const Home = (): JSX.Element => {
  const [searchForm, setSearchForm] = useState<SearchFormState>({
    country: '',
    departure: '',
    durationFrom: '',
    durationTo: '',
    peopleCount: ''
  })

  const [searchResults, setSearchResults] = useState<Tour[]>([])

  const handleChange = (key: SearchFormKey, value: string): void => {
    let newValue = value

    if (key === 'durationFrom' || key === 'durationTo') {
      const numValue = Number.parseInt(value, 10) || 1

      if (key === 'durationFrom' && numValue > Number.parseInt(searchForm.durationTo || '999', 10)) {
        newValue = searchForm.durationTo || '1'
      } else if (key === 'durationTo' && numValue < Number.parseInt(searchForm.durationFrom || '1', 10)) {
        newValue = searchForm.durationFrom || '1'
      } else {
        newValue = numValue.toString()
      }
    }

    setSearchForm((prev) => ({ ...prev, [key]: newValue }))
  }

  const handleSearch = (): void => {
    const typedTours = tours as Tour[]

    const filtered: Tour[] = typedTours.filter((t) => {
      if (searchForm.country && t.country !== searchForm.country) return false
      if (searchForm.peopleCount && Number.parseInt(searchForm.peopleCount, 10) > t.maxPeople) return false

      const searchFrom = searchForm.durationFrom ? Number.parseInt(searchForm.durationFrom, 10) : null
      const searchTo = searchForm.durationTo ? Number.parseInt(searchForm.durationTo, 10) : null

      if (searchFrom !== null && searchTo !== null) {
        if (!(t.durationMin <= searchFrom && t.durationMax >= searchTo)) return false
      } else if (searchFrom !== null) {
        if (t.durationMin > searchFrom) return false
      } else if (searchTo !== null) {
        if (t.durationMax < searchTo) return false
      }

      return true
    })

    setSearchResults(filtered)
  }

  const displayedTours = useMemo<Tour[]>(() => {
    const typedTours = tours as Tour[]
    return searchResults.length > 0 ? searchResults : typedTours.slice(0, 2)
  }, [searchResults])

  const inputStyle = {
    padding: '10px 12px',
    borderRadius: 8,
    border: '1px solid rgba(0, 255, 136, 0.3)',
    background: '#1a1f3a',
    color: '#e0e0e0',
    fontSize: '14px',
    transition: 'all 0.3s ease'
  }

  return (
    <div>
      <section className="banner">
        <h1>Лучшие туры по России!</h1>
        <p>Выберите тур вашей мечты</p>

        <div style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <select
            value={searchForm.country}
            onChange={(e) => handleChange('country', e.target.value)}
            style={{
              ...inputStyle,
              cursor: 'pointer'
            } as React.CSSProperties}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.8)'
              e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 255, 136, 0.2)'
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.3)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <option value="">Выберите страну</option>
            <option value="Россия">Россия</option>
            <option value="Египет">Египет</option>
          </select>

          <input
            type="date"
            value={searchForm.departure}
            onChange={(e) => handleChange('departure', e.target.value)}
            placeholder="Период вылета"
            style={inputStyle as React.CSSProperties}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.8)'
              e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 255, 136, 0.2)'
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.3)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          />

          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input
              type="number"
              min="1"
              value={searchForm.durationFrom}
              onChange={(e) => handleChange('durationFrom', e.target.value)}
              placeholder="От (дни)"
              style={{ ...inputStyle, width: 100 } as React.CSSProperties}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.8)'
                e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 255, 136, 0.2)'
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.3)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            />

            <input
              type="number"
              min="1"
              value={searchForm.durationTo}
              onChange={(e) => handleChange('durationTo', e.target.value)}
              placeholder="До (дни)"
              style={{ ...inputStyle, width: 100 } as React.CSSProperties}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.8)'
                e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 255, 136, 0.2)'
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.3)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            />
          </div>

          <input
            type="number"
            min="1"
            value={searchForm.peopleCount}
            onChange={(e) => handleChange('peopleCount', e.target.value)}
            placeholder="Кол-во людей"
            style={inputStyle as React.CSSProperties}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.8)'
              e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 255, 136, 0.2)'
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.3)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          />

          <Button onClick={handleSearch}>Поиск</Button>
        </div>
      </section>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ 
          color: '#ffffff',
          fontSize: '28px',
          marginBottom: '24px',
          background: 'linear-gradient(135deg, #00ff88, #00d4ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          {searchResults.length > 0 ? 'Результаты поиска' : 'Лучшие туры по России'}
        </h2>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {displayedTours.map((t) => (
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
              layout="bottom"
            />
          ))}
        </div>
      </section>

      <section style={{ marginTop: 32, marginBottom: '32px' }}>
        <h2 style={{ 
          color: '#ffffff',
          fontSize: '28px',
          marginBottom: '24px',
          background: 'linear-gradient(135deg, #ff006e, #00d4ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Акции и предложения
        </h2>
        <div style={{
          padding: '24px',
          borderRadius: '12px',
          border: '1px solid rgba(255, 0, 110, 0.3)',
          background: 'linear-gradient(135deg, rgba(255, 0, 110, 0.05), rgba(0, 212, 255, 0.05))',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)'
        }}>
          <h3 style={{ color: '#00ff88', marginTop: 0 }}>Летняя распродажа</h3>
          <p style={{ color: '#a0a0a0' }}>Скидки до 30% на семейные туры!</p>
        </div>
      </section>
    </div>
  )
}

export default Home
