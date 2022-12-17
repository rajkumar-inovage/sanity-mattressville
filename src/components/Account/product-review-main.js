import React from 'react'
import Star from '~/components/icons/star'

const ProductReviewMain = () => {
  return (
    <div className={'account-main'}>
      <div className={'entry-header'}>
        <h1 className={'main-heading'}>Product Reviews</h1>
      </div>
      <div className={'product-review-details'}>
        <div className={'review-1'}>
          <div className={'review-information'}>
            <h5>Best Customer Support</h5>
            <p>
              The sales person Andrew was excellent. He knew his products well
              and helped us choosing what we needed. The delivery service was
              smooth as well. Was overall a great experience.
            </p>
            <div className={'link'}>
              <button type={'button'}>Delete</button>
            </div>
          </div>

          <div className={'rating'}>
            <Star className={'star'} width={24} height={24} />
            <Star className={'star'} width={24} height={24} />
            <Star className={'star'} width={24} height={24} />
            <Star className={'star'} width={24} height={24} />
            <Star className={'star'} width={24} height={24} />
            <p>02 Apr 2021</p>
          </div>
        </div>

        <div className={'review-2'}>
          <div className={'review-information'}>
            <h5>Best Customer Support</h5>
            <p>
              The sales person Andrew was excellent. He knew his products well
              and helped us choosing what we needed. The delivery service was
              smooth as well. Was overall a great experience.
            </p>
            <div className={'link'}>
              <button type={'button'}>Delete</button>
            </div>
          </div>

          <div className={'rating'}>
            <Star className={'star'} width={24} height={24} />
            <Star className={'star'} width={24} height={24} />
            <Star className={'star'} width={24} height={24} />
            <Star className={'star'} width={24} height={24} />
            <Star className={'star'} width={24} height={24} />
            <p>02 Apr 2021</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductReviewMain
