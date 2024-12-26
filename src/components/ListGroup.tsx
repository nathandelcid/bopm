function ListGroup() {
  return (
    <>
      <div style={{ 
        display: 'flex',
        justifyContent: 'center',  // Centers the container
        position: 'relative'       // For absolute positioning of "about"
      }}>
        <h2 style={{ 
          position: 'absolute',
          left: '10px',           // Adjust this value to position "about"
          top: '50%',
          transform: 'translateY(-50%)',
          margin: 0,
          cursor: 'pointer'
        }}>about</h2>
      
        
        
        <h1>binomial options pricing model</h1>
      </div>
      <h4>by nathan delcid</h4>
      <h2>🇺🇸</h2>
    </>
  );
}

export default ListGroup;