import { useState } from 'react'
import { X, Edit3, PlusCircle } from 'react-feather'
import { Modal, ModalBody, ModalHeader, ModalFooter, Row, Col, Input, Label, FormGroup, Button } from 'reactstrap'

const AddExeVault = ({ openexevault, handleExeVaultModal }) => {

    // const CloseBtn = <X className='cursor-pointer' size={25} onClick={handleModal} />

    const [accountText, setAccountText] = useState('')

    const accountTextChange = (e) => {
        setAccountText(e.target.value)
    }
    const handleOnAdd = () => {

        const getdata = JSON.parse(localStorage.getItem('vaultdata'))
        for (const i in getdata) {
            if (getdata[i].address === accountText) {
                getdata[i].show = true
                break
            }
        }
        localStorage.setItem('vaultdata', JSON.stringify(getdata))

        handleExeVaultModal()
    }

    return (
        <Modal className='modal-dialog-centered' isOpen={openexevault} toggle={handleExeVaultModal} >
            <ModalHeader toggle={handleExeVaultModal} >
                Add Existing Vault
            </ModalHeader>
            <ModalBody style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Row style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Col>
                        <h3>Start tracking your alreadt existing Vaults.</h3>
                    </Col>
                    <Col>
                        <p>All names set by you are stored locally on your PC and are not collected by Risk Protocol.</p>
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
                            <Input type='text' id='accadrs' onChange={accountTextChange} />
                        </FormGroup>
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter className='justify-content-center'>
                <Button.Ripple color='primary' onClick={handleOnAdd}>
                    <PlusCircle className='mr-1' size={17} />
                    Add
                </Button.Ripple>
            </ModalFooter>

        </Modal>
    )
}

export default AddExeVault