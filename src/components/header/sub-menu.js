import React from 'react'
import { Link } from 'gatsby'
import { NavDropdown } from 'react-bootstrap'

const SubMenu = ({ label, menuData: subMenu }) => {
  return (
    <NavDropdown title={label} renderMenuOnMount>
      {subMenu.map(({ link, label }, index) => {
        return (
          <NavDropdown.Item key={index} as={'div'}>
            <Link className={'nav-link'} to={link}>
              {label}
            </Link>
          </NavDropdown.Item>
        )
      })}
    </NavDropdown>
  )
}

export default SubMenu
