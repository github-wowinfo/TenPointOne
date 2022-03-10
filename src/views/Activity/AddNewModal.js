// ** React Imports
import { useState, useEffect, Fragment } from 'react'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import { User, Briefcase, Mail, Calendar, DollarSign, X, Clipboard, Check, XCircle, AlertCircle } from 'react-feather'
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
  Col,
  CardTitle
} from 'reactstrap'
import Text from '../../views/CustomComponent/Text'
// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import './ActivityScreenStyles.css'
import { IoMdCopy } from 'react-icons/io'
import { BsBoxArrowUpRight } from 'react-icons/bs'
import axios from 'axios'
import moment from 'moment'
import { FaRegCheckCircle, FaRegCopy } from 'react-icons/fa'
import { toast } from 'react-toastify'
import Avatar from '@components/avatar'
import { useEthers, shortenIfTransactionHash, getExplorerTransactionLink } from '@usedapp/core'
import helperConfig from '../../helper-config.json'
import { GoLinkExternal } from 'react-icons/go'
import { FiXCircle } from 'react-icons/fi'
import { BiErrorCircle } from 'react-icons/bi'
import ExistingDesc from './ExistingDesc'

const AddNewModal = ({ open, handleModal, trxnId, description, local }) => {
  // ** State
  const [Picker, setPicker] = useState(new Date())
  const [details, setDetails] = useState({})
  const strText = ''

  const { chainId } = useEthers()

  const getTransactionDetails = async () => {
    try {
      const response = await axios.get(`https://api.unmarshal.com/v1/${helperConfig.unmarshal[chainId]}/transactions/${trxnId}?auth_key=CE2OvLT9dk2YgYAYfb3jR1NqCGWGtdRd1eoikUYs`)
      setDetails(response.data)
    } catch (error) {
      console.log(`AddNewModal [getTransactionDetails]`, error)
    }
  }

  const notifySuccess = () => toast.success(<SuccessToast />, { hideProgressBar: false })
  const copy = async () => {
    // await navigator.clipboard.writeText(details?.id)
    const textField = document.createElement('textarea')
    textField.innerText = details?.id
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
    notifySuccess()
  }
  const SuccessToast = () => (
    <Fragment>
      <div className='toastify-header'>
        <div className='title-wrapper'>
          <Avatar size='md' color='success' icon={<Clipboard size={12} />} />
          <h3 className='toast-title'>Copied to Clipboard!</h3>
        </div>
      </div>
    </Fragment>
  )

  useEffect(() => {
    if (trxnId) {
      getTransactionDetails()
    }
  }, [trxnId])

  let value = ''
  const [desc_flag, setDesc_flag] = useState(false)
  const new_description = (e) => {
    if (e.target.value !== "") {
      value = e.target.value
      setDesc_flag(true)
    } else {
      setDesc_flag(false)
    }
  }

  const handleCustomDescrp = () => {
    const getTxnAdrsData = JSON.parse(localStorage.getItem('txnAdrsData'))
    if (getTxnAdrsData && getTxnAdrsData.length > 0) {
      for (const i in getTxnAdrsData) {
        console.log('getTxnAdrsData[i].txn_id', getTxnAdrsData[i].txn_id)
        console.log('trxnId', trxnId)
        if (getTxnAdrsData[i].txn_id === trxnId) {
          getTxnAdrsData.splice(i, 1)
          break
        }
      }
    }
    localStorage.setItem('txnAdrsData', JSON.stringify(getTxnAdrsData))
    const getadrsdata = JSON.parse(localStorage.getItem('txnAdrsData'))
    const postdata = {
      txn_id: trxnId,
      custom_desc: value
    }
    let adrsdata = []
    if (getadrsdata) {
      adrsdata = [...getadrsdata, postdata]
    } else {
      adrsdata = [postdata]
    }
    localStorage.setItem('txnAdrsData', JSON.stringify(adrsdata))
    setDesc_flag(false)
    handleModal()
  }

  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={30} onClick={() => {
    setDesc_flag(false)
    handleModal()
  }} />

  return (
    <Modal
      isOpen={open}
      toggle={() => {
        setDesc_flag(false)
        handleModal()
      }}
      className='sidebar-sm'
      modalClassName='modal-slide-in'
      contentClassName='pt-0'
    >
      <ModalHeader className='mb-1' toggle={handleModal} close={CloseBtn} tag='h3'>
        {/* <label style={{ fontSize: '1.5em', fontWeight: 'bold', color: '#1919d2' }}>Transaction Details</label> */}
        <CardTitle className='modal-title pb-1'>Transaction Details</CardTitle>
        {/* <label style={{ fontSize: 15, fontWeight: 'normal' }}>{details?.description}</label> */}
        <label style={{ fontSize: 15, fontWeight: 'normal' }}><ExistingDesc id={trxnId} api_desc={description} /></label>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
        <FormGroup>
          <label className='label' style={{ fontSize: '1.2em' }}>Transaction #</label>
          <br />
          <div className='d-flex flex-row justify-content-between'>
            <label className='text' style={{ lineBreak: 'anywhere' }}>{shortenIfTransactionHash(details?.id)}</label>
            <Row className='d-flex flex-row justify-content-end'>
              <Col >
                <FaRegCopy style={{ cursor: 'pointer' }} size={20} onClick={copy} />
              </Col>
              <Col>
                <a href={getExplorerTransactionLink(details?.id, chainId)} target='_blank'><GoLinkExternal size={20} /></a>
              </Col>
            </Row>
          </div>
        </FormGroup>
        <FormGroup>
          <label className='label' style={{ fontSize: '1.2em' }}>From</label>
          <br />
          <Text text={details?.from} />
        </FormGroup>
        <FormGroup>
          <label className='label' style={{ fontSize: '1.2em' }}>To</label>
          <br />
          <Text text={details?.to} />
        </FormGroup>
        <FormGroup>
          <label className='label' style={{ fontSize: '1.2em' }}>Total Amount</label>
          <br />
          <label className='text w-50'>{details?.sent ? details?.sent[0].value / (10 ** details?.sent[0].decimals) : details?.received ? '' : '-'}</label>

        </FormGroup>
        <FormGroup>
          <label className='label' style={{ fontSize: '1.2em' }}>Transaction Fee</label>
          <br />
          <label className='text'>{details.fee / (10 ** 18)} MATIC</label>
        </FormGroup>
        <FormGroup>
          <label className='label' style={{ fontSize: '1.2em' }}>Created Date & Time</label>
          <br />
          <label className='text'>{moment(details.date * 1000).format("MMM-DD-YYYY h:mm:ss")}</label>
        </FormGroup>
        <FormGroup>
          <label className='label' style={{ fontSize: '1.2em' }}>Status</label>
          <br />
          {details.status === 'completed' ? (
            <div className='row' style={{ marginLeft: 1, alignItems: 'center' }}>
              <div className='mr-1'>
                <Avatar size='sm' color='success' icon={<FaRegCheckCircle size={12} />} />
              </div>
              <label className='text'>{(details.status).toUpperCase()} </label>
            </div>
          ) : details.status === 'error' ? (
            <div className='row' style={{ marginLeft: 1, alignItems: 'center' }}>
              <div className='mr-1'>
                <Avatar size='sm' color='danger' icon={<FiXCircle size={12} />} />
              </div>
              <label className='text'>{(details.status).toUpperCase()} </label>
            </div>
          ) : (
            <div className='row' style={{ marginLeft: 1, alignItems: 'center' }}>
              <div className='mr-1'>
                <Avatar size='sm' color='warning' icon={<BiErrorCircle size={12} />} />
              </div>
              <label className='text'>PENDING</label>
            </div>
          )}

        </FormGroup>
        <FormGroup>
          <label className='label' style={{ fontSize: '1.2em' }}>Custom Description</label>
          <br />
          <Input type='textarea' name='text' id='exampleText' rows='2' placeholder='Enter custom description over here' onChange={new_description} />
        </FormGroup>
        <div className='row' style={{ flex: 1, justifyContent: 'flex-end', marginRight: 0 }}>
          {desc_flag ? (
            <Button color='primary' className='right' onClick={handleCustomDescrp}>
              Update
            </Button>
          ) : (
            <Button color='primary' className='right' disabled>
              Update
            </Button>
          )}
        </div>
      </ModalBody>
    </Modal>
  )
}

export default AddNewModal
