// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import NavbarUser from './NavbarUser'
import Network from './Network'

const ThemeNavbar = props => {
  // ** Props
  const { skin, setSkin, setMenuVisibility } = props

  return (
    <Fragment>
      <NavbarUser skin={skin} setSkin={setSkin} setMenuVisibility={setMenuVisibility} />
      <div>
        <Network />
      </div>
    </Fragment>
  )
}

export default ThemeNavbar
