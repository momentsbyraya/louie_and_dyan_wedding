import { useState } from 'react'
import './App.css'
import WeddingInvitation from './components/WeddingInvitation'
import RSVPModal from './components/RSVPModal'
import DynamicTitle from './components/DynamicTitle'
import OpeningScreen from './components/OpeningScreen'

function App() {
  const [isRSVPModalOpen, setIsRSVPModalOpen] = useState(false)
  const [showInvitation, setShowInvitation] = useState(false)

  const handleEnvelopeOpen = () => {
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