import React, { Fragment, useCallback, useEffect, useState } from 'react'
import atob from 'atob'
import { Alert } from 'react-bootstrap'

import GSIcon from '~/components/gs-icon'

const ProductReviews = ({ product }) => {
  const shopName = 'mattress-ville.myshopify.com',
    productID = parseInt(atob(product.id).split('/').pop()),
    productHandle = product.handle,
    productTitle = product.title,
    productImg = product.images.edges.length
      ? product.images.edges[0].node.url
      : '',
    reviewsPerPage = 5,
    dismissResponse = () => {
      setResponseVisible(false)
      setResponseContent(false)
    },
    dismissErrorResponse = () => {
      setResponseErrorVisible(false)
      setResponseContent(false)
    },
    response = (
      <Alert
        show={responseVisible}
        onClose={dismissResponse}
        variant={responseColor}
      >
        {responseContent}
      </Alert>
    ),
    response_Error = (
      <Alert
        className="rounded-0"
        show={responseErrorVisible}
        onClose={dismissErrorResponse}
        variant={responseColor}
      >
        {responseContent}
      </Alert>
    ),
    [shopID, setShopID] = useState(null),
    [avgRating, setAvgRating] = useState(0),
    [ratingData, setRatingData] = useState([]),
    [productRating, setProductRating] = useState(0),
    [totalRating, setTotalRating] = useState(0),
    [responseColor, setResponseColor] = useState(''),
    [responseContent, setResponseContent] = useState(false),
    [responseVisible, setResponseVisible] = useState(false),
    [responseErrorVisible, setResponseErrorVisible] = useState(false),
    [showReviews, setShowReviews] = useState(reviewsPerPage),
    getDate = date => {
      const Months =
          'January_February_March_April_May_June_July_August_September_October_November_December'.split(
            '_'
          ),
        msec = Date.parse(date),
        d = new Date(msec),
        month = Months[d.getMonth()],
        day = d.getDate(),
        year = d.getFullYear()
      return `${month} ${day}, ${year}`
    },
    mouseOverRating = (event, selectedButton) => {
      event.preventDefault()
      const buttons = document.querySelectorAll('.rating-starts button')
      for (let i = 0; i <= selectedButton; i++) {
        buttons[i].firstChild.classList.remove('fa-star-o')
        buttons[i].firstChild.classList.add('fa-star')
      }
    },
    mouseLeaveRating = (event, selectedButton) => {
      event.preventDefault()
      if (productRating === 0) {
        const buttons = document.querySelectorAll('.rating-starts button')
        for (let i = 0; i <= selectedButton; i++) {
          buttons[i].firstChild.classList.remove('fa-star')
          buttons[i].firstChild.classList.add('fa-star-o')
        }
      }
    },
    changeRating = (event, selectedButton) => {
      event.preventDefault()
      const spans = document.querySelectorAll('.rating-starts button span')
      spans.forEach(span => {
        span.classList.remove('fa-star')
        span.classList.add('fa-star-o')
      })
      const buttons = document.querySelectorAll('.rating-starts button')
      for (let i = 0; i <= selectedButton; i++) {
        buttons[i].firstChild.classList.remove('fa-star-o')
        buttons[i].firstChild.classList.add('fa-star')
      }
      setProductRating(selectedButton + 1)
    },
    fetchAllRating = useCallback(async URL => {
      const res = await fetch(URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      res
        .json()
        .then(responseJson => {
          const allRating = responseJson.data
          let sum = 0
          allRating.forEach(function (v) {
            sum += v.rating
          })
          setTotalRating(allRating.length)
          setAvgRating((sum / allRating.length).toFixed(2))
          setRatingData(allRating)
        })
        .catch(error => {
          console.error(error)
        })
    }, []),
    fetchShopID = useCallback(
      async URL => {
        const res = await fetch(URL)
        res
          .json()
          .then(responseJson => {
            setShopID(responseJson.data.shopify_id)
            // fetchAllRating(
            //   `//reviews.hulkapps.com/api/shop/${responseJson.data.shopify_id}/reviews/all?product_id=${productID}`
            // )
          })
          .catch(error => {
            console.error(error)
          })
      },
      [productID, fetchAllRating]
    ),
    submitReview = event => {
      event.preventDefault()
      const reviewForm = event.target
      const elements = event.target.elements
      const data = {
        author: elements.author.value,
        email: elements.email.value,
        rating: parseInt(elements.rating.value),
        title: elements.title.value,
        body: elements.body.value,
        shopify_id: elements.shopify_id.value,
        product_id: parseInt(elements.product_id.value),
        product_handle: elements.product_handle.value,
        product_title: elements.product_title.value,
        product_image: elements.product_image.value,
      }
      const sendReview = async URL => {
        return await fetch(URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-requested-with': 'XMLHttpRequest',
          },
          body: JSON.stringify(data),
        })
          .then(response => {
            if (response.status === 200) {
              response.json().then(responseJson => {
                setResponseVisible(true)
                setResponseColor('success')
                setResponseContent(
                  <div>
                    {responseJson.message}
                    <strong>&nbsp;successfully</strong>.
                  </div>
                )
                reviewForm.reset()
                setProductRating(0)
                const spans = document.querySelectorAll(
                  '.rating-starts button span'
                )
                spans.forEach(span => {
                  span.classList.remove('fa-star')
                  span.classList.add('fa-star-o')
                })
              })
            } else if (response.status === 422) {
              response.json().then(responseJson => {
                setResponseErrorVisible(true)
                setResponseColor('warning')
                setResponseContent(
                  <Fragment>
                    <strong> {responseJson.message}</strong>{' '}
                    <ul className="mb-0 pl-4">
                      {' '}
                      {Object.keys(responseJson.errors).map(error => (
                        <li key={error}>{responseJson.errors[error][0]}</li>
                      ))}{' '}
                    </ul>
                  </Fragment>
                )
              })
            }
          })
          .catch(error => {
            console.error(error)
          })
      }
      sendReview(`//reviews.hulkapps.com/api/shop/${shopID}/reviews`)
    }

  useEffect(() => {
    // fetchShopID(`//reviews.hulkapps.com/api/shop?shopify_domain=${shopName}`)
  }, [fetchShopID])

  return (
    <form onSubmit={e => submitReview(e)}>
      <h3 className="">Write a Review</h3>
      <div className="form-row">
        <div className="col-12 form-group">
          {response}
          {response_Error}
        </div>
      </div>
      <div className="form-row">
        <div className="col-12 form-group">
          <label className="" htmlFor="author">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            name="author"
            id="author"
            aria-label="Name"
            placeholder="Enter your name"
            required={true}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="col-12 form-group">
          <label className="" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            id="email"
            aria-label="Email"
            placeholder="john.smith@example.com"
            required={true}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="col-12 form-group">
          <label className="" htmlFor="rating">
            Rating:&nbsp;{productRating}&nbsp;
          </label>
          <div className="rating-starts d-inline">
            {[...Array(5)].map((elem, i) => (
              <button
                key={i}
                className="p-0 border-0 bg-transparent p-0 border-0 bg-transparent outline-none"
                onMouseOver={e => mouseOverRating(e, i)}
                onFocus={e => mouseOverRating(e, i)}
                onMouseLeave={e => mouseLeaveRating(e, i)}
                onBlur={e => mouseLeaveRating(e, i)}
                onClick={e => changeRating(e, i)}
              >
                <GSIcon icon="gs-star" style={{ color: '#F5CA59' }} />
              </button>
            ))}
          </div>
          <input
            type="hidden"
            name="rating"
            aria-label="Rating"
            value={productRating}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="col-12 form-group">
          <label className="" htmlFor="title">
            Review Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-label="Review Title"
            placeholder="Give your review a title"
            required={true}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="col-sm-12 form-group">
          <label className="" htmlFor="body">
            Body of Review
          </label>
          <textarea
            className="form-control"
            name="body"
            id="body"
            placeholder="Write your comments here"
            rows="10"
            aria-label="Body of Review"
            required={true}
          ></textarea>
        </div>
      </div>
      <div className="form-row">
        <div className="col-sm-12">
          <input
            type="hidden"
            name="shopify_id"
            aria-label="shopify_id"
            value={shopID ? shopID : ''}
          />
          <input
            type="hidden"
            name="product_id"
            aria-label="product_id"
            value={productID}
          />
          <input
            type="hidden"
            name="product_handle"
            aria-label="product_handle"
            value={productHandle}
          />
          <input
            type="hidden"
            name="product_title"
            aria-label="product_title"
            value={productTitle}
          />
          <input
            type="hidden"
            name="product_image"
            aria-label="product_image"
            value={productImg}
          />
          <button type="submit" aria-label={'Submit Review'}>
            SUBMIT REVIEW
          </button>
        </div>
      </div>
    </form>
  )
}
export default ProductReviews
