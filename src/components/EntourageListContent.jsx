import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { entourage } from '../data'
import { weddingConfig } from '../config/weddingConfig'
import theme from '../config/theme.json'
import './Entourage.css'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const entourageTitleGradientStyle = {
  background: 'linear-gradient(135deg, #edb030 0%, #d99a1a 20%, #926018 50%, #775016 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

const EntourageListContent = ({ scrollContainerRef }) => {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const coupleRef = useRef(null)
  const parentsRef = useRef(null)
  const principalSponsorsRef = useRef(null)
  const secondarySponsorsRef = useRef(null)
  const bestmanRef = useRef(null)
  const maidOfHonorRef = useRef(null)
  const veilSponsorsRef = useRef(null)
  const veilSponsors2Ref = useRef(null)
  const cordSponsorsRef = useRef(null)
  const cordSponsors2Ref = useRef(null)
  const candleSponsorsRef = useRef(null)
  const candleSponsors2Ref = useRef(null)
  const ringBearerRef = useRef(null)
  const bibleBearerRef = useRef(null)
  const coinBearerRef = useRef(null)
  const flowerLadiesRef = useRef(null)
  const heraldOfBrideRef = useRef(null)

  useEffect(() => {
    const scroller = scrollContainerRef?.current

    if (sectionRef.current) {
      gsap.set(sectionRef.current, { opacity: 1, x: 0 })
    }

    const allNameElements = sectionRef.current?.querySelectorAll('p.font-poppins, .ninong-item, .ninang-item, .groomsmen-item, .bridesmaids-item')
    if (allNameElements && allNameElements.length > 0) {
      gsap.set(allNameElements, { opacity: 0, y: 20 })
    }

    const scrollOpts = scroller ? { scroller } : {}

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 50%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
        ...scrollOpts
      }
    })

    // Header animation
    tl.fromTo(headerRef.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    )


    // Collect all names from Parents down to Flower Girls for sequential row-by-row animation
    const allNameRows = []
    let currentTime = 0
    
    // Parents section - collect rows (Groom's Parents and Bride's Parents)
    if (parentsRef.current) {
      const allParentsContainers = parentsRef.current.querySelectorAll('.flex-1')
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
    
    // BRIDE & GROOM section - collect rows
    if (coupleRef.current) {
      const groomName = coupleRef.current.querySelectorAll('.flex-1:first-child p.font-poppins')
      const brideName = coupleRef.current.querySelectorAll('.flex-1:last-child p.font-poppins')
      
      if (groomName.length > 0 && brideName.length > 0) {
        gsap.set([...groomName, ...brideName], { opacity: 0, y: 20 })
        const row = []
        if (groomName[0]) row.push(groomName[0])
        if (brideName[0]) row.push(brideName[0])
        if (row.length > 0) {
          allNameRows.push({ elements: row, time: currentTime })
          currentTime += 0.2
        }
      }
    }

    // Bestman and Maid of Honor - collect rows (right after Secondary Sponsors)
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

    // Principal Sponsors - collect rows in order
    if (principalSponsorsRef.current) {
      // Get all item containers (each pair or single is in a container div)
      const itemContainers = principalSponsorsRef.current.querySelectorAll('.space-y-2 > div')
      
      if (itemContainers && itemContainers.length > 0) {
        Array.from(itemContainers).forEach(container => {
          const pairedNinong = container.querySelector('.paired-ninong-item')
          const pairedNinang = container.querySelector('.paired-ninang-item')
          const unpaired = container.querySelector('.unpaired-item')
          
          if (pairedNinong && pairedNinang) {
            // It's a pair
            gsap.set([pairedNinong, pairedNinang], { opacity: 0, y: 20 })
            allNameRows.push({ elements: [pairedNinong, pairedNinang], time: currentTime })
            currentTime += 0.2
          } else if (unpaired) {
            // It's a single
            gsap.set(unpaired, { opacity: 0, y: 20 })
            allNameRows.push({ elements: [unpaired], time: currentTime })
            currentTime += 0.1
          }
        })
      }
    }

    // Secondary Sponsors - collect Candle, Veil, Cord Sponsors (single column - one name per row)
    const sponsorRefs = [veilSponsorsRef, veilSponsors2Ref, cordSponsorsRef, cordSponsors2Ref, candleSponsorsRef, candleSponsors2Ref].filter(ref => ref.current)
    sponsorRefs.forEach(ref => {
      const names = ref.current.querySelectorAll('p.font-poppins')
      if (names.length > 0) {
        gsap.set(names, { opacity: 0, y: 20 })
        Array.from(names).forEach(name => {
          allNameRows.push({ elements: [name], time: currentTime })
          currentTime += 0.1
        })
      }
    })
    
    


    // Ring, Bible, Coins - collect (single column - one name per row)
    const bearerRefs = [ringBearerRef, bibleBearerRef, coinBearerRef].filter(ref => ref.current)
    bearerRefs.forEach(ref => {
      const names = ref.current.querySelectorAll('p.font-poppins')
      if (names.length > 0) {
        gsap.set(names, { opacity: 0, y: 20 })
        Array.from(names).forEach(name => {
          allNameRows.push({ elements: [name], time: currentTime })
          currentTime += 0.1
        })
      }
    })

    // Flower Ladies - collect (single column - one name per row)
    if (flowerLadiesRef.current) {
      const names = flowerLadiesRef.current.querySelectorAll('p.font-poppins')
      if (names.length > 0) {
        gsap.set(names, { opacity: 0, y: 20 })
        Array.from(names).forEach(name => {
          allNameRows.push({ elements: [name], time: currentTime })
          currentTime += 0.1
        })
      }
    }

    // Herald of the bride - collect (single column - one name per row)
    if (heraldOfBrideRef.current) {
      const names = heraldOfBrideRef.current.querySelectorAll('p.font-poppins')
      if (names.length > 0) {
        gsap.set(names, { opacity: 0, y: 20 })
        Array.from(names).forEach(name => {
          allNameRows.push({ elements: [name], time: currentTime })
          currentTime += 0.1
        })
      }
    }

    
    // Animate all collected rows sequentially when any section comes into view
    if (allNameRows.length > 0 && parentsRef.current) {
        ScrollTrigger.create({
        trigger: parentsRef.current,
          start: "top 80%",
          ...scrollOpts,
          onEnter: () => {
          const masterTl = gsap.timeline()
          allNameRows.forEach(({ elements }, index) => {
            // Each animation starts at a fixed delay from the first one (not waiting for previous to finish)
            // This creates a smooth cascading effect
            masterTl.to(elements, {
        opacity: 1, 
        y: 0, 
              duration: 0.8,
              ease: "power1.out"
            }, index * 0.15) // Each animation starts 0.15s after the first one started
            })
          },
          toggleActions: "play none none reverse"
        })
    }

    requestAnimationFrame(() => ScrollTrigger.refresh())

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [scrollContainerRef])

  const principalSponsors = entourage.entourageList.find(item => item.category === "Principal Sponsors")
  const secondarySponsors = entourage.entourageList.find(item => item.category === "Secondary Sponsors")
  const bestman = secondarySponsors?.bestman ? { names: [secondarySponsors.bestman] } : null
  const maidOfHonor = secondarySponsors?.matronOfHonor ? { names: [secondarySponsors.matronOfHonor] } : null
  const candle1 = entourage.entourageList.find(item => item.category === "Candle 1")
  const candle2 = entourage.entourageList.find(item => item.category === "Candle 2")
  const veil1 = entourage.entourageList.find(item => item.category === "Veil 1")
  const veil2 = entourage.entourageList.find(item => item.category === "Veil 2")
  const cord1 = entourage.entourageList.find(item => item.category === "Cord 1")
  const cord2 = entourage.entourageList.find(item => item.category === "Cord 2")
  const ringBearer = entourage.entourageList.find(item => item.category === "Ring Bearer")
  const bibleBearer = entourage.entourageList.find(item => item.category === "Bible Bearer")
  const coinBearer = entourage.entourageList.find(item => item.category === "Coin Bearer")
  const flowerLadies = entourage.entourageList.find(item => item.category === "Flower Ladies")
  const heraldOfBride = entourage.entourageList.find(item => item.category === "Herald of the bride")

  // Short first names for main title above NUPTIALS (groom: first name only, e.g. JOHN)
  const groomHeaderName =
    (weddingConfig.couple.groom.firstName || '').trim().split(/\s+/)[0]?.toUpperCase() || ''
  const brideHeaderName =
    (weddingConfig.couple.bride.firstName || '').trim().split(/\s+/)[0]?.toUpperCase() || ''

  // BRIDE & GROOM row — full names in uppercase
  const groomFullName =
    weddingConfig.couple.groom.fullName ||
    `${weddingConfig.couple.groom.firstName.toUpperCase()} ${weddingConfig.couple.groom.lastName.toUpperCase()}`
  const brideFullName =
    weddingConfig.couple.bride.fullName ||
    `${weddingConfig.couple.bride.firstName.toUpperCase()} ${weddingConfig.couple.bride.lastName.toUpperCase()}`

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
        {/* Background Image - old book */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
          style={{
            backgroundImage: 'url(/assets/images/graphics/old-book-bg.png)',
            opacity: 0.3
          }}
        />

        {/* White Blur - Top (Flipped Vertically) */}
        <div className="absolute top-0 left-0 right-0 z-5">
          <img 
            src="/assets/images/graphics/white-blur.png" 
            alt="White blur effect"
            className="w-full h-auto scale-y-[-1]"
          />
        </div>

        {/* Gold Banner - Top */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-center z-10">
            <img 
            src="/assets/images/graphics/gold-banner-2.png" 
              alt="Decorative graphic"
            className="w-full h-auto"
            />
        </div>

        {/* Content */}
        <div className="relative z-20 flex items-center justify-center">
          <div className="max-w-xs sm:max-w-md lg:max-w-4xl w-full mx-auto px-4 sm:px-6 md:px-6 lg:px-8">
            {/* Header Section */}
            <div className="text-center mb-12">
              <h2 ref={headerRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-8">
                {/* Couple names above NUPTIALS — short first names; wraps on small screens so both show */}
                <div className="flex flex-wrap items-baseline justify-center gap-x-2 gap-y-1 px-1 pt-4 text-center sm:gap-x-3 sm:pt-6 md:pt-8">
                  <span
                    className="font-caribbean text-3xl leading-none sm:text-4xl md:text-5xl lg:text-6xl"
                    style={entourageTitleGradientStyle}
                  >
                    {groomHeaderName}
                  </span>
                  <span
                    className="font-caribbean text-lg leading-none sm:text-xl md:text-2xl lg:text-3xl"
                    style={entourageTitleGradientStyle}
                  >
                    &
                  </span>
                  <span
                    className="font-caribbean text-3xl leading-none sm:text-4xl md:text-5xl lg:text-6xl"
                    style={entourageTitleGradientStyle}
                  >
                    {brideHeaderName}
                  </span>
                </div>
                {/* NUPTIALS */}
                <div className="caudex-bold text-base sm:text-lg md:text-xl lg:text-2xl block leading-none uppercase mt-4" style={{ lineHeight: '0.8', color: theme.text.secondary }}>
                  NUPTIALS
                </div>
          </h2>
            </div>

            {/* BRIDE & GROOM Section */}
            <div ref={coupleRef} className="mb-6 flex flex-row gap-4 sm:gap-6 justify-center items-center">
              {/* Groom */}
              <div className="flex-1">
                <p className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-right uppercase" style={{ color: theme.text.brown }}>GROOM</p>
                <p className="text-right font-poppins text-[8.5px] uppercase leading-snug text-[#333333] sm:text-[12px] md:text-[14px] lg:text-[16px] break-words">
                  {groomFullName}
                </p>
              </div>

              {/* Bride */}
              <div className="flex-1">
                <p className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-left uppercase" style={{ color: theme.text.brown }}>BRIDE</p>
                <p className="text-left font-poppins text-[8.5px] uppercase leading-snug text-[#333333] sm:text-[12px] md:text-[14px] lg:text-[16px] break-words">
                  {brideFullName}
                </p>
              </div>
            </div>

            {/* Parents Section */}
            <div ref={parentsRef} className="mb-6 flex flex-row gap-4 sm:gap-6 justify-center items-start">
              {/* Groom's Parents */}
              <div className="flex-1">
                <p className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-right uppercase" style={{ color: theme.text.brown }}>GROOM'S PARENTS</p>
                <div className="text-right">
                  <p className="text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] whitespace-nowrap overflow-hidden text-ellipsis">
                    {entourage.parents.groom.father}
                  </p>
                  <p className="text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] whitespace-nowrap overflow-hidden text-ellipsis mt-1">
                    {entourage.parents.groom.mother}
                  </p>
                </div>
              </div>

              {/* Bride's Parents */}
              <div className="flex-1">
                <p className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-left uppercase" style={{ color: theme.text.brown }}>BRIDE'S PARENTS</p>
                <div className="text-left">
                  <p className="text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] whitespace-nowrap overflow-hidden text-ellipsis">
                    {entourage.parents.bride.father}
                  </p>
                  <p className="text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] whitespace-nowrap overflow-hidden text-ellipsis mt-1">
                    {entourage.parents.bride.mother}
                  </p>
                </div>
              </div>
            </div>

            {/* Principal Sponsors */}
            {principalSponsors && (() => {
              const items = principalSponsors.items || []
              
              return (
                <div ref={principalSponsorsRef} className="mb-6">
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl imperial-script-regular mb-6 text-center capitalize whitespace-nowrap" style={{ color: theme.text.brown }}>Principal Sponsors</h3>
                  
                  {/* Render items in order */}
                  <div className="space-y-2">
                    {items.map((item, index) => {
                      if (item.ninong && item.ninang) {
                        // It's a pair - render side by side
                        return (
                          <div key={index} className="flex flex-row gap-4 sm:gap-6 justify-center items-center">
                            <div className="flex-1 text-right">
                              <p className="paired-ninong-item ninong-item text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] whitespace-nowrap overflow-hidden text-ellipsis">
                                {item.ninong}
                              </p>
                            </div>
                            <div className="flex-1 text-left">
                              <p className="paired-ninang-item ninang-item text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] whitespace-nowrap overflow-hidden text-ellipsis">
                                {item.ninang}
                              </p>
                            </div>
                          </div>
                        )
                      } else {
                        // It's a single - render centered
                        return (
                          <div key={index} className="flex justify-center">
                            <p className="unpaired-item text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] text-center whitespace-nowrap overflow-hidden text-ellipsis">
                              {item.ninong || item.ninang}
                            </p>
                          </div>
                        )
                      }
                    })}
                  </div>
                </div>
              )
            })()}

            {/* Secondary Sponsors */}
            {secondarySponsors && (
              <div ref={secondarySponsorsRef} className="mb-6">
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl imperial-script-regular mb-6 text-center capitalize whitespace-nowrap" style={{ color: theme.text.brown }}>Secondary Sponsors</h3>
                
                {/* Bestman and Matron */}
                <div className="mb-6 flex flex-row gap-4 sm:gap-6 justify-center items-center">
                  {/* Bestman */}
                  {bestman && (
                    <div ref={bestmanRef} className="flex-1">
                      <p className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-right uppercase" style={{ color: theme.text.brown }}>BESTMAN</p>
                      {bestman.names && bestman.names.map((name, index) => (
                        <p key={index} className="text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] whitespace-nowrap overflow-hidden text-ellipsis text-right">
                          {name}
                        </p>
                      ))}
                    </div>
                  )}

                  {/* Matron */}
                  {maidOfHonor && (
                    <div ref={maidOfHonorRef} className="flex-1">
                      <p className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-left uppercase" style={{ color: theme.text.brown }}>MATRON OF HONOR</p>
                      {maidOfHonor.names && maidOfHonor.names.map((name, index) => (
                        <p key={index} className="text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] whitespace-nowrap overflow-hidden text-ellipsis text-left">
                          {name}
                        </p>
                      ))}
                    </div>
                  )}
                </div>

                {/* Three Columns Layout */}
                <div className="flex flex-row gap-4 sm:gap-6 justify-center items-start mb-6">
                  {/* Left Column: CANDLE 1, CANDLE 2, RING BEARER */}
                  <div className="flex-1">
                    {candle1 && (
                      <div ref={candleSponsorsRef} className="flex flex-col gap-2 justify-center items-center mb-4">
                        <p className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-center uppercase" style={{ color: theme.text.brown }}>CANDLE</p>
                        {candle1.names && candle1.names.map((name, index) => (
                          <p key={index} className="text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] whitespace-nowrap overflow-hidden text-ellipsis text-center">
                            {name}
                          </p>
                        ))}
                      </div>
                    )}
                    {candle2 && (
                      <div ref={candleSponsors2Ref} className="flex flex-col gap-2 justify-center items-center mb-4">
                        <p className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-center uppercase" style={{ color: theme.text.brown }}>CANDLE</p>
                        {candle2.names && candle2.names.map((name, index) => (
                          <p key={index} className="text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] whitespace-nowrap overflow-hidden text-ellipsis text-center">
                            {name}
                          </p>
                        ))}
                      </div>
                    )}
                    {ringBearer && (
                      <div ref={ringBearerRef} className="flex flex-col gap-2 justify-center items-center">
                        <p className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-center uppercase" style={{ color: theme.text.brown }}>RING</p>
                        {ringBearer.names && ringBearer.names.map((name, index) => (
                          <p key={index} className="text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] whitespace-nowrap overflow-hidden text-ellipsis text-center">
                            {name}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Middle Column: VEIL 1, VEIL 2, BIBLE BEARER */}
                  <div className="flex-1">
                    {veil1 && (
                      <div ref={veilSponsorsRef} className="flex flex-col gap-2 justify-center items-center mb-4">
                        <p className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-center uppercase" style={{ color: theme.text.brown }}>VEIL</p>
                        {veil1.names && veil1.names.map((name, index) => (
                          <p key={index} className="text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] whitespace-nowrap overflow-hidden text-ellipsis text-center">
                            {name}
                          </p>
                        ))}
                      </div>
                    )}
                    {veil2 && (
                      <div ref={veilSponsors2Ref} className="flex flex-col gap-2 justify-center items-center mb-4">
                        <p className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-center uppercase" style={{ color: theme.text.brown }}>VEIL</p>
                        {veil2.names && veil2.names.map((name, index) => (
                          <p key={index} className="text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] whitespace-nowrap overflow-hidden text-ellipsis text-center">
                            {name}
                          </p>
                        ))}
                      </div>
                    )}
                    {bibleBearer && (
                      <div ref={bibleBearerRef} className="flex flex-col gap-2 justify-center items-center">
                        <p className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-center uppercase" style={{ color: theme.text.brown }}>BIBLE</p>
                        {bibleBearer.names && bibleBearer.names.map((name, index) => (
                          <p key={index} className="text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] whitespace-nowrap overflow-hidden text-ellipsis text-center">
                            {name}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Right Column: CORD 1, CORD 2, COIN BEARER */}
                  <div className="flex-1">
                    {cord1 && (
                      <div ref={cordSponsorsRef} className="flex flex-col gap-2 justify-center items-center mb-4">
                        <p className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-center uppercase" style={{ color: theme.text.brown }}>CORD</p>
                        {cord1.names && cord1.names.map((name, index) => (
                          <p key={index} className="text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] whitespace-nowrap overflow-hidden text-ellipsis text-center">
                            {name}
                          </p>
                        ))}
                      </div>
                    )}
                    {cord2 && (
                      <div ref={cordSponsors2Ref} className="flex flex-col gap-2 justify-center items-center mb-4">
                        <p className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-center uppercase" style={{ color: theme.text.brown }}>CORD</p>
                        {cord2.names && cord2.names.map((name, index) => (
                          <p key={index} className="text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] whitespace-nowrap overflow-hidden text-ellipsis text-center">
                            {name}
                          </p>
                        ))}
                      </div>
                    )}
                    {coinBearer && (
                      <div ref={coinBearerRef} className="flex flex-col gap-2 justify-center items-center">
                        <p className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-center uppercase" style={{ color: theme.text.brown }}>COIN</p>
                        {coinBearer.names && coinBearer.names.map((name, index) => (
                          <p key={index} className="text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] whitespace-nowrap overflow-hidden text-ellipsis text-center">
                            {name}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

            {/* Flower Ladies */}
            {flowerLadies && (
              <div className="mb-6">
                <div ref={flowerLadiesRef} className="flex flex-col gap-2 justify-center items-center">
                  <p className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-center uppercase" style={{ color: theme.text.brown }}>Flower Ladies</p>
                  {flowerLadies.names && flowerLadies.names.map((name, index) => (
                    <p key={index} className="text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] whitespace-nowrap overflow-hidden text-ellipsis text-center">
                      {name}
                    </p>
                  ))}
                </div>
              </div>
            )}

              </div>
            )}

            {/* Herald of the bride */}
            {heraldOfBride && (
              <div className="mb-6">
                <div ref={heraldOfBrideRef} className="flex flex-col gap-2 justify-center items-center">
                  <p className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-center uppercase" style={{ color: theme.text.brown }}>Herald of the bride</p>
                  {heraldOfBride.names && heraldOfBride.names.map((name, index) => (
                    <p key={index} className="text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] whitespace-nowrap overflow-hidden text-ellipsis text-center">
                      {name}
                    </p>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* White Blur - Bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-5">
          <img 
            src="/assets/images/graphics/white-blur.png" 
            alt="White blur effect"
            className="w-full h-auto"
          />
        </div>

        {/* Gold Banner - Bottom (Flipped Vertically) */}
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
