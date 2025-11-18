import React, { useEffect, useRef, useState, useMemo } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Play, Pause } from 'lucide-react'
import { themeConfig } from '../config/themeConfig'
import { weddingConfig } from '../config/weddingConfig'
import { images, audio } from '../data'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
  const heroRef = useRef(null)
  const contentRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  // Random background position, rotation, and flip
  const bgStyle = useMemo(() => {
    const posX = Math.random() * 100 // 0% to 100%
    const posY = Math.random() * 100 // 0% to 100%
    const rotation = (Math.random() * 360) - 180 // -180 to 180 degrees
    const flipX = Math.random() > 0.5 ? -1 : 1 // Random horizontal flip
    const flipY = Math.random() > 0.5 ? -1 : 1 // Random vertical flip
    return {
      backgroundImage: 'url(/assets/images/graphics/old-book-bg.png)',
      backgroundSize: 'cover',
      backgroundPosition: `${posX}% ${posY}%`,
      transform: `rotate(${rotation}deg) scaleX(${flipX}) scaleY(${flipY})`,
      opacity: 0.5
    }
  }, [])

  // Format date helper
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return {
      dayOfWeek: date.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase(),
      month: date.toLocaleDateString('en-US', { month: 'long' }).toUpperCase(),
      day: date.getDate().toString(),
      year: date.getFullYear().toString()
    }
  }

  const dateInfo = formatDate(weddingConfig.wedding.date)
  const venue = weddingConfig.venue.ceremony

  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio(audio.background)
    audioRef.current.loop = audio.loop
    audioRef.current.volume = audio.volume

    // Cleanup audio on component unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    // Animate content on load
    if (contentRef.current) {
      gsap.fromTo(contentRef.current, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.2, 
          ease: "ease.out", 
          delay: 0.3
        }
      )
    }
  }, [])

  const toggleMusic = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center py-8 px-4"
    >
      {/* Background Image with random position, rotation, and flip */}
      <div 
        className="absolute bg-no-repeat"
        style={{
          ...bgStyle,
          width: '200%',
          height: '200%',
          left: '-50%',
          top: '-50%'
        }}
      />
      
      {/* Corner Borders - Positioned relative to hero section */}
      <img 
        src="/assets/images/graphics/corner border.svg" 
        alt="Corner border" 
        className="absolute top-0 left-0 z-10 object-contain"
        style={{ width: '25vh', height: '25vh', minWidth: '120px', minHeight: '120px', maxWidth: '300px', maxHeight: '300px', transform: 'rotate(90deg) scaleY(-1)' }}
      />
      <img 
        src="/assets/images/graphics/corner border.svg" 
        alt="Corner border" 
        className="absolute top-0 right-0 z-10 object-contain transform rotate-90"
        style={{ width: '25vh', height: '25vh', minWidth: '120px', minHeight: '120px', maxWidth: '300px', maxHeight: '300px' }}
      />
      <img 
        src="/assets/images/graphics/corner border.svg" 
        alt="Corner border" 
        className="absolute bottom-0 left-0 z-10 object-contain transform -rotate-90"
        style={{ width: '25vh', height: '25vh', minWidth: '120px', minHeight: '120px', maxWidth: '300px', maxHeight: '300px' }}
      />
      <img 
        src="/assets/images/graphics/corner border.svg" 
        alt="Corner border" 
        className="absolute bottom-0 right-0 z-10 object-contain transform rotate-180"
        style={{ width: '25vh', height: '25vh', minWidth: '120px', minHeight: '120px', maxWidth: '300px', maxHeight: '300px' }}
      />
      
      {/* Invitation Card Container */}
      <div 
        ref={contentRef} 
        className="relative z-10 max-w-2xl w-full px-8 py-12 sm:px-12 sm:py-16"
      >
        {/* Main Content */}
        <div className="relative z-10 text-center">
          {/* to the wedding of - with absolute positioned SVG above */}
          <div className="relative mb-6">
            {/* YOU'RE INVITED - Curved Arc with Ornate Decorations - Absolute positioned */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-20" style={{ width: '450px', height: '150px' }}>
              <svg width="450" height="150" viewBox="0 0 450 150" className="overflow-visible">
                <defs>
                  {/* Upward curving arc path - more bent, smaller */}
                  <path
                    id="arcPath"
                    d="M 40, 130 Q 225, -5 410, 130"
                    fill="none"
                  />
                </defs>
                
                {/* Curved Text */}
                <text
                  fill="#333333"
                  fontSize="16"
                  fontWeight="bold"
                  fontFamily="serif"
                  letterSpacing="1.8"
                >
                  <textPath
                    href="#arcPath"
                    startOffset="50%"
                    textAnchor="middle"
                  >
                    YOU'RE INVITED
                  </textPath>
                </text>
              </svg>
            </div>
            
            {/* to the wedding of */}
            <div className="text-[#333333] font-lavishly text-sm sm:text-base md:text-lg">
              to the wedding of
            </div>
          </div>

          {/* Names */}
          <div className="mb-6">
            <div className="text-[#333333] alice-regular text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-1">
              {weddingConfig.couple.bride.firstName.toUpperCase()}
            </div>
            <div className="text-[#333333] font-lavishly text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-1">
              and
            </div>
            <div className="text-[#333333] alice-regular text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
              {weddingConfig.couple.groom.firstName.toUpperCase()}
            </div>
          </div>

          {/* Month */}
          <div className="text-[#333333] font-albert font-bold text-lg sm:text-xl md:text-2xl tracking-wider mb-4">
            {dateInfo.month}
          </div>

          {/* Date Block */}
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="text-[#333333] font-albert font-bold text-sm sm:text-base md:text-lg tracking-wider flex items-center">
              {dateInfo.dayOfWeek}
            </div>
            <div className="flex items-center gap-2">
              <div className="w-px h-12 bg-green-600"></div>
              <div className="text-[#333333] font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold flex items-center">
                {dateInfo.day}
              </div>
              <div className="w-px h-12 bg-green-600"></div>
            </div>
            <div className="text-[#333333] font-albert font-bold text-sm sm:text-base md:text-lg tracking-wider flex items-center">
              AT {weddingConfig.wedding.time}
            </div>
          </div>

          {/* Year */}
          <div className="text-[#333333] font-albert font-bold text-base sm:text-lg md:text-xl mb-6">
            {dateInfo.year}
          </div>

          {/* Venue */}
          <div className="text-[#333333] font-albert font-bold text-sm sm:text-base md:text-lg tracking-wider mb-1">
            {venue.name.toUpperCase()}
          </div>
          <div className="text-[#333333] font-albert text-xs sm:text-sm md:text-base mb-6">
            {venue.address}, {venue.city}, {venue.state} {venue.zip}
          </div>

          {/* Music Player Button */}
          <div className="flex justify-center items-center mt-12">
            {/* Left horizontal line */}
            <div className="w-8 h-px bg-[#333333] opacity-40"></div>
            
            <button
              onClick={toggleMusic}
              className="flex items-center justify-center space-x-2 hover:opacity-80 transition-all duration-300 group px-4 pb-2 pt-0"
              style={{ 
                borderRadius: '25px'
              }}
            >
              <span className="text-[#333333] font-lavishly text-2xl sm:text-3xl md:text-4xl lg:text-5xl italic flex items-center leading-none">
                {isPlaying ? 'pause music' : 'play music'}
              </span>
              {isPlaying ? (
                <Pause className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#333333] opacity-80 flex-shrink-0" />
              ) : (
                <Play className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#333333] opacity-80 flex-shrink-0" />
              )}
            </button>
            
            {/* Right horizontal line */}
            <div className="w-8 h-px bg-[#333333] opacity-40"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero