import { Card, CardHeader, CardTitle, CardBody, CardFooter, Button, Row, Col, CardText, CardSubtitle, Tooltip, NavLink } from 'reactstrap'
import { BsArrowDown, BsArrowRightCircle, BsSafe2 } from 'react-icons/bs'
import { FaRegCopy } from 'react-icons/fa'
import { GoLinkExternal } from 'react-icons/go'
import { connect } from 'react-redux'
import Avatar from '@components/avatar'
import qrcode from './qrcode_localhost.png'
import Icon from 'react-crypto-icons'
import { toast } from 'react-toastify'
import { ArrowDownCircle, ArrowRight, ArrowRightCircle, Clipboard, Info } from "react-feather"
import { useState, Fragment, useEffect } from 'react'
import { useEthers, shortenIfAddress, getExplorerAddressLink } from '@usedapp/core'
import helperConfig from '../../helper-config.json'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import 'animate.css'
import LoginModal from '../LoginModal'
import * as AppData from '../../redux/actions/cookies/appDataType'
import { SiWebmoney } from 'react-icons/si'

const Receive = ({ globalAdrs, globalNickName, globalVaultFlag, dispatch }) => {

  const { account, chainId } = useEthers()

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

  // const [curr_acc, setCurr_Acc] = useState(account)
  // const [vaultList, setVaultList] = useState([])
  // const getVaultListFromLocal = () => {
  //   const getdata = JSON.parse(localStorage.getItem('vaultdata'))
  //   const valueData = getdata && getdata.filter(a => a.show === true && a.network === chainId && a.owner === account)
  //   const vaultlist = valueData && valueData.map((vault, index) => ({ value: index, adrs: vault.address, name: vault.name }))
  //   console.log('vaultlist', vaultlist)
  //   if (vaultlist === null || vaultlist === [] || vaultlist.length === 0) {
  //     dispatch(AppData.globalAdrs(''))
  //     dispatch(AppData.globalNickName('Create a Vault'))
  //   } else {
  //     console.log('vaultlist', vaultlist)
  //     dispatch(AppData.globalAdrs(vaultlist[0].adrs))
  //     dispatch(AppData.globalNickName(vaultlist[0].name))
  //     // setVaultList(vaultlist)
  //   }
  // }
  // useEffect(() => {
  //   if (globalNickName === '' || globalNickName === 'Create a Vault') {
  //     getVaultListFromLocal()
  //     // dispatch(AppData.globalNickName(''))
  //   } else if (curr_acc !== account) {
  //     setCurr_Acc(account)
  //     getVaultListFromLocal()
  //   }
  // }, [account, globalVaultFlag])

  const [curt_account, setCurt_account] = useState(account)
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

  useEffect(() => {
    if (chainId !== undefined && curt_chain !== undefined && chainId !== curt_chain) {
      handleAjax()
    }
    if (curt_account !== undefined && account !== undefined && account !== curt_account) {
      handleAccount()
      setCurt_account(account)
    }
  }, [chainId, account])

  const [is_sega, setis_sega] = useState()
  const [segaList, setSegaList] = useState([])
  const getSegaListFromLocal = () => {
    const getdata = JSON.parse(localStorage.getItem('segadata'))
    const valueData = getdata && getdata.filter(a => a.show === true && a.network === chainId && a.owner === account)
    const segalist = valueData && valueData.map((sega, index) => ({ value: index, adrs: sega.address, name: sega.name, ofvault: sega.vault }))
    setSegaList(segalist)
  }

  useEffect(() => {
    getSegaListFromLocal()
    const segaadrs = segaList && segaList.find(i => i.adrs === globalAdrs)
    // console.log('segaadrs', segaadrs)
    if (segaadrs === undefined) {
      setis_sega(false)
    } else {
      setis_sega(true)
    }
  }, [globalAdrs, account, chainId, is_sega])

  const logos = [
    {
      icon: <BsSafe2 size={25} />,
      color: 'primary'
    },
    {
      icon: <SiWebmoney size={25} />,
      color: 'primary'
    }
  ]

  const cardStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }

  const notifySuccess = () => toast.success(<SuccessToast />, { hideProgressBar: true })
  const copy = async () => {
    // await navigator.clipboard.writeText(globalAdrs)
    // notifySuccess()
    const textField = document.createElement('textarea')
    textField.innerText = globalAdrs
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()

    notifySuccess()
  }

  const SuccessToast = () => (
    <Fragment>
      <div className='toastify-header'>
        <div className='title-wrapper'>
          <Avatar size='md' color='success' icon={<Clipboard size={12} />} />
          <h3 className='toast-title'>Copied to Clipboard!</h3>
        </div>
      </div>
    </Fragment>
  )

  const [tooltipOpen, setTooltipOpen] = useState(false)

  const pathname = `https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl= ${globalAdrs}`

  const networkIcon = chainId ? helperConfig.network[chainId].icon : "Not Connected"
  const networkName = chainId ? helperConfig.network[chainId].name : "Not Connected"
  const backgroundChange = { backgroundColor: networkName === "BSC testnet" ? '#cc9b00' : networkName === "Polygon Network" ? '#8146e4' : networkName === "Ethereum" ? '#4559f4' : networkName === "Kovan" ? '#6435c9' : networkName === "BSC Mainet" ? '#cc9b00' : networkName === "Polygon Mumbai" ? '#140035' : null }
  // const backgroundChange = { backgroundColor: networkC.name === 'BSC Mainet' ? '#cc9b01' : networkC.name === 'Etherum' ? '#627eea' : networkC.name === 'Optimism' ? '#ff0420' : networkC.name === 'Arbitrum' ? '#2d374b' : '#8247e5' }

  const [qrcode, setQrcode] = useState(false)
  const handleQrcode = () => setQrcode(!qrcode)

  return (
    <>
      <Col style={cardStyle} md={{ offset: 3, size: 6 }} lg={{ offset: 3, size: 6 }} sm="12">
        <Card style={{ minWidth: '35vw', minHeight: '55vh' }} className='my-1 card-payment' >
          <CardHeader style={{ paddingBottom: '.1em' }}>
            <CardTitle style={{ color: '#1919d2' }}>Receive Assests</CardTitle>
          </CardHeader>
          {globalNickName === 'Create a Vault' ? (
            <>
              <hr />
              <Col style={{ fontSize: '2em' }} className='d-flex flex-row justify-content-center align-items-center'>
                <NavLink href='/manager' >
                  CREATE A VAULT FIRST <BsArrowRightCircle size={35} />
                </NavLink>
              </Col>
            </>
          ) : (
            <>
              <CardBody className='p-1' >
                <Row>
                  <Col className='py-1' style={{ ...backgroundChange, textAlign: 'center', height: '100%' }}>
                    <CardText style={{ color: 'white' }}><Icon className='mr-1' name={networkIcon} size={20} />Only send {networkName} assets to this Safe</CardText>
                  </Col>
                </Row>
                <Row className='d-flex flex-column justify-content-center align-items-center'>
                  <Col className='mt-1 mb-0 text-center '>
                    {is_sega ? (
                      <Avatar className='m-1' size='lg' color={logos[1].color} icon={logos[1].icon} />
                    ) : (
                      <Avatar className='m-1' size='lg' color={logos[0].color} icon={logos[0].icon} />
                    )}
                    {/* <Avatar size='lg' color='light-danger' icon={<BsSafe2 size={25} />} /> */}
                  </Col>
                  <Col className='mb-1'>
                    <h3 style={{ color: '#1919d2' }} className='text-center mb-0'>{globalNickName}</h3>
                    {/* <CardTitle style={{ textAlign: 'center', marginBottom: 0 }}><strong>{globalNickName}</strong></CardTitle> */}
                  </Col>
                  <Col className='text-center'>
                    {/* <CardSubtitle style={{ color: 'gray' }} > <strong>{shortenIfAddress(account)}</strong></CardSubtitle> */}
                    {/* <CardSubtitle style={{ color: 'gray', fontSize: '1em' }} ><strong>{globalAdrs}</strong></CardSubtitle> */}
                    <h6 className='font-weight-bold '>{globalAdrs}</h6>
                  </Col>
                  <Col>
                    <span className='d-flex flex-row justify-content-center'>
                      <FaRegCopy style={{ cursor: 'pointer' }} className='m-1' color='grey' size={25} onClick={copy} />
                      <a href={getExplorerAddressLink(globalAdrs, chainId)} target='_blank'><GoLinkExternal className='m-1' color='grey' size={25} /></a>
                    </span>
                  </Col>
                  <Col className='text-center '>
                    <img src={pathname} alt='QR CODE' width='200' height='200' />
                  </Col>
                </Row>
                <Col style={{ textAlign: 'right' }}>
                  <Avatar className='animate__animated animate__flash animate__delay-1s' size='sm' id='DepositInfo' color='primary' icon={<Info />} />
                  <Tooltip
                    placement='right'
                    isOpen={tooltipOpen}
                    target='DepositInfo'
                    toggle={() => setTooltipOpen(!tooltipOpen)}
                  >
                    <CardText>This is the address of your Safe. Deposit funds by scanning the QR code or
                      copying the above address below. Only send {networkName} assets to this address.
                    </CardText>
                  </Tooltip>
                </Col>
              </CardBody>
            </>
          )}
        </Card>
      </Col>
      <LoginModal openloginmodal={loginModal} disconnect={disconnect} />
    </>

  )
}

const mapStateToProps = (state) => ({
  globalAdrs: state.appData.globalAdrs,
  globalNickName: state.appData.globalNickName,
  globalVaultFlag: state.appData.globalVaultFlag
})
const mapDispatchToProp = dispatch => ({ dispatch })
export default connect(mapStateToProps, mapDispatchToProp)(Receive)