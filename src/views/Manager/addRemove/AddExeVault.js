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

const AddExeVault = ({ openexevault, handleExeVaultModal, globalAdrs, globalNickName, dispatch, globalVaultFlag }) => {

    const { account, chainId } = useEthers()

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

    const onChangeAdrs = (e) => {
        const vaultadrs = e.target.value
        if (isAddress(vaultadrs)) {
            setVadrs(vaultadrs)
            setAdrs_flag(true)
        } else {
            alert("Enter a valid address!")
            setAdrs_flag(false)
        }
    }

    const [exesega_flag, setExeSega_flag] = useState(false)

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
        if (list.length > 0) {
            setExeSega_flag(true)
        } else {
            setExeSega_flag(false)
        }
    }

    const vaultAdd = (getdata) => {
        const postdata =
        {
            owner: account,
            name: nickName,
            address: vadrs,
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
        if (globalVaultFlag === 0) {
            dispatch(AppData.globalVaultFlag(1))
        } else {
            dispatch(AppData.globalVaultFlag(0))
        }
        setName_flag(false)
        setAdrs_flag(false)
        console.log('Vault added')
        handleExeVaultModal()
    }

    const { getRecoveryInfo } = useVault(vadrs)
    const [owner_flag, setOwner_flag] = useState()

    const getVaultRecoveryInfo = () => {
        setOwner_flag(false)
        const { _owner, _backup, _releaseDt, _unlockDays } = getRecoveryInfo()
        console.log('_owner', _owner)
        console.log('account', account)
        if (_owner === account) {
            setOwner_flag(true)
        } else {
            setOwner_flag(false)
        }
    }

    const handleAdd = () => {
        getVaultRecoveryInfo()
        const getdata = JSON.parse(localStorage.getItem('vaultdata'))
        console.log('getdata', getdata)
        if (getdata.length > 0) {
            for (const i in getdata) {
                console.log('getdatafor', getdata)
                if (getdata && getdata[i].address === vadrs) {
                    handleExeVaultModal()
                    alert('The Vault is already Added!')
                    break
                } else {
                    vaultAdd(getdata)
                    break
                }
            }
        } else {
            const postdata =
            {
                owner: account,
                name: nickName,
                address: vadrs,
                network: chainId,
                show: true
            }
            const vaultdata = [postdata]
            localStorage.setItem('vaultdata', JSON.stringify(vaultdata))
            if (globalVaultFlag === 0) {
                dispatch(AppData.globalVaultFlag(1))
            } else {
                dispatch(AppData.globalVaultFlag(0))
            }
            setName_flag(false)
            setAdrs_flag(false)
            console.log('Vault added')
            handleExeVaultModal()
        }

    }

    const getVaultListFromLocalGlobal = () => {
        const getdata = JSON.parse(localStorage.getItem('vaultdata'))
        const valueData = getdata && getdata.filter(a => a.show === true && a.network === chainId && a.owner === account)
        const vaultlist = valueData && valueData.map((vault, index) => ({ value: index, adrs: vault.address, name: vault.name }))
        console.log('vaultlist', vaultlist)
        if (vaultlist.length > 0) {
            console.log('vaultlist', vaultlist)
            dispatch(AppData.globalAdrs(vaultlist[0].adrs))
            dispatch(AppData.globalNickName(vaultlist[0].name))
            // setVaultList(vaultlist)
        } else {
            dispatch(AppData.globalAdrs(''))
            dispatch(AppData.globalNickName('Create a Vault'))
        }
    }

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
            setExeSega_flag(false)
            setOwner_flag()
        }} >
            <ModalHeader tag='h2' toggle={() => {
                handleExeVaultModal()
                setName_flag(false)
                setAdrs_flag(false)
                setExeSega_flag(false)
                setOwner_flag()
            }} >
                Show or Hide Existing Vault
            </ModalHeader>
            <ModalBody style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Row style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Col>
                        <h3>Start tracking your already existing Vaults.</h3>
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
                                            ADD
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
                                            REMOVE
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
                                    <Label for='accadrs' style={{ fontSize: "1.3em" }}>Account Address</Label>
                                    <Input type='text' id='accadrs' onChange={onChangeAdrs} />
                                </FormGroup>
                            </Col>
                            {owner_flag === false ? (
                                <Col>
                                    <UncontrolledAlert color='warning'>
                                        <h4 className='alert-heading'>The current user is not the owner of this Vault</h4>
                                        <div className='alert-body'>
                                            Do you still want to add this Vault?
                                            <br />
                                            If Yes, click to continue.
                                        </div>
                                    </UncontrolledAlert>
                                </Col>
                            ) : null}
                        </TabPane>
                        <TabPane tabId='2'>
                            <Col className='mb-1'>
                                <div className='d-flex flex-row justify-content-between my-1'>
                                    <Label style={{ fontSize: "1.3em" }}>Select Vault to remove.</Label>
                                    {/* <Button.Ripple size='sm' color='primary' onClick={handleGetAllVaults}>Refresh</Button.Ripple> */}
                                </div>
                                <Select
                                    className='react-select'
                                    classNamePrefix='select'
                                    defaultValue=''
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
                        {name_flag && adrs_flag === true ? (
                            <Button.Ripple color='primary' onClick={handleAdd}>
                                <Eye className='mr-1' size={17} />
                                ADD
                            </Button.Ripple>
                        ) : (
                            <Button.Ripple color='primary' disabled>
                                <Eye className='mr-1' size={17} />
                                ADD
                            </Button.Ripple>
                        )}
                    </>
                ) : (
                    <>
                        {adrs_flag && exesega_flag === false ? (
                            <Button.Ripple color='primary' onClick={handleRemove} >
                                <EyeOff className='mr-1' size={17} />
                                REMOVE
                            </Button.Ripple>
                        ) : (
                            <Button.Ripple color='primary' disabled >
                                <EyeOff className='mr-1' size={17} />
                                REMOVE
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
    globalNickName: state.appData.globalNickName
})
const mapDispatchToProp = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProp)(AddExeVault)