import React, { useEffect, useRef, useMemo } from 'react'
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
  const sectionContentRefs = useRef([])

  // Random background position, rotation, and flip - Base layer (old-book-2)
  const bgStyleBase = useMemo(() => {
    const posX = Math.random() * 100 // 0% to 100%
    const posY = Math.random() * 100 // 0% to 100%
    const rotation = (Math.random() * 360) - 180 // -180 to 180 degrees
    const flipX = Math.random() > 0.5 ? -1 : 1 // Random horizontal flip
    const flipY = Math.random() > 0.5 ? -1 : 1 // Random vertical flips
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

    // Animate each section's content with alternating slide directions
    sectionContentRefs.current.forEach((ref, index) => {
      if (ref) {
        const isEven = index % 2 === 0
        const xFrom = isEven ? -100 : 100 // Even indices slide from left, odd from right
        
        ScrollTrigger.create({
          trigger: ref,
          start: "top 80%",
          animation: gsap.fromTo(ref,
            { opacity: 0, x: xFrom },
            { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }
          ),
          toggleActions: "play none none reverse"
        })
      }
    })

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [dresscode.sections])

  return (
    <section
      ref={sectionRef}
      className="relative py-20 w-full overflow-hidden"
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
      <div className="relative z-20 flex items-center justify-center py-12">
        <div className="max-w-md sm:max-w-xl lg:max-w-3xl w-full mx-auto px-8 sm:px-12 lg:px-16">
          {/* Header Section */}
          <div ref={headerRef} className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#333333] mb-8 font-caribbean flex items-center justify-center">
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl inline-block leading-none" style={{ lineHeight: '0.8' }}>D</span>
              <span className="inline-block">ress Code</span>
            </h2>
          </div>

          {/* Text Section */}
          <div ref={textRef} className="text-center mb-12">
            <p className="text-base sm:text-lg font-albert font-thin text-[#333333] max-w-3xl mx-auto leading-relaxed">
              We would be grateful if, when choosing outfits, you adhere to the color scheme of our celebration.
            </p>
          </div>

          {/* Dress Code Sections */}
          <div ref={paletteRef} className="space-y-8 mb-8">
            {dresscode.sections && dresscode.sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="text-center">
                {/* Section Title */}
                <h3 
                  className="text-lg sm:text-xl md:text-2xl font-albert font-bold text-[#333333] mb-4 tracking-wider"
                  dangerouslySetInnerHTML={{ __html: section.title }}
                />
                
                {/* Description */}
                {section.description && (
                  <p className="text-sm sm:text-base font-albert text-[#333333] mb-4 max-w-3xl mx-auto">
                    {section.description}
                  </p>
                )}
                
                {/* Section Content */}
                {section.type === "image" && section.image ? (
                  <div 
                    ref={el => sectionContentRefs.current[sectionIndex] = el}
                    className="flex flex-row items-center gap-4 w-full"
                  >
                    <div className="w-[80%]">
                      <img 
                        src={section.image} 
                        alt={section.title} 
                        className="w-full h-auto"
                      />
                    </div>
                    {/* Three stacked circles */}
                    {section.colors && section.colors.length > 0 && (
                      <div className="flex flex-col gap-2 w-[20%] items-center">
                        {section.colors.map((color, colorIndex) => (
                          <div 
                            key={colorIndex}
                            className="w-8 h-8 rounded-full"
                            style={{ backgroundColor: color.hex }}
                            title={color.name}
                          ></div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : section.type === "colors" && section.colors ? (
                  <div 
                    ref={el => sectionContentRefs.current[sectionIndex] = el}
                    className="flex items-center justify-center gap-4"
                  >
                    {section.colors.map((color, colorIndex) => (
                      <div 
                        key={colorIndex} 
                        className="w-[calc((100%-2*1rem)/3)] h-8 rounded-sm max-w-[120px]"
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      ></div>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default DressCode 