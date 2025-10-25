import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import { Gift, X, Building, CreditCard, Smartphone } from 'lucide-react'
import { themeConfig } from '../config/themeConfig'
import { paymentMethods as paymentMethodsData } from '../data'

const GiftRegistry = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { paymentMethods } = paymentMethodsData

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <>
      {/* Gift Registry Section */}
      <section className={`relative py-20 w-full overflow-hidden ${themeConfig.paragraph.background}`}>
        
        {/* Content */}
        <div className="relative z-20 flex items-center justify-center">
          <div className="max-w-md sm:max-w-xl lg:max-w-3xl w-full mx-auto px-8 sm:px-12 lg:px-16">
            {/* Header Section */}
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-leckerli font-light text-gray-900/70 mb-8">
                Loved Ones,
              </h2>
            </div>

            {/* Text Section */}
            <div className="text-center mb-12">
              <p className="text-lg sm:text-xl font-albert font-thin text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Your presence is our present, but if you'd like to give a gift, 
                we've made it easy with digital payment options.
              </p>
            </div>

            {/* Send Gift Button */}
            <div className="text-center">
              <button
                onClick={openModal}
                className="w-full inline-flex items-center justify-center space-x-3 px-8 py-3 sm:py-5 lg:py-2 text-white rounded-sm transition-colors duration-200 text-sm sm:text-2xl lg:text-base font-medium shadow-lg hover:shadow-xl"
                style={{ backgroundColor: '#6e766d' }}
              >
                <span>Send a Gift</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
          />
          
                  {/* Modal Content */}
                  <div className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                    {/* Header - Sticky */}
                    <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-6 border-b border-gray-200 rounded-t-2xl">
                      <h3 className="text-2xl sm:text-3xl font-script text-gray-800">Payment Options</h3>
                      <button
                        onClick={closeModal}
                        className="text-gray-500 hover:text-gray-800 transition-colors duration-200"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>

            {/* Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {paymentMethods.map((method, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6 text-center border border-gray-200">
                    <div className="flex items-center justify-center mb-4">
                      <div className={`w-12 h-12 ${themeConfig.backgrounds.theme} rounded-full flex items-center justify-center text-gray-800`}>
                        {method.icon === 'Building' && <Building className="w-6 h-6" />}
                        {method.icon === 'CreditCard' && <CreditCard className="w-6 h-6" />}
                        {method.icon === 'Smartphone' && <Smartphone className="w-6 h-6" />}
                      </div>
                    </div>
                    
                    <h4 className="text-lg sm:text-xl font-medium text-gray-800 mb-4">{method.name}</h4>
                    
                    {/* QR Code Placeholder */}
                    <div className="w-32 h-32 bg-gray-300 rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <span className="text-sm text-gray-600">QR Code</span>
                    </div>
                    
                    {/* Account Information */}
                    <div className="text-left space-y-2 text-sm sm:text-base text-gray-700">
                      {method.accountInfo.bank && (
                        <p><span className="font-medium">Bank:</span> {method.accountInfo.bank}</p>
                      )}
                      {method.accountInfo.provider && (
                        <p><span className="font-medium">Provider:</span> {method.accountInfo.provider}</p>
                      )}
                      <p><span className="font-medium">Account:</span> {method.accountInfo.accountNumber}</p>
                      <p><span className="font-medium">Name:</span> {method.accountInfo.accountName}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-sm sm:text-base text-gray-600">
                  Scan the QR code with your banking app or use the account details above for manual transfer.
                </p>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}

export default GiftRegistry 