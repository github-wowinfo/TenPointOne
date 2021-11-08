import { height } from 'dom7'
import React, { useState } from 'react'
import { Button, Card, Col, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'
import BuyCrypto from './BuyCrypto'
import SellBTC from './SellBtc.js'

const Buy = () => {
    const [active, setActive] = useState('1')

    const toggle = tab => {
        if (active !== tab) {
            setActive(tab)
        }
    }

    return (
        <>
            <div className='row' style={{ flex: 1, justifyContent: 'center' }}>
                <div style={{ textAlign: 'center', backgroundColor: '#fff', padding: 5, borderRadius: 5 }}>
                    <label style={{ fontSize: 8, fontWeight: 'bold' }}>POWERED BY</label>
                    <br />
                    <label style={{ fontSize: 15, fontWeight: 'bold', color: '#000' }}>coinify</label>
                </div>
            </div>

            <div className='row' style={{ marginTop: 20, flex: 1, justifyContent: 'center' }}>

                <Col md='4' style={{ backgroundColor: '#fff' }}>
                    <React.Fragment>
                        <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
                            <Nav tabs>
                                <NavItem>
                                    <NavLink
                                        active={active === '1'}
                                        onClick={() => {
                                            toggle('1')
                                        }}
                                    >
                                        Buy Crypto
                                    </NavLink>

                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        active={active === '2'}
                                        onClick={() => {
                                            toggle('2')
                                        }}
                                    >
                                        Sell BTC
                                    </NavLink>
                                </NavItem>

                            </Nav>
                        </div>
                        <TabContent className='py-50' activeTab={active}>
                            <TabPane tabId='1'>
                                <BuyCrypto />
                            </TabPane>
                            <TabPane tabId='2'>
                                <SellBTC />
                            </TabPane>

                        </TabContent>
                    </React.Fragment>
                </Col>
            </div>
        </>
    )
}

export default Buy