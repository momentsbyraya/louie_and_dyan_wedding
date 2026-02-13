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

  // Background using prenup image
  const bgStyle = useMemo(() => {
    return {
      backgroundImage: 'url(/assets/images/prenup/image-1.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
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
      className="relative py-20 w-full overflow-hidden"
    >
      {/* Background Image - Prenup image */}
      <div 
        className="absolute inset-0 bg-no-repeat"
        style={bgStyle}
      />
      
      {/* Content */}
      <div className="relative z-20 flex items-center justify-center py-12">
        <div className="max-w-xs sm:max-w-md lg:max-w-xl w-full mx-auto px-8 sm:px-12 md:px-8 lg:px-16">
          {/* Header Section */}
          <div className="text-center">
            <h2 ref={headerRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3 font-gilliequest uppercase" style={{ background: 'linear-gradient(135deg, #edb030 0%, #d99a1a 20%, #926018 50%, #775016 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl inline-block leading-none" style={{ lineHeight: '0.8' }}>S</span>
              <span className="inline-block">AVE</span> THE DATE
            </h2>
            <div ref={countdownRef}>
              <p className="text-base sm:text-lg font-albert font-thin text-[#333333] max-w-3xl mx-auto leading-relaxed">
                Mark your calendar for<br />our special day
              </p>
              <div className="flex justify-center items-center">
                {/* Left horizontal line */}
                <div className="w-16 h-px bg-[#333333] opacity-40"></div>
                
                <img 
                  src="/assets/images/graphics/graphics-1.svg" 
                  alt="Decorative graphic" 
                  className="w-32 sm:w-40 md:w-48 h-auto mx-4"
                />
                
                {/* Right horizontal line */}
                <div className="w-16 h-px bg-[#333333] opacity-40"></div>
              </div>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="flex justify-center items-center space-x-3 px-4 mt-8">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl imperial-script-regular text-[#333333] mb-1 countdown-number not-italic">
                {countdown.days}
              </div>
              <div className="text-xs sm:text-sm text-[#333333] opacity-80 font-medium">Days</div>
            </div>
            
            <div className="text-2xl sm:text-3xl md:text-4xl font-albert font-thin text-[#333333]">:</div>
            
            <div className="text-center">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl imperial-script-regular text-[#333333] mb-1 countdown-number not-italic">
                {countdown.hours}
              </div>
              <div className="text-xs sm:text-sm text-[#333333] opacity-80 font-medium">Hours</div>
            </div>
            
            <div className="text-2xl sm:text-3xl md:text-4xl font-albert font-thin text-[#333333]">:</div>
            
            <div className="text-center">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl imperial-script-regular text-[#333333] mb-1 countdown-number not-italic">
                {countdown.minutes}
              </div>
              <div className="text-xs sm:text-sm text-[#333333] opacity-80 font-medium">Minutes</div>
            </div>
            
            <div className="text-2xl sm:text-3xl md:text-4xl font-albert font-thin text-[#333333]">:</div>
            
            <div className="text-center">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl imperial-script-regular text-[#333333] mb-1 countdown-number not-italic">
                {countdown.seconds}
              </div>
              <div className="text-xs sm:text-sm text-[#333333] opacity-80 font-medium">Seconds</div>
            </div>
          </div>
          
          {/* Duplicated SVG with horizontal lines, flipped vertically */}
          <div className="flex justify-center items-center mt-6">
            {/* Left horizontal line */}
            <div className="w-16 h-px bg-[#333333] opacity-40"></div>
            
            <img 
              src="/assets/images/graphics/graphics-1.svg" 
              alt="Decorative graphic" 
              className="w-32 sm:w-40 md:w-48 h-auto mx-4 scale-y-[-1]"
            />
            
            {/* Right horizontal line */}
            <div className="w-16 h-px bg-[#333333] opacity-40"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Counter 