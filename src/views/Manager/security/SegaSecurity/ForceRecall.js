import {BsSafe2, BsArrowDown} from 'react-icons/bs'
import Select from 'react-select'
import {Modal, ModalBody, ModalHeader, ModalFooter, Row, Col, Input, Label, FormGroup, Button, CustomInput} from 'reactstrap'
import Badge from 'reactstrap/lib/Badge'

const ForceRecall = ({ openrecallmodal, handlRecoverModal}) => {

    const colourOptions = [
        { value: 'adrs', label: 'Address 1' },
        { value: 'adrs', label: 'Address 2' },
        { value: 'adrs', label: 'Address 3' },
        { value: 'adrs', label: 'Address 4' },
        { value: 'adrs', label: 'Address 5' }
      ]

    // const CloseBtn = <X className='cursor-pointer' size={25} onClick={handleModal} />
    return (
        <Modal className='modal-dialog-centered modal-lg' isOpen={openrecallmodal} toggle={handlRecoverModal} >
                <ModalHeader tag='h1' toggle={handlRecoverModal}>
                    Force Recall
                </ModalHeader>
                <ModalBody style={{ display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems:'center'}}>
                    <Row style={{ display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems:'center'}}>
                        <Col>
                            <h3>For Risk Officers and Vault operators to pull Sega assests back into its Parent Vault bypassing the Sega operator.</h3>
                        </Col>
                        <Col className='my-1'>
                            <Row className='d-flex flex-row'>
                                <Col md='1'><BsSafe2 size={40}/></Col>
                                <Col className='d-flex flex-column justify-content-start'>
                                    <h3>SBI Savings</h3>
                                    <h5>0x2EcE47215383CEc4493617f7E3A88AC6df33Ce6d</h5>
                                </Col>
                            </Row>
                        </Col>
                        <Col className='d-flex flex-row mb-1'>
                            <Col md='1'><BsArrowDown size={40}/></Col>
                            <Col>
                                <hr />
                            </Col>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for='parentvault' style={{fontSize: "1.3em"}}>Parent Vault</Label>
                                <Input type='text' id='parentvault' value='SBI Vault - 0x271AC3C918C8C49a1723058e82A985ad0599EFe2'/>                                
                            </FormGroup>
                        </Col>
                        <Col className='mb-1'>
                                <Label style={{fontSize: "1.3em"}}>Select Assest</Label>
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
                            <FormGroup>
                                <Col className='d-flex flex-row justify-content-between'>
                                    <Label for='amount' style={{fontSize: "1.3em"}}>Amount</Label>
                                    <a href='#' style={{color:'red'}}> Send Max</a>
                                    {/* <CustomInput
                                        type='switch'
                                        id='exampleCustomSwitch'
                                        name='customSwitch'
                                        label='Send Max'
                                        inline
                                    /> */}
                                </Col>
                                <Input type='text' id='amount'/>                                
                            </FormGroup>
                        </Col>
                    </Row>
                </ModalBody>                
                <ModalFooter className='justify-content-center'>
                        <Button.Ripple color='primary'  onClick={handlRecoverModal}>
                                Force Recall
                        </Button.Ripple>
                    </ModalFooter>
        </Modal>
    )
}

export default ForceRecall