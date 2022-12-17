import React from 'react'
import { Link } from 'gatsby'

import BlogPageData from '~/components/constants/pages/blog-page-data'
import GSIcon from '~/components/gs-icon'
import ArrRight from '~/components/icons/arr-right'
import FormatDate from '~/components/functions/format-date'

const Card = ({
  data: {
    authorV2: { name },
    blog: { handle: blogHandle },
    content,
    handle: articleHandle,
    image,
    publishedAt,
    title,
  },
}) => {
  const articleDate = new Date(publishedAt)
  const blogPageData = BlogPageData(),
    { iconData } = blogPageData

  return (
    <div className={'blog-card'}>
      <div className={'inner-card'}>
        <Link to={`/blog/${articleHandle}/`}>
          <img
            className={'blog-image'}
            alt={image.altText}
            src={image.url}
            loading={'lazy'}
            height={150}
            width={426}
          />
        </Link>
      </div>
      <h2 className={'card-heading'}>{title}</h2>
      <div className={'card-data'}>
        <p>
          Posted by <strong>{name}</strong>
        </p>
        <p>{FormatDate(articleDate, 'MMM dd, yyyy')}</p>
      </div>
      <p className={'card-para'}>{content}</p>
      <div className={'social-media-icon'}>
        <Link className={'btn-read-more'} to={`/blog/${articleHandle}/`}>
          <span className={'btn-label'}>READ MORE</span>
          <ArrRight width={24} height={11} stroke={'#ffffff'} />
        </Link>
        <li className={'social-media'}>
          {iconData.socialMedia.map(({ link, icon }, index) => (
            <a
              href={link}
              target={'_blank'}
              rel={'noreferrer nofollow'}
              key={index}
            >
              <GSIcon icon={icon} />
            </a>
          ))}
        </li>
      </div>
    </div>
  )
}

export default Card
