import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { themeConfig } from '../config/themeConfig'
import { dresscode, images } from '../data'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const DressCode = () => {
  const sectionRef = useRef(null)
  const image1Ref = useRef(null)
  const image2Ref = useRef(null)
  const image3Ref = useRef(null)
  const image4Ref = useRef(null)

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

    // Simple fade-in animations for images
    tl.fromTo(image1Ref.current, 
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "power2.out" }
    )
    .fromTo(image2Ref.current, 
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.4"
    )
    .fromTo(image3Ref.current, 
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.4"
    )
    .fromTo(image4Ref.current, 
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "power2.out" },
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
      {/* Theme Background */}
      <div className={`absolute inset-0 `}></div>
      
      {/* Crumpled Paper Background on top */}
      <div 
        className="absolute inset-0 opacity-30 z-10"
        style={{
          backgroundImage: 'url(/assets/images/crumpled-paper.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>
      
      {/* Content */}
      <div className="relative z-20 flex items-center justify-center py-12">
        <div className="max-w-md sm:max-w-xl lg:max-w-3xl xl:max-w-6xl w-full mx-auto px-4">
            {/* Header Section */}
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-albert font-thin text-gray-800 mb-6">
                Dress Code
              </h2>
              <p className="text-lg sm:text-xl text-gray-700 leading-tight max-w-2xl mx-auto">
                We would be grateful if you support the style and color scheme of our wedding in your outfits
              </p>
            </div>

            {/* Color Palette */}
            <div className="flex justify-center items-center mb-16">
              {dresscode.colorPalette.map((color, index) => (
                <div 
                  key={index} 
                  className={`w-16 h-16 rounded-full flex-shrink-0 ${index < dresscode.colorPalette.length - 1 ? '-mr-4' : ''}`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                ></div>
              ))}
            </div>

            {/* Outfit Examples Section */}
            <div className="flex items-start justify-end xl:justify-end">
              {/* Vertical Label */}
              <div className="w-8 flex-shrink-0 flex items-center">
                <div className="w-8 text-gray-700 text-sm sm:text-base font-medium transform -rotate-90 origin-center whitespace-nowrap mt-20">
                  Outfit Examples
                </div>
              </div>
              
              {/* Image Grid */}
              <div className="flex-1 grid grid-cols-2 xl:grid-cols-4 gap-1 max-w-md lg:max-w-xl xl:max-w-4xl">
                <div className="aspect-[3/4] overflow-hidden max-h-96">
                  <img 
                    ref={image1Ref}
                    src="/assets/images/dresscode/dresscode-1.jpg" 
                    alt="Dress code example 1" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-[3/4] overflow-hidden max-h-96">
                  <img 
                    ref={image2Ref}
                    src="/assets/images/dresscode/dresscode-2.jpg" 
                    alt="Dress code example 2" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-[3/4] overflow-hidden max-h-96">
                  <img 
                    ref={image3Ref}
                    src="/assets/images/dresscode/dresscode-3.jpg" 
                    alt="Dress code example 3" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-[3/4] overflow-hidden max-h-96">
                  <img 
                    ref={image4Ref}
                    src="/assets/images/dresscode/dresscode-4.jpg" 
                    alt="Dress code example 4" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
        </div>
      </div>
    </section>
  )
}

export default DressCode 