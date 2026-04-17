import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { themeConfig } from '../config/themeConfig'
import { dresscode, images } from '../data'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const DressCode = () => {
  const sectionRef = useRef(null)
  const dressCodeTitleRef = useRef(null)
  const categoryRefs = useRef([])
  
  // State for tooltip visibility
  const [activeTooltip, setActiveTooltip] = useState(null)

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

    // Category animations - animate image and content separately for each category
    categoryRefs.current.forEach((categoryRef, index) => {
      if (categoryRef) {
        const categoryContainer = categoryRef
        const flexContainer = categoryContainer.querySelector('.flex.flex-row, .flex.flex-col')
        if (flexContainer) {
          const categoryImage = flexContainer.querySelector('.dresscode-image-container')
          const categoryContent = Array.from(flexContainer.children).find(child => 
            child.classList.contains('w-1/2') || child.classList.contains('w-full')
          )
          
          // Alternate animation direction based on index
          const isEven = index % 2 === 0
          
          if (categoryImage) {
            gsap.set(categoryImage, { opacity: 0, x: isEven ? -30 : 30 })
          }
          if (categoryContent) {
            gsap.set(categoryContent, { opacity: 0, x: isEven ? 30 : -30 })
          }
          
          ScrollTrigger.create({
            trigger: categoryRef,
            start: "top 75%",
            onEnter: () => {
              if (categoryImage) {
                gsap.to(categoryImage, {
                  opacity: 1,
                  x: 0,
                  duration: 0.8,
                  ease: "power2.out"
                })
              }
              if (categoryContent) {
                gsap.to(categoryContent, {
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
    })

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars && (
          trigger.vars.trigger === dressCodeTitleRef.current ||
          categoryRefs.current.includes(trigger.vars.trigger)
        )) {
          trigger.kill()
        }
      })
    }
  }, [])

  const sections = dresscode.sections || []
  const hasSingleSection = sections.length === 1

  return (
    <section
      ref={sectionRef}
      className="relative py-12 md:py-32 w-full overflow-hidden bg-white"
    >
      {/* Background Image - bg-1 */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/assets/images/graphics/bg-1.png)',
          opacity: 0.4
        }}
      />

      {/* Leaf Banner - Top */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-center z-10">
        <img 
          src="/assets/images/graphics/leaf-banner.png" 
          alt="Leaf banner decoration"
          className="w-full h-auto"
        />
      </div>
      
      {/* Soft white gradient overlays for transitions */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/60 to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/60 to-transparent pointer-events-none z-10" />

      
      {/* Content */}
      <div className="relative z-20 flex items-center justify-center py-12">
        <div className="max-w-md sm:max-w-xl lg:max-w-6xl w-full mx-auto px-8 sm:px-12 lg:px-16">
          {/* Dress Code Title */}
          <div ref={dressCodeTitleRef} className="text-center mb-12 sm:mb-16">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3 font-caribbean pt-4 sm:pt-6 md:pt-8" style={{ background: 'linear-gradient(135deg, #edb030 0%, #d99a1a 20%, #926018 50%, #775016 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl inline-block leading-none" style={{ lineHeight: '0.8' }}>D</span>
                <span className="inline-block">ress Code</span>
              </h2>
              {/* General Dress Code Description */}
              <p className="text-base sm:text-lg font-albert font-thin italic text-[#333333] mt-4">
                {dresscode.mainDressCode?.description || "We would be grateful if, when choosing outfits, you adhere to the color scheme of our celebration."}
              </p>
            </div>
          </div>

          {/* Dress Code Content - Grid layout for 5 categories */}
          <div
            className={`grid grid-cols-1 gap-6 lg:gap-8 ${
              hasSingleSection ? 'justify-items-center' : 'lg:grid-cols-2'
            }`}
          >
            {sections && sections.map((section, index) => {
              const isEven = index % 2 === 0
              const shouldReverse = section.title === "Principal Sponsors" || section.title === "Maid of Honor"
              const isGuests = section.title === "Guests"
              return (
                <div
                  key={index}
                  className={`relative overflow-visible ${hasSingleSection ? 'w-full max-w-[450px]' : ''}`}
                >
                  <div className="relative overflow-visible">
                    <div 
                      ref={el => categoryRefs.current[index] = el}
                      className="transition-opacity duration-500 ease-in-out"
                    >
                      {/* Category Image and Details - Side by side on mobile, stacked on desktop */}
                      <div className={`flex flex-row lg:flex-col xl:flex-col gap-6 md:gap-8 lg:gap-6 items-start`}>
                        {/* Category Details */}
                        <div className={`w-1/2 lg:w-full flex flex-col ${hasSingleSection ? 'text-center order-1' : (shouldReverse ? 'text-left lg:text-left order-2 xl:order-1' : (isEven ? 'text-right lg:text-left order-1 xl:order-1' : 'text-left lg:text-left order-1 xl:order-1'))}`}>
                          {/* Category Name and Description Container */}
                          <div className="w-full">
                            {/* Category Name */}
                            <div className={`text-lg sm:text-xl md:text-2xl font-gilliequest text-[#333333] mb-2 ${hasSingleSection ? 'text-center' : (shouldReverse ? 'text-left lg:text-left' : (isEven ? 'text-right lg:text-left' : 'text-left lg:text-left'))}`}>
                              {section.title}
                            </div>
                            
                            {/* Description */}
                            {section.description && (
                              <p className={`text-sm sm:text-base font-albert font-thin italic text-[#333333] mb-3 ${hasSingleSection ? 'text-center' : (shouldReverse ? 'text-left lg:text-left' : (isEven ? 'text-right lg:text-left' : 'text-left lg:text-left'))}`}>
                                {section.description}
                              </p>
                            )}
                            
                            {/* Color/Image Swatches - Hide for Guests section */}
                            {!isGuests && (
                              <div className={`flex gap-2 ${shouldReverse ? 'justify-start lg:justify-start' : (isEven ? 'justify-end lg:justify-start' : 'justify-start lg:justify-start')}`}>
                                {/* Image Swatches */}
                                {section.colorSwatches && section.colorSwatches.map((swatch, swatchIndex) => (
                                  <div 
                                    key={swatchIndex}
                                    className="relative group"
                                    onMouseEnter={() => setActiveTooltip(`${index}-${swatchIndex}`)}
                                    onMouseLeave={() => setActiveTooltip(null)}
                                    onClick={() => setActiveTooltip(activeTooltip === `${index}-${swatchIndex}` ? null : `${index}-${swatchIndex}`)}
                                  >
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded overflow-hidden" style={{ aspectRatio: '1/1' }}>
                                      <img 
                                        src={swatch.image} 
                                        alt={swatch.name}
                                        className="w-full h-full cursor-pointer object-cover"
                                      />
                                    </div>
                                    {activeTooltip === `${index}-${swatchIndex}` && (
                                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded whitespace-nowrap z-[9999] pointer-events-none" style={{ position: 'absolute' }}>
                                        {swatch.name}
                                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-black"></div>
                                      </div>
                                    )}
                                  </div>
                                ))}
                                {/* Color Swatches */}
                                {section.colors && section.colors.map((color, colorIndex) => {
                                  const swatchIndex = (section.colorSwatches?.length || 0) + colorIndex
                                  return (
                                    <div 
                                      key={colorIndex}
                                      className="relative group"
                                      onMouseEnter={() => setActiveTooltip(`${index}-${swatchIndex}`)}
                                      onMouseLeave={() => setActiveTooltip(null)}
                                      onClick={() => setActiveTooltip(activeTooltip === `${index}-${swatchIndex}` ? null : `${index}-${swatchIndex}`)}
                                    >
                                      <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded cursor-pointer" style={{ backgroundColor: color.hex, aspectRatio: '1/1' }}></div>
                                      {activeTooltip === `${index}-${swatchIndex}` && (
                                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded whitespace-nowrap z-[9999] pointer-events-none" style={{ position: 'absolute' }}>
                                          {color.name}
                                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-black"></div>
                                        </div>
                                      )}
                                    </div>
                                  )
                                })}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Category Image */}
                        {section.image && (
                          <div className={`w-1/2 lg:w-full ${shouldReverse ? (isEven ? 'order-1 lg:order-1 xl:order-2' : 'order-1 lg:order-1 xl:order-2') : (isEven ? 'order-2 lg:order-1 xl:order-2' : 'order-2 lg:order-1 xl:order-2')}`}>
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
                      
                      {/* Guest Palette Swatches - At the bottom for Guests section only */}
                      {isGuests && section.colorSwatches && (
                        <div className="flex gap-2 justify-center mt-4">
                          {section.colorSwatches.map((swatch, swatchIndex) => (
                            <div 
                              key={swatchIndex}
                              className="relative group"
                              onMouseEnter={() => setActiveTooltip(`${index}-${swatchIndex}`)}
                              onMouseLeave={() => setActiveTooltip(null)}
                              onClick={() => setActiveTooltip(activeTooltip === `${index}-${swatchIndex}` ? null : `${index}-${swatchIndex}`)}
                            >
                              <div className="rounded overflow-hidden">
                                <img 
                                  src={swatch.image} 
                                  alt={swatch.name}
                                  className="h-auto cursor-pointer object-contain"
                                  style={{ maxWidth: '200px' }}
                                />
                              </div>
                              {activeTooltip === `${index}-${swatchIndex}` && (
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded whitespace-nowrap z-[9999] pointer-events-none" style={{ position: 'absolute' }}>
                                  {swatch.name}
                                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-black"></div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Leaf Banner - Bottom (Flipped Vertically and Horizontally) */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center z-10">
        <img 
          src="/assets/images/graphics/leaf-banner.png" 
          alt="Leaf banner decoration"
          className="w-full h-auto"
          style={{ transform: 'scaleX(-1) scaleY(-1)' }}
        />
      </div>
    </section>
  )
}

export default DressCode
