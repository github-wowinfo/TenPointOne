import React, { useState } from 'react'
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import {Modal, ModalBody, ModalHeader, ModalFooter, Row, Col, Input, Label, FormGroup, Button} from 'reactstrap'
import ModifyVault from './ModifyVault'
import ChildrenSega from './ChildrenSega'

const VaultSecurity = ({ openvaultsec, handleVaultSecModal}) => {

    // const CloseBtn = <X className='cursor-pointer' size={25} onClick={handleModal} />

    const colourOptions = [
        { value: 'adrs', label: 'Address 1' },
        { value: 'adrs', label: 'Address 2' },
        { value: 'adrs', label: 'Address 3' },
        { value: 'adrs', label: 'Address 4' },
        { value: 'adrs', label: 'Address 5' }
      ]

    const [modifyvaultmodal, setModifyVaultModal] = useState(false)
    const handleModifyVaultModal = () => setModifyVaultModal(!modifyvaultmodal)

    const [childsegamodal, setChildSegaModal] = useState(false)
    const handleChildSegatModal = () => setChildSegaModal(!childsegamodal)

    return (
        <div>
            <Modal className='modal-dialog-centered' isOpen={openvaultsec} toggle={handleVaultSecModal} >
                    <ModalHeader tag='h2' toggle={handleVaultSecModal}>
                        Select Account to Manage
                    </ModalHeader>
                    <ModalBody style={{ display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems:'center'}}>
                        <Row style={{ display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems:'center'}}>
                            <Col className='mb-1'>
                                <Label style={{fontSize: "1.3em"}}>Account</Label>
                                <Select
                                // theme={selectThemeColors}
                                className='react-select'
                                classNamePrefix='select'
                                defaultValue=''
                                name='clear'
                                options={colourOptions}
                                isClearable
                                />
                            </Col>
                            <Col>
                                <hr />
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label for='ownacc' style={{fontSize: "1.3em"}}>Owner</Label>
                                    <Input type='text' id='ownacc'  value='John - 0x02fe03c2a1c147C7D3a256386f2D2f0eEE3CEF98'/>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label for='backupacc' style={{fontSize: "1.3em"}}>Backup Account</Label>
                                    <Input type='text' id='backupacc' value='Morgan - x45c2f797e52e5D1c6C4afC6EBc61eFeb9de1E9da'/>
                                </FormGroup>
                            </Col>
                            <Col>
                                <Row>
                                    <Col>
                                        <FormGroup>
                                        <Label for='days' style={{fontSize: "1.2em"}}>Inactive after Days</Label>
                                        <Input type='text' id='days' value='365 Days'/>
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                        <Label for='rcvrydate' style={{fontSize: "1.2em"}}>Current Recovery Date</Label>
                                        <Input type='date' id='rcvrydate' value='01-01-2022'/>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter className='justify-content-center'>
                        <Button.Ripple className='mx-1' style={{minWidth: '10vw'}} color='primary'  onClick={handleModifyVaultModal}>
                                Modify Vault
                        </Button.Ripple>
                        <Button.Ripple className='mx-1' style={{minWidth: '10vw'}} color='primary'  onClick={handleChildSegatModal}>
                                View All Child Sega
                        </Button.Ripple>
                    </ModalFooter>
            </Modal>
            <ModifyVault openmodifyvaultmodal={modifyvaultmodal} handleModifyVaultModal={handleModifyVaultModal} />
            <ChildrenSega openchildsegamodal={childsegamodal} handleChildSegatModal={handleChildSegatModal}/>
        </div>
    )
}

export default VaultSecurity