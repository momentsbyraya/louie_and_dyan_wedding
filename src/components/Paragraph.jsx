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
      className={`relative py-20 w-full overflow-hidden ${themeConfig.paragraph.background} bg-cover bg-center bg-no-repeat`}
      style={{
        backgroundImage: 'url(/assets/images/graphics/textured-bg.png)'
      }}
    >
      
      {/* Content */}
      <div className="relative z-20 flex items-center justify-center py-12">
        <div className="max-w-md sm:max-w-xl lg:max-w-3xl w-full mx-auto px-8 sm:px-12 lg:px-16">
          {/* Header Section */}
          <div ref={headerRef} className="text-center mb-12">
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#333333] mb-6 font-lavishly italic">
              Dear friends and relatives!
            </h2>
            <div ref={contentRef}>
              <p className="text-base sm:text-lg font-albert font-thin text-[#333333] max-w-3xl mx-auto leading-relaxed">
                An important event will soon take place in our lives - our wedding! We invite you to share with us this special day!
              </p>
              <p className="text-base sm:text-lg font-albert font-thin text-[#333333] max-w-3xl mx-auto leading-relaxed mt-4">
                
              </p>
              <p className="text-lg sm:text-xl font-albert font-thin text-[#333333] mt-8">
               - {weddingConfig.couple.together}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Paragraph
