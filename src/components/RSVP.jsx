import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import RSVPModal from './RSVPModal'
import EntourageModal from './EntourageModal'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const RSVP = () => {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const emailSketchRef = useRef(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEntourageModalOpen, setIsEntourageModalOpen] = useState(false)

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

    // Content animation
    tl.fromTo(contentRef.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    )

    // Pulse animation for email sketch
    if (emailSketchRef.current) {
      gsap.to(emailSketchRef.current, {
        scale: 1.1,
        opacity: 0.9,
        duration: 1.5,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1
      })
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      if (emailSketchRef.current) {
        gsap.killTweensOf(emailSketchRef.current)
      }
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
        className="relative py-20 w-full overflow-hidden bg-[#f5f5f0] min-h-[500px]"
      >
        {/* Content */}
        <div className="relative z-20 flex items-center justify-center min-h-[500px]">
          <div className="max-w-4xl w-full mx-auto px-8 sm:px-12 lg:px-16">
            <div ref={contentRef} className="flex flex-col items-start">
              {/* RSVP - Large uppercase with custom font */}
              <div className="mb-4">
                <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-[#333333] font-caribbean uppercase tracking-tight leading-none" style={{ lineHeight: '0.8' }}>
                  RSVP
                </h2>
              </div>

              {/* Reply date - Smaller italic serif */}
              <div className="mb-8">
                <p className="text-base sm:text-lg md:text-xl crimson-text-regular italic text-[#333333] font-light">
                  Kindly answer the RSVP. Let us know if you'll be joining us for our celebration.
                </p>
              </div>

              {/* Email Sketch with Pulse Animation */}
              <div className="mb-12 w-full flex justify-center items-center">
                {/* Left horizontal line */}
                <div className="w-16 h-px bg-[#333333] opacity-40"></div>
                
                <img 
                  ref={emailSketchRef}
                  src="/assets/images/graphics/email-sketch.png" 
                  alt="Email" 
                  onClick={openRSVPModal}
                  className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 object-contain opacity-70 mx-4 cursor-pointer hover:opacity-90 transition-opacity duration-200"
                />
                
                {/* Right horizontal line */}
                <div className="w-16 h-px bg-[#333333] opacity-40"></div>
              </div>

              {/* Entourage Section - Matching Location Layout */}
              <div className="w-full mt-12">
                <div className="text-center">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#333333] mb-3 font-caribbean">
                    <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl inline-block leading-none" style={{ lineHeight: '0.8' }}>E</span>
                    <span className="inline-block">ntourage</span>
                  </h2>
                  <div>
                    <p className="text-base sm:text-lg font-albert font-thin text-[#333333] max-w-3xl mx-auto leading-relaxed mb-4">
                      Meet the special people who will be part of our celebration
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

                {/* Entourage Button */}
                <div className="text-center mt-6">
                  <button
                    onClick={openEntourageModal}
                    className="text-sm text-[#333333] opacity-80 hover:opacity-100 transition-colors duration-200 underline crimson-text-regular"
                  >
                    View our entourage
                  </button>
                </div>
              </div>
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
