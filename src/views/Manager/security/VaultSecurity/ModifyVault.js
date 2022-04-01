import { BsSafe2 } from 'react-icons/bs'
import { Modal, ModalBody, ModalHeader, InputGroup, InputGroupAddon, Row, Col, Input, Label, FormGroup, Button, Alert, CardTitle, CardSubtitle } from 'reactstrap'
import { useEthers, getExplorerAddressLink, getExplorerTransactionLink, shortenIfTransactionHash, shortenIfAddress } from "@usedapp/core"
import { getAddress, hexStripZeros } from "ethers/lib/utils"
import { useState, useEffect, Fragment } from 'react'
import { useVault } from '../../../../utility/hooks/useVaults'
import { toast } from 'react-toastify'
import Avatar from '@components/avatar'
import { XCircle } from 'react-feather'
import { FiXCircle } from 'react-icons/fi'
import { GiCircleCage, GiHobbitDoor, GiShipWheel } from 'react-icons/gi'

const ModifyVault = ({ openmodifyvaultmodal, handleModifyVaultModal, vault, vaultName }) => {

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

    const notifyErrorBackup = (emsg) => toast.error(<ErrorToastBackup />, { hideProgressBar: false })
    const ErrorToastBackup = ({ msg }) => (
        <Fragment>
            <div className='toastify-header'>
                <div className='title-wrapper'>
                    <Avatar size='md' color='danger' icon={<FiXCircle size={12} />} />
                    <h3 className='toast-title'>Error !</h3>
                </div>
            </div>
            <div className='toastify-body'>
                <span style={{ fontSize: '1.5em' }} role='img' aria-label='toast-text' >
                    Enter a valid Address for Backup Account.
                </span>
            </div>
        </Fragment>
    )

    const notifyErrorInactiveDays = (emsg) => toast.error(<ErrorToastInactiveDays />, { hideProgressBar: false })
    const ErrorToastInactiveDays = ({ msg }) => (
        <Fragment>
            <div className='toastify-header'>
                <div className='title-wrapper'>
                    <Avatar size='md' color='danger' icon={<FiXCircle size={12} />} />
                    <h3 className='toast-title'>Error !</h3>
                </div>
            </div>
            <div className='toastify-body'>
                <span style={{ fontSize: '1.5em' }} role='img' aria-label='toast-text' >
                    Enter valid number of days.
                </span>
            </div>
        </Fragment>
    )

    //Button Handles for Operations
    const handleChangeBackup = () => {
        if (getAddress(inputNewBackup)) {
            const x = inputNewBackup
            return changeBackup(x)
        } else {
            notifyErrorBackup()
        }
    }
    const handleChangeInactiveDays = () => {
        if (inputInactiveDays >= 0) {
            const x = inputInactiveDays
            return changeUnlockPeriod(x)
        } else {
            notifyErrorInactiveDays()
        }
    }

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
    return (
        <Modal className='modal-dialog-centered' isOpen={openmodifyvaultmodal}
            toggle={() => {
                handleModifyVaultModal()
                handleTxnSnackClose()
            }
            } >
            <ModalHeader tag='h2' toggle={() => {
                handleModifyVaultModal()
                handleTxnSnackClose()
            }
            }>
                {/* <span style={{ color: '#1919d2' }}>Modify Vault Settings</span> */}
                Modify Vault Settings
            </ModalHeader>
            <ModalBody >
                <Row className='d-flex flex-column justify-content-center align-items-center'>
                    <Col>
                        <p>Update your Vault with new security parameters and modify.</p>
                    </Col>
                    <Col className='my-1'>
                        <Row className='d-flex flex-row justify-content-evenly'>
                            {/* <Col md='1' sm='1' className='mx-1'><Avatar size='lg' color='light-primary' icon={<BsSafe2 size={35} />} /></Col> */}
                            {/* <Col md='1' sm='1' className='mx-1'><Avatar size='lg' color='light-primary' icon={<GiCircleCage size={35} />} /></Col> */}
                            <Col md='1' sm='1' className='mx-1'><Avatar size='lg' color='light-primary' icon={<GiShipWheel size={35} />} /></Col>
                            <Col className='d-flex flex-column justify-content-start'>
                                <CardTitle className='mb-0' style={{ fontSize: '1.5rem' }}>{vaultName}</CardTitle>
                                <h5 className='font-weight-bold'>{shortenIfAddress(vault)}</h5>
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
                            <Label for='inactivedays' style={{ fontSize: "1.3em" }}>Inactive After (days)</Label>
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
                    {/* <Col>
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
                    </Col> */}
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
    )
}

export default ModifyVault