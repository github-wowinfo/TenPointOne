import Select from 'react-select'
import { X, PlusCircle } from 'react-feather'
import { selectThemeColors } from '@utils'
import { Modal, ModalBody, ModalHeader, ModalFooter, Row, Col, Input, Label, FormGroup, Button, Alert, Spinner } from 'reactstrap'
import { getAddress, hexStripZeros } from "ethers/lib/utils"
import { useEthers, getExplorerAddressLink, getExplorerTransactionLink, shortenIfAddress, shortenIfTransactionHash } from "@usedapp/core"
import React, { useState, useEffect } from "react"
import { useRCU } from '../../../utility/hooks/useRCU'
import { useVault } from '../../../utility/hooks/useVaults'

const CreateSegaModal = ({ opensega, handleSegaModal }) => {

    const { chainId } = useEthers()

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

    // Initialise Vault to Manage
    const [Vault, setVault] = useState("")
    const handleSetVault = (value) => {
        console.log(value.label)
        setSegaList([])
        setHaveInfo(0)
        setVault(value.label)
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
        if (Vault.length > 0) {
            const x = getSegaList()
            setSegaList(x)
            console.log("Sega-List : ", x)
        } else {
            handleGetAllVaults()
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
        setShowSegaCreatedSnack(false)
    }

    // Launch Sega Button Handles
    const isLaunchInProgress = (createNewSegaState.status === "Mining")
    const handleLaunchSega = () => {
        console.log("Trying to Launch Sega :")
        return createNewSega()
    }
    // To track state of Sega creation Trasnactions
    useEffect(() => {
        if (createNewSegaState.status === "Mining") {
            const tx_id = createNewSegaState.transaction?.hash
            setLaunchSegaTxn(tx_id)
            console.log("***Handle TX_ID: ", shortenIfTransactionHash(tx_id))
            setShowSegaLaunchingSnack(true)
        }
        if (createNewSegaState.status === "Success") {
            const newSega = getAddress(hexStripZeros(createNewSegaState.receipt?.logs[1].topics[2]))
            setNewSegaAddress(newSega)
            console.log("***Handle New Sega: ", newSega)
            console.log("***Handle Short Sega: ", shortenIfAddress(newSega))
            setShowSegaCreatedSnack(true)
        }
    }, [createNewSegaState])

    // const CloseBtn = <X className='cursor-pointer' size={25} onClick={handleModal} />

    const vlist = VaultList.map((vault, index) => ({ value: index, label: vault }))

    return (
        <Modal className='modal-dialog-centered modal-lg' isOpen={opensega} toggle={handleSegaModal} >
            <ModalHeader tag='h2' toggle={handleSegaModal}>
                New Sega
            </ModalHeader>
            <ModalBody style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Row style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Col>
                        <h3>Create a new independent Sega linked to any of your Vault.</h3>
                    </Col>
                    <Col>
                        <p>All names set by you are stored locally on your PC and are not collected by Risk Protocol. Current user will also be designated as the owner
                            for the new Vault.
                        </p>
                    </Col>
                    <Col>
                        <p>You will be required to pay the network fees for new Vault creation.</p>
                    </Col>
                    <Col className='mb-1'>
                        <div className='d-flex flex-row justify-content-between my-1'>
                            <Label style={{ fontSize: "1.3em" }}>Parent Vault</Label>
                            <Button.Ripple size='sm' color='primary' onClick={handleGetAllVaults}>Refresh</Button.Ripple>
                        </div>
                        <Select
                            className='react-select'
                            classNamePrefix='select'
                            defaultValue=''
                            name='clear'
                            options={vlist}
                            onChange={handleSetVault}
                        />
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for='nickname' style={{ fontSize: "1.3em" }}>Nickname</Label>
                            <Input type='text' id='nickname' />
                        </FormGroup>
                    </Col>
                    <Col>
                        <Button.Ripple className='mx-1' onClick={handleGetSegas}>Show all SEGA's</Button.Ripple>
                        <span>
                            {SegaList.length > 0 ? (`${SegaList.length - 1} SEGAs - see console`) : "Get List of All SEGAs"}
                        </span>
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter className='d-flex flex-column align-items-center justify-content-center'>
                <Button.Ripple color='primary' id='controlledPopover' onClick={handleLaunchSega}>
                    {isLaunchInProgress ? <Spinner color='light' size='sm' /> : <span><PlusCircle className='mr-1' size={17} />Create</span>}
                </Button.Ripple>
                <div className='d-flex flex-column justify-content-center'>
                    <Alert isOpen={showSegaLaunchingSnack} toggle={() => handleSnackClose()} color="info">
                        <div>Sega Launch in Progress. Transaction ID : &emsp; </div>
                        <a href={getExplorerTransactionLink(launchSegaTxn, chainId ? chainId : 1)}
                            target="_blank" rel="noreferrer">
                            {launchSegaTxn} </a>
                    </Alert>
                    <Alert isOpen={showSegaCreatedSnack} toggle={() => handleSnackClose()} color="success">
                        New Sega Launched :
                        <div><a href={getExplorerAddressLink(newSegaAddress, chainId ? chainId : 1)} target="_blank" rel="noreferrer">
                            {newSegaAddress} </a> </div>
                        <div>Transaction ID :</div>
                        <a href={getExplorerTransactionLink(launchSegaTxn, chainId ? chainId : 1)}
                            target="_blank" rel="noreferrer"> {launchSegaTxn} </a>
                    </Alert>
                </div>
            </ModalFooter>
        </Modal>
    )
}

export default CreateSegaModal