import React, { useEffect, useRef, useState, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { loveStory } from '../data'
import theme from '../config/theme.json'
import { sectionTitleStyle } from '../config/themeConfig'

gsap.registerPlugin(ScrollTrigger)

/** Prenup shots used as hero, paragraph, or full-bleed elsewhere — omit from Moments gallery */
const PRENUP_USED_HERO_OR_BLEED = new Set([
  'IMG_7213',   // Hero background
  'IMG_8520',   // Invitation bleed 2
  'IMG_8902',   // Invitation bleed between Schedule and RSVP
  'IMG_9594',   // Countdown background + RSVP bleed
  'IMG_7641',   // "When two hearts met" paragraph
])

const PRENUP_ALL_SORTED = [
  'IMG_6594-2',
  'IMG_6736',
  'IMG_6848',
  'IMG_7213',
  'IMG_7347',
  'IMG_7602',
  'IMG_7641',
  'IMG_8018',
  'IMG_8520',
  'IMG_8852',
  'IMG_8902',
  'IMG_8978',
  'IMG_9207',
  'IMG_9490',
  'IMG_9594',
]

const PRENUP_FOR_MOMENTS = PRENUP_ALL_SORTED.filter((id) => !PRENUP_USED_HERO_OR_BLEED.has(id)).map(
  (id) => `/assets/images/prenup/${id}.jpg`
)

/** Polaroid photos paired with love-story paragraphs (jr Moments.jsx pattern) */
const POLAROID_IMAGES = PRENUP_FOR_MOMENTS.slice(0, 4)

/** Masonry gallery — other prenup-only shots (no overlap with polaroid row above) */
const GALLERY_IMAGES = [...PRENUP_FOR_MOMENTS.slice(4)]

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

/** 3-column masonry: full, 1/3+2/3, 2/3+1/3, … — matches jr-and-centenie Moments.jsx */
function getMomentsGalleryGridColumn(index) {
  if (index === 0) return 'span 3'
  if (index === 1) return 'span 1'
  if (index === 2) return 'span 2'
  if (index === 3) return 'span 2'
  if (index === 4) return 'span 1'
  if (index === 5) return 'span 3'
  if (index === 6) return 'span 1'
  if (index === 7) return 'span 2'
  if (index === 8) return 'span 2'
  if (index === 9) return 'span 1'
  const patternIndex = (index - 10) % 4
  if (patternIndex === 0) return 'span 1'
  if (patternIndex === 1) return 'span 2'
  if (patternIndex === 2) return 'span 2'
  return 'span 1'
}

/** Vertical focus for `object-fit: cover` — not topmost (avoid `top` / `0%`) */
function getGalleryTileObjectPosition(imageSrc) {
  return 'center center'
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
  const galleryTitleRef = useRef(null)
  const galleryImageRefs = useRef([])

  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false)
  const [storyImageIndex, setStoryImageIndex] = useState(0)
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false)
  const [galleryImageIndex, setGalleryImageIndex] = useState(0)

  const storyOverlayRef = useRef(null)
  const storyContentRef = useRef(null)
  const galleryOverlayRef = useRef(null)
  const galleryContentRef = useRef(null)

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

    if (galleryTitleRef.current) {
      ScrollTrigger.create({
        trigger: galleryTitleRef.current,
        start: 'top 80%',
        animation: gsap.fromTo(
          galleryTitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
        ),
        toggleActions: 'play none none reverse',
      })
    }

    galleryImageRefs.current.forEach((ref, index) => {
      if (!ref) return
      const isFromLeft = index % 2 === 0
      gsap.set(ref, { opacity: 0, x: isFromLeft ? -100 : 100, force3D: true })
      ScrollTrigger.create({
        trigger: ref,
        start: 'top 85%',
        animation: gsap.to(ref, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          force3D: true,
        }),
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

  const openGalleryModal = (index) => {
    setGalleryImageIndex(index)
    setIsGalleryModalOpen(true)
  }
  const nextGalleryImage = () => {
    setGalleryImageIndex((prev) => (prev + 1) % GALLERY_IMAGES.length)
  }
  const prevGalleryImage = () => {
    setGalleryImageIndex((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length)
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
    if (isStoryModalOpen || isGalleryModalOpen) {
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
  }, [isStoryModalOpen, isGalleryModalOpen])

  useEffect(() => {
    if (!isGalleryModalOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') setIsGalleryModalOpen(false)
      else if (e.key === 'ArrowLeft') prevGalleryImage()
      else if (e.key === 'ArrowRight') nextGalleryImage()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isGalleryModalOpen])

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

  useEffect(() => {
    if (!isGalleryModalOpen) return
    if (galleryOverlayRef.current && galleryContentRef.current) {
      gsap.set([galleryOverlayRef.current, galleryContentRef.current], { opacity: 0 })
      gsap.set(galleryContentRef.current, { scale: 0.9 })
      gsap.to(galleryOverlayRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' })
      gsap.to(galleryContentRef.current, { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' })
    }
  }, [isGalleryModalOpen])

  return (
    <>
      <div id="love-story" className="relative w-full overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-36 md:pb-24 md:pt-44">
        {/* Love Story background texture */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
          style={{
            backgroundImage: 'url(/assets/images/graphics/textured-bg-2.png)',
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
            className="mb-10 text-center text-4xl leading-tight whitespace-nowrap sm:mb-12 sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ ...sectionTitleStyle, color: '#ffffff' }}
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
                          className="story-polaroid-text w-full text-left text-xs font-albert font-thin leading-relaxed text-white sm:text-sm"
                        >
                          {formatParagraph(paragraph)}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex min-w-0 items-center">
                        <p
                          className="story-polaroid-text w-full text-right text-xs font-albert font-thin leading-relaxed text-white sm:text-sm"
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

      <div
        id="gallery"
        className="relative pb-24 sm:pb-32 md:pb-40 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/assets/images/graphics/old-book-bg.png)' }}
      >
        <div ref={galleryTitleRef} className="relative z-10 mb-12 sm:mb-16">
          <div
            className="relative z-10"
            style={{
              width: '100vw',
              marginLeft: 'calc(-50vw + 50%)',
              marginRight: 'calc(-50vw + 50%)',
              backgroundColor: theme.background.gold,
            }}
          >
            <div className="max-w-xs sm:max-w-md lg:max-w-3xl w-full mx-auto px-6 py-6 sm:py-8 md:py-10">
              <h3 className="text-center">
                <span
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight whitespace-nowrap inline-block"
                  style={sectionTitleStyle}
                >
                  Moments
                </span>
              </h3>
            </div>
          </div>
        </div>

        <div className="max-w-xs sm:max-w-md lg:max-w-3xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4" style={{ gridAutoRows: '1fr' }}>
            {GALLERY_IMAGES.map((image, index) => {
              const gridColumn = getMomentsGalleryGridColumn(index)
              return (
                <div
                  key={index}
                  ref={(el) => {
                    galleryImageRefs.current[index] = el
                  }}
                  className="cursor-pointer overflow-hidden max-h-[150px] lg:max-h-[250px]"
                  style={{
                    gridColumn,
                    height: '100%',
                    willChange: 'transform',
                    backfaceVisibility: 'hidden',
                    transform: 'translateZ(0)',
                  }}
                  onClick={() => openGalleryModal(index)}
                >
                  <img
                    src={image}
                    alt=""
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    style={{
                      height: '100%',
                      willChange: 'transform',
                      backfaceVisibility: 'hidden',
                      objectPosition: getGalleryTileObjectPosition(image),
                    }}
                    loading="lazy"
                  />
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

      {isGalleryModalOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            style={{ top: 0, left: 0, right: 0, bottom: 0 }}
          >
            <div
              ref={galleryOverlayRef}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
              onClick={() => setIsGalleryModalOpen(false)}
            />
            <button
              type="button"
              onClick={() => setIsGalleryModalOpen(false)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                prevGalleryImage()
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                nextGalleryImage()
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
            <div
              ref={galleryContentRef}
              className="relative z-10 max-w-[90vw] max-h-[90vh] flex items-center justify-center pointer-events-none"
            >
              <img
                src={GALLERY_IMAGES[galleryImageIndex]}
                alt=""
                className="max-w-full max-h-[90vh] object-contain"
              />
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm">
              <span className="text-white text-sm font-albert">
                {galleryImageIndex + 1} / {GALLERY_IMAGES.length}
              </span>
            </div>
          </div>,
          document.body
        )}
    </>
  )
}

export default StoryAndGallery
