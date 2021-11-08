import React, { useState } from 'react'
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import { Modal, ModalBody, ModalHeader, ModalFooter, Row, Col, Input, Label, FormGroup, Button } from 'reactstrap'
import ForceRecall from './ForceRecall'

const SegaSecurity = ({ opensegasec, handleSegaSecModal }) => {

    // const CloseBtn = <X className='cursor-pointer' size={25} onClick={handleModal} />

    const colourOptions = [
        { value: 'adrs', label: 'Address 1' },
        { value: 'adrs', label: 'Address 2' },
        { value: 'adrs', label: 'Address 3' },
        { value: 'adrs', label: 'Address 4' },
        { value: 'adrs', label: 'Address 5' }
    ]

    const [recallmodal, setRecallModal] = useState(false)
    const handlRecoverModal = () => setRecallModal(!recallmodal)

    return (
        <div>
            <Modal className='modal-dialog-centered modal-lg' isOpen={opensegasec} toggle={handleSegaSecModal} >
                <ModalHeader tag='h2' toggle={handleSegaSecModal}>
                    Select Account to Manage
                </ModalHeader>
                <ModalBody style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Row style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Col>
                            <h3>Select the account to view or modify security settings.</h3>
                        </Col>
                        <Col className='mb-1'>
                            <Label style={{ fontSize: "1.3em" }}>Account</Label>
                            <Select
                                // theme={selectThemeColors}
                                className='react-select'
                                classNamePrefix='select'
                                defaultValue='SBI-Savings - 0x2EcE47215383CEc4493617f7E3A88AC6df33Ce6d'
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
                                <Label for='ownacc' style={{ fontSize: "1.3em" }}>Parent Vault</Label>
                                <Input type='text' id='ownacc' value='SBI Vault - 0x271AC3C918C8C49a1723058e82A985ad0599EFe2' />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for='backupacc' style={{ fontSize: "1.3em" }}>Designated Sega Operator</Label>
                                <Input type='text' id='backupacc' value='John - 0x02fe03c2a1c147C7D3a256386f2D2f0eEE3CEF98' />
                            </FormGroup>
                        </Col>
                        <Col>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for='days' style={{ fontSize: "1.2em" }}>Operator Status</Label>
                                        <div className="d-flex justify-content-between">
                                            <p><strong>Active</strong></p>
                                            <Button.Ripple className='mx-1' color='primary' onClick={handleSegaSecModal}>Lock</Button.Ripple>
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label for='rcvrydate' style={{ fontSize: "1.2em" }}>Assest Recall</Label>
                                        <div className="d-flex justify-content-between">
                                            <p><strong>Force Recall to Vault</strong></p>
                                            <Button.Ripple className='mx-1' color='primary' onClick={handlRecoverModal}>Recall</Button.Ripple>
                                        </div>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>
            <ForceRecall openrecallmodal={recallmodal} handlRecoverModal={handlRecoverModal} />
        </div>
    )
}

export default SegaSecurity