import { useState, useEffect, useRef } from 'react'
import './App.css'
import WeddingInvitation from './components/WeddingInvitation'
import RSVPModal from './components/RSVPModal'
import DynamicTitle from './components/DynamicTitle'
import OpeningScreen from './components/OpeningScreen'
import Loader from './components/Loader'
import Watermark from './components/Watermark'
import { audio } from './data'

function App() {
  const [isRSVPModalOpen, setIsRSVPModalOpen] = useState(false)
  const [showInvitation, setShowInvitation] = useState(false) // Set to false to show opening screen first
  const [isLoading, setIsLoading] = useState(true)
  const audioRef = useRef(null)

  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio(audio.background)
    audioRef.current.loop = audio.loop
    audioRef.current.volume = 1.0 // Set to maximum volume
    audioRef.current.currentTime = 18 // Start at 18 seconds
    audioRef.current.preload = 'auto'
    
    // Handle audio loading errors
    audioRef.current.addEventListener('error', (e) => {
      // Audio loading error handled silently
    })
    
    // Handle audio loaded
    audioRef.current.addEventListener('loadeddata', () => {
      // Audio loaded successfully
    })
    
    // Handle playing state
    audioRef.current.addEventListener('playing', () => {
      // Audio is now playing
    })
    
    // Cleanup audio on component unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  // Preload essential images
  useEffect(() => {
    const essentialImages = [
      '/assets/images/prenup/opening-1.png',
      '/assets/images/prenup/opening-2.png',
      '/assets/images/prenup/opening-3.png',
      '/assets/images/prenup/FOR EDITS-28.jpg', // Hero background image
      '/assets/images/graphics/old-book-bg.png' // Hero top layer background
    ]

    let loadedCount = 0
    const totalImages = essentialImages.length

    const loadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => resolve()
        img.onerror = () => resolve() // Continue even if image fails
        img.src = src
      })
    }

    const loadAllImages = async () => {
      await Promise.all(essentialImages.map(loadImage))
      setIsLoading(false)
    }

    loadAllImages()
  }, [])

  const handleEnvelopeOpen = async () => {
    // Start playing music when invitation is revealed (user interaction allows auto-play)
    if (audioRef.current) {
      try {
        // Start audio at 18 seconds and unmuted
        audioRef.current.currentTime = 18
        audioRef.current.volume = 1.0
        audioRef.current.muted = false
        
        // Check if audio is ready to play
        if (audioRef.current.readyState >= 2) {
          // Audio is loaded enough to play
          const playPromise = audioRef.current.play()
          if (playPromise !== undefined) {
            await playPromise
          }
        } else {
          // Wait for audio to be ready
          audioRef.current.addEventListener('canplaythrough', async () => {
            try {
              audioRef.current.currentTime = 18
              audioRef.current.volume = 1.0
              audioRef.current.muted = false
              const playPromise = audioRef.current.play()
              if (playPromise !== undefined) {
                await playPromise
              }
            } catch (playError) {
              // Play error handled silently
            }
          }, { once: true })
          // Load the audio
          audioRef.current.load()
        }
      } catch (error) {
        // Try to load the audio again if it failed
        try {
          audioRef.current.load()
          await new Promise((resolve) => {
            audioRef.current.addEventListener('canplaythrough', resolve, { once: true })
          })
          audioRef.current.currentTime = 18
          audioRef.current.volume = 1.0
          audioRef.current.muted = false
          await audioRef.current.play()
        } catch (retryError) {
          // Retry failed - handled silently
        }
      }
    }
    setShowInvitation(true)
  }

  return (
    <div className="App min-h-screen wedding-gradient">
      {isLoading && (
        <div className="fixed inset-0 z-[10000] bg-white flex items-center justify-center">
          <Loader />
        </div>
      )}
      {!isLoading && (
        <>
          <Watermark />
          <DynamicTitle />
          {!showInvitation && (
            <OpeningScreen onEnvelopeOpen={handleEnvelopeOpen} />
          )}
          {showInvitation && (
            <WeddingInvitation onOpenRSVP={() => setIsRSVPModalOpen(true)} />
          )}
          <RSVPModal isOpen={isRSVPModalOpen} onClose={() => setIsRSVPModalOpen(false)} />
        </>
      )}
    </div>
  )
}

export default App 