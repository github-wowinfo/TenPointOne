import React, { useState, useEffect, Fragment } from 'react'
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import { getAddress, isAddress } from "ethers/lib/utils"
import { Modal, ModalBody, ModalHeader, ModalFooter, Row, Col, Input, Label, FormGroup, Button, InputGroup, InputGroupAddon, Alert, UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, UncontrolledAlert, CardTitle } from 'reactstrap'
import ForceRecall from './ForceRecall'
import { useRCU } from '../../../../utility/hooks/useRCU'
import { useVault } from '../../../../utility/hooks/useVaults'
import { useManager } from '../../../../utility/hooks/useManager'
import { useEthers, getExplorerAddressLink, getExplorerTransactionLink, shortenIfTransactionHash } from "@usedapp/core"
import { toast } from 'react-toastify'
import { Tool, XCircle } from 'react-feather'
import Avatar from '@components/avatar'
import { FiXCircle } from 'react-icons/fi'

const SegaSecurity = ({ opensegasec, handleSegaSecModal }) => {

    const { chainId, account } = useEthers()

    // Smart Contract Handle Functions from useRCU.ts file
    const { getVaultList } = useRCU()

    // Declaring State Hooks
    const [VaultList, setVaultList] = useState([])
    const [SegaList, setSegaList] = useState([])
    const [Vault, setVault] = useState("")
    const [Sega, setSega] = useState("")
    const [segaName, setSegaName] = useState("")
    const [haveInfo, setHaveInfo] = useState(false)
    // const [notParentVault, setNotParentVault] = useState(false)
    const [sega_value, setSega_value] = useState({ value: 'Select...', label: 'Select...' })

    // Get SEGA List
    const { getSegaList } = useVault(Vault)

    // Import neccesary functions from useManager.ts
    const {
        getSegaInfo,
        pauseSega, unpauseSega, changeSegaTrader,
        txnState
    } = useManager(Vault, Sega)

    // Get Sega Info
    const [parentVault, setParentVault] = useState("")
    const [trader, setTrader] = useState("")
    const [activeStatus, setActiveStatus] = useState(true)

    const handleGetAllVaults = () => {
        const x = getVaultList()
        setVaultList(x)
        console.log("Vault-List", x)
    }


    const getValueSegaFromLocal = () => {
        console.log('Vault', Vault)
        if (Vault.length > 0) {
            const getdata = JSON.parse(localStorage.getItem('segadata'))
            if (getdata) {
                const sega = getdata.filter(a => a.vault === Vault && a.show === true && a.network === chainId && a.owner === account)
                setSegaList(sega)
                // console.log("Sega-List", sega)
            }
        }
    }

    //GET LIST OF VAULT's SEGAs
    const handleGetSegas = () => {
        if (Vault.length > 0) {
            const x = getSegaList()
            setSegaList(x)
            console.log("Sega-List : ", x)
        } else {
            handleGetAllVaults()
        }
    }

    // const vlist = VaultList && VaultList.map((vault, index) => ({ value: index, label: vault }))
    const vlist = VaultList && VaultList.map((vault, index) => ({ value: index, label: `${vault.name} - ${vault.address}`, adrs: `${vault.address}` }))

    const slist = SegaList && SegaList.map((sega, index) => ({ value: index, label: `${sega.name} - ${sega.address}`, adrs: `${sega.address}`, name: `${sega.name}` }))
    const newSlist = slist.filter((sega) => { return sega.label !== "0x0000000000000000000000000000000000000000" })
    // const slist = SegaList && SegaList.map((sega, index) => ({ value: index, label: sega }))

    // Set Vault to Manage
    const handleSetVault = (value) => {
        setHaveInfo(false)
        setVault(value.adrs)
        setSega('')
        setSega_value(null)
        // setVault(value.label)
    }

    // Set Sega to Manage
    const handleSetSega = (value) => {
        setHaveInfo(false)
        setSega(value.adrs)
        setSegaName(value.name)
        setSega_value(value)
        // setSega(value.label)
    }

    const handleGetSegaInfo = () => {
        if (Vault.length > 0 && Sega.length > 0) {
            const { _parentVault, _trader, _active } = getSegaInfo()
            setParentVault(_parentVault)
            setTrader(_trader)
            setActiveStatus(_active)
            // if (_parentVault !== Vault) {
            //     setNotParentVault(true)
            // } else {
            //     setNotParentVault(false)
            // }
            if (Vault && Sega) {
                setHaveInfo(true)
            }
        } else {
            // handleGetAllVaults()
        }
    }

    const handlePauseSega = () => {
        if (Vault.length > 0 && Sega.length > 0) { return pauseSega() }
    }

    const handleUnpauseSega = () => {
        if (Vault.length > 0 && Sega.length > 0) { return unpauseSega() }
    }

    const notifyErrorModify = (emsg) => toast.error(<ErrorToastModify />, { hideProgressBar: false })
    const ErrorToastModify = ({ msg }) => (
        <Fragment>
            <div className='toastify-header'>
                <div className='title-wrapper'>
                    <Avatar size='md' color='danger' icon={<FiXCircle size={12} />} />
                    <h3 className='toast-title'>Error !</h3>
                </div>
            </div>
            <div className='toastify-body'>
                <span style={{ fontSize: '1.5em' }} role='img' aria-label='toast-text' >
                    Enter a valid Address for Sega Operator.
                </span>
            </div>
        </Fragment>
    )

    // Reading New SEGA Operator Input Box Inputs
    const [inputNewSegaTrader, setInputNewSegaTrader] = useState("")
    const handleNewSegaTraderInput = (event) => {
        const newAddress = event.target.value === "" ? "" : event.target.value
        setInputNewSegaTrader(newAddress)
        console.log("Setting New Sega Trader:", newAddress)
    }
    const handleChangeSegaTrader = () => {
        if (Vault.length > 0 && Sega.length > 0 && isAddress(inputNewSegaTrader)) {
            return changeSegaTrader(getAddress(inputNewSegaTrader))
        } else {
            notifyErrorModify()
        }
    }

    //SNACKBAR FOR GENERAL TRANSACTIONS
    const [txnID, setTxnID] = useState("")
    const [showTxnMiningSnack, setShowTxnMiningSnack] = useState(false)
    const [showTxnSuccessSnack, setTxnSuccessSnack] = useState(false)
    const handleTxnSnackClose = () => {
        console.log("Txn In Progress / Completed:", getExplorerTransactionLink(txnID, chainId))
        setShowTxnMiningSnack(false)
        setTxnSuccessSnack(false)
    }

    // Setting Flag for haveInfo
    // useEffect(() => {
    //     if (Vault && Sega) {
    //         setHaveInfo(1)
    //     }
    // }, [Vault, Sega])

    useEffect(() => {
        getValueSegaFromLocal()
        // handleGetSegas()
    }, [Vault])

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

    useEffect(() => {
        if (txnState.status === "Exception" || txnState.status === "Fail") {
            notifyError(txnState.errorMessage)
        }
        if (txnState.status === "Mining") {
            const tx_id = String(txnState.transaction?.hash)
            setTxnID(tx_id.toString())
            console.log("***Handle TX_ID: ", txnState.status, tx_id)
            setShowTxnMiningSnack(true)
        }
        if (txnState.status === "Success") { setTxnSuccessSnack(true) }
    }, [txnState])

    // const CloseBtn = <X className='cursor-pointer' size={25} onClick={handleModal} />

    const [recallmodal, setRecallModal] = useState(false)
    const handlRecoverModal = () => setRecallModal(!recallmodal)

    const getVaultListFromLocal = () => {
        const getdata = JSON.parse(localStorage.getItem('vaultdata'))
        const valueData = getdata && getdata.filter(a => a.show === true && a.network === chainId && a.owner === account)
        // const vaultlist = valueData && valueData.map((vault, index) => ({ value: index, label: `${vault.name} - ${vault.address}`, adrs: `${vault.address}` }))
        setVaultList(valueData)
        // console.log("Vault-List", valueData)
    }

    useEffect(() => {
        getVaultListFromLocal()
        // handleGetAllVaults()
    }, [opensegasec, chainId])

    return (
        <div>
            <Modal className='modal-dialog-centered' isOpen={opensegasec} toggle={() => {
                handleSegaSecModal()
                handleTxnSnackClose()
                // setNotParentVault(false)
                setSega_value(null)
                setHaveInfo(false)
                setVault('')
                setSega('')
            }} >
                {/* {console.log('newSlist', newSlist)}
                {console.log('Vault', Vault)}
                {console.log('Sega', Sega)} */}
                <ModalHeader tag='h2' toggle={() => {
                    handleSegaSecModal()
                    handleTxnSnackClose()
                    // setNotParentVault(false)
                    setSega_value(null)
                    setHaveInfo(false)
                    setVault('')
                    setSega('')
                }}>
                    {/* <span style={{ color: '#1919d2' }}>Select Account to Manage</span> */}
                    Select Account to Manage
                </ModalHeader>
                <ModalBody>
                    <Row className='d-flex flex-column justify-content-center align-items-center'>
                        {/* <Col>
                            <h3>View and Modify Account Security settings.</h3>
                        </Col> */}
                        <Col className='mb-1' style={{}}>
                            <div className='d-flex flex-row justify-content-between my-1'>
                                <Label style={{ fontSize: "1.3em" }}>Select Vault</Label>
                                {/* <Button.Ripple size='sm' color='primary' onClick={handleGetAllVaults}>Refresh</Button.Ripple> */}
                            </div>
                            <Select
                                // theme={selectThemeColors}
                                className='react-select'
                                classNamePrefix='select'
                                maxMenuHeight={200}
                                defaultValue=''
                                name='clear'
                                onChange={handleSetVault}
                                options={vlist}
                            // options={VaultList}
                            />
                        </Col>
                        <Col className='mb-1'>
                            {console.log('sega_value', sega_value)}
                            <div className='d-flex flex-row justify-content-between my-1'>
                                <Label style={{ fontSize: "1.3em" }}>Select Sega</Label>
                                {/* <Button.Ripple size='sm' color='primary' onClick={handleGetSegas}>Refresh</Button.Ripple> */}
                            </div>
                            <Select
                                // theme={selectThemeColors}
                                className='react-select'
                                classNamePrefix='select'
                                maxMenuHeight={200}
                                value={sega_value}
                                name='clear'
                                onChange={handleSetSega}
                                options={newSlist}
                            />
                        </Col>
                        <Col>
                            <hr />
                        </Col>
                        {/* {notParentVault ? (
                            <Col>
                                <UncontrolledAlert color='danger'>
                                    <h4 className='alert-heading'>Select a valid Sega</h4>
                                </UncontrolledAlert>
                            </Col>
                        ) : null} */}
                        <Col className='text-center'>
                            <Button.Ripple color='primary' onClick={handleGetSegaInfo}><Tool className='mr-1' size={20} />Refresh Info</Button.Ripple>
                        </Col>
                        {haveInfo ? (
                            <>
                                <Col className='py-1'>
                                    <FormGroup>
                                        <Label for='ownacc' style={{ fontSize: "1.3em" }}>Parent Vault</Label>
                                        <Input type='text' id='ownacc' value={parentVault} />
                                    </FormGroup>
                                </Col>
                                <Col className='py-1'>
                                    <FormGroup>
                                        <Label for='inactivedays' style={{ fontSize: "1.3em" }}>Sega Operator</Label>
                                        <InputGroup>
                                            <Input type='text' id='backupacc' placeholder={trader} onChange={handleNewSegaTraderInput} />
                                            <InputGroupAddon addonType='append'>
                                                <Button onClick={handleChangeSegaTrader} color='primary' outline>
                                                    Modify
                                                </Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <Row>
                                        <Col>
                                            <FormGroup className='text-center'>
                                                <Label for='days' style={{ fontSize: "1.2em" }}>Operator Status</Label>
                                                <div className='text-center'>
                                                    {/* {console.log(activeStatus)} */}
                                                    {activeStatus ? (<p><strong><u>Active</u></strong></p>) : (<p><strong><u>Frozen</u></strong></p>)}
                                                    {/* <p><strong>{activeStatus}</strong></p> */}
                                                </div>
                                                <div className='text-center'>
                                                    {activeStatus ? (<Button.Ripple className='mx-1' color='primary' onClick={handlePauseSega}>Freeze</Button.Ripple>) : (
                                                        (<Button.Ripple className='mx-1' color='primary' onClick={handleUnpauseSega}>UnFreeze</Button.Ripple>)
                                                    )}
                                                </div>
                                            </FormGroup>
                                        </Col>
                                        <Col>
                                            <FormGroup className='text-center'>
                                                <Label for='rcvrydate' style={{ fontSize: "1.2em" }}>Assest Recall</Label>
                                                <div className="d-flex flex-column">
                                                    <p><strong>Force Recall to Vault</strong></p>
                                                    <div className='text-center'>
                                                        <Button.Ripple className='text-center' color='primary' onClick={handlRecoverModal}>Recall</Button.Ripple>
                                                    </div>
                                                </div>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Col>
                            </>
                        ) : null}
                    </Row>
                </ModalBody>
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
            </Modal>
            <ForceRecall openrecallmodal={recallmodal} handlRecoverModal={handlRecoverModal} selectSega={Sega} sega_name={segaName} pVault={parentVault} haveInfo={haveInfo} />
        </div>
    )
}


export default SegaSecurity