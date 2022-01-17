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

    const [curr_acc, setCurr_acc] = useState(account)

    useEffect(() => {
        if (curr_acc !== account) {
            window.location.reload()
        }

        const get_load_flag = JSON.parse(localStorage.getItem('load_flag'))
        if (get_load_flag === undefined || get_load_flag === null) {
            localStorage.setItem('load_flag', JSON.stringify(true))
        } else {
            if (get_load_flag === false) {
                localStorage.setItem('load_flag', JSON.stringify(true))
            }
        }
    }, [])

    const init_flag = JSON.parse(localStorage.getItem('load_flag'))

    console.log('init_flag', init_flag)

    const networkIcon = chainId ? helperConfig.network[chainId].icon : "Not Connected"
    const networkName = chainId ? helperConfig.network[chainId].name : "Not Connected"
    const backgroundChange = { backgroundColor: networkName === "BSC testnet" ? '#cc9b00' : networkName === "Polygon Network" ? '#8146e4' : networkName === "Ethereum" ? '#4559f4' : networkName === "Kovan" ? '#6435c9' : networkName === "BSC Mainet" ? '#cc9b00' : networkName === "Polygon Mumbai" ? '#140035' : null }

    return (
        <>
            <Modal className='modal-xl modal-dialog-centered' isOpen={openloginmodal}>
                <ModalBody>
                    <div>
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
                                    <Col>
                                        <CardTitle tag='h2' style={{ color: '#00cfe8' }} className='font-weight-bold text-center mb-1 px-1'>
                                            RISK PROTOCOL
                                        </CardTitle>
                                        {is_metamask ? (<>
                                            {isConnected ? (<Button.Ripple color='primary' style={{ fontSize: "1em", marginBottom: 5 }}
                                                onClick={() => disconnect()} block>LOGIN</Button.Ripple>) : (
                                                <Button.Ripple color='primary' style={{ fontSize: "1em", marginBottom: 5 }}
                                                    onClick={async () => {
                                                        try {
                                                            if (init_flag) {
                                                                window.location.reload()
                                                                localStorage.setItem('load_flag', JSON.stringify(false))
                                                            }
                                                            activateBrowserWallet(undefined, true)
                                                        } catch (error) {
                                                            console.error(error)
                                                            localStorage.setItem('load_flag', JSON.stringify(false))
                                                        }
                                                    }}
                                                    block>CONNECT WALLET
                                                </Button.Ripple>
                                            )}
                                        </>) : (
                                            <Button.Ripple color='primary' style={{ fontSize: "1em", marginBottom: 10 }}
                                                onClick={onClickInstall}
                                                block>INSTALL METAMASK
                                            </Button.Ripple>
                                        )}
                                        <CardBody className='px-0'>
                                            <Col className='mb-1 d-flex flex-row justify-content-first'>
                                                <strong>Network</strong> :
                                                {networkName === 'Not Connected' ? null : (
                                                    <CardText as='p' className='mx-1' style={{ width: 'fit-content', color: 'black' }}>
                                                        <Icon className='mr-1' name={networkIcon} size={25} />
                                                        {networkName}
                                                    </CardText>
                                                )}
                                            </Col>
                                            <Col className='mb-1 d-flex flex-row justify-content-first'>
                                                <strong>Account</strong> :
                                                <CardText className='mx-1'>
                                                    {shortenIfAddress(account)}
                                                </CardText>
                                            </Col>
                                            <Col>
                                                <CardText>Network's supported are <strong>Polygon Mainnet, Kovan, BSC Testnet, Polygon Mumbai</strong></CardText>
                                                {/* <CardText>Polygon Mainnet, Kovan, BSC Testnet, Polygon Mumbai</CardText> */}
                                            </Col>
                                            {/* <Col className='mt-1'>
                                            <ul className='list-unstyled'>
                                                <li>The supported network's are,</li>
                                                <ul>
                                                    <li>"Polygon Network"</li>
                                                    <li>"Kovan"</li>
                                                    <li>"BSC testnet"</li>
                                                    <li>"Polygon Mumbai"</li>
                                                </ul>
                                            </ul>
                                        </Col> */}
                                        </CardBody>
                                    </Col>
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