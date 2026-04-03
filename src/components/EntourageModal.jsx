import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { X } from 'lucide-react'
import EntourageListContent from './EntourageListContent'

const EntourageModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null)
  const overlayRef = useRef(null)
  const contentRef = useRef(null)
  const scrollContainerRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`
      }

      if (overlayRef.current && contentRef.current) {
        gsap.set([overlayRef.current, contentRef.current], { opacity: 0 })
        gsap.set(contentRef.current, { scale: 0.98, y: 12 })

        gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' })
        gsap.to(contentRef.current, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.35,
          ease: 'power2.out',
        })
      }
    } else {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }

    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [isOpen])

  const handleClose = () => {
    if (!overlayRef.current || !contentRef.current) {
      onClose()
      return
    }
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.2, ease: 'power2.out' })
    gsap
      .to(contentRef.current, {
        opacity: 0,
        scale: 0.98,
        y: 12,
        duration: 0.25,
        ease: 'power2.out',
      })
      .then(() => onClose())
  }

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      handleClose()
    }
  }

  if (!isOpen) return null

  return createPortal(
    <div
      ref={modalRef}
      className="fixed inset-0 z-[9999]"
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleOverlayClick}
      />

      <div
        ref={contentRef}
        className="absolute inset-0 z-10 flex flex-col overflow-hidden"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/assets/images/graphics/old-book-bg.png)',
          }}
          aria-hidden
        />

        <button
          type="button"
          onClick={handleClose}
          className="fixed right-4 top-4 z-[10000] rounded-full bg-white/85 p-2 text-gray-700 shadow-sm backdrop-blur-sm transition-colors duration-200 hover:bg-white hover:text-gray-900 sm:right-6 sm:top-5"
          aria-label="Close"
        >
          <X className="h-6 w-6" />
        </button>

        <div
          ref={scrollContainerRef}
          className="relative z-10 min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain"
        >
          <EntourageListContent scrollContainerRef={scrollContainerRef} />
        </div>
      </div>
    </div>,
    document.body
  )
}

export default EntourageModal
