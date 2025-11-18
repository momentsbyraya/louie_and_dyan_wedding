import React, { useEffect, useRef, useState, useMemo } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Mail, Users } from 'lucide-react'
import RSVPModal from './RSVPModal'
import EntourageModal from './EntourageModal'
import { themeConfig } from '../config/themeConfig'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const RSVP = () => {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const contentRef = useRef(null)
  const buttonRef = useRef(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEntourageModalOpen, setIsEntourageModalOpen] = useState(false)

  // Random background position, rotation, and flip - Base layer (old-book-2)
  const bgStyleBase = useMemo(() => {
    const posX = Math.random() * 100 // 0% to 100%
    const posY = Math.random() * 100 // 0% to 100%
    const rotation = (Math.random() * 360) - 180 // -180 to 180 degrees
    const flipX = Math.random() > 0.5 ? -1 : 1 // Random horizontal flip
    const flipY = Math.random() > 0.5 ? -1 : 1 // Random vertical flip
    return {
      backgroundImage: 'url(/assets/images/graphics/old-book-2.png)',
      backgroundSize: 'cover',
      backgroundPosition: `${posX}% ${posY}%`,
      transform: `rotate(${rotation}deg) scaleX(${flipX}) scaleY(${flipY})`,
      opacity: 0.75
    }
  }, [])

  // Random background position, rotation, and flip - Top layer (old-book-bg)
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

    // Content animation after header
    tl.fromTo(contentRef.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.4"
    )

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const openRSVPModal = () => {
    setIsModalOpen(true)
  }

  const openEntourageModal = () => {
    setIsEntourageModalOpen(true)
  }

  return (
    <>
      <section
        ref={sectionRef}
        className={`relative py-20 w-full overflow-hidden ${themeConfig.paragraph.background}`}
      >
        {/* Background Image - Base layer (old-book-2) */}
        <div 
          className="absolute bg-no-repeat"
          style={{
            ...bgStyleBase,
            width: '200%',
            height: '200%',
            left: '-50%',
            top: '-50%'
          }}
        />
        {/* Background Image - Top layer (old-book-bg) */}
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
        
        {/* Content */}
        <div className="relative z-20 flex items-center justify-center">
          <div className="max-w-md sm:max-w-xl lg:max-w-3xl w-full mx-auto px-8 sm:px-12 lg:px-16">
            {/* Header Section */}
            <div ref={headerRef} className="text-center mb-8">
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#333333] mb-8 font-caribbean">
                We Await Your Presence
              </h2>
            </div>

            {/* Text Section */}
            <div ref={contentRef} className="text-center mb-12">
              <p className="text-base sm:text-lg font-albert font-thin text-[#333333] max-w-3xl mx-auto leading-relaxed">
                Your presence would make our special day even more meaningful. 
                Please let us know if you'll be joining us for our celebration.
              </p>
            </div>

            {/* RSVP Button */}
            <div className="text-center">
              <button
                ref={buttonRef}
                onClick={openRSVPModal}
                className="w-full inline-flex items-center justify-center space-x-3 px-8 py-3 sm:py-5 lg:py-2 text-[#333333] rounded-sm transition-colors duration-200 text-sm sm:text-2xl lg:text-base font-medium border-2 border-[#333333] hover:opacity-80"
              >
                <span>RSVP</span>
              </button>
              
              {/* Entourage Text */}
              <button
                onClick={openEntourageModal}
                className="text-sm text-[#333333] opacity-80 mt-4 hover:opacity-100 transition-colors duration-200 underline"
              >
                View our entourage
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* RSVP Modal */}
      <RSVPModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      {/* Entourage Modal */}
      <EntourageModal 
        isOpen={isEntourageModalOpen} 
        onClose={() => setIsEntourageModalOpen(false)} 
      />
    </>
  )
}

export default RSVP
