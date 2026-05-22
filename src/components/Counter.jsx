import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { sectionTitleStyle } from '../config/themeConfig'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Counter = ({ countdown }) => {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const countdownRef = useRef(null)
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
      className="relative w-full overflow-hidden"
    >
      {/* Background — prenup photo */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/assets/images/prenup/IMG_9594.jpg)',
        }}
        aria-hidden
      />

      {/* Dark overlay for text legibility */}
      <div className="pointer-events-none absolute inset-0 bg-black/40" aria-hidden />

      {/* Content */}
      <div className="relative z-20 flex min-h-[70vh] flex-col items-center justify-between px-8 pb-12 pt-16 sm:min-h-[75vh] sm:px-12 sm:pb-14 sm:pt-20 md:min-h-[80vh] md:px-8 md:pb-16 md:pt-24 lg:px-16">
        {/* Header Section */}
        <div className="w-full max-w-xs text-center sm:max-w-md lg:max-w-xl">
          <h2
            ref={headerRef}
            className="mb-3 whitespace-nowrap pt-4 text-4xl text-white sm:pt-6 sm:text-5xl md:text-6xl lg:text-7xl md:pt-8 leading-tight"
            style={{ ...sectionTitleStyle, color: '#FFFFFF' }}
          >
            Save the Date
          </h2>
          <div ref={countdownRef}>
            <p
              className="mx-auto max-w-3xl font-albert text-base font-thin leading-relaxed text-white/90 sm:text-lg"
              style={{ textShadow: '0 1px 3px rgba(0,0,0,0.45)' }}
            >
              Mark your calendar for<br />our special day
            </p>
          </div>
        </div>

        {/* Countdown Timer — pinned to bottom of the section */}
        <div
          className="mt-12 flex items-center justify-center space-x-3 px-4 text-white sm:space-x-4 md:space-x-6"
          style={{ textShadow: '0 1px 3px rgba(0,0,0,0.45)' }}
        >
          <div className="text-center">
            <div className="countdown-number mb-1 font-albert text-3xl font-semibold tabular-nums sm:text-4xl md:text-5xl lg:text-6xl">
              {countdown.days}
            </div>
            <div className="font-albert text-xs font-medium text-white/90 sm:text-sm">Days</div>
          </div>

          <div className="font-albert text-2xl font-thin text-gold sm:text-3xl md:text-4xl">:</div>

          <div className="text-center">
            <div className="countdown-number mb-1 font-albert text-3xl font-semibold tabular-nums sm:text-4xl md:text-5xl lg:text-6xl">
              {countdown.hours}
            </div>
            <div className="font-albert text-xs font-medium text-white/90 sm:text-sm">Hours</div>
          </div>

          <div className="font-albert text-2xl font-thin text-gold sm:text-3xl md:text-4xl">:</div>

          <div className="text-center">
            <div className="countdown-number mb-1 font-albert text-3xl font-semibold tabular-nums sm:text-4xl md:text-5xl lg:text-6xl">
              {countdown.minutes}
            </div>
            <div className="font-albert text-xs font-medium text-white/90 sm:text-sm">Minutes</div>
          </div>

          <div className="font-albert text-2xl font-thin text-gold sm:text-3xl md:text-4xl">:</div>

          <div className="text-center">
            <div className="countdown-number mb-1 font-albert text-3xl font-semibold tabular-nums sm:text-4xl md:text-5xl lg:text-6xl">
              {countdown.seconds}
            </div>
            <div className="font-albert text-xs font-medium text-white/90 sm:text-sm">Seconds</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Counter
