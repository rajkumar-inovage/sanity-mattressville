import React, { useState } from 'react'
import ReactHtmlParser from 'html-react-parser'
import ReCAPTCHA from 'react-google-recaptcha'

import GSIcon from '~/components/gs-icon'

const Main = ({ data: { pageTitle, infoBlocks } }) => {
  const subject = `Mattressville New contact request from Contact Us form`,
    [isSubmitting, updateSubmitting] = useState(false),
    [isVerified, setVerified] = useState(false),
    [responseColor, setResponseColor] = useState(''),
    [message, setMessage] = useState(null),
    [reCaptchaInstance, setReCaptchaInstance] = useState(null),
    reCaptchaReference = event => {
      setReCaptchaInstance(event)
    },
    resetReCaptcha = () => {
      setVerified(false)
      reCaptchaInstance.reset()
    },
    verifyCaptcha = value => {
      if (value && value.length > 0) {
        setResponseColor('')
        setMessage(null)
        setVerified(true)
      }
    },
    expiredCaptcha = () => {
      setResponseColor('warning')
      setMessage(
        <p>
          <strong>Verification Expired!&nbsp;</strong>Check the Checkbox Again.
        </p>
      )
      setVerified(false)
    },
    submitContactForm = async event => {
      event.preventDefault()
      if (isVerified) {
        try {
          const formData = new FormData(event.target)
          formData.delete('g-recaptcha-response')
          const formBody = new URLSearchParams(formData).toString()
          updateSubmitting(true)
          const submittedForm = await fetch('./', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: formBody,
          })
          if (submittedForm.ok) {
            setResponseColor('success')
            setMessage(<p>{'Email sent successfully.'}</p>)
          }
        } catch (error) {
          console.log(error.message)
        } finally {
          event.target.reset()
          resetReCaptcha()
          updateSubmitting(false)
        }
      } else {
        setResponseColor('warning')
        setMessage(
          <p>
            <strong>Verify!</strong> If you are not a bot.
          </p>
        )
      }
    }

  return (
    <div className={'product-main'}>
      <h1 className={'main-heading'}>{pageTitle}</h1>
      <div className={'info-blocks'}>
        {infoBlocks.map(({ icon, title, content }, index) => {
          return (
            <div className={'info-box'} key={index}>
              <div className={'info-icon'}>
                <GSIcon icon={icon} />
              </div>
              <div className={'info-data'}>
                <h4 className={'info-heading'}>{title}</h4>
                <div className={'info-content'}>{ReactHtmlParser(content)}</div>
              </div>
            </div>
          )
        })}
      </div>
      <div className={'contact-form'}>
        <form
          data-netlify={'true'}
          name={'contact-us'}
          method={'post'}
          onSubmit={submitContactForm}
        >
          <input type={'hidden'} name={'form-name'} value={'contact-us'} />
          <input type={'hidden'} name={'subject'} value={subject} />
          <div className={'form-group'}>
            <label className={'control-label'} htmlFor={'fname'}>
              Name*
            </label>
            <input
              type={'text'}
              id={'fname'}
              name={'fname'}
              size={'40'}
              className={'form-control'}
              required={true}
            />
          </div>
          <div className={'form-group'}>
            <label className={'control-label'} htmlFor={'email'}>
              Email*
            </label>
            <input
              type={'email'}
              name={'email'}
              id={'email'}
              size={'40'}
              className={'form-control'}
              required={true}
            />
          </div>
          <div className={'form-group'}>
            <label className={'control-label'} htmlFor={'phone'}>
              Phone
            </label>
            <input
              type={'text'}
              name={'phone'}
              id={'phone'}
              size={'40'}
              className={'form-control'}
            />
          </div>
          <div className={'form-group'}>
            <label htmlFor={'message'} className={'control-label'}>
              Your message*
            </label>
            <textarea
              name={'message'}
              id={'message'}
              cols={'40'}
              rows={'7'}
              className={'form-control'}
              required={true}
            />
          </div>
          <div className={'form-group'}>
            <ReCAPTCHA
              sitekey={'6LdqB4UbAAAAAOUb6IUrB99qCUvDJGH38JtqUgBC'}
              ref={e => reCaptchaReference(e)}
              onChange={verifyCaptcha}
              onExpired={expiredCaptcha}
            />
          </div>
          {message && (
            <div className={`alert alert-${responseColor} submit-response`}>
              {message}
            </div>
          )}
          <div className={'form-submit'}>
            <input
              type={'submit'}
              value={'Send Message'}
              className={'btn-submit'}
              disabled={isSubmitting}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Main
