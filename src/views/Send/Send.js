import Cleave from 'cleave.js/react'
import Avatar from '@components/avatar'
import Select, { components } from 'react-select'
import { selectThemeColors } from '@utils'
import { FaRegCopy } from 'react-icons/fa'
import { GoLinkExternal } from 'react-icons/go'
import { BsArrowDown, BsSafe2 } from 'react-icons/bs'
import { SiWebmoney } from 'react-icons/si'
import { IoQrCodeOutline } from 'react-icons/io5'
import { Card, CardHeader, CardTitle, CardBody, CardFooter, Form, FormGroup, Label, Input, Button, Row, Col, CardText, NavLink, Alert } from 'reactstrap'
import Badge from 'reactstrap/lib/Badge'
import Icon from 'react-crypto-icons'
import { toast } from 'react-toastify'
import { Clipboard } from "react-feather"
import { connect } from 'react-redux'
import { useState, Fragment, useEffect } from 'react'
import { useEthers, getExplorerAddressLink, shortenIfAddress, CurrencyValue, Token, useEtherBalance, useTokenBalance, getExplorerTransactionLink } from '@usedapp/core'
import axios from 'axios'
import helperConfig from '../../helper-config.json'
import { constants, utils, BigNumber } from "ethers"
import { useTokens } from '../../utility/hooks/useTokens'
import { useTransfers } from '../../utility/hooks/useTransfers'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { isAddress } from 'ethers/lib/utils'

const Send = ({ globalAdrs, globalNickName }) => {

  const { account, chainId } = useEthers()

  const isConnected = account !== undefined

  const disconnect = () => {
    window.location.href = '/login'
  }

  const [curt_chain, setCurt_chain] = useState(chainId)
  const MySwal = withReactContent(Swal)

  const netchange = async (netid) => {
    await ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: `${netid}` }] })
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

  useEffect(() => {
    if (chainId !== curt_chain) {
      handleAjax()
    }
  }, [chainId])

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
    console.log('segaadrs', segaadrs)
    if (segaadrs === undefined) {
      setis_sega(false)
    } else {
      setis_sega(true)
    }
  }, [globalAdrs, account, chainId, is_sega])

  console.log('is_sega', is_sega)

  const cardStyle = {
    display: 'flex',
    justifyContent: 'center',
    alighnItems: 'center'
  }

  // const [text, setText] = useState(globalAdrs)
  const notifySuccess = () => toast.success(<SuccessToast />, { hideProgressBar: true })
  const copy = async () => {
    await navigator.clipboard.writeText(globalAdrs)
    notifySuccess()
  }

  const SuccessToast = () => (
    <Fragment>
      <div className='toastify-header'>
        <div className='title-wrapper'>
          <Avatar size='sm' color='success' icon={<Clipboard size={12} />} />
          <h6 className='toast-title'>Copied to Clipboard!</h6>
        </div>
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

  const fromAddress = globalAdrs
  const [toAddress, setToAddress] = useState('')
  const handleToAddressInput = (e) => {
    const newAddress = event.target.value
    if (isAddress(newAddress)) {
      setToAddress(newAddress)
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

  // const tokenList = [native].concat(erc20List).concat(apiList)
  // const tokenList = [nativeToken.ticker].concat(erc20List).concat(apiList).concat(native)
  // const tokenList = [nativeToken.ticker].concat(erc20List)
  // const tokenList = [nativeToken.ticker].concat(erc20List).concat(apiList)

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

  const [amount, setAmount] = useState('0')
  const handleInputAmount = (event) => {
    // const newAmount = (event.target.value) === "" ? "0" : event.target.value
    let newAmount
    if (event.target.value === '') {
      newAmount = '0'
    } else {
      newAmount = event.target.value
    }
    if (newAmount) {
      setAmount(newAmount.toString())
    } else {
      setAmount(0)
    }
    console.log("newAmt", newAmount)
  }

  const fromAccNativeBalance = useEtherBalance(fromAddress)
  const fromAccTokenBalance = useTokenBalance(tokenAddress, fromAddress)

  const nativeBal = new CurrencyValue(nativeToken, fromAccNativeBalance ? fromAccNativeBalance : BigNumber.from(0))
  const ercTokenBal = new CurrencyValue(ercToken, fromAccTokenBalance ? fromAccTokenBalance : BigNumber.from(0))

  const decimals = usingNative ? nativeToken.decimals : ercToken.decimals
  // const decimals = usingNative ? nativeToken.decimals : decimal
  const bigNumAmount = haveToken ? utils.parseUnits(amount, decimals) : BigNumber.from(0)

  const {
    vaultTransferNative,
    vaultTransferErc,
    recallNative,
    recallErc,
    segaTransferNative,
    segaTransferErc,
    segaApproveErc,
    TransferState
  } = useTransfers(fromAddress, toAddress)

  const handleVaultSend = () => {
    console.log("handleVaultSend")
    if (usingNative) {
      vaultTransferNative(toAddress.toString(), bigNumAmount)
    } else {
      vaultTransferErc(toAddress.toString(), tokenAddress.toString(), bigNumAmount)
    }
  }

  const handleSegaTransfer = () => {
    console.log("handleSegaTransfer")
    if (usingNative) {
      segaTransferNative(toAddress.toString(), bigNumAmount)
    } else {
      segaTransferErc(toAddress.toString(), tokenAddress.toString(), bigNumAmount)
    }
  }

  const handleSegaApprove = () => {
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

  // const [txnID, setTxnID] = useState("")
  // const [showTxnMiningSnack, setShowTxnMiningSnack] = useState(false)
  // const [showTxnSuccessSnack, setTxnSuccessSnack] = useState(false)
  // const handleTxnSnackClose = () => {
  //   console.log("Txn In Progress / Completed:", getExplorerTransactionLink(txnID, Number(chainId)))
  //   setShowTxnMiningSnack(false)
  //   setTxnSuccessSnack(false)
  // }

  // useEffect(() => {
  //   if (TransferState.status === "Mining") {
  //     const tx_id = String(TransferState.transaction?.hash)
  //     setTxnID(tx_id.toString())
  //     console.log("***Handle TX_ID: ", TransferState.status, tx_id)
  //     setShowTxnMiningSnack(true)
  //   }
  //   if (TransferState.status === "Success") { setTxnSuccessSnack(true) }
  // }, [TransferState])

  const logos = [
    {
      icon: <BsSafe2 size={25} />,
      color: 'light-danger'
    },
    {
      icon: <SiWebmoney size={25} />,
      color: 'light-danger'
    }
  ]

  const networkIcon = chainId ? helperConfig.network[chainId].icon : "Not Connected"
  const networkName = chainId ? helperConfig.network[chainId].name : "Not Connected"
  const backgroundChange = { backgroundColor: networkName === "BSC testnet" ? '#cc9b00' : networkName === "Polygon Network" ? '#8146e4' : networkName === "Ethereum" ? '#4559f4' : networkName === "Kovan" ? '#6435c9' : networkName === "BSC Mainet" ? '#cc9b00' : networkName === "Polygon Mumbai" ? '#140035' : null }
  return (
    <>
      {isConnected ? (<Col style={cardStyle} md={{ offset: 3, size: 6 }} sm="12">
        <Card className='my-1 card-payment'>
          <CardHeader style={{ paddingBottom: '.3em' }}>
            <CardTitle>Send Funds</CardTitle>
          </CardHeader>
          <hr />
          <CardBody className='p-1'>
            <Row>
              <Col className='py-1' style={{ ...backgroundChange, textAlign: 'center', height: '100%' }}>
                <CardText style={{ color: 'white' }}><Icon className='mr-1' name={networkIcon} size={20} />Only send to {networkName} address</CardText>
              </Col>
            </Row>
            {globalNickName === 'Create a Vault' ? (
              <Col style={{ fontSize: '2em' }} className='my-1 d-flex flex-row justify-content-center align-items-center'>
                <NavLink href='/manager' >
                  CREATE A VAULT
                </NavLink>
              </Col>
            ) : (
              <>
                <Row className='d-flex flex-column'>
                  <Col className='d-flex flex-row py-1'>
                    {is_sega ? (
                      <Avatar className='mr-1' size='lg' color={logos[1].color} icon={logos[1].icon} />
                    ) : (
                      <Avatar className='mr-1' size='lg' color={logos[0].color} icon={logos[0].icon} />
                    )}
                    <CardTitle className='my-1 '>{globalNickName}</CardTitle>
                  </Col>
                  <Col className='d-flex flex-column justify-content-start'>
                    <Col className='d-flex flex-row '>
                      <p style={{ color: 'gray' }}>{shortenIfAddress(globalAdrs)}</p>
                      <Col>
                        <FaRegCopy style={{ cursor: 'pointer' }} className='mx-1' color='grey' size={15} onClick={copy} />
                        <a href={getExplorerAddressLink(globalAdrs, chainId)} target='_blank'><GoLinkExternal color='grey' size={15} /></a>
                      </Col>
                    </Col>
                    <Badge style={{ width: '130px' }} color='secondary'>Balance: <strong>0 MATIC</strong></Badge>
                  </Col>
                </Row>
                <Row className='mt-1' style={{ display: 'flex', flexDirection: 'row' }}>
                  <Col md='1' className='mx-1'><BsArrowDown size={30} /></Col>
                  <Col>
                    <hr />
                  </Col>
                </Row>
                <Form className='form mt-2' onSubmit={e => e.preventDefault()}>
                  <Row>
                    <Col sm='12'>
                      <FormGroup className='mb-2'>
                        <Label for='recepient' style={{ fontSize: '1.2em' }}>Recepient</Label>
                        <Row>
                          <Col xs='8' sm='8' md='10'>
                            <Input
                              className='form-control'
                              id='recepient'
                              onChange={handleToAddressInput}
                            />
                          </Col>
                          <Col>
                            <IoQrCodeOutline href='#' size={30} />
                          </Col>
                        </Row>
                      </FormGroup>
                    </Col>
                    <Col style={{ fontSize: '1.2em' }} className='mb-1' md='12' >
                      <Select
                        className='react-select'
                        classNamePrefix='select'
                        defaultValue=''
                        placeholder='Select an asset...'
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
                        <Col className='d-flex flex-row justify-content-between'>
                          <Label for='amount' style={{ fontSize: '1.2em' }}>Amount</Label>
                          {usingNative ? (
                            <span>Balance: {nativeBal.format()}</span>
                          ) : (
                            <span>Balance: {ercTokenBal.format()}</span>
                          )}
                          <a href='#' style={{ color: 'red' }}> Send Max</a>
                          {/* <Badge style={{ fontSize: ".9rem" }} color="primary" href='/home' pill>Send Max</Badge> */}
                        </Col>
                        <Col style={{ textAlign: 'end' }}>
                        </Col>
                        <Input placeholder='Amount' id='amount' onChange={handleInputAmount} />
                      </FormGroup>
                    </Col>
                    <Col>
                    </Col>
                  </Row>
                </Form>
              </>
            )}
          </CardBody>
          {globalNickName !== 'Create a Vault' ? (<CardFooter>
            <Row >
              {is_sega ? (
                <>
                  <Col>
                    <Button.Ripple color='primary' onClick={handleVaultSend} block >
                      Send
                    </Button.Ripple>
                  </Col>
                  <Col>
                    <Button.Ripple color='primary' onClick={handleSegaApprove} block>
                      Approve ERC
                    </Button.Ripple>
                  </Col>
                  <Col>
                    <Button.Ripple onClick={handleLog}>TestLog</Button.Ripple>
                  </Col>
                </>
              ) : (
                <Col>
                  <Button.Ripple color='primary' onClick={handleSegaTransfer} block>
                    Send
                  </Button.Ripple>
                  <Button.Ripple onClick={handleLog}>TestLog</Button.Ripple>
                </Col>
              )}
            </Row>
            {/* <Col className='d-flex flex-column justify-content-center'>
              <Alert open={showTxnMiningSnack} onClose={handleTxnSnackClose} color="info">
                <div>Transaction in Progress- Txn ID : &emsp; </div>
                <a href={getExplorerTransactionLink(txnID, chainId ? chainId : 1)}
                  target="_blank" rel="noreferrer">
                  {(txnID)} </a>
              </Alert>
              <Alert open={showTxnSuccessSnack} onClose={handleTxnSnackClose} color="success">
                <div>Transaction Completed - Txn ID :</div>
                <a href={getExplorerTransactionLink(txnID, chainId ? chainId : 1)}
                  target="_blank" rel="noreferrer">
                  {(txnID)} </a>
              </Alert>
            </Col> */}
          </CardFooter>) : null}
        </Card>
      </Col>) : disconnect()}
    </>
  )
}

// export default Send
const mapStateToProps = (state) => ({
  globalAdrs: state.appData.globalAdrs,
  globalNickName: state.appData.globalNickName
})
// const mapDispatchToProp = dispatch => ({ dispatch })
export default connect(mapStateToProps, null)(Send)