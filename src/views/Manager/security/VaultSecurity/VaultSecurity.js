import React, { useState, useEffect, Fragment } from 'react'
import Select, { components } from 'react-select'
import { toast } from 'react-toastify'
import Avatar from '@components/avatar'
import { FaRegCopy } from 'react-icons/fa'
import { GoLinkExternal } from 'react-icons/go'
import { selectThemeColors } from '@utils'
import { Modal, ModalBody, ModalHeader, ModalFooter, Row, Col, Input, Label, FormGroup, Button, CardTitle } from 'reactstrap'
import ModifyVault from './ModifyVault'
import ChildrenSega from './ChildrenSega'
import { useRCU } from '../../../../utility/hooks/useRCU'
import { useVault } from '../../../../utility/hooks/useVaults'
import { useEthers, getExplorerAddressLink, getExplorerTransactionLink } from "@usedapp/core"
import CopyAdrsSegaList from './CopyAdrsSegaList'
import { RefreshCw, Tool } from 'react-feather'
import chroma from 'chroma-js'

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
        }
        // else {
        //     handleGetAllVaults()
        // }
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
        //         const sega = getdata.filter(a => a.vault === Vault && a.show === true && a.network === chainId && a.owner === account)
        //         setSegaList(sega)
        //         console.log("Sega-List", sega)
        //     }
        // }
    }

    const slist = SegaList && SegaList.map((sega, index) => ({
        id: index,
        address: sega,
        // icon1: <CopyAdrsSegaList item={sega} />,
        // icon2: <a href={getExplorerAddressLink(sega.address, chainId ? chainId : 1)} target='_blank'><GoLinkExternal className='mx-1' /></a>
    }))

    const getSegaData = JSON.parse(localStorage.getItem('segadata'))
    const segaData = getSegaData && getSegaData.map(segaa => segaa.address)
    console.log('segaData', segaData)

    for (const i in segaData) {
        for (const j in slist) {
            if (segaData[i] === slist[j].address) {
                slist[j].isInLocal = true

            }
        }
    }

    // console.log('slist', slist)

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
        // console.log('valueData', valueData)
        const vaultlist = valueData && valueData.map((vault, index) => ({ value: index, label: `${vault.name} - ${vault.address}`, adrs: vault.address, name: vault.name }))
        setVaultList(vaultlist)
    }


    useEffect(() => {

        getVaultListFromLocal()
        // handleGetAllVaults()

    }, [openvaultsec])

    const OptionComponent = ({ data, ...props }) => {
        return (
            <components.Option {...props}>
                {data.label}
            </components.Option>
        )
    }

    return (
        <div>
            <Modal className='modal-dialog-centered' isOpen={openvaultsec} toggle={() => {
                setVault("")
                handleVaultSecModal()
                setHaveInfo(0)
            }} >
                <ModalHeader tag='h2' toggle={() => {
                    setVault("")
                    handleVaultSecModal()
                    setHaveInfo(0)
                }}>
                    Select Account to Manage
                </ModalHeader>
                <ModalBody>
                    <Row className='w-100 d-flex flex-column justify-content-center align-items-center'>
                        <Col className='mb-1'>
                            <div className='d-flex flex-row justify-content-between my-1'>
                                <Label style={{ fontSize: "1.3em" }}>Account</Label>
                                {/* <Button.Ripple size='sm' color='primary' onClick={handleGetAllVaults}>Refresh</Button.Ripple> */}
                            </div>
                            <Select
                                // theme={selectThemeColors}
                                className='react-select'
                                classNamePrefix='select'
                                maxMenuHeight={200}
                                defaultValue=''
                                name='clear'
                                options={VaultList}
                                // options={vlist}
                                // components={{
                                //     Option: OptionComponent
                                // }}
                                // menuIsOpen={true}
                                onChange={handleSetVault}
                            />
                        </Col>
                        <Col>
                            <hr />
                        </Col>
                        <Col className='text-center'>
                            <Button.Ripple color='primary' onClick={handleGetRecoveryInfo}><RefreshCw className='mr-1' size={20} />Refresh Info</Button.Ripple>
                        </Col>
                        {haveInfo ? (<>
                            <Col className='py-1'>
                                <FormGroup>
                                    <Label for='ownacc' style={{ fontSize: "1.3em" }}>Owner</Label>
                                    <Input type='text' id='ownacc' placeholder='Owner Address' value={owner} />
                                </FormGroup>
                            </Col>
                            <Col className='py-1'>
                                <FormGroup>
                                    <Label for='backupacc' style={{ fontSize: "1.3em" }}>Backup Account</Label>
                                    <Input type='text' id='backupacc' placeholder='Backup Address' value={backup} />
                                </FormGroup>
                            </Col>
                            <Col className='py-1'>
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
            <ModifyVault openmodifyvaultmodal={modifyvaultmodal} handleModifyVaultModal={handleModifyVaultModal} vault={Vault} vaultName={Vaultname} />
            <ChildrenSega openchildsegamodal={childsegamodal} handleChildSegatModal={handleChildSegatModal} vault={Vault} vaultName={Vaultname} segas={slist} />
        </div>
    )
}

export default VaultSecurity