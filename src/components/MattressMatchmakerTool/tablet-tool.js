import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { navigate } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

import Bed from '~/components/icons/bed'
import ArrLeft from '~/components/icons/arr-left'
import ArrRight from '~/components/icons/arr-right'

const TabletTool = ({ toolTitle, subTitle, subDesc, quiz }) => {
  const [activeStep, setActiveStep] = useState(1),
    [query, setQuery] = useState([]),
    startQuiz = () => {
      document.querySelector(`.left-area`).classList.add('quiz-started')
      document.querySelector(`.right-area`).classList.add('start')
    },
    selectOption = ({ target }, stepOptionsSelector) => {
      const aSO = document.querySelector(`.${stepOptionsSelector}.active`)
      document.querySelector(`.right-inner`).scrollTop = 0

      aSO && aSO.classList.remove('active')
      target.classList.add('active')
      target.value !== '' && setQuery(oldArray => [...oldArray, target.value])

      activeStep < 4 && setActiveStep(activeStep + 1)
    },
    generateQuery = useCallback(() => {
      const allSelectedOptions = document.querySelectorAll(
        `.btn-quiz-option.active`
      )
      if (allSelectedOptions.length < 4) {
        alert('Please select all options')
        return false
      }
      document.querySelector(`.bar`).classList.add('finished')
      navigate(`/mattress-matchmaker/results?tags=${encodeURIComponent(query)}`)
    }, [query])

  useEffect(() => {
    activeStep === 4 && query.length === 4 && generateQuery()
  }, [query, activeStep, generateQuery])

  return (
    <Fragment>
      <div className={'left-area'}>
        <div className={'left-inner'}>
          <div className={'titles-block'}>
            <h1 className={'tool-title'}>{toolTitle}</h1>
            <div className={'sub-title-block'}>
              <h4 className={'tool-sub-title'}>{subTitle}</h4>
              <div className={'tool-sub-desc'}>
                <p>{subDesc}</p>
              </div>
            </div>
          </div>
          <div className={'tool-area'}>
            <div className={'bed-icon-block'}>
              <div className={'icon-wrap mt-4 mt-lg-0'}>
                <Bed width={232} height={226} />
              </div>
            </div>
          </div>
          <button
            type={'button'}
            className={'btn-start-quiz'}
            onClick={() => startQuiz()}
          >
            <span>START QUIZ</span>
            <ArrRight
              className={'my-auto'}
              width={26}
              height={13}
              stroke={'#ffffff'}
            />
          </button>
        </div>
      </div>
      <div className={'right-area'}>
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
            <div className={'progress-box'}>
              <div className={`bar progress-${activeStep}`} />
            </div>
          </div>
        </div>
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
                              onClick={event => {
                                selectOption(event, `${layout}-${optionLayout}`)
                              }}
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
        </div>
        <button
          type={'button'}
          onClick={() => {
            activeStep > 1 && setActiveStep(activeStep - 1)
          }}
          className={'btn-previous'}
        >
          <ArrLeft width={26} height={13} stroke={'#ffffff'} />
          <span>PREVIOUS</span>
        </button>
      </div>
    </Fragment>
  )
}

export default TabletTool
