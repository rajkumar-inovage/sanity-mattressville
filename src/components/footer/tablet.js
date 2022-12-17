import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'gatsby'
import {
  Accordion,
  AccordionContext,
  useAccordionToggle,
} from 'react-bootstrap'
import ReactHtmlParser from 'html-react-parser'

import TabletFooterData from '~/components/constants/tablet-footer-data'
import useOnScreen from '~/components/functions/useOnScreen'
import GSIcon from '~/components/gs-icon'
import FooterTablet from './footer-tablet'

const Tablet = () => {
  const { tabletFooter } = TabletFooterData(),
    { accordionData, paySafe, copyright, socialMedia } = tabletFooter,
    { about, stylesTypes, location, brands } = accordionData,
    [loadedOnce, setLoadedOnce] = useState(false),
    sectionRef = useRef(),
    visible = useOnScreen(sectionRef, '100px'),
    ContextAwareToggle = ({ children, eventKey, callback }) => {
      const currentEventKey = useContext(AccordionContext),
        decoratedOnClick = useAccordionToggle(
          eventKey,
          () => callback && callback(eventKey)
        ),
        isCurrentEventKey = currentEventKey === eventKey

      return (
        <button
          type={'button'}
          className={'btn-toggle'}
          onClick={decoratedOnClick}
        >
          <span>{children}</span>
          <GSIcon
            icon={isCurrentEventKey ? 'gs-chevron-up' : 'gs-chevron-down'}
          />
        </button>
      )
    }

  useEffect(() => {
    !loadedOnce && setLoadedOnce(visible)
  }, [loadedOnce, visible])

  return (
    <footer ref={sectionRef}>
      {(visible || loadedOnce) && (
        <Accordion defaultActiveKey={'about'}>
          <div className={'item'}>
            <div className={'header'}>
              <ContextAwareToggle eventKey={'about'}>
                {about.title}
              </ContextAwareToggle>
            </div>
            <Accordion.Collapse eventKey={'about'}>
              <div className={'content about'}>
                <div className={'description'}>
                  {ReactHtmlParser(about.desc)}
                  <span className={'mail-us'}>{about.mail}</span>
                </div>
                <div className={'menu'}>
                  {about.menu.map(({ link, label }, index) => {
                    return (
                      <Link to={link} className={'menu-link'} key={index}>
                        {label}
                      </Link>
                    )
                  })}
                </div>
              </div>
            </Accordion.Collapse>
            <hr className={'separator'} />
          </div>
          <div className={'item'}>
            <div className={'header'}>
              <ContextAwareToggle eventKey={'stylesTypes'}>
                {stylesTypes.title}
              </ContextAwareToggle>
            </div>
            <Accordion.Collapse eventKey={'stylesTypes'}>
              <div className={'content stylesTypes'}>
                <div className={'d-flex w-100'}>
                  <div className={'areas'}>
                    {stylesTypes.styleType.map(({ link, label }, index) => (
                      <h5 key={index}>
                        <Link to={link}>{label}</Link>
                      </h5>
                    ))}
                  </div>
                </div>
              </div>
            </Accordion.Collapse>
            <hr className={'separator'} />
          </div>
          <div className={'item'}>
            <div className={'header'}>
              <ContextAwareToggle eventKey={'location'}>
                {location.title}
              </ContextAwareToggle>
            </div>
            <Accordion.Collapse eventKey={'location'}>
              <div className={'content location'}>
                <div className={'d-flex'}>
                  {location.areas.map((colData, i) => (
                    <div className={'flex-fill'} key={i}>
                      <ul className={'list-unstyled pl-0 mb-0'}>
                        {colData.map(({ link, label }, j) => (
                          <li key={j}>
                            <Link to={link} rel="noreferrer nofollow">
                              {label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </Accordion.Collapse>
            <hr className={'separator'} />
          </div>
          <div className={'item'}>
            <div className={'header'}>
              <ContextAwareToggle eventKey={'brands'}>
                {brands.title}
              </ContextAwareToggle>
            </div>
            <Accordion.Collapse eventKey={'brands'}>
              <div className={'content brands'}>
                <div className={'d-flex w-100'}>
                  <div className={'areas'}>
                    {brands.brandType.map(({ link, label }, index) => (
                      <h5 key={index}>
                        <Link to={link}>{label}</Link>
                      </h5>
                    ))}
                  </div>
                </div>
              </div>
            </Accordion.Collapse>
            <hr className={'separator'} />
          </div>
        </Accordion>
      )}
      {(visible || loadedOnce) && (
        <FooterTablet data={{ paySafe, copyright, socialMedia }} />
      )}
    </footer>
  )
}

export default Tablet
