import React from 'react'
import { Helmet } from 'react-helmet-async'
import { couple } from '../data'

const DynamicTitle = () => {
  const coupleNames = couple.together
  const displayNames = `${couple.bride.firstName} & ${couple.groom.firstName}`
  const weddingDate = new Date(couple.wedding.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  const socialImageUrl = '/assets/images/prenup/thumbnail.png'
  const pageTitle = `${displayNames}'s Wedding`

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={`Wedding Invitation - ${coupleNames}'s Wedding on ${weddingDate}`} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={`Join us for ${coupleNames}'s special day on ${weddingDate}`} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={socialImageUrl} />
      <meta property="og:image:alt" content={`Photo of ${coupleNames}`} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={`Beautiful digital wedding invitation for ${weddingDate}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={socialImageUrl} />
      <meta name="twitter:image:alt" content={`Photo of ${coupleNames}`} />
    </Helmet>
  )
}

export default DynamicTitle
