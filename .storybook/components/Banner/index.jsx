
export const BannerDOC = (props) => (
  <div className="banner"
    style={{
      background: 'linear-gradient(135deg, #0046c0 0%, #31b5fc 100%)',
      color: 'white',
      padding: '3rem',
      borderRadius: '12px',
      textShadow: '1px 1px 1px rgb(42, 42, 42)',
      marginBottom: '64px',
      boxShadow: '0 8px 24px rgba(0, 70, 192, 0.25)',
      position: 'relative',
      overflow: 'hidden',
      minHeight: '240px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}
  >
    {/* Pseudo-elemento decorativo 1 - círculo grande */}
    <div
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '180px',
        height: '180px',
        background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)',
        borderRadius: '50%',
        transform: 'translate(30%, -30%)'
      }}
    />

    {/* Pseudo-elemento decorativo 2 - círculo médio */}
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: '10%',
        width: '150px',
        height: '150px',
        background: 'radial-gradient(circle, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 70%)',
        borderRadius: '50%',
        transform: 'translate(-30%, 30%)'
      }}
    />

    {/* Novo elemento decorativo - ondas */}
    <div
      style={{
        position: 'absolute',
        bottom: '10px',
        right: '10px',
        width: '200px',
        height: '100px',
        background: 'url("data:image/svg+xml,%3Csvg width=\'200\' height=\'100\' viewBox=\'0 0 200 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 50 C 40 30, 60 70, 100 50 C 140 30, 160 70, 200 50 L 200 100 L 0 100 Z\' fill=\'rgba(255,255,255,0.1)\' /%3E%3C/svg%3E")',
        backgroundSize: 'cover',
        opacity: '0.7'
      }}
    />

    {/* Novo elemento decorativo - pontos */}
    <div
      style={{
        position: 'absolute',
        top: '50px',
        left: '50px',
        width: '100px',
        height: '100px',
        backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
        backgroundSize: '15px 15px',
        opacity: '0.2'
      }}
    />

    <h1 style={{
      fontSize: '3.5rem',
      marginBottom: '1.5rem',
      fontWeight: '800',
      color: '#fff',
      position: 'relative',
      zIndex: '2'
    }}>
      {props?.title || ''}
    </h1>

    <p style={{
      fontSize: '1.6rem',
      maxWidth: '800px',
      lineHeight: '1.7',
      color: 'white',
      position: 'relative',
      zIndex: '2'
    }}>
      {props?.description}
    </p>
  </div>
)
