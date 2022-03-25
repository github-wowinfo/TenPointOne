// ** Dropdowns Imports
import { Fragment } from 'react'

import UserDropdown from './UserDropdown'

// ** Third Party Components
import { Sun, Moon, Menu, Book } from 'react-feather'
import { NavItem, NavLink } from 'reactstrap'
import Network from './Network'
import { VscBook } from 'react-icons/vsc'

const NavbarUser = props => {
  // ** Props
  const { skin, setSkin, setMenuVisibility } = props

  // ** Function to toggle Theme (Light/Dark)
  const ThemeToggler = () => {
    if (skin === 'dark') {
      return <Sun className='ficon' onClick={() => setSkin('light')} />
    } else {
      return <Moon className='ficon' onClick={() => setSkin('dark')} />
    }
  }

  return (
    <Fragment>
      <ul className='navbar-nav d-xl-none d-flex align-items-center'>
        <NavItem className='mobile-menu mr-auto'>
          <NavLink className='nav-menu-main menu-toggle hidden-xs is-active' onClick={() => setMenuVisibility(true)}>
            <Menu className='ficon' />
          </NavLink>
        </NavItem>
      </ul>
      <div className='bookmark-wrapper d-flex align-items-center'>
        {/* <NavItem className='d-none d-lg-block'> */}
        <NavItem className='d-block'>
          <NavLink className='nav-link-style'>
            <ThemeToggler />
          </NavLink>
        </NavItem>
      </div>
      <div className='bookmark-wrapper d-flex align-items-center'>
        {/* <Book title='Documentation' className='ficon ml-1' onClick={() => (window.location.href = 'https://ts0-1.gitbook.io/risk-protocol-help-docs/')} /> */}
        {/* <Book title='Documentation' className='ficon ml-1' onClick={() => (window.open('https://ts0-1.gitbook.io/risk-protocol-help-docs/', '_blank'))} /> */}
        {/* <BookOpen title='Documentation' className='ficon ml-1' onClick={() => (window.open('https://ts0-1.gitbook.io/risk-protocol-help-docs/', '_blank'))} /> */}
        <VscBook
          style={{ cursor: 'pointer' }}
          size={25}
          title='Documentation'
          className='ficon ml-1'
          onClick={() => (window.open('https://ts0-1.gitbook.io/risk-protocol-help-docs/', '_blank'))} />
      </div>
      <ul className='nav navbar-nav align-items-center flex-nowrap ml-auto '>
        <UserDropdown />
        <Network />
      </ul>
    </Fragment>
  )
}
export default NavbarUser
