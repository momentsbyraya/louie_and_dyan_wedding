import React, { useEffect, useRef, useMemo } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Calendar, Clock } from 'lucide-react'
import { themeConfig } from '../config/themeConfig'
import { couple } from '../data'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Counter = ({ countdown }) => {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const countdownRef = useRef(null)
  const dateTimeRef = useRef(null)

  // Background using opening-2 image
  const bgStyle = useMemo(() => {
    return {
      backgroundImage: 'url(/assets/images/prenup/opening-2.png)',
      backgroundSize: 'cover',
      backgroundPosition: '65% center',
      backgroundRepeat: 'no-repeat',
      opacity: 0.4
    }
  }, [])

  useEffect(() => {
    // Scroll-triggered animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 50%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    })

    // Header animation first
    tl.fromTo(headerRef.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    )

    // Countdown container animation
    tl.fromTo(countdownRef.current, 
      { opacity: 0, y: 50, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power2.out" },
      "-=0.4"
    )

    // Countdown numbers stagger animation
    tl.fromTo(".countdown-number", 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: "power2.out",
        stagger: 0.2
      },
      "-=0.5"
    )

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="details"
      className="relative w-full overflow-hidden pt-20"
    >
      {/* Background Image - Prenup image */}
      <div 
        className="absolute inset-0 bg-no-repeat"
        style={bgStyle}
      />
      
      {/* Content */}
      <div className="relative z-20 flex items-center justify-center py-12">
        <div className="max-w-xs sm:max-w-md lg:max-w-xl w-full mx-auto px-8 sm:px-12 md:px-8 lg:px-16 aspect-square">
          {/* Header Section */}
          <div className="text-center">
            <h2 ref={headerRef} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 font-caribbean pt-4 sm:pt-6 md:pt-8 whitespace-nowrap" style={{ background: 'linear-gradient(135deg, #edb030 0%, #d99a1a 20%, #926018 50%, #775016 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl inline-block leading-none" style={{ lineHeight: '0.8' }}>S</span>
              <span className="inline-block">ave the Date</span>
            </h2>
            <div ref={countdownRef}>
              <p className="text-base sm:text-lg font-albert font-thin text-[#333333] max-w-3xl mx-auto leading-relaxed">
                Mark your calendar for<br />our special day
              </p>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="flex flex-row justify-center items-center gap-4 sm:gap-6 md:gap-8 px-4 mt-16 sm:mt-20 md:mt-24 lg:mt-28 flex-wrap">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-gilliequest mb-1 countdown-number" style={{ color: '#8B4513' }}>
                {countdown.days}
              </div>
              <div className="text-xs sm:text-sm text-[#333333] opacity-80 font-medium">Days</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-gilliequest mb-1 countdown-number" style={{ color: '#8B4513' }}>
                {countdown.hours}
              </div>
              <div className="text-xs sm:text-sm text-[#333333] opacity-80 font-medium">Hours</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-gilliequest mb-1 countdown-number" style={{ color: '#8B4513' }}>
                {countdown.minutes}
              </div>
              <div className="text-xs sm:text-sm text-[#333333] opacity-80 font-medium">Minutes</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-gilliequest mb-1 countdown-number" style={{ color: '#8B4513' }}>
                {countdown.seconds}
              </div>
              <div className="text-xs sm:text-sm text-[#333333] opacity-80 font-medium">Seconds</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Counter 