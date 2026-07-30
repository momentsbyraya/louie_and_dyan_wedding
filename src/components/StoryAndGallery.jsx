import React, { useEffect, useRef, useState, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { loveStory } from '../data'
import { sectionTitleStyle } from '../config/themeConfig'

gsap.registerPlugin(ScrollTrigger)

/** Polaroid photos paired with love-story paragraphs */
const POLAROID_IMAGES = [
  '/assets/images/prenup/IMG_0030.jpg',
  '/assets/images/prenup/IMG_0045.jpg',
]

function getStoryParagraphs() {
  if (Array.isArray(loveStory.paragraphs) && loveStory.paragraphs.length > 0) {
    return loveStory.paragraphs.map((p) => String(p).trim()).filter(Boolean)
  }
  if (typeof loveStory.content === 'string' && loveStory.content.trim()) {
    const fromContent = loveStory.content
      .split(/\n\n/)
      .map((p) => p.trim())
      .filter(Boolean)
    if (fromContent.length > 0) return fromContent
  }
  const narrative = loveStory.narrative || loveStory.story || ''
  const fromBreaks = narrative
    .split(/\n\n/)
    .map((p) => p.trim())
    .filter(Boolean)
  if (fromBreaks.length > 0) return fromBreaks
  if (Array.isArray(loveStory.timeline) && loveStory.timeline.length > 0) {
    return loveStory.timeline.map((t) =>
      [t.title, t.description].filter(Boolean).join('. ')
    )
  }
  if (narrative.trim()) return [narrative.trim()]
  return ['Our story continues…']
}

function StoryPolaroid({ image, rotation, polaroidIndex, objectPosition, onOpen }) {
  return (
    <div
      className="relative cursor-pointer bg-white shadow-lg"
      style={{
        border: '4px solid white',
        borderBottom: '12px solid white',
        transform: `rotate(${rotation}deg)`,
        maxWidth: '200px',
        width: '100%',
        padding: '2px 2px 8px 2px',
      }}
      onClick={() => onOpen(polaroidIndex)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onOpen(polaroidIndex)
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div className="relative">
        <img
          src={image}
          alt=""
          className="aspect-square w-full object-cover"
          style={{
            border: '2px solid #FFFBFB',
            borderBottom: 'none',
            display: 'block',
            ...(objectPosition && { objectPosition }),
          }}
          loading="lazy"
        />
        <img
          src="/assets/images/graphics/stamp.png"
          alt=""
          className="pointer-events-none absolute left-1/2 -translate-x-1/2"
          style={{ top: '-8%', width: '20%', height: 'auto' }}
        />
      </div>
    </div>
  )
}

const StoryAndGallery = () => {
  const storySectionRef = useRef(null)

  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false)
  const [storyImageIndex, setStoryImageIndex] = useState(0)

  const storyOverlayRef = useRef(null)
  const storyContentRef = useRef(null)

  const paragraphs = useMemo(() => getStoryParagraphs(), [])

  const formatParagraph = (text) => {
    const phrase =
      typeof loveStory.highlightPhrase === 'string' ? loveStory.highlightPhrase.trim() : ''
    if (!phrase) return text
    const lower = text.toLowerCase()
    const idx = lower.indexOf(phrase.toLowerCase())
    if (idx === -1) return text
    return (
      <>
        {text.slice(0, idx)}
        <span className="font-bold italic">{text.slice(idx, idx + phrase.length)}</span>
        {text.slice(idx + phrase.length)}
      </>
    )
  }

  useEffect(() => {
    const storyItems = storySectionRef.current?.querySelectorAll('.story-item')
    storyItems?.forEach((item, index) => {
      const polaroidWrapper = item.querySelector('.bg-white.shadow-lg')
      const textParagraph = item.querySelector('p.story-polaroid-text')
      gsap.set(item, { opacity: 0, y: 28 })
      if (polaroidWrapper) gsap.set(polaroidWrapper, { scale: 0.92 })
      if (textParagraph) gsap.set(textParagraph, { opacity: 0, y: 16 })
      ScrollTrigger.create({
        trigger: item,
        start: 'top 82%',
        onEnter: () => {
          gsap.to(item, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            delay: index * 0.1,
          })
          if (polaroidWrapper) {
            gsap.to(polaroidWrapper, {
              scale: 1,
              duration: 0.6,
              ease: 'back.out(1.2)',
              delay: index * 0.1 + 0.15,
            })
          }
          if (textParagraph) {
            gsap.to(textParagraph, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: 'power2.out',
              delay: index * 0.1 + 0.25,
            })
          }
        },
        toggleActions: 'play none none reverse',
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [paragraphs.length])

  const openStoryModal = (index) => {
    setStoryImageIndex(index)
    setIsStoryModalOpen(true)
  }
  const nextStoryImage = () => {
    setStoryImageIndex((prev) => (prev + 1) % POLAROID_IMAGES.length)
  }
  const prevStoryImage = () => {
    setStoryImageIndex((prev) => (prev - 1 + POLAROID_IMAGES.length) % POLAROID_IMAGES.length)
  }

  useEffect(() => {
    if (!isStoryModalOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') setIsStoryModalOpen(false)
      else if (e.key === 'ArrowLeft') prevStoryImage()
      else if (e.key === 'ArrowRight') nextStoryImage()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isStoryModalOpen])

  useEffect(() => {
    if (isStoryModalOpen) {
      document.body.style.overflow = 'hidden'
      const sw = window.innerWidth - document.documentElement.clientWidth
      if (sw > 0) document.body.style.paddingRight = `${sw}px`
    } else {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [isStoryModalOpen])

  useEffect(() => {
    if (!isStoryModalOpen) return
    if (storyOverlayRef.current && storyContentRef.current) {
      gsap.set([storyOverlayRef.current, storyContentRef.current], { opacity: 0 })
      gsap.set(storyContentRef.current, { scale: 0.9 })
      gsap.to(storyOverlayRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' })
      gsap.to(storyContentRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: 'power2.out',
      })
    }
  }, [isStoryModalOpen])

  return (
    <>
      <div id="love-story" className="relative w-full overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-36 md:pb-24 md:pt-44">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
          style={{
            backgroundImage: 'url(/assets/images/graphics/textured-bg-2.jpg)',
            opacity: 1,
            zIndex: 0,
          }}
          aria-hidden
        />
        <div
          ref={storySectionRef}
          className="relative z-20 mx-auto max-w-5xl px-4 sm:px-6 md:px-8"
        >
          <h2
            className="mb-10 text-center text-3xl leading-tight whitespace-nowrap sm:mb-12 sm:text-4xl md:text-5xl lg:text-6xl"
            style={{
              ...sectionTitleStyle,
              color: '#000000',
              WebkitTextStroke: '0',
              textShadow: 'none',
            }}
          >
            Our Love Story
          </h2>

          <div className="relative z-10 flex flex-col gap-12 sm:gap-16 md:gap-20">
            {paragraphs.map((paragraph, index) => {
              const photoLeft = index % 2 === 0
              const image = POLAROID_IMAGES[index]
              const polaroidObjectPosition = undefined

              return (
                <div
                  key={index}
                  className="story-item grid min-h-0 w-full items-center gap-4 sm:gap-6 md:gap-8"
                  style={{
                    gridTemplateColumns: photoLeft ? '2fr 3fr' : '3fr 2fr',
                  }}
                >
                  {photoLeft ? (
                    <>
                      <div className="flex min-w-0 items-center justify-center">
                        {image && (
                          <StoryPolaroid
                            image={image}
                            rotation={-3}
                            polaroidIndex={index}
                            objectPosition={polaroidObjectPosition}
                            onOpen={openStoryModal}
                          />
                        )}
                      </div>
                      <div className="flex min-w-0 items-center">
                        <p
                          className="story-polaroid-text w-full text-left text-xs font-albert font-normal leading-relaxed sm:text-sm"
                          style={{
                            color: '#000000',
                            WebkitTextStroke: '0',
                            textShadow: 'none',
                          }}
                        >
                          {formatParagraph(paragraph)}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex min-w-0 items-center">
                        <p
                          className="story-polaroid-text w-full text-right text-xs font-albert font-normal leading-relaxed sm:text-sm"
                          style={{
                            color: '#000000',
                            WebkitTextStroke: '0',
                            textShadow: 'none',
                          }}
                        >
                          {formatParagraph(paragraph)}
                        </p>
                      </div>
                      <div className="flex min-w-0 items-center justify-center">
                        {image && (
                          <StoryPolaroid
                            image={image}
                            rotation={3}
                            polaroidIndex={index}
                            objectPosition={polaroidObjectPosition}
                            onOpen={openStoryModal}
                          />
                        )}
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {isStoryModalOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            style={{ top: 0, left: 0, right: 0, bottom: 0 }}
          >
            <div
              ref={storyOverlayRef}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
              onClick={() => setIsStoryModalOpen(false)}
            />
            <button
              type="button"
              onClick={() => setIsStoryModalOpen(false)}
              className="absolute right-4 top-4 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/20 transition-colors hover:bg-white/30"
              aria-label="Close"
            >
              <X className="h-6 w-6 text-white" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                prevStoryImage()
              }}
              className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/20 transition-colors hover:bg-white/30"
              aria-label="Previous"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                nextStoryImage()
              }}
              className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/20 transition-colors hover:bg-white/30"
              aria-label="Next"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>
            <div
              ref={storyContentRef}
              className="pointer-events-none relative z-10 flex max-h-[90vh] max-w-[90vw] items-center justify-center"
            >
              <img
                src={POLAROID_IMAGES[storyImageIndex]}
                alt=""
                className="max-h-[90vh] max-w-full object-contain"
              />
            </div>
            <div className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
              <span className="font-albert text-sm text-white">
                {storyImageIndex + 1} / {POLAROID_IMAGES.length}
              </span>
            </div>
          </div>,
          document.body
        )}
    </>
  )
}

export default StoryAndGallery
