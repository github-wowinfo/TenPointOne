import { X, PlusCircle, Info } from 'react-feather'
import { toast } from 'react-toastify'
import Avatar from '@components/avatar'
import { Modal, ModalBody, ModalHeader, ModalFooter, Row, Col, Input, Label, FormGroup, Button, Popover, Alert, Spinner } from 'reactstrap'
import { useEthers, useNotifications, shortenAddress, getExplorerAddressLink, getExplorerTransactionLink } from "@usedapp/core"
import { useRCU } from '../../../utility/hooks/useRCU'
import { getAddress, hexStripZeros } from "ethers/lib/utils"
import React, { useState, useEffect, Fragment } from "react"

const CreateVaultModal = ({ openvault, handleVaultModal }) => {

    // const CloseBtn = <X className='cursor-pointer' size={25} onClick={handleModal} />

    const { chainId } = useEthers()
    const { notifications } = useNotifications()

    //State Hooks
    const [VaultList, setVaultList] = useState([])
    const [launchVaultTxn, setLaunchVaultTxn] = useState("")
    const [newVaultAddress, setNewVaultAddress] = useState("")

    const [showLaunchingSnack, setShowLaunchingSnack] = useState(false)
    const [showVaultCreatedSnack, setShowVaultCreatedSnack] = useState(false)
    const handleSnackClose = () => {
        console.log("Vault Creation Txn:", getExplorerTransactionLink(launchVaultTxn, Number(chainId)))
        console.log("New Vault Created:", getExplorerAddressLink(newVaultAddress, Number(chainId)))
        setShowLaunchingSnack(false)
        setShowVaultCreatedSnack(false)

    }

    // Smart Contract Handle Functions
    const { launchVault, launchVaultState } = useRCU()
    const isLaunchInProgress = (launchVaultState.status === "Mining")
    const handleLaunchVault = () => {
        console.log("Trying to Launch Vault :")
        return launchVault()
    }

    const { getVaultList } = useRCU()
    const handleGetVaults = () => {
        const x = getVaultList()
        setVaultList(x)
        console.log("Vault-List", x)
        return x
    }

    const InfoToast = () => (
        <Fragment>
            <div className='toastify-header'>
                <div className='title-wrapper'>
                    <Avatar size='sm' color='info' icon={<Info size={12} />} />
                    <h6 className='toast-title'>Info!</h6>
                </div>
            </div>
            <div className='toastify-body'>
                <span role='img' aria-label='toast-text'>
                    <strong>{VaultList.length > 0 ? `${VaultList.length} Vaults found - Check Console!` : `Create New Vault`}</strong>
                </span>
            </div>
        </Fragment>
    )

    const notifyInfo = () => toast.info(<InfoToast />, { hideProgressBar: false })

    useEffect(() => {
        if (launchVaultState.status === "Mining") {
            const tx_id = String(launchVaultState.transaction?.hash)
            setLaunchVaultTxn(tx_id)
            console.log("***Handle TX_ID: ", tx_id)
            setShowLaunchingSnack(true)
        }
        if (launchVaultState.status === "Success") {
            const newVault = getAddress(hexStripZeros(String(launchVaultState.receipt?.logs[0].topics[2])))
            setNewVaultAddress(newVault)
            console.log("***Handle New Vault: ", newVault)
            console.log("***Handle Short Vault: ", shortenAddress(newVault))
            setShowVaultCreatedSnack(true)
        }
    }, [launchVaultState])

    useEffect(() => {
        if (notifications.filter(
            (notification) => notification.type === "transactionStarted" && notification.transactionName === "Create New Vault").length > 0) {
            console.log("Notifications : New Vault Launch Started")
        }
        if (notifications.filter(
            (notification) => notification.type === "transactionSucceed" && notification.transactionName === "Create New Vault").length > 0) {
            console.log("Notifications : New Vault Launch Completed")
        }
    }, [notifications])

    return (
        <Modal className='modal-dialog-centered modal-lg' isOpen={openvault} toggle={handleVaultModal} >
            <ModalHeader tag='h2' toggle={handleVaultModal} >
                New Vault
            </ModalHeader>
            <ModalBody style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Row style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Col>
                        <h3>Create a new independent Vault.</h3>
                    </Col>
                    <Col>
                        <p>All names set by you are stored locally on your PC and are not collected by Risk Protocol. Current user will also be designated as the owner
                            for the new Vault.
                        </p>
                    </Col>
                    <Col>
                        <p>You will be required to pay the network fees for new Vault creation.</p>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for='nickname' style={{ fontSize: "1.3em" }}>Nickname</Label>
                            <Input type='text' id='nickname' />
                        </FormGroup>
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter className='justify-content-center'>
                <Button.Ripple color='primary' id='controlledPopover' onClick={handleLaunchVault}>
                    {isLaunchInProgress ? <Spinner color='primary' size={26} /> : <span><PlusCircle className='mr-1' size={17} />Create</span>}
                </Button.Ripple>
                <Button.Ripple color='primary' onClick={() => {
                    handleGetVaults()
                    console.log(VaultList)
                    notifyInfo()
                }}>
                    Refresh Count
                </Button.Ripple>
                <div>
                    <Alert isOpen={showLaunchingSnack} toggle={() => handleSnackClose()} color="info">
                        <div>Vault Launch in Progress. Transaction ID : &emsp; </div>
                        <a href={getExplorerTransactionLink(launchVaultTxn, chainId ? chainId : 1)}
                            target="_blank" rel="noreferrer">
                            {launchVaultTxn} </a>
                    </Alert>
                    <Alert isOpen={showVaultCreatedSnack} toggle={() => handleSnackClose()} color="success">
                        New Vault Launched :
                        <div><a href={getExplorerAddressLink(newVaultAddress, chainId ? chainId : 1)} target="_blank" rel="noreferrer">
                            {newVaultAddress} </a> </div>
                        <div>Transaction ID :</div>
                        <a href={getExplorerTransactionLink(launchVaultTxn, chainId ? chainId : 1)}
                            target="_blank" rel="noreferrer"> {launchVaultTxn} </a>
                    </Alert>
                </div>
            </ModalFooter>
        </Modal>
    )
}

export default CreateVaultModal