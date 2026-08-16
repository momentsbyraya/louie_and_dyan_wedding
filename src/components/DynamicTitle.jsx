import React from 'react'
import { Helmet } from 'react-helmet-async'
import { couple } from '../data'
import { parseCalendarDate } from '../utils/countdown'

const DynamicTitle = () => {
  const coupleNames = couple.together
  const displayNames = `${couple.bride.firstName} & ${couple.groom.firstName}`
  const weddingDate = parseCalendarDate(couple.wedding.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  const pageTitle = `${displayNames}'s Wedding`
  const siteUrl = 'https://louie-and-dyan-wedding.vercel.app'
  const ogImage = `${siteUrl}/assets/images/og-thumbnail.jpg?v=2`

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={`Wedding Invitation - ${coupleNames}'s Wedding on ${weddingDate}`} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={`Join us for ${coupleNames}'s special day on ${weddingDate}`} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={`Beautiful digital wedding invitation for ${weddingDate}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={ogImage} />
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="icon" type="image/png" href="/assets/images/favicon-32.png" sizes="32x32" />
      <link rel="apple-touch-icon" href="/assets/images/apple-touch-icon.png" />
    </Helmet>
  )
}

export default DynamicTitle
