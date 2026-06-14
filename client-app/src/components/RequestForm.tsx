import React, { useState } from 'react'

type RequestFormProps = {
  mode: 'tour' | 'hotel'
  itemTitle?: string
}

const nameRegex = /^[A-Za-zА-Яа-яЁё]+$/
const phoneRegex = /^(\+7|8)\d{10}$/

const RequestForm: React.FC<RequestFormProps> = ({ mode, itemTitle }) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({})
  const [status, setStatus] = useState<'idle' | 'success'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: { name?: string; phone?: string } = {}

    if (!name.trim()) {
      newErrors.name = 'Введите имя'
    } else if (!nameRegex.test(name.trim())) {
      newErrors.name = 'Только буквы, одно слово'
    }
    if (!phone.trim()) {
      newErrors.phone = 'Введите телефон'
    } else if (!phoneRegex.test(phone.trim())) {
      newErrors.phone = 'Номер в формате +7********** или 8**********'
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) {
      setStatus('idle')
      return
    }

    // Сохранение заявки в localStorage (имитация базы данных на фронтенде)
    const existingRaw = window.localStorage.getItem('requests')
    const existing = existingRaw ? JSON.parse(existingRaw) : []
    const newRequest = {
      id: Date.now(),
      mode,
      itemTitle,
      name,
      phone,
      createdAt: new Date().toISOString()
    }
    window.localStorage.setItem('requests', JSON.stringify([...existing, newRequest]))

    setStatus('success')
    setName('')
    setPhone('')
  }

  const buttonLabel = mode === 'tour' ? 'Оставить заявку' : 'Забронировать'

  return (
    <form 
      onSubmit={handleSubmit} 
      style={{ 
        marginTop: 16, 
        maxWidth: 360,
        padding: '16px',
        borderRadius: '12px',
        border: '1px solid rgba(0, 255, 136, 0.2)',
        background: 'linear-gradient(135deg, #1a1f3a 0%, #2d1b69 50%, #1a1f3a 100%)',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)'
      }}
    >
      {itemTitle && (
        <p style={{ 
          marginBottom: 12, 
          fontWeight: 600,
          color: '#e0e0e0',
          fontSize: '14px'
        }}>
          {mode === 'tour' ? 'Тур:' : 'Отель:'} <span style={{ color: '#00d4ff' }}>{itemTitle}</span>
        </p>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div>
          <input
            type="text"
            placeholder="Имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: 8,
              border: errors.name ? '1px solid #ff006e' : '1px solid rgba(0, 255, 136, 0.3)',
              background: '#0a0e27',
              color: '#e0e0e0',
              fontSize: '14px',
              transition: 'all 0.3s ease',
              boxShadow: errors.name ? '0 0 10px rgba(255, 0, 110, 0.2)' : 'none'
            }}
            onFocus={(e) => {
              if (!errors.name) {
                e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.8)'
                e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 255, 136, 0.2)'
              }
            }}
            onBlur={(e) => {
              if (!errors.name) {
                e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.3)'
                e.currentTarget.style.boxShadow = 'none'
              }
            }}
          />
          {errors.name && <div style={{ color: '#ff006e', fontSize: 12, marginTop: 4, fontWeight: 500 }}>{errors.name}</div>}
        </div>
        <div>
          <input
            type="tel"
            placeholder="Телефон"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: 8,
              border: errors.phone ? '1px solid #ff006e' : '1px solid rgba(0, 255, 136, 0.3)',
              background: '#0a0e27',
              color: '#e0e0e0',
              fontSize: '14px',
              transition: 'all 0.3s ease',
              boxShadow: errors.phone ? '0 0 10px rgba(255, 0, 110, 0.2)' : 'none'
            }}
            onFocus={(e) => {
              if (!errors.phone) {
                e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.8)'
                e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 255, 136, 0.2)'
              }
            }}
            onBlur={(e) => {
              if (!errors.phone) {
                e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.3)'
                e.currentTarget.style.boxShadow = 'none'
              }
            }}
          />
          {errors.phone && <div style={{ color: '#ff006e', fontSize: 12, marginTop: 4, fontWeight: 500 }}>{errors.phone}</div>}
        </div>
        <button
          type="submit"
          style={{
            padding: '10px 16px',
            borderRadius: 8,
            border: 'none',
            background: 'linear-gradient(135deg, #00ff88, #00d4ff)',
            color: '#0a0e27',
            cursor: 'pointer',
            fontWeight: 600,
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(0, 255, 136, 0.3)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            fontSize: '14px'
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)'
            (e.target as HTMLButtonElement).style.boxShadow = '0 8px 25px rgba(0, 255, 136, 0.5)'
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLButtonElement).style.transform = 'translateY(0)'
            (e.target as HTMLButtonElement).style.boxShadow = '0 4px 15px rgba(0, 255, 136, 0.3)'
          }}
        >
          {buttonLabel}
        </button>
        {status === 'success' && (
          <div style={{ 
            color: '#00ff88', 
            fontSize: 13,
            fontWeight: 600,
            padding: '8px',
            borderRadius: '6px',
            background: 'rgba(0, 255, 136, 0.1)',
            border: '1px solid rgba(0, 255, 136, 0.3)',
            textAlign: 'center'
          }}>
            ✓ Заявка успешно отправлена!
          </div>
        )}
      </div>
    </form>
  )
}

export default RequestForm


