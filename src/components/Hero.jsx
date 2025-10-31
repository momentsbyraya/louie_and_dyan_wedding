import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Play, Pause } from 'lucide-react'
import { themeConfig } from '../config/themeConfig'
import { weddingConfig } from '../config/weddingConfig'
import { images, audio } from '../data'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
  const heroRef = useRef(null)
  const contentRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  // Helper function to format wedding date as MM/DD/YY
  const formatWeddingDate = (dateString) => {
    const date = new Date(dateString)
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const year = String(date.getFullYear()).slice(-2)
    return { month, day, year }
  }

  const weddingDate = formatWeddingDate(weddingConfig.wedding.date)

  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio(audio.background)
    audioRef.current.loop = audio.loop
    audioRef.current.volume = audio.volume

    // Cleanup audio on component unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    // Animate content on load
    if (contentRef.current && contentRef.current.children) {
      gsap.fromTo(contentRef.current.children, 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.5, 
          ease: "linear", 
          stagger: 0.3,
          delay: 0.5
        }
      )
    }
  }, [])

  const toggleMusic = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-cover bg-no-repeat bg-center lg:bg-[center_bottom_20%]"
      style={{
        backgroundImage: `url(${images.hero})`
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>
      
      {/* Crumpled Paper Background on top */}
      <div 
        className="absolute inset-0 opacity-20 z-20"
        style={{
          backgroundImage: 'url(/assets/images/crumpled-paper.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>
      
      {/* Main Content Container */}
      <div ref={contentRef} className="w-full h-full relative z-30 flex flex-col items-center justify-center text-center px-4 py-8">
        
        {/* Save the Date Text */}
        <div className="text-gray-200 text-sm sm:text-base md:text-lg font-albert font-thin tracking-widest uppercase mb-16">
          Save the Date
        </div>

        {/* Large Date Numbers */}
        <div className="flex flex-col items-center mb-12">
          <div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-albert font-thin text-white leading-none mb-4 drop-shadow-lg">
            {weddingDate.month}
          </div>
          <div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-albert font-thin text-white leading-none mb-4 drop-shadow-lg">
            {weddingDate.day}
          </div>
          <div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-albert font-thin text-white leading-none drop-shadow-lg">
            {weddingDate.year}
          </div>
        </div>
      </div>

      {/* Music Player Button - Bottom Right */}
      <div className="absolute bottom-6 right-6 z-40">
        <button
          onClick={toggleMusic}
          className="flex items-center space-x-2 hover:opacity-80 transition-all duration-300 group"
        >
          <span className="text-white text-sm font-albert font-thin opacity-40">
            {isPlaying ? 'Pause Music' : 'Play Music'}
          </span>
          {isPlaying ? (
            <Pause className="w-5 h-5 text-white opacity-40" />
          ) : (
            <Play className="w-5 h-5 text-white opacity-40" />
          )}
        </button>
      </div>
    </section>
  )
}

export default Hero