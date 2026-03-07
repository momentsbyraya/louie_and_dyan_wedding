import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { couple } from '../data'

function OpeningScreen({ onEnvelopeOpen }) {
  const envelopeRef = useRef(null)
  const openingSectionRef = useRef(null)
  const clickMeRef = useRef(null)
  const coupleNameRef = useRef(null)

  // Animate text and envelope on mount
  useEffect(() => {
    // Set initial hidden states
    if (clickMeRef.current) gsap.set(clickMeRef.current, { opacity: 0, y: -30 })
    if (envelopeRef.current) gsap.set(envelopeRef.current, { opacity: 0, scale: 0.8 })
    if (coupleNameRef.current) gsap.set(coupleNameRef.current, { opacity: 0, y: 30 })

    // Create animation timeline
    const tl = gsap.timeline({ delay: 0.3 })

    // Animate "Click me!" text - fade in and slide down
    if (clickMeRef.current) {
      tl.to(clickMeRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      })
    }

    // Animate envelope - fade in, scale up with bounce
    if (envelopeRef.current) {
      tl.to(envelopeRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "back.out(1.7)"
      }, "-=0.4")
    }

    // Animate couple name and date - fade in and slide up
    if (coupleNameRef.current) {
      tl.to(coupleNameRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.6")
    }
  }, [])

  const handleEnvelopeClick = () => {
    const envelope = envelopeRef.current
    const openingSection = openingSectionRef.current
    
    if (envelope) {
      envelope.classList.add('active')
      // Letter translation: 0.3s delay + 0.8s duration = 1.1s total
      // Wait 1 second after letter finishes translating
      setTimeout(() => {
        if (openingSection) {
          openingSection.classList.add('zooming-out')
          // After zoom and fadeout animation completes, reveal invitation
          setTimeout(() => {
            if (onEnvelopeOpen) {
              onEnvelopeOpen()
            }
          }, 1500) // Animation duration
        }
      }, 2100) // 1.1s (letter animation) + 1000ms (1 second wait)
    }
  }

  return (
    <div 
      ref={openingSectionRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center opening-section"
    >
      {/* Background Grid - 1 column, 3 rows */}
      <div className="absolute inset-0 grid grid-cols-1 grid-rows-3">
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: 'url(/assets/images/prenup/opening-1.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: 'url(/assets/images/prenup/opening-2.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: 'url(/assets/images/prenup/opening-3.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
      </div>
      {/* Gold overlay for elegant effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#edb030]/40 via-[#d99a1a]/35 to-[#926018]/40 z-[1]" />
      <section className="cssletter flex flex-col items-center relative z-10 w-full py-8" style={{ minHeight: 'auto', height: 'auto' }}>
        {/* You are invited text */}
        <div ref={clickMeRef} className="mb-4 sm:mb-6 md:mb-8 lg:mb-10 text-center click-me-container">
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-foglihten uppercase leading-tight" style={{ color: '#FFFFFF', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0, 0, 0, 0.3)' }}>
            YOU ARE GRACIOUSLY
          </p>
          <p className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] leading-tight" style={{ fontFamily: 'Pinyon Script, cursive', color: '#FFFFFF', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0, 0, 0, 0.3)' }}>
            Invited
          </p>
        </div>
        <div className="envelope" ref={envelopeRef}>
          <button 
            className="heart stamp-button" 
            id="openEnvelope" 
            aria-label="Open Envelope"
            onClick={handleEnvelopeClick}
          >
            <img 
              src="/assets/images/graphics/stamp.png" 
              alt="Stamp" 
              className="stamp-image"
              onError={(e) => {
                // Hide stamp if image doesn't exist
                e.target.style.display = 'none'
              }}
            />
          </button>
          <div className="envelope-flap"></div>
          <div className="envelope-folds">
            <div className="envelope-left"></div>
            <div className="envelope-right"></div>
            <div className="envelope-bottom"></div>
          </div>
          {/* Letter that slides up when envelope opens */}
          <div className="envelope-letter envelope-letter-centered">
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold md:py-4 md:px-6">Celebrate with us</p>
            <img 
              src="/assets/images/graphics/ring-sketch.png" 
              alt="Ring sketch" 
              className="mt-4 w-20 sm:w-24 md:w-28 h-auto mx-auto"
            />
          </div>
        </div>
        {/* Click to open text below envelope */}
        <div ref={coupleNameRef} className="mt-4 sm:mt-6 md:mt-8 text-center couple-name-container">
          <p 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-foglihten uppercase leading-tight"
            style={{ 
              color: '#FFFFFF',
              fontSize: 'clamp(1.5rem, 4vw, 48px)',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0, 0, 0, 0.3)'
            }}
          >
            CLICK TO OPEN
          </p>
        </div>
      </section>
    </div>
  )
}

export default OpeningScreen
