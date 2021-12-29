import React, { useState, useEffect } from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink, Button, Col, Card } from 'reactstrap'
import Buy from './Buy'
import Swap from './Swap'
import Yield from './Yield'
import { useEthers } from '@usedapp/core'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import helperConfig from '../../helper-config.json'

const DeFi = () => {

    const { account, chainId } = useEthers()

    const isConnected = account !== undefined

    const disconnect = () => {
        window.location.href = '/login'
    }

    const [curt_chain, setCurt_chain] = useState(chainId)
    const MySwal = withReactContent(Swal)

    const netchange = async (netid) => {
        await ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: `${netid}` }] })
    }
    const handleAjax = () => {
        return MySwal.fire({
            title: 'Do you want to change your current network?',
            // text: `Current network is "${helperConfig.network[chainId].name}"`,
            allowOutsideClick: false,
            showCancelButton: true,
            confirmButtonText: `Switch metamask to "${helperConfig.network[chainId].name} and log in again"`,
            cancelButtonText: `Stay on "${helperConfig.network[curt_chain].name}" and log in again`,
            customClass: {
                confirmButton: 'btn btn-primary mx-1',
                cancelButton: 'btn btn-danger my-1'
            },
            showClass: {
                popup: 'animate__animated animate__flipInX'
            },
        }).then(function (result) {
            if (result.isConfirmed) {
                netchange(helperConfig.network[chainId].netid)
                disconnect()
            } else if (result.isDismissed) {
                disconnect()
                netchange(helperConfig.network[curt_chain].netid)
            }
        })
    }

    useEffect(() => {
        if (chainId !== curt_chain) {
            handleAjax()
        }
    }, [chainId])

    const [active, setActive] = useState('1')

    const toggle = tab => {
        if (active !== tab) {
            setActive(tab)
        }
    }

    return (
        <>
            {isConnected ? (<React.Fragment>
                <Card className='pt-2'>
                    <Nav tabs>
                        <div style={{ display: 'flex', flex: 1, justifyContent: 'space-evenly' }}>
                            <NavItem>
                                <Col md={6} sm={12}>
                                    <div className='d-inline-block mr-1 mb-1'>
                                        <Button.Ripple outline color='primary' size='lg' active={active === '1'} onClick={() => {
                                            toggle('1')
                                        }}>
                                            Buy
                                        </Button.Ripple>
                                    </div>
                                </Col>
                            </NavItem>
                            <NavItem>
                                <Col md={6} sm={12}>
                                    <div className='d-inline-block mr-1 mb-1'>
                                        <Button.Ripple outline color='primary' size='lg' active={active === '2'} onClick={() => {
                                            toggle('2')
                                        }}>
                                            Swap
                                        </Button.Ripple>
                                    </div>
                                </Col>
                            </NavItem>
                            <NavItem>
                                <Col md={6} sm={12}>
                                    <div className='d-inline-block mr-1 mb-1'>
                                        <Button.Ripple outline color='primary' size='lg' active={active === '3'} onClick={() => {
                                            toggle('3')
                                        }}>
                                            Yield
                                        </Button.Ripple>
                                    </div>
                                </Col>
                            </NavItem>
                        </div>
                    </Nav>
                </Card>
                <TabContent className='py-50' activeTab={active}>
                    <TabPane tabId='1'>
                        <Buy />
                    </TabPane>
                    <TabPane tabId='2'>
                        <Swap />
                    </TabPane>
                    <TabPane tabId='3'>
                        <Yield />
                    </TabPane>
                </TabContent>
            </React.Fragment>) : disconnect()}
        </>
    )
}

export default DeFi