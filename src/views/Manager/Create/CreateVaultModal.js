import { X, PlusCircle, Info, Check, XCircle } from 'react-feather'
import { toast } from 'react-toastify'
import Avatar from '@components/avatar'
import { Modal, ModalBody, ModalHeader, ModalFooter, Row, Col, Input, Label, FormGroup, Button, Popover, Alert, Spinner } from 'reactstrap'
import { useEthers, useNotifications, shortenAddress, getExplorerAddressLink, getExplorerTransactionLink, shortenIfTransactionHash, shortenIfAddress } from "@usedapp/core"
import { useRCU } from '../../../utility/hooks/useRCU'
import { getAddress, hexStripZeros } from "ethers/lib/utils"
import React, { useState, useEffect, Fragment } from "react"
import { connect } from 'react-redux'
import * as AppData from '../../../redux/actions/cookies/appDataType'
import { FaRegCheckCircle } from 'react-icons/fa'
import { FiXCircle } from 'react-icons/fi'

const CreateVaultModal = ({ openvault, handleVaultModal, globalVaultFlag, dispatch }) => {

    // const CloseBtn = <X className='cursor-pointer' size={25} onClick={handleModal} />

    const { account, chainId } = useEthers()
    const { notifications } = useNotifications()

    //State Hooks
    const [nickName, setNickName] = useState('')
    const [VaultList, setVaultList] = useState([])
    const [launchVaultTxn, setLaunchVaultTxn] = useState("")
    const [newVaultAddress, setNewVaultAddress] = useState("")

    const [showLaunchingSnack, setShowLaunchingSnack] = useState(false)
    const [showVaultCreatedSnack, setShowVaultCreatedSnack] = useState(false)

    const [vname, setVname] = useState(false)
    const onChangeName = (e) => {
        if (e.target.value === '') {
            setVname(false)
        } else {
            setVname(true)
            setNickName(e.target.value)
        }
    }
    // const onChangeName = (e) => {
    //     setNickName(e.target.value)
    //     console.log(e.target.value)
    // }
    const handleSnackClose = () => {
        console.log("Vault Creation Txn:", getExplorerTransactionLink(launchVaultTxn, Number(chainId)))
        console.log("New Vault Created:", getExplorerAddressLink(newVaultAddress, Number(chainId)))
        setShowLaunchingSnack(false)
    }

    const handleVaultCreatedSnackClose = () => {
        setShowLaunchingSnack(false)
        setShowVaultCreatedSnack(false)
    }

    const handleModalVaultSnackClose = () => {
        setVname(false)
        setTimeout(() => {
            setShowLaunchingSnack(false)
            setShowVaultCreatedSnack(false)
        }, 5 * 60 * 1000)
    }

    // Smart Contract Handle Functions from useRCU.ts file
    const { getRPAdmin, getVaultFactory, getSegaFactory,
        getVaultList, getSegaList,
        changeAdmin, changeAdminState,
        changeVFact, changeVFactState,
        changeSFact, changeSFactState,
        launchVault, launchVaultState,
    } = useRCU()

    // Smart Contract Handle Functions
    const isLaunchInProgress = (launchVaultState.status === "Mining")
    const handleLaunchVault = () => {
        handleVaultCreatedSnackClose()
        console.log("Trying to Launch Vault :")
        return launchVault()
    }
    const handleGetAllVaults = () => {
        const getdata = JSON.parse(localStorage.getItem('vaultdata'))
        if (getdata) {
            setVaultList(getdata.filter(a => a.show === true && a.network === chainId && a.owner === account))
            console.log("Vault-List", getdata)
        }
    }

    const notifySuccess = () => toast.success(<SuccessToast />, { hideProgressBar: false })
    const SuccessToast = () => (
        <Fragment>
            <div className='toastify-header'>
                <div className='title-wrapper'>
                    <Avatar size='md' color='success' icon={<FaRegCheckCircle size={12} />} />
                    <h3 className='toast-title'>Vault Created!</h3>
                </div>
            </div>
            <div className='toastify-body'>
                <span role='img' aria-label='toast-text'>
                    {/* Vault with Address "{shortenIfAddress(newVaultAddress)}" has been created and can be found in your navigation pane. */}
                    Vault has been created and can be found in your navigation pane.
                </span>
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

    useEffect(() => {
        if (launchVaultState.status === "Exception" || launchVaultState.status === "Fail") {
            notifyError(launchVaultState.errorMessage)
        }
        if (launchVaultState.status === "Mining") {
            const tx_id = String(launchVaultState.transaction?.hash)
            setLaunchVaultTxn(tx_id)
            console.log("***Handle TX_ID: ", tx_id)
            setShowLaunchingSnack(true)
        }
        if (launchVaultState.status === "Success") {
            const newVault = getAddress(hexStripZeros(String(launchVaultState.receipt?.logs[0].topics[2])))
            setNewVaultAddress(newVault)

            const getdata = JSON.parse(localStorage.getItem('vaultdata'))
            const postdata =
            {
                owner: account,
                name: nickName,
                address: newVault,
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
            console.log("***Handle New Vault: ", newVault)
            console.log("***Handle Short Vault: ", shortenAddress(newVault))
            setShowVaultCreatedSnack(true)

            if (globalVaultFlag === 0) {
                dispatch(AppData.globalVaultFlag(1))
            } else {
                dispatch(AppData.globalVaultFlag(0))
            }

            const getAdrsdata = JSON.parse(localStorage.getItem('adrsbook'))
            const adrsdata =
            {
                owner: account,
                nickname: nickName,
                adrs: newVault,
                network: chainId
            }
            let adrsbook = []
            if (getAdrsdata) {
                adrsbook = [...getAdrsdata, adrsdata]
            } else {
                adrsbook = [adrsdata]
            }
            localStorage.setItem('adrsbook', JSON.stringify(adrsbook))

            notifySuccess()
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
        <Modal className='modal-dialog-centered ' isOpen={openvault} >
            <ModalHeader tag='h2' toggle={() => {
                handleModalVaultSnackClose()
                handleVaultModal()
            }} >
                Create New Vault
            </ModalHeader>
            <ModalBody>
                <Row style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    {/* <Col>
                        <h3>Create a new independent Vault.</h3>
                    </Col> */}
                    <Col>
                        <p>Account names are stored locally and are not collected by Risk Protocol. Current user will be designated as the Vault Owner.</p>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for='nickname' style={{ fontSize: "1.3em" }}>Nickname</Label>
                            <Input type='text' id='nickname' onChange={onChangeName} />
                        </FormGroup>
                    </Col>
                    {/* <Col>
                        <Button.Ripple className='mx-1' onClick={handleGetAllVaults}>Show All Vaults</Button.Ripple>
                        <span>
                            {VaultList?.length > 0 ? `${VaultList.length} Vaults - see console` : "Get List of All Vaults"}
                        </span>
                    </Col> */}
                </Row>
            </ModalBody>
            <ModalFooter className='d-flex flex-column align-items-center justify-content-center'>
                {
                    vname === false ? null : (
                        <Button.Ripple color='primary' id='controlledPopover' onClick={handleLaunchVault}>
                            {isLaunchInProgress ? <Spinner color='light' size='sm' /> : <span><PlusCircle className='mr-1' size={17} />Create</span>}
                        </Button.Ripple>)
                }
            </ModalFooter>
            <Col className='d-flex flex-column justify-content-center'>
                <Alert className='p-1' isOpen={showLaunchingSnack} toggle={() => handleSnackClose()} color="info">
                    <div>Vault Launch in Progress. Transaction ID : &emsp; </div>
                    <a href={getExplorerTransactionLink(launchVaultTxn, chainId ? chainId : 1)}
                        target="_blank" rel="noreferrer">
                        {shortenIfTransactionHash(launchVaultTxn)} </a>
                </Alert>
                <Alert className='p-1' isOpen={showVaultCreatedSnack} toggle={() => handleVaultCreatedSnackClose()} color="success">
                    New Vault Launched :
                    <div><a href={getExplorerAddressLink(newVaultAddress, chainId ? chainId : 1)} target="_blank" rel="noreferrer">
                        {newVaultAddress} </a> </div>
                    <div>Transaction ID :</div>
                    <a href={getExplorerTransactionLink(launchVaultTxn, chainId ? chainId : 1)}
                        target="_blank" rel="noreferrer"> {shortenIfTransactionHash(launchVaultTxn)} </a>
                </Alert>
            </Col>
        </Modal>
    )
}

// export default CreateVaultModal
const mapStateToProps = (state) => ({
    globalAdrs: state.appData.globalAdrs,
    globalNickName: state.appData.globalNickName,
    globalVaultFlag: state.appData.globalVaultFlag
})
const mapDispatchToProp = dispatch => ({ dispatch })
export default connect(mapStateToProps, mapDispatchToProp)(CreateVaultModal)