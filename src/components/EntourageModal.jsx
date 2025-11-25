import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { themeConfig } from '../config/themeConfig'

const EntourageModal = ({ isOpen, onClose }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null)
  
  if (!isOpen) return null

  // Dynamically generate entourage images array
  // Update this number based on how many entourage photos exist
  const ENTOURAGE_COUNT = 3
  const entourageImages = Array.from({ length: ENTOURAGE_COUNT }, (_, i) => 
    `/assets/images/entourage/${i + 1}.png`
  )

  const openImageViewer = (index) => {
    setSelectedImageIndex(index)
  }

  const closeImageViewer = () => {
    setSelectedImageIndex(null)
  }

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % entourageImages.length)
  }

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + entourageImages.length) % entourageImages.length)
  }

  return createPortal(
    <>
      {/* Main Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />
        
        {/* Modal Content */}
        <div className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header - Sticky */}
          <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-6 border-b border-gray-200 rounded-t-2xl">
            <h3 className="text-2xl font-leckerli font-light text-gray-800">Wedding Entourage</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800 transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {entourageImages.map((image, index) => (
                <div key={index} className="relative group cursor-pointer" onClick={() => openImageViewer(index)}>
                  <div className="aspect-[3/4] overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <img 
                      src={image} 
                      alt={`Entourage member ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Full-screen Image Viewer */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          {/* Black Semi-transparent Overlay */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={closeImageViewer}
          />
          
          {/* Image Container */}
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            {/* Previous Button */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors duration-200"
            >
              <ChevronLeft className="w-6 h-6 text-[#5C4033]" />
            </button>
            
            {/* Image */}
            <img 
              src={entourageImages[selectedImageIndex]} 
              alt={`Entourage member ${selectedImageIndex + 1}`}
              className="w-full h-full object-contain rounded-lg shadow-2xl"
            />
            
            {/* Next Button */}
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors duration-200"
            >
              <ChevronRight className="w-6 h-6 text-[#5C4033]" />
            </button>
            
            {/* Close Button */}
            <button
              onClick={closeImageViewer}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </>,
    document.body
  )
}

export default EntourageModal 