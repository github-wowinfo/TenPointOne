import React, { Fragment, useEffect, useState } from 'react'
import Icon from 'react-crypto-icons'
import { Button, CardBody, CardText, CardTitle, Col, Modal, ModalBody, Row } from 'reactstrap'
import MetaMaskOnboarding from '@metamask/onboarding'
import { shortenIfAddress, useEthers } from '@usedapp/core'
import '@styles/base/pages/page-auth.scss'
import { useSkin } from '@hooks/useSkin'
import helperConfig from '../helper-config.json'
import logo from '../assets/images/logo/finallog.png'

const LoginModal = ({ openloginmodal, disconnect }) => {

    const [skin, setSkin] = useSkin()

    const illustration = skin === 'dark' ? 'newlogo.png' : 'newlogo.png',
        source = require(`@src/assets/images/pages/${illustration}`).default

    const { activateBrowserWallet, account, deactivate, chainId, activate } = useEthers()

    const isConnected = account !== undefined

    // const handleRoute = () => {
    //     window.location.href = '/home'
    // }

    // const activate = () => {
    //   try {
    //     activateBrowserWallet(undefined, true)
    //     console.log('account', account)
    //     console.log('chainId', chainId)
    //   } catch (error) {
    //     alert(error.message)
    //   }
    // }

    const isMetaMaskInstalled = () => {
        //Have to check the ethereum binding on the window object to see if it's installed
        const { ethereum } = window
        return Boolean(ethereum && ethereum.isMetaMask)
    }

    const forwarderOrigin = 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn'

    //We create a new MetaMask onboarding object to use in our app
    const onboarding = new MetaMaskOnboarding({ forwarderOrigin })

    //This will start the onboarding proccess
    const onClickInstall = () => {
        //On this object we have startOnboarding which will start the onboarding process for our end user
        onboarding.startOnboarding()
    }

    const [is_metamask, setIs_metamask] = useState()
    const MetaMaskClientCheck = () => {
        //Now we check to see if MetaMask is installed
        if (!isMetaMaskInstalled()) {
            //If it isn't installed we ask the user to click to install it
            setIs_metamask(false)
        } else {
            //If it is installed we change our button text
            setIs_metamask(true)
        }

    }

    useEffect(() => {
        isMetaMaskInstalled()
        MetaMaskClientCheck()
    }, [is_metamask])

    const networkIcon = chainId ? helperConfig.network[chainId].icon : "Not Connected"
    const networkName = chainId ? helperConfig.network[chainId].name : "Not Connected"
    const backgroundChange = { backgroundColor: networkName === "BSC testnet" ? '#cc9b00' : networkName === "Polygon Network" ? '#8146e4' : networkName === "Ethereum" ? '#4559f4' : networkName === "Kovan" ? '#6435c9' : networkName === "BSC Mainet" ? '#cc9b00' : networkName === "Polygon Mumbai" ? '#140035' : null }


    return (
        <>
            <Modal isOpen={openloginmodal} fullscreen>
                <ModalBody>
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
                                    {is_metamask ? (<>
                                        {isConnected ? (<Button.Ripple color='primary' style={{ fontSize: "1.5em", marginBottom: 10 }}
                                            onClick={() => disconnect()} block>LOGIN</Button.Ripple>) : (
                                            <Button.Ripple color='primary' style={{ fontSize: "1.5em", marginBottom: 10 }}
                                                onClick={async () => {
                                                    try {
                                                        // Will open the MetaMask UI
                                                        // You should disable this button while the request is pending!
                                                        // await ethereum.request({ method: 'eth_requestAccounts' })
                                                        activateBrowserWallet(undefined, true)
                                                    } catch (error) {
                                                        console.error(error)
                                                    }
                                                }}
                                                block>CONNECT WALLET
                                            </Button.Ripple>
                                        )}
                                    </>) : (
                                        <Button.Ripple color='primary' style={{ fontSize: "1.5em", marginBottom: 10 }}
                                            onClick={onClickInstall}
                                            block>INSTALL METAMASK
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
                                    </CardBody>
                                    {/* {<p>Network: {networkName}</p>}
                                    {<p>Account: {account}</p>}
                                    {console.log(account)}
                                    <Button size='sm' onClick={activateBrowserWallet}>Activate</Button>
                                    <Button size='sm' onClick={deactivate}>Deactivate</Button>
                                    {isConnected ? <p>Connected</p> : <p>Disconnected</p>} */}
                                </Col>
                            </Col>
                        </Row>
                    </div>
                </ModalBody>
            </Modal>
        </>
    )
}

export default LoginModal