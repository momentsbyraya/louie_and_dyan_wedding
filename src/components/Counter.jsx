import React, { useEffect, useRef, useMemo } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Calendar, Clock } from 'lucide-react'
import { themeConfig } from '../config/themeConfig'
import { couples } from '../data'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Counter = ({ countdown }) => {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const countdownRef = useRef(null)
  const dateTimeRef = useRef(null)

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
      
      {/* Soft white gradient overlays for transitions */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/60 to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/60 to-transparent pointer-events-none z-10" />
      
      {/* Main Content Container */}
      <div className={`relative z-20 ${themeConfig.container.maxWidth} ${themeConfig.container.center} ${themeConfig.container.padding} w-full`}>
        {/* Two Column Layout for Large Screens */}
        <div
          ref={countdownRef}
          className="max-w-md sm:max-w-xl lg:max-w-3xl mx-auto px-8 sm:px-12"
        >
          {/* Header Section */}
          <div className="text-center mb-8">
            <h3 ref={headerRef} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#333333] mb-8 font-lavishly italic">
              Save the Date
            </h3>
          </div>
          
          {/* Countdown Timer */}
          <div className="flex justify-center items-center space-x-3 px-4">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl imperial-script-regular text-[#333333] mb-1 countdown-number">
                {countdown.days}
              </div>
              <div className="text-xs sm:text-sm text-[#333333] opacity-80 font-medium">Days</div>
            </div>
            
            <div className="text-2xl sm:text-3xl md:text-4xl font-albert font-thin text-[#333333]">:</div>
            
            <div className="text-center">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl imperial-script-regular text-[#333333] mb-1 countdown-number">
                {countdown.hours}
              </div>
              <div className="text-xs sm:text-sm text-[#333333] opacity-80 font-medium">Hours</div>
            </div>
            
            <div className="text-2xl sm:text-3xl md:text-4xl font-albert font-thin text-[#333333]">:</div>
            
            <div className="text-center">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl imperial-script-regular text-[#333333] mb-1 countdown-number">
                {countdown.minutes}
              </div>
              <div className="text-xs sm:text-sm text-[#333333] opacity-80 font-medium">Minutes</div>
            </div>
            
            <div className="text-2xl sm:text-3xl md:text-4xl font-albert font-thin text-[#333333]">:</div>
            
            <div className="text-center">
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl imperial-script-regular text-[#333333] mb-1 countdown-number">
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