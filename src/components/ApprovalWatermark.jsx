import React, { useMemo } from 'react'

const WATERMARK_TEXT = 'THIS IS HALF DONE — FOR CLIENT APPROVAL ONLY'

const ApprovalWatermark = () => {
  const backgroundImage = useMemo(() => {
    const tileWidth = 900
    const tileHeight = 600
    const svg = `
      <svg xmlns='http://www.w3.org/2000/svg' width='${tileWidth}' height='${tileHeight}' viewBox='0 0 ${tileWidth} ${tileHeight}'>
        <g transform='rotate(-30 ${tileWidth / 2} ${tileHeight / 2})' fill='rgba(0,0,0,0.3)' font-family='Arial, Helvetica, sans-serif' font-size='32' font-weight='700' letter-spacing='2'>
          <text x='50%' y='120' text-anchor='middle'>${WATERMARK_TEXT}</text>
          <text x='50%' y='260' text-anchor='middle'>${WATERMARK_TEXT}</text>
          <text x='50%' y='400' text-anchor='middle'>${WATERMARK_TEXT}</text>
          <text x='50%' y='540' text-anchor='middle'>${WATERMARK_TEXT}</text>
        </g>
      </svg>
    `.trim()
    return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`
  }, [])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundImage,
        backgroundRepeat: 'repeat',
        pointerEvents: 'none',
        userSelect: 'none',
        zIndex: 2147483647,
        mixBlendMode: 'multiply',
      }}
    />
  )
}

export default ApprovalWatermark
