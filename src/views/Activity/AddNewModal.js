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
import { useEthers, shortenIfTransactionHash, getExplorerTransactionLink } from '@usedapp/core'
import helperConfig from '../../helper-config.json'
import { GoLinkExternal } from 'react-icons/go'

const AddNewModal = ({ open, handleModal, trxnId, description }) => {
  // ** State
  const [Picker, setPicker] = useState(new Date())
  const [details, setDetails] = useState({})
  const strText = ''

  const { chainId } = useEthers()

  const getTransactionDetails = async () => {
    try {
      const response = await axios.get(`https://stg-api.unmarshal.io/v1/${helperConfig.unmarshal[chainId]}/transactions/${trxnId}?auth_key=CE2OvLT9dk2YgYAYfb3jR1NqCGWGtdRd1eoikUYs`)
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
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={() => {
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
      <ModalHeader className='mb-1' toggle={handleModal} close={CloseBtn} tag='div'>
        <label style={{ fontSize: 15, fontWeight: 'bold' }}>Transaction Details</label>
        <br />
        {/* <label style={{ fontSize: 15, fontWeight: 'normal' }}>{details?.description}</label> */}
        <label style={{ fontSize: 15, fontWeight: 'normal' }}>{description}</label>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
        <FormGroup>
          <label className='label'>Transaction Hash</label>
          <br />
          <div className='d-flex flex-row justify-content-start'>
            <label className='text' style={{ lineBreak: 'anywhere' }}>{shortenIfTransactionHash(details?.id)}</label>
            <Row>
              <Col md='1' >
                <FaRegCopy style={{ cursor: 'pointer' }} size={15} className='mx-1' onClick={copy} />
              </Col>
              <Col md='1'>
                <a href={getExplorerTransactionLink(details?.id, chainId)} className='mx-1' target='_blank'><GoLinkExternal size={15} color='grey' /></a>
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
          {details.status === 'completed' ? (
            <div className='row' style={{ marginLeft: 1, alignItems: 'center' }}>
              <div className='mr-1'>
                <Avatar size='sm' color='success' icon={<Check size={12} />} />
              </div>
              <label className='text'>{(details.status).toUpperCase()} </label>
            </div>
          ) : details.status === 'error' ? (
            <div className='row' style={{ marginLeft: 1, alignItems: 'center' }}>
              <div className='mr-1'>
                <Avatar size='sm' color='danger' icon={<XCircle size={12} />} />
              </div>
              <label className='text'>{(details.status).toUpperCase()} </label>
            </div>
          ) : (
            <div className='row' style={{ marginLeft: 1, alignItems: 'center' }}>
              <div className='mr-1'>
                <Avatar size='sm' color='warning' icon={<AlertCircle size={12} />} />
              </div>
              <label className='text'>PENDING</label>
            </div>
          )}

        </FormGroup>
        <FormGroup>
          <label className='label'>Custom Description</label>
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
