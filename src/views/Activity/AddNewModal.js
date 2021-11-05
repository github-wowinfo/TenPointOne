// ** React Imports
import { useState } from 'react'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import { User, Briefcase, Mail, Calendar, DollarSign, X } from 'react-feather'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Label,
  Row,
  Col
} from 'reactstrap'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import './ActivityScreenStyles.css'
import { IoMdCopy } from 'react-icons/io'
import { BsBoxArrowUpRight } from 'react-icons/bs'

const AddNewModal = ({ open, handleModal }) => {
  // ** State
  const [Picker, setPicker] = useState(new Date())

  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />

  return (
    <Modal
      isOpen={open}
      toggle={handleModal}
      className='sidebar-sm'
      modalClassName='modal-slide-in'
      contentClassName='pt-0'
    >
      <ModalHeader className='mb-3' toggle={handleModal} close={CloseBtn} tag='div'>
        <label style={{ fontSize: 15, fontWeight: 'bold' }}>Transaction Details</label>
        <br />
        <label style={{ fontSize: 15, fontWeight: 'bold', color: 'blue' }}>More Details</label>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
        <FormGroup>
          <label className='label'>Transaction Hash</label>
          <br />
          <label className='text'>0x814af7f...e0a1</label>

          <div>
            <Row>
              <Col md='1' >

                <IoMdCopy size={20} />
              </Col>
              <Col md='1'>

                <BsBoxArrowUpRight />
              </Col>
            </Row>
          </div>
        </FormGroup>
        <FormGroup>
          <label className='label'>Total Amount</label>
          <br />
          <label className='text'>US $739,221.86 (35,483.38738 UNI)</label>

        </FormGroup>
        <FormGroup>
          <label className='label'>Transaction Fee</label>
          <br />
          <label className='text'>0.03082 ETH</label>
        </FormGroup>
        <FormGroup>
          <label className='label'>Created Date & Time</label>
          <br />
          <label className='text'>Sep-22-2021 12:53:44</label>
        </FormGroup>
        <FormGroup>
          <label className='label'>Status</label>
          <br />
          <div className='row' style={{ marginLeft: 1, alignItems: 'center' }}>
            <label className='text'>Completed </label>

            <div className='circle'></div>
          </div>
        </FormGroup>
        <FormGroup>
          <label className='label'>Note</label>
          <br />
          <Input type='textarea' name='text' id='exampleText' rows='3' placeholder='Enter Note' />
        </FormGroup>
        <div className='row' style={{ flex: 1, justifyContent: 'flex-end', marginRight: 0 }}>
          <Button color='primary' onClick={handleModal} className='right'>
            Update
          </Button>

        </div>

      </ModalBody>
    </Modal>
  )
}

export default AddNewModal
