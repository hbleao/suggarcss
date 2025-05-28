export const ComponentList = () => (
  <div style={{ marginBottom: '64px' }}>
    <h2 style={{
      fontSize: '2.2rem',
      color: '#404040',
      marginBottom: '1.6rem',
      position: 'relative',
      paddingBottom: '0.5rem',
      display: 'inline-block',
      borderBottom: '3px solid #00a1fc'
    }}>
      Componentes disponíveis
    </h2>
    <div style={{
      padding: '1.5rem',
      background: '#f8fbff',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0, 70, 192, 0.08)',
      border: '1px solid #00a1fc',
      marginBottom: '2.5rem'
    }}>
      <div style={{ marginBottom: '24px', display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="#00a1fc" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: '16px' }}>
          <path d="M4 8H8V4H4V8ZM10 20H14V16H10V20ZM4 20H8V16H4V20ZM4 14H8V10H4V14ZM10 14H14V10H10V14ZM16 4V8H20V4H16ZM10 8H14V4H10V8ZM16 14H20V10H16V14ZM16 20H20V16H16V20Z" fill="#00a1fc" />
        </svg>
        <h3 style={{ margin: 0, fontSize: '2rem', fontWeight: '600', color: '#404040', marginBottom: '4px' }}>
          Componentes
        </h3>
        <p style={{ margin: '0 0 1.2rem 0', fontSize: '1.6rem', lineHeight: '1.5', color: '#404040' }}>
          Documentação detalhada de todos os componentes disponíveis
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        gap: '0.8rem',
        fontSize: '0.95rem'
      }}>
        <a href="http://localhost:6006/?path=/docs/components-accordion--docs" style={{ padding: '0.5rem', border: '1px solid #66cafc', color: '#404040', fontSize: '1.5rem', borderRadius: '4px' }}>Accordion</a>
        <a href="http://localhost:6006/?path=/docs/components-bannerdouble--docs" style={{ padding: '0.5rem', border: '1px solid #66cafc', color: '#404040', fontSize: '1.5rem', borderRadius: '4px' }}>BannerDouble</a>
        <a href="http://localhost:6006/?path=/docs/components-bannerhero--docs" style={{ padding: '0.5rem', border: '1px solid #66cafc', color: '#404040', fontSize: '1.5rem', borderRadius: '4px' }}>BannerHero</a>
        <a href="http://localhost:6006/?path=/docs/components-bannerbody--docs" style={{ padding: '0.5rem', border: '1px solid #66cafc', color: '#404040', fontSize: '1.5rem', borderRadius: '4px' }}>BannerBody</a>
        <a href="http://localhost:6006/?path=/docs/components-breadcrumb--docs" style={{ padding: '0.5rem', border: '1px solid #66cafc', color: '#404040', fontSize: '1.5rem', borderRadius: '4px' }}>Breadcrumb</a>
        <a href="http://localhost:6006/?path=/docs/components-button--docs" style={{ padding: '0.5rem', border: '1px solid #66cafc', color: '#404040', fontSize: '1.5rem', borderRadius: '4px' }}>Button</a>
        <a href="http://localhost:6006/?path=/docs/components-cardcontent--docs" style={{ padding: '0.5rem', border: '1px solid #66cafc', color: '#404040', fontSize: '1.5rem', borderRadius: '4px' }}>CardContent</a>
        <a href="http://localhost:6006/?path=/docs/components-cardicon--docs" style={{ padding: '0.5rem', border: '1px solid #66cafc', color: '#404040', fontSize: '1.5rem', borderRadius: '4px' }}>CardIcon</a>
        <a href="http://localhost:6006/?path=/docs/components-cardtestimonial--docs" style={{ padding: '0.5rem', border: '1px solid #66cafc', color: '#404040', fontSize: '1.5rem', borderRadius: '4px' }}>CardTestimonial</a>
        <a href="http://localhost:6006/?path=/docs/components-carousel--docs" style={{ padding: '0.5rem', border: '1px solid #66cafc', color: '#404040', fontSize: '1.5rem', borderRadius: '4px' }}>Carousel</a>
        <a href="http://localhost:6006/?path=/docs/components-checkbox--docs" style={{ padding: '0.5rem', border: '1px solid #66cafc', color: '#404040', fontSize: '1.5rem', borderRadius: '4px' }}>Checkbox</a>
        <a href="http://localhost:6006/?path=/docs/components-chip--docs" style={{ padding: '0.5rem', border: '1px solid #66cafc', color: '#404040', fontSize: '1.5rem', borderRadius: '4px' }}>Chip</a>
        <a href="http://localhost:6006/?path=/docs/components-column--docs" style={{ padding: '0.5rem', border: '1px solid #66cafc', color: '#404040', fontSize: '1.5rem', borderRadius: '4px' }}>Column</a>
        <a href="http://localhost:6006/?path=/docs/components-dialog--docs" style={{ padding: '0.5rem', border: '1px solid #66cafc', color: '#404040', fontSize: '1.5rem', borderRadius: '4px' }}>Dialog</a>
        <a href="http://localhost:6006/?path=/docs/components-dropdown--docs" style={{ padding: '0.5rem', border: '1px solid #66cafc', color: '#404040', fontSize: '1.5rem', borderRadius: '4px' }}>Dropdown</a>
        <a href="http://localhost:6006/?path=/docs/components-flex--docs" style={{ padding: '0.5rem', border: '1px solid #66cafc', color: '#404040', fontSize: '1.5rem', borderRadius: '4px' }}>Flex</a>
        <a href="http://localhost:6006/?path=/docs/components-footer--docs" style={{ padding: '0.5rem', border: '1px solid #66cafc', color: '#404040', fontSize: '1.5rem', borderRadius: '4px' }}>Footer</a>
        <a href="http://localhost:6006/?path=/docs/components-grid--docs" style={{ padding: '0.5rem', border: '1px solid #66cafc', color: '#404040', fontSize: '1.5rem', borderRadius: '4px' }}>Grid</a>
        <a href="http://localhost:6006/?path=/docs/components-header--docs" style={{ padding: '0.5rem', border: '1px solid #66cafc', color: '#404040', fontSize: '1.5rem', borderRadius: '4px' }}>Header</a>
        <a href="http://localhost:6006/?path=/docs/components-headeracquisitionflow--docs" style={{ padding: '0.5rem', border: '1px solid #66cafc', color: '#404040', fontSize: '1.5rem', borderRadius: '4px' }}>HeaderAcquisitionFlow</a>
        <a href="http://localhost:6006/?path=/docs/components-input--docs" style={{ padding: '0.5rem', border: '1px solid #66cafc', color: '#404040', fontSize: '1.5rem', borderRadius: '4px' }}>Input</a>
        <a href="http://localhost:6006/?path=/docs/components-link--docs" style={{ padding: '0.5rem', border: '1px solid #66cafc', color: '#404040', fontSize: '1.5rem', borderRadius: '4px' }}>Link</a>
        <a href="http://localhost:6006/?path=/docs/components-loader--docs" style={{ padding: '0.5rem', border: '1px solid #66cafc', color: '#404040', fontSize: '1.5rem', borderRadius: '4px' }}>Loader</a>
        <a href="http://localhost:6006/?path=/docs/components-modal--docs" style={{ padding: '0.5rem', border: '1px solid #66cafc', color: '#404040', fontSize: '1.5rem', borderRadius: '4px' }}>Modal</a>
        <a href="http://localhost:6006/?path=/docs/components-notification--docs" style={{ padding: '0.5rem', border: '1px solid #66cafc', color: '#404040', fontSize: '1.5rem', borderRadius: '4px' }}>Notification</a>
        <a href="http://localhost:6006/?path=/docs/components-progressbar--docs" style={{ padding: '0.5rem', border: '1px solid #66cafc', color: '#404040', fontSize: '1.5rem', borderRadius: '4px' }}>ProgressBar</a>
        <a href="http://localhost:6006/?path=/docs/components-radio--docs" style={{ padding: '0.5rem', border: '1px solid #66cafc', color: '#404040', fontSize: '1.5rem', borderRadius: '4px' }}>Radio</a>
        <a href="http://localhost:6006/?path=/docs/components-showondevice--docs" style={{ padding: '0.5rem', border: '1px solid #66cafc', color: '#404040', fontSize: '1.5rem', borderRadius: '4px' }}>ShowOnDevice</a>
        <a href="http://localhost:6006/?path=/docs/components-skeleton--docs" style={{ padding: '0.5rem', border: '1px solid #66cafc', color: '#404040', fontSize: '1.5rem', borderRadius: '4px' }}>Skeleton</a>
        <a href="http://localhost:6006/?path=/docs/components-spacing--docs" style={{ padding: '0.5rem', border: '1px solid #66cafc', color: '#404040', fontSize: '1.5rem', borderRadius: '4px' }}>Spacing</a>
        <a href="http://localhost:6006/?path=/docs/components-textarea--docs" style={{ padding: '0.5rem', border: '1px solid #66cafc', color: '#404040', fontSize: '1.5rem', borderRadius: '4px' }}>Textarea</a>
        <a href="http://localhost:6006/?path=/docs/components-textbody--docs" style={{ padding: '0.5rem', border: '1px solid #66cafc', color: '#404040', fontSize: '1.5rem', borderRadius: '4px' }}>TextBody</a>
        <a href="http://localhost:6006/?path=/docs/components-tooltip--docs" style={{ padding: '0.5rem', border: '1px solid #66cafc', color: '#404040', fontSize: '1.5rem', borderRadius: '4px' }}>Tooltip</a>
        <a href="http://localhost:6006/?path=/docs/components-typography--docs" style={{ padding: '0.5rem', border: '1px solid #66cafc', color: '#404040', fontSize: '1.5rem', borderRadius: '4px' }}>Typography</a>
      </div>
    </div>
  </div>
)
