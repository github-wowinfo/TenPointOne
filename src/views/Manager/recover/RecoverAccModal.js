import { X, Unlock, Check, XCircle } from 'react-feather'
import { Modal, ModalBody, ModalHeader, ModalFooter, Row, Col, Input, Label, FormGroup, Button, Alert, UncontrolledAlert } from 'reactstrap'
import { useState, useEffect, Fragment } from 'react'
import { useVault } from '../../../utility/hooks/useVaults'
import { isAddress } from "ethers/lib/utils"
import { useEthers, getExplorerTransactionLink, shortenIfTransactionHash } from '@usedapp/core'
import { toast } from 'react-toastify'
import Avatar from '@components/avatar'
import { FaRegCheckCircle } from 'react-icons/fa'
import { FiXCircle } from 'react-icons/fi'

const RecoverAccModal = ({ openrecovermodal, handleRecoverModal }) => {

    const { account, chainId } = useEthers()

    const [Vault, setVault] = useState("")

    const notifySuccess = () => toast.success(<SuccessToast />, { hideProgressBar: false })

    const SuccessToast = () => (
        <Fragment>
            <div className='toastify-header'>
                <div className='title-wrapper'>
                    <Avatar size='md' color='success' icon={<FaRegCheckCircle size={12} />} />
                    <h3 className='toast-title'>Vault is Recovered and will be visible in your vault list!</h3>
                </div>
            </div>
        </Fragment>
    )

    const [name_flag, setName_flag] = useState(false)
    const [nickName, setNickName] = useState('')
    const onChangeName = (e) => {
        const v_adrs = e.target.value
        if (v_adrs !== "") {
            setName_flag(true)
            setNickName(v_adrs)
        } else {
            setName_flag(false)
        }
    }

    // Import neccesary functions from useVaults.ts
    const { getRecoveryInfo, claimVault,
        txnState,
    } = useVault(Vault)

    const [exe_vault, setExe_vault] = useState(false)
    const handleSetVault = (e) => {
        const vaultadrs = e.target.value
        if (isAddress(vaultadrs) && vaultadrs !== "") {
            setVault(vaultadrs)
            const getVaultdata = JSON.parse(localStorage.getItem('vaultdata'))
            if (getVaultdata !== undefined || getVaultdata !== []) {
                for (const i in getVaultdata) {
                    if (getVaultdata[i].address === vaultadrs && getVaultdata[i].owner === account && getVaultdata[i].network === chainId) {
                        setExe_vault(true)
                    }
                }
            }
        }
    }

    const [wrong_adrs, setWrong_adrs] = useState(false)
    const handleClaimVault = () => {
        const { _backup } = getRecoveryInfo()
        console.log('_backup', _backup)
        if (_backup === account) {
            return claimVault()
            // alert('works')
        } else {
            setWrong_adrs(true)
        }
    }

    const addToLocal = () => {
        const getdata = JSON.parse(localStorage.getItem('vaultdata'))
        if (getdata) {
            for (const i in getdata) {
                if (getdata[i].address === Vault && getdata[i].owner === account && getdata[i].network === chainId) {
                    getdata.splice(i, 1)
                    break
                }
            }
            localStorage.setItem('vaultdata', JSON.stringify(getdata))
        }
        const getvdata = JSON.parse(localStorage.getItem('vaultdata'))
        const postdata =
        {
            owner: account,
            name: nickName,
            address: Vault,
            network: chainId,
            show: true
        }
        let vaultdata = []
        if (getvdata) {
            vaultdata = [...getvdata, postdata]
        } else {
            vaultdata = [postdata]
        }
        localStorage.setItem('vaultdata', JSON.stringify(vaultdata))
    }

    const addToAdrsBook = () => {
        const getAdrsdata = JSON.parse(localStorage.getItem('adrsbook'))
        if (getAdrsdata) {
            for (const i in getAdrsdata) {
                if (getAdrsdata[i].address === Vault && getAdrsdata[i].owner === account && getAdrsdata[i].network === chainId) {
                    getAdrsdata.splice(i, 1)
                    break
                }
            }
            localStorage.setItem('vaultdata', JSON.stringify(getAdrsdata))
        }
        const getadata = JSON.parse(localStorage.getItem('adrsbook'))
        const adrsdata =
        {
            owner: account,
            nickname: nickName,
            adrs: Vault,
            network: chainId
        }
        let adrsbook = []
        if (getadata) {
            adrsbook = [...getadata, adrsdata]
        } else {
            adrsbook = [adrsdata]
        }
        localStorage.setItem('adrsbook', JSON.stringify(adrsbook))
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
        if (txnState.status === "Success") {
            setTxnSuccessSnack(true)
            addToLocal()
            addToAdrsBook()
            notifySuccess()
        }
    }, [txnState])

    // const CloseBtn = <X className='cursor-pointer' size={25} onClick={handleModal} />

    return (

        <Modal className='modal-dialog-centered' isOpen={openrecovermodal} toggle={() => {
            setNickName("")
            setName_flag(false)
            setVault("")
            setWrong_adrs(false)
            setExe_vault(false)
            handleRecoverModal()
            handleTxnSnackClose()
        }} >
            {/* {console.log('new vault', Vault)} */}
            <ModalHeader tag='h1' toggle={() => {
                setNickName("")
                setName_flag(false)
                setVault("")
                setWrong_adrs(false)
                setExe_vault(false)
                handleRecoverModal()
                handleTxnSnackClose()
            }} >
                <span style={{ color: '#1919d2' }}>Recover Vault</span>
            </ModalHeader>
            <ModalBody>
                <Row style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Col>
                        <p>Recovery is only possible by the designated Backup Account and only after the owner has been inactive
                            for the time period as set by Owner.</p>
                    </Col>
                    <Col className="my-1">
                        <FormGroup>
                            <Label for='nickname' style={{ fontSize: "1.3em" }}>Nickname</Label>
                            <Input type='text' id='nickname' onChange={onChangeName} placeholder="Provide a Nickname for the vault being recovered!" />
                        </FormGroup>
                        <FormGroup>
                            <Label for='vaultadrs' style={{ fontSize: "1.3em" }}>Vault Address</Label>
                            <Input type='text' id='vaultadrs' onChange={handleSetVault} placeholder="Paste the address of the vault you want to recover over here!" />
                            <p className='pt-1' style={{ fontSize: '.70em', lineHeight: 'normal' }}>If you are uncertain of the vault address, you can still find it. If you know the account address of the Owner. Check documentation
                                <a href='#' style={{ color: 'red' }}> here</a> to see how.</p>
                        </FormGroup>
                        {exe_vault ? (
                            <Col>
                                <UncontrolledAlert color='warning'>
                                    <h4 className='alert-heading'>The Vault is already present,<br /> If you still continue the current Vault info will be replaced by new info.</h4>
                                </UncontrolledAlert>
                            </Col>
                        ) : null}
                        {wrong_adrs ? (
                            <Col>
                                <UncontrolledAlert color='danger'>
                                    <h4 className='alert-heading'>The entered Address is not a Vault,<br /> please check the address and try again.</h4>
                                </UncontrolledAlert>
                            </Col>
                        ) : null}
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter className='justify-content-center'>
                {Vault !== '' && name_flag ? (
                    <Button.Ripple color='primary' onClick={handleClaimVault}>
                        <Unlock className='mr-1' size={17} />
                        Recover
                    </Button.Ripple>
                ) : (
                    <Button.Ripple color='primary' disabled>
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