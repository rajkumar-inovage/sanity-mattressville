import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

const SEO = ({
  description,
  lang,
  meta,
  title,
  ogImage,
  ogPath = '',
  schemaMarkup,
  preloadImageURL,
  keywords,
  titleAfter = false,
  titleOnly = false,
}) => {
  const {
      site: { siteInfo },
    } = useStaticQuery(
      graphql`
        query {
          site {
            siteInfo: siteMetadata {
              title
              description
              siteUrl
            }
          }
        }
      `
    ),
    titleValue = `${
      title
        ? titleOnly
          ? title
          : titleAfter
          ? `${siteInfo.title} | ${title}`
          : `${title} | ${siteInfo.title}`
        : siteInfo.title
    }`

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={titleValue}
      meta={[
        ...(description
          ? [
              {
                name: `description`,
                content: description,
              },
            ]
          : []),
        ...(keywords
          ? [
              {
                name: 'keywords',
                content: keywords.join(', ').trim(),
              },
            ]
          : []),
        {
          property: `og:title`,
          content: titleValue,
        },
        {
          property: `og:url`,
          content: `${siteInfo.siteUrl}${ogPath}`,
        },
        {
          property: `og:image`,
          content: ogImage
            ? ogImage.includes('http')
              ? ogImage
              : `${siteInfo.siteUrl}${ogImage}`
            : `${siteInfo.siteUrl}/og-image.jpg`,
        },
        ...(description
          ? [
              {
                property: `og:description`,
                content: description,
              },
            ]
          : []),
        {
          property: `og:locale`,
          content: `en_CA`,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:creator`,
          content: siteInfo.title,
        },
        {
          name: `twitter:image`,
          content: ogImage
            ? ogImage.includes('http')
              ? ogImage
              : `${siteInfo.siteUrl}${ogImage}`
            : `${siteInfo.siteUrl}/og-image.jpg`,
        },
        {
          name: `twitter:image:alt`,
          content: 'ogImage',
        },
        {
          name: `twitter:site`,
          content: `${siteInfo.siteUrl}${ogPath}`,
        },
        {
          name: `twitter:title`,
          content: titleValue,
        },
        ...(description
          ? [
              {
                name: `twitter:description`,
                content: description,
              },
            ]
          : []),
      ].concat(meta)}
    >
      <link rel="canonical" href={`${siteInfo.siteUrl}${ogPath}`} />
      {preloadImageURL && (
        <link rel={'preload'} as={'image'} href={preloadImageURL} />
      )}
      {schemaMarkup && (
        <script type={'application/ld+json'}>
          {JSON.stringify(schemaMarkup)}
        </script>
      )}
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `en-CA`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
  ogImage: PropTypes.string,
  schemaMarkup: PropTypes.object,
  preloadImageURL: PropTypes.string,
}

export default SEO
