import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, FormGroup, Input } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const Receive = () => {
  const [formModal, setFormModal] = useState(false)

  return (
      <div>
      <Button.Ripple className="mt-1"   color='success' style={{fontSize: "1.5em"}} onClick={() => setFormModal(!formModal)} block>
            RECOVER ACCOUNT
        </Button.Ripple>
        <Modal isOpen={formModal} toggle={() => setFormModal(!formModal)} className='modal-dialog-centered'>
          {/* <ModalHeader style={{ textAlign: "center"}} toggle={() => setFormModal(!formModal)}>RECOVER VAULT</ModalHeader> */}
          <div className="modal-header" style={{display:"flex", justifyContent: "center", fontSize:"2em"}}>
          <div className="modal-title">RECOVER VAULT</div>
          </div>
          <ModalBody>
            <FormGroup className="my-1">
              <Label for='vaultadrs' style={{fontSize:"1.5em", textAlign: "center", minWidth: "100%"}}>VAULT ADDRESS TO RECOVER</Label>
              <Input type='text' id='vaultadrs' placeholder='Vault Address' style={{textAlign: "center", fontSize:"1.5em"}} />
            </FormGroup>
            <FormGroup className="my-1">
              <Label for='rcvradrs' style={{fontSize:"1.5em", textAlign: "center", minWidth: "100%"}}>RECOVERY BEING INITIATED BY</Label>
              <Input type='text' id='rcvradrs' placeholder='Recovers Address' style={{textAlign: "center", fontSize:"1.5em"}}/>
            </FormGroup>
          </ModalBody>
          <ModalFooter style={{ display: "flex", justifyContent: "space-between"}}>
            <Button style={{fontSize:"1.5em", marginBottom: 15}} color='success'  onClick={() => setFormModal(!formModal)}>
              RECOVER
            </Button>
            <Button style={{fontSize:"1.5em", marginBottom: 15}} color='danger'  onClick={() => setFormModal(!formModal)} >
              CANCEL
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    )
}

export default Receive