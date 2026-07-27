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
  const [showInvitation, setShowInvitation] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const audioRef = useRef(null)

  useEffect(() => {
    const startTime = typeof audio.startTime === 'number' ? audio.startTime : 0
    const el = new Audio(audio.background)
    el.loop = audio.loop !== false
    el.volume = typeof audio.volume === 'number' ? audio.volume : 1
    el.currentTime = startTime
    el.preload = 'auto'

    const restartLoop = () => {
      if (!el.loop) return
      el.currentTime = startTime
      el.play().catch(() => {})
    }

    el.addEventListener('error', () => {})
    el.addEventListener('loadeddata', () => {})
    el.addEventListener('playing', () => {})
    el.addEventListener('ended', restartLoop)

    audioRef.current = el

    return () => {
      el.removeEventListener('ended', restartLoop)
      el.pause()
      audioRef.current = null
    }
  }, [])

  // Preload essential images
  useEffect(() => {
    const essentialImages = [
      '/assets/images/prenup/IMG_0030.jpg',
      '/assets/images/prenup/IMG_0048.jpg',
      '/assets/images/graphics/old-book-bg.png'
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
    const startTime = typeof audio.startTime === 'number' ? audio.startTime : 0
    const vol = typeof audio.volume === 'number' ? audio.volume : 1

    if (audioRef.current) {
      try {
        audioRef.current.loop = audio.loop !== false
        audioRef.current.currentTime = startTime
        audioRef.current.volume = vol
        audioRef.current.muted = false

        if (audioRef.current.readyState >= 2) {
          const playPromise = audioRef.current.play()
          if (playPromise !== undefined) {
            await playPromise
          }
        } else {
          audioRef.current.addEventListener('canplaythrough', async () => {
            try {
              audioRef.current.currentTime = startTime
              audioRef.current.volume = vol
              audioRef.current.muted = false
              const playPromise = audioRef.current.play()
              if (playPromise !== undefined) {
                await playPromise
              }
            } catch (playError) {
              // Play error handled silently
            }
          }, { once: true })
          audioRef.current.load()
        }
      } catch (error) {
        try {
          audioRef.current.load()
          await new Promise((resolve) => {
            audioRef.current.addEventListener('canplaythrough', resolve, { once: true })
          })
          audioRef.current.currentTime = startTime
          audioRef.current.volume = vol
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
          <DynamicTitle />
          <Watermark />
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