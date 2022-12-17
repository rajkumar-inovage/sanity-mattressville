import React, { useState, useEffect } from 'react'
import { Link, navigate } from 'gatsby'
import { Accordion, Card } from 'react-bootstrap'

import SearchPageFilterData from '~/components/constants/pages/search-page-filter-data'
import GSIcon from '~/components/gs-icon'
import Deals from '~/components/icons/deals'
import RangeSlider from './RangeSlider'

const SideBar = ({ collectionData: collection }) => {
  const { mattressFilters, accessoriesFilters } = SearchPageFilterData(),
    filters = collection.handle.includes('accessories')
      ? accessoriesFilters
      : mattressFilters
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Apply Vendors Filter
      document.querySelectorAll('.vendor').forEach(element => {
        element.addEventListener('change', ({ target: { checked, value } }) => {
          if (checked) {
            navigate(
              `${
                collection.handle.includes('accessories')
                  ? `/accessories`
                  : `/all-mattresses`
              }?vendor=${encodeURIComponent(value)}`
            )
          }
        })
      })
      document
        .querySelector('#tag-clearance')
        .addEventListener('change', ({ target: { checked, value } }) => {
          if (checked) {
            navigate(
              `${
                collection.handle.includes('accessories')
                  ? `/accessories`
                  : `/all-mattresses`
              }?clearance=true`
            )
          }
        })
      if (!collection.handle.includes('accessories')) {
        // Apply Styles/Types Filter
        document.querySelectorAll('.tag-style').forEach(element => {
          element.addEventListener(
            'change',
            ({ target: { checked, value } }) => {
              if (checked) {
                navigate(
                  `/all-mattresses?tag-style=${encodeURIComponent(value)}`
                )
              }
            }
          )
        })

        // Apply Prices Filter
        document.querySelectorAll('.price').forEach(element => {
          element.addEventListener(
            'change',
            ({ target: { checked, value } }) => {
              if (checked) {
                navigate(
                  `/all-mattresses?price=${encodeURIComponent(value)}`
                )
              }
            }
          )
        })

        // Apply Sizes Filter
        document.querySelectorAll('.tag-size').forEach(element => {
          element.addEventListener(
            'change',
            ({ target: { checked, value } }) => {
              if (checked) {
                navigate(
                  `/all-mattresses?tag-size=${encodeURIComponent(value)}`
                )
              }
            }
          )
        })

        // Apply Firmness Filter
        document.querySelectorAll('.tag-firmness').forEach(element => {
          element.addEventListener(
            'change',
            ({ target: { checked, value } }) => {
              if (checked) {
                navigate(
                  `/all-mattresses?tag-firmness=${encodeURIComponent(value)}`
                )
              }
            }
          )
        })
        // Apply Height Filter
        document
          .querySelector('#tag-mat_height')
          .addEventListener('change', ({ target: { value } }) => {
            navigate(
              `/all-mattresses?tag-mat_height=${encodeURIComponent(value)}`
            )
          })
      }
      // Apply Price Filter
     
    }
  }, [collection])

  const [shopping, setShopping] = useState(false)

  const accordion = () => {
    setShopping(!shopping)
  }

  return (
    <div className={'side-bar'}>
      <div className={'bread-crumb'}>
        <Link className={'home'} to={'/'}>
          Home
        </Link>
        <GSIcon icon={'gs-chevron-right'} />
        <Link
          className={'home'}
          to={
            collection.handle.includes('accessories')
              ? '/accessories/'
              : '/all-mattresses/'
          }
        >
          {collection.handle.includes('accessories')
            ? 'All Accessories'
            : 'All Mattresses'}
        </Link>
        <GSIcon icon={'gs-chevron-right'} />
        <span>{collection.title}</span>
      </div>
      <div className={'filters-wrapper mobile-display'}>
        <div
          className={shopping ? 'header' : 'header show'}
          onClick={() => accordion()}
          onKeyDown={() => accordion()}
          role={'button'}
          tabIndex={'0'}
        >
          <h2>Shopping Options</h2>
        </div>
        {shopping ? (
          <Accordion>
            {filters.map(({ name, key, type, options }, i) => {
              return (
                <Card key={i}>
                  {type === 'checkbox-single' && (
                    <Card.Body className={`${key}-body`}>
                      <div className={'filter-item'}>
                        <input
                          className={`check-box ${key}`}
                          type={'checkbox'}
                          id={`${key}`}
                          value={name}
                        />
                        <label htmlFor={`${key}`}>
                          {name.split('-').join('/')}
                        </label>
                      </div>
                    </Card.Body>
                  )}
                  {type !== 'checkbox-single' && (
                    <Accordion.Toggle
                      as={'button'}
                      variant={'link'}
                      eventKey={key}
                      className={`toggle-button toggle-${key}`}
                    >
                      <span className={'heading'}>{name}</span>
                      <GSIcon icon={'gs-chevron-down'} />
                    </Accordion.Toggle>
                  )}
                  {type !== 'checkbox-single' && (
                    <Accordion.Collapse eventKey={key}>
                      {((key, type, options) => {
                        switch (type) {
                          case 'checkbox':
                            return (
                              <Card.Body className={`${key}-body`}>
                                {options.map((option, j) => (
                                  <div className={'filter-item'} key={j}>
                                    <input
                                      className={`check-box ${key}`}
                                      type={'checkbox'}
                                      id={`${key}-${j}`}
                                      value={option}
                                    />
                                    <label htmlFor={`${key}-${j}`}>
                                      {option.includes('=')
                                        ? option.split('=').join('-')
                                        : option.split('-').join('/')}
                                    </label>
                                  </div>
                                ))}
                              </Card.Body>
                            )
                          case 'select':
                            return (
                              <Card.Body className={`${key}-body`}>
                                <div className={'filter-item filter-select'}>
                                  <select
                                    className={`select-box ${key}`}
                                    id={key}
                                    onClick={() => {
                                      document
                                        .querySelector(
                                          `.${key}-body .filter-select`
                                        )
                                        .classList.contains('open')
                                        ? document
                                            .querySelector(
                                              `.${key}-body .filter-select`
                                            )
                                            .classList.remove('open')
                                        : document
                                            .querySelector(
                                              `.${key}-body .filter-select`
                                            )
                                            .classList.add('open')
                                    }}
                                  >
                                    <option value={''}>
                                      {'Select Height'}
                                    </option>
                                    {options.map((option, j) => (
                                      <option key={j} value={option}>
                                        {option}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </Card.Body>
                            )
                          case 'range':
                            return (
                              <Card.Body className={`${key}-body`}>
                                <div className={key}>
                                  <RangeSlider
                                    min={options.min}
                                    max={options.max}
                                  />
                                </div>
                              </Card.Body>
                            )
                          case 'link':
                            return (
                              <Card.Body className={`${key}-body`}>
                                {options.map(({ to, label }, j) => (
                                  <Link
                                    to={to}
                                    key={j}
                                    className={'filter-link'}
                                  >
                                    {label}
                                  </Link>
                                ))}
                              </Card.Body>
                            )
                          default:
                            return null
                        }
                      })(key, type, options)}
                    </Accordion.Collapse>
                  )}
                </Card>
              )
            })}
            <div className={'flash-deals'}>
              <Link to={'/accessories/flash-deals/'}>
                <Deals
                  width={408}
                  height={150}
                  className={'img-fluid'}
                  style={{
                    borderRadius: '15px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
                  }}
                />
              </Link>
            </div>
          </Accordion>
        ) : (
          ''
        )}
      </div>
      <div className={'filters-wrapper desktop-display'}>
        <div className={'header'}>
          <h2>Shopping Options</h2>
        </div>
        <Accordion>
          {filters.map(({ name, key, type, options }, i) => {
            return (
              <Card key={i}>
                {type === 'checkbox-single' && (
                  <Card.Body className={`${key}-body`}>
                    <div className={'filter-item'}>
                      <input
                        className={`check-box ${key}`}
                        type={'checkbox'}
                        id={`${key}`}
                        value={name}
                      />
                      <label htmlFor={`${key}`}>
                        {name.split('-').join('/')}
                      </label>
                    </div>
                  </Card.Body>
                )}
                {type !== 'checkbox-single' && (
                  <Accordion.Toggle
                    as={'button'}
                    variant={'link'}
                    eventKey={key}
                    className={`toggle-button toggle-${key}`}
                  >
                    <span className={'heading'}>{name}</span>
                    <GSIcon icon={'gs-chevron-down'} />
                  </Accordion.Toggle>
                )}
                {type !== 'checkbox-single' && (
                  <Accordion.Collapse eventKey={key}>
                    {((key, type, options) => {
                      switch (type) {
                        case 'checkbox':
                          return (
                            <Card.Body className={`${key}-body`}>
                              {options.map((option, j) => (
                                <div className={'filter-item'} key={j}>
                                  <input
                                    className={`check-box ${key}`}
                                    type={'checkbox'}
                                    id={`${key}-${j}`}
                                    value={option}
                                  />
                                  <label htmlFor={`${key}-${j}`}>
                                    {option.includes('=')
                                      ? option.split('=').join('-')
                                      : option.split('-').join('/')}
                                  </label>
                                </div>
                              ))}
                            </Card.Body>
                          )
                        case 'select':
                          return (
                            <Card.Body className={`${key}-body`}>
                              <div className={'filter-item filter-select'}>
                                <select
                                  className={`select-box ${key}`}
                                  id={key}
                                  onClick={() => {
                                    document
                                      .querySelector(
                                        `.${key}-body .filter-select`
                                      )
                                      .classList.contains('open')
                                      ? document
                                          .querySelector(
                                            `.${key}-body .filter-select`
                                          )
                                          .classList.remove('open')
                                      : document
                                          .querySelector(
                                            `.${key}-body .filter-select`
                                          )
                                          .classList.add('open')
                                  }}
                                >
                                  <option value={''}>{'Select Height'}</option>
                                  {options.map((option, j) => (
                                    <option key={j} value={option}>
                                      {option}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </Card.Body>
                          )
                        case 'range':
                          return (
                            <Card.Body className={`${key}-body`}>
                              <div className={key}>
                                <RangeSlider
                                  min={options.min}
                                  max={options.max}
                                />
                              </div>
                            </Card.Body>
                          )
                        case 'link':
                          return (
                            <Card.Body className={`${key}-body`}>
                              {options.map(({ to, label }, j) => (
                                <Link to={to} key={j} className={'filter-link'}>
                                  {label}
                                </Link>
                              ))}
                            </Card.Body>
                          )
                        default:
                          return null
                      }
                    })(key, type, options)}
                  </Accordion.Collapse>
                )}
              </Card>
            )
          })}
        </Accordion>
      </div>
      <div className={'flash-deals'}>
        <Link
          to={
            collection.handle.includes('accessories')
              ? '/accessories/flash-deals/'
              : '/all-mattresses/flash-deals/'
          }
        >
          <Deals
            width={408}
            height={150}
            className={'img-fluid'}
            style={{
              borderRadius: '15px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
            }}
          />
        </Link>
      </div>
    </div>
  )
}

export default SideBar
