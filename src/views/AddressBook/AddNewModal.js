// ** React Imports
import { isAddress } from 'ethers/lib/utils'
import { useState } from 'react'

// ** Third Party Components
import { User, X } from 'react-feather'
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
  Label
} from 'reactstrap'
import Heart from './Heart'

const AddNewModal = ({ open, handleModal }) => {

  const [name, setName] = useState('')
  const [adrss, setAdrss] = useState('')
  const [chain, setChain] = useState('')

  const handleName = (e) => {
    if (e.target.value === '') {
      alert("Name cannot be blank!")
    } else {
      setName(e.target.value)
    }
  }
  console.log('name', name)

  const handleAdrss = (e) => {
    const input_adrs = e.target.value
    if (isAddress(input_adrs)) {
      setAdrss(input_adrs)
    } else {
      alert("Enter a valid address")
    }
  }
  console.log('adrs', adrss)

  const handleChecked = (e) => {
    const network = e.target.value
    setChain(network)
  }
  console.log('chain', chain)

  const handleSubmit = () => {
    const getdata = JSON.parse(localStorage.getItem('adrsbook'))
    const postdata =
    {
      nickname: name,
      adrs: adrss,
      network: chain
      // icon1: <FaRegCopy className='mx-1' size={20} />,
      // icon2: <GoLinkExternal className='mx-1' size={20} />,
      // fav: <Heart />
    }
    let adrsbook = []
    if (getdata) {
      adrsbook = [...getdata, postdata]
    } else {
      adrsbook = [postdata]
    }
    localStorage.setItem('adrsbook', JSON.stringify(adrsbook))
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
      <ModalHeader className='mb-3' toggle={handleModal} close={CloseBtn} tag='div'>
        <h5 className='modal-title'>New Address</h5>
      </ModalHeader>
      <ModalBody className='flex-grow-1'>
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
        <Label for='chain'>Select Network</Label>
        <FormGroup>
          <FormGroup check>
            <Input type="checkbox" value='97' onChange={handleChecked} />
            <Label check>BSC Testnet</Label>
          </FormGroup>
          <FormGroup check>
            <Input type="checkbox" value='56' onChange={handleChecked} />
            <Label check>BSC Main</Label>
          </FormGroup>
          <FormGroup check>
            <Input type="checkbox" value='137' onChange={handleChecked} />
            <Label check>Polygon</Label>
          </FormGroup>
          <FormGroup check>
            <Input type="checkbox" value='42' onChange={handleChecked} />
            <Label check>Kovan</Label>
          </FormGroup>
          <FormGroup check>
            <Input type="checkbox" value='80001' onChange={handleChecked} />
            <Label check>Mumbai</Label>
          </FormGroup>
        </FormGroup>
        <Button className='mr-1' color='primary' onClick={() => {
          handleSubmit()
          handleModal()
        }}>
          Submit
        </Button>
        <Button color='secondary' onClick={handleModal} outline>
          Cancel
        </Button>
      </ModalBody>
    </Modal>
  )
}

export default AddNewModal
