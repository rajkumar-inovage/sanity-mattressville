import React, { useContext } from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import GSIcon from '~/components/gs-icon'
import {
  Accordion,
  Card,
  AccordionContext,
  useAccordionToggle,
} from 'react-bootstrap'
import ReactHtmlParser from 'html-react-parser'

import PriceTag from '~/components/icons/price-tag'
import Consultants from '~/components/icons/consultants'
import RetailSpace from '~/components/icons/retail-space'
import Rewards from '~/components/icons/rewards'
import StearnsAndFoster from '~/components/icons/stearns-and-foster'
import BeautyRest from '~/components/icons/beautyrest'
import TempurPedic from '~/components/icons/tempur-pedic'
import Sealy from '~/components/icons/sealy'
import ProgressBar from './progress-bar'

const Main = ({ data }) => {
  const ContextAwareToggle = ({ children, eventKey, callback, className }) => {
    const currentEventKey = useContext(AccordionContext),
      decoratedOnClick = useAccordionToggle(
        eventKey,
        () => callback && callback(eventKey)
      ),
      isCurrentEventKey = currentEventKey === eventKey

    return (
      <button
        type={'button'}
        aria-label={'Toggle'}
        className={className}
        onClick={decoratedOnClick}
      >
        {children}
        <GSIcon icon={isCurrentEventKey ? 'gs-x' : 'gs-plus'} />
      </button>
    )
  }
  const {
    bannerSection,
    iconSet,
    qualityMattressBrand,
    faq,
    reasonablePrices,
    businessStrategy,
    totalSaving,
  } = data

  return (
    <div className={'flex-grow-1'}>
      <div className={'product-main'}>
        <h1 className={'main-heading'}>{bannerSection.title}</h1>
        <div className={'img-section'}>
          <GatsbyImage
            image={
              bannerSection.NonCategoryBannerImage.childImageSharp
                .gatsbyImageData
            }
            className={'banner-img'}
            alt={bannerSection.altText}
          />
        </div>
        <p className={'para'}>{ReactHtmlParser(bannerSection.description)}</p>
        <div className={'icon-section'}>
          <div className={'inner-icon-section'}>
            <div className={'icon'}>
              <PriceTag height={50} width={34} />
            </div>
            <div className={'content'}>
              <p>{ReactHtmlParser(iconSet.text1)}</p>
            </div>
          </div>
          <div className={'inner-icon-section'}>
            <div className={'icon'}>
              <Consultants height={45} width={35} />
            </div>
            <div className={'content'}>
              <p>{ReactHtmlParser(iconSet.text2)}</p>
            </div>
          </div>
          <div className={'inner-icon-section'}>
            <div className={'icon'}>
              <RetailSpace height={36} width={39} />
            </div>
            <div className={'content'}>
              <p>{ReactHtmlParser(iconSet.text3)}</p>
            </div>
          </div>
          <div className={'inner-icon-section'}>
            <div className={'icon'}>
              <Rewards height={51} width={34} />
            </div>
            <div className={'content'}>
              <p>{ReactHtmlParser(iconSet.text4)}</p>
            </div>
          </div>
        </div>

        <h2 className={'main-heading'}>{qualityMattressBrand.title}</h2>
        <p className={'second-para'}>
          {ReactHtmlParser(qualityMattressBrand.description)}
        </p>
        <div className={'card-grid'}>
          <Accordion className={'row'}>
            <div className={'col-12 col-md-6'}>
              <Card>
                <Accordion.Toggle
                  as={'button'}
                  variant="link"
                  eventKey="0"
                  className={'toggle-button'}
                >
                  <div className={'flex-shrink-1'}>
                    <div className={'icon'}>
                      <StearnsAndFoster width={131} height={67} />
                    </div>
                  </div>
                  <div className={'card-content flex-grow-1'}>
                    <span className={'heading'}>
                      {qualityMattressBrand.cards.cardTitle1}
                    </span>
                    <div className={'card-flex'}>
                      <p>Show more details</p>
                      <GSIcon icon={'gs-chevron-down'} />
                    </div>
                  </div>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <p>
                      {ReactHtmlParser(
                        qualityMattressBrand.cards.cardDescription1
                      )}
                    </p>
                    <div>
                      <a href={qualityMattressBrand.cards.cardLink1}>
                        {qualityMattressBrand.cards.cardLinkText1}
                      </a>
                      <GSIcon icon={'gs-chevron-right'} />
                    </div>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </div>

            <div className={'col-12 col-md-6'}>
              <Card>
                <Accordion.Toggle
                  as={'button'}
                  variant="link"
                  eventKey="1"
                  className={'toggle-button'}
                >
                  <div className={'flex-shrink-1'}>
                    <div className={'icon'}>
                      <BeautyRest width={159} height={50} />
                    </div>
                  </div>
                  <div className={'card-content flex-grow-1'}>
                    <span className={'heading'}>
                      {qualityMattressBrand.cards.cardTitle2}
                    </span>
                    <div className={'card-flex'}>
                      <p>Show more details</p>
                      <GSIcon icon={'gs-chevron-down'} />
                    </div>
                  </div>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>
                    <p>
                      {ReactHtmlParser(
                        qualityMattressBrand.cards.cardDescription2
                      )}
                    </p>
                    <div>
                      <a href={qualityMattressBrand.cards.cardLink2}>
                        {qualityMattressBrand.cards.cardLinkText2}
                      </a>
                      <GSIcon icon={'gs-chevron-right'} />
                    </div>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </div>

            <div className={'col-12 col-md-6'}>
              <Card>
                <Accordion.Toggle
                  as={'button'}
                  variant="link"
                  eventKey="2"
                  className={'toggle-button'}
                >
                  <div className={'flex-shrink-1'}>
                    <div className={'icon'}>
                      <TempurPedic width={162} height={41} />
                    </div>
                  </div>
                  <div className={'card-content flex-grow-1'}>
                    <span className={'heading'}>
                      {qualityMattressBrand.cards.cardTitle3}
                    </span>
                    <div className={'card-flex'}>
                      <p>Show more details</p>
                      <GSIcon icon={'gs-chevron-down'} />
                    </div>
                  </div>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="2">
                  <Card.Body className={'card-body'}>
                    <p>
                      {ReactHtmlParser(
                        qualityMattressBrand.cards.cardDescription3
                      )}
                    </p>
                    <div>
                      <a href={qualityMattressBrand.cards.cardLink3}>
                        {qualityMattressBrand.cards.cardLinkText3}
                      </a>
                      <GSIcon icon={'gs-chevron-right'} />
                    </div>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </div>

            <div className={'col-12 col-md-6'}>
              <Card>
                <Accordion.Toggle
                  as={'button'}
                  variant="link"
                  eventKey="3"
                  className={'toggle-button'}
                >
                  <div className={'flex-shrink-1'}>
                    <div className={'icon justify-content-center'}>
                      <Sealy width={125} height={59} />
                    </div>
                  </div>
                  <div className={'card-content flex-grow-1'}>
                    <span className={'heading'}>
                      {qualityMattressBrand.cards.cardTitle4}
                    </span>
                    <div className={'card-flex'}>
                      <p>Show more details</p>
                      <GSIcon icon={'gs-chevron-down'} />
                    </div>
                  </div>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="3">
                  <Card.Body>
                    <p>
                      {ReactHtmlParser(
                        qualityMattressBrand.cards.cardDescription4
                      )}
                    </p>
                    <div>
                      <a href={qualityMattressBrand.cards.cardLink4}>
                        {qualityMattressBrand.cards.cardLinkText4}
                      </a>
                      <GSIcon icon={'gs-chevron-right'} />
                    </div>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </div>
          </Accordion>
        </div>
        <h2 className={'main-heading'}>{faq.title}</h2>
        <Accordion>
          <Card>
            <ContextAwareToggle
              as={'button'}
              variant="link"
              className={'toggle-button'}
              eventKey={'Full-Manufacturer-Warranty'}
            >
              <span className={'heading'}>{faq.qus1}</span>
            </ContextAwareToggle>
            <Accordion.Collapse eventKey={'Full-Manufacturer-Warranty'}>
              <Card.Body>{ReactHtmlParser(faq.ans1)}</Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <ContextAwareToggle
              as={'button'}
              variant="link"
              className={'toggle-button'}
              eventKey={'Sleep-Guarantee'}
            >
              <span className={'heading'}>{faq.qus2}</span>
            </ContextAwareToggle>
            <Accordion.Collapse eventKey="Sleep-Guarantee">
              <Card.Body>{ReactHtmlParser(faq.ans2)}</Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <ContextAwareToggle
              as={'button'}
              variant="link"
              className={'toggle-button'}
              eventKey={'Price-Match-Guarantee'}
            >
              <span className={'heading'}>{faq.qus3}</span>
            </ContextAwareToggle>
            <Accordion.Collapse eventKey="Price-Match-Guarantee">
              <Card.Body>{ReactHtmlParser(faq.ans3)}</Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <ContextAwareToggle
              as={'button'}
              variant="link"
              className={'toggle-button'}
              eventKey={'Mattress-Sleep-Experts'}
            >
              <span className={'heading'}>{faq.qus4}</span>
            </ContextAwareToggle>
            <Accordion.Collapse eventKey="Mattress-Sleep-Experts">
              <Card.Body>{ReactHtmlParser(faq.ans4)}</Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <ContextAwareToggle
              as={'button'}
              variant="link"
              className={'toggle-button'}
              eventKey={'Referral-Program'}
            >
              <span className={'heading'}>{faq.qus5}</span>
            </ContextAwareToggle>
            <Accordion.Collapse eventKey="Referral-Program">
              <Card.Body>{ReactHtmlParser(faq.ans5)}</Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        <h2 className={'main-heading'}>{reasonablePrices.title}</h2>
        <p className={'para'}>
          {ReactHtmlParser(reasonablePrices.description)}
        </p>
        <div className={'price-flex'}>
          <div className={'price-card'}>
            <h4 className={'price-heading'}>
              {reasonablePrices.retailers.title}
            </h4>
            <div className={'flex'}>
              <GSIcon className={'error'} icon={'gs-x'} />
              <p>{reasonablePrices.retailers.item1}</p>
            </div>
            <div className={'flex'}>
              <GSIcon className={'true'} icon={'gs-check'} />
              <p>{reasonablePrices.retailers.item2}</p>
            </div>
            <div className={'flex'}>
              <GSIcon className={'true'} icon={'gs-check'} />
              <p>{reasonablePrices.retailers.item3}</p>
            </div>
            <div className={'flex'}>
              <GSIcon className={'true'} icon={'gs-check'} />
              <p>{reasonablePrices.retailers.item4}</p>
            </div>
            <div className={'flex'}>
              <GSIcon className={'true'} icon={'gs-check'} />
              <p>{reasonablePrices.retailers.item5}</p>
            </div>
            <div className={'flex'}>
              <GSIcon className={'true'} icon={'gs-check'} />
              <p>{reasonablePrices.retailers.item6}</p>
            </div>
            <div className={'flex'}>
              <GSIcon className={'false'} icon={'gs-x'} />
              <p>{reasonablePrices.retailers.item7}</p>
            </div>
          </div>

          <div className={'price-card'}>
            <GatsbyImage
              image={
                reasonablePrices.mattressVille.logo.childImageSharp
                  .gatsbyImageData
              }
              className={'logo-img'}
              alt={'Mattressville'}
            />
            <div className={'price-description'}>
              <div className={'flex'}>
                <GSIcon className={'true'} icon={'gs-check'} />
                <p>{reasonablePrices.mattressVille.item1}</p>
              </div>
              <div className={'flex'}>
                <GSIcon className={'true'} icon={'gs-check'} />
                <p>{reasonablePrices.mattressVille.item2}</p>
              </div>
              <div className={'flex'}>
                <GSIcon className={'true'} icon={'gs-check'} />
                <p>{reasonablePrices.mattressVille.item3}</p>
              </div>
              <div className={'flex'}>
                <GSIcon className={'true'} icon={'gs-check'} />
                <p>{reasonablePrices.mattressVille.item4}</p>
              </div>
              <div className={'flex'}>
                <GSIcon className={'true'} icon={'gs-check'} />
                <p>{reasonablePrices.mattressVille.item5}</p>
              </div>
              <div className={'flex'}>
                <GSIcon className={'true'} icon={'gs-check'} />
                <p>{reasonablePrices.mattressVille.item6}</p>
              </div>
              <div className={'flex'}>
                <GSIcon className={'true'} icon={'gs-check'} />
                <p>{reasonablePrices.mattressVille.item7}</p>
              </div>
            </div>
            <a
              href={reasonablePrices.mattressVille.btnLink}
              className={'card-button'}
            >
              {reasonablePrices.mattressVille.btnText}
            </a>
          </div>

          <div className={'price-card'}>
            <h4 className={'price-heading'}>
              {reasonablePrices.outletStores.title}
            </h4>
            <div className={'flex'}>
              <GSIcon className={'false'} icon={'gs-x'} />
              <p>{reasonablePrices.outletStores.item1}</p>
            </div>
            <div className={'flex'}>
              <GSIcon className={'false'} icon={'gs-x'} />
              <p>{reasonablePrices.outletStores.item2}</p>
            </div>
            <div className={'flex'}>
              <GSIcon className={'false'} icon={'gs-x'} />
              <p>{reasonablePrices.outletStores.item3}</p>
            </div>
            <div className={'flex'}>
              <GSIcon className={'true'} icon={'gs-check'} />
              <p>{reasonablePrices.outletStores.item4}</p>
            </div>
            <div className={'flex'}>
              <GSIcon className={'true'} icon={'gs-check'} />
              <p>{reasonablePrices.outletStores.item5}</p>
            </div>
            <div className={'flex'}>
              <GSIcon className={'false'} icon={'gs-x'} />
              <p>{reasonablePrices.outletStores.item6}</p>
            </div>
            <div className={'flex'}>
              <GSIcon className={'false'} icon={'gs-x'} />
              <p>{reasonablePrices.outletStores.item7}</p>
            </div>
          </div>
        </div>
        <h2 className={'main-heading'}>{businessStrategy.title}</h2>
        <div className={'business-grid'}>
          <div className={'business-card'}>
            <div className={'flex-shrink-1'}>
              <ProgressBar progress={businessStrategy.card.progress1} />
            </div>
            <div className={'card-content'}>
              <h4>{ReactHtmlParser(businessStrategy.card.cardTitle1)}</h4>
              <p>{ReactHtmlParser(businessStrategy.card.cardDescription1)}</p>
            </div>
          </div>

          <div className={'business-card'}>
            <div className={'flex-shrink-1'}>
              <ProgressBar progress={businessStrategy.card.progress2} />
            </div>
            <div className={'card-content'}>
              <h4>{ReactHtmlParser(businessStrategy.card.cardTitle2)}</h4>
              <p>{ReactHtmlParser(businessStrategy.card.cardDescription2)}</p>
            </div>
          </div>

          <div className={'business-card'}>
            <div className={'flex-shrink-1'}>
              <ProgressBar progress={businessStrategy.card.progress3} />
            </div>
            <div className={'card-content'}>
              <h4>{ReactHtmlParser(businessStrategy.card.cardTitle3)}</h4>
              <p>{ReactHtmlParser(businessStrategy.card.cardDescription3)}</p>
            </div>
          </div>

          <div className={'business-card'}>
            <div className={'flex-shrink-1'}>
              <ProgressBar progress={businessStrategy.card.progress4} />
            </div>
            <div className={'card-content'}>
              <h4>{ReactHtmlParser(businessStrategy.card.cardTitle4)}</h4>
              <p>{ReactHtmlParser(businessStrategy.card.cardDescription4)}</p>
            </div>
          </div>
        </div>
        <div className={'last-card'}>
          <div className={'card-content'}>
            <div>
              <ProgressBar progress={totalSaving.progress} />
            </div>
            <p>
              <strong>{totalSaving.boldTitle}</strong> <br></br>{' '}
              {totalSaving.thinTitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main
