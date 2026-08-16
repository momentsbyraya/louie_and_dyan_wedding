import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { X } from 'lucide-react'
import { themeConfig } from '../config/themeConfig'
import { weddingConfig } from '../config/weddingConfig'

const RSVPModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null)
  const overlayRef = useRef(null)
  const contentRef = useRef(null)

  const formEmbedUrl = weddingConfig.rsvp.formEmbedUrl
  const formUrl = weddingConfig.rsvp.website

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'

      gsap.set([overlayRef.current, contentRef.current], { opacity: 0 })
      gsap.set(contentRef.current, { scale: 0.8, y: 50 })

      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' })
      gsap.to(contentRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.4,
        ease: 'back.out(1.7)',
      })
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleClose = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.2, ease: 'power2.out' })
    gsap
      .to(contentRef.current, {
        opacity: 0,
        scale: 0.8,
        y: 50,
        duration: 0.3,
        ease: 'power2.out',
      })
      .then(() => {
        onClose()
      })
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
      className="fixed inset-0 z-50"
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleOverlayClick}
      />

      <div
        ref={contentRef}
        className={`relative ${themeConfig.paragraph.background} w-full h-full flex flex-col overflow-hidden`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-300/50">
          <h2 className="text-2xl font-leckerli font-light text-gray-900/70">RSVP</h2>
          <button
            onClick={handleClose}
            type="button"
            className="p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-200/50 rounded-full transition-colors duration-200"
            aria-label="Close RSVP form"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex min-h-0 flex-1 flex-col">
          {formEmbedUrl ? (
            <iframe
              src={formEmbedUrl}
              title="RSVP for the Wedding of Louie and Dyan"
              className="h-full w-full flex-1 border-0"
            >
              Loading…
            </iframe>
          ) : (
            <div className="flex flex-1 items-center justify-center p-6">
              <a
                href={formUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-albert text-[#27323B] underline"
              >
                Open RSVP form
              </a>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  )
}

export default RSVPModal
