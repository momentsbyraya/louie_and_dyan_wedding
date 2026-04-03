import React from 'react'

const GradientLayer = ({ height, opacity, gradientId, transform = 'translateY(8px)' }) => {
  const solidEndOpacity = Math.min(opacity + 0.2, 0.95)
  const waveAmplitude = opacity * 8
  const waveFrequency = 0.02

  const generateWavePath = (width, heightVal, amplitude, frequency) => {
    let path = `M 0 ${heightVal} L 0 ${amplitude} `
    for (let x = 0; x <= width; x += 2) {
      const y = amplitude + Math.sin(x * frequency) * amplitude
      path += `L ${x} ${y} `
    }
    path += `L ${width} ${heightVal} Z`
    return path
  }

  return (
    <svg
      className={`absolute bottom-0 left-0 w-full ${height} pointer-events-none`}
      style={{ transform }}
      preserveAspectRatio="none"
      viewBox="0 0 1200 120"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" />
          <stop offset="60%" stopColor={`rgba(255, 255, 255, ${opacity * 0.5})`} />
          <stop offset="85%" stopColor={`rgba(255, 255, 255, ${opacity * 0.8})`} />
          <stop offset="100%" stopColor={`rgba(255, 255, 255, ${solidEndOpacity})`} />
        </linearGradient>
      </defs>
      <path
        d={generateWavePath(1200, 120, waveAmplitude, waveFrequency)}
        fill={`url(#${gradientId})`}
      />
    </svg>
  )
}

export default GradientLayer
