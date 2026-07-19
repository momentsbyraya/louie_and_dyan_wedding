import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { faq } from '../data'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const FAQ = () => {
  const sectionRef = useRef(null)
  const faqRef = useRef(null)
  const faqTitleRef = useRef(null)

  useEffect(() => {
    // FAQ section animation - title first, then items one after the other
    if (faqRef.current && faqTitleRef.current) {
      // Set initial states
      gsap.set(faqTitleRef.current, { opacity: 0, y: 30 })
        
      ScrollTrigger.create({
        trigger: faqRef.current,
        start: "top 80%",
        onEnter: () => {
          // 1. Animate title first
          gsap.to(faqTitleRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            onComplete: () => {
              // 2. After title animation, find and animate items one after the other
              const faqItemsContainer = faqRef.current.querySelector('.space-y-6')
              if (faqItemsContainer) {
                const faqItems = Array.from(faqItemsContainer.children).filter(child => child.tagName === 'DIV')
                
                if (faqItems.length > 0) {
                  // Set initial states for items
                  gsap.set(faqItems, { opacity: 0, y: 30 })
                  
                  // Animate items one after the other
                  gsap.to(faqItems, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power2.out",
                    stagger: 0.2
                  })
                }
              }
            }
          })
        }
      })
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative w-full overflow-hidden bg-nude-brown pt-12 pb-20"
    >
      {/* FAQ Section */}
      <div className="relative z-20 faq-section">
        <div ref={faqRef} className="relative z-10 w-full px-8 sm:px-12 md:px-8 lg:px-16">
          <div ref={faqTitleRef} className="relative inline-block px-6 py-1 mb-4 text-center w-full sm:mb-6">
            <h2
              className="mb-0 pt-2 text-4xl text-white sm:pt-4 sm:text-5xl md:pt-4 md:text-6xl lg:text-7xl leading-tight whitespace-nowrap"
              style={{ fontFamily: '"Pinyon Script", cursive' }}
            >
              Reminder
            </h2>
          </div>
          {faq && faq.faqData && (
            <div className="space-y-6 max-w-[600px] mx-auto">
              {faq.faqData.map((item, index) => (
                <div key={index}>
                  <div className="mb-2">
                    <p className="mb-2 font-albert text-base font-bold text-white sm:text-lg">
                      Q: {item.question}
                    </p>
                    <p className="whitespace-pre-line font-albert text-sm font-thin text-white/95 sm:text-base">
                      A: {item.answer}
                    </p>
                  </div>
                  {index < faq.faqData.length - 1 && (
                    <div className="mt-6 h-px bg-white/35"></div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default FAQ
