import { useState } from 'react'
import { useSelector, useDispatch, connect } from 'react-redux'
import Icon from 'react-crypto-icons'
import { UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
import * as AppData from '../../../../redux/actions/cookies/appDataType'

const Network = ({ networkC, dispatch }) => {
  const data = [
    {
      id: '0',
      name: 'Etherum',
      icon: 'eth'
    },
    {
      id: '1',
      name: 'BSC Mainet',
      icon: 'matic'
    },
    {
      id: '2',
      name: 'Polygon Network',
      icon: 'arg'
    },
    {
      id: '3',
      name: 'Optimism',
      icon: 'poly'
    },
    {
      id: '4',
      name: 'Arbitrum',
      icon: 'tnc'
    }

  ]

  const [network, setNetwork] = useState({ icon: 'arg', name: 'Polygon Network' })


  const handleNetwork = (e, icon, name) => {
    e.preventDefault()
    setNetwork({ icon, name })
    dispatch(AppData.networkChange({ icon, name }))
    // console.log('name', i)
  }

  const networkItems = data.map(i => {
    return (
      <DropdownItem href='/' key={i.id} onClick={(e) => { handleNetwork(e, i.icon, i.name) }}><span><Icon className='mx-1' name={i.icon} size={20} />{i.name}</span></DropdownItem>
    )
  })

  return (
    <UncontrolledButtonDropdown style={{ marginLeft: 20, marginRight: 20 }}>
      <DropdownToggle color='primary' outline caret>
        <span><Icon className='mx-1' name={network.icon} size={20} />{network.name}</span>
      </DropdownToggle>
      <DropdownMenu style={{ relative: 'relative' }}>
        {networkItems}
      </DropdownMenu>
    </UncontrolledButtonDropdown>
  )
}
// const mapDispatchToProps = dispatch => ({ dispatch })
// export default connect(null, mapDispatchToProps)(Network)
const mapStateToProps = (state) => ({
  message: state.appData.network
})
const mapDispatchToProp = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProp)(Network)