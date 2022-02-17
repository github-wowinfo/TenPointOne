import Cleave from 'cleave.js/react'
import Avatar from '@components/avatar'
import Select, { components } from 'react-select'
import { selectThemeColors } from '@utils'
import { FaRegCopy } from 'react-icons/fa'
import { GoLinkExternal } from 'react-icons/go'
import { BsArrowDown, BsArrowRightCircle, BsSafe2 } from 'react-icons/bs'
import { SiWebmoney } from 'react-icons/si'
import { IoQrCodeOutline } from 'react-icons/io5'
import { Card, CardHeader, CardTitle, CardBody, CardFooter, Form, FormGroup, Label, Input, Button, Row, Col, CardText, NavLink, Alert } from 'reactstrap'
import Badge from 'reactstrap/lib/Badge'
import Icon from 'react-crypto-icons'
import { toast } from 'react-toastify'
import { Clipboard, XCircle } from "react-feather"
import { connect } from 'react-redux'
import React, { useState, Fragment, useEffect } from 'react'
import { useEthers, getExplorerAddressLink, shortenIfAddress, CurrencyValue, Token, useEtherBalance, useTokenBalance, getExplorerTransactionLink, shortenIfTransactionHash } from '@usedapp/core'
import axios from 'axios'
import helperConfig from '../../helper-config.json'
import { constants, utils, BigNumber } from "ethers"
import { useTokens } from '../../utility/hooks/useTokens'
import { useTransfers } from '../../utility/hooks/useTransfers'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { isAddress } from 'ethers/lib/utils'
import LoginModal from '../LoginModal'
import * as AppData from '../../redux/actions/cookies/appDataType'
import QrReader from 'react-qr-reader'
import { FiXCircle } from 'react-icons/fi'

const Send = ({ globalAdrs, globalNickName, globalVaultFlag, dispatch }) => {

  const { account, chainId } = useEthers()

  const isConnected = account !== undefined

  const [loginModal, setLoginModal] = useState(false)
  const disconnect = () => {
    window.location.href = '/home'
    setLoginModal(!loginModal)
  }

  // console.log('loginModal', loginModal)

  useEffect(() => {
    if (!isConnected) {
      setLoginModal(!loginModal)
    }
  }, [account, chainId])

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

  // console.log('curt_account', curt_account)

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

  // console.log('is_sega', is_sega)

  const cardStyle = {
    display: 'flex',
    justifyContent: 'center',
    alighnItems: 'center'
  }

  // const [text, setText] = useState(globalAdrs)
  const notifySuccess = () => toast.success(<SuccessToast />, { hideProgressBar: false })
  const copy = async () => {
    // let text
    // if (navigator.clipboard) {
    //   text = await navigator.clipboard.writeText(globalAdrs)
    //   notifySuccess()
    // } else {
    //   text = window.clipboardData.setData('text/plain')
    // }
    // console.log('Got pasted text: ', text)

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

  const notifyError = (emsg) => toast.error(<ErrorToast msg={emsg} />, { hideProgressBar: false })
  const ErrorToast = ({ msg }) => (
    <Fragment>
      <div className='toastify-header'>
        <div className='title-wrapper'>
          <Avatar size='md' color='danger' icon={<FiXCircle size={12} />} />
          <h3 className='toast-title'>Error !</h3>
        </div>
      </div>
      <div className='toastify-body'>
        <span style={{ fontSize: '1.5em' }} role='img' aria-label='toast-text' >
          {msg}
        </span>
      </div>
    </Fragment>
  )

  const [assetList, setAssetList] = useState([])

  const getTokenBalance = async () => {
    try {
      // const response = await axios.get(`https://api.unmarshal.com/v1/matic/address/0x989923d33bE0612680064Dc7223a9f292C89A538/assets?auth_key=CE2OvLT9dk2YgYAYfb3jR1NqCGWGtdRd1eoikUYs`)
      const response = await axios.get(`https://api.unmarshal.com/v1/${helperConfig.unmarshal[chainId]}/address/${globalAdrs}/assets?auth_key=CE2OvLT9dk2YgYAYfb3jR1NqCGWGtdRd1eoikUYs`)
      setAssetList(response.data)
    } catch (error) {
      console.log(`Asset [getTokkenBalance]`, error)
    }
  }

  useEffect(() => {
    getTokenBalance()
  }, [globalAdrs, account, chainId])

  const asset = assetList.map((item) => ({ label: item.contract_ticker_symbol, img: item.logo_url, decimal: item.contract_decimals, balance: item.balance, symbol: item.contract_ticker_symbol, adrs: item.contract_address }))

  const data = asset

  const addDefaultSrc = (ev) => {
    ev.target.src = require(`@src/assets/images/logo/question.jpg`).default
  }

  const OptionComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <img src={data.img} alt='logo' style={{ height: 40, width: 40, marginRight: 10 }} onError={addDefaultSrc} />
        {data.label}
      </components.Option>
    )
  }

  const RISK = {
    img: `@src/assets/images/logo/question.jpg`,
    label: 'RISK',
    symbol: 'RISK'
  }

  const LINK = {
    img: `@src/assets/images/logo/question.jpg`,
    label: 'LINK',
    symbol: 'LINK'
  }

  const USDC = {
    img: `@src/assets/images/logo/question.jpg`,
    label: 'USDC',
    symbol: 'USDC'
  }

  const [adrs_flag, setAdrs_flag] = useState(false)
  const fromAddress = globalAdrs
  const [toAddress, setToAddress] = useState('')
  const handleToAddressInput = (e) => {
    const newAddress = e.target.value
    if (isAddress(newAddress)) {
      setToAddress(newAddress)
      setAdrs_flag(true)
      console.log("Setting To Address:", newAddress)
    }
  }

  const [tokenTicker, setTokenTicker] = useState("")
  const [assetAdrs, setAssetAdrs] = useState(constants.AddressZero)
  // const [decimal, setDecimal] = useState()
  // const [balance, setBalance] = useState()

  const { TokenZero,
    tokenAddress,
    getToken,
    getNative } = useTokens(tokenTicker, assetAdrs)

  const nativeToken = getNative()

  const native = {
    img: `@src/assets/images/logo/question.jpg`,
    label: nativeToken.name,
    symbol: nativeToken.ticker
  }

  const apiList = data
  const erc20List = [RISK, LINK, USDC]

  //list population according to chainId
  // console.log('asset list', helperConfig.testnetworks.includes(chainId))
  // console.log('asset list', helperConfig.testnetworks.includes(chainId))
  let tokenList
  helperConfig.testnetworks.includes(chainId) ? tokenList = [native].concat(erc20List).concat(apiList) : tokenList = apiList

  const curr_acc_balance = useEtherBalance(fromAddress)
  const acc_balance = new CurrencyValue(nativeToken, curr_acc_balance ? curr_acc_balance : BigNumber.from(0))

  // let curr_acc_token
  // let curr_acc_balance
  // let acc_balance
  // if (helperConfig.testnetworks.includes(chainId)) {
  //   curr_acc_token = native
  //   curr_acc_balance = useEtherBalance(fromAddress)
  //   acc_balance = new CurrencyValue(nativeToken, curr_acc_balance ? curr_acc_balance : BigNumber.from(0))
  // }
  // console.log('curr_acc_token', curr_acc_token)

  const [haveToken, setHaveToken] = useState(0)
  const [usingNative, setUsingNative] = useState(0)
  const handleSetTokenTicker = (data) => {
    setUsingNative(0)
    console.log("zzz1")
    setHaveToken(0)
    const _tokenTicker = data.symbol
    const _tokenTickerAdrs = data.adrs
    // const _tokenTickerDecimal = data.decimal
    // const _tokenTickerBal = data.balance
    console.log("Got Token Name:", _tokenTicker)
    console.log("Token List:", tokenList)
    // console.log(tokenList.indexOf(_tokenTicker))
    console.log(tokenList.indexOf(tokenList.find(a => a.symbol === _tokenTicker)))
    if (tokenList.indexOf(tokenList.find(a => a.symbol === _tokenTicker)) !== -1) {
      console.log(_tokenTicker)
      setTokenTicker(_tokenTicker)
      setAssetAdrs(_tokenTickerAdrs)
      // setDecimal(_tokenTickerDecimal)
      // setBalance(_tokenTickerBal)
    } else {
      setTokenTicker(TokenZero.ticker)
    }
  }

  const [amount, setAmount] = useState('0')
  const [amt_flag, setAmt_flag] = useState(false)

  const ercToken = getToken()
  // console.log('erctoken', ercToken.name)
  useEffect(() => {
    if (tokenTicker === nativeToken.ticker) {
      setUsingNative(1)
      setHaveToken(1)
    }
    if (ercToken !== TokenZero.name) {
      setHaveToken(1)
    }
  }, [ercToken, tokenTicker, nativeToken, TokenZero])

  const fromAccNativeBalance = useEtherBalance(fromAddress)
  const fromAccTokenBalance = useTokenBalance(tokenAddress, fromAddress)

  const nativeBal = new CurrencyValue(nativeToken, fromAccNativeBalance ? fromAccNativeBalance : BigNumber.from(0))
  const ercTokenBal = new CurrencyValue(ercToken, fromAccTokenBalance ? fromAccTokenBalance : BigNumber.from(0))

  const decimals = usingNative ? nativeToken.decimals : ercToken.decimals
  // const decimals = usingNative ? nativeToken.decimals : decimal
  const bigNumAmount = haveToken ? utils.parseUnits(amount.toString(), decimals) : BigNumber.from(0)

  const {
    vaultTransferNative,
    vaultTransferErc,
    recallNative,
    recallErc,
    segaTransferNative,
    segaTransferErc,
    segaApproveErc,
    TransferState
  } = useTransfers(fromAddress, fromAddress)

  //SNACKBAR FOR GENERAL TRANSACTIONS
  const [txnID, setTxnID] = useState("")
  const [showTxnMiningSnack, setShowTxnMiningSnack] = useState(false)
  const [showTxnSuccessSnack, setTxnSuccessSnack] = useState(false)

  const handleTxnSnackClose = () => {
    console.log("Txn In Progress / Completed:", getExplorerTransactionLink(txnID, Number(chainId)))
    setShowTxnMiningSnack(false)
    setTxnSuccessSnack(false)
  }

  const handleVaultSend = () => {
    handleTxnSnackClose()
    console.log("handleVaultSend")
    if (usingNative) {
      vaultTransferNative(toAddress.toString(), bigNumAmount)
    } else {
      vaultTransferErc(toAddress.toString(), tokenAddress.toString(), bigNumAmount)
    }
  }

  const handleSegaTransfer = () => {
    handleTxnSnackClose()
    console.log("handleSegaTransfer")
    if (usingNative) {
      segaTransferNative(toAddress.toString(), bigNumAmount)
    } else {
      segaTransferErc(toAddress.toString(), tokenAddress.toString(), bigNumAmount)
    }
  }

  const handleSegaApprove = () => {
    handleTxnSnackClose()
    console.log("handleSegaApprove")
    segaApproveErc(toAddress.toString(), tokenAddress.toString(), bigNumAmount)
  }

  const handleLog = () => {
    const y = new CurrencyValue(nativeToken, BigNumber.from("100000000000000000000"))
    // const z = new CurrencyValue(ercToken, BigNumber.from("100000000000000000000"))
    console.log(y.format())
    // console.log(z.format())
    console.log(amount, decimals, haveToken)
    console.log("Amount:", amount)
    console.log("Decimals:", decimals)
    console.log("BigNumAmt", utils.commify(bigNumAmount.toString()))
    console.log("Frm Address", fromAddress)
    // console.log("Vault", pVault)
    console.log("To Address", toAddress)
  }

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

  const [scanner_on, setScanner_on] = useState(false)
  const operScanner = () => {
    setScanner_on(true)
  }

  const [qr_result, setQr_result] = useState('')
  const handleScan = data => {
    if (data) {
      setQr_result(data)
      setScanner_on(false)
    }
  }
  const handleError = err => {
    setScanner_on(false)
    console.log(err)
  }

  const ScanQrcode = () => {
    console.log('clicked')
    return (
      <Fragment>
        <div>
          <QrReader delay={500} onError={handleError} onScan={handleScan} />
        </div>
      </Fragment>
    )
  }

  const native_bal = nativeBal.format()
  const erc20_bal = ercTokenBal.format()

  // let balance_max
  const [balance_max, setBalance_max] = useState("")
  const handleMax = () => {
    if (usingNative) {
      const n_bal = native_bal.split(" ")[0]
      const new_n_bal = (n_bal.replace(/,/g, '')) * 1
      setBalance_max(new_n_bal)
      // setBalance_max(native_bal.split(" ")[0])
    } else {
      const e_bal = erc20_bal.split(" ")[0]
      const new_e_bal = (e_bal.replace(/,/g, '')) * 1
      setBalance_max(new_e_bal)
      // setBalance_max(erc20_bal.split(" ")[0])
    }
    console.log('balance_max', balance_max)
  }

  const handleInputAmount = (event) => {
    // const newAmount = (event.target.value) === "" ? "0" : event.target.value
    let newAmount
    if (event.target.value === '') {
      newAmount = '0'
      setBalance_max('')
    } else {
      newAmount = event.target.value
      setBalance_max(newAmount)
    }
    if (newAmount) {
      setAmount(newAmount.toString())
    } else {
      setAmount(0)
    }
    console.log("newAmt", newAmount)
  }

  useEffect(() => {
    // console.log('TransferState', TransferState)
    if (TransferState.status === "Exception" || TransferState.status === "Fail") {
      notifyError(TransferState.errorMessage)
    }
    if (TransferState.status === "Mining") {
      const tx_id = String(TransferState.transaction?.hash)
      setTxnID(tx_id.toString())
      console.log("***Handle TX_ID: ", TransferState.status, tx_id)
      setShowTxnMiningSnack(true)
    }
    if (TransferState.status === "Success") {
      setTxnSuccessSnack(true)
      setBalance_max('')
      setAmount(0)
    }
  }, [TransferState])

  const style_no_vault = {
    minWidth: '30vw',
    minHeight: '55vh'
  }

  const networkIcon = chainId ? helperConfig.network[chainId].icon : "Not Connected"
  const networkName = chainId ? helperConfig.network[chainId].name : "Not Connected"
  const backgroundChange = { backgroundColor: networkName === "BSC testnet" ? '#cc9b00' : networkName === "Polygon Network" ? '#8146e4' : networkName === "Ethereum" ? '#4559f4' : networkName === "Kovan" ? '#6435c9' : networkName === "BSC Mainet" ? '#cc9b00' : networkName === "Polygon Mumbai" ? '#140035' : null }
  return (
    <>
      <Col style={cardStyle} md={{ offset: 3, size: 6 }} lg={{ offset: 3, size: 6 }} sm="12">
        <Card style={globalNickName === 'Create a Vault' ? null : style_no_vault} className='my-1 card-payment'>
          <CardHeader className='py-1'>
            <CardTitle style={{ color: '#1919d2' }}>Send Funds</CardTitle>
          </CardHeader>
          {/* <hr /> */}
          {globalNickName === 'Create a Vault' ? (
            <Col style={{ fontSize: '2em' }} className='d-flex flex-row justify-content-center align-items-center'>
              <NavLink href='/manager' >
                CREATE A VAULT <BsArrowRightCircle size={35} />
              </NavLink>
            </Col>
          ) : (
            <>
              <CardBody className='pt-0 px-1 pb-1'>
                <Row>
                  <Col className='py-1' style={{ ...backgroundChange, textAlign: 'center', height: '100%' }}>
                    <CardText style={{ color: 'white' }}><Icon className='mr-1' name={networkIcon} size={20} />Only send to {networkName} address</CardText>
                  </Col>
                </Row>
                <Row className='d-flex flex-column'>
                  <Col className='d-flex flex-column flex-sm-row pt-1 justify-content-evenly align-items-center'>
                    {is_sega ? (
                      <Avatar className='m-1' size='lg' color={logos[1].color} icon={logos[1].icon} />
                    ) : (
                      <Avatar className='m-1' size='lg' color={logos[0].color} icon={logos[0].icon} />
                    )}
                    <Col className='px-0 d-flex flex-column justify-content-start'>
                      <h3 style={{ color: '#1919d2' }} className='mt-1 mb-0'>{globalNickName}</h3>
                      <h6 className='font-weight-bold'>{shortenIfAddress(globalAdrs)}</h6>
                    </Col>
                    <Col className='d-flex flex-row justify-content-end'>
                      <FaRegCopy style={{ cursor: 'pointer' }} className='mx-1' color='grey' size={20} onClick={copy} />
                      <a href={getExplorerAddressLink(globalAdrs, chainId)} target='_blank'><GoLinkExternal color='grey' size={20} /></a>
                    </Col>
                  </Col>
                  {/* <Col className='d-flex flex-column justify-content-start'>
                    <Col className='d-flex flex-row '>
                      <p style={{ color: 'gray' }}>{shortenIfAddress(globalAdrs)}</p>
                      <Col>
                        <FaRegCopy style={{ cursor: 'pointer' }} className='mx-1' color='grey' size={15} onClick={copy} />
                        <a href={getExplorerAddressLink(globalAdrs, chainId)} target='_blank'><GoLinkExternal color='grey' size={15} /></a>
                      </Col>
                    </Col>
                    <Badge style={{ width: '100%' }} color='secondary'>Balance: <strong>{acc_balance && acc_balance.format()}</strong></Badge> */}
                  {/* {
                      usingNative ? (
                        <Badge style={{ width: '130px' }} color='secondary'>Balance: <strong>{acc_balance}</strong></Badge>
                      ) : (
                        <Badge style={{ width: '130px' }} color='secondary'>Balance: <strong>{ercTokenBal.format()}</strong></Badge>
                      ) 
                    */}
                  {/* <Badge style={{ width: '130px' }} color='secondary'>Balance: <strong>0 MATIC</strong></Badge> */}
                  {/* </Col> */}
                </Row>
                <Row className='mt-1 d-flex flex-row'>
                  <Col xs='1' sm='1' md='1' className='mx-1'><BsArrowDown size={30} /></Col>
                  <Col>
                    <hr />
                  </Col>
                </Row>
                {/* {scanner_on ? (
                  <>
                    <Col className='py-1'>
                      <ScanQrcode />
                    </Col>
                    <Col className='text-center'>
                      <Button.Ripple color='danger' onClick={() => {
                        setQr_result('')
                        setScanner_on(false)
                      }}>CLOSE</Button.Ripple>
                    </Col>
                  </>
                ) : null} */}
                <Form className='form mt-2' onSubmit={e => e.preventDefault()}>
                  <Row>
                    <Col sm='12'>
                      <FormGroup className='mb-2'>
                        <Label for='recepient' style={{ fontSize: '1.2em' }}>Recepient</Label>
                        <Row>
                          <Col>
                            {/* <Col xs='8' sm='8' md='10'> */}
                            <Input
                              className='form-control'
                              id='recepient'
                              placeholder="Enter receiver's address"
                              // value={qr_result !== "" ? qr_result : null}
                              onChange={handleToAddressInput}
                            />
                          </Col>
                          {/* <Col>
                            <IoQrCodeOutline onClick={operScanner} size={30} />
                          </Col> */}
                        </Row>
                      </FormGroup>
                    </Col>
                    <Col className='mb-1' md='12' >
                      <Label style={{ fontSize: '1.2em' }} for='selectasset'>Asset</Label>
                      <Select
                        // theme={selectThemeColors}
                        maxMenuHeight={250}
                        className='react-select'
                        classNamePrefix='select'
                        defaultValue=''
                        placeholder={<div style={{ color: '#c7c7cf' }}>Select asset to transfer</div>}
                        name='clear'
                        options={tokenList}
                        components={{
                          Option: OptionComponent
                        }}
                        onChange={handleSetTokenTicker}
                      />
                    </Col>
                    <Col sm='12'>
                      <FormGroup className='mb-1'>
                        <Col className='px-0 d-flex flex-row justify-content-between'>
                          <Label sm='3' md='3' lg='3' for='amount' className='px-0' style={{ fontSize: '1.2em' }}>Amount</Label>
                          {/* {console.log('nativeBal', nativeBal.format())}
                          {console.log('ercTokenBal', ercTokenBal.format())} */}
                          <Col sm='6' md='6' lg='6' className='d-flex align-items-center'>
                            {usingNative ? (
                              native_bal === '0 ERROR' ? null : (
                                <span>Balance: {native_bal}</span>
                              )) : (
                              erc20_bal === '0 ERROR' ? null : (
                                <span>Balance: {erc20_bal}</span>
                              ))}
                          </Col>
                          <h6 className='d-flex align-items-center' style={{ color: 'red', cursor: 'pointer' }} onClick={handleMax}> Send Max</h6>
                          {/* <Badge style={{ fontSize: ".9rem" }} color="primary" href='/home' pill>Send Max</Badge> */}
                        </Col>
                        <Input placeholder='Enter transfer amount' id='amount' value={balance_max} onChange={handleInputAmount} />
                      </FormGroup>
                    </Col>
                    <Col>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </>
          )}

          {globalNickName !== 'Create a Vault' ? (<CardFooter>
            <Row >
              {is_sega ? (
                <>
                  {adrs_flag && balance_max !== '' ? (
                    <>
                      <Col>
                        <Button.Ripple color='primary' onClick={handleSegaTransfer} block >
                          Send
                        </Button.Ripple>
                      </Col>
                      <Col>
                        <Button.Ripple color='primary' onClick={handleSegaApprove} block>
                          Approve ERC
                        </Button.Ripple>
                      </Col>
                      {/* <Col>
                        <Button.Ripple onClick={handleLog}>TestLog</Button.Ripple>
                      </Col> */}
                    </>
                  ) : (
                    <>
                      <Col>
                        <Button.Ripple color='primary' disabled block >
                          Send
                        </Button.Ripple>
                      </Col>
                      <Col>
                        <Button.Ripple color='primary' disabled block>
                          Approve ERC
                        </Button.Ripple>
                      </Col>
                      {/* <Col>
                        <Button.Ripple disabled >TestLog</Button.Ripple>
                      </Col> */}
                    </>
                  )}

                </>
              ) : (<>
                {adrs_flag && balance_max !== '' ? (
                  <Col className='text-center'>
                    <Button.Ripple color='primary' onClick={handleVaultSend}>
                      Send
                    </Button.Ripple>
                    {/* <Button.Ripple onClick={handleLog}>TestLog</Button.Ripple> */}
                  </Col>
                ) : (
                  <Col className='text-center'>
                    <Button.Ripple color='primary' disabled >
                      Send
                    </Button.Ripple>
                    {/* <Button.Ripple disabled>TestLog</Button.Ripple> */}
                  </Col>
                )}
              </>

              )}
            </Row>
          </CardFooter>) : null}
          <Col className='d-flex flex-column justify-content-center'>
            <Alert className='p-1' isOpen={showTxnMiningSnack} toggle={() => handleTxnSnackClose()} color="info">
              <div>Transaction in Progress- Txn ID : &emsp; </div>
              <a href={getExplorerTransactionLink(txnID, chainId ? chainId : 1)}
                target="_blank" rel="noreferrer">
                {shortenIfTransactionHash(txnID)} </a>
            </Alert>
            <Alert className='p-1' isOpen={showTxnSuccessSnack} toggle={() => handleTxnSnackClose()} color="success">
              <div>Transaction Completed - Txn ID :</div>
              <a href={getExplorerTransactionLink(txnID, chainId ? chainId : 1)}
                target="_blank" rel="noreferrer">
                {shortenIfTransactionHash(txnID)} </a>
            </Alert>
          </Col>
        </Card>
      </Col>
      <LoginModal openloginmodal={loginModal} disconnect={disconnect} />
    </>
  )
}

// export default Send
const mapStateToProps = (state) => ({
  globalAdrs: state.appData.globalAdrs,
  globalNickName: state.appData.globalNickName,
  globalVaultFlag: state.appData.globalVaultFlag
})
const mapDispatchToProp = dispatch => ({ dispatch })
export default connect(mapStateToProps, mapDispatchToProp)(Send)