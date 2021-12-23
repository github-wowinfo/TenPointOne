import { useState } from 'react'
import { useSelector, useDispatch, connect } from 'react-redux'
import Icon from 'react-crypto-icons'
import { UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
import * as AppData from '../../../../redux/actions/cookies/appDataType'
import { useEthers } from '@usedapp/core'
import helperConfig from '../../../../helper-config.json'

const Network = ({ networkC, dispatch }) => {
  const { chainId } = useEthers()
  const data = [
    {
      id: '0',
      name: 'Ethereum',
      icon: 'eth',
      netid: '0x1'
    },
    {
      id: '1',
      name: 'BSC Mainet',
      icon: 'bnb',
      netid: '0x38'
    },
    {
      id: '2',
      name: 'Polygon Network',
      icon: 'matic',
      netid: '0x89'
    },
    {
      id: '3',
      name: 'kovan',
      icon: 'eth',
      netid: '0x2a'
    },
    {
      id: '4',
      name: 'BSC testnet',
      icon: 'bnb',
      netid: '0x61'
    },
    {
      id: '5',
      name: 'Polygon Mumbai',
      icon: 'matic',
      netid: '0x13881'
    }

  ]

  // const [network, setNetwork] = useState({ icon: 'eth', name: 'Ethereum' })
  const networkIcon = chainId ? helperConfig.network[chainId].icon : "Not Connected"
  const networkName = chainId ? helperConfig.network[chainId].name : "Not Connected"
  const [network, setNetwork] = useState({ icon: networkIcon, name: networkName })


  const handleNetwork = (e, icon, name) => {
    e.preventDefault()
    setNetwork({ icon, name })
    dispatch(AppData.networkChange({ icon, name }))
    // console.log('name', i)
  }
  const netchange = async (netid) => {
    await ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: `${netid}` }] })
  }
  const networkItems = data.map(i => {
    return (
      <DropdownItem href='/' key={i.id} onClick={(e) => {
        netchange(i.netid)
        handleNetwork(e, i.icon, i.name)
      }}><span><Icon className='mx-1' name={i.icon} size={20} />{i.name}</span></DropdownItem>
    )
  })

  return (
    <UncontrolledButtonDropdown style={{ marginLeft: 20, marginRight: 20 }}>
      <DropdownToggle color='primary' outline caret>
        {/* <span>{networkData[chainId].img}</span> */}
        {/* <span className='mx-1'><img src={require(`${networkData[chainId].img}`)} alt='logo' /></span><span>{networkData[chainId].name}</span> */}
        {/* <span className='mx-1'><img src={networkData[chainId].img} alt='logo' /></span><span>{networkData[chainId].name}</span> */}
        {/* {console.log('image', networkData[chainId].image)} */}
        {/* <span className='mx-1'><img src={thislogo} alt='logo' height='22' /></span><span>{networkData[chainId].name}</span> */}
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