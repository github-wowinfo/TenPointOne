import { BsSafe2 } from 'react-icons/bs'
import { Modal, ModalBody, ModalHeader, InputGroup, InputGroupAddon, Row, Col, Input, Label, FormGroup, Button, Alert } from 'reactstrap'
import { useEthers, getExplorerAddressLink, getExplorerTransactionLink } from "@usedapp/core"
import { getAddress, hexStripZeros } from "ethers/lib/utils"
import { useState, useEffect } from 'react'
import { useVault } from '../../../../utility/hooks/useVaults'

const ModifyVault = ({ openmodifyvaultmodal, handleModifyVaultModal, vault }) => {

    const [hideValue, setHideValue] = useState('')

    const { chainId } = useEthers()


    const hideTextChange = (e) => {
        setHideValue(e.target.value)

    }

    // Import neccesary functions from useVaults.ts
    const { getRecoveryInfo, getSegaList,
        changeBackup, changeUnlockPeriod, claimVault,
        txnState,
        createNewSega, createNewSegaState,
    } = useVault(vault)

    // Reading Input Box Inputs
    const [inputNewBackup, setInputNewBackup] = useState("")
    const handleNewBackupInput = (event) => {
        const newAddress = event.target.value === "" ? "" : event.target.value
        setInputNewBackup(newAddress)
        console.log("Test:", newAddress)
        console.log("New Backup Input:", newAddress)
    }
    const [inputInactiveDays, setInputInactiveDays] = useState(0)
    const handleInputInactive = (event) => {
        const newValue = event.target.value === "" ? "" : event.target.value
        setInputInactiveDays(newValue)
        console.log("Inactive Days Input:", newValue)
    }

    //Button Handles for Operations
    const handleChangeBackup = () => {
        if (getAddress(inputNewBackup)) {
            const x = inputNewBackup
            return changeBackup(x)
        }
    }
    const handleChangeInactiveDays = () => {
        if (inputInactiveDays >= 0) {
            const x = inputInactiveDays
            return changeUnlockPeriod(x)
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

    const onClickHide = () => {

        const getdata = JSON.parse(localStorage.getItem('vaultdata'))
        for (const i in getdata) {
            if (getdata[i].address === hideValue) {
                getdata[i].show = false
                break
            }
        }
        localStorage.setItem('vaultdata', JSON.stringify(getdata))

        handleModifyVaultModal()
        
    }

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
    return (
        <Modal className='modal-dialog-centered modal-lg' isOpen={openmodifyvaultmodal} toggle={handleModifyVaultModal} >
            <ModalHeader tag='h1' toggle={handleModifyVaultModal}>
                Modify Vault Settings
            </ModalHeader>
            <ModalBody style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Row style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Col>
                        <h3>Update your Vault with new security parameters and modify.</h3>
                    </Col>
                    <Col className='my-1'>
                        <Row className='d-flex flex-row'>
                            <Col md='1'><BsSafe2 size={40} /></Col>
                            <Col className='d-flex flex-column justify-content-start'>
                                <h3>SBI Vault</h3>
                                <h5>{vault}</h5>
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        <hr />
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for='backupacc' style={{ fontSize: "1.3em" }}>Backup Account</Label>
                            <InputGroup>
                                <Input type='text' id='backupacc' placeholder='enter new backup account here..' onChange={handleNewBackupInput} />
                                <InputGroupAddon addonType='append'>
                                    <Button onClick={handleChangeBackup} color='primary' outline>
                                        Modify
                                    </Button>
                                </InputGroupAddon>
                            </InputGroup>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for='inactivedays' style={{ fontSize: "1.3em" }}>Inactive After Days</Label>
                            <InputGroup>
                                <Input type='text' id='inactivedays' placeholder='enter no. of days before owner is declared inactive' onChange={handleInputInactive} />
                                <InputGroupAddon addonType='append'>
                                    <Button onClick={handleChangeInactiveDays} color='primary' outline>
                                        Modify
                                    </Button>
                                </InputGroupAddon>
                            </InputGroup>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for='hide' style={{ fontSize: "1.3em" }}>Hide</Label>
                            <InputGroup>
                                <Input type='text' id='hide' placeholder='Hide from view and stop tracking this Vault' onChange={hideTextChange} />
                                <InputGroupAddon addonType='append'>
                                    <Button color='primary' outline onClick={onClickHide}>
                                        Hide
                                    </Button>
                                </InputGroupAddon>
                            </InputGroup>
                        </FormGroup>
                    </Col>
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
    )
}

export default ModifyVault