import { useState } from 'react'
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

  const toggleNetwork = i => {
    setNetwork(i)
  }

  const networkItems = data.map(i => {
    return (
      <DropdownItem href='/' tag='a' onClick={() => { toggleNetwork(i.name) }} >{i.name}</DropdownItem>
    )
  })

  return (
    <UncontrolledButtonDropdown style={{marginLeft:20, marginRight:20}}>
      <DropdownToggle color='primary' caret>
        {network}
      </DropdownToggle>
      <DropdownMenu style={{relative: 'relative'}}>
        {networkItems}
      </DropdownMenu>
    </UncontrolledButtonDropdown>
  )
}
export default Network