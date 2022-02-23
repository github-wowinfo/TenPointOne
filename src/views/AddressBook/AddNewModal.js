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
  Col,
  CardTitle
} from 'reactstrap'
import 'animate.css'
import { useEthers } from '@usedapp/core'
import { connect } from 'react-redux'
import helperConfig from '../../helper-config.json'
import * as AppData from '../../redux/actions/cookies/appDataType'
import Icon from 'react-crypto-icons'

const AddNewModal = ({ open, handleModal, dispatch, globalVaultFlag }) => {

  const { account, chainId } = useEthers()

  const [name, setName] = useState('')
  const [name_flag, setName_flag] = useState(false)
  const [adrss, setAdrss] = useState('')
  const [adrs_flag, setAdrs_flag] = useState(false)
  // const [chain, setChain] = useState([])
  // const [chain_flag, setChain_flag] = useState(false)

  const [visible_n, setVisible_n] = useState(false)

  const handleNameAlert = () => {
    setVisible_n(true)
    setTimeout(() => {
      setVisible_n(false)
    }, 4000)
  }

  const NameAlert = () => (
    <Fragment>
      <Alert className='animate__animated animate__slideInDown' color='danger' isOpen={visible_n} toggle={() => setVisible_n(false)}>
        <div className='my-1 alert-heading'>
          <AlertTriangle size={20} /><span className='ml-1'>Name Field cannot be blank!</span>
        </div>
      </Alert>
    </Fragment>
  )

  const handleName = (e) => {
    if (e.target.value === '') {
      // alert("Name cannot be blank!")
      handleNameAlert()
      setName_flag(false)
    } else {
      setName(e.target.value)
      setName_flag(true)
    }
  }
  console.log('name', name)

  const handleAdrss = (e) => {
    const input_adrs = e.target.value
    if (input_adrs !== '') {
      setAdrss(input_adrs)
      setAdrs_flag(true)
    } else {
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
    }, 4000)
  }

  const EmptyAlert = () => (
    <Fragment>
      <Alert className='animate__animated animate__slideInDown' color='danger' isOpen={visible} toggle={() => setVisible(false)}>
        <div className='my-1 alert-heading'>
          <AlertTriangle size={20} /><span className='ml-1'>Please enter correct address!</span>
        </div>
      </Alert>
    </Fragment>
  )

  const handleSubmit = () => {
    if (name && isAddress(adrss)) {
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
      if (globalVaultFlag === 0) {
        dispatch(AppData.globalVaultFlag(1))
      } else {
        dispatch(AppData.globalVaultFlag(0))
      }
      setName_flag(false)
      setAdrs_flag(false)
      setName('')
      setAdrss('')
      // setChain_flag(false)
      handleModal()
    } else {
      handleAlert()
    }
    // setName_flag(false)
    // setAdrs_flag(false)
    // setChain_flag(false)
  }


  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={() => {
    setName_flag(false)
    setAdrs_flag(false)
    setName('')
    setAdrss('')
    handleModal()
  }} />

  const stylecontainer = {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    margin: ' 0px 1rem'
  }
  const networkstyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '2em',
    color: 'white',
    fontSize: '1.5em'
  }

  const networkIcon = chainId ? helperConfig.network[chainId].icon : "Not Connected"
  const networkName = chainId ? helperConfig.network[chainId].name : "Not Connected"
  const backgroundChange = { backgroundColor: networkName === "BSC testnet" ? '#cc9b00' : networkName === "Polygon Network" ? '#8146e4' : networkName === "Ethereum" ? '#4559f4' : networkName === "Kovan" ? '#6435c9' : networkName === "BSC Mainet" ? '#cc9b00' : networkName === "Polygon Mumbai" ? '#140035' : null }


  return (
    <Modal
      isOpen={open}
      toggle={() => {
        setName_flag(false)
        setAdrs_flag(false)
        setName('')
        setAdrss('')
        handleModal()
      }}
      className='sidebar-sm'
      modalClassName='modal-slide-in'
      contentClassName='pt-0'
    >
      <ModalHeader tag='h3' className='mb-1' toggle={() => {
        setName_flag(false)
        setAdrs_flag(false)
        setName('')
        setAdrss('')
        handleModal()
      }} close={CloseBtn} >
        <CardTitle className='modal-title'>New Address</CardTitle>
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
        {visible_n ? <NameAlert /> : null}
        {visible ? <EmptyAlert /> : null}
        <Col style={{ ...networkstyle, ...backgroundChange, fontSize: '1em', marginBottom: '0px' }} className='my-1 d-flex flex-row flex-nowrap align-self-center '>
          {/* <Icon className='mr-1' name={networkC.icon} size={20} />{networkC.name} */}
          <Icon className='mr-1' name={networkIcon} size={20} />{networkName}
        </Col>
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
        <Col className='text-center'>
          {name_flag && adrs_flag ? (
            <Button className='mr-1' color='primary' onClick={() => {
              handleSubmit()
            }}>
              Submit
            </Button>
          ) : (
            <Button className='mr-1' color='primary' disabled> Submit </Button>
          )}
        </Col>

        {/* <Button color='danger' onClick={() => {
          setName_flag(false)
          setAdrs_flag(false)
          setName('')
          setAdrss('')
          handleModal()
        }} outline>
          Cancel
        </Button> */}
      </ModalBody>
    </Modal>
  )
}

// export default AddNewModal
const mapStateToProps = (state) => ({
  globalAdrs: state.appData.globalAdrs,
  globalNickName: state.appData.globalNickName,
  globalVaultFlag: state.appData.globalVaultFlag
})
const mapDispatchToProp = dispatch => ({ dispatch })
export default connect(mapStateToProps, mapDispatchToProp)(AddNewModal)
