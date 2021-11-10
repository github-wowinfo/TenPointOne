import { useState } from 'react'
import { connect } from 'react-redux'
import { UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'

const Network = () => {
  const data = [
    {
      id: '0',
      name: 'Etherum'
    },
    {
      id: '1',
      name: 'BSC Mainet'
    },
    {
      id: '2',
      name: 'Polygon Network'
    },
    {
      id: '3',
      name: 'Optimism'
    },
    {
      id: '4',
      name: 'Arbitrum'
    }

  ]

  const [network, setNetwork] = useState('Polygon Network')

  const toggleNetwork = (e, i) => {
    e.preventDefault()
    setNetwork(i)
  }

  const networkItems = data.map(i => {
    return (
      <DropdownItem href='/' tag='a' onClick={(e) => { toggleNetwork(e, i.name) }} >{i.name}</DropdownItem>
    )
  })

  return (
    <UncontrolledButtonDropdown style={{ marginLeft: 20, marginRight: 20 }}>
      <DropdownToggle style={{ width: '15em' }} color='primary' caret>
        {network}
      </DropdownToggle>
      <DropdownMenu style={{ relative: 'relative' }}>
        {networkItems}
      </DropdownMenu>
    </UncontrolledButtonDropdown>
  )
}
const mapDispatchToProps = dispatch => ({ dispatch })
export default connect(null, mapDispatchToProps)(Network)