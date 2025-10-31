import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { themeConfig } from '../config/themeConfig'
import { dresscode, images } from '../data'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const DressCode = () => {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const textRef = useRef(null)
  const paletteRef = useRef(null)

  useEffect(() => {
    // Scroll-triggered animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    })

    // Animate elements sequentially
    tl.fromTo(headerRef.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    )
    .fromTo(textRef.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.4"
    )
    .fromTo(paletteRef.current, 
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
      className={`relative py-20 w-full overflow-hidden ${themeConfig.calendar.background}`}
    >
      {/* Content */}
      <div className="relative z-20 flex items-center justify-center py-12">
        <div className="max-w-md sm:max-w-xl lg:max-w-3xl w-full mx-auto px-8 sm:px-12 lg:px-16">
          {/* Header Section */}
          <div ref={headerRef} className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-leckerli font-light text-white/90 mb-8">
              Dress Code
            </h2>
          </div>

          {/* Text Section */}
          <div ref={textRef} className="text-center mb-12">
            <p className="text-lg sm:text-xl font-albert font-thin text-white/80 max-w-3xl mx-auto leading-relaxed">
              We would be grateful if, when choosing outfits, you adhere to the color scheme of our celebration.
            </p>
          </div>

          {/* Color Palette */}
          <div ref={paletteRef} className="flex items-center gap-4">
            {dresscode.colorPalette.map((color, index) => (
              <div 
                key={index} 
                className="w-[calc((100%-3*1rem)/4)] h-5 rounded-sm"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default DressCode 