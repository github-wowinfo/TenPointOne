import { useState, Fragment, useEffect } from 'react'
import { Eye, EyeOff } from 'react-feather'
import { Modal, ModalBody, ModalHeader, ModalFooter, Row, Col, Input, Label, FormGroup, Button, TabPane, TabContent, Nav, NavItem, NavLink, Alert, UncontrolledAlert } from 'reactstrap'
import { useEthers } from '@usedapp/core'
import { toast } from 'react-toastify'
import { isAddress } from "ethers/lib/utils"
import Avatar from '@components/avatar'
import Select from 'react-select'
import { connect } from 'react-redux'
import * as AppData from '../../../redux/actions/cookies/appDataType'
import { useVault } from '../../../utility/hooks/useVaults'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const AddExeVault = ({ openexevault, handleExeVaultModal, globalAdrs, globalNickName, dispatch, globalVaultFlag, globalFavFlag }) => {

    const { account, chainId } = useEthers()

    const MySwal = withReactContent(Swal)

    // const CloseBtn = <X className='cursor-pointer' size={25} onClick={handleModal} />

    // const [accountText, setAccountText] = useState('')
    // const [selectVault, setSelectVault] = useState('')

    // const accountAdrsInput = (e) => {
    //     const vaultadd = e.target.value
    //     if (isAddress(vaultadd)) {
    //         setAccountText(vaultadd)
    //     } else {
    //         alert("Enter a valid address!")
    //     }
    // }

    // const accountAdrsChange = (value) => {
    //     const vaultadrs = value.adrs
    //     console.log('selectedadrs', vaultadrs)
    //     if (isAddress(vaultadrs)) {
    //         setSelectVault(vaultadrs)
    //     } else {
    //         alert("Enter a valid address!")
    //     }
    // }
    // console.log('accountadrs', selectVault)

    // const handleOnAdd = () => {

    //     const getdata = JSON.parse(localStorage.getItem('vaultdata'))
    //     for (const i in getdata) {
    //         if (getdata[i].address === accountText) {
    //             getdata[i].show = true
    //             break
    //         }
    //     }
    //     localStorage.setItem('vaultdata', JSON.stringify(getdata))
    //     // notifySuccessAdd()
    //     handleExeVaultModal()
    // }

    // const handleOnRemove = () => {

    //     const getdata = JSON.parse(localStorage.getItem('vaultdata'))
    //     for (const i in getdata) {
    //         if (getdata[i].address === selectVault) {
    //             getdata[i].show = false
    //             break
    //         }
    //     }
    //     localStorage.setItem('vaultdata', JSON.stringify(getdata))
    //     console.log('getdata', getdata)
    //     // notifySuccessRemove()
    //     handleExeVaultModal()
    // }

    const [nickName, setNickName] = useState('')
    const [vadrs, setVadrs] = useState('')
    const [name_flag, setName_flag] = useState(false)
    const [adrs_flag, setAdrs_flag] = useState(false)

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
    // console.log('nickName', nickName)
    const [exesega_flag, setExeSega_flag] = useState(false)
    const [present_flag, setPresent_flag] = useState(false)

    const onChangeAdrs = (e) => {
        const vaultadrs = e.target.value
        if (isAddress(vaultadrs)) {
            setVadrs(vaultadrs)
            setAdrs_flag(true)
            const getVault_data = JSON.parse(localStorage.getItem('vaultdata'))
            const vault_data_filter = getVault_data && getVault_data.filter(i => i.owner === account && i.network === chainId)
            console.log('vault_data_filter', vault_data_filter)
            if (vault_data_filter && vault_data_filter.length > 0) {
                for (const i in vault_data_filter) {
                    if (vault_data_filter[i].address === vaultadrs) {
                        setPresent_flag(true)
                        // alert('The Vault is already Added!')
                        break
                    }
                }
            }
        } else {
            // alert("Enter a valid address!")
            setPresent_flag(false)
            setAdrs_flag(false)
        }
    }


    const hideOnChangeAdrs = (adrs) => {
        const selected_adrs = adrs.value
        if (isAddress(selected_adrs)) {
            setVadrs(selected_adrs)
            setAdrs_flag(true)
        } else {
            alert("Select a valid address!")
        }
        console.log('selected_adrs', selected_adrs)
        const getSegaList = JSON.parse(localStorage.getItem('segadata'))
        const segaListFilter = getSegaList && getSegaList.filter(i => i.owner === account && i.network === chainId)
        // console.log('segaListFilter', segaListFilter)
        const list = segaListFilter && segaListFilter.filter(i => i.vault === selected_adrs)
        console.log('list', list)
        if (list && list.length > 0) {
            setExeSega_flag(true)
        } else {
            setExeSega_flag(false)
        }
    }

    const { getRecoveryInfo } = useVault(vadrs)
    // const [owner_flag, setOwner_flag] = useState('')
    let owner_flag
    const [is_vault_adrs, setIs_vault_adrs] = useState()
    const getVaultRecoveryInfo = () => {
        const { _owner, _backup, _releaseDt, _unlockDays } = getRecoveryInfo()
        console.log('vadrs', vadrs)
        console.log('_owner', _owner)
        console.log('account', account)
        console.log('owner_flag', owner_flag)
        if (isAddress(_owner)) {
            setIs_vault_adrs(true)
            if (_owner === account) {
                owner_flag = true
            } else {
                owner_flag = false
            }
        } else {
            // alert("This vault does not exist on this network")
            setIs_vault_adrs(false)
        }
    }

    const vaultAdd = () => {
        const getVaultdata = JSON.parse(localStorage.getItem('vaultdata'))
        const postdata =
        {
            owner: account,
            name: nickName,
            address: vadrs,
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
            nickname: nickName,
            adrs: vadrs,
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
        setName_flag(false)
        setAdrs_flag(false)
        console.log('Vault added')
        setVadrs('')
        setIs_vault_adrs()
        handleExeVaultModal()
    }

    const handleConfirmText = () => {
        return MySwal.fire({
            title: 'The current user is not the owner of the vault, are you sure you want to add it?',
            icon: 'danger',
            showCancelButton: true,
            confirmButtonText: 'Yes, Add it!',
            customClass: {
                confirmButton: 'btn btn-primary',
                cancelButton: 'btn btn-outline-danger ml-1'
            },
            buttonsStyling: false
        }).then(function (result) {
            if (result.value) {
                vaultAdd()
                MySwal.fire({
                    icon: 'success',
                    title: 'Added!',
                    text: 'Your Vault has been added.',
                    customClass: {
                        confirmButton: 'btn btn-success'
                    }
                }).then(function (result) {
                    if (result.isConfirmed) {
                        if (globalVaultFlag === 0) {
                            dispatch(AppData.globalVaultFlag(1))
                        } else {
                            dispatch(AppData.globalVaultFlag(0))
                        }
                        setVadrs('')
                        setIs_vault_adrs()
                        handleExeVaultModal()
                    }
                })
            } else {
                setVadrs('')
                setIs_vault_adrs()
                handleExeVaultModal()
            }
        })
    }

    const handleAdd = () => {
        console.log('owner_flag', owner_flag)
        console.log('handleAdd')
        getVaultRecoveryInfo()
        if (is_vault_adrs) {
            if (owner_flag === false) {
                handleConfirmText()
            } else {
                // setVadrs('')
                // console.log('add')
                const getVaultdata = JSON.parse(localStorage.getItem('vaultdata'))
                const postdata =
                {
                    owner: account,
                    name: nickName,
                    address: vadrs,
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
                    nickname: nickName,
                    adrs: vadrs,
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
                setName_flag(false)
                setAdrs_flag(false)
                console.log('Vault added')
                setVadrs('')
                setIs_vault_adrs()
                handleExeVaultModal()
            }
        }
    }

    const getVaultListFromLocalGlobal = () => {
        const getdata = JSON.parse(localStorage.getItem('vaultdata'))
        const valueData = getdata && getdata.filter(a => a.show === true && a.network === chainId && a.owner === account)
        const vaultlist = valueData && valueData.map((vault, index) => ({ value: index, adrs: vault.address, name: vault.name }))
        console.log('vaultlist', vaultlist)
        if (vaultlist && vaultlist.length > 0) {
            console.log('vaultlist', vaultlist)
            dispatch(AppData.globalAdrs(vaultlist[0].adrs))
            dispatch(AppData.globalNickName(vaultlist[0].name))
            // setVaultList(vaultlist)
        } else {
            dispatch(AppData.globalAdrs(''))
            dispatch(AppData.globalNickName('Create a Vault'))
        }
    }

    useEffect(() => {
        getVaultListFromLocalGlobal()
    }, [globalVaultFlag])

    const handleRemove = () => {
        const getdata = JSON.parse(localStorage.getItem('vaultdata'))
        // console.log('beforegetdata', getdata)
        for (const i in getdata) {
            if (getdata[i].address === vadrs) {
                getdata.splice(i, 1)
                break
            }
        }
        localStorage.setItem('vaultdata', JSON.stringify(getdata))
        const getAdrsData = JSON.parse(localStorage.getItem('adrsbook'))
        for (const i in getAdrsData) {
            if (getAdrsData[i].adrs === vadrs) {
                if (getAdrsData[i].isFav === true) {
                    getAdrsData[i].isFav = false
                }
                break
            }
        }
        localStorage.setItem('adrsbook', JSON.stringify(getAdrsData))
        if (globalFavFlag === 0) {
            dispatch(AppData.globalFavFlag(1))
        } else {
            dispatch(AppData.globalFavFlag(0))
        }
        const getFavData = JSON.parse(localStorage.getItem('fav'))
        if (getFavData !== undefined || getFavData !== []) {
            for (const i in getFavData) {
                if (getFavData[i].fav_adrs === vadrs) {
                    getFavData.splice(i, 1)
                    break
                }
            }
        }
        localStorage.setItem('fav', JSON.stringify(getFavData))
        if (globalAdrs === vadrs) {
            // const globaldata = JSON.parse(localStorage.getItem('g_acc'))
            localStorage.removeItem('g_acc')
            getVaultListFromLocalGlobal()
            setAdrs_flag(false)
            handleExeVaultModal()
        }
        // console.log('aftergetdata', getdata)
        setAdrs_flag(false)
        handleExeVaultModal()
    }

    const [VaultList, setVaultList] = useState([])

    const getVaultListFromLocal = () => {
        const getdata = JSON.parse(localStorage.getItem('vaultdata'))
        const valueData = getdata && getdata.filter(a => a.show === true && a.network === chainId && a.owner === account)
        const vaultlist = valueData && valueData.map((vault, index) => ({ value: vault.address, label: `${vault.name} - ${vault.address}`, adrs: vault.address, name: vault.name }))
        // console.log('vaultlist', vaultlist)
        setVaultList(vaultlist)
    }
    useEffect(() => {
        getVaultListFromLocal()
        // handleGetAllVaults()
    }, [openexevault])
    const [active, setActive] = useState('1')

    const toggle = tab => {
        if (active !== tab) {
            setActive(tab)
        }
    }

    return (
        <Modal className='modal-dialog-centered' isOpen={openexevault} toggle={() => {
            handleExeVaultModal()
            setName_flag(false)
            setAdrs_flag(false)
            setPresent_flag(false)
            setExeSega_flag(false)
            setVadrs('')
            setIs_vault_adrs()
        }} >
            <ModalHeader tag='h2' toggle={() => {
                handleExeVaultModal()
                setName_flag(false)
                setAdrs_flag(false)
                setPresent_flag(false)
                setExeSega_flag(false)
                setVadrs('')
                setIs_vault_adrs()
            }} >
                <span style={{ color: '#1919d2' }}>Track or Hide Existing Vault</span>
            </ModalHeader>
            <ModalBody style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Row style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    {/* <Col>
                        <h3>Start tracking your already existing Vaults.</h3>
                    </Col> */}
                    <Col>
                        {/* <p>All names set by you are stored locally on your PC and are not collected by Risk Protocol.</p> */}
                        <p>Start or stop tracking your accounts. A names are stored locally and are not collected by Risk Protocol.
                            Vaults need to be added first before adding their SEGAs.</p>
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
                            <Col>
                                <FormGroup>
                                    <Label for='nickname' style={{ fontSize: "1.3em" }}>Nickname</Label>
                                    <Input type='text' id='nickname' onChange={onChangeName} />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label for='accadrs' style={{ fontSize: "1.3em" }}>Vault Address</Label>
                                    <Input type='text' id='accadrs' onChange={onChangeAdrs} />
                                </FormGroup>
                            </Col>
                            {/* {owner_flag === false ? (
                                <Col>
                                    <UncontrolledAlert color='danger'>
                                        <h4 className='alert-heading'>The current user is not the owner of this Vault</h4>
                                        <div className='alert-body'>
                                            Do you still want to add this Vault?
                                            <br />
                                            If Yes, click to continue.
                                        </div>
                                    </UncontrolledAlert>
                                </Col>
                            ) : null} */}
                            {present_flag ? (
                                <Col>
                                    <UncontrolledAlert color='warning'>
                                        <h4 className='alert-heading'>The Vault is already added!</h4>
                                    </UncontrolledAlert>
                                </Col>
                            ) : null}
                            {is_vault_adrs === false ? (
                                <Col>
                                    <UncontrolledAlert color='warning'>
                                        <h4 className='alert-heading'>This vault does not exist on this network</h4>
                                    </UncontrolledAlert>
                                </Col>
                            ) : null}
                        </TabPane>
                        <TabPane tabId='2'>
                            <Col className='mb-1'>
                                {/* <div className='d-flex flex-row justify-content-between my-1'> */}
                                <Label style={{ fontSize: "1.3em" }}>Select Vault to Hide.</Label>
                                {/* <Button.Ripple size='sm' color='primary' onClick={handleGetAllVaults}>Refresh</Button.Ripple> */}
                                {/* </div> */}
                                <Select
                                    className='react-select'
                                    classNamePrefix='select'
                                    defaultValue=''
                                    maxMenuHeight={200}
                                    name='clear'
                                    options={VaultList}
                                    onChange={hideOnChangeAdrs}
                                />
                                {exesega_flag ? (
                                    <Col>
                                        <UncontrolledAlert className='my-1' color='danger'>
                                            <h4 className='alert-heading'>There are SEGAs associated with this Vault.</h4>
                                            <div className='alert-body'>
                                                Please remove all associated SEGAs first, before remmoving the Vault.
                                            </div>
                                        </UncontrolledAlert>
                                    </Col>
                                ) : null
                                }
                            </Col>
                        </TabPane>
                    </TabContent>
                </Row>
            </ModalBody>
            <ModalFooter className='justify-content-center'>
                {active === '1' ? (
                    <>
                        {(name_flag && adrs_flag) && present_flag === false ? (
                            <Button.Ripple color='primary' onClick={handleAdd}>
                                <Eye className='mr-1' size={17} />
                                TRACK
                            </Button.Ripple>
                        ) : (
                            <Button.Ripple color='primary' disabled>
                                <Eye className='mr-1' size={17} />
                                TRACK
                            </Button.Ripple>
                        )}
                    </>
                ) : (
                    <>
                        {adrs_flag && exesega_flag === false ? (
                            <Button.Ripple color='primary' onClick={handleRemove} >
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

// export default AddExeVault
const mapStateToProps = (state) => ({
    globalAdrs: state.appData.globalAdrs,
    globalNickName: state.appData.globalNickName,
    globalVaultFlag: state.appData.globalVaultFlag,
    globalFavFlag: state.appData.globalFavFlag
})
const mapDispatchToProp = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProp)(AddExeVault)