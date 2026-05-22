import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { entourage } from '../data'
import { weddingConfig } from '../config/weddingConfig'
import theme from '../config/theme.json'
import { sectionTitleStyle } from '../config/themeConfig'
import './Entourage.css'

gsap.registerPlugin(ScrollTrigger)

/** Push paired-row animations from rows containing `.paired-ninong-item` / `.paired-ninang-item`. */
function collectPairedNameRows(containerEl, allNameRows, startTime, step = 0.2) {
  let t = startTime
  if (!containerEl) return t
  const itemContainers = containerEl.classList.contains('space-y-2')
    ? containerEl.querySelectorAll(':scope > div')
    : containerEl.querySelectorAll('.space-y-2 > div')
  Array.from(itemContainers).forEach((container) => {
    const pairedNinong = container.querySelector('.paired-ninong-item')
    const pairedNinang = container.querySelector('.paired-ninang-item')
    if (pairedNinong && pairedNinang) {
      gsap.set([pairedNinong, pairedNinang], { opacity: 0, y: 20 })
      allNameRows.push({ elements: [pairedNinong, pairedNinang], time: t })
      t += step
    } else if (pairedNinong || pairedNinang) {
      const solo = pairedNinong || pairedNinang
      gsap.set(solo, { opacity: 0, y: 20 })
      allNameRows.push({ elements: [solo], time: t })
      t += step
    }
  })
  return t
}

const EntourageListContent = ({ scrollContainerRef }) => {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const coupleRef = useRef(null)
  const parentsRef = useRef(null)
  const principalSponsorsRef = useRef(null)
  const bestmanRef = useRef(null)
  const maidOfHonorRef = useRef(null)
  const matronOfHonorRef = useRef(null)
  const bridesmanRef = useRef(null)
  const groomsMenBridesmaidsRef = useRef(null)
  const secondarySponsorsRef = useRef(null)
  const candleBlockRef = useRef(null)
  const veilBlockRef = useRef(null)
  const cordBlockRef = useRef(null)
  const ringBearerRef = useRef(null)
  const coinBearerRef = useRef(null)
  const candleBearerRef = useRef(null)
  const bibleBearerRef = useRef(null)
  const flowerLadiesRef = useRef(null)
  const groomFullNameRef = useRef(null)
  const brideFullNameRef = useRef(null)

  const principalSponsors = entourage.principalSponsors
  const bridalParty = entourage.bridalParty
  const secondarySponsors = entourage.secondarySponsors
  const flowerGirls = entourage.flowerGirls || []

  useEffect(() => {
    const scroller = scrollContainerRef?.current

    if (sectionRef.current) {
      gsap.set(sectionRef.current, { opacity: 1, x: 0 })
    }

    const allNameElements = sectionRef.current?.querySelectorAll(
      'p.font-poppins:not(.entourage-couple-full-name), .ninong-item, .ninang-item, .groomsmen-item, .bridesmaids-item'
    )
    if (allNameElements && allNameElements.length > 0) {
      gsap.set(allNameElements, { opacity: 0, y: 20 })
    }

    const scrollOpts = scroller ? { scroller } : {}

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 50%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
        ...scrollOpts,
      },
    })

    tl.fromTo(headerRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' })

    if (groomFullNameRef.current && brideFullNameRef.current) {
      gsap.set([groomFullNameRef.current, brideFullNameRef.current], { opacity: 0, y: 16 })
      tl.fromTo(
        [groomFullNameRef.current, brideFullNameRef.current],
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' },
        '-=0.35'
      )
    }

    const allNameRows = []
    let currentTime = 0

    if (parentsRef.current) {
      const allParentsContainers = parentsRef.current.querySelectorAll(':scope > div')
      if (allParentsContainers.length >= 2) {
        const groomParentsContainer = allParentsContainers[0]
        const brideParentsContainer = allParentsContainers[1]

        const groomParentsNames = groomParentsContainer.querySelectorAll('p.font-poppins')
        const brideParentsNames = brideParentsContainer.querySelectorAll('p.font-poppins')

        if (groomParentsNames.length > 0 || brideParentsNames.length > 0) {
          const maxLength = Math.max(groomParentsNames.length, brideParentsNames.length)
          gsap.set([...groomParentsNames, ...brideParentsNames], { opacity: 0, y: 20 })

          for (let i = 0; i < maxLength; i++) {
            const row = []
            if (groomParentsNames[i]) row.push(groomParentsNames[i])
            if (brideParentsNames[i]) row.push(brideParentsNames[i])
            if (row.length > 0) {
              allNameRows.push({ elements: row, time: currentTime })
              currentTime += 0.2
            }
          }
        }
      }
    }

    if (principalSponsorsRef.current) {
      const itemContainers = principalSponsorsRef.current.querySelectorAll('.space-y-2 > div')
      if (itemContainers && itemContainers.length > 0) {
        Array.from(itemContainers).forEach((container) => {
          const pairedNinong = container.querySelector('.paired-ninong-item')
          const pairedNinang = container.querySelector('.paired-ninang-item')
          const unpaired = container.querySelector('.unpaired-item')

          if (pairedNinong && pairedNinang) {
            gsap.set([pairedNinong, pairedNinang], { opacity: 0, y: 20 })
            allNameRows.push({ elements: [pairedNinong, pairedNinang], time: currentTime })
            currentTime += 0.2
          } else if (unpaired) {
            gsap.set(unpaired, { opacity: 0, y: 20 })
            allNameRows.push({ elements: [unpaired], time: currentTime })
            currentTime += 0.1
          }
        })
      }
    }

    if (bestmanRef.current && maidOfHonorRef.current) {
      const bestmanNames = bestmanRef.current.querySelectorAll('p.font-poppins')
      const maidOfHonorNames = maidOfHonorRef.current.querySelectorAll('p.font-poppins')

      if (bestmanNames.length > 0 || maidOfHonorNames.length > 0) {
        const maxLength = Math.max(bestmanNames.length, maidOfHonorNames.length)
        gsap.set([...bestmanNames, ...maidOfHonorNames], { opacity: 0, y: 20 })

        for (let i = 0; i < maxLength; i++) {
          const row = []
          if (bestmanNames[i]) row.push(bestmanNames[i])
          if (maidOfHonorNames[i]) row.push(maidOfHonorNames[i])
          if (row.length > 0) {
            allNameRows.push({ elements: row, time: currentTime })
            currentTime += 0.2
          }
        }
      }
    }

    if (matronOfHonorRef.current) {
      const names = matronOfHonorRef.current.querySelectorAll('p.font-poppins')
      if (names.length > 0) {
        gsap.set(names, { opacity: 0, y: 20 })
        Array.from(names).forEach((name) => {
          allNameRows.push({ elements: [name], time: currentTime })
          currentTime += 0.1
        })
      }
    }

    currentTime = collectPairedNameRows(groomsMenBridesmaidsRef.current, allNameRows, currentTime)

    if (bridesmanRef.current) {
      const names = bridesmanRef.current.querySelectorAll('p.font-poppins')
      if (names.length > 0) {
        gsap.set(names, { opacity: 0, y: 20 })
        Array.from(names).forEach((name) => {
          allNameRows.push({ elements: [name], time: currentTime })
          currentTime += 0.1
        })
      }
    }

    if (candleBlockRef.current) {
      const pairedNinong = candleBlockRef.current.querySelector('.paired-ninong-item')
      const pairedNinang = candleBlockRef.current.querySelector('.paired-ninang-item')
      if (pairedNinong && pairedNinang) {
        gsap.set([pairedNinong, pairedNinang], { opacity: 0, y: 20 })
        allNameRows.push({ elements: [pairedNinong, pairedNinang], time: currentTime })
        currentTime += 0.2
      }
    }

    currentTime = collectPairedNameRows(veilBlockRef.current, allNameRows, currentTime)
    currentTime = collectPairedNameRows(cordBlockRef.current, allNameRows, currentTime)

    if (flowerLadiesRef.current) {
      const names = flowerLadiesRef.current.querySelectorAll('p.font-poppins')
      if (names.length > 0) {
        gsap.set(names, { opacity: 0, y: 20 })
        Array.from(names).forEach((name) => {
          allNameRows.push({ elements: [name], time: currentTime })
          currentTime += 0.1
        })
      }
    }

    if (ringBearerRef.current && coinBearerRef.current) {
      const ringNames = ringBearerRef.current.querySelectorAll('p.font-poppins')
      const coinNames = coinBearerRef.current.querySelectorAll('p.font-poppins')
      if (ringNames.length > 0 || coinNames.length > 0) {
        const maxLength = Math.max(ringNames.length, coinNames.length)
        gsap.set([...ringNames, ...coinNames], { opacity: 0, y: 20 })
        for (let i = 0; i < maxLength; i++) {
          const row = []
          if (ringNames[i]) row.push(ringNames[i])
          if (coinNames[i]) row.push(coinNames[i])
          if (row.length > 0) {
            allNameRows.push({ elements: row, time: currentTime })
            currentTime += 0.2
          }
        }
      }
    }

    if (candleBearerRef.current) {
      const names = candleBearerRef.current.querySelectorAll('p.font-poppins')
      if (names.length > 0) {
        gsap.set(names, { opacity: 0, y: 20 })
        Array.from(names).forEach((name) => {
          allNameRows.push({ elements: [name], time: currentTime })
          currentTime += 0.1
        })
      }
    }

    if (bibleBearerRef.current) {
      const names = bibleBearerRef.current.querySelectorAll('p.font-poppins')
      if (names.length > 0) {
        gsap.set(names, { opacity: 0, y: 20 })
        Array.from(names).forEach((name) => {
          allNameRows.push({ elements: [name], time: currentTime })
          currentTime += 0.1
        })
      }
    }

    if (allNameRows.length > 0 && parentsRef.current) {
      ScrollTrigger.create({
        trigger: parentsRef.current,
        start: 'top 80%',
        ...scrollOpts,
        onEnter: () => {
          const masterTl = gsap.timeline()
          allNameRows.forEach(({ elements }, index) => {
            masterTl.to(
              elements,
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power1.out',
              },
              index * 0.15
            )
          })
        },
        toggleActions: 'play none none reverse',
      })
    }

    requestAnimationFrame(() => ScrollTrigger.refresh())

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [scrollContainerRef])

  const groomFullName =
    weddingConfig.couple.groom.fullName ||
    `${weddingConfig.couple.groom.firstName.toUpperCase()} ${weddingConfig.couple.groom.lastName.toUpperCase()}`
  const brideFullName =
    weddingConfig.couple.bride.fullName ||
    `${weddingConfig.couple.bride.firstName.toUpperCase()} ${weddingConfig.couple.bride.lastName.toUpperCase()}`

  const principalItems = principalSponsors?.items || []
  const gmPairs = bridalParty?.groomsMenBridesmaids || []
  const candle = secondarySponsors?.candle
  const veil = secondarySponsors?.veil
  const cord = secondarySponsors?.cord

  return (
    <>
      <div
        ref={sectionRef}
        className="relative w-full overflow-hidden px-6 py-32 sm:py-40 md:py-64 entourage-section-lg entourage-list-modal-root"
      >
        <style>{`
        @media (min-width: 992px) {
          .entourage-section-lg {
            padding-top: 20rem !important;
            padding-bottom: 20rem !important;
          }
        }
        @media (min-width: 1280px) {
          .entourage-section-lg {
            padding-top: 28rem !important;
            padding-bottom: 28rem !important;
          }
        }
      `}</style>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
          style={{
            backgroundImage: 'url(/assets/images/graphics/old-book-bg.png)',
            opacity: 0.3,
          }}
        />

        <div className="absolute top-0 left-0 right-0 z-5">
          <img
            src="/assets/images/graphics/white-blur.png"
            alt="White blur effect"
            className="w-full h-auto scale-y-[-1]"
          />
        </div>

        <div className="absolute top-0 left-0 right-0 flex items-center justify-center z-10">
          <img src="/assets/images/graphics/gold-banner-2.png" alt="Decorative graphic" className="w-full h-auto" />
        </div>

        <div className="relative z-20 flex items-center justify-center">
          <div className="max-w-xs sm:max-w-md lg:max-w-4xl w-full mx-auto px-4 sm:px-6 md:px-6 lg:px-8">
            <div
              ref={headerRef}
              className="entourage-modal-header-names normal-case mb-12 flex flex-col items-center text-center pt-4 sm:pt-6 md:pt-8"
            >
              <div
                className="caudex-bold block text-base uppercase leading-none sm:text-lg md:text-xl lg:text-2xl"
                style={{ lineHeight: '0.8', color: theme.text.secondary }}
              >
                ENTOURAGE
              </div>
            </div>

            <div
              ref={coupleRef}
              className="mb-6 grid min-w-0 grid-cols-2 gap-4 sm:gap-6 justify-center items-center"
            >
              <div className="min-w-0">
                <p
                  className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-right uppercase"
                  style={{ color: theme.text.brown }}
                >
                  GROOM
                </p>
                <p
                  ref={groomFullNameRef}
                  className="entourage-couple-full-name text-right font-poppins text-[8.5px] uppercase leading-snug text-[#333333] sm:text-[12px] md:text-[14px] lg:text-[16px] break-words"
                >
                  {groomFullName}
                </p>
              </div>

              <div className="min-w-0">
                <p
                  className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-left uppercase"
                  style={{ color: theme.text.brown }}
                >
                  BRIDE
                </p>
                <p
                  ref={brideFullNameRef}
                  className="entourage-couple-full-name text-left font-poppins text-[8.5px] uppercase leading-snug text-[#333333] sm:text-[12px] md:text-[14px] lg:text-[16px] whitespace-nowrap"
                >
                  {brideFullName}
                </p>
              </div>
            </div>

            <h3
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl imperial-script-regular mb-4 text-center capitalize whitespace-nowrap"
              style={{ color: theme.text.brown }}
            >
              Bridal Entourage
            </h3>

            <div ref={parentsRef} className="mb-6 grid grid-cols-2 gap-4 sm:gap-6 justify-center items-start">
              <div className="min-w-0">
                <p
                  className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-right uppercase"
                  style={{ color: theme.text.brown }}
                >
                  PARENTS OF THE GROOM
                </p>
                <div className="text-right">
                  {(entourage.parents?.groom?.members || []).map((name, idx) => (
                    <p
                      key={idx}
                      className={`text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] whitespace-nowrap${idx > 0 ? ' mt-1' : ''}`}
                    >
                      {name}
                    </p>
                  ))}
                </div>
              </div>

              <div className="min-w-0">
                <p
                  className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-left uppercase"
                  style={{ color: theme.text.brown }}
                >
                  PARENTS OF THE BRIDE
                </p>
                <div className="text-left">
                  {(entourage.parents?.bride?.members || []).map((name, idx) => (
                    <p
                      key={idx}
                      className={`text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] whitespace-nowrap${idx > 0 ? ' mt-1' : ''}`}
                    >
                      {name}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {principalItems.length > 0 && (
              <div ref={principalSponsorsRef} className="mb-6">
                <h3
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl imperial-script-regular mb-6 text-center capitalize whitespace-nowrap"
                  style={{ color: theme.text.brown }}
                >
                  Principal Sponsors
                </h3>

                <div className="space-y-2">
                  {principalItems.map((item, index) => {
                    if (item.ninong && item.ninang) {
                      return (
                        <div key={index} className="grid grid-cols-2 gap-4 sm:gap-6 justify-center items-center">
                          <div className="min-w-0 text-right">
                            <p className="paired-ninong-item ninong-item text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] whitespace-nowrap">
                              {item.ninong}
                            </p>
                          </div>
                          <div className="min-w-0 text-left">
                            <p className="paired-ninang-item ninang-item text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] whitespace-nowrap">
                              {item.ninang}
                            </p>
                          </div>
                        </div>
                      )
                    }
                    return (
                      <div key={index} className="flex justify-center">
                        <p className="unpaired-item text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] text-center whitespace-nowrap">
                          {item.ninong || item.ninang}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {bridalParty && (
              <div className="mb-6">
                <div className="mb-6 grid grid-cols-2 gap-4 sm:gap-6 justify-center items-center">
                  <div ref={bestmanRef} className="min-w-0">
                    <p
                      className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-right uppercase"
                      style={{ color: theme.text.brown }}
                    >
                      Best Man
                    </p>
                    {bridalParty.bestman && (
                      <p className="text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] whitespace-nowrap text-right">
                        {bridalParty.bestman}
                      </p>
                    )}
                  </div>

                  <div ref={maidOfHonorRef} className="min-w-0">
                    <p
                      className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-left uppercase"
                      style={{ color: theme.text.brown }}
                    >
                      Maid of Honor
                    </p>
                    {bridalParty.maidOfHonor && (
                      <p className="text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] whitespace-nowrap text-left">
                        {bridalParty.maidOfHonor}
                      </p>
                    )}
                  </div>
                </div>

                {bridalParty.matronOfHonor && (
                  <div ref={matronOfHonorRef} className="mb-6 flex flex-col items-center gap-2 text-center">
                    <p
                      className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold whitespace-nowrap uppercase"
                      style={{ color: theme.text.brown }}
                    >
                      Matron of Honor
                    </p>
                    <p className="text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] whitespace-nowrap">
                      {bridalParty.matronOfHonor}
                    </p>
                  </div>
                )}

                <div className="mb-2 grid grid-cols-2 gap-4 sm:gap-6 justify-center items-start">
                  <div className="min-w-0 text-right">
                    <p
                      className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap uppercase"
                      style={{ color: theme.text.brown }}
                    >
                      Groomsmen
                    </p>
                  </div>
                  <div className="min-w-0 text-left">
                    <p
                      className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap uppercase"
                      style={{ color: theme.text.brown }}
                    >
                      Bridesmaids
                    </p>
                  </div>
                </div>

                <div ref={groomsMenBridesmaidsRef} className="space-y-2">
                  {gmPairs.map((pair, index) => (
                    <div key={index} className="grid grid-cols-2 gap-4 sm:gap-6 justify-center items-center">
                      <div className="min-w-0 text-right">
                        {pair.groomsman ? (
                          <p className="paired-ninong-item groomsmen-item text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] break-words leading-tight">
                            {pair.groomsman}
                          </p>
                        ) : (
                          <span aria-hidden="true">&nbsp;</span>
                        )}
                      </div>
                      <div className="min-w-0 text-left">
                        {pair.bridesmaid ? (
                          <p className="paired-ninang-item bridesmaids-item text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] break-words leading-tight">
                            {pair.bridesmaid}
                          </p>
                        ) : (
                          <span aria-hidden="true">&nbsp;</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {bridalParty.bridesman && (
                  <div ref={bridesmanRef} className="mt-6 flex flex-col items-center gap-2 text-center">
                    <p
                      className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold whitespace-nowrap uppercase"
                      style={{ color: theme.text.brown }}
                    >
                      Bridesman
                    </p>
                    <p className="text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] whitespace-nowrap">
                      {bridalParty.bridesman}
                    </p>
                  </div>
                )}
              </div>
            )}

            {secondarySponsors && (
              <div ref={secondarySponsorsRef} className="mb-6">
                <h3
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl imperial-script-regular mb-6 text-center capitalize whitespace-nowrap"
                  style={{ color: theme.text.brown }}
                >
                  Secondary Sponsors
                </h3>

                {candle && (
                  <div className="mb-6">
                    <p
                      className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-3 whitespace-nowrap text-center uppercase"
                      style={{ color: theme.text.brown }}
                    >
                      Candle
                    </p>
                    <div ref={candleBlockRef} className="flex flex-col items-center gap-2">
                      <p className="paired-ninong-item text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] whitespace-nowrap text-center">
                        {candle.left}
                      </p>
                      <p className="paired-ninang-item text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] whitespace-nowrap text-center">
                        {candle.right}
                      </p>
                    </div>
                  </div>
                )}

                {veil?.pairs?.length > 0 && (
                  <div className="mb-6">
                    <p
                      className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-3 whitespace-nowrap text-center uppercase"
                      style={{ color: theme.text.brown }}
                    >
                      Veil
                    </p>
                    <div ref={veilBlockRef} className="space-y-2">
                      {veil.pairs.map((pair, index) => (
                        <div key={index} className="flex flex-col items-center gap-2">
                          <p className="paired-ninong-item text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] whitespace-nowrap text-center">
                            {pair.left}
                          </p>
                          <p className="paired-ninang-item text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] whitespace-nowrap text-center">
                            {pair.right}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {cord?.pairs?.length > 0 && (
                  <div className="mb-6">
                    <p
                      className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-3 whitespace-nowrap text-center uppercase"
                      style={{ color: theme.text.brown }}
                    >
                      Cord
                    </p>
                    <div ref={cordBlockRef} className="space-y-2">
                      {cord.pairs.map((pair, index) => (
                        <div key={index} className="flex flex-col items-center gap-2">
                          <p className="paired-ninong-item text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] whitespace-nowrap text-center">
                            {pair.left}
                          </p>
                          <p className="paired-ninang-item text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] whitespace-nowrap text-center">
                            {pair.right}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {flowerGirls.length > 0 && (
              <div className="mb-6">
                <div ref={flowerLadiesRef} className="flex flex-col gap-2 justify-center items-center">
                  <p
                    className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-center uppercase"
                    style={{ color: theme.text.brown }}
                  >
                    Flower Girls
                  </p>
                  {flowerGirls.map((name, index) => (
                    <p
                      key={index}
                      className="text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] whitespace-nowrap text-center"
                    >
                      {name}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {(entourage.ringBearer || entourage.coinBearer) && (
              <div className="mb-6 grid grid-cols-2 gap-4 sm:gap-6 justify-center items-start">
                <div ref={ringBearerRef} className="min-w-0 flex flex-col gap-2 items-center">
                  <p
                    className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-center uppercase"
                    style={{ color: theme.text.brown }}
                  >
                    Ring Bearer
                  </p>
                  {entourage.ringBearer && (
                    <p className="text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] whitespace-nowrap text-center">
                      {entourage.ringBearer}
                    </p>
                  )}
                </div>
                <div ref={coinBearerRef} className="min-w-0 flex flex-col gap-2 items-center">
                  <p
                    className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-center uppercase"
                    style={{ color: theme.text.brown }}
                  >
                    Coin Bearer
                  </p>
                  {entourage.coinBearer && (
                    <p className="text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] whitespace-nowrap text-center">
                      {entourage.coinBearer}
                    </p>
                  )}
                </div>
              </div>
            )}

            {(entourage.candleBearer || entourage.bibleBearer) && (
              <div className="mb-6 grid grid-cols-2 gap-4 sm:gap-6 justify-center items-start">
                <div ref={candleBearerRef} className="min-w-0 flex flex-col gap-2 items-center">
                  {entourage.candleBearer && (
                    <>
                      <p
                        className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-center uppercase"
                        style={{ color: theme.text.brown }}
                      >
                        Candle Bearer
                      </p>
                      <p className="text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] break-words leading-tight text-center">
                        {entourage.candleBearer}
                      </p>
                    </>
                  )}
                </div>
                <div ref={bibleBearerRef} className="min-w-0 flex flex-col gap-2 items-center">
                  {entourage.bibleBearer && (
                    <>
                      <p
                        className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-center uppercase"
                        style={{ color: theme.text.brown }}
                      >
                        Bible Bearer
                      </p>
                      <p className="text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] break-words leading-tight text-center">
                        {entourage.bibleBearer}
                      </p>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-5">
          <img src="/assets/images/graphics/white-blur.png" alt="White blur effect" className="w-full h-auto" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center z-10">
          <img
            src="/assets/images/graphics/gold-banner-2.png"
            alt="Decorative graphic"
            className="w-full h-auto scale-y-[-1]"
          />
        </div>
      </div>
    </>
  )
}

export default EntourageListContent
