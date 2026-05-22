import React, { useEffect, useRef } from 'react'

const AutoplayYouTube = ({
  videoId,
  title = 'YouTube video',
  threshold = 0.5,
  className = '',
}) => {
  const containerRef = useRef(null)
  const iframeRef = useRef(null)
  const hasPlayedRef = useRef(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return undefined

    const post = (func) => {
      const iframe = iframeRef.current
      if (!iframe || !iframe.contentWindow) return
      iframe.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func, args: [] }),
        '*'
      )
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            post('playVideo')
            hasPlayedRef.current = true
          } else if (hasPlayedRef.current) {
            post('pauseVideo')
          }
        })
      },
      { threshold }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [threshold])

  const src =
    `https://www.youtube.com/embed/${videoId}` +
    `?enablejsapi=1` +
    `&mute=1` +
    `&playsinline=1` +
    `&controls=0` +
    `&rel=0` +
    `&modestbranding=1` +
    `&showinfo=0` +
    `&iv_load_policy=3` +
    `&disablekb=1` +
    `&fs=0` +
    `&loop=1` +
    `&playlist=${videoId}`

  return (
    <div
      ref={containerRef}
      className={`relative aspect-video w-full overflow-hidden ${className}`}
    >
      <iframe
        ref={iframeRef}
        src={src}
        title={title}
        className="absolute inset-0 h-full w-full border-0 pointer-events-none"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      />
    </div>
  )
}

export default AutoplayYouTube
