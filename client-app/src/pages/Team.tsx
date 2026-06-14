import React from 'react'

const Team = (): JSX.Element => (
  <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
    <h2 style={{ 
      color: '#ffffff',
      fontSize: '28px',
      marginBottom: '24px',
      background: 'linear-gradient(135deg, #00ff88, #00d4ff)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    }}>
      Наша команда
    </h2>
    
    <div style={{
      padding: '24px',
      borderRadius: '12px',
      border: '1px solid rgba(0, 255, 136, 0.2)',
      background: 'linear-gradient(135deg, #1a1f3a 0%, #2d1b69 50%, #1a1f3a 100%)',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
      marginBottom: '32px'
    }}>
      <p style={{ 
        color: '#a0a0a0',
        fontSize: '16px',
        lineHeight: '1.6',
        margin: 0
      }}>
        Мы — команда профессионалов, 
        <span style={{ color: '#00ff88' }}> специализирующихся на организации незабываемых путешествий</span>. 
        С многолетним опытом в туристической индустрии, мы знаем, как сделать каждое путешествие особенным.
      </p>
    </div>

    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px'
    }}>
      {[
        { name: 'Александр Петров', role: 'Директор', emoji: '👔' },
        { name: 'Мария Сидорова', role: 'Менеджер по турам', emoji: '✈️' },
        { name: 'Иван Иванов', role: 'Специалист по отелям', emoji: '🏨' },
        { name: 'Елена Волкова', role: 'Консультант', emoji: '💼' }
      ].map((member, idx) => (
        <div
          key={idx}
          style={{
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid rgba(0, 255, 136, 0.2)',
            background: 'linear-gradient(135deg, rgba(26, 31, 58, 0.8), rgba(45, 27, 105, 0.4))',
            transition: 'all 0.3s ease',
            textAlign: 'center',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.6)'
            e.currentTarget.style.transform = 'translateY(-4px)'
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 255, 136, 0.2)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(0, 255, 136, 0.2)'
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)'
          }}
        >
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>{member.emoji}</div>
          <h3 style={{ color: '#00d4ff', margin: '0 0 8px 0', fontSize: '18px' }}>
            {member.name}
          </h3>
          <p style={{ color: '#a0a0a0', margin: 0, fontSize: '14px' }}>
            {member.role}
          </p>
        </div>
      ))}
    </div>

    <section style={{
      marginTop: '48px',
      padding: '24px',
      borderRadius: '12px',
      border: '1px solid rgba(0, 212, 255, 0.2)',
      background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.05), rgba(0, 255, 136, 0.05))',
      textAlign: 'center'
    }}>
      <h3 style={{ color: '#00ff88', marginTop: 0 }}>
        Почему выбирают нас?
      </h3>
      <ul style={{
        color: '#a0a0a0',
        lineHeight: '2',
        textAlign: 'left',
        display: 'inline-block'
      }}>
        <li>✓ Профессионализм и опыт в организации туров</li>
        <li>✓ Индивидуальный подход к каждому клиенту</li>
        <li>✓ Лучшие предложения на рынке</li>
        <li>✓ Круглосуточная поддержка туристов</li>
      </ul>
    </section>
  </div>
)

export default Team
