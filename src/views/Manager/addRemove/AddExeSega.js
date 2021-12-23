import { useEffect, useState } from 'react'
import Select from 'react-select'
import { Eye, EyeOff } from 'react-feather'
import { selectThemeColors } from '@utils'
import { Modal, ModalBody, ModalHeader, ModalFooter, Row, Col, Input, Label, FormGroup, Button, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'
import { useEthers } from '@usedapp/core'
import { isAddress } from "ethers/lib/utils"

const AddExeSega = ({ openexesega, handleExeSegaModal }) => {

    const { chainId, account } = useEthers()

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

    const [Vault, setVault] = useState('')
    const [VaultList, setVaultList] = useState([])
    const [SegaList, setSegaList] = useState([])

    const getVaultListFromLocal = () => {
        const getdata = JSON.parse(localStorage.getItem('vaultdata'))
        const valueData = getdata && getdata.filter(a => a.show === true && a.network === chainId && a.owner === account)
        const vaultlist = valueData && valueData.map((vault, index) => ({ value: index, label: `${vault.name} - ${vault.address}`, address: vault.address }))
        setVaultList(vaultlist)
    }

    const getValueSegaFromLocal = () => {
        console.log('Vault', Vault)
        if (Vault.length > 0) {
            const getdata = JSON.parse(localStorage.getItem('segadata'))
            if (getdata) {
                const sega = getdata.filter(a => a.vault === Vault && a.show === true && a.network === chainId && a.owner === account)
                setSegaList(sega)
                console.log("Sega-List", sega)
            }
        }
    }

    const slist = SegaList && SegaList.map((sega, index) => ({ value: index, label: `${sega.name} - ${sega.address}`, adrs: `${sega.address}` }))
    const newSlist = slist.filter((sega) => { return sega.label !== "0x0000000000000000000000000000000000000000" })

    useEffect(() => {
        getVaultListFromLocal()
    }, [openexesega, chainId])

    useEffect(() => {
        getValueSegaFromLocal()
    }, [Vault, openexesega])

    const handleVault = (value) => {
        setVault(value.address)
    }

    const [accountText, setAccountText] = useState('')
    const [selectSega, setSelectSega] = useState('')

    const accountAdrsInput = (e) => {
        const segaadd = e.target.value
        if (isAddress(segaadd)) {
            setAccountText(segaadd)
        } else {
            alert("Enter a valid address!")
        }
    }

    const accountAdrsChange = (value) => {
        const segaadrs = value.adrs
        console.log('selectedadrs', segaadrs)
        if (isAddress(segaadrs)) {
            setSelectSega(segaadrs)
        } else {
            alert("Enter a valid address!")
        }
    }
    console.log('accountadrs', selectSega)

    const handleOnAdd = () => {
        const getdata = JSON.parse(localStorage.getItem('segadata'))
        for (const i in getdata) {
            if (getdata[i].address === accountText) {
                getdata[i].show = true
                break
            }
        }
        localStorage.setItem('segadata', JSON.stringify(getdata))
        // notifySuccessAdd()
        handleExeSegaModal()
    }

    const handleOnRemove = () => {

        const getdata = JSON.parse(localStorage.getItem('segadata'))
        for (const i in getdata) {
            if (getdata[i].address === selectSega) {
                getdata[i].show = false
                break
            }
        }
        localStorage.setItem('segadata', JSON.stringify(getdata))
        console.log('getdata', getdata)
        // notifySuccessRemove()
        handleExeSegaModal()
    }

    // const [nickName, setNickName] = useState('')
    // const [sadrs, setSadrs] = useState('')
    // const onChangeName = (e) => {
    //     setNickName(e.target.value)
    // }
    // const onChangeAdrs = (e) => {
    //     setSadrs(e.target.value)
    // }

    // const handleTempAdd = () => {
    //     const getdata = JSON.parse(localStorage.getItem('segadata'))
    //     const postdata =
    //     {
    //         owner: account,
    //         vault: Vault,
    //         name: nickName,
    //         address: sadrs,
    //         network: chainId
    //     }
    //     let segadata = []
    //     if (getdata) {
    //         segadata = [...getdata, postdata]
    //     } else {
    //         segadata = [postdata]
    //     }
    //     localStorage.setItem('segadata', JSON.stringify(segadata))
    // }

    const [active, setActive] = useState('1')

    const toggle = tab => {
        if (active !== tab) {
            setActive(tab)
        }
    }

    return (
        <Modal className='modal-dialog-centered' isOpen={openexesega} toggle={handleExeSegaModal} >
            <ModalHeader tag='h2' toggle={handleExeSegaModal}>
                Show or Hide Existing Sega
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
                                            SHOW
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
                                    onChange={accountAdrsChange}
                                />
                            </Col>
                        </TabPane>
                    </TabContent>
                </Row>
            </ModalBody>
            <ModalFooter className='justify-content-center'>
                {active === '1' ? (
                    <>
                        <Button.Ripple color='primary' onClick={handleOnAdd} >
                            <Eye className='mr-1' size={17} />
                            SHOW
                        </Button.Ripple>
                        {/* <Button.Ripple color='primary' onClick={handleTempAdd}>
                            <Eye className='mr-1' size={17} />
                            tempAdd
                        </Button.Ripple> */}
                    </>
                ) : (
                    <Button.Ripple color='primary' onClick={handleOnRemove} >
                        <EyeOff className='mr-1' size={17} />
                        HIDE
                    </Button.Ripple>
                )}
            </ModalFooter>
        </Modal>
    )
}

export default AddExeSega