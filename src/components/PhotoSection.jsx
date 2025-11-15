import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const PhotoSection = ({ 
  imagePath, 
  title = "Together Forever", 
  subtitle = "Every love story is beautiful, but ours is my favorite",
  textPosition = "bottom" // "center" or "bottom"
}) => {
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

    // Header (title) animation first
    tl.fromTo(headerRef.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    )

    // Content (subtitle) animation after header
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
    <section ref={sectionRef} className="relative w-full overflow-hidden h-96 sm:h-[500px] lg:h-[600px]">
      {/* Background Image - Load immediately */}
      <img
        src={imagePath}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager" // Load immediately, not lazy
      />
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Content */}
      <div 
        className={`relative z-10 flex justify-center h-full ${
          textPosition === "bottom" ? "items-end pb-8" : "items-center"
        }`}
      >
        <div className="text-center text-white/60">
          <h2 ref={headerRef} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-lavishly italic mb-4">
            {title}
          </h2>
          <p ref={contentRef} className="text-lg sm:text-xl md:text-2xl font-albert font-thin opacity-90">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  )
}

export default PhotoSection 