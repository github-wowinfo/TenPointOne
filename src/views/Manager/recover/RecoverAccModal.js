import { X, Unlock } from 'react-feather'
import { Modal, ModalBody, ModalHeader, ModalFooter, Row, Col, Input, Label, FormGroup, Button, Alert } from 'reactstrap'
import { useState, useEffect, Fragment } from 'react'
import { useVault } from '../../../utility/hooks/useVaults'
import { isAddress } from "ethers/lib/utils"
import { useEthers, getExplorerTransactionLink } from '@usedapp/core'
import { toast } from 'react-toastify'
import Avatar from '@components/avatar'

const RecoverAccModal = ({ openrecovermodal, handleRecoverModal }) => {

    const { account, chainId } = useEthers()

    const [Vault, setVault] = useState("")

    const notifySuccess = () => toast.success(<SuccessToast />, { hideProgressBar: false })

    const SuccessToast = () => (
        <Fragment>
            <div className='toastify-header'>
                <div className='title-wrapper'>
                    <Avatar size='sm' color='success' icon={<Clipboard size={12} />} />
                    <h6 className='toast-title'>Vault is Recovered and will be visible in your vault list!</h6>
                </div>
            </div>
        </Fragment>
    )

    // Import neccesary functions from useVaults.ts
    const { getRecoveryInfo, getSegaList,
        changeBackup, changeUnlockPeriod, claimVault,
        txnState,
        createNewSega, createNewSegaState,
    } = useVault(Vault)

    const handleSetVault = (e) => {
        const vaultadrs = e.target.value
        if (isAddress(vaultadrs)) {
            setVault(vaultadrs)
        }
    }

    const handleClaimVault = () => {
        return claimVault()
    }

    const [nickName, setNickName] = useState('')
    const onChangeName = (e) => {
        setNickName(e.target.value)
    }

    const addToLocal = () => {
        const getdata = JSON.parse(localStorage.getItem('vaultdata'))
        const postdata =
        {
            owner: account,
            name: nickName,
            address: Vault,
            network: chainId,
            show: true
        }
        let vaultdata = []
        if (getdata) {
            vaultdata = [...getdata, postdata]
        } else {
            vaultdata = [postdata]
        }
        localStorage.setItem('vaultdata', JSON.stringify(vaultdata))
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
    useEffect(() => {
        if (txnState.status === "Mining") {
            const tx_id = String(txnState.transaction?.hash)
            setTxnID(tx_id.toString())
            console.log("***Handle TX_ID: ", txnState.status, tx_id)
            setShowTxnMiningSnack(true)
        }
        if (txnState.status === "Success") {
            setTxnSuccessSnack(true)
            addToLocal()
            // notifySuccess()
        }
    }, [txnState])

    // const CloseBtn = <X className='cursor-pointer' size={25} onClick={handleModal} />

    return (

        <Modal className='modal-dialog-centered' isOpen={openrecovermodal} toggle={() => {
            handleRecoverModal()
            handleTxnSnackClose()
        }} >
            {/* {console.log('new vault', Vault)} */}
            <ModalHeader tag='h1' toggle={() => {
                handleRecoverModal()
                handleTxnSnackClose()
            }} >
                Recover Vault
            </ModalHeader>
            <ModalBody style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Row style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Col>
                        <h3>Recovery is only possible by the designated Backup Account and only after the owner has been inactive for the time period as set by Owner.</h3>
                    </Col>
                    <Col className="my-1">
                        <FormGroup>
                            <Label for='nickname' style={{ fontSize: "1.3em" }}>Nickname</Label>
                            <Input type='text' id='nickname' onChange={onChangeName} placeholder="Provide a Nickname for the vault being recovered!" />
                        </FormGroup>
                        <FormGroup>
                            <Label for='vaultadrs' style={{ fontSize: "1.3em" }}>Vault Address</Label>
                            <Input type='text' id='vaultadrs' onChange={handleSetVault} placeholder="Paste the address of the vault you want to recover over here!" />
                            <p style={{ fontSize: '.75em' }}>If you are uncertain of the vault address, you can still find it. If you know the account address of the Owner. Check documentation
                                <a href='#' style={{ color: 'red' }}> here</a> to see how.</p>
                        </FormGroup>
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter className='justify-content-center'>
                {Vault === '' ? (
                    <Button.Ripple color='primary' disabled>
                        <Unlock className='mr-1' size={17} />
                        Recover
                    </Button.Ripple>
                ) : (
                    <Button.Ripple color='primary' onClick={handleClaimVault}>
                        <Unlock className='mr-1' size={17} />
                        Recover
                    </Button.Ripple>)}
            </ModalFooter>
            <Col className='d-flex flex-column justify-content-center'>
                <Alert isOpen={showTxnMiningSnack} toggle={() => handleTxnSnackClose()} color="info">
                    <div>Transaction in Progress- Txn ID : &emsp; </div>
                    <a href={getExplorerTransactionLink(txnID, chainId ? chainId : 1)}
                        target="_blank" rel="noreferrer">
                        {shortenIfTransactionHash(txnID)} </a>
                </Alert>
                <Alert isOpen={showTxnSuccessSnack} toggle={() => handleTxnSnackClose()} color="success">
                    <div>Transaction Completed - Txn ID :</div>
                    <a href={getExplorerTransactionLink(txnID, chainId ? chainId : 1)}
                        target="_blank" rel="noreferrer">
                        {shortenIfTransactionHash(txnID)} </a>
                </Alert>
            </Col>
        </Modal>
    )
}

export default RecoverAccModal