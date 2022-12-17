import React, { Fragment } from 'react'
import { Link } from 'gatsby'
import { Nav } from 'react-bootstrap'

import MegaMenu from './mega-menu'
import SubMenu from './sub-menu'

const MainMenu = ({ isTablet, menuData: mainMenu }) => {
  return (
    <Fragment>
      {mainMenu.map(
        (
          { link, label, useIcon, subMenu, megaMenu, megaMenuBottom },
          index
        ) => {
          return link === '#' ? (
            <Nav.Item
              key={index}
              className={typeof megaMenu !== 'undefined' ? 'has-mega-menu' : ''}
            >
              {typeof subMenu === 'undefined' ? (
                typeof megaMenu === 'undefined' ? (
                  <button aria-label={label} className={'nav-link'}>
                    {label}
                  </button>
                ) : (
                  <MegaMenu
                    label={label}
                    menuData={megaMenu}
                    bottomData={megaMenuBottom}
                  />
                )
              ) : (
                <SubMenu label={label} menuData={subMenu} />
              )}
            </Nav.Item>
          ) : (
            <Nav.Item key={index} className={useIcon ? 'has-icon' : ''}>
              {typeof subMenu === 'undefined' ? (
                <Fragment>
                  {!isTablet && useIcon ? (
                    <img
                      className={'icon'}
                      alt={'A pink color Mattressville matchmaker heart icon'}
                      src={
                        useIcon.childImageSharp.gatsbyImageData.images.fallback
                          .src
                      }
                      loading={'lazy'}
                      height={useIcon.childImageSharp.gatsbyImageData.height}
                      width={useIcon.childImageSharp.gatsbyImageData.width}
                    />
                  ) : null}
                  <Link className={'nav-link'} to={link}>
                    {label}
                  </Link>
                </Fragment>
              ) : (
                <SubMenu label={label} menuData={subMenu} />
              )}
            </Nav.Item>
          )
        }
      )}
    </Fragment>
  )
}

export default MainMenu
