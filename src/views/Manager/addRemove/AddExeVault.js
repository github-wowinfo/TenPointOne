import { useState, Fragment, useEffect } from 'react'
import { Eye, EyeOff } from 'react-feather'
import { Modal, ModalBody, ModalHeader, ModalFooter, Row, Col, Input, Label, FormGroup, Button, TabPane, TabContent, Nav, NavItem, NavLink } from 'reactstrap'
import { useEthers } from '@usedapp/core'
import { toast } from 'react-toastify'
import { isAddress } from "ethers/lib/utils"
import Avatar from '@components/avatar'
import Select from 'react-select'

const AddExeVault = ({ openexevault, handleExeVaultModal }) => {

    const { account, chainId } = useEthers()
    // const CloseBtn = <X className='cursor-pointer' size={25} onClick={handleModal} />
    const notifySuccessAdd = () => toast.success(<SuccessToastAdd />, { hideProgressBar: false })
    const notifySuccessRemove = () => toast.success(<SuccessToastRemove />, { hideProgressBar: false })

    const SuccessToastAdd = () => (
        <Fragment>
            <div className='toastify-header'>
                <div className='title-wrapper'>
                    <Avatar size='sm' color='success' icon={<Clipboard size={12} />} />
                    <h6 className='toast-title'>Vault is now Visible!</h6>
                </div>
            </div>
        </Fragment>
    )
    const SuccessToastRemove = () => (
        <Fragment>
            <div className='toastify-header'>
                <div className='title-wrapper'>
                    <Avatar size='sm' color='success' icon={<Clipboard size={12} />} />
                    <h6 className='toast-title'>Vault is now Visible!</h6>
                </div>
            </div>
        </Fragment>
    )

    const [accountText, setAccountText] = useState('')
    const [selectVault, setSelectVault] = useState('')

    const accountAdrsInput = (e) => {
        const vaultadd = e.target.value
        if (isAddress(vaultadd)) {
            setAccountText(vaultadd)
        } else {
            alert("Enter a valid address!")
        }
    }

    const accountAdrsChange = (value) => {
        const vaultadrs = value.adrs
        console.log('selectedadrs', vaultadrs)
        if (isAddress(vaultadrs)) {
            setSelectVault(vaultadrs)
        } else {
            alert("Enter a valid address!")
        }
    }
    console.log('accountadrs', selectVault)

    const handleOnAdd = () => {

        const getdata = JSON.parse(localStorage.getItem('vaultdata'))
        for (const i in getdata) {
            if (getdata[i].address === accountText) {
                getdata[i].show = true
                break
            }
        }
        localStorage.setItem('vaultdata', JSON.stringify(getdata))
        // notifySuccessAdd()
        handleExeVaultModal()
    }

    const handleOnRemove = () => {

        const getdata = JSON.parse(localStorage.getItem('vaultdata'))
        for (const i in getdata) {
            if (getdata[i].address === selectVault) {
                getdata[i].show = false
                break
            }
        }
        localStorage.setItem('vaultdata', JSON.stringify(getdata))
        console.log('getdata', getdata)
        // notifySuccessRemove()
        handleExeVaultModal()
    }

    // const [nickName, setNickName] = useState('')
    // const [vadrs, setVadrs] = useState('')
    // const onChangeName = (e) => {
    //     setNickName(e.target.value)
    // }
    // const onChangeAdrs = (e) => {
    //     setVadrs(e.target.value)
    // }

    // const handleTempAdd = () => {
    //     const getdata = JSON.parse(localStorage.getItem('vaultdata'))
    //     const postdata =
    //     {
    //         owner: account,
    //         name: nickName,
    //         address: vadrs,
    //         network: chainId,
    //         show: true
    //     }
    //     let vaultdata = []
    //     if (getdata) {
    //         vaultdata = [...getdata, postdata]
    //     } else {
    //         vaultdata = [postdata]
    //     }
    //     localStorage.setItem('vaultdata', JSON.stringify(vaultdata))
    // }

    const [VaultList, setVaultList] = useState([])

    const getVaultListFromLocal = () => {
        const getdata = JSON.parse(localStorage.getItem('vaultdata'))
        const valueData = getdata && getdata.filter(a => a.show === true && a.network === chainId && a.owner === account)
        // console.log('valueData', valueData)
        const vaultlist = valueData && valueData.map((vault, index) => ({ value: index, label: `${vault.name} - ${vault.address}`, adrs: vault.address, name: vault.name }))
        console.log('vaultlist', vaultlist)
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
        <Modal className='modal-dialog-centered' isOpen={openexevault} toggle={handleExeVaultModal} >
            <ModalHeader tag='h2' toggle={handleExeVaultModal} >
                Add or Remove Existing Vault
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
                                    <Input type='text' id='nickname' />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label for='accadrs' style={{ fontSize: "1.3em" }}>Account Address</Label>
                                    <Input type='text' id='accadrs' onChange={accountAdrsInput} />
                                </FormGroup>
                            </Col>
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
                                    // options={vlist}
                                    onChange={accountAdrsChange}
                                />
                            </Col>
                        </TabPane>
                        {/* <TabPane tabId='2'>
                            <Col>
                                <FormGroup>
                                    <Label for='nickname' style={{ fontSize: "1.3em" }}>Nickname</Label>
                                    <Input type='text' id='nickname' />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label for='accadrs' style={{ fontSize: "1.3em" }}>Account Address</Label>
                                    <Input type='text' id='accadrs' onChange={accountAdrsChange} />
                                </FormGroup>
                            </Col>
                        </TabPane> */}
                    </TabContent>
                </Row>
            </ModalBody>
            <ModalFooter className='justify-content-center'>
                {active === '1' ? (
                    <>
                        <Button.Ripple color='primary' onClick={handleOnAdd}>
                            <Eye className='mr-1' size={17} />
                            ADD
                        </Button.Ripple>
                        {/* <Button.Ripple color='primary' onClick={handleTempAdd}>
                            <Eye className='mr-1' size={17} />
                            tempAdd
                        </Button.Ripple> */}
                    </>
                ) : (
                    <Button.Ripple color='primary' onClick={handleOnRemove} >
                        <EyeOff className='mr-1' size={17} />
                        REMOVE
                    </Button.Ripple>
                )}

            </ModalFooter>

        </Modal>
    )
}

export default AddExeVault