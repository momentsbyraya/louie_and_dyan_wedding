import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { sectionTitleStyle } from '../config/themeConfig'
import { paymentMethods as paymentMethodsData } from '../data'
import GiftModal from './GiftModal'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Gifts = () => {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false)

  const giftPaymentMethods = paymentMethodsData?.paymentMethods || []

  const openGiftModal = () => {
    setIsGiftModalOpen(true)
  }

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

    // Content animation
    tl.fromTo(contentRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    )

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <>
      <section
        ref={sectionRef}
        className="relative w-full overflow-hidden pt-24 pb-36 sm:pt-28 sm:pb-44 md:pt-32 md:pb-52"
      >
        {/* Background Image - bg-1 */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/assets/images/graphics/bg-1.png)',
            opacity: 0.4
          }}
        />

        {/* Floral Banner - Top */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-center z-10">
          <img 
            src="/assets/images/graphics/flowers-top.png" 
            alt="Decorative graphic"
            className="w-full h-auto"
          />
        </div>

        {/* Content */}
        <div className="relative z-20 flex items-center justify-center py-8 sm:py-10">
          <div className="max-w-4xl w-full mx-auto px-8 sm:px-12 lg:px-16">
            <div ref={contentRef} className="flex flex-col items-center w-full">
              {/* Gift Registry Section */}
              <div className="w-full">
                <div className="text-center">
                  <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-3" style={sectionTitleStyle}>
                    Notes on Gifts
                  </h2>
                  <div>
                    <p className="text-base sm:text-lg font-albert font-thin text-[#27323B] max-w-3xl mx-auto leading-relaxed mb-4">
                      Your presence is already a gift to us. If you wish to bless us further, a monetary gift would be greatly appreciated — you may leave an envelope or gift during the wedding dance.
                    </p>

                    {giftPaymentMethods.length > 0 && (
                      <div className="flex justify-center items-center mt-6">
                        <button
                          onClick={openGiftModal}
                          type="button"
                          className="flex cursor-pointer items-center justify-center gap-2 rounded-[25px] bg-nude-brown px-6 py-3 font-albert text-white transition-opacity duration-300 hover:opacity-90"
                        >
                          <span className="text-sm font-thin sm:text-base">
                            Send a Gift
                          </span>
                          <ion-icon
                            name="gift-outline"
                            style={{ fontSize: '1.25rem', width: '1.25rem', height: '1.25rem', color: '#ffffff' }}
                          ></ion-icon>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10">
          <img
            src="/assets/images/graphics/flowers-bottom.png"
            alt=""
            aria-hidden
            className="block h-[150px] w-full object-cover object-bottom sm:h-[190px] md:h-[230px]"
          />
        </div>
      </section>

      {/* Gift Modal */}
      <GiftModal
        isOpen={isGiftModalOpen}
        onClose={() => setIsGiftModalOpen(false)}
        paymentMethods={giftPaymentMethods}
      />
    </>
  )
}

export default Gifts
