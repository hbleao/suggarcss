export const FeatureGrid = ({ 
  children, 
  columns = 'repeat(auto-fill, minmax(300px, 1fr))',
  gap = '1.5rem'
}) => (
  <div style={{
    display: 'grid',
    gridTemplateColumns: columns,
    gap: gap,
    marginBottom: '1.5rem'
  }}>
    {children}
  </div>
)

export const FeatureItem = ({
  title,
  description,
  icon = null,
  backgroundColor = '#eef9ff',
  borderColor = '#0046c0',
  titleColor = '#0046c0'
}) => (
  <div style={{
    flex: '1',
    minWidth: '250px',
    background: backgroundColor,
    padding: '1rem',
    borderRadius: '8px',
    borderLeft: `3px solid ${borderColor}`
  }}>
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
      {icon && (
        <div style={{
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          background: borderColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: '12px',
          flexShrink: 0
        }}>
          {icon}
        </div>
      )}
      <div>
        <h4 style={{
          margin: '0 0 0.5rem 0',
          color: titleColor,
          fontSize: '1.1rem'
        }}>
          {title}
        </h4>
        <p style={{
          margin: '0',
          paddingLeft: icon ? '0' : '1.2rem',
          fontSize: '0.95rem',
          color: '#444',
          lineHeight: '1.5'
        }}>
          {description}
        </p>
      </div>
    </div>
  </div>
)
