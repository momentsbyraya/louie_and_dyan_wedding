import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { entourage, couple } from '../data'
import { weddingConfig } from '../config/weddingConfig'
import theme from '../config/theme.json'
import './Entourage.css'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Entourage = () => {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const groomRef = useRef(null)
  const brideRef = useRef(null)
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
  const flowersContainerRef = useRef(null)
  const goldFlowersContainerRef = useRef(null)
  const [goldFlowers, setGoldFlowers] = useState([])

  // Generate gold flowers for snow effect
  useEffect(() => {
    const flowerCount = 12 // Number of flowers
    const flowers = []
    for (let i = 0; i < flowerCount; i++) {
      flowers.push({
        id: i,
        left: Math.random() * 100, // Random horizontal position (0-100%)
        delay: Math.random() * 5, // Random delay (0-5s)
        duration: 8 + Math.random() * 7, // Random duration (8-15s)
        size: 8 + Math.random() * 12, // Random size (8-20px)
        rotation: Math.random() * 360, // Random initial rotation
      })
    }
    setGoldFlowers(flowers)
  }, [])

  // Set container height for animation
  useEffect(() => {
    if (goldFlowersContainerRef.current && sectionRef.current) {
      const containerHeight = sectionRef.current.offsetHeight
      goldFlowersContainerRef.current.style.setProperty('--container-height', `${containerHeight}px`)
    }
  }, [goldFlowers])

  useLayoutEffect(() => {
    const pageLoadTime = performance.now()
    console.log('Current page: Entourage')
    console.log('Page load time:', pageLoadTime, 'ms')
    
    // Start falling flowers animation immediately when page opens
    // The first flower (delay-0) starts immediately, others follow with their delays
    const startAnimations = () => {
      const animationStartTime = performance.now()
      const timeSincePageLoad = ((animationStartTime - pageLoadTime) / 1000).toFixed(2)
      
      if (flowersContainerRef.current) {
        const flowers = flowersContainerRef.current.querySelectorAll('.falling-flower')
        console.log('Found flowers:', flowers.length)
        
        if (flowers.length > 0) {
          let delayZeroFound = false
          flowers.forEach((flower, index) => {
            // Remove any existing animation delay for delay-0 to start immediately
            if (flower.classList.contains('delay-0')) {
              delayZeroFound = true
              
              // Force restart animation by removing and re-adding
              flower.style.animation = 'none'
              void flower.offsetWidth // Force reflow
              
              // Set initial transform to start delay-0 flowers at top of viewport (immediately visible)
              // Start from 0vh instead of -100vh so they're visible right away
              flower.style.transform = 'translateY(0vh) rotate(0deg)'
              flower.style.opacity = '0.6'
              flower.style.animationDelay = '0s'
              flower.style.animationPlayState = 'running'
              
              // Re-apply animation - it will continue from the current transform
              const speedClass = flower.classList.toString().match(/speed-(slow|medium|fast)/)?.[1] || 'medium'
              const duration = speedClass === 'slow' ? 15 : speedClass === 'fast' ? 8 : 12
              
              // Create custom keyframes that start from 0vh (visible) instead of -100vh
              const animationName = `fallingSnowVisible-${speedClass}`
              if (!document.getElementById(`style-${animationName}`)) {
                const style = document.createElement('style')
                style.id = `style-${animationName}`
                style.textContent = `
                  @keyframes ${animationName} {
                    0% {
                      transform: translateY(0vh) rotate(0deg);
                      opacity: 0.6;
                    }
                    90% {
                      opacity: 0.6;
                    }
                    100% {
                      transform: translateY(100vh) rotate(360deg);
                      opacity: 0;
                    }
                  }
                `
                document.head.appendChild(style)
              }
              
              flower.style.animation = `${animationName} ${duration}s linear infinite`
              
              // Check computed styles to verify what's actually applied
              const computedStyle = window.getComputedStyle(flower)
              const computedDelay = computedStyle.animationDelay
              const computedPlayState = computedStyle.animationPlayState
              const computedOpacity = computedStyle.opacity
              const computedTop = computedStyle.top
              const computedTransform = computedStyle.transform
              
              console.log(`Flower ${index} (delay-0): Animation started at ${timeSincePageLoad}s`)
              console.log(`  - Computed animation-delay: ${computedDelay}`)
              console.log(`  - Computed animation-play-state: ${computedPlayState}`)
              console.log(`  - Computed opacity: ${computedOpacity}`)
              console.log(`  - Computed top: ${computedTop}`)
              console.log(`  - Computed transform: ${computedTransform}`)
              console.log(`  - Element visible: ${flower.offsetParent !== null}`)
            } else {
              const delay = flower.classList.toString().match(/delay-(\d+)/)?.[1] || 'unknown'
              flower.style.animationPlayState = 'running'
              
              // Check computed styles for other flowers too
              const computedStyle = window.getComputedStyle(flower)
              const computedDelay = computedStyle.animationDelay
              
              console.log(`Flower ${index} (delay-${delay}): Animation play state set at ${timeSincePageLoad}s`)
              console.log(`  - Computed animation-delay: ${computedDelay}`)
            }
            // Trigger reflow to ensure animation starts
            void flower.offsetWidth
          })
          
          if (!delayZeroFound) {
            console.warn('WARNING: No delay-0 flower found!')
          }
          
          console.log(`Snow effect started after: ${timeSincePageLoad}sec`)
        } else {
          console.warn('No flowers found in container!')
        }
      } else {
        console.warn('Flowers container ref is null!')
      }
    }
    
    // Try immediately
    console.log('Attempting to start animations immediately...')
    startAnimations()
    
    // Also try on next frame in case DOM isn't ready
    requestAnimationFrame(() => {
      console.log('Attempting to start animations on next frame...')
      startAnimations()
    })
  }, [])

  useEffect(() => {
    // Set initial hidden states to prevent glimpse
    if (sectionRef.current) {
      gsap.set(sectionRef.current, { x: '100%', opacity: 0 })
    }
    
    // Set initial hidden states for all name elements to prevent flash
    const allNameElements = sectionRef.current?.querySelectorAll('p.font-poppins, .ninong-item, .ninang-item, .groomsmen-item, .bridesmaids-item')
    if (allNameElements && allNameElements.length > 0) {
      gsap.set(allNameElements, { opacity: 0, y: 20 })
    }
    
    // Page slide-in animation on mount
    if (sectionRef.current) {
      gsap.fromTo(sectionRef.current,
        { x: '100%', opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
      )
    }


    // Scroll-triggered animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 50%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
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
    
    // BRIDE & GROOM section - collect rows
    if (parentsRef.current) {
      const groomName = parentsRef.current.querySelectorAll('.flex-1:first-child p.font-poppins')
      const brideName = parentsRef.current.querySelectorAll('.flex-1:last-child p.font-poppins')
      
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
          onEnter: () => {
          const masterTl = gsap.timeline()
          allNameRows.forEach(({ elements }, index) => {
            // Use += to chain animations sequentially (one after the other)
            // Each row appears after the previous one finishes, with a small gap
            masterTl.to(elements, {
        opacity: 1, 
        y: 0, 
              duration: 0.5,
              ease: "power2.out"
            }, index === 0 ? 0 : "+=0.15") // First animation starts at 0, subsequent ones start 0.15s after previous ends
            })
          },
          toggleActions: "play none none reverse"
        })
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const principalSponsors = entourage.entourageList.find(item => item.category === "Principal Sponsors")
  const secondarySponsors = entourage.entourageList.find(item => item.category === "Secondary Sponsors")
  const bestman = entourage.entourageList.find(item => item.category === "Bestman")
  const maidOfHonor = entourage.entourageList.find(item => item.category === "Maid of Honor")
  const veilSponsors = entourage.entourageList.find(item => item.category === "Veil Sponsors")
  const veilSponsors2 = entourage.entourageList.find(item => item.category === "Veil Sponsors 2")
  const cordSponsors = entourage.entourageList.find(item => item.category === "Cord Sponsors")
  const cordSponsors2 = entourage.entourageList.find(item => item.category === "Cord Sponsors 2")
  const candleSponsors = entourage.entourageList.find(item => item.category === "Candle Sponsors")
  const candleSponsors2 = entourage.entourageList.find(item => item.category === "Candle Sponsors 2")
  const ringBearer = entourage.entourageList.find(item => item.category === "Ring Bearer")
  const bibleBearer = entourage.entourageList.find(item => item.category === "Bible Bearer")
  const coinBearer = entourage.entourageList.find(item => item.category === "Coin Bearer")
  const flowerLadies = entourage.entourageList.find(item => item.category === "Flower Ladies")
  const heraldOfBride = entourage.entourageList.find(item => item.category === "Herald of the bride")

  // Get couple names from config
  // For header display (with drop caps)
  const groomFirstName = weddingConfig.couple.groom.firstName.charAt(0).toUpperCase() + weddingConfig.couple.groom.firstName.slice(1).toLowerCase()
  const brideFirstName = weddingConfig.couple.bride.firstName.charAt(0).toUpperCase() + weddingConfig.couple.bride.firstName.slice(1).toLowerCase()
  const groomFirstLetter = groomFirstName.charAt(0)
  const brideFirstLetter = brideFirstName.charAt(0)
  const groomRest = groomFirstName.substring(1)
  const brideRest = brideFirstName.substring(1)
  
  // For BRIDE & GROOM section (full names in uppercase)
  const groomFullName = weddingConfig.couple.groom.fullName || `${weddingConfig.couple.groom.firstName.toUpperCase()} ${weddingConfig.couple.groom.lastName.toUpperCase()}`
  const brideFullName = weddingConfig.couple.bride.fullName || `${weddingConfig.couple.bride.firstName.toUpperCase()} ${weddingConfig.couple.bride.lastName.toUpperCase()}`

  return (
    <>
      {/* Falling Snow Effect - Flower-3 (fixed to viewport, independent of scroll) */}
      <div ref={flowersContainerRef}>
        {[...Array(20)].map((_, i) => {
          const leftPosition = `${(i * 5) % 100}%`
          const sizeClass = i % 3 === 0 ? 'size-small' : i % 3 === 1 ? 'size-medium' : 'size-large'
          const speedClass = i % 3 === 0 ? 'speed-slow' : i % 3 === 1 ? 'speed-medium' : 'speed-fast'
          const delayClass = `delay-${i % 15}`
          const isDelayZero = (i % 15) === 0

  return (
            <div
              key={`falling-flower-${i}`}
              className={`falling-flower ${sizeClass} ${speedClass} ${delayClass}`}
              style={{ 
                left: leftPosition,
                ...(isDelayZero && {
                  animationDelay: '0s',
                  opacity: '0.6',
                  animationPlayState: 'running'
                })
              }}
            >
              <img 
                src="/assets/images/graphics/flower-3.png" 
                alt="Falling flower"
              />
            </div>
          )
        })}
      </div>

    <section
      ref={sectionRef}
        id="entourage"
        data-section="entourage"
        className="relative w-full overflow-hidden px-6 py-32 sm:py-40 md:py-44 lg:py-52"
        style={{ 
          opacity: 0, 
          transform: 'translateX(100%)'
        }}
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
            src="/assets/images/graphics/gold-banner.png" 
              alt="Decorative graphic"
            className="w-full h-auto"
            />
        </div>

        {/* Gold Flower Snow Effect */}
        <div ref={goldFlowersContainerRef} className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 15 }}>
          {goldFlowers.map((flower) => (
            <img
              key={flower.id}
              src="/assets/images/graphics/gold flower.png"
              alt="Gold flower"
              className="absolute falling-gold-flower"
              style={{
                left: `${flower.left}%`,
                width: `${flower.size}px`,
                height: `${flower.size}px`,
                animation: `fallingGoldFlower ${flower.duration}s linear infinite`,
                animationDelay: `${flower.delay}s`,
                transform: `rotate(${flower.rotation}deg)`,
                opacity: 0.6,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-20 flex items-center justify-center py-12">
          <div className="max-w-xs sm:max-w-md lg:max-w-4xl w-full mx-auto px-4 sm:px-6 md:px-6 lg:px-8">
            {/* Header Section */}
            <div className="text-center mb-12">
              <h2 ref={headerRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-8">
                {/* Couple Names - Main Title with Drop Caps */}
                <div className="font-gilliequest text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center" style={{ background: 'linear-gradient(135deg, #edb030 0%, #d99a1a 20%, #926018 50%, #775016 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl inline-block leading-none mr-1" style={{ lineHeight: '0.75', marginTop: '-0.1em' }}>{groomFirstLetter}</span>
                  {groomRest} &nbsp;&
                  <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl inline-block leading-none mr-1" style={{ lineHeight: '0.75', marginTop: '-0.1em' }}>{brideFirstLetter}</span>
                  {brideRest}
                </div>
                {/* NUPTIALS */}
                <div className="caudex-bold text-base sm:text-lg md:text-xl lg:text-2xl block leading-none uppercase mt-4" style={{ lineHeight: '0.8', color: theme.text.secondary }}>
                  NUPTIALS
                </div>
          </h2>
            </div>

            {/* BRIDE & GROOM Section */}
            <div ref={parentsRef} className="mb-6 flex flex-row gap-4 sm:gap-6 justify-center items-center">
              {/* Groom */}
              <div className="flex-1">
                <p className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-right uppercase" style={{ color: theme.text.brown }}>GROOM</p>
                <p className="text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase whitespace-nowrap overflow-hidden text-ellipsis text-right text-[#333333]">{groomFullName}</p>
              </div>

              {/* Bride */}
              <div className="flex-1">
                <p className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-left uppercase" style={{ color: theme.text.brown }}>BRIDE</p>
                <p className="text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase whitespace-nowrap overflow-hidden text-ellipsis text-left text-[#333333]">{brideFullName}</p>
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
                      <p className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-right uppercase" style={{ color: theme.text.brown }}>Bestman</p>
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
                      <p className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-left uppercase" style={{ color: theme.text.brown }}>Matron</p>
                      {maidOfHonor.names && maidOfHonor.names.map((name, index) => (
                        <p key={index} className="text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] whitespace-nowrap overflow-hidden text-ellipsis text-left">
                          {name}
                        </p>
                      ))}
                    </div>
                  )}
                </div>

                {/* Three Sponsors in One Row */}
                <div className="flex flex-row gap-4 sm:gap-6 justify-center items-start mb-6">
                  {/* Veil */}
                  {veilSponsors && (
                    <div className="flex-1">
                      <div ref={veilSponsorsRef} className="flex flex-col gap-2 justify-center items-center">
                        <p className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-center uppercase" style={{ color: theme.text.brown }}>Veil 1</p>
                        {veilSponsors.names && veilSponsors.names.map((name, index) => (
                          <p key={index} className="text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] whitespace-nowrap overflow-hidden text-ellipsis text-center">
                            {name}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Cord */}
                  {cordSponsors && (
                    <div className="flex-1">
                      <div ref={cordSponsorsRef} className="flex flex-col gap-2 justify-center items-center">
                        <p className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-center uppercase" style={{ color: theme.text.brown }}>Cord 1</p>
                        {cordSponsors.names && cordSponsors.names.map((name, index) => (
                          <p key={index} className="text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] whitespace-nowrap overflow-hidden text-ellipsis text-center">
                            {name}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Candle */}
                  {candleSponsors && (
                    <div className="flex-1">
                      <div ref={candleSponsorsRef} className="flex flex-col gap-2 justify-center items-center">
                        <p className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-center uppercase" style={{ color: theme.text.brown }}>Candle 1</p>
                        {candleSponsors.names && candleSponsors.names.map((name, index) => (
                          <p key={index} className="text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] whitespace-nowrap overflow-hidden text-ellipsis text-center">
                            {name}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
        </div>

                {/* Three Sponsors Row 2 */}
                <div className="flex flex-row gap-4 sm:gap-6 justify-center items-start mb-6">
                  {/* Veil 2 */}
                  {veilSponsors2 && (
                    <div className="flex-1">
                      <div ref={veilSponsors2Ref} className="flex flex-col gap-2 justify-center items-center">
                        <p className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-center uppercase" style={{ color: theme.text.brown }}>Veil 2</p>
                        {veilSponsors2.names && veilSponsors2.names.map((name, index) => (
                          <p key={index} className="text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase whitespace-nowrap overflow-hidden text-ellipsis text-center" style={{ color: '#333333', opacity: 1 }}>
                            {name}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Cord 2 */}
                  {cordSponsors2 && (
                    <div className="flex-1">
                      <div ref={cordSponsors2Ref} className="flex flex-col gap-2 justify-center items-center">
                        <p className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-center uppercase" style={{ color: theme.text.brown }}>Cord 2</p>
                        {cordSponsors2.names && cordSponsors2.names.map((name, index) => (
                          <p key={index} className="text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase whitespace-nowrap overflow-hidden text-ellipsis text-center" style={{ color: '#333333', opacity: 1 }}>
                            {name}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Candle 2 */}
                  {candleSponsors2 && (
                    <div className="flex-1">
                      <div ref={candleSponsors2Ref} className="flex flex-col gap-2 justify-center items-center">
                        <p className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-center uppercase" style={{ color: theme.text.brown }}>Candle 2</p>
                        {candleSponsors2.names && candleSponsors2.names.map((name, index) => (
                          <p key={index} className="text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase whitespace-nowrap overflow-hidden text-ellipsis text-center" style={{ color: '#333333', opacity: 1 }}>
                            {name}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
        </div>

            {/* Ring, Bible, Coins - Stacked */}
            <div className="mb-6 flex flex-col gap-4 justify-center items-center">
              {/* Ring */}
              {ringBearer && (
                <div ref={ringBearerRef} className="flex flex-col gap-2 justify-center items-center">
                  <p className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-center uppercase" style={{ color: theme.text.brown }}>Ring</p>
                  {ringBearer.names && ringBearer.names.map((name, index) => (
                    <p key={index} className="text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] whitespace-nowrap overflow-hidden text-ellipsis text-center">
                      {name}
                    </p>
                  ))}
                </div>
              )}

              {/* Bible */}
              {bibleBearer && (
                <div ref={bibleBearerRef} className="flex flex-col gap-2 justify-center items-center">
                  <p className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-center uppercase" style={{ color: theme.text.brown }}>Bible</p>
                  {bibleBearer.names && bibleBearer.names.map((name, index) => (
                    <p key={index} className="text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] whitespace-nowrap overflow-hidden text-ellipsis text-center">
                      {name}
                    </p>
                  ))}
                </div>
              )}

              {/* Coins */}
              {coinBearer && (
                <div ref={coinBearerRef} className="flex flex-col gap-2 justify-center items-center">
                  <p className="text-[10px] sm:text-[13px] md:text-[15px] lg:text-[17px] caudex-bold mb-2 whitespace-nowrap text-center uppercase" style={{ color: theme.text.brown }}>Coins</p>
                  {coinBearer.names && coinBearer.names.map((name, index) => (
                    <p key={index} className="text-[8.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-poppins uppercase text-[#333333] whitespace-nowrap overflow-hidden text-ellipsis text-center">
                      {name}
                    </p>
                  ))}
                </div>
              )}
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

        {/* Gold Banner - Bottom (Flipped Vertically) */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center z-10">
            <img 
            src="/assets/images/graphics/gold-banner.png" 
              alt="Decorative graphic"
            className="w-full h-auto scale-y-[-1]"
            />
        </div>

    </section>
      
    </>
  )
}

export default Entourage 
