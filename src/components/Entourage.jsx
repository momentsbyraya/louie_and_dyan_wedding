import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import EntourageModal from './EntourageModal'
import { sectionTitleStyle } from '../config/themeConfig'

gsap.registerPlugin(ScrollTrigger)

const Entourage = ({ embedded = false }) => {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

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

  const innerBlock = (
    <>
      <div className="flex items-center justify-center">
        <div className="h-px w-16 bg-[#333333] opacity-40" />
        <img
          src="/assets/images/graphics/graphics-1.svg"
          alt=""
          className="mx-4 h-auto w-32 sm:w-40 md:w-48"
        />
        <div className="h-px w-16 bg-[#333333] opacity-40" />
      </div>

      <div ref={contentRef} className="flex w-full flex-col items-center">
        <div className="w-full text-center">
          <h2
            className="mb-3 pt-4 text-4xl sm:pt-6 sm:text-5xl md:text-6xl lg:text-7xl"
            style={sectionTitleStyle}
          >
            <span
              className="inline-block text-6xl leading-none sm:text-7xl md:text-8xl lg:text-9xl"
              style={{ lineHeight: '0.8' }}
            >
              E
            </span>
            <span className="inline-block">ntourage</span>
          </h2>
          <p className="mx-auto mb-4 max-w-3xl text-base font-albert font-thin leading-relaxed text-[#333333] sm:text-lg">
            Meet the family and friends standing with us on our wedding day. Open the full list
            anytime.
          </p>
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="flex cursor-pointer items-center justify-center gap-2 rounded-[25px] bg-nude-brown px-6 py-3 font-albert text-white transition-opacity duration-300 hover:opacity-90"
            >
              <span className="text-sm font-thin sm:text-base">
                View entourage
              </span>
              <ion-icon
                name="people-outline"
                style={{
                  fontSize: '1.25rem',
                  width: '1.25rem',
                  height: '1.25rem',
                  color: '#ffffff',
                }}
              />
            </button>
          </div>
          <div className="mt-6 flex items-center justify-center">
            <div className="h-px w-16 bg-[#333333] opacity-40" />
            <img
              src="/assets/images/graphics/graphics-1.svg"
              alt=""
              className="mx-4 h-auto w-32 sm:w-40 md:w-48"
            />
            <div className="h-px w-16 bg-[#333333] opacity-40" />
          </div>
        </div>
      </div>
    </>
  )

  return (
    <>
      {embedded ? (
        <div
          ref={sectionRef}
          id="entourage"
          data-section="entourage"
          className="mt-12 w-full scroll-mt-24"
        >
          {innerBlock}
        </div>
      ) : (
        <section
          ref={sectionRef}
          id="entourage"
          data-section="entourage"
          className="relative min-h-[500px] w-full overflow-hidden bg-white pt-20"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(/assets/images/graphics/old-book-bg.png)',
              opacity: 0.45,
            }}
          />

          <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-center">
            <img src="/assets/images/graphics/gold-banner-2.png" alt="" className="h-auto w-full" />
          </div>

          <div className="relative z-20 flex min-h-[500px] items-center justify-center">
            <div className="mx-auto w-full max-w-4xl px-8 sm:px-12 lg:px-16">{innerBlock}</div>
          </div>
        </section>
      )}

      <EntourageModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

export default Entourage
