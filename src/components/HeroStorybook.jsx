import React, { useEffect, useRef, useMemo } from 'react'
import { gsap } from 'gsap'
import { weddingConfig } from '../config/weddingConfig'
import { venues } from '../data'

const HeroStorybook = () => {
  const heroRef = useRef(null)
  const contentRef = useRef(null)
  const invitedRef = useRef(null)
  const coupleNameRef = useRef(null)
  const dateRef = useRef(null)

  // Background style - centered, no zoom
  const bgStyle = useMemo(() => {
    return {
      backgroundImage: 'url(/assets/images/prenup/ISE00201.JPG)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      opacity: 1
    }
  }, [])

  // Top background layer style
  const bgTopStyle = useMemo(() => {
    return {
      backgroundImage: 'url(/assets/images/graphics/old-book-bg.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      opacity: 0.2
    }
  }, [])

  // Format date helper
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = date.getDate()
    return {
      dayOfWeek: date.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase(),
      month: date.toLocaleDateString('en-US', { month: 'long' }).toUpperCase(),
      day: day.toString().padStart(2, '0'),
      year: date.getFullYear().toString()
    }
  }

  const dateInfo = formatDate(weddingConfig.wedding.date)
  const venue = venues.ceremony
  const brideName = weddingConfig.couple.bride.firstName.charAt(0).toUpperCase() + weddingConfig.couple.bride.firstName.slice(1).toLowerCase()
  const groomName = weddingConfig.couple.groom.firstName.charAt(0).toUpperCase() + weddingConfig.couple.groom.firstName.slice(1).toLowerCase()
  const brideFirstLetter = brideName.charAt(0)
  const groomFirstLetter = groomName.charAt(0)
  const brideRest = brideName.substring(1)
  const groomRest = groomName.substring(1)


  useEffect(() => {
    // Sequential animations: YOU ARE INVITED -> Couple Name -> Date
    if (invitedRef.current) {
      gsap.fromTo(invitedRef.current, 
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

    if (coupleNameRef.current) {
      gsap.fromTo(coupleNameRef.current, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.2, 
          ease: "ease.out", 
          delay: 0.8
        }
      )
    }

    if (dateRef.current) {
      gsap.fromTo(dateRef.current, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.2, 
          ease: "ease.out", 
          delay: 1.3
        }
      )
    }
  }, [])


  return (
    <>
      <section
        ref={heroRef}
        className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center py-8 px-4"
      >
      {/* Background Image - centered, no zoom */}
      <div 
        className="absolute inset-0 z-0"
        style={bgStyle}
      />
      {/* Top Background Layer - old-book-bg */}
      <div 
        className="absolute inset-0 z-0"
        style={bgTopStyle}
      />
      
      {/* Corner Borders - Positioned relative to hero section */}
      <img 
        src="/assets/images/graphics/border-corner.png" 
        alt="Corner border" 
        className="absolute top-0 left-0 z-10 object-contain"
        style={{ width: '18vh', height: '18vh', minWidth: '80px', minHeight: '80px', maxWidth: '200px', maxHeight: '200px', transform: 'rotate(90deg) scaleY(-1)' }}
      />
      <img 
        src="/assets/images/graphics/border-corner.png" 
        alt="Corner border" 
        className="absolute top-0 right-0 z-10 object-contain transform rotate-90"
        style={{ width: '18vh', height: '18vh', minWidth: '80px', minHeight: '80px', maxWidth: '200px', maxHeight: '200px' }}
      />
      <img 
        src="/assets/images/graphics/border-corner.png" 
        alt="Corner border" 
        className="absolute bottom-0 left-0 z-10 object-contain transform -rotate-90"
        style={{ width: '18vh', height: '18vh', minWidth: '80px', minHeight: '80px', maxWidth: '200px', maxHeight: '200px' }}
      />
      <img 
        src="/assets/images/graphics/border-corner.png" 
        alt="Corner border" 
        className="absolute bottom-0 right-0 z-10 object-contain transform rotate-180"
        style={{ width: '18vh', height: '18vh', minWidth: '80px', minHeight: '80px', maxWidth: '200px', maxHeight: '200px' }}
      />
      
      {/* Invitation Card Container */}
      <div 
        ref={contentRef} 
        className="relative z-10 max-w-2xl w-full px-8 sm:px-12 py-12 sm:py-16 h-full flex items-center justify-center mx-auto"
      >
        {/* Main Content */}
        <div className="relative z-10 flex flex-col justify-between h-full text-center w-full">
          {/* Group 1: Top Paragraph, Name, and Date */}
          <div>
            {/* "YOU ARE INVITED" - Top Header */}
            <div ref={invitedRef} className="mb-4 sm:mb-6">
              <div className="text-white caudex-bold text-xs sm:text-sm md:text-base tracking-widest leading-none uppercase">
                YOU ARE INVITED
              </div>
            </div>

            {/* Couple Names - Main Title with Drop Caps */}
            <div ref={coupleNameRef} className="pt-4 sm:pt-6 md:pt-8 mb-6 sm:mb-8">
              <h1 className="font-heart-of-everything text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-center capitalize leading-tight" style={{ background: 'linear-gradient(135deg, #FFF8DC 0%, #FFEAA7 30%, #F7DC6F 60%, #F4D03F 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                <span className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] inline-block leading-none mr-1" style={{ lineHeight: '0.75', marginTop: '-0.1em' }}>{groomFirstLetter}</span>
                {groomRest} &nbsp;&
                <br className="sm:hidden" />
                <span className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] inline-block leading-none mr-1" style={{ lineHeight: '0.75', marginTop: '-0.1em' }}>{brideFirstLetter}</span>
                {brideRest}
              </h1>
            </div>

            {/* Date and Time */}
            <div ref={dateRef} className="mb-2 sm:mb-3">
              {/* Month - Centered */}
              <div className="text-white alice-regular font-bold text-base sm:text-lg md:text-xl tracking-wider text-center">
                {dateInfo.month}
              </div>
              {/* Day of Week, Day Number, and Time */}
              <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8 max-w-md mx-auto">
                {/* Day of Week - Left with lines */}
                <div className="flex flex-col items-center">
                  <div className="w-16 sm:w-20 md:w-24 lg:w-28 h-px bg-white mb-0"></div>
                  <div className="text-white alice-regular font-bold text-sm sm:text-base md:text-lg tracking-wider">
                    {dateInfo.dayOfWeek}
                  </div>
                  <div className="w-16 sm:w-20 md:w-24 lg:w-28 h-px bg-white mt-0"></div>
                </div>
                {/* Day Number - Large and Centered */}
                <div className="text-white alice-regular font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
                  {dateInfo.day}
                </div>
                {/* Time - Right with lines */}
                <div className="flex flex-col items-center">
                  <div className="w-16 sm:w-20 md:w-24 lg:w-28 h-px bg-white mb-0"></div>
                  <div className="text-white alice-regular font-bold text-sm sm:text-base md:text-lg tracking-wider">
                    {venue.time.replace(/\s/g, '').toUpperCase()}
                  </div>
                  <div className="w-16 sm:w-20 md:w-24 lg:w-28 h-px bg-white mt-0"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default HeroStorybook

