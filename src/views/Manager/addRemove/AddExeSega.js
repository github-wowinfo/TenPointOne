import { useEffect, useState } from 'react'
import Select from 'react-select'
import { Eye, EyeOff } from 'react-feather'
import { selectThemeColors } from '@utils'
import { Modal, ModalBody, ModalHeader, ModalFooter, Row, Col, Input, Label, FormGroup, Button, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'
import { useEthers } from '@usedapp/core'

const AddExeSega = ({ openexesega, handleExeSegaModal }) => {

    const { chainId, account } = useEthers()

    // const CloseBtn = <X className='cursor-pointer' size={25} onClick={handleModal} />

    const [VaultList, setVaultList] = useState([])

    const getVaultListFromLocal = () => {
        const getdata = JSON.parse(localStorage.getItem('vaultdata'))
        const valueData = getdata && getdata.filter(a => a.show === true && a.network === chainId && a.owner === account)
        const vaultlist = valueData && valueData.map((vault, index) => ({ value: index, label: `${vault.name} - ${vault.address}` }))
        setVaultList(vaultlist)
    }

    useEffect(() => {

        getVaultListFromLocal()

        return () => {

        }
    }, [])

    const [active, setActive] = useState('1')

    const toggle = tab => {
        if (active !== tab) {
            setActive(tab)
        }
    }

    return (
        <Modal className='modal-dialog-centered' isOpen={openexesega} toggle={handleExeSegaModal} >
            <ModalHeader tag='h2' toggle={handleExeSegaModal}>
                Add or Remove Existing Sega
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
                            <Col className='mb-1'>
                                <Label style={{ fontSize: "1.3em" }}>Parent Vault</Label>
                                <Select
                                    // theme={selectThemeColors}
                                    className='react-select'
                                    classNamePrefix='select'
                                    defaultValue=''
                                    name='clear'
                                    options={VaultList}
                                    isClearable
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
                                    <Input type='text' id='accadrs' />
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
                                    isClearable
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
                                    <Input type='text' id='accadrs' />
                                </FormGroup>
                            </Col>
                        </TabPane>
                    </TabContent>
                </Row>
            </ModalBody>
            <ModalFooter className='justify-content-center'>
                {active === '1' ? (
                    <Button.Ripple color='primary' onClick={handleExeSegaModal}>
                        <Eye className='mr-1' size={17} />
                        ADD
                    </Button.Ripple>
                ) : (
                    <Button.Ripple color='primary' onClick={handleExeSegaModal}>
                        <EyeOff className='mr-1' size={17} />
                        REMOVE
                    </Button.Ripple>
                )}
            </ModalFooter>
        </Modal>
    )
}

export default AddExeSega