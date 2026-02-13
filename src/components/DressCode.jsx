import React, { useEffect, useRef, useMemo, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { themeConfig } from '../config/themeConfig'
import { dresscode, images } from '../data'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const DressCode = () => {
  const sectionRef = useRef(null)
  const dressCodeTitleRef = useRef(null)
  const category1Ref = useRef(null)
  const category2Ref = useRef(null)
  
  // State for tooltip visibility
  const [activeTooltip, setActiveTooltip] = useState(null)

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

  // Color name mappings
  const colorNames = {}
  dresscode.sections?.forEach(section => {
    section.colors?.forEach(color => {
      colorNames[color.hex] = color.name
    })
  })

  useEffect(() => {
    // Dress Code Title animation
    if (dressCodeTitleRef.current) {
      ScrollTrigger.create({
        trigger: dressCodeTitleRef.current,
        start: "top 80%",
        animation: gsap.fromTo(dressCodeTitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        ),
        toggleActions: "play none none reverse"
      })
    }

    // Category 1 animation - animate image and content separately
    if (category1Ref.current) {
      const category1Container = category1Ref.current
      const flexContainer = category1Container.querySelector('.flex.flex-row')
      if (flexContainer) {
        const category1Image = flexContainer.querySelector('.dresscode-image-container')
        const category1Content = Array.from(flexContainer.children).find(child => 
          child.classList.contains('w-1/2') && child.querySelector('.font-albert')
        )
        
        if (category1Image) {
          gsap.set(category1Image, { opacity: 0, x: -30 })
        }
        if (category1Content) {
          gsap.set(category1Content, { opacity: 0, x: 30 })
        }
        
        ScrollTrigger.create({
          trigger: category1Ref.current,
          start: "top 75%",
          onEnter: () => {
            if (category1Image) {
              gsap.to(category1Image, {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: "power2.out"
              })
            }
            if (category1Content) {
              gsap.to(category1Content, {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: "power2.out",
                delay: 0.2
              })
            }
          }
        })
      }
    }

    // Category 2 animation - animate image and content separately
    if (category2Ref.current) {
      const category2Container = category2Ref.current
      const flexContainer = category2Container.querySelector('.flex.flex-row')
      if (flexContainer) {
        const category2Image = flexContainer.querySelector('.dresscode-image-container')
        const category2Content = Array.from(flexContainer.children).find(child => 
          child.classList.contains('w-1/2') && child.querySelector('.font-albert')
        )
        
        if (category2Image) {
          gsap.set(category2Image, { opacity: 0, x: 30 })
        }
        if (category2Content) {
          gsap.set(category2Content, { opacity: 0, x: -30 })
        }
        
        ScrollTrigger.create({
          trigger: category2Ref.current,
          start: "top 75%",
          onEnter: () => {
            if (category2Content) {
              gsap.to(category2Content, {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: "power2.out"
              })
            }
            if (category2Image) {
              gsap.to(category2Image, {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: "power2.out",
                delay: 0.2
              })
            }
          }
        })
      }
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars && (
          trigger.vars.trigger === dressCodeTitleRef.current ||
          trigger.vars.trigger === category1Ref.current ||
          trigger.vars.trigger === category2Ref.current
        )) {
          trigger.kill()
        }
      })
    }
  }, [])

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

      {/* Gold Border - Bottom */}
      <div 
        className="absolute bottom-0 left-0 right-0 z-20"
        style={{
          height: '6px',
          backgroundColor: '#edb030'
        }}
      />
      
      {/* Content */}
      <div className="relative z-20 flex items-center justify-center py-12">
        <div className="max-w-md sm:max-w-xl lg:max-w-4xl w-full mx-auto px-8 sm:px-12 lg:px-16">
          {/* Dress Code Title */}
          <div ref={dressCodeTitleRef} className="text-center mb-12 sm:mb-16">
            <div>
              <h3 className="relative inline-block px-6 py-3">
                <span 
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-gilliequest inline-block leading-none uppercase"
                  style={{ background: 'linear-gradient(135deg, #edb030 0%, #d99a1a 20%, #926018 50%, #775016 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
                >
                  <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl inline-block leading-none" style={{ lineHeight: '0.8' }}>D</span>
                  <span className="inline-block">RESS CODE</span>
                </span>
              </h3>
              {/* General Dress Code Description */}
              <p className="text-base sm:text-lg font-albert font-thin italic text-[#333333] mt-4">
                {dresscode.mainDressCode?.description || "We would be grateful if, when choosing outfits, you adhere to the color scheme of our celebration."}
              </p>
            </div>
          </div>

          {/* Dress Code Content */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch">
            {/* Principal Sponsors Category */}
            {dresscode.sections && dresscode.sections[0] && (() => {
              const section = dresscode.sections[0];
              return (
                <div className="relative overflow-visible flex-1">
                  <div className="relative overflow-visible">
                    <div 
                      ref={category1Ref}
                      className="transition-opacity duration-500 ease-in-out"
                    >
                      {/* Category Image and Details - Side by side on mobile, stacked on desktop */}
                      <div className="flex flex-row lg:flex-col gap-6 md:gap-8 lg:gap-6 items-start">
                        {/* Category Details - First category: right aligned on mobile, left aligned on desktop */}
                        <div className="w-1/2 lg:w-full flex flex-col text-right lg:text-left order-1 lg:order-2">
                          {/* Category Name and Description Container */}
                          <div className="w-full">
                            {/* Category Name */}
                            <div className="text-lg sm:text-xl md:text-2xl font-albert font-bold text-[#333333] mb-2 text-right lg:text-left">
                              {section.title}
                            </div>
                            
                            {/* Description */}
                            {section.description && (
                              <p className="text-sm sm:text-base font-albert font-thin italic text-[#333333] mb-3 text-right lg:text-left">
                                {section.description}
                              </p>
                            )}
                            
                            {/* Color Swatches */}
                            <div className="flex gap-2 justify-end lg:justify-start">
                              {section.colors && section.colors.map((color, index) => (
                                <div 
                                  key={index}
                                  className="relative group"
                                  onMouseEnter={() => setActiveTooltip(`sponsors-${index}`)}
                                  onMouseLeave={() => setActiveTooltip(null)}
                                  onClick={() => setActiveTooltip(activeTooltip === `sponsors-${index}` ? null : `sponsors-${index}`)}
                                >
                                  <div className="w-6 h-6 sm:w-8 sm:h-8 border border-gray-300 rounded cursor-pointer" style={{ backgroundColor: color.hex }}></div>
                                  {activeTooltip === `sponsors-${index}` && (
                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-[#333333] text-white text-xs rounded whitespace-nowrap z-[9999] pointer-events-none" style={{ position: 'absolute' }}>
                                      {color.name}
                                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-[#333333]"></div>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        {/* Category Image - First category: right on mobile, top on desktop */}
                        {section.image && (
                          <div className="w-1/2 lg:w-full order-2 lg:order-1">
                            <div className="w-full relative dresscode-image-container">
                              <img 
                                src={section.image} 
                                alt={section.title} 
                                className="w-full h-full object-cover rounded"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
            
            {/* Vertical Divider - Hidden on mobile, shown on desktop */}
            {dresscode.sections && dresscode.sections.length > 1 && (
              <>
                <div className="hidden lg:block w-px bg-[#333333] opacity-40 self-stretch"></div>
                <div className="lg:hidden w-full h-px bg-[#333333] opacity-40"></div>
              </>
            )}

            {/* Guests Category */}
            {dresscode.sections && dresscode.sections[1] && (() => {
              const section = dresscode.sections[1];
              return (
                <div className="relative overflow-visible flex-1">
                  <div className="relative overflow-visible">
                    <div 
                      ref={category2Ref}
                      className="text-center transition-opacity duration-500 ease-in-out"
                    >
                      {/* Category Image and Details - Side by side on mobile, stacked on desktop */}
                      <div className="flex flex-row lg:flex-col gap-6 md:gap-8 lg:gap-6 items-start">
                        {/* Category Image - Second category: left on mobile, top on desktop */}
                        {section.image && (
                          <div className="w-1/2 lg:w-full">
                            <div className="w-full relative dresscode-image-container">
                              <img 
                                src={section.image} 
                                alt={section.title} 
                                className="w-full h-full object-cover rounded"
                              />
                            </div>
                          </div>
                        )}
                        
                        {/* Category Details - Second category: left aligned on mobile, bottom on desktop */}
                        <div className="w-1/2 lg:w-full flex flex-col justify-between text-left lg:text-left dresscode-image-container">
                          {/* Category Name and Description Container */}
                          <div>
                            {/* Category Name */}
                            <div className="text-lg sm:text-xl md:text-2xl font-albert font-bold text-[#333333] mb-2 text-left lg:text-left">
                              {section.title}
                            </div>
                            
                            {/* Description */}
                            {section.description && (
                              <p className="text-sm sm:text-base font-albert font-thin italic text-[#333333] mb-3 text-left lg:text-left">
                                {section.description}
                              </p>
                            )}
                            
                            {/* Color Swatches */}
                            <div className="flex gap-2 justify-start lg:justify-start">
                              {section.colors && section.colors.map((color, index) => (
                                <div
                                  key={index}
                                  className="relative group"
                                  onMouseEnter={() => setActiveTooltip(`guests-${index}`)}
                                  onMouseLeave={() => setActiveTooltip(null)}
                                  onClick={() => setActiveTooltip(activeTooltip === `guests-${index}` ? null : `guests-${index}`)}
                                >
                                  <div className="w-6 h-6 sm:w-8 sm:h-8 border border-gray-300 rounded cursor-pointer" style={{ backgroundColor: color.hex }}></div>
                                  {activeTooltip === `guests-${index}` && (
                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-[#333333] text-white text-xs rounded whitespace-nowrap z-[9999] pointer-events-none" style={{ position: 'absolute' }}>
                                      {color.name}
                                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-[#333333]"></div>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    </section>
  )
}

export default DressCode 