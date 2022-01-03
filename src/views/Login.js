import { useSkin } from '@hooks/useSkin'
import { Row, Col, CardTitle, CardText, Form, FormGroup, Label, Input, CustomInput, Button } from 'reactstrap'
import RecoverModal from "./RecoverModal"
import { Fragment, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Avatar from '@components/avatar'
import { ArrowRight, Check, ChevronsRight } from 'react-feather'
import '@styles/base/pages/page-auth.scss'
import { connect } from 'react-redux'
import { ChainId, useEthers } from '@usedapp/core'
import logo from '../assets/images/logo/finallog.png'

const SuccessProgressToast = () => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='success' icon={<Check size={12} />} />
        <h5 className='toast-title'>Hi, there OwnerName! 👋</h5>
      </div>
      <small className='text-muted'></small>
    </div>
  </Fragment>
)

const notifySuccessProgress = () => toast.success(<SuccessProgressToast />)

const Login = () => {
  const [skin, setSkin] = useSkin()

  const illustration = skin === 'dark' ? 'newlogo.png' : 'newlogo.png',
    source = require(`@src/assets/images/pages/${illustration}`).default

  const { activateBrowserWallet, account, deactivate, chainId } = useEthers()

  const isConnected = account !== undefined

  const handleRoute = () => {
    window.location.href = '/home'
  }

  const activate = () => {
    try {
      activateBrowserWallet(undefined, true)
      console.log('account', account)
      console.log('chainId', chainId)
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div className='auth-wrapper auth-v2'>
      <Row className='auth-inner m-0'>
        <Col style={{ backgroundColor: "black" }} className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={source} alt='Login V2' />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <Col className='mb-1 text-center'>
              <img src={logo} alt="Risk protocol" height='50px' width='50px' />
            </Col>
            <CardTitle tag='h2' style={{ color: '#00cfe8' }} className='font-weight-bold text-center mb-3 px-1'>
              RISK PROTOCOL
            </CardTitle>
            {isConnected ? (<Button.Ripple color='primary' style={{ fontSize: "1.5em", marginBottom: 10 }}
              onClick={() => handleRoute()} block>LOGIN</Button.Ripple>) : (
              <Button.Ripple color='primary' style={{ fontSize: "1.5em", marginBottom: 10 }}
                onClick={activate}
                block>CONNECT WALLET
              </Button.Ripple>
            )}
            {<p>Network: {chainId}</p>}
            {<p>Account: {account}</p>}
            {/* {console.log(account)} */}
            {/* <Button size='sm' onClick={deactivate}>Deactivate</Button> */}
            {/* {isConnected ? <p>Connected</p> : <p>Disconnected</p>} */}
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Login