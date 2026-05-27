import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { sectionTitleStyle } from '../config/themeConfig'

const GiftModal = ({ isOpen, onClose, paymentMethods = [] }) => {
  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  if (!isOpen) return null

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center p-4"
      style={{ zIndex: 99999 }}
      role="dialog"
      aria-modal="true"
      aria-label="Send a gift"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
    >
      <div className="absolute inset-0 bg-black/60" aria-hidden />

      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 sm:p-8 shadow-2xl"
        style={{ zIndex: 1 }}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          onClick={onClose}
          type="button"
          className="absolute top-3 right-3 p-2 text-[#333333] hover:opacity-70 transition-opacity"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center">
          <h3
            className="text-3xl sm:text-4xl md:text-5xl mb-2"
            style={sectionTitleStyle}
          >
            Send a Gift
          </h3>
          <p className="font-albert text-sm sm:text-base font-thin text-[#333333]/80 mb-6">
            Thank you for your generosity. You may send a monetary gift using the QR codes below.
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {paymentMethods.map((method) => (
              <div
                key={method.name}
                className="flex flex-col items-center gap-2 rounded-xl border border-[#333333]/15 bg-[#fafafa] p-3"
              >
                <p className="font-albert text-xs uppercase tracking-wider text-[#333333]/70">
                  {method.name}
                </p>
                {method.image && (
                  <img
                    src={method.image}
                    alt={method.alt || `${method.name} QR code`}
                    className="h-auto w-full max-w-[180px] rounded-md object-contain"
                    loading="lazy"
                  />
                )}
                {method.accountInfo?.accountName && (
                  <p className="font-albert text-xs text-[#333333]/80 text-center">
                    {method.accountInfo.accountName}
                  </p>
                )}
                {method.accountInfo?.accountNumber && (
                  <p className="font-albert text-xs font-medium text-[#333333] text-center">
                    {method.accountInfo.accountNumber}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default GiftModal
