export const ContentCard = ({
  title,
  children,
  borderColor = '#0046c0',
  backgroundColor = 'white',
  icon = null
}) => (
  <div
    style={{
      background: backgroundColor,
      border: '1px solid #e0f0ff',
      border: `1px solid ${borderColor}`,
      padding: '1.5rem',
      borderRadius: '8px',
      marginBottom: '2rem',
      boxShadow: '0 2px 8px rgba(0, 70, 192, 0.05)'
    }}
  >
    {title && (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '1.2rem'
      }}>
        {icon && (
          <div style={{
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '12px',
            flexShrink: 0,
            color: borderColor
          }}>
            {icon}
          </div>
        )}
        <h2 style={{
          color: '#404040',
          margin: '0',
          fontSize: '18px',
          fontWeight: '600'
        }}>
          {title}
        </h2>
      </div>
    )}
    {children}
  </div>
)
