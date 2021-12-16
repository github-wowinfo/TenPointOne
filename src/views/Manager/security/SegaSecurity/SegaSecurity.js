import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import { getAddress, isAddress } from "ethers/lib/utils"
import { Modal, ModalBody, ModalHeader, ModalFooter, Row, Col, Input, Label, FormGroup, Button, InputGroup, InputGroupAddon, Alert } from 'reactstrap'
import ForceRecall from './ForceRecall'
import { useRCU } from '../../../../utility/hooks/useRCU'
import { useVault } from '../../../../utility/hooks/useVaults'
import { useManager } from '../../../../utility/hooks/useManager'
import { useEthers, getExplorerAddressLink, getExplorerTransactionLink } from "@usedapp/core"

const SegaSecurity = ({ opensegasec, handleSegaSecModal }) => {

    const { chainId, account } = useEthers()

    // Smart Contract Handle Functions from useRCU.ts file
    const { getVaultList } = useRCU()

    // Declaring State Hooks
    const [VaultList, setVaultList] = useState([])
    const [SegaList, setSegaList] = useState([])
    const [Vault, setVault] = useState("")
    const [Sega, setSega] = useState("")
    const [haveInfo, setHaveInfo] = useState(0)
    const [display, setDisplay] = useState(false)

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
                const sega = getdata.filter(a => a.vault === Vault)
                setSegaList(sega)
                console.log("Sega-List", sega)
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

    // Set Vault to Manage
    const handleSetVault = (value) => {
        // setSegaList([])
        setHaveInfo(0)
        setVault(value.adrs)

        // setVault(value.label)


    }

    // Set Sega to Manage
    const handleSetSega = (value) => {
        setHaveInfo(0)
        setSega(value.adrs)
        // setSega(value.label)
        value = ''
    }

    const handleGetSegaInfo = () => {
        if (Vault.length > 0 && Sega.length > 0) {
            const { _parentVault, _trader, _active } = getSegaInfo()
            setParentVault(_parentVault)
            setTrader(_trader)
            setActiveStatus(_active)
            if (Vault && Sega) {
                setHaveInfo(1)
            }
        } else {
            // handleGetAllVaults()
        }
    }

    // const vlist = VaultList && VaultList.map((vault, index) => ({ value: index, label: vault }))
    const vlist = VaultList && VaultList.map((vault, index) => ({ value: index, label: `${vault.name} - ${vault.address}`, adrs: `${vault.address}` }))

    const slist = SegaList && SegaList.map((sega, index) => ({ value: index, label: `${sega.name} - ${sega.address}`, adrs: `${sega.address}` }))
    // const slist = SegaList && SegaList.map((sega, index) => ({ value: index, label: sega }))
    const newSlist = slist.filter((sega) => { return sega.label !== "0x0000000000000000000000000000000000000000" })

    const handlePauseSega = () => {
        if (Vault.length > 0 && Sega.length > 0) { return pauseSega() }
    }

    const handleUnpauseSega = () => {
        if (Vault.length > 0 && Sega.length > 0) { return unpauseSega() }
    }

    // Reading New SEGA Operator Input Box Inputs
    const [inputNewSegaTrader, setInputNewSegaTrader] = useState("")
    const handleNewSegaTraderInput = (event) => {
        const newAddress = event.target.value === "" ? "" : event.target.value
        setInputNewSegaTrader(newAddress)
        console.log("Setting New Sega Trader:", newAddress)
    }
    const handleChangeSegaTrader = () => {
        if (Vault.length > 0 && Sega.length > 0 && isAddress(inputNewSegaTrader)) { return changeSegaTrader(getAddress(inputNewSegaTrader)) }
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

    useEffect(() => {
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
        console.log("Vault-List", valueData)
    }

    useEffect(() => {
        getVaultListFromLocal()
        // handleGetAllVaults()
    }, [chainId])

    return (
        <div>
            <Modal className='modal-dialog-centered modal-lg' isOpen={opensegasec} toggle={() => {
                handleSegaSecModal()
                setHaveInfo(0)
                setVault('')
                setSega('')
            }} >
                {/* {console.log('newSlist', newSlist)}
                {console.log('vlist', vlist)} */}
                <ModalHeader tag='h2' toggle={() => {
                    handleSegaSecModal()
                    setHaveInfo(0)
                    setVault('')
                    setSega('')
                }}>
                    Select Account to Manage
                </ModalHeader>
                <ModalBody style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Row style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Col>
                            <h3>Select the account to view or modify security settings.</h3>
                        </Col>
                        <Col className='mb-1' style={{}}>
                            <div className='d-flex flex-row justify-content-between my-1'>
                                <Label style={{ fontSize: "1.3em" }}>Select Vault</Label>
                                {/* <Button.Ripple size='sm' color='primary' onClick={handleGetAllVaults}>Refresh</Button.Ripple> */}
                            </div>
                            <Select
                                className='react-select'
                                classNamePrefix='select'
                                defaultValue=''
                                name='clear'
                                // options={VaultList}
                                options={vlist}
                                onChange={handleSetVault}
                            />
                        </Col>
                        <Col className='mb-1'>
                            <div className='d-flex flex-row justify-content-between my-1'>
                                <Label style={{ fontSize: "1.3em" }}>Select Sega</Label>
                                {/* <Button.Ripple size='sm' color='primary' onClick={handleGetSegas}>Refresh</Button.Ripple> */}
                            </div>
                            <Select
                                // theme={selectThemeColors}
                                className='react-select'
                                classNamePrefix='select'
                                defaultValue=''
                                name='clear'
                                options={newSlist}
                                onChange={handleSetSega}
                            />
                        </Col>
                        <Col>
                            <hr />
                        </Col>
                        <Col className='text-center'>
                            <Button.Ripple onClick={handleGetSegaInfo}>Get Sega Info</Button.Ripple>
                        </Col>
                        {haveInfo ? (
                            <>
                                <Col>
                                    <FormGroup>
                                        <Label for='ownacc' style={{ fontSize: "1.3em" }}>Parent Vault</Label>
                                        <Input type='text' id='ownacc' value={parentVault} />
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label for='inactivedays' style={{ fontSize: "1.3em" }}>Designated Sega Operator - {trader}</Label>
                                        <InputGroup>
                                            <Input type='text' id='backupacc' placeholder='Put new operator address over here.' onChange={handleNewSegaTraderInput} />
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
                                            <FormGroup>
                                                <Label for='days' style={{ fontSize: "1.2em" }}>Operator Status</Label>
                                                <div className="d-flex justify-content-between">
                                                    {/* {console.log(activeStatus)} */}
                                                    {activeStatus ? (<p><strong><u>ACTIVE</u></strong></p>) : (<p><strong><u>FROZEN</u></strong></p>)}
                                                    {/* <p><strong>{activeStatus}</strong></p> */}
                                                    {activeStatus ? (<Button.Ripple className='mx-1' color='primary' onClick={handlePauseSega}>Freeze</Button.Ripple>) : (
                                                        (<Button.Ripple className='mx-1' color='primary' onClick={handleUnpauseSega}>UnFreeze</Button.Ripple>)
                                                    )}
                                                </div>
                                            </FormGroup>
                                        </Col>
                                        <Col>
                                            <FormGroup>
                                                <Label for='rcvrydate' style={{ fontSize: "1.2em" }}>Assest Recall</Label>
                                                <div className="d-flex justify-content-between">
                                                    <p><strong>Force Recall to Vault</strong></p>
                                                    <Button.Ripple className='mx-1' color='primary' onClick={handlRecoverModal}>Recall</Button.Ripple>
                                                </div>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Col>
                            </>
                        ) : null}
                        <Col>
                            <div className='d-flex flex-column justify-content-center'>
                                <Alert isOpen={showTxnMiningSnack} toggle={() => handleTxnSnackClose()} color="info">
                                    <div>Transaction in Progress- Txn ID : &emsp; </div>
                                    <a href={getExplorerTransactionLink(txnID, chainId ? chainId : 1)}
                                        target="_blank" rel="noreferrer">
                                        {(txnID)} </a>
                                </Alert>
                                <Alert isOpen={showTxnSuccessSnack} toggle={() => handleTxnSnackClose()} color="success">
                                    <div>Transaction Completed - Txn ID :</div>
                                    <a href={getExplorerTransactionLink(txnID, chainId ? chainId : 1)}
                                        target="_blank" rel="noreferrer">
                                        {(txnID)} </a>
                                </Alert>
                            </div>
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>
            <ForceRecall openrecallmodal={recallmodal} handlRecoverModal={handlRecoverModal} selectSega={Sega} pVault={parentVault} haveInfo={haveInfo} />
        </div>
    )
}


export default SegaSecurity