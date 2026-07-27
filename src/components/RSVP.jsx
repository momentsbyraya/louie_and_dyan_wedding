import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { sectionTitleStyle } from '../config/themeConfig'
import { weddingConfig } from '../config/weddingConfig'
import RSVPModal from './RSVPModal'

gsap.registerPlugin(ScrollTrigger)

const RSVP = () => {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const isRSVPDeadlinePassed = () => {
    const raw = weddingConfig.rsvp.deadline
    if (!raw) return false
    const [y, m, d] = raw.split('-').map(Number)
    const deadline = new Date(y, m - 1, d, 23, 59, 59, 999)
    return new Date() > deadline
  }

  const rsvpEnded = isRSVPDeadlinePassed()

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 50%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
    })

    if (contentRef.current) {
      tl.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
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
        id="rsvp"
        className="relative w-full overflow-hidden px-6 py-32 sm:py-40 md:py-48"
      >
        {/* Same background & graphics as Entourage */}
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/assets/images/graphics/old-book-bg.png)',
            opacity: 0.3,
          }}
        />

        <div className="absolute top-0 left-0 right-0 z-[5]">
          <img
            src="/assets/images/graphics/white-blur.png"
            alt=""
            aria-hidden
            className="h-auto w-full scale-y-[-1]"
          />
        </div>

        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-center">
          <img
            src="/assets/images/graphics/gold-banner-2.png"
            alt=""
            aria-hidden
            className="h-auto w-full"
          />
        </div>

        <div
          ref={contentRef}
          className="relative z-20 mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8"
        >
          <div className="mb-6 text-center sm:mb-8">
            <h2
              className="mb-3 text-5xl leading-tight sm:text-6xl md:text-7xl lg:text-8xl"
              style={sectionTitleStyle}
            >
              Rsvp
            </h2>
            <p className="mx-auto max-w-2xl font-albert text-base font-thin leading-relaxed text-[#27323B] sm:text-lg">
              {rsvpEnded
                ? 'The RSVP period has ended. For any inquiries or changes to your response, please contact us directly.'
                : "Kindly answer the RSVP. Let us know if you'll be joining us for our celebration."}
            </p>

            {!rsvpEnded && (
              <div className="mt-6 flex items-center justify-center">
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
                    style={{
                      fontSize: '1.25rem',
                      width: '1.25rem',
                      height: '1.25rem',
                      color: '#ffffff',
                    }}
                  ></ion-icon>
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-[5]">
          <img
            src="/assets/images/graphics/white-blur.png"
            alt=""
            aria-hidden
            className="h-auto w-full"
          />
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-center">
          <img
            src="/assets/images/graphics/gold-banner-2.png"
            alt=""
            aria-hidden
            className="h-auto w-full scale-y-[-1]"
          />
        </div>
      </section>

      <RSVPModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

export default RSVP
