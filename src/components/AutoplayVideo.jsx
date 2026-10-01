import React, { useEffect, useRef } from 'react'
//d
const AutoplayVideo = ({
  src,
  type,
  poster,
  threshold = 0.5,
  className = '',
  loop = true,
  muted = true,
  playsInline = true,
  controls = true,
  aspectRatio = '16 / 9',
}) => {
  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const hasPlayedRef = useRef(false)

  useEffect(() => {
    const container = containerRef.current
    const video = videoRef.current
    if (!container || !video) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const playPromise = video.play()
            if (playPromise && typeof playPromise.catch === 'function') {
              playPromise.catch(() => {})
            }
            hasPlayedRef.current = true
          } else if (hasPlayedRef.current) {
            video.pause()
          }
        })
      },
      { threshold }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [threshold])

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden bg-black ${className}`}
      style={{ aspectRatio }}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        controls={controls}
        preload="metadata"
        poster={poster}
        src={src}
      >
        {type && <source src={src} type={type} />}
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

export default AutoplayVideo
