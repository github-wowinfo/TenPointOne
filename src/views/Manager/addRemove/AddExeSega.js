import { useEffect, useState } from 'react'
import Select from 'react-select'
import { Eye, EyeOff } from 'react-feather'
import { selectThemeColors } from '@utils'
import { Modal, ModalBody, ModalHeader, ModalFooter, Row, Col, Input, Label, FormGroup, Button, Nav, NavItem, NavLink, TabContent, TabPane, UncontrolledAlert } from 'reactstrap'
import { shortenIfAddress, useEthers } from '@usedapp/core'
import { isAddress } from "ethers/lib/utils"
import * as AppData from '../../../redux/actions/cookies/appDataType'
import { connect } from 'react-redux'
import { useManager } from '../../../utility/hooks/useManager'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const AddExeSega = ({ openexesega, handleExeSegaModal, globalAdrs, globalNickName, dispatch, globalVaultFlag, globalFavFlag }) => {

    const { chainId, account } = useEthers()

    const MySwal = withReactContent(Swal)

    // const CloseBtn = <X className='cursor-pointer' size={25} onClick={handleModal} />

    const [Vault, setVault] = useState('')
    const [VaultList, setVaultList] = useState([])
    const [SegaList, setSegaList] = useState([])
    const [rm_flag, setRm_flag] = useState(0)

    const getVaultListFromLocal = () => {
        const getdata = JSON.parse(localStorage.getItem('vaultdata'))
        const valueData = getdata && getdata.filter(a => a.show === true && a.network === chainId && a.owner === account)
        const vaultlist = valueData && valueData.map((vault, index) => ({ value: index, label: `${vault.name} - ${vault.address}`, address: vault.address }))
        setVaultList(vaultlist)
    }

    const getValueSegaFromLocal = () => {
        if (Vault.length > 0) {
            const getdata = JSON.parse(localStorage.getItem('segadata'))
            console.log('segadata', getdata)
            if (getdata) {
                const sega = getdata.filter(a => a.vault === Vault && a.network === chainId && a.owner === account)
                setSegaList(sega)
                // console.log("Sega-List", sega)
            }
        }
    }

    const slist = SegaList && SegaList.map((sega, index) => ({ value: index, label: `${sega.name} - ${sega.address}`, adrs: sega.address }))
    const newSlist = slist.filter((sega) => { return sega.label !== "0x0000000000000000000000000000000000000000" })

    useEffect(() => {
        getVaultListFromLocal()
    }, [openexesega, chainId])

    useEffect(() => {
        getValueSegaFromLocal()
    }, [Vault, rm_flag])

    const [name_flag, setName_flag] = useState(false)
    const [adrs_flag, setAdrs_flag] = useState(false)
    const [vault_flag, setVault_flag] = useState(false)
    const [sega_flag, setSega_flag] = useState(false)
    const [nickName, setNickName] = useState('')
    const [sadrs, setSadrs] = useState('')
    const [selectSega, setSelectSega] = useState('')

    const handleVault = (value) => {
        if (isAddress(value.address)) {
            setVault(value.address)
            setVault_flag(true)
        }
    }
    // console.log('Vault', Vault)
    const onChangeName = (e) => {
        const newname = e.target.value
        if (newname !== '') {
            setNickName(newname)
            setName_flag(true)
        } else {
            alert("Enter a valid Nickname!")
            setName_flag(false)
        }
    }

    const [sega_pesent_flag, setSega_present_flag] = useState(false)

    const accountAdrsInput = (e) => {
        const segaadd = e.target.value
        if (isAddress(segaadd)) {
            setSadrs(segaadd)
            setAdrs_flag(true)
            const getSegaData = JSON.parse(localStorage.getItem('segadata'))
            const segaDataFilter = getSegaData && getSegaData.filter(i => i.owner === account && i.network === chainId)
            console.log('segaDataFilter', segaDataFilter)
            if (segaDataFilter && segaDataFilter.length > 0) {
                for (const i in segaDataFilter) {
                    if (segaDataFilter[i].address === segaadd) {
                        setSega_present_flag(true)
                        break
                    }
                }
            }
        } else {
            // alert("Enter a valid address!")
            setSega_present_flag(false)
            setAdrs_flag(false)
        }
    }

    const {
        getSegaInfo,
        pauseSega, unpauseSega, changeSegaTrader,
        txnState
    } = useManager(Vault, sadrs)
    const { _parentVault, _trader, _active } = getSegaInfo()

    const [is_sega_adrs, setIs_sega_adrs] = useState()

    const addSega = () => {
        const getSegaData = JSON.parse(localStorage.getItem('segadata'))
        const postdata =
        {
            owner: account,
            vault: _parentVault,
            name: nickName,
            address: sadrs,
            network: chainId,
            show: true
        }
        let segadata = []
        if (getSegaData) {
            segadata = [...getSegaData, postdata]
        } else {
            segadata = [postdata]
        }
        localStorage.setItem('segadata', JSON.stringify(segadata))

        const getAdrsdata = JSON.parse(localStorage.getItem('adrsbook'))
        const adrsdata =
        {
            owner: account,
            nickname: nickName,
            adrs: sadrs,
            network: chainId
        }
        let adrsbook = []
        if (getAdrsdata) {
            adrsbook = [...getAdrsdata, adrsdata]
        } else {
            adrsbook = [adrsdata]
        }
        localStorage.setItem('adrsbook', JSON.stringify(adrsbook))

        if (globalVaultFlag === 0) {
            dispatch(AppData.globalVaultFlag(1))
        } else {
            dispatch(AppData.globalVaultFlag(0))
        }
        setAdrs_flag(false)
        setName_flag(false)
        setSega_present_flag(false)
        setSadrs('')
        setIs_sega_adrs()
        handleExeSegaModal()
    }

    const handleAddVaultToLocal = () => {
        MySwal.fire({
            title: 'The Vault for the corresponding Sega needs to be added first, please select an appropriate nickname for the same.',
            input: 'text',
            inputPlaceholder: `Nickname for ${shortenIfAddress(_parentVault)}`,
            customClass: {
                confirmButton: 'btn btn-primary',
                cancelButton: 'btn btn-danger ml-1'
            },
            buttonsStyling: false,
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'ADD VAULT',
            showLoaderOnConfirm: true,
        }).then(function (result) {
            if (result.isConfirmed) {
                if (result.value === '') {
                    alert('Nickname cannot be blank')
                } else {

                    const getVaultdata = JSON.parse(localStorage.getItem('vaultdata'))
                    const postdata =
                    {
                        owner: account,
                        name: result.value,
                        address: _parentVault,
                        network: chainId,
                        show: true
                    }
                    let vaultlist = []
                    if (getVaultdata) {
                        vaultlist = [...getVaultdata, postdata]
                    } else {
                        vaultlist = [postdata]
                    }
                    localStorage.setItem('vaultdata', JSON.stringify(vaultlist))

                    const getAdrsdata = JSON.parse(localStorage.getItem('adrsbook'))
                    const adrsdata =
                    {
                        owner: account,
                        nickname: result.value,
                        adrs: _parentVault,
                        network: chainId
                    }
                    let adrsbook = []
                    if (getAdrsdata) {
                        adrsbook = [...getAdrsdata, adrsdata]
                    } else {
                        adrsbook = [adrsdata]
                    }
                    localStorage.setItem('adrsbook', JSON.stringify(adrsbook))

                    addSega()

                    if (globalVaultFlag === 0) {
                        dispatch(AppData.globalVaultFlag(1))
                    } else {
                        dispatch(AppData.globalVaultFlag(0))
                    }

                    // setVault_added(true)

                    // vault_added = true

                    MySwal.fire({
                        title: `You Vault & Sega have been Added`,
                        customClass: {
                            confirmButton: 'btn btn-primary'
                        }
                    }).then(function (answer) {
                        if (answer.isConfirmed) {
                            setVault_flag(false)
                            setSega_flag(false)
                            setSega_present_flag(false)
                            setSadrs('')
                            setIs_sega_adrs()
                            handleExeSegaModal()
                        }
                    })
                }
            }
        })
    }

    const handleGetSegaInfo = () => {
        const getVaultData = JSON.parse(localStorage.getItem('vaultdata'))
        const vdata = getVaultData && getVaultData.filter(a => a.owner === account && a.network === chainId)
        console.log('vdata', vdata)
        if (vdata.length === 0) {
            console.log('no vault data')
            handleAddVaultToLocal()
        } else {
            for (const i in getVaultData) {
                // console.log(i)
                if (isAddress(_parentVault)) {
                    setIs_sega_adrs(true)
                    if (getVaultData[i].address === _parentVault) {
                        // console.log('getVaultData[i].address', getVaultData[i].address)
                        // console.log('_parentVault', _parentVault)
                        // console.log('parsed')
                        addSega()
                        return
                    }
                } else {
                    // alert("This sega does not exist on this network")
                    setIs_sega_adrs(false)
                    return
                }
            }
        }
    }

    const handleSegaRemove = (value) => {
        const segaadrs = value.adrs
        if (isAddress(segaadrs)) {
            setSelectSega(segaadrs)
            setSega_flag(true)
        } else {
            alert("Select a valid address!")
        }
    }

    const getVaultListFromLocalGlobal = () => {
        const getdata = JSON.parse(localStorage.getItem('vaultdata'))
        const valueData = getdata && getdata.filter(a => a.show === true && a.network === chainId && a.owner === account)
        const vaultlist = valueData && valueData.map((vault, index) => ({ value: index, adrs: vault.address, name: vault.name }))
        console.log('vaultlist', vaultlist)
        if (vaultlist === null || vaultlist === []) {
            dispatch(AppData.globalAdrs(''))
            dispatch(AppData.globalNickName('Create a Vault'))
        } else {
            console.log('vaultlist', vaultlist)
            dispatch(AppData.globalAdrs(vaultlist[0].adrs))
            dispatch(AppData.globalNickName(vaultlist[0].name))
            // setVaultList(vaultlist)
        }
    }

    const handleOnRemove = () => {
        const getdata = JSON.parse(localStorage.getItem('segadata'))
        // console.log('beforegetdata', getdata)
        for (const i in getdata) {
            if (getdata[i].address === selectSega) {
                getdata.splice(i, 1)
                break
            }
        }
        localStorage.setItem('segadata', JSON.stringify(getdata))
        if (globalAdrs === selectSega) {
            // const globaldata = JSON.parse(localStorage.getItem('g_acc'))
            localStorage.removeItem('g_acc')
            getVaultListFromLocalGlobal()
            setVault_flag(false)
            setSega_flag(false)
            if (rm_flag === 0) {
                setRm_flag(1)
            } else {
                setRm_flag(0)
            }
            handleExeSegaModal()
        }
        // console.log('aftergetdata', getdata)
        if (rm_flag === 0) {
            setRm_flag(1)
        } else {
            setRm_flag(0)
        }
        if (globalFavFlag === 0) {
            dispatch(AppData.globalFavFlag(1))
        } else {
            dispatch(AppData.globalFavFlag(0))
        }
        handleExeSegaModal()
    }

    const [active, setActive] = useState('1')

    const toggle = tab => {
        if (active !== tab) {
            setActive(tab)
        }
    }

    return (
        <Modal className='modal-dialog-centered' isOpen={openexesega} toggle={() => {
            setVault_flag(false)
            setSega_flag(false)
            setSega_present_flag(false)
            setSadrs('')
            setIs_sega_adrs()
            handleExeSegaModal()
        }}>
            <ModalHeader tag='h2' toggle={() => {
                setVault_flag(false)
                setSega_flag(false)
                setSega_present_flag(false)
                setSadrs('')
                setIs_sega_adrs()
                handleExeSegaModal()
            }}>
                <span style={{ color: '#1919d2' }}>Track or Hide Existing Sega</span>
            </ModalHeader>
            <ModalBody style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Row style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Col>
                        <h3>Start tracking your already existing Sega.</h3>
                    </Col>
                    <Col>
                        <p>Add external Vaults first, and then their Sega.</p>
                    </Col>
                    <Col>
                        <p>All names set by you are stored locally on your PC and are not collected by Risk Protocol.</p>
                    </Col>
                    <Nav style={{ width: '-webkit-fill-available' }} tabs>
                        <div style={{ display: 'flex', flex: 1, justifyContent: 'space-evenly' }}>
                            <NavItem>
                                <Col md={6} sm={12}>
                                    <div className='d-inline-block mr-1 mb-1'>
                                        <NavLink color='primary' size='lg' active={active === '1'} onClick={() => {
                                            toggle('1')
                                        }}>
                                            TRACK
                                        </NavLink>
                                    </div>
                                </Col>
                            </NavItem>
                            <NavItem>
                                <Col md={6} sm={12}>
                                    <div className='d-inline-block mr-1 mb-1'>
                                        <NavLink color='primary' size='lg' active={active === '2'} onClick={() => {
                                            toggle('2')
                                        }}>
                                            HIDE
                                        </NavLink>
                                    </div>
                                </Col>
                            </NavItem>
                        </div>
                    </Nav>
                    <TabContent style={{ width: '-webkit-fill-available' }} activeTab={active}>
                        <TabPane tabId='1'>
                            {/* <Col className='mb-1'>
                                <Label style={{ fontSize: "1.3em" }}>Parent Vault</Label>
                                <Select
                                    // theme={selectThemeColors}
                                    className='react-select'
                                    classNamePrefix='select'
                                    defaultValue=''
                                    name='clear'
                                    options={VaultList}
                                    onChange={handleVault}
                                />
                            </Col> */}
                            <Col>
                                <FormGroup>
                                    <Label for='nickname' style={{ fontSize: "1.3em" }}>Nickname</Label>
                                    <Input type='text' id='nickname' onChange={onChangeName} />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label for='accadrs' style={{ fontSize: "1.3em" }}>Account Address</Label>
                                    <Input type='text' id='accadrs' onChange={accountAdrsInput} />
                                </FormGroup>
                            </Col>
                            {sega_pesent_flag ? (
                                <Col>
                                    <UncontrolledAlert color='warning'>
                                        <h4 className='alert-heading'>The Sega is already added!</h4>
                                    </UncontrolledAlert>
                                </Col>
                            ) : null}
                            {is_sega_adrs === false ? (
                                <Col>
                                    <UncontrolledAlert color='warning'>
                                        <h4 className='alert-heading'>This sega does not exist on this network</h4>
                                    </UncontrolledAlert>
                                </Col>
                            ) : null}
                        </TabPane>
                        <TabPane tabId='2'>
                            <Col className='mb-1'>
                                <Label style={{ fontSize: "1.3em" }}>Parent Vault</Label>
                                <Select
                                    // theme={selectThemeColors}
                                    className='react-select'
                                    classNamePrefix='select'
                                    defaultValue=''
                                    name='clear'
                                    options={VaultList}
                                    onChange={handleVault}
                                />
                            </Col>
                            <Col className='mb-1'>
                                <Label style={{ fontSize: "1.3em" }}>Select Sega</Label>
                                <Select
                                    // theme={selectThemeColors}
                                    className='react-select'
                                    classNamePrefix='select'
                                    defaultValue=''
                                    name='clear'
                                    options={newSlist}
                                    onChange={handleSegaRemove}
                                />
                            </Col>
                        </TabPane>
                    </TabContent>
                </Row>
            </ModalBody>
            <ModalFooter className='justify-content-center'>
                {active === '1' ? (
                    <>
                        {adrs_flag && name_flag ? (
                            <Button.Ripple color='primary' onClick={handleGetSegaInfo} >
                                <Eye className='mr-1' size={17} />
                                TRACK
                            </Button.Ripple>
                        ) : (
                            <Button.Ripple color='primary' disabled >
                                <Eye className='mr-1' size={17} />
                                TRACK
                            </Button.Ripple>
                        )}
                    </>
                ) : (
                    <>
                        {vault_flag && sega_flag ? (
                            <Button.Ripple color='primary' onClick={handleOnRemove} >
                                <EyeOff className='mr-1' size={17} />
                                HIDE
                            </Button.Ripple>
                        ) : (
                            <Button.Ripple color='primary' disabled >
                                <EyeOff className='mr-1' size={17} />
                                HIDE
                            </Button.Ripple>
                        )}
                    </>
                )}
            </ModalFooter>
        </Modal>
    )
}

// export default AddExeSega
const mapStateToProps = (state) => ({
    globalAdrs: state.appData.globalAdrs,
    globalNickName: state.appData.globalNickName,
    globalVaultFlag: state.appData.globalVaultFlag,
    globalFavFlag: state.appData.globalFavFlag
})
const mapDispatchToProp = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProp)(AddExeSega)