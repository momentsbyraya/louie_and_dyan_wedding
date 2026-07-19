import React from 'react'
import EntourageListContent from './EntourageListContent'

/** Full bridal entourage list — inline page section (same content as the former modal). */
const Entourage = () => {
  return (
    <section
      id="entourage"
      data-section="entourage"
      className="relative w-full scroll-mt-24 overflow-hidden bg-white"
    >
      <EntourageListContent />
    </section>
  )
}

export default Entourage
