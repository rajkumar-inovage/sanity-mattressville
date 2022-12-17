import React, { useEffect, useRef, useState } from 'react'
import { Container } from 'react-bootstrap'
import addToMailchimp from 'gatsby-plugin-mailchimp'
import ReactHtmlParser from 'html-react-parser'

import ArrRight from '~/components/icons/arr-right'
import useOnScreen from '~/components/functions/useOnScreen'

const Offer = ({ data }) => {
  const {
      title,
      subscribeText,
      discount,
      placeholder,
      placeholderFname,
      placeholderLname,
      btnText,
    } = data,
    [sending, setSending] = useState(false),
    [email, setEmail] = useState(''),
    [firstName, setFirstName] = useState(''),
    [lastName, setLastName] = useState(''),
    [response, setResponse] = useState(null),
    [loadedOnce, setLoadedOnce] = useState(false),
    sectionRef = useRef(),
    visible = useOnScreen(sectionRef, '100px'),
    handleSubmit = async e => {
      e.preventDefault()
      setSending(true)
      const response = await addToMailchimp(email, {
        FNAME: firstName,
        LNAME: lastName,
      })
      if (response.result === 'error') {
        if (response.msg.includes('already')) {
          response.msg = `${email} is already subscribed.`
        }
        setResponse(response)
        setSending(false)
      } else {
        response.msg =
          'Thank you for subscribing, use coupon code <strong>subscribe10</strong> in checkout to save 10% A copy of this will be sent to you via email.'
        setResponse(response)
        setEmail('')
        setFirstName('')
        setLastName('')
        setSending(false)
      }
    }

  useEffect(() => {
    !loadedOnce && setLoadedOnce(visible)
  }, [loadedOnce, visible])

  return (
    <section ref={sectionRef} className={'offer'}>
      {(visible || loadedOnce) && (
        <Container fluid={true}>
          <div className={'offer-grid'}>
            <div className={'offer-content text-center text-md-left'}>
              <div className={'d-block d-md-flex justify-content-between'}>
                <div className={'left'}>
                  <h3>{title}</h3>
                  <p
                    className={
                      response !== null && response.result !== 'error'
                        ? 'text-success'
                        : response?.result === 'error'
                        ? 'text-danger'
                        : ''
                    }
                  >
                    {ReactHtmlParser(response ? response.msg : subscribeText)}
                  </p>
                </div>
                <div className={'right'}>
                  <strong>{discount}</strong>
                </div>
              </div>
              <div className={'subscribe-form'}>
                <form className={'h-100'} onSubmit={handleSubmit}>
                  <div className="mx-0 row d-block d-md-flex justify-content-between w-100 row-form border-rounded">
                    <div
                      className={
                        'input-control col-12 col-md-6 h-100 px-0 px-md-2 mb-3 mb-md-0 col-left'
                      }
                    >
                      <input
                        type={'text'}
                        name={'FNAME'}
                        placeholder={placeholderFname}
                        value={firstName}
                        disabled={
                          response !== null && response.result !== 'error'
                        }
                        onChange={({ target: { value } }) =>
                          setFirstName(value)
                        }
                      />
                    </div>
                    <div
                      className={
                        'input-control col-12 col-md-6 h-100 px-0 px-md-2 mb-3 mb-md-0 col-right'
                      }
                    >
                      <input
                        type={'text'}
                        name={'LNAME'}
                        placeholder={placeholderLname}
                        value={lastName}
                        disabled={
                          response !== null && response.result !== 'error'
                        }
                        onChange={({ target: { value } }) => setLastName(value)}
                      />
                    </div>
                  </div>
                  <div className="d-block d-md-flex justify-content-between w-100 row-form">
                    <div className={'input-control h-100'}>
                      <input
                        type={'email'}
                        name={'text'}
                        placeholder={placeholder}
                        value={email}
                        disabled={
                          response !== null && response.result !== 'error'
                        }
                        onChange={({ target: { value } }) => setEmail(value)}
                      />
                    </div>
                    <button
                      aria-label={btnText}
                      type={'submit'}
                      className={'btn btn-default h-100'}
                      disabled={sending}
                    >
                      <div className={'d-flex justify-content-between'}>
                        <strong className={'my-auto'}>{btnText}</strong>
                        <ArrRight
                          className={'my-auto'}
                          width={26}
                          height={13}
                          stroke={'#ffffff'}
                        />
                      </div>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Container>
      )}
    </section>
  )
}

export default Offer
