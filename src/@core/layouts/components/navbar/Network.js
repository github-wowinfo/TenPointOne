import { useState } from 'react'
import { connect } from 'react-redux'
import Icon from 'react-crypto-icons'
import { UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'

const Network = () => {
  const data = [
    {
      id: '0',
      icon: <span><Icon className='mx-1' name='eth' size={20} />Etherum</span>
    },
    {
      id: '1',
      icon: <span><Icon className='mx-1' name='matic' size={20} />BSC Mainet</span>
    },
    {
      id: '2',
      icon: <span><Icon className='mx-1' name='arg' size={20} />Polygon Network</span>
    },
    {
      id: '3',
      icon: <span><Icon className='mx-1' name='poly' size={20} />Optimism</span>
    },
    {
      id: '4',
      icon: <span><Icon className='mx-1' name='tnc' size={20} />Arbitrum</span>
    }

  ]

  const [network, setNetwork] = useState(<span><Icon className='mx-1' name='arg' size={20} />Polygon Network</span>)


  const handleNetwork = (e, i) => {
    e.preventDefault()
    setNetwork(i)
  }

  const networkItems = data.map(i => {
    return (
      <DropdownItem href='/' key={i.id} style={{ backgroundColor: i.color }} onClick={(e) => { handleNetwork(e, i.icon) }}>{i.icon}</DropdownItem>
    )
  })

  return (
    <UncontrolledButtonDropdown style={{ marginLeft: 20, marginRight: 20 }}>
      <DropdownToggle style={{ width: '18em' }} color='primary' outline caret>
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