import React, { useState, useEffect, useRef, useMemo } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Plus, Minus } from 'lucide-react'
import { themeConfig } from '../config/themeConfig'
import { faq } from '../data'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const accordionRef = useRef(null)

  const { faqData } = faq

  // Random background position, rotation, and flip - Base layer (old-book-2)
  const bgStyleBase = useMemo(() => {
    const posX = Math.random() * 100 // 0% to 100%
    const posY = Math.random() * 100 // 0% to 100%
    const rotation = (Math.random() * 360) - 180 // -180 to 180 degrees
    const flipX = Math.random() > 0.5 ? -1 : 1 // Random horizontal flip
    const flipY = Math.random() > 0.5 ? -1 : 1 // Random vertical flip
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

    // Header animation first
    tl.fromTo(headerRef.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    )

    // Accordion items animation with stagger
    tl.fromTo(accordionRef.current.children, 
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        ease: "power2.out",
        stagger: 0.1
      },
      "-=0.4"
    )

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section
      ref={sectionRef}
      className="relative py-20 w-full"
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
      
      <div className={`relative z-10 ${themeConfig.container.maxWidth} ${themeConfig.container.center} ${themeConfig.container.padding}`}>
        {/* Section Title */}
        <h2 ref={headerRef} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#333333] mb-8 text-center font-caribbean">
          Frequently Asked Questions
        </h2>
        
        {/* FAQ Accordion */}
        <div ref={accordionRef} className="max-w-md sm:max-w-xl lg:max-w-3xl mx-auto">
          {faqData.map((faq, index) => (
            <div key={index}>
              {/* Question Header */}
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:opacity-80 transition-opacity duration-200"
              >
                <h3 className="text-lg sm:text-xl md:text-2xl font-albert font-thin text-[#333333] pr-4">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <Minus className="w-5 h-5 text-[#333333] flex-shrink-0" />
                ) : (
                  <Plus className="w-5 h-5 text-[#333333] flex-shrink-0" />
                )}
              </button>
              
              {/* Answer Content */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pt-4 pb-4">
                  <p className="text-[#333333] opacity-80 font-albert font-thin leading-relaxed text-base sm:text-lg">
                    {faq.answer}
                  </p>
                </div>
              </div>
              
              {/* Divider Line */}
              {index < faqData.length - 1 && (
                <div className="w-full h-px bg-[#333333] opacity-40 my-2"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ 