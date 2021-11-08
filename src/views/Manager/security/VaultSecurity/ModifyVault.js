import {BsSafe2} from 'react-icons/bs'
import {Modal, ModalBody, ModalHeader, InputGroup, InputGroupAddon, Row, Col, Input, Label, FormGroup, Button} from 'reactstrap'

const ModifyVault = ({ openmodifyvaultmodal, handleModifyVaultModal}) => {

    // const CloseBtn = <X className='cursor-pointer' size={25} onClick={handleModal} />
    return (
        <Modal className='modal-dialog-centered modal-lg' isOpen={openmodifyvaultmodal} toggle={handleModifyVaultModal} >
                <ModalHeader tag='h1' toggle={handleModifyVaultModal}>
                    Modify Vault Settings
                </ModalHeader>
                <ModalBody style={{ display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems:'center'}}>
                    <Row style={{ display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems:'center'}}>
                        <Col>
                            <h3>Update your Vault with new security parameters and modify.</h3>
                        </Col>
                        <Col className='my-1'>
                            <Row className='d-flex flex-row'>
                                <Col md='1'><BsSafe2 size={40}/></Col>
                                <Col className='d-flex flex-column justify-content-start'>
                                    <h3>SBI Vault</h3>
                                    <h5>0x271AC3C918C8C49a1723058e82A985ad0599EFe2</h5>
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                            <hr />
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for='backupacc' style={{fontSize: "1.3em"}}>Backup Account</Label>
                                <InputGroup>
                                <Input type='text' id='backupacc' value='enter new backup account here..'/>
                                <InputGroupAddon addonType='append'>
                                    <Button color='primary' outline>
                                    Modify
                                    </Button>
                                </InputGroupAddon>
                                </InputGroup>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for='inactivedays' style={{fontSize: "1.3em"}}>Inactive After Days</Label>
                                <InputGroup>
                                <Input type='text' id='inactivedays' value='enter no. of days before owner is declared inactive'/>
                                <InputGroupAddon addonType='append'>
                                    <Button color='primary' outline>
                                    Modify
                                    </Button>
                                </InputGroupAddon>
                                </InputGroup>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for='hide' style={{fontSize: "1.3em"}}>Hide</Label>
                                <InputGroup>
                                <Input type='text' id='hide' value='Hide from view and stop tracking this Vault'/>
                                <InputGroupAddon addonType='append'>
                                    <Button color='primary' outline>
                                    Hide
                                    </Button>
                                </InputGroupAddon>
                                </InputGroup>
                            </FormGroup>
                        </Col>
                        
                    </Row>
                </ModalBody>
        </Modal>
    )
}

export default ModifyVault