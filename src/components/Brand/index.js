import React from 'react'

import BrandsData from '~/components/constants/brands-data'
import BeautyRest from '../icons/beautyrest'
import SertaIcomfort from '../icons/serta-icomfort'
import BeautyrestBlack from '../icons/beautyrest-black'
import BeautyrestPlatinum from '../icons/beautyrest-platinum'
import Beaudoin from '../icons/beaudoin'

const Brands = ({ productVendor }) => {
  const {
    mattressVille,
    brandSealy,
    beautyrestHarmony,
    kingsDown,
    BeautyrestHarmonyLux,
    EcoComfort,
    GalaxyBedding,
    Rosemount,
    stearnsNFoster,
    tempur,
    Titus,
    natura,
    serta,
  } = BrandsData()
  switch (productVendor) {
    case 'Beaudoin':
      return <Beaudoin width={160} height={29} />
    case 'Beautyrest':
      return <BeautyRest width={150} height={50} />
    case 'Beautyrest Black':
      return <BeautyrestBlack width={70} height={44} />
    case 'Beautyrest By SIMMONS':
    case 'Beautyrest Harmony':
      return (
        <img
          loading={'lazy'}
          src={
            beautyrestHarmony.childImageSharp.gatsbyImageData.images.fallback
              .src
          }
          alt={'beautyrestHarmony'}
          height={beautyrestHarmony.childImageSharp.gatsbyImageData.height}
          width={beautyrestHarmony.childImageSharp.gatsbyImageData.width}
        />
      )
    case 'Beautyrest Harmony Lux':
      return (
        <img
          loading={'lazy'}
          src={
            BeautyrestHarmonyLux.childImageSharp.gatsbyImageData.images.fallback
              .src
          }
          alt={'beautyrestHarmony'}
          height={BeautyrestHarmonyLux.childImageSharp.gatsbyImageData.height}
          width={BeautyrestHarmonyLux.childImageSharp.gatsbyImageData.width}
        />
      )
    case 'Beautyrest Platinum':
      return <BeautyrestPlatinum width={70} height={30} />
    case 'EcoComfort':
      return (
        <img
          loading={'lazy'}
          src={EcoComfort.childImageSharp.gatsbyImageData.images.fallback.src}
          alt={'EcoComfort'}
          height={EcoComfort.childImageSharp.gatsbyImageData.height}
          width={EcoComfort.childImageSharp.gatsbyImageData.width}
        />
      )
    case 'Galaxy Bedding':
      return (
        <img
          loading={'lazy'}
          src={
            GalaxyBedding.childImageSharp.gatsbyImageData.images.fallback.src
          }
          alt={'Galaxy Bedding'}
          height={GalaxyBedding.childImageSharp.gatsbyImageData.height}
          width={GalaxyBedding.childImageSharp.gatsbyImageData.width}
        />
      )
    case 'Kingsdown':
      return (
        <img
          loading={'lazy'}
          src={kingsDown.childImageSharp.gatsbyImageData.images.fallback.src}
          alt={'Kingsdown'}
          height={kingsDown.childImageSharp.gatsbyImageData.height}
          width={kingsDown.childImageSharp.gatsbyImageData.width}
        />
      )
    case 'Mattressville':
      return (
        <img
          loading={'lazy'}
          src={
            mattressVille.childImageSharp.gatsbyImageData.images.fallback.src
          }
          alt={'mattressville'}
          height={mattressVille.childImageSharp.gatsbyImageData.height}
          width={mattressVille.childImageSharp.gatsbyImageData.width}
        />
      )
    case 'Rosemount':
      return (
        <img
          loading={'lazy'}
          src={Rosemount.childImageSharp.gatsbyImageData.images.fallback.src}
          alt={'Rosemount'}
          height={Rosemount.childImageSharp.gatsbyImageData.height}
          width={Rosemount.childImageSharp.gatsbyImageData.width}
        />
      )
    case 'Sealy':
      return (
        <img
          loading={'lazy'}
          src={brandSealy.childImageSharp.gatsbyImageData.images.fallback.src}
          alt={'Sealy'}
          height={brandSealy.childImageSharp.gatsbyImageData.height}
          width={brandSealy.childImageSharp.gatsbyImageData.width}
        />
      )
    case 'Stearns & Foster':
      return (
        <img
          loading={'lazy'}
          src={
            stearnsNFoster.childImageSharp.gatsbyImageData.images.fallback.src
          }
          alt={'Stearns & Foster'}
          height={stearnsNFoster.childImageSharp.gatsbyImageData.height}
          width={stearnsNFoster.childImageSharp.gatsbyImageData.width}
        />
      )
    case 'Tempur-Pedic':
      return (
        <img
          loading={'lazy'}
          src={tempur.childImageSharp.gatsbyImageData.images.fallback.src}
          alt={'Tempur-Pedic'}
          height={tempur.childImageSharp.gatsbyImageData.height}
          width={tempur.childImageSharp.gatsbyImageData.width}
        />
      )
    case 'Titus':
      return (
        <img
          loading={'lazy'}
          src={Titus.childImageSharp.gatsbyImageData.images.fallback.src}
          alt={'Titus'}
          height={Titus.childImageSharp.gatsbyImageData.height}
          width={Titus.childImageSharp.gatsbyImageData.width}
        />
      )
    case 'Natura':
      return (
        <img
          loading={'lazy'}
          src={natura.childImageSharp.gatsbyImageData.images.fallback.src}
          alt={'Natura'}
          height={natura.childImageSharp.gatsbyImageData.height}
          width={natura.childImageSharp.gatsbyImageData.width}
        />
      )
    case 'Serta':
      return (
        <img
          loading={'lazy'}
          src={serta.childImageSharp.gatsbyImageData.images.fallback.src}
          alt={'Serta'}
          height={serta.childImageSharp.gatsbyImageData.height}
          width={serta.childImageSharp.gatsbyImageData.width}
        />
      )
    case 'Serta iComfort':
      return <SertaIcomfort width={160} height={35} />
    default:
      return (
        <img
          loading={'lazy'}
          src={
            mattressVille.childImageSharp.gatsbyImageData.images.fallback.src
          }
          alt={'Mattressville'}
          height={mattressVille.childImageSharp.gatsbyImageData.height}
          width={mattressVille.childImageSharp.gatsbyImageData.width}
        />
      )
  }
}

export default Brands
