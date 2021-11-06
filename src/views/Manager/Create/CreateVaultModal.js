import { X, PlusCircle } from 'react-feather'
import {Modal, ModalBody, ModalHeader, ModalFooter, Row, Col, Input, Label, FormGroup, Button} from 'reactstrap'

const CreateVaultModal = ({ openvault, handleVaultModal}) => {

    // const CloseBtn = <X className='cursor-pointer' size={25} onClick={handleModal} />

    return (
        <Modal className='modal-dialog-centered' isOpen={openvault} toggle={handleVaultModal} >
                <ModalHeader tag='h2' toggle={handleVaultModal} >
                    New Vault
                </ModalHeader>
                <ModalBody style={{ display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems:'center'}}>
                    <Row style={{ display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems:'center'}}>
                        <Col>
                            <h3>Create a new independent Vault.</h3>
                        </Col>
                        <Col>
                            <p>All names set by you are stored locally on your PC and are not collected by Risk Protocol. Current user will also be designated as the owner 
                                for the new Vault.
                            </p>
                        </Col>
                        <Col>
                            <p>You will be required to pay the network fees for new Vault creation.</p>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for='nickname' style={{fontSize: "1.3em"}}>Nickname</Label>
                                <Input type='text' id='nickname' />
                            </FormGroup>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter className='justify-content-center'>
                    <Button.Ripple  color='primary' onClick={handleVaultModal}>
                        <PlusCircle className='mr-1' size={17}/>
                        Create
                    </Button.Ripple>
                </ModalFooter>
        </Modal>
    )
}

export default CreateVaultModal