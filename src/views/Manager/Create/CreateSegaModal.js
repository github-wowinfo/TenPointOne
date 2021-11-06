import Select from 'react-select'
import { X, PlusCircle } from 'react-feather'
import { selectThemeColors } from '@utils'
import {Modal, ModalBody, ModalHeader, ModalFooter, Row, Col, Input, Label, FormGroup, Button} from 'reactstrap'

const CreateSegaModal = ({ opensega, handleSegaModal}) => {

    // const CloseBtn = <X className='cursor-pointer' size={25} onClick={handleModal} />

    const colourOptions = [
        { value: 'adrs', label: 'Address 1' },
        { value: 'adrs', label: 'Address 2' },
        { value: 'adrs', label: 'Address 3' },
        { value: 'adrs', label: 'Address 4' },
        { value: 'adrs', label: 'Address 5' }
      ]

    return (
        <Modal className='modal-dialog-centered' isOpen={opensega} toggle={handleSegaModal} >
                <ModalHeader tag='h2' toggle={handleSegaModal}>
                    New Sega
                </ModalHeader>
                <ModalBody style={{ display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems:'center'}}>
                    <Row style={{ display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems:'center'}}>
                        <Col>
                            <h3>Create a new independent Sega linked to any of your Vault.</h3>
                        </Col>
                        <Col>
                            <p>All names set by you are stored locally on your PC and are not collected by Risk Protocol. Current user will also be designated as the owner 
                                for the new Vault.
                            </p>
                        </Col>
                        <Col>
                            <p>You will be required to pay the network fees for new Vault creation.</p>
                        </Col>
                        <Col className='mb-1'>
                            <Label style={{fontSize: "1.3em"}}>Parent Vault</Label>
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
                                <Label for='nickname' style={{fontSize: "1.3em"}}>Nickname</Label>
                                <Input type='text' id='nickname' />
                            </FormGroup>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter className='justify-content-center'>
                    <Button.Ripple color='primary'  onClick={handleSegaModal}>
                        <PlusCircle className='mr-1' size={25}/>
                            Create
                    </Button.Ripple>
                </ModalFooter>
        </Modal>
    )
}

export default CreateSegaModal