import React from 'react'
import { useParams } from 'react-router-dom'
import hotels from '../data/hotels.json'
import RequestForm from '../components/RequestForm'

const HotelInfo = (): JSX.Element => {
  const { id } = useParams()
  const hotel = hotels.find((h) => String(h.id) === id)

  if (!hotel) return <div style={{ color: '#e0e0e0', fontSize: '18px', padding: '24px' }}>Отель не найден</div>

  const conditions = 'Удобства: Wi-Fi, бассейн, ресторан. Правила: регистрация с 14:00.'
  const reviews = hotel.reviews ?? []
  const flights = hotel.flights ?? []

  const reviewCardStyle = {
    border: '1px solid rgba(0, 255, 136, 0.2)',
    padding: '12px',
    marginBottom: '12px',
    borderRadius: '8px',
    background: 'linear-gradient(135deg, rgba(26, 31, 58, 0.8), rgba(45, 27, 105, 0.4))',
    transition: 'all 0.3s ease'
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ 
        color: '#ffffff',
        fontSize: '32px',
        marginBottom: '16px',
        background: 'linear-gradient(135deg, #00ff88, #00d4ff)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}>
        {hotel.name}
      </h2>

      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '12px',
        marginBottom: '24px',
        padding: '16px',
        borderRadius: '12px',
        border: '1px solid rgba(0, 255, 136, 0.2)',
        background: 'linear-gradient(135deg, rgba(26, 31, 58, 0.5), rgba(45, 27, 105, 0.3))'
      }}>
        <div><strong style={{ color: '#00d4ff' }}>Страна:</strong> <span style={{ color: '#a0a0a0' }}>{hotel.country}</span></div>
        <div><strong style={{ color: '#00d4ff' }}>Цена от:</strong> <span style={{ color: '#00ff88', fontWeight: '600' }}>{hotel.price}₽</span></div>
        <div><strong style={{ color: '#00d4ff' }}>Рейтинг:</strong> <span style={{ color: '#a0a0a0' }}>★ {hotel.rating}</span></div>
      </div>

      <p style={{ color: '#a0a0a0', lineHeight: '1.6', marginBottom: '24px', fontSize: '15px' }}>{hotel.desc}</p>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: '32px' }}>
        {hotel.photos.map((p) => (
          <img 
            key={p} 
            src={p} 
            alt="hotel" 
            style={{ 
              width: 260, 
              height: 180, 
              objectFit: 'cover', 
              borderRadius: 12,
              border: '1px solid rgba(0, 255, 136, 0.3)',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLImageElement).style.transform = 'scale(1.05)'
              (e.target as HTMLImageElement).style.boxShadow = '0 8px 25px rgba(0, 255, 136, 0.4)'
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLImageElement).style.transform = 'scale(1)'
              (e.target as HTMLImageElement).style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)'
            }}
          />
        ))}
      </div>

      <section style={{ marginBottom: '32px' }}>
        <h3 style={{ 
          color: '#ffffff',
          fontSize: '22px',
          marginBottom: '16px',
          borderBottom: '2px solid rgba(0, 255, 136, 0.3)',
          paddingBottom: '8px'
        }}>
          Условия проживания
        </h3>
        <p style={{ 
          color: '#a0a0a0',
          padding: '16px',
          borderRadius: '8px',
          border: '1px solid rgba(0, 255, 136, 0.2)',
          background: 'linear-gradient(135deg, rgba(26, 31, 58, 0.5), rgba(45, 27, 105, 0.3))'
        }}>
          {conditions}
        </p>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h3 style={{ 
          color: '#ffffff',
          fontSize: '22px',
          marginBottom: '16px',
          borderBottom: '2px solid rgba(0, 255, 136, 0.3)',
          paddingBottom: '8px'
        }}>
          Отзывы
        </h3>
        {reviews.length > 0 ? (
          reviews.map((r) => (
            <div 
              key={r.id} 
              style={reviewCardStyle as React.CSSProperties}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.6)'
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 255, 136, 0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.2)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <strong style={{ color: '#00d4ff' }}>{r.author}</strong>
              <p style={{ margin: '8px 0', color: '#a0a0a0' }}>{r.text}</p>
              <div style={{ color: '#00ff88', fontSize: '14px' }}>★ {r.rating}/5</div>
            </div>
          ))
        ) : (
          <p style={{ color: '#666' }}>Нет отзывов</p>
        )}
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h3 style={{ 
          color: '#ffffff',
          fontSize: '22px',
          marginBottom: '16px',
          borderBottom: '2px solid rgba(0, 255, 136, 0.3)',
          paddingBottom: '8px'
        }}>
          Доступные рейсы
        </h3>
        {flights.length > 0 ? (
          flights.map((f) => (
            <div 
              key={f.id} 
              style={reviewCardStyle as React.CSSProperties}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.6)'
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 255, 136, 0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.2)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ color: '#00d4ff', fontWeight: '600' }}>{f.from}</span>
                  <span style={{ color: '#666', margin: '0 8px' }}>→</span>
                  <span style={{ color: '#00d4ff', fontWeight: '600' }}>{f.to}</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#a0a0a0', fontSize: '14px' }}>{f.date}</div>
                  <div style={{ color: '#00ff88', fontWeight: '600' }}>{f.price}₽</div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p style={{ color: '#666' }}>Нет рейсов</p>
        )}
      </section>

      <section style={{ marginBottom: '48px' }}>
        <RequestForm mode="hotel" itemTitle={hotel.name} />
      </section>
    </div>
  )
}

export default HotelInfo
