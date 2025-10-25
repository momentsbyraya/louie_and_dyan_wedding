import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { themeConfig } from '../config/themeConfig'
import { images } from '../data'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const LoveStory = () => {
  const sectionRef = useRef(null)

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

    // Fade in animation for the content
    tl.fromTo(sectionRef.current, 
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power2.out" }
    )

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-20 w-full overflow-hidden"
    >
      {/* Background Image */}
      <img
        src={images.couple.couple3}
        alt="Our Love Story"
        className="absolute inset-0 w-full h-full object-cover opacity-60"
        loading="eager"
      />
      
      {/* Dark Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Content */}
      <div className="relative z-20 flex items-center justify-center py-12">
        <div className="max-w-md sm:max-w-xl lg:max-w-3xl mx-auto px-8 sm:px-12 lg:px-16">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-leckerli font-light text-white/90 mb-8">
              Our Love Story
            </h2>
            <p className="text-lg sm:text-xl font-albert font-thin text-white/80 max-w-3xl mx-auto leading-relaxed">
              From the moment our eyes first met, we knew something magical was beginning. 
              What started as a simple conversation has blossomed into a beautiful journey of 
              laughter, adventures, and countless precious memories together.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoveStory 