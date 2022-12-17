import React, { useState } from 'react'
import { Link } from 'gatsby'
import { Accordion, Card } from 'react-bootstrap'
import GSIcon from '~/components/gs-icon'

const SideBar = () => {
  const [sidebar, setSidebar] = useState(false)

  const accordion = () => {
    setSidebar(!sidebar)
  }

  return (
    <div className={'side-bar'}>
      <div className={'bread-crumb'}>
        <Link className={'home'} to={'/'}>
          Home
        </Link>
        <GSIcon icon={'gs-chevron-right'} />
        <span>Contact Us</span>
      </div>
      <div className={'filters-wrapper mobile-display'}>
        <div
          className={sidebar ? 'header' : 'header show'}
          onClick={() => accordion()}
          onKeyDown={() => accordion()}
          role={'button'}
          tabIndex={'0'}
        >
          <h2>Mattressville</h2>
        </div>
        {sidebar ? (
          <Accordion>
            <Card>
              <Accordion className={'toggle-button'}>
                <Link to={'/why-mattressville/'} className={'heading'}>
                  Why us?
                </Link>
              </Accordion>
            </Card>
            <Card>
              <Accordion className={'toggle-button'}>
                <Link to={'/mattress-foundation/'} className={'heading'}>
                  Mattress Foundation
                </Link>
              </Accordion>
            </Card>
            <Card>
              <Accordion className={'toggle-button'}>
                <Link to={'/mattress-buying-guide/'} className={'heading'}>
                  Mattress Buying Guide
                </Link>
              </Accordion>
            </Card>
            <Card>
              <Accordion className={'toggle-button'}>
                <Link to={'/mattress-matchmaker/'} className={'heading'}>
                  Mattress Matchmaker
                </Link>
              </Accordion>
            </Card>
            <Card>
              <Accordion className={'toggle-button'}>
                <Link
                  to={'/choosing-the-right-mattress/'}
                  className={'heading'}
                >
                  Choosing the Right Mattress
                </Link>
              </Accordion>
            </Card>
            <Card>
              <Accordion className={'toggle-button'}>
                <Link to={'/blog/'} className={'heading'}>
                  Mattressville Blog
                </Link>
              </Accordion>
            </Card>
            <Card>
              <Accordion.Toggle
                as={'button'}
                variant={'link'}
                eventKey={'coupons-n-deals'}
                className={`toggle-button d-flex justify-content-between align-items-center`}
              >
                <span className={'heading'}>Coupons & Deals</span>
                <GSIcon icon={'gs-chevron-down'} />
              </Accordion.Toggle>
              <Accordion.Collapse eventKey={'coupons-n-deals'}>
                <div className={'d-flex flex-column child-link'}>
                  <Link to={'/coupons/'} className={'heading'}>
                    Coupons
                  </Link>
                  <Link to={'/all-mattresses/clearance/'} className={'heading'}>
                    Clearance
                  </Link>
                  <Link
                    to={'/all-mattresses/flash-deals/'}
                    className={'heading'}
                  >
                    Flash Deals
                  </Link>
                  <Link to={'/mattress-sale-flyers/'} className={'heading'}>
                    Flyers
                  </Link>
                </div>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        ) : (
          ''
        )}
      </div>
      <div className={'filters-wrapper desktop-display'}>
        <div className={'header'}>
          <h2>Mattressville</h2>
        </div>
        <Accordion>
          <Card>
            <Accordion className={'toggle-button'}>
              <Link to={'/why-mattressville/'} className={'heading'}>
                Why us?
              </Link>
            </Accordion>
          </Card>
          <Card>
            <Accordion className={'toggle-button'}>
              <Link to={'/mattress-foundation/'} className={'heading'}>
                Mattress Foundation
              </Link>
            </Accordion>
          </Card>
          <Card>
            <Accordion className={'toggle-button'}>
              <Link to={'/mattress-buying-guide/'} className={'heading'}>
                Mattress Buying Guide
              </Link>
            </Accordion>
          </Card>
          <Card>
            <Accordion className={'toggle-button'}>
              <Link to={'/mattress-matchmaker/'} className={'heading'}>
                Mattress Matchmaker
              </Link>
            </Accordion>
          </Card>
          <Card>
            <Accordion className={'toggle-button'}>
              <Link to={'/choosing-the-right-mattress/'} className={'heading'}>
                Choosing the Right Mattress
              </Link>
            </Accordion>
          </Card>
          <Card>
            <Accordion className={'toggle-button'}>
              <Link to={'/blog/'} className={'heading'}>
                Mattressville Blog
              </Link>
            </Accordion>
          </Card>
          <Card>
            <Accordion.Toggle
              as={'button'}
              variant={'link'}
              eventKey={'coupons-n-deals'}
              className={`toggle-button d-flex justify-content-between align-items-center`}
            >
              <span className={'heading'}>Coupons & Deals</span>
              <GSIcon icon={'gs-chevron-down'} />
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={'coupons-n-deals'}>
              <div className={'d-flex flex-column child-link'}>
                <Link to={'/coupons/'} className={'heading'}>
                  Coupons
                </Link>
                <Link to={'/all-mattresses/clearance/'} className={'heading'}>
                  Clearance
                </Link>
                <Link to={'/all-mattresses/flash-deals/'} className={'heading'}>
                  Flash Deals
                </Link>
                <Link to={'/mattress-sale-flyers/'} className={'heading'}>
                  Flyers
                </Link>
              </div>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    </div>
  )
}

export default SideBar
