import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { X } from 'lucide-react'
import { sectionTitleStyle } from '../config/themeConfig'
import { paymentMethods as paymentMethodsData } from '../data'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Gifts = () => {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false)

  const giftPaymentMethods = paymentMethodsData?.paymentMethods || []

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
        className="relative pt-4 pb-20 w-full overflow-hidden min-h-[500px]"
      >
        {/* Background Image - bg-1 */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/assets/images/graphics/bg-1.png)',
            opacity: 0.4
          }}
        />

        {/* Gold Banner - Top */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-center z-10">
          <img 
            src="/assets/images/graphics/gold-banner-2.png" 
            alt="Decorative graphic"
            className="w-full h-auto"
          />
        </div>

        {/* Content */}
        <div className="relative z-20 flex items-center justify-center min-h-[500px]">
          <div className="max-w-4xl w-full mx-auto px-8 sm:px-12 lg:px-16">
            <div ref={contentRef} className="flex flex-col items-center w-full">
              {/* Gift Registry Section */}
              <div className="w-full">
                <div className="text-center">
                  <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-3" style={sectionTitleStyle}>
                    <span className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl inline-block leading-none" style={{ lineHeight: '0.8' }}>G</span>
                    <span className="inline-block">IFTS</span>
                  </h2>
                  <div>
                    <p className="text-base sm:text-lg font-albert font-thin text-[#333333] max-w-3xl mx-auto leading-relaxed mb-4">
                      The most important thing is to have you with us on our special day. No gifts needed or expected. However, if you wish to participate, a monetary gift would be great.
                    </p>

                    {giftPaymentMethods.length > 0 && (
                      <div className="flex justify-center items-center mt-6">
                        <button
                          onClick={() => setIsGiftModalOpen(true)}
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

        {/* Gold Banner - Bottom (Flipped Vertically) */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center z-10">
          <img 
            src="/assets/images/graphics/gold-banner-2.png" 
            alt="Decorative graphic"
            className="w-full h-auto scale-y-[-1]"
          />
        </div>
      </section>

      {/* Gift Modal */}
      {isGiftModalOpen && createPortal(
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Send a gift"
          onClick={() => setIsGiftModalOpen(false)}
        >
          <div className="absolute inset-0 bg-black/60" aria-hidden />

          <div
            className="relative z-[10001] w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 sm:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsGiftModalOpen(false)}
              type="button"
              className="absolute top-3 right-3 p-2 text-[#333333] hover:opacity-70 transition-opacity"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center">
              <h3
                className="text-3xl sm:text-4xl md:text-5xl mb-2"
                style={sectionTitleStyle}
              >
                Send a Gift
              </h3>
              <p className="font-albert text-sm sm:text-base font-thin text-[#333333]/80 mb-6">
                Thank you for your generosity. You may send a monetary gift using the QR codes below.
              </p>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {giftPaymentMethods.map((method) => (
                  <div
                    key={method.name}
                    className="flex flex-col items-center gap-2 rounded-xl border border-[#333333]/15 bg-[#fafafa] p-3"
                  >
                    <p className="font-albert text-xs uppercase tracking-wider text-[#333333]/70">
                      {method.name}
                    </p>
                    {method.image && (
                      <img
                        src={method.image}
                        alt={method.alt || `${method.name} QR code`}
                        className="h-auto w-full max-w-[180px] rounded-md object-contain"
                        loading="lazy"
                      />
                    )}
                    {method.accountInfo?.accountName && (
                      <p className="font-albert text-xs text-[#333333]/80 text-center">
                        {method.accountInfo.accountName}
                      </p>
                    )}
                    {method.accountInfo?.accountNumber && (
                      <p className="font-albert text-xs font-medium text-[#333333] text-center">
                        {method.accountInfo.accountNumber}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}

export default Gifts
