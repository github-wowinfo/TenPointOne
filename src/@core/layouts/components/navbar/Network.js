import { useState, useEffect } from 'react'
import { useSelector, useDispatch, connect } from 'react-redux'
import Icon from 'react-crypto-icons'
import { UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
import * as AppData from '../../../../redux/actions/cookies/appDataType'
import { useEthers } from '@usedapp/core'
import helperConfig from '../../../../helper-config.json'
import chain_detail from '../../../../network.json'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import LoginModal from '../../../../views/LoginModal'

const Network = ({ networkC, dispatch, globalFlag }) => {

  const { account, chainId } = useEthers()
  const MySwal = withReactContent(Swal)

  const isConnected = account !== undefined

  const [loginModal, setLoginModal] = useState(false)
  const disconnect = () => {
    window.location.href = '/home'
    setLoginModal(!loginModal)
  }

  console.log('loginModal', loginModal)

  useEffect(() => {
    if (!isConnected) {
      setLoginModal(!loginModal)
    }
  }, [account, chainId])


  console.log('chain_detail', chain_detail)
  const data = chain_detail

  // const data = [
  //   {
  //     id: '0',
  //     name: 'Ethereum',
  //     icon: 'eth',
  //     netid: '0x1'
  //   },
  //   {
  //     id: '1',
  //     name: 'BSC Mainet',
  //     icon: 'bnb',
  //     netid: '0x38'
  //   },
  //   {
  //     id: '2',
  //     name: 'Polygon Network',
  //     icon: 'matic',
  //     netid: '0x89'
  //   },
  //   {
  //     id: '3',
  //     name: 'kovan',
  //     icon: 'eth',
  //     netid: '0x2a'
  //   },
  //   {
  //     id: '4',
  //     name: 'BSC testnet',
  //     icon: 'bnb',
  //     netid: '0x61'
  //   },
  //   {
  //     id: '5',
  //     name: 'Polygon Mumbai',
  //     icon: 'matic',
  //     netid: '0x13881'
  //   }
  // ]

  const [curt_chain, setCurt_chain] = useState(chainId)
  const [network, setNetwork] = useState({})
  let networkIcon = ''
  let networkName = ''
  useEffect(() => {
    networkIcon = chainId ? helperConfig.network[chainId].icon : "Not Connected"
    networkName = chainId ? helperConfig.network[chainId].name : "Not Connected"
    setNetwork({ icon: networkIcon, name: networkName })
  }, [chainId])

  // const [network, setNetwork] = useState({ icon: 'eth', name: 'Ethereum' })
  // const [network, setNetwork] = useState({ icon: networkIcon, name: networkName }

  // const handleNetwork = (e, icon, name) => {
  //   e.preventDefault()
  //   setNetwork({ icon, name })
  //   dispatch(AppData.networkChange({ icon, name }))
  //   console.log('name', i)
  // }


  const netchange = (netid) => {
    ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: `${netid}` }] })
  }
  const handleAjax = (netid, name) => {
    return MySwal.fire({
      title: 'Do you want to change your current network?',
      text: `Current network is "${helperConfig.network[chainId].name}"`,
      allowOutsideClick: false,
      showCancelButton: true,
      confirmButtonText: `Switch metamask to "${name}" and log in again`,
      customClass: {
        confirmButton: 'btn btn-primary mx-1',
        cancelButton: 'btn btn-danger my-1'
      },
      showClass: {
        popup: 'animate__animated animate__flipInX'
      },
    }).then(function (result) {
      if (result.isConfirmed) {
        netchange(netid)
        dispatch(AppData.globalFlag(true))
        // disconnect()
      }
    })
  }

  useEffect(() => {
    if (chainId !== curt_chain && globalFlag) {
      disconnect()
    }
  }, [chainId])


  const networkItems = data.map((i, index) => {
    return (
      <DropdownItem href='/' key={index} onClick={(e) => {
        e.preventDefault()
        handleAjax(i.netid, i.name)
        // netchange(i.netid)
        // handleNetwork(e, i.icon, i.name)
      }}><span><Icon className='mx-1' name={i.icon} size={20} />{i.name}</span></DropdownItem>
    )
  })

  return (
    <>
      <UncontrolledButtonDropdown style={{ marginLeft: 20, marginRight: 20 }}>

        <DropdownToggle color='primary' outline caret>
          <span><Icon className='mx-1' name={network.icon} size={20} />{network.name}</span>
        </DropdownToggle>

        <DropdownMenu style={{ relative: 'relative' }}>

          {networkItems}

        </DropdownMenu>

      </UncontrolledButtonDropdown>
      <LoginModal openloginmodal={loginModal} disconnect={disconnect} />
    </>
  )
}
// const mapDispatchToProps = dispatch => ({ dispatch })
// export default connect(null, mapDispatchToProps)(Network)
// const mapStateToProps = (state) => ({
//   message: state.appData.network
// })
// const mapDispatchToProp = dispatch => ({ dispatch })

// export default connect(mapStateToProps, mapDispatchToProp)(Network)

const mapStateToProps = (state) => ({
  globalFlag: state.appData.globalFlag
})
const mapDispatchToProp = dispatch => ({ dispatch })
export default connect(mapStateToProps, mapDispatchToProp)(Network)