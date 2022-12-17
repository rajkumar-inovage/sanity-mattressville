import React, { Fragment, useState } from 'react'
import { Link, navigate } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

import GSIcon from '~/components/gs-icon'
import Bed from '~/components/icons/bed'
import ArrLeft from '~/components/icons/arr-left'
import ArrRight from '~/components/icons/arr-right'

const DesktopTool = ({ toolTitle, subTitle, subDesc, quiz }) => {
  const [activeStep, setActiveStep] = useState(1),
    [query, setQuery] = useState([]),
    selectOption = ({ target }, stepOptionsSelector) => {
      const aSO = document.querySelector(`.${stepOptionsSelector}.active`)
      aSO && aSO.classList.remove('active')
      target.classList.add('active')
      target.value !== '' && setQuery(oldArray => [...oldArray, target.value])
    },
    generateQuery = () => {
      const allSelectedOptions = document.querySelectorAll(
        `.btn-quiz-option.active`
      )
      if (allSelectedOptions.length < 4) {
        alert('Please select all options')
        return false
      }
      document.querySelector(`.bar`).classList.add('finished')
      navigate(`/mattress-matchmaker/results?tags=${query}`)
    }

  return (
    <Fragment>
      <div className={'left-area'}>
        <div className={'left-inner'}>
          <div className={'bread-crumb'}>
            <Link className={'home'} to={'/'}>
              Home
            </Link>
            <GSIcon icon={'gs-chevron-right'} />
            <span>{toolTitle}</span>
          </div>
          <h1 className={'tool-title'}>{toolTitle}</h1>
          <div className={'tool-area'}>
            <div className={'sub-title-block'}>
              <h4 className={'tool-sub-title'}>{subTitle}</h4>
              <p className={'tool-sub-desc'}>{subDesc}</p>
            </div>
            <div className={'bed-icon-block'}>
              <div className={'icon-wrap mt-4 mt-lg-0'}>
                <Bed width={232} height={226} />
              </div>
            </div>
          </div>
          <div className={'progress-wrapper'}>
            <div className={'steps'}>
              {Array(4)
                .fill()
                .map((_, i) => (
                  <span
                    key={i}
                    className={`step${i + 1 <= activeStep ? ' active' : ''}`}
                    id={`step-${i + 1}`}
                  >
                    {i + 1}
                  </span>
                ))}
              <div className={`bar progress-${activeStep}`} />
            </div>
          </div>
        </div>
      </div>
      <div className={'right-area'}>
        <div className={'right-inner'}>
          <div className={'quiz-box'}>
            {quiz.map(({ question, layout, optionLayout, options }, index) => {
              return (
                <div
                  key={index}
                  id={`question-${index + 1}`}
                  className={`question-blok${
                    activeStep === index + 1 ? ' active' : ''
                  }`}
                >
                  <div className={'question'}>
                    <h3>{question}</h3>
                  </div>
                  <div className={`options-wrapper`}>
                    <div className={`${layout}`}>
                      {options.map(
                        (
                          { image, label, desc, tagValue, alt },
                          optionIndex
                        ) => {
                          let buttonContent
                          switch (optionLayout) {
                            case 1:
                              buttonContent = (
                                <Fragment>
                                  <GatsbyImage
                                    className={'image'}
                                    image={
                                      image.childImageSharp.gatsbyImageData
                                    }
                                    alt={alt}
                                  />
                                  <strong className={'label'}>{label}</strong>
                                </Fragment>
                              )
                              break
                            case 2:
                              buttonContent = (
                                <Fragment>
                                  <strong className={'label'}>{label}</strong>
                                  <GatsbyImage
                                    className={'image'}
                                    image={
                                      image.childImageSharp.gatsbyImageData
                                    }
                                    alt={`q${index}_o${optionIndex}`}
                                  />
                                  <span className={'desc'}>{desc}</span>
                                </Fragment>
                              )
                              break
                            case 3:
                              buttonContent = (
                                <Fragment>
                                  <div className={'flex-shrink-1'}>
                                    <GatsbyImage
                                      className={'image'}
                                      image={
                                        image.childImageSharp.gatsbyImageData
                                      }
                                      alt={`q${index}_o${optionIndex}`}
                                    />
                                  </div>
                                  <div className={'flex-grow-1'}>
                                    <strong className={'label'}>{label}</strong>
                                    <span className={'desc'}>{desc}</span>
                                  </div>
                                </Fragment>
                              )
                              break
                            default:
                              buttonContent = null
                          }
                          return (
                            <button
                              key={optionIndex}
                              type={'button'}
                              className={`btn-quiz-option ${layout}-${optionLayout}`}
                              value={tagValue}
                              onClick={event =>
                                selectOption(event, `${layout}-${optionLayout}`)
                              }
                            >
                              {buttonContent}
                            </button>
                          )
                        }
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className={'quiz-navigation'}>
            <button
              type="button"
              className={'btn-navigate prev'}
              disabled={activeStep === 1}
              onClick={() => {
                activeStep > 1 && setActiveStep(activeStep - 1)
              }}
            >
              <ArrLeft
                width={24}
                height={11}
                stroke={activeStep === 1 ? '#535353' : '#ffffff'}
              />
              <span className={'label'}>PREV</span>
            </button>
            <button
              type="button"
              className={'btn-navigate next'}
              onClick={() => {
                activeStep < 4 && setActiveStep(activeStep + 1)
                activeStep === 4 && generateQuery()
              }}
            >
              <span className={'label'}>NEXT</span>
              <ArrRight width={24} height={11} stroke={'#ffffff'} />
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default DesktopTool
