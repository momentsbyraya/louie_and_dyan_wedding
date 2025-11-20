import { useState } from 'react'
import './App.css'
import WeddingInvitation from './components/WeddingInvitation'
import RSVPModal from './components/RSVPModal'
import DynamicTitle from './components/DynamicTitle'
import Watermark from './components/Watermark'

function App() {
  const [isRSVPModalOpen, setIsRSVPModalOpen] = useState(false)

  return (
    <div className="App min-h-screen wedding-gradient">
      <Watermark />
      <DynamicTitle />
      <WeddingInvitation onOpenRSVP={() => setIsRSVPModalOpen(true)} />
      <RSVPModal isOpen={isRSVPModalOpen} onClose={() => setIsRSVPModalOpen(false)} />
    </div>
  )
}

export default App 