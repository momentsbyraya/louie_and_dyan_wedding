import React, { useEffect, useRef, useMemo } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { weddingConfig } from '../config/weddingConfig'
import { venues } from '../data'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
  const heroRef = useRef(null)
  const invitedRef = useRef(null)
  const monogramRef = useRef(null)
  const coupleNameRef = useRef(null)
  const dateRef = useRef(null)
  const venueRef = useRef(null)

  // Background style - centered, no zoom
  const bgStyle = useMemo(() => {
    return {
      backgroundImage: `url("/assets/images/prenup/new/FOR EDITS-23.jpg")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      opacity: 1,
      '@media (min-width: 992px)': {
        backgroundPosition: 'center bottom'
      }
    }
  }, [])

  // Top background layer style
  const bgTopStyle = useMemo(() => {
    return {
      backgroundImage: 'url(/assets/images/graphics/old-book-bg.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      opacity: 0.1
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
  const shortBrideName = "Grace"
  const groomName = weddingConfig.couple.groom.firstName.charAt(0).toUpperCase() + weddingConfig.couple.groom.firstName.slice(1).toLowerCase()
  const heroGold = '#D4AF37'
  const heroWhiteTextShadow = '0 2px 4px rgba(255, 255, 255, 0.6)'

  useEffect(() => {
    // Create a timeline for sequential scroll animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top 90%",
        end: "bottom 10%",
        scrub: false,
        toggleActions: "play none none none"
      }
    })

    // Animate invited text first
    if (invitedRef.current) {
      tl.fromTo(invitedRef.current, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.2, 
          ease: "ease.out"
        }
      )
    }
    // Animate monogram second
    if (monogramRef.current) {
      tl.fromTo(monogramRef.current, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.2, 
          ease: "ease.out"
        },
        "-=0.8" // Start 0.8s before previous animation ends
      )
    }
    // Animate couple name third
    if (coupleNameRef.current) {
      tl.fromTo(coupleNameRef.current, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.2, 
          ease: "ease.out"
        },
        "-=0.8"
      )
    }
    // Animate date
    if (dateRef.current) {
      tl.fromTo(dateRef.current, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.2, 
          ease: "ease.out"
        },
        "-=0.8"
      )
    }
    // Animate venue after date
    if (venueRef.current) {
      tl.fromTo(venueRef.current, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.2, 
          ease: "ease.out"
        },
        "-=0.8"
      )
    }

    // Cleanup ScrollTrigger instances
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])


  return (
    <>
      <section
        ref={heroRef}
        className="relative w-full overflow-hidden flex flex-col items-center justify-center py-8 px-4"
        style={{ height: '100svh' }}
      >
      <style>{`
        @media (min-width: 992px) {
          .hero-bg-image {
            background-position: center bottom !important;
          }
          .hero-monogram {
            width: 18rem !important;
          }
          .hero-content-container {
            padding-top: 2.5rem !important;
          }
          .hero-couple-title {
            font-size: clamp(1.25rem, 2vw, 1.9rem) !important;
          }
          .hero-venue-bottom {
            padding-bottom: 1rem !important;
          }
          .hero-venue-name {
            font-size: 0.95rem !important;
          }
        }
      `}</style>
      {/* Background Image - centered, no zoom */}
      <div 
        className="absolute inset-0 z-0 hero-bg-image"
        style={bgStyle}
      />
      {/* Top Background Layer - old-book-bg */}
      <div 
        className="absolute inset-0 z-0"
        style={bgTopStyle}
      />
      
      {/* Content Container */}
      <div className="hero-content-container relative z-10 h-full flex flex-col items-center justify-start pt-8 sm:pt-12 md:pt-16 lg:pt-20">
        {/* "YOU ARE INVITED" - Top Header */}
        <div ref={invitedRef} className="mb-6 sm:mb-8 text-center opacity-0">
          <div className="caudex-bold text-xs sm:text-sm md:text-base tracking-widest leading-none uppercase" style={{ color: heroGold, textShadow: heroWhiteTextShadow }}>
            YOU ARE INVITED
          </div>
          <div className="caudex-bold text-xs sm:text-sm md:text-base tracking-widest leading-none uppercase mt-2" style={{ color: heroGold, textShadow: heroWhiteTextShadow }}>
            TO THE WEDDING OF
          </div>
        </div>

        {/* Monogram */}
        <div ref={monogramRef} className="flex justify-center opacity-0">
          <img 
            src="/assets/images/graphics/monogram.png" 
            alt="Monogram" 
            className="hero-monogram w-48 sm:w-64 md:w-80 h-auto"
            style={{ filter: 'drop-shadow(0 4px 8px rgba(255, 255, 255, 0.4))' }}
          />
        </div>

        {/* Couple Names - Serif Dark Gold Gradient */}
        <div ref={coupleNameRef} className="-mt-4 sm:-mt-6 md:-mt-8 mb-6 sm:mb-8 flex justify-center items-center w-full opacity-0">
          <h1 className="hero-couple-title text-center uppercase whitespace-nowrap leading-tight" style={{ 
            fontFamily: 'Caudex, serif', 
            background: 'linear-gradient(135deg, #B8860B 0%, #D4AF37 50%, #F4D03F 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', 
            textShadow: heroWhiteTextShadow,
            filter: 'drop-shadow(0 2px 4px rgba(255, 255, 255, 0.4))'
          }}>
            {groomName.toUpperCase()} & {shortBrideName.toUpperCase()}
          </h1>
        </div>

        {/* Date and Time */}
        <div ref={dateRef} className="mb-2 sm:mb-3 lg:hidden opacity-0">
          {/* Month - Centered */}
          <div className="alice-regular font-bold text-sm sm:text-base md:text-lg tracking-wider text-center" style={{ color: heroGold, textShadow: heroWhiteTextShadow }}>
            {dateInfo.month}
          </div>
          {/* Day of Week, Day Number, and Time */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6 max-w-md mx-auto">
            {/* Day of Week - Left with lines */}
            <div className="flex flex-col items-center">
              <div className="w-12 sm:w-16 md:w-20 h-px mb-0" style={{ backgroundColor: heroGold, boxShadow: '0 0 4px rgba(255, 255, 255, 0.6)' }}></div>
              <div className="alice-regular font-bold text-xs sm:text-sm md:text-base tracking-wider" style={{ color: heroGold, textShadow: heroWhiteTextShadow }}>
                {dateInfo.dayOfWeek}
              </div>
              <div className="w-12 sm:w-16 md:w-20 h-px mt-0" style={{ backgroundColor: heroGold, boxShadow: '0 0 4px rgba(255, 255, 255, 0.6)' }}></div>
            </div>
            {/* Day Number - Large and Centered */}
            <div className="alice-regular font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl" style={{ color: heroGold, textShadow: heroWhiteTextShadow }}>
              {dateInfo.day}
            </div>
            {/* Time - Right with lines */}
            <div className="flex flex-col items-center">
              <div className="w-12 sm:w-16 md:w-20 h-px mb-0" style={{ backgroundColor: heroGold, boxShadow: '0 0 4px rgba(255, 255, 255, 0.6)' }}></div>
              <div className="alice-regular font-bold text-xs sm:text-sm md:text-base tracking-wider" style={{ color: heroGold, textShadow: heroWhiteTextShadow }}>
                {venue.time.replace(/\s/g, '').toUpperCase()}
              </div>
              <div className="w-12 sm:w-16 md:w-20 h-px mt-0" style={{ backgroundColor: heroGold, boxShadow: '0 0 4px rgba(255, 255, 255, 0.6)' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Venue Name - Bottom */}
      <div ref={venueRef} className="hero-venue-bottom absolute bottom-0 left-0 right-0 z-10 text-center pb-8 opacity-0">
        <div
          className="hero-venue-name alice-regular font-bold text-sm sm:text-base md:text-lg tracking-wider uppercase"
          style={{ color: heroGold, textShadow: heroWhiteTextShadow }}
          dangerouslySetInnerHTML={{ __html: venue.name.toUpperCase().replace('AQUILA', 'AQUILA<br />') }}
        >
        </div>
      </div>
    </section>
    </>
  )
}

export default Hero
