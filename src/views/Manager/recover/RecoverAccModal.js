import { X, Unlock  } from 'react-feather'
import {Modal, ModalBody, ModalHeader, ModalFooter, Row, Col, Input, Label, FormGroup, Button} from 'reactstrap'

const RecoverAccModal = ({ openrecovermodal, handleRecoverModal}) => {

    // const CloseBtn = <X className='cursor-pointer' size={25} onClick={handleModal} />

    return (
        
        <Modal className='modal-dialog-centered' isOpen={openrecovermodal} toggle={handleRecoverModal} >
                <ModalHeader tag='h1' toggle={handleRecoverModal} >
                    Recover Vault
                </ModalHeader>
                <ModalBody style={{ display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems:'center'}}>
                    <Row style={{ display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems:'center'}}>
                        <Col>
                            <h3>Recovery is only possible by the designated Backup Account and only after the owner has been inactive for the time period as set by Owner.</h3>
                        </Col>
                        <Col className="my-1">
                        <FormGroup>
                                <Label for='vaultadrs' style={{fontSize: "1.3em"}}>Vault Address</Label>
                                <Input type='text' id='vaultadrs' />
                                <p style={{fontSize: '.75em'}}>If you are uncertain of the vault address, you can still find it. If you know the account address of the Owner. Check documentation 
                                <a href='#' style={{color:'red'}}> here</a> to see how.</p>
                            </FormGroup>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter className='justify-content-center'>
                    <Button.Ripple color='primary' onClick={handleRecoverModal}>
                        <Unlock  className='mr-1' size={17}/>
                        Recover
                    </Button.Ripple>
                </ModalFooter>
                
        </Modal>
    )
}

export default RecoverAccModal