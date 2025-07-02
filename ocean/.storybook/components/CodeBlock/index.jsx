export const CodeBlock = ({ 
  children, 
  language = '', 
  title = null,
  backgroundColor = '#f5f7fa'
}) => (
  <div style={{ 
    background: '#eef9ff',
    borderRadius: '8px',
    overflow: 'hidden',
    marginBottom: '1rem'
  }}>
    {title && (
      <div style={{
        background: '#1381e2',
        color: 'white',
        padding: '0.5rem 1rem',
        fontSize: '0.9rem',
        fontWeight: '500'
      }}>
        {title}
      </div>
    )}
    <pre style={{ 
      background: backgroundColor, 
      padding: '1rem', 
      borderRadius: title ? '0 0 4px 4px' : '4px', 
      fontFamily: 'monospace', 
      overflowX: 'auto',
      margin: 0
    }}>
      {children}
    </pre>
  </div>
)
