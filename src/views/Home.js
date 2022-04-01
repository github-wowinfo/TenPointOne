import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardBody, CardTitle, NavLink } from 'reactstrap'
import Col from 'reactstrap/lib/Col'
import Row from 'reactstrap/lib/Row'
import MainChart1 from "./Dashboard/MainChart1"
import MainChart2 from "./Dashboard/MainChart2"
import Assests from "./Dashboard/Assests"
import RecentTrans from "./Dashboard/RecentTrans"
import SegaDisplay from './Dashboard/SegaDisplay'
import Avatar from '@components/avatar'
import { shortenIfAddress, useEthers } from '@usedapp/core'
import helperConfig from '../helper-config.json'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { connect } from 'react-redux'
import * as AppData from '../redux/actions/cookies/appDataType'
import axios from 'axios'
import { BsArrowRightCircle } from 'react-icons/bs'
import LoginModal from './LoginModal'
import RefreshButton from './RefreshButton'
import { RiRefreshLine } from 'react-icons/ri'

const Home = ({ globalVaultFlag, globalAdrs, dispatch, globalNickName }) => {

  const { account, chainId } = useEthers()

  const isConnected = account !== undefined

  const [loginModal, setLoginModal] = useState(false)

  const disconnect = () => {
    setLoginModal(!loginModal)
  }

  console.log('loginModal', loginModal)

  useEffect(() => {
    if (!isConnected) {
      disconnect()
    }
  }, [account, chainId])

  // const [chart, setChart] = useState(true)

  console.log('chainId', chainId)
  const [curt_account, setCurt_account] = useState(account)
  // const curt_chain = chainId
  const [curt_chain, setCurt_chain] = useState(chainId)
  const MySwal = withReactContent(Swal)

  const netchange = async (netid) => {
    await ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: `${netid}` }] })
  }
  const accountChange = async () => {
    await ethereum.request({ method: "wallet_requestPermissions", params: [{ eth_accounts: {} }] })
  }
  const handleAjax = () => {
    return MySwal.fire({
      title: 'Do you want to change your current network?',
      // text: `Current network is "${helperConfig.network[chainId].name}"`,
      allowOutsideClick: false,
      showCancelButton: true,
      confirmButtonText: `Switch metamask to "${helperConfig.network[chainId].name} and log in again"`,
      cancelButtonText: `Stay on "${helperConfig.network[curt_chain].name}" and log in again`,
      customClass: {
        confirmButton: 'btn btn-primary mx-1',
        cancelButton: 'btn btn-danger my-1'
      },
      showClass: {
        popup: 'animate__animated animate__flipInX'
      },
    }).then(function (result) {
      if (result.isConfirmed) {
        netchange(helperConfig.network[chainId].netid)
        disconnect()
      } else if (result.isDismissed) {
        disconnect()
        netchange(helperConfig.network[curt_chain].netid)
      }
    })
  }

  const handleAccount = () => {
    return MySwal.fire({
      title: 'Your account is Changed!',
      // text: `Current network is "${helperConfig.network[chainId].name}"`,
      allowOutsideClick: false,
      showCancelButton: true,
      confirmButtonText: `Continue with current account ("${shortenIfAddress(account)}"), and log in again `,
      cancelButtonText: `Stay on previous account ("${shortenIfAddress(curt_account)}"), and log in again`,
      customClass: {
        confirmButton: 'btn btn-primary mx-1',
        cancelButton: 'btn btn-danger my-1'
      },
      showClass: {
        popup: 'animate__animated animate__flipInX'
      },
    }).then(function (result) {
      if (result.isConfirmed) {
        disconnect()
      } else if (result.isDismissed) {
        disconnect()
        accountChange()
      }
    })
  }

  console.log('curt_account', curt_account)
  console.log('account', account)
  console.log('curt_chain', curt_chain)

  useEffect(() => {
    if (chainId !== undefined && curt_chain !== undefined && chainId !== curt_chain) {
      handleAjax()
    }
    if (curt_account !== undefined && account !== undefined && account !== curt_account) {
      handleAccount()
      setCurt_account(account)
    }
  }, [chainId, account])

  const [curr_acc, setCurr_Acc] = useState(account)
  const [vaultList, setVaultList] = useState([])
  const getVaultListFromLocal = () => {
    const getdata = JSON.parse(localStorage.getItem('vaultdata'))
    const valueData = getdata && getdata.filter(a => a.show === true && a.network === chainId && a.owner === account)
    const vaultlist = valueData && valueData.map((vault, index) => ({ value: index, adrs: vault.address, name: vault.name }))
    console.log('vaultlist', vaultlist)
    if (vaultlist === null || vaultlist === [] || vaultlist.length === 0) {
      dispatch(AppData.globalAdrs(''))
      dispatch(AppData.globalNickName('Create a Vault'))
    } else {
      console.log('vaultlist', vaultlist)
      dispatch(AppData.globalAdrs(vaultlist[0].adrs))
      dispatch(AppData.globalNickName(vaultlist[0].name))
      // setVaultList(vaultlist)
    }
  }
  useEffect(() => {
    if (globalNickName === '' || globalNickName === 'Create a Vault') {
      getVaultListFromLocal()
      // dispatch(AppData.globalNickName(''))
    } else if (curr_acc !== account) {
      setCurr_Acc(account)
      getVaultListFromLocal()
    }
  }, [account, globalVaultFlag])

  console.log('globalNickName', globalNickName)
  const [assetList, setAssetList] = useState([])
  const [sum, setSum] = useState(0)
  const getTokenBalance = async () => {
    console.log('gg')
    try {
      const response = await axios.get(`https://api.unmarshal.com/v1/${helperConfig.unmarshal[chainId]}/address/${globalAdrs}/assets?auth_key=CE2OvLT9dk2YgYAYfb3jR1NqCGWGtdRd1eoikUYs`)
      // const response = await axios.get(`https://api.unmarshal.com/v1/${helperConfig.unmarshal[chainId]}/address/${account}/assets?auth_key=CE2OvLT9dk2YgYAYfb3jR1NqCGWGtdRd1eoikUYs`)
      console.log('response', response)
      setAssetList(response.data)
      const balance = response.data.map(item => item.balance / (10 ** item.contract_decimals) * item.quote_rate).reduce((acc, curr) => acc + curr, 0)
      setSum(balance)
    } catch (error) {
      setAssetList([])
      console.log(`Asset [getTokkenBalance]`, error)
    }
  }

  useEffect(() => {
    getTokenBalance()
  }, [account, chainId, globalAdrs])

  const icon = {
    cursor: 'pointer',
    transform: 'rotate(540deg)',
    transition: 'all ease-in-out 0.7s'
  }
  const [isRotate, setIsRotate] = useState(false)
  const [trigger, setTrigger] = useState(0)

  const handleBtnClick = () => {
    getTokenBalance()
    setIsRotate(true)
    if (trigger === 0) {
      setTrigger(1)
    } else {
      setTrigger(0)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      if (isRotate === true) {
        setIsRotate(false)
      }
    }, 1001)
  }, [trigger])

  return (

    <div>
      <Row>
        {globalNickName === 'Create a Vault' ? (
          <Col className='d-flex justify-content-center align-items-center' md={{ offset: 3, size: 6 }} sm="12">
            <Card className='my-1 card-payment'>
              <CardHeader style={{ paddingBottom: '.3em' }}>
                <CardTitle>Dashboard</CardTitle>
              </CardHeader>
              <hr />
              <Col style={{ fontSize: '2em' }} className='d-flex flex-row justify-content-center align-items-center'>
                <NavLink href='manager' >
                  CREATE A VAULT <BsArrowRightCircle size={35} />
                </NavLink>
              </Col>
            </Card>
          </Col>
        ) : (
          <Col>
            {/* <Card className='my-1'>
            <CardHeader className='d-flex justify-content-start my-0 pb-0'>
            <Avatar className='mx-1' title='wave graph' content='1' size='sm' color='warning' onClick={() => setChart(true)} />
              <Avatar className='mx-1' title='line graph' content='2' size='sm' color='info' onClick={() => setChart(false)} />
            <Badge className='mx-1' color='primary' pill href='#' onClick={() => setChart(true)}>
                <span className='align-middle'>.</span>
              </Badge>
            <Badge className='mx-1' color='warning' pill href='#' onClick={() => setChart(false)}>
                <span className='align-middle'>.</span>
              </Badge>
            </CardHeader>
            <CardBody>
              {chart ? <MainChart2 /> : <MainChart1 />}
            </CardBody>
            </Card> */}
            <Row>
              <Col>
                <Card className='mb-0'>
                  <CardHeader>
                    <CardTitle className='d-flex flex-row justify-content-between align-items-center text-truncate' style={{ width: '100%', fontSize: '3.5em' }}>
                      $ {sum.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                      <RiRefreshLine title='Refresh'
                        style={isRotate ? icon : { cursor: 'pointer' }}
                        size={50}
                        onClick={handleBtnClick}
                      />
                      {/* <RefreshButton /> */}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col md='4' className='mt-1'>
                <Assests trigger={trigger} />
              </Col>
              <Col md='8' className='mt-1'>
                <RecentTrans trigger={trigger} />
              </Col>
            </Row>
            <Row>
              <Col>
                <SegaDisplay />
              </Col>
            </Row>
          </Col>
        )}
      </Row>
      <LoginModal openloginmodal={loginModal} disconnect={disconnect} />
    </div>
  )
}

// export default Home

const mapStateToProps = (state) => ({
  globalAdrs: state.appData.globalAdrs,
  globalNickName: state.appData.globalNickName,
  globalVaultFlag: state.appData.globalVaultFlag
})
const mapDispatchToProp = dispatch => ({ dispatch })
export default connect(mapStateToProps, mapDispatchToProp)(Home)