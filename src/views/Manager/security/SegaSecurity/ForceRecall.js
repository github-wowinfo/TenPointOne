import { Fragment, useEffect, useState } from 'react'
import { BsSafe2, BsArrowDown } from 'react-icons/bs'
import Select, { components } from 'react-select'
import { Modal, ModalBody, ModalHeader, ModalFooter, Row, Col, Input, Label, FormGroup, Button, CustomInput, Alert, CardTitle, CardSubtitle } from 'reactstrap'
import Badge from 'reactstrap/lib/Badge'
import axios from 'axios'
import { CurrencyValue, Token, useEthers, useEtherBalance, useTokenBalance, getExplorerTransactionLink, shortenIfTransactionHash, getExplorerAddressLink, shortenIfAddress } from "@usedapp/core"
import helperConfig from "../../../../helper-config.json"
import { constants, utils, BigNumber } from "ethers"
import { useTokens } from '../../../../utility/hooks/useTokens'
import { useTransfers } from '../../../../utility/hooks/useTransfers'
import { SiWebmoney } from 'react-icons/si'
import { toast } from 'react-toastify'
import { XCircle } from 'react-feather'
import Avatar from '@components/avatar'
import { FiXCircle } from 'react-icons/fi'

const ForceRecall = ({ openrecallmodal, handlRecoverModal, selectSega, pVault, haveInfo }) => {

    const { chainId } = useEthers()

    const [assetList, setAssetList] = useState([])

    const getTokenBalance = async () => {
        try {
            // const response = await axios.get(`https://api.unmarshal.com/v1/matic/address/0x989923d33bE0612680064Dc7223a9f292C89A538/assets?auth_key=CE2OvLT9dk2YgYAYfb3jR1NqCGWGtdRd1eoikUYs`)
            const response = await axios.get(`https://api.unmarshal.com/v1/${helperConfig.unmarshal[chainId]}/address/${selectSega}/assets?auth_key=CE2OvLT9dk2YgYAYfb3jR1NqCGWGtdRd1eoikUYs`)
            setAssetList(response.data)
        } catch (error) {
            console.log(`Asset [getTokkenBalance]`, error)
        }
    }

    useEffect(() => {
        getTokenBalance()
    }, [openrecallmodal])

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

    const [amount, setAmount] = useState('0')
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
    // useEffect(() => {
    //     if (tokenTicker === nativeToken.ticker) {
    //         setUsingNative(1)
    //         setHaveToken(1)
    //     }
    //     if (tokenTicker !== TokenZero.name) {
    //         setHaveToken(1)
    //     }
    // }, [ercToken, tokenTicker, nativeToken, TokenZero])

    //////////////////////////////////////////////////
    // Getting Amount To Transfer
    //////////////////////////////////////////////////

    const fromAccNativeBalance = useEtherBalance(selectSega)
    const fromAccTokenBalance = useTokenBalance(tokenAddress, selectSega)

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
    } = useTransfers(pVault, selectSega)

    const handleForceRecall = () => {
        console.log("handleForceRecall")
        if (usingNative) {
            recallNative(bigNumAmount)
        } else {
            recallErc(tokenAddress, bigNumAmount)
        }
    }

    //SNACKBAR FOR GENERAL TRANSACTIONS
    const [txnID, setTxnID] = useState("")
    const [showTxnMiningSnack, setShowTxnMiningSnack] = useState(false)
    const [showTxnSuccessSnack, setTxnSuccessSnack] = useState(false)
    const handleTxnSnackClose = () => {
        console.log("Txn In Progress / Completed:", getExplorerTransactionLink(txnID, Number(chainId)))
        setShowTxnMiningSnack(false)
        setTxnSuccessSnack(false)
    }

    const handleForceReacallAlert = () => {
        setTimeout(() => {
            setShowTxnMiningSnack(false)
            setTxnSuccessSnack(false)
        }, 30000)
    }

    const notifyError = (emsg) => toast.error(<ErrorToast msg={emsg} />, { hideProgressBar: false, position: toast.POSITION.TOP_CENTER })
    const ErrorToast = ({ msg }) => (
        <Fragment>
            <div className='toastify-header'>
                <div className='title-wrapper'>
                    <Avatar size='md' color='danger' icon={<FiXCircle size={12} />} />
                    <h3 className='toast-title'>Error !</h3>
                </div>
            </div>
            <div className='toastify-body'>
                <span style={{ fontSize: '1.5em', wordBreak: 'break-word' }} role='img' aria-label='toast-text' >
                    {msg}
                </span>
            </div>
        </Fragment>
    )

    useEffect(() => {
        if (TransferState.status === "Exception" || TransferState.status === "Fail") {
            notifyError(TransferState.errorMessage)
        }

        if (TransferState.status === "Mining") {
            const tx_id = String(TransferState.transaction?.hash)
            setTxnID(tx_id.toString())
            console.log("***Handle TX_ID: ", TransferState.status, tx_id)
            setShowTxnMiningSnack(true)
        }
        if (TransferState.status === "Success") { setTxnSuccessSnack(true) }
    }, [TransferState])

    const handleLog = () => {
        const y = new CurrencyValue(nativeToken, BigNumber.from("100000000000000000000"))
        // const z = new CurrencyValue(ercToken, BigNumber.from("100000000000000000000"))
        console.log(y.format())
        // console.log(z.format())
        console.log(amount, decimals, haveToken)
        console.log("Amount:", amount)
        console.log("Decimals:", decimals)
        console.log("BigNumAmt", utils.commify(bigNumAmount.toString()))
        console.log("Frm Address", selectSega)
        console.log("Vault", pVault)
        console.log("To Address", pVault)
    }
    // const [assetFlag, setAssetFlag] = useState(0)
    // const [selasset, setSelasset] = useState("")
    // const [decimal, setDecimal] = useState()
    // const [symbol, setSymbol] = useState('')
    // const [assetAdrs, setAssetAdrs] = useState('')
    // const [balance, setBalance] = useState()

    // const handleSelasset = (data) => {
    //     setAssetFlag(1)
    //     setSelasset(data.label)
    //     setDecimal(data.decimal)
    //     setSymbol(data.symbol)
    //     setAssetAdrs(data.adrs)
    //     setBalance(data.balance)
    // }
    // const CloseBtn = <X className='cursor-pointer' size={25} onClick={handleModal} />

    const native_bal = nativeBal.format()
    const erc20_bal = ercTokenBal.format()
    // let balance_max
    const [balance_max, setBalance_max] = useState("")
    const handleMax = () => {
        if (usingNative) {
            const n_bal = native_bal.split(" ")[0]
            const new_n_bal = (n_bal.replace(/,/g, '')) * 1
            setBalance_max(new_n_bal)
            // console.log('n_bal', n_bal)
            // setBalance_max(native_bal.split(" ")[0])
        } else {
            const e_bal = erc20_bal.split(" ")[0]
            const new_e_bal = (e_bal.replace(/,/g, '')) * 1
            setBalance_max(new_e_bal)
            // console.log('e_bal', e_bal)
            // setBalance_max(erc20_bal.split(" ")[0])
        }
    }

    const handleInputAmount = (event) => {
        // const newAmount = (event.target.value) === "" ? "" : event.target.value
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

    return (
        <Modal className='modal-dialog-centered modal-lg' isOpen={openrecallmodal} toggle={() => {
            setBalance_max('')
            handleForceReacallAlert()
            handlRecoverModal()
        }} >
            {/* {console.log('assest', asset)} */}
            {/* {console.log('assestlist', assetList)} */}
            {/* {console.log('networkname', helperConfig[chainId])} */}
            <ModalHeader tag='h2' toggle={() => {
                setBalance_max('')
                handleForceReacallAlert()
                handlRecoverModal()
            }}>
                <CardTitle className='mb-0'>Force Recall</CardTitle>
            </ModalHeader>
            <ModalBody className='p-1'>

                <Row style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Col>
                        <h3>For Risk Officers and Vault operators to pull Sega assests back into its Parent Vault bypassing the Sega operator.</h3>
                    </Col>
                    <Col className='my-1'>
                        <Row className='d-flex flex-row align-items-center'>
                            <Col md='1' >
                                <Avatar className='mr-1' size='md' color='light-primary' icon={<SiWebmoney size={40} />} />
                            </Col>
                            <Col className='d-flex flex-column justify-content-start'>
                                <CardTitle className='mb-0 pb-1' tag='h3'>Selected Sega</CardTitle>
                                <CardSubtitle tag='h5'>{shortenIfAddress(selectSega)}</CardSubtitle>
                            </Col>
                        </Row>
                    </Col>
                    <Col className='d-flex flex-row mb-1'>
                        <Col md='1'><BsArrowDown size={40} /></Col>
                        <Col>
                            <hr />
                        </Col>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for='parentvault' style={{ fontSize: "1.3em" }}>
                                Parent Vault - {shortenIfAddress(pVault)}
                            </Label>
                        </FormGroup>
                    </Col>
                    {/* {
                            OrderTicket(
                                haveInfo ? "2" : "0",
                                haveInfo ? pVault : undefined,
                                haveInfo ? selectSega : undefined
                            )
                        } */}
                    <Col className='mb-1'>
                        <Label style={{ fontSize: "1.3em" }}>Select Assest</Label>
                        <Select
                            // theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            defaultValue=''
                            placeholder='Select an asset...'
                            name='clear'
                            options={tokenList}
                            components={{
                                Option: OptionComponent
                            }}
                            // onChange={handleSelasset}
                            onChange={handleSetTokenTicker}
                        />
                    </Col>
                    {/* <Col>
                            {assetFlag === 1 ? (
                                <div className='d-flex flex-column justify-content-center'>
                                    <p>Asset Name: {selasset}</p>
                                    <p>Symbol: {symbol}</p>
                                    <p>Decimals: {decimal}</p>
                                    <p>Balance: {(balance / (10 ** decimal)).toFixed(6)}</p>
                                    <p>Address: {assetAdrs}</p>
                                </div>
                            ) : null}
                        </Col> */}
                    <Col>
                        <FormGroup>
                            <Col className='d-flex flex-row justify-content-between'>
                                <Label for='amount' style={{ fontSize: "1.3em", paddingRight: '10px' }}>Amount</Label>
                                {/* <span>Balance: {(balance / (10 ** decimal)).toFixed(6)}</span> */}
                                {usingNative ? (
                                    native_bal === '0 ERROR' ? null : (
                                        <span>Balance: {native_bal}</span>
                                    )) : (
                                    erc20_bal === '0 ERROR' ? null : (
                                        <span>Balance: {erc20_bal}</span>
                                    ))}
                                {/* <a href='#' style={{ color: 'red' }}> Send Max</a> */}
                                <h6 className='d-flex align-items-center' style={{ color: 'red', cursor: 'pointer' }} onClick={handleMax}> Send Max</h6>
                            </Col>
                            <Input type='text' id='amount' value={balance_max} onChange={handleInputAmount} />
                        </FormGroup>
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter className='justify-content-center'>
                <Button.Ripple color='primary' onClick={handleForceRecall}>
                    Force Recall
                </Button.Ripple>
                {/* <Button.Ripple onClick={handleLog}>TestLog</Button.Ripple> */}
            </ModalFooter>
            <Col className='d-flex flex-column justify-content-center'>
                <Alert className='p-1' isOpen={showTxnMiningSnack} toggle={() => handleTxnSnackClose()} color="info">
                    <div>Transaction in Progress- Txn ID : &emsp; </div>
                    <a href={getExplorerTransactionLink(txnID, chainId ? chainId : 1)}
                        target="_blank" rel="noreferrer">
                        {(txnID)} </a>
                </Alert>
                <Alert className='p-1' isOpen={showTxnSuccessSnack} toggle={() => handleTxnSnackClose()} color="success">
                    <div>Transaction Completed - Txn ID :</div>
                    <a href={getExplorerTransactionLink(txnID, chainId ? chainId : 1)}
                        target="_blank" rel="noreferrer">
                        {(txnID)} </a>
                </Alert>
            </Col>
        </Modal>
    )
}

export default ForceRecall