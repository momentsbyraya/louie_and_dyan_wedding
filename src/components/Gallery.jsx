import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { themeConfig } from '../config/themeConfig'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Gallery = () => {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const contentRef = useRef(null)

  // Gallery images from prenup folder
  const galleryImages = [
    '/assets/images/prenup/image-1.jpg',
    '/assets/images/prenup/image-2.jpg',
    '/assets/images/prenup/image-3.jpg',
    '/assets/images/prenup/image-4.jpg',
    '/assets/images/prenup/image-5.jpg'
  ]

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
      className="relative pb-20 w-full overflow-hidden"
      style={{ backgroundColor: 'transparent' }}
    >
      {/* Content */}
      <div className="relative z-20 flex items-center justify-center">
        <div className="max-w-md sm:max-w-xl lg:max-w-4xl xl:max-w-5xl w-full mx-auto px-8 sm:px-12 lg:px-16">
          {/* Header Section */}
          <div ref={headerRef} className="text-center">
            {/* Gold Flower */}
            <div className="flex justify-center mb-4">
              <img 
                src="/assets/images/graphics/gold flower.png" 
                alt="Gold flower decoration" 
                className="w-16 sm:w-20 md:w-24 h-auto"
              />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-12 font-gilliequest uppercase" style={{ background: 'linear-gradient(135deg, #edb030 0%, #d99a1a 20%, #926018 50%, #775016 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl inline-block leading-none" style={{ lineHeight: '0.8' }}>O</span>
              <span className="inline-block">UR</span> MOMENTS
            </h2>
          </div>

          {/* Gallery Images */}
          <div ref={contentRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {galleryImages.map((image, index) => (
              <div key={index} className="soft-edges relative">
                <img 
                  src={image} 
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Gallery

