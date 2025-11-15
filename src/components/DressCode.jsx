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
  const graphicRef = useRef(null)

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
    .fromTo(graphicRef.current, 
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
      className="relative py-20 w-full overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url(/assets/images/graphics/textured-bg.png)'
      }}
    >
      {/* Content */}
      <div className="relative z-20 flex items-center justify-center py-12">
        <div className="max-w-md sm:max-w-xl lg:max-w-3xl w-full mx-auto px-8 sm:px-12 lg:px-16">
          {/* Header Section */}
          <div ref={headerRef} className="text-center mb-8">
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#333333] mb-8 font-lavishly italic">
              Dress Code
            </h2>
          </div>

          {/* Text Section */}
          <div ref={textRef} className="text-center mb-12">
            <p className="text-base sm:text-lg font-albert font-thin text-[#333333] max-w-3xl mx-auto leading-relaxed">
              We would be grateful if, when choosing outfits, you adhere to the color scheme of our celebration.
            </p>
          </div>

          {/* Color Palette */}
          <div ref={paletteRef} className="flex items-center gap-4 mb-8">
            {dresscode.colorPalette.map((color, index) => (
              <div 
                key={index} 
                className="w-[calc((100%-3*1rem)/4)] h-5 rounded-sm"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              ></div>
            ))}
          </div>

          {/* Dress Code Graphic */}
          <div ref={graphicRef} className="flex justify-center">
            <img 
              src="/assets/images/graphics/dress-code.svg" 
              alt="Dress code illustration" 
              className="w-full max-w-md h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default DressCode 