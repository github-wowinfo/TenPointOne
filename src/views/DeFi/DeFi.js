import React, { useState } from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink, Button, Col, Card } from 'reactstrap'
import Buy from './Buy'
import Swap from './Swap'
import Yield from './Yield'

const DeFi = () => {
    const [active, setActive] = useState('1')

    const toggle = tab => {
        if (active !== tab) {
            setActive(tab)
        }
    }

    return (
        <React.Fragment>
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
        </React.Fragment>
    )
}

export default DeFi