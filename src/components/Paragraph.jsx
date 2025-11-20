import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { themeConfig } from '../config/themeConfig'
import { weddingConfig } from '../config/weddingConfig'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Paragraph = () => {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const contentRef = useRef(null)

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

  return (
    <section 
      ref={sectionRef}
      className={`relative py-20 w-full overflow-hidden min-h-screen md:min-h-0 ${themeConfig.paragraph.background}`}
    >
      {/* Background Image with reduced opacity */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/assets/images/graphics/calligraphy-bg.png)',
          opacity: 0.15
        }}
      />
      
      {/* Content */}
      <div className="relative z-20 flex items-center justify-center py-12">
        <div className="max-w-md sm:max-w-xl lg:max-w-3xl w-full mx-auto px-8 sm:px-12 lg:px-16">
          {/* Header Section */}
          <div ref={headerRef} className="text-left mb-12">
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#333333] font-lavishly italic">
              when two hearts met....
            </h2>
            <div ref={contentRef}>
              {/* Prenup Image with Soft Mask */}
              <div className="soft-edges mb-8 relative">
                <img 
                  src="/assets/images/prenup/main-cover.png" 
                  alt="Prenup" 
                  className="w-full"
                />
                {/* Heart-string graphics */}
                <img 
                  src="/assets/images/graphics/heart-string-2.png" 
                  alt="Heart string" 
                  className="absolute top-0 right-0 z-10"
                  style={{ width: 'auto', height: 'auto', maxWidth: '150px', maxHeight: '150px', transform: 'scaleX(-1)' }}
                />
              </div>
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#333333] font-lavishly italic text-center">
                the world finally<br />made sense.
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Paragraph
