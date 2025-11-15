import React, { useEffect, useRef, useState } from 'react'
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
        className={`relative py-20 w-full overflow-hidden ${themeConfig.paragraph.background} bg-cover bg-center bg-no-repeat`}
        style={{
          backgroundImage: 'url(/assets/images/graphics/textured-bg.png)'
        }}
      >
        {/* Content */}
        <div className="relative z-20 flex items-center justify-center">
          <div className="max-w-md sm:max-w-xl lg:max-w-3xl w-full mx-auto px-8 sm:px-12 lg:px-16">
            {/* Header Section */}
            <div ref={headerRef} className="text-center mb-8">
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#333333] mb-8 font-lavishly italic">
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
