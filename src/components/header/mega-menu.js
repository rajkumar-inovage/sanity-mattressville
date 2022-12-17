import React from 'react'
import { Link } from 'gatsby'
import { NavDropdown } from 'react-bootstrap'

const MegaMenu = ({ label, menuData, bottomData }) => {
  return (
    <NavDropdown title={label} renderMenuOnMount>
      <div className={'mega-menu'}>
        {menuData && (
          <div className={'row mega-menu-link'}>
            {menuData.map(({ columnLabel, menuItems }, i) => (
              <div className={'mega-menus'} key={i}>
                <h5>{columnLabel}</h5>
                <div className={'inner-menu'}>
                  {menuItems.map(({ link, label }, j) => (
                    <NavDropdown.Item key={j} as={'div'}>
                      <Link to={link} className={'nav-link'}>
                        {label}
                      </Link>
                    </NavDropdown.Item>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        <NavDropdown.Item as={'div'} className={'d-flex justify-content-end'}>
          <Link className={'nav-link mega-menu-bottom-link'} to={bottomData.link}>
            {bottomData.label}
          </Link>
        </NavDropdown.Item>
      </div>
    </NavDropdown>
  )
}

export default MegaMenu
