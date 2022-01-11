import { useSkin } from '@hooks/useSkin'
import { Row, Col, CardTitle, CardText, Form, FormGroup, Label, Input, CustomInput, Button, Badge } from 'reactstrap'
import RecoverModal from "./RecoverModal"
import { Fragment, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Avatar from '@components/avatar'
import { ArrowRight, Check, ChevronsRight } from 'react-feather'
import '@styles/base/pages/page-auth.scss'
import {shortenIfAddress, useEthers } from '@usedapp/core'
import logo from '../assets/images/logo/finallog.png'
import CardBody from 'reactstrap/lib/CardBody'
import helperConfig from '../helper-config.json'
import Icon from 'react-crypto-icons'

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
  const { activateBrowserWallet, account, deactivate, chainId, error } = useEthers()
  const [skin, setSkin] = useSkin()

  const illustration = skin === 'dark' ? 'newlogo.png' : 'newlogo.png',
    source = require(`@src/assets/images/pages/${illustration}`).default


  const isConnected = account !== undefined

  const handleRoute = () => {
    window.location.href = '/home'
  }

  const activate = () => {

    try {
      activateBrowserWallet()
      console.log('account', account)
      console.log('chainId', chainId)
    } catch (error) {
      console.log("Login [activate]", error)
      alert(error.message)
    }

  }

  const networkIcon = chainId ? helperConfig.network[chainId].icon : "Not Connected"
  const networkName = chainId ? helperConfig.network[chainId].name : "Not Connected"
  const backgroundChange = { backgroundColor: networkName === "BSC testnet" ? '#cc9b00' : networkName === "Polygon Network" ? '#8146e4' : networkName === "Ethereum" ? '#4559f4' : networkName === "Kovan" ? '#6435c9' : networkName === "BSC Mainet" ? '#cc9b00' : networkName === "Polygon Mumbai" ? '#140035' : null }

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
            <CardBody>
              <Col className='my-1 d-flex flex-row justify-content-first'>
                <strong>Current Network</strong> :
                <CardText className='mx-1' style={{ ...backgroundChange, width: 'fit-content', color: 'white' }}>
                  <Icon className='mr-1' name={networkIcon} size={20} />
                  {networkName}
                </CardText>
              </Col>
              <Col className='my-1 d-flex flex-row justify-content-first'>
                <strong>Current Account</strong> :
                <CardText className='mx-1'>
                  {shortenIfAddress(account)}
                </CardText>
              </Col>
              <Col className='my-1'>
                <ul className='list-unstyled'>
                  <li>The supported network's are,</li>
                  <ul>
                    <li>"Polygon Network"</li>
                    <li>"Kovan"</li>
                    <li>"BSC testnet"</li>
                    <li>"Polygon Mumbai"</li>
                  </ul>
                </ul>
              </Col>
              {/* <p>Network: {networkName}</p>
              <p>Account: {shortenIfAddress(account)}</p> */}
            </CardBody>
            {/* {<p>Network: {networkName}</p>}
            {<p>Account: {account}</p>} */}
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