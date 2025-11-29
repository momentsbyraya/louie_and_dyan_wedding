import { useState, useEffect, useRef } from 'react'
import './App.css'
import WeddingInvitation from './components/WeddingInvitation'
import RSVPModal from './components/RSVPModal'
import DynamicTitle from './components/DynamicTitle'
import OpeningScreen from './components/OpeningScreen'
import { audio } from './data'

function App() {
  const [isRSVPModalOpen, setIsRSVPModalOpen] = useState(false)
  const [showInvitation, setShowInvitation] = useState(false)
  const audioRef = useRef(null)
  const START_OFFSET = 32 // Audio starts at 32 seconds

  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio(audio.background)
    audioRef.current.loop = audio.loop
    audioRef.current.volume = audio.volume
    audioRef.current.currentTime = START_OFFSET
    
    // Cleanup audio on component unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const handleEnvelopeOpen = async () => {
    // Start playing music when invitation is revealed (user interaction allows auto-play)
    if (audioRef.current) {
      try {
        await audioRef.current.play()
      } catch (error) {
        console.log('Could not play music:', error)
      }
    }
    setShowInvitation(true)
  }

  return (
    <div className="App min-h-screen wedding-gradient">
      <DynamicTitle />
      {!showInvitation && (
        <OpeningScreen onEnvelopeOpen={handleEnvelopeOpen} />
      )}
      {showInvitation && (
        <WeddingInvitation onOpenRSVP={() => setIsRSVPModalOpen(true)} />
      )}
      <RSVPModal isOpen={isRSVPModalOpen} onClose={() => setIsRSVPModalOpen(false)} />
    </div>
  )
}

export default App 