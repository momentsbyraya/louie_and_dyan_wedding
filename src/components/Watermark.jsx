import React from 'react'

const Watermark = () => {
  const watermarkText = "THIS IS HALF DONE FOR CLIENT APPROVAL ONLY"
  
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
      style={{
        opacity: 0.12
      }}
    >
      {/* Rotated container for diagonal watermark */}
      <div 
        className="absolute"
        style={{
          transform: 'rotate(-45deg)',
          transformOrigin: 'center center',
          width: '300vw',
          height: '300vh',
          left: '-100vw',
          top: '-100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          gap: '120px'
        }}
      >
        {/* Create repeating rows */}
        {Array.from({ length: 50 }).map((_, rowIndex) => (
          <div 
            key={rowIndex}
            className="flex"
            style={{
              gap: '400px',
              marginLeft: `${rowIndex % 2 === 0 ? '0' : '200px'}`
            }}
          >
            {/* Create repeating text in each row */}
            {Array.from({ length: 15 }).map((_, colIndex) => (
              <span
                key={colIndex}
                className="text-gray-700 font-bold whitespace-nowrap"
                style={{
                  fontSize: '32px',
                  letterSpacing: '4px',
                  fontWeight: 700
                }}
              >
                {watermarkText}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Watermark

