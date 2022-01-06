// ** React Imports
import { isAddress } from 'ethers/lib/utils'
import { useState, Fragment } from 'react'

// ** Third Party Components
import { AlertTriangle, User, X } from 'react-feather'
import { BsWallet2 } from 'react-icons/bs'
import { FaRegCopy } from 'react-icons/fa'
import { GoLinkExternal } from 'react-icons/go'
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
  Alert,
  Col
} from 'reactstrap'
import 'animate.css'
import { useEthers } from '@usedapp/core'
import { connect } from 'react-redux'
import * as AppData from '../../redux/actions/cookies/appDataType'

const AddNewModal = ({ open, handleModal, dispatch, globalFavFlag }) => {

  const { account, chainId } = useEthers()

  const [name, setName] = useState('')
  const [name_flag, setName_flag] = useState(false)
  const [adrss, setAdrss] = useState('')
  const [adrs_flag, setAdrs_flag] = useState(false)
  // const [chain, setChain] = useState([])
  // const [chain_flag, setChain_flag] = useState(false)

  const handleName = (e) => {
    if (e.target.value === '') {
      alert("Name cannot be blank!")
      setName_flag(false)
    } else {
      setName(e.target.value)
      setName_flag(true)
    }
  }
  console.log('name', name)

  const handleAdrss = (e) => {
    const input_adrs = e.target.value
    if (isAddress(input_adrs)) {
      setAdrss(input_adrs)
      setAdrs_flag(true)
    } else {
      alert("Enter a valid address")
      setAdrs_flag(false)
    }
  }
  console.log('adrs', adrss)

  // const handleChecked = (e) => {
  //   const isCheck = e.target.checked
  //   if (isCheck) {
  //     setChain([...chain, Number(e.target.value)])
  //     // setChain_flag(true)
  //   } else {
  //     const index = chain.indexOf(e.target.value)
  //     chain.splice(index, 1)
  //     setChain(chain)
  //     // setChain_flag(true)
  //   }
  // }
  // console.log('chain', chain)

  const [visible, setVisible] = useState(false)

  const handleAlert = () => {
    setVisible(true)
    setTimeout(() => {
      setVisible(false)
    }, 3000)
  }

  const EmptyAlert = () => (
    <Fragment>
      <Alert className='animate__animated animate__slideInDown' color='danger' isOpen={visible} toggle={() => setVisible(false)}>
        <div className='my-1 alert-heading'>
          <AlertTriangle size={20} /><span className='ml-1'>Please fill all the values!</span>
        </div>
      </Alert>
    </Fragment>
  )

  const handleSubmit = () => {
    if (name && adrss) {
      const getdata = JSON.parse(localStorage.getItem('adrsbook'))
      const postdata =
      {
        owner: account,
        nickname: name,
        adrs: adrss,
        network: chainId
      }
      console.log('postdat', postdata.network)
      let adrsbook = []
      if (getdata) {
        adrsbook = [...getdata, postdata]
      } else {
        adrsbook = [postdata]
      }
      localStorage.setItem('adrsbook', JSON.stringify(adrsbook))
      // setChain([])
      if (globalFavFlag === 0) {
        dispatch(AppData.globalFavFlag(1))
      } else {
        dispatch(AppData.globalFavFlag(0))
      }
      setName_flag(false)
      setAdrs_flag(false)
      // setChain_flag(false)
      handleModal()
    } else {
      handleAlert()
    }
    setName_flag(false)
    setAdrs_flag(false)
    // setChain_flag(false)
  }


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
      <ModalHeader className='mb-1' toggle={handleModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title'>New Address</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
        {/* {visible ? (
          <Col>
            <Alert className='animate__animated animate__slideInDown' color='danger' isOpen={visible} toggle={() => setVisible(false)}>
              <div className='my-1 alert-heading'>
                <AlertTriangle size={20} /><span className='ml-1'>Please fill all the values!</span>
              </div>
            </Alert>
          </Col>
        ) : null} */}
        {visible ? <EmptyAlert /> : null}
        <FormGroup>
          <Label for='name'>Name</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <User size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='name' placeholder='Name goes here..' onChange={handleName} />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for='adrs'>Address</Label>
          <InputGroup>
            <InputGroupAddon addonType='prepend'>
              <InputGroupText>
                <BsWallet2 size={15} />
              </InputGroupText>
            </InputGroupAddon>
            <Input id='adrs' placeholder='Address goes here..' onChange={handleAdrss} />
          </InputGroup>
        </FormGroup>
        {/* <Label for='chain'>Select Network</Label>
        <FormGroup>
          <FormGroup check>
            <Input id='1' type="checkbox" name='97' value='97' onChange={handleChecked} />
            <Label check>BSC Testnet</Label>
          </FormGroup>
          <FormGroup check>
            <Input id='2' type="checkbox" name='56' value='56' onChange={handleChecked} />
            <Label check>BSC Main</Label>
          </FormGroup>
          <FormGroup check>
            <Input id='3' type="checkbox" name='137' value='137' onChange={handleChecked} />
            <Label check>Polygon</Label>
          </FormGroup>
          <FormGroup check>
            <Input id='4' type="checkbox" name='42' value='42' onChange={handleChecked} />
            <Label check>Kovan</Label>
          </FormGroup>
          <FormGroup check>
            <Input id='5' type="checkbox" name='80001' value='80001' onChange={handleChecked} />
            <Label check>Mumbai</Label>
          </FormGroup>
        </FormGroup> */}
        {name_flag && adrs_flag ? (
          <Button className='mr-1' color='primary' onClick={() => {
            handleSubmit()
          }}>
            Submit
          </Button>
        ) : (
          <Button className='mr-1' color='primary' disabled> Submit </Button>
        )}

        <Button color='secondary' onClick={handleModal} outline>
          Cancel
        </Button>
      </ModalBody>
    </Modal>
  )
}

// export default AddNewModal
const mapStateToProps = (state) => ({
  globalAdrs: state.appData.globalAdrs,
  globalNickName: state.appData.globalNickName,
  globalFavFlag: state.appData.globalFavFlag
})
const mapDispatchToProp = dispatch => ({ dispatch })
export default connect(mapStateToProps, mapDispatchToProp)(AddNewModal)
