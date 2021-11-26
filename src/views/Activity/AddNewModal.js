// ** React Imports
import { useState, useEffect, Fragment } from 'react'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import { User, Briefcase, Mail, Calendar, DollarSign, X, Clipboard } from 'react-feather'
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
import Text from '../../views/CustomComponent/Text'
// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import './ActivityScreenStyles.css'
import { IoMdCopy } from 'react-icons/io'
import { BsBoxArrowUpRight } from 'react-icons/bs'
import axios from 'axios'
import moment from 'moment'
import { FaRegCopy } from 'react-icons/fa'
import { toast } from 'react-toastify'
import Avatar from '@components/avatar'

const AddNewModal = ({ open, handleModal, trxnId }) => {
  // ** State
  const [Picker, setPicker] = useState(new Date())
  const [details, setDetails] = useState({})
  const strText = ''

  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />

  const getTransactionDetails = async () => {
    try {
      const response = await axios.get(`https://stg-api.unmarshal.io/v1/matic/transactions/${trxnId}?auth_key=CE2OvLT9dk2YgYAYfb3jR1NqCGWGtdRd1eoikUYs`)
      setDetails(response.data)
    } catch (error) {
      console.log(`AddNewModal [getTransactionDetails]`, error)
    }
  }

  const notifySuccess = () => toast.success(<SuccessToast />, { hideProgressBar: true })
  const copy = async () => {
    await navigator.clipboard.writeText(details?.id)
    notifySuccess()
  }
  const SuccessToast = () => (
    <Fragment>
      <div className='toastify-header'>
        <div className='title-wrapper'>
          <Avatar size='sm' color='success' icon={<Clipboard size={12} />} />
          <h6 className='toast-title'>Copied to Clipboard!</h6>
        </div>
      </div>
    </Fragment>
  )

  useEffect(() => {

    if (trxnId) {
      getTransactionDetails()

    }
    return () => {

    }
  }, [trxnId])

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
        <label style={{ fontSize: 15, fontWeight: 'normal' }}>{details?.description}</label>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
        <FormGroup>
          <label className='label'>Transaction Hash</label>
          <br />
          <label className='text' style={{ lineBreak: 'anywhere' }}>{details?.id}</label>
          <div>
            <Row>
              <Col md='1' >

                <FaRegCopy size={15} className='mr-1' onClick={copy} />
              </Col>
              <Col md='1'>

                <BsBoxArrowUpRight />
              </Col>
            </Row>
          </div>
        </FormGroup>
        <FormGroup>
          <label className='label'  >From</label>
          <br />
          <Text text={details?.from} />
        </FormGroup>
        <FormGroup>
          <label className='label'  >To</label>
          <br />
          <Text text={details?.to} />
        </FormGroup>
        <FormGroup>
          <label className='label'>Total Amount</label>
          <br />
          <label className='text w-50'>{details?.sent ? details?.sent[0].value / (10 ** details?.sent[0].decimals) : details?.received ? '' : '-'}</label>

        </FormGroup>
        <FormGroup>
          <label className='label'>Transaction Fee</label>
          <br />
          <label className='text'>{details.fee / (10 ** 18)} MATIC</label>
        </FormGroup>
        <FormGroup>
          <label className='label'>Created Date & Time</label>
          <br />
          <label className='text'>{moment(details.date * 1000).format("MMM-DD-YYYY h:mm:ss")}</label>
        </FormGroup>
        <FormGroup>
          <label className='label'>Status</label>
          <br />
          <div className='row' style={{ marginLeft: 1, alignItems: 'center' }}>
            <label className='text'>{details.status} </label>

            <div className='circle'></div>
          </div>
        </FormGroup>
        <FormGroup>
          <label className='label'>Note</label>
          <br />
          <Input type='text' name='text' id='exampleText' rows='3' placeholder='Enter Note' />
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
