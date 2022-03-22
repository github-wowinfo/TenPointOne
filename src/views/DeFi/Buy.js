import { height } from 'dom7'
import React, { useState } from 'react'
import { Button, Card, CardBody, CardTitle, Col, Label, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap'
import BuyCrypto from './BuyCrypto'
import SellBTC from './SellBtc.js'

const Buy = () => {
    const [active, setActive] = useState('1')

    const toggle = tab => {
        if (active !== tab) {
            setActive(tab)
        }
    }

    const style_no_vault = {
        minWidth: '30vw',
        minHeight: '55vh'
    }

    return (
        <>
            {/* <div className='row' style={{ flex: 1, justifyContent: 'center' }}>
                <Card>
                    <div style={{ textAlign: 'center', padding: 5, borderRadius: 5 }}>
                        <label style={{ fontSize: 8, fontWeight: 'bold' }}>POWERED BY</label>
                        <br />
                        <label style={{ fontSize: 15, fontWeight: 'bold' }}>coinify</label>

                    </div>
                </Card>
            </div> */}

            <div className='row' style={{ marginTop: 20, flex: 1, justifyContent: 'center' }}>

                <Col md='5' >
                    <Card style={style_no_vault} className='p-3'>
                        <React.Fragment>
                            <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
                                <Nav tabs>
                                    <div style={{ display: 'flex', flex: 1, justifyContent: 'space-evenly' }}>
                                        <NavItem>
                                            <NavLink
                                                active={active === '1'}
                                                onClick={() => {
                                                    toggle('1')
                                                }}
                                            >
                                                <CardTitle className='mb-0'>Buy Crypto</CardTitle>
                                            </NavLink>

                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                active={active === '2'}
                                                onClick={() => {
                                                    toggle('2')
                                                }}
                                            >
                                                <CardTitle className='mb-0'>Sell BTC</CardTitle>
                                            </NavLink>
                                        </NavItem>
                                    </div>
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
                    </Card>
                </Col>
            </div>
        </>
    )
}

export default Buy