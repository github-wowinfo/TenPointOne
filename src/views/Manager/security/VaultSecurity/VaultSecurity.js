import React, { useState, useEffect, Fragment } from 'react'
import Select from 'react-select'
import { toast } from 'react-toastify'
import Avatar from '@components/avatar'
import { FaRegCopy } from 'react-icons/fa'
import { GoLinkExternal } from 'react-icons/go'
import { selectThemeColors } from '@utils'
import { Modal, ModalBody, ModalHeader, ModalFooter, Row, Col, Input, Label, FormGroup, Button } from 'reactstrap'
import ModifyVault from './ModifyVault'
import ChildrenSega from './ChildrenSega'
import { useRCU } from '../../../../utility/hooks/useRCU'
import { useVault } from '../../../../utility/hooks/useVaults'
import { useEthers, getExplorerAddressLink, getExplorerTransactionLink } from "@usedapp/core"

const VaultSecurity = ({ openvaultsec, handleVaultSecModal }) => {

    const { chainId, account } = useEthers()

    // Smart Contract Handle Functions from useRCU.ts file
    const { getVaultList } = useRCU()

    const [VaultList, setVaultList] = useState([])

    // Declaring State Hooks
    const [SegaList, setSegaList] = useState([])
    const [haveInfo, setHaveInfo] = useState(0)

    // Initialise Vault to Manage
    const [Vault, setVault] = useState("")
    const [Vaultname, setVaultName] = useState("")

    const { getRecoveryInfo,
        getSegaList,
        changeBackup,
        changeUnlockPeriod,
        claimVault,
        txnState,
        createNewSega,
        createNewSegaState,
    } = useVault(Vault.toString())

    const handleGetAllVaults = () => {
        const x = getVaultList()
        setVaultList(x)
        console.log("Vault-List", x)
    }

    //Get Recovery Info
    const [owner, setOwner] = useState("")
    const [backup, setBackup] = useState("")
    const [releaseDt, setReleaseDt] = useState("")
    const [unlockDays, setUnlockDays] = useState(0)

    const handleGetRecoveryInfo = () => {
        console.log(Vault)
        if (Vault.length > 0) {
            const { _owner, _backup, _releaseDt, _unlockDays } = getRecoveryInfo()
            setOwner(_owner)
            setBackup(_backup)
            setReleaseDt(_releaseDt)
            setUnlockDays(_unlockDays)
            setHaveInfo(1)
        } else {
            handleGetAllVaults()
        }
    }

    const handleSetVault = (value) => {
        setSegaList([])
        setHaveInfo(0)
        setVault(value.adrs)
        setVaultName(value.name)
        // setVault(value.label)
        console.log(value)
    }

    //GET LIST OF VAULT's SEGAs
    const handleGetSegas = () => {
        if (Vault.length > 0) {
            const x = getSegaList()
            setSegaList(x)
            console.log("Sega-List : ", x)
        }
        // else {
        //     handleGetAllVaults()
        // }

        // if (Vault.length > 0) {
        //     const getdata = JSON.parse(localStorage.getItem('segadata'))
        //     if (getdata) {
        //         const sega = getdata.filter(a => a.vault === Vault)
        //         setSegaList(sega)
        //         console.log("Sega-List", sega)
        //     }
        // }
    }


    const notifySuccess = () => toast.success(<SuccessToast />, { hideProgressBar: true })

    // const copy = async () => {
    //     await navigator.clipboard.writeText(sega)
    //     notifySuccess()
    // }

    const SuccessToast = () => (
        <Fragment>
            <div className='toastify-header'>
                <div className='title-wrapper'>
                    <Avatar size='sm' color='success' icon={<Clipboard size={12} />} />
                    <h6 className='toast-title'>Copied to Clipboard!</h6>
                </div>
            </div>
        </Fragment>
    )

    const slist = SegaList && SegaList.map((sega, index) => ({
        id: index,
        address: sega,
        icon1: <FaRegCopy className='mx-1' onClick={() => {
            navigator.clipboard.writeText(sega)
            // notifySuccess()
            alert('hi')
        }} />,
        icon2: <a href={getExplorerAddressLink(sega.address, chainId ? chainId : 1)} target='_blank'><GoLinkExternal className='mx-1' /></a>
    }))

    // const CloseBtn = <X className='cursor-pointer' size={25} onClick={handleModal} />

    const vlist = VaultList && VaultList.map((vault, index) => ({ value: index, label: vault }))

    const [modifyvaultmodal, setModifyVaultModal] = useState(false)
    const handleModifyVaultModal = () => {
        setModifyVaultModal(!modifyvaultmodal)
        setHaveInfo(0)
    }

    const [childsegamodal, setChildSegaModal] = useState(false)
    const handleChildSegatModal = () => {
        setChildSegaModal(!childsegamodal)
        handleGetSegas()
    }

    const getVaultListFromLocal = () => {
        const getdata = JSON.parse(localStorage.getItem('vaultdata'))
        const valueData = getdata && getdata.filter(a => a.show === true && a.network === chainId && a.owner === account)
        console.log('valueData', valueData)
        const vaultlist = valueData && valueData.map((vault, index) => ({ value: index, label: `${vault.name} - ${vault.address}`, adrs: vault.address, name: vault.name }))
        setVaultList(vaultlist)
    }


    useEffect(() => {

        getVaultListFromLocal()
        // handleGetAllVaults()

    }, [openvaultsec])

    return (
        <div>
            <Modal className='modal-dialog-centered' isOpen={openvaultsec} toggle={() => {
                handleVaultSecModal()
                setHaveInfo(0)
            }} >
                <ModalHeader tag='h2' toggle={() => {
                    handleVaultSecModal()
                    setHaveInfo(0)
                }}>
                    Select Account to Manage
                </ModalHeader>
                <ModalBody style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Row style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '-webkit-fill-available' }}>
                        <Col className='mb-1' style={{}}>
                            <div className='d-flex flex-row justify-content-between my-1'>
                                <Label style={{ fontSize: "1.3em" }}>Account</Label>
                                {/* <Button.Ripple size='sm' color='primary' onClick={handleGetAllVaults}>Refresh</Button.Ripple> */}
                            </div>
                            <Select
                                className='react-select'
                                classNamePrefix='select'
                                defaultValue=''
                                name='clear'
                                options={VaultList}
                                // options={vlist}
                                onChange={handleSetVault}
                            />
                        </Col>
                        <Col>
                            <hr />
                        </Col>
                        <Col className='text-center'>
                            <Button.Ripple onClick={handleGetRecoveryInfo}>Get Recovery Info</Button.Ripple>
                        </Col>
                        {haveInfo ? (<>
                            <Col>
                                <FormGroup>
                                    <Label for='ownacc' style={{ fontSize: "1.3em" }}>Owner</Label>
                                    <Input type='text' id='ownacc' placeholder='Owner Address' value={owner} />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label for='backupacc' style={{ fontSize: "1.3em" }}>Backup Account</Label>
                                    <Input type='text' id='backupacc' placeholder='Backup Address' value={backup} />
                                </FormGroup>
                            </Col>
                            <Col>
                                <Row>
                                    <Col>
                                        <FormGroup>
                                            <Label for='days' style={{ fontSize: "1.2em" }}>Inactive after Days</Label>
                                            <Input type='text' id='days' placeholder='No. of Days Inactive for..' value={`${unlockDays} Days`} />
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <Label for='rcvrydate' style={{ fontSize: "1.2em" }}>Current Recovery Date</Label>
                                            <Input type='text' id='rcvrydate' placeholder='Recovery Date' value={releaseDt} />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Col>
                        </>) : null}
                    </Row>
                </ModalBody>
                <ModalFooter className='justify-content-center'>
                    {haveInfo ? (
                        <>
                            <Button.Ripple className='mx-1' style={{ minWidth: '10vw' }} color='primary' onClick={handleModifyVaultModal}>
                                Modify Vault
                            </Button.Ripple>
                            <Button.Ripple className='mx-1' style={{ minWidth: '10vw' }} color='primary' onClick={handleChildSegatModal}>
                                View All Child Sega
                            </Button.Ripple>
                        </>) : null}
                </ModalFooter>
            </Modal>
            <ModifyVault openmodifyvaultmodal={modifyvaultmodal} handleModifyVaultModal={handleModifyVaultModal} vault={Vault} />
            <ChildrenSega openchildsegamodal={childsegamodal} handleChildSegatModal={handleChildSegatModal} vault={Vault} vaultName={Vaultname} segas={slist} />
        </div>
    )
}

export default VaultSecurity