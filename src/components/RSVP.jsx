import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { X } from 'lucide-react'
import RSVPModal from './RSVPModal'
import Entourage from './Entourage'
import { sectionTitleStyle } from '../config/themeConfig'
import { weddingConfig } from '../config/weddingConfig'
import { paymentMethods as paymentMethodsData } from '../data'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const RSVP = () => {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false)

  const giftPaymentMethods = paymentMethodsData?.paymentMethods || []

  const isRSVPDeadlinePassed = () => {
    const raw = weddingConfig.rsvp.deadline
    if (!raw) return false
    const [y, m, d] = raw.split('-').map(Number)
    const deadline = new Date(y, m - 1, d, 23, 59, 59, 999)
    return new Date() > deadline
  }

  const rsvpEnded = isRSVPDeadlinePassed()

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

  const openRSVPModal = () => {
    if (!rsvpEnded) {
      setIsModalOpen(true)
    }
  }

  return (
    <>
      <section
        ref={sectionRef}
        className="relative pt-20 w-full overflow-hidden bg-white min-h-[500px]"
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
            <div className="flex justify-center items-center">
              {/* Left horizontal line */}
              <div className="w-16 h-px bg-[#333333] opacity-40"></div>

              <img
                src="/assets/images/graphics/graphics-1.svg"
                alt="Decorative graphic"
                className="w-32 sm:w-40 md:w-48 h-auto mx-4"
              />

              {/* Right horizontal line */}
              <div className="w-16 h-px bg-[#333333] opacity-40"></div>
            </div>
            <div ref={contentRef} className="flex flex-col items-center w-full">

              {/* RSVP Section - Matching Entourage Layout */}
              <div className="w-full">
                <div className="text-center">
                  <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-3 pt-4 sm:pt-6 md:pt-8" style={sectionTitleStyle}>
                    <span className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl inline-block leading-none" style={{ lineHeight: '0.8' }}>R</span>
                    <span className="inline-block">svp</span>
                  </h2>
                  <div>
                    {rsvpEnded ? (
                      <>
                        <p className="text-base sm:text-lg font-albert font-thin text-[#333333] max-w-3xl mx-auto leading-relaxed mb-4">
                          The RSVP period has ended. For any inquiries or changes to your response, please contact us directly.
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-base sm:text-lg font-albert font-thin text-[#333333] max-w-3xl mx-auto leading-relaxed mb-4">
                          Kindly answer the RSVP. Let us know if you'll be joining us for our celebration.
                        </p>
                        {/* Submit Response Button */}
                        <div className="flex justify-center items-center mt-6">
                          <button
                            onClick={openRSVPModal}
                            type="button"
                            className="flex cursor-pointer items-center justify-center gap-2 rounded-[25px] bg-nude-brown px-6 py-3 font-albert text-white transition-opacity duration-300 hover:opacity-90"
                          >
                            <span className="text-sm font-thin sm:text-base">
                              Submit your response
                            </span>
                            <ion-icon 
                              name="mail-outline" 
                              style={{ fontSize: '1.25rem', width: '1.25rem', height: '1.25rem', color: '#ffffff' }}
                            ></ion-icon>
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <Entourage embedded />

              {/* Gift Registry Section - Matching Layout */}
              <div className="w-full mt-12">
                <div className="text-center">
                  <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-3 pt-4 sm:pt-6 md:pt-8" style={sectionTitleStyle}>
                    <span className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl inline-block leading-none" style={{ lineHeight: '0.8' }}>G</span>
                    <span className="inline-block">ifts</span>
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

                    <div className="flex justify-center items-center mt-8">
                      {/* Left horizontal line */}
                      <div className="w-16 h-px bg-[#333333] opacity-40"></div>

                      <img
                        src="/assets/images/graphics/graphics-1.svg"
                        alt="Decorative graphic"
                        className="w-32 sm:w-40 md:w-48 h-auto mx-4"
                      />

                      {/* Right horizontal line */}
                      <div className="w-16 h-px bg-[#333333] opacity-40"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gold Banner - After Gift Section (Flipped Vertically) */}
              <div className="w-screen -mt-16 sm:-mt-20 md:-mt-24 -mx-8 sm:-mx-12 lg:-mx-16 flex justify-center items-center">
                <img 
                  src="/assets/images/graphics/gold-banner-2.png" 
                  alt="Decorative graphic"
                  className="w-full h-auto scale-y-[-1]"
                  style={{ width: '100vw' }}
                />
              </div>

              {/* Photo Section */}
              <div className="w-screen -mx-8 sm:-mx-12 lg:-mx-16">
                <img 
                  src="/assets/images/prenup/IMG_7602.jpg"
                  alt="Wedding photo"
                  className="w-full h-auto object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  style={{ width: '100vw' }}
                  loading="lazy"
                  onClick={() => setSelectedPhoto('/assets/images/prenup/IMG_7602.jpg')}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RSVP Modal */}
      <RSVPModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Photo Preview Modal */}
      {selectedPhoto && createPortal(
        <div 
          className="fixed inset-0 z-[10000] flex items-center justify-center"
          style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw', 
            height: '100vh',
            margin: 0,
            padding: 0
          }}
          onClick={() => setSelectedPhoto(null)}
        >
          {/* Black Overlay */}
          <div 
            className="absolute inset-0"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }}
          />
          
          {/* Close Button */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setSelectedPhoto(null)
            }}
            className="absolute top-4 right-4 z-[10001] text-white hover:opacity-80 transition-opacity p-2"
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem'
            }}
            aria-label="Close"
          >
            <X className="w-8 h-8 sm:w-10 sm:h-10" />
          </button>

          {/* Image */}
          <img
            src={selectedPhoto}
            alt="Full size preview"
            className="max-w-full max-h-full object-contain z-[10001]"
            style={{
              position: 'relative',
              zIndex: 10001
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>,
        document.body
      )}

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

export default RSVP
