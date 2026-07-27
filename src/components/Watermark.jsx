import React from 'react'

const Watermark = () => {
  const watermarkText = 'THIS IS HALF DONE. FOR CLIENT APPROVAL ONLY'

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9998] overflow-hidden"
      aria-hidden="true"
      style={{
        opacity: 0.12,
      }}
    >
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
          gap: '120px',
        }}
      >
        {Array.from({ length: 50 }).map((_, rowIndex) => (
          <div
            key={rowIndex}
            className="flex"
            style={{
              gap: '720px',
              marginLeft: `${rowIndex % 2 === 0 ? '0' : '360px'}`,
            }}
          >
            {Array.from({ length: 15 }).map((_, colIndex) => (
              <span
                key={colIndex}
                className="whitespace-nowrap font-albert font-semibold text-[#2D4251]"
                style={{
                  fontSize: '17px',
                  letterSpacing: '0.12em',
                  fontWeight: 600,
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
