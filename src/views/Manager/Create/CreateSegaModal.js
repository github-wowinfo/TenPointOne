import Select from 'react-select'
import { X, PlusCircle, Check, XCircle } from 'react-feather'
import Avatar from '@components/avatar'
import { selectThemeColors } from '@utils'
import { Modal, ModalBody, ModalHeader, ModalFooter, Row, Col, Input, Label, FormGroup, Button, Alert, Spinner } from 'reactstrap'
import { getAddress, hexStripZeros } from "ethers/lib/utils"
import { useEthers, getExplorerAddressLink, getExplorerTransactionLink, shortenIfAddress, shortenIfTransactionHash } from "@usedapp/core"
import React, { useState, useEffect, Fragment } from "react"
import { useRCU } from '../../../utility/hooks/useRCU'
import { useVault } from '../../../utility/hooks/useVaults'
import { toast } from 'react-toastify'
import { FaRegCheckCircle } from 'react-icons/fa'
import { FiXCircle } from 'react-icons/fi'

const CreateSegaModal = ({ opensega, handleSegaModal }) => {

    const { account, chainId } = useEthers()

    const { getVaultList } = useRCU()
    const [VaultList, setVaultList] = useState([])
    const handleGetAllVaults = () => {
        const x = getVaultList()
        setVaultList(x)
        console.log("Vault-List : ", x)
    }

    // Declaring State Hooks
    const [SegaList, setSegaList] = useState([])
    const [haveInfo, setHaveInfo] = useState(0)
    const [nickName, setNickName] = useState('')
    const [vaultselect, setVaultselect] = useState(false)

    // Initialise Vault to Manage
    const [Vault, setVault] = useState("")
    const handleSetVault = (value) => {
        console.log(value)
        setVaultselect(true)
        setSegaList([])
        setHaveInfo(0)
        setVault(value.adrs)
    }

    // Import neccesary functions from useVaults.ts
    const { getRecoveryInfo,
        getSegaList,
        changeBackup,
        changeUnlockPeriod,
        claimVault,
        txnState,
        createNewSega,
        createNewSegaState,
    } = useVault(Vault.toString())

    //GET LIST OF VAULT's SEGAs
    const handleGetSegas = () => {
        // if (Vault.length > 0) {
        //     const x = getSegaList()
        //     setSegaList(x)
        //     console.log("Sega-List : ", x)
        // } else {
        //     handleGetAllVaults()
        // }    

        if (Vault.length > 0) {
            const getdata = JSON.parse(localStorage.getItem('segadata'))
            if (getdata) {
                const sega = getdata.filter(a => a.vault === Vault && a.show === true && a.network === chainId && a.owner === account)
                setSegaList(sega)
                console.log("Sega-List", sega)
            }
        }

        // const getdata = JSON.parse(localStorage.getItem('segadata'))
        // const vaultdata = getdata.map(a => ({ ...a, show: true }))
        // console.log(vaultdata)
        // localStorage.setItem('segadata', JSON.stringify(vaultdata))


    }

    const [vname, setVname] = useState(false)
    const onChangeName = (e) => {
        if (e.target.value === '') {
            setVname(false)
        } else {
            setVname(true)
            setNickName(e.target.value)
        }
    }

    //SNACKBAR Settings for Sega Launches
    const [launchSegaTxn, setLaunchSegaTxn] = useState("")
    const [newSegaAddress, setNewSegaAddress] = useState("")
    const [showSegaLaunchingSnack, setShowSegaLaunchingSnack] = useState(false)
    const [showSegaCreatedSnack, setShowSegaCreatedSnack] = useState(false)
    const handleSnackClose = () => {
        console.log("Snack Close - Sega Creation Txn:", getExplorerTransactionLink(launchSegaTxn, Number(chainId)))
        console.log("Snack Close - New Sega Created:", getExplorerAddressLink(newSegaAddress, Number(chainId)))
        setShowSegaLaunchingSnack(false)
    }

    const handleSegaCreatedSnackClose = () => {
        setShowSegaLaunchingSnack(false)
        setShowSegaCreatedSnack(false)
    }

    const handleModalSegaSnackClose = () => {
        setVname(false)
        setTimeout(() => {
            setShowSegaLaunchingSnack(false)
            setShowSegaCreatedSnack(false)
        }, 60 * 1000)
    }

    // Launch Sega Button Handles
    const isLaunchInProgress = (createNewSegaState.status === "Mining")
    const handleLaunchSega = () => {
        handleSegaCreatedSnackClose()
        console.log("Trying to Launch Sega :")
        return createNewSega()
    }

    const notifySuccess = () => toast.success(<SuccessToast />, { hideProgressBar: false })
    const SuccessToast = () => (
        <Fragment>
            <div className='toastify-header'>
                <div className='title-wrapper'>
                    <Avatar size='md' color='success' icon={<FaRegCheckCircle size={12} />} />
                    <h3 className='toast-title'>Sega Created!</h3>
                </div>
            </div>
            <div className='toastify-body'>
                <span role='img' aria-label='toast-text'>
                    {/* Sega with Address "{shortenIfAddress(newSegaAddress)}" has been created and can be found in your navigation pane. */}
                    Sega has been created and can be found in your navigation pane.
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

    // To track state of Sega creation Trasnactions
    useEffect(() => {
        if (createNewSegaState.status === "Exception" || createNewSegaState.status === "Fail") {
            notifyError(createNewSegaState.errorMessage)
        }
        if (createNewSegaState.status === "Mining") {
            const tx_id = createNewSegaState.transaction?.hash
            setLaunchSegaTxn(tx_id)
            console.log("***Handle TX_ID: ", shortenIfTransactionHash(tx_id))
            setShowSegaLaunchingSnack(true)
        }
        if (createNewSegaState.status === "Success") {
            const newSega = getAddress(hexStripZeros(createNewSegaState.receipt?.logs[1].topics[2]))
            setNewSegaAddress(newSega)

            const getdata = JSON.parse(localStorage.getItem('segadata'))
            const postdata =
            {
                owner: account,
                vault: Vault,
                name: nickName,
                address: newSega,
                network: chainId,
                show: true
            }
            let segadata = []
            if (getdata) {
                segadata = [...getdata, postdata]
            } else {
                segadata = [postdata]
            }
            localStorage.setItem('segadata', JSON.stringify(segadata))

            console.log("***Handle New Sega: ", newSega)
            console.log("***Handle Short Sega: ", shortenIfAddress(newSega))
            setShowSegaCreatedSnack(true)

            const getAdrsdata = JSON.parse(localStorage.getItem('adrsbook'))
            const adrsdata =
            {
                owner: account,
                nickname: nickName,
                adrs: newSega,
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
    }, [createNewSegaState])

    // const CloseBtn = <X className='cursor-pointer' size={25} onClick={handleModal} />

    // const vlist = VaultList.map((vault, index) => ({ value: index, label: vault }))


    const getVaultListFromLocal = () => {
        const getdata = JSON.parse(localStorage.getItem('vaultdata'))
        const valueData = getdata && getdata.filter(a => a.show === true && a.network === chainId && a.owner === account)
        // console.log(valueData)
        // const vaultlist = valueData && valueData.map((vault, index) => ({ value: index, label: vault.address }))
        const vaultlist = valueData && valueData.map((vault, index) => ({ value: index, label: `${vault.name} - ${vault.address}`, adrs: `${vault.address}` }))
        setVaultList(vaultlist)
    }

    useEffect(() => {
        getVaultListFromLocal()

        return () => {

        }
    }, [opensega, chainId])

    return (
        <Modal className='modal-dialog-centered' isOpen={opensega} >
            <ModalHeader tag='h2' toggle={() => {
                handleModalSegaSnackClose()
                handleSegaModal()
            }}>
                Create New Sega
            </ModalHeader>
            <ModalBody>
                <Row className='d-flex flex-column justify-content-center align-items-center'>
                    {/* <Col>
                        <h3>Create a new independent Sega linked to any of your Vault.</h3>
                    </Col> */}
                    <Col>
                        <p>Account names are stored locally and are not collected by Risk Protocol. Current user will be designated as the Sega Operator.</p>
                    </Col>
                    <Col className='mb-1'>
                        <div className='d-flex flex-row justify-content-between my-1'>
                            <Label style={{ fontSize: "1.3em" }}>Parent Vault</Label>
                            {/* <Button.Ripple size='sm' color='primary' onClick={handleGetAllVaults}>Refresh</Button.Ripple> */}
                        </div>
                        <Select
                            className='react-select'
                            classNamePrefix='select'
                            maxMenuHeight={200}
                            defaultValue=''
                            name='clear'
                            options={VaultList}
                            onChange={handleSetVault}
                        />
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for='nickname' style={{ fontSize: "1.3em" }}>Nickname</Label>
                            <Input type='text' id='nickname' onChange={onChangeName} />
                        </FormGroup>
                    </Col>
                    {/* <Col>
                        <Button.Ripple className='mx-1' onClick={handleGetSegas}>Show all SEGA's</Button.Ripple>
                        <span>
                            {SegaList.length > 0 ? (`${SegaList.length} SEGAs - see console`) : "Get List of All SEGAs"}
                        </span>
                    </Col> */}
                </Row>
            </ModalBody>
            <ModalFooter className='d-flex flex-column align-items-center justify-content-center'>
                {
                    vname === true && vaultselect === true ? (
                        <Button.Ripple color='primary' id='controlledPopover' onClick={handleLaunchSega}>
                            {isLaunchInProgress ? <Spinner color='light' size='sm' /> : <span><PlusCircle className='mr-1' size={17} />Create</span>}
                        </Button.Ripple>
                    ) : null
                }
            </ModalFooter>
            <Col className='d-flex flex-column justify-content-center'>
                <Alert className='p-1' isOpen={showSegaLaunchingSnack} toggle={() => handleSnackClose()} color="info">
                    <div>Sega Launch in Progress. Transaction ID : &emsp; </div>
                    <a href={getExplorerTransactionLink(launchSegaTxn, chainId ? chainId : 1)}
                        target="_blank" rel="noreferrer">
                        {shortenIfTransactionHash(launchSegaTxn)} </a>
                </Alert>
                <Alert className='p-1' isOpen={showSegaCreatedSnack} toggle={() => handleSegaCreatedSnackClose()} color="success">
                    New Sega Launched :
                    <div><a href={getExplorerAddressLink(newSegaAddress, chainId ? chainId : 1)} target="_blank" rel="noreferrer">
                        {newSegaAddress} </a> </div>
                    <div>Transaction ID :</div>
                    <a href={getExplorerTransactionLink(launchSegaTxn, chainId ? chainId : 1)}
                        target="_blank" rel="noreferrer"> {shortenIfTransactionHash(launchSegaTxn)} </a>
                </Alert>
            </Col>
        </Modal>
    )
}

export default CreateSegaModal