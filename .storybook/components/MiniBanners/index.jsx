export const MiniBanners = () => (
  <>
    <div style={{
      marginBottom: '46px',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div>
        <h2 style={{
          fontSize: '2.2rem',
          color: '#404040',
          marginBottom: '1.6rem',
          position: 'relative',
          paddingBottom: '0.5rem',
          display: 'inline-block',
          borderBottom: '3px solid #00a1fc'
        }}>
          Continuando
        </h2>
      </div>

      <div style={{ display: 'flex', gap: '1.6rem' }}>
        <a href="http://localhost:6006/?path=/docs/padr%C3%B5es-t%C3%A9cnicos--docs" style={{
          minWidth: '280px',
          padding: '1.5rem',
          background: '#0046c0',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 70, 192, 0.08)',
          flex: '1'
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', marginBottom: '1rem' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: '1rem' }}>
              <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" fill="#fff" />
            </svg>
            <h3 style={{ margin: 0, fontSize: '2rem', fontWeight: '600', color: '#fff' }}>
              Padrões Técnicos
            </h3>
          </div>
          <p style={{ margin: 0, fontSize: '1.6rem', lineHeight: '1.5', color: '#fff' }}>
            Convenções de código e padrões de desenvolvimento
          </p>
        </a>

        <a href="http://localhost:6006/?path=/docs/contribuindo--docs" style={{
          flex: '1',
          minWidth: '280px',
          padding: '1.5rem',
          background: '#0046c0',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 70, 192, 0.08)',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', marginBottom: '1rem' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: '1rem' }}>
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="#fff" />
            </svg>
            <h3 style={{ margin: 0, fontSize: '2rem', fontWeight: '600', color: '#fff' }}>
              Contribuição
            </h3>
          </div>
          <p style={{ margin: 0, fontSize: '1.6rem', lineHeight: '1.5', color: '#fff' }}>
            Guia para contribuir com o Ocean
          </p>
        </a>
      </div>
    </div>

    <div>

      <div>
        <h2 style={{
          fontSize: '2.2rem',
          color: '#404040',
          marginBottom: '1.6rem',
          position: 'relative',
          paddingBottom: '0.5rem',
          display: 'inline-block',
          borderBottom: '3px solid #00a1fc'
        }}>
          Recursos
        </h2>
      </div>
      <ul>
        <li><a style={{ color: '#404040', fontWeight: 600 }} href="https://www.figma.com/design/BMMDsBIAaBAkJ48RXKki52/-DS--Branding-Porto-Seguro?node-id=0-1&p=f&t=df983oMWKSvC3GRz-0">Marca Porto</a></li>
        <li><a style={{ color: '#404040', fontWeight: 600 }} href="https://www.figma.com/design/WiyXiK3hQA1DDqDWHxcpnE/-DS--Componentes-Globais?node-id=0-1&p=f&t=I96yEWX42MV3GCPJ-0">Componentes Globais</a></li>
        <li><a style={{ color: '#404040', fontWeight: 600 }} href="https://www.figma.com/design/zvftCI0Xg1TRRmux4c3P1L/-DS--Componentes-Web?node-id=0-1&p=f&t=9yawDKQ4TdErdiIt-0">Componentes WEB</a></li>
      </ul>
    </div>


  </>
)
