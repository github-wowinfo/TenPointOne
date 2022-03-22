import React, { useState } from 'react'
import Icon from 'react-crypto-icons'
import { Button, Card, CardBody, CardFooter, Col, DropdownItem, DropdownMenu, DropdownToggle, Form, FormGroup, Input, InputGroup, InputGroupAddon, Label, Row, UncontrolledButtonDropdown } from 'reactstrap'
import { RiSwapFill } from 'react-icons/ri'
import ReactCountryFlag from 'react-country-flag'

const Swap = () => {
    const [selectCrypto1, setSelectCrypto1] = useState('eth')
    const [selectCrypto, setSelectCrypto] = useState('dai')

    const cryptoObj1 = {
        eth: 'ETH',
        uni: 'UNI',
        dai: 'DAI',
    }

    const cryptoObj = {
        eth: 'ETH',
        uni: 'UNI',
        dai: 'DAI',
    }

    const handleCryptoUpdate1 = (e, lang) => {
        e.preventDefault()
        setSelectCrypto1(lang)
    }

    const handleCryptoUpdate = (e, cur) => {
        e.preventDefault()
        setSelectCrypto(cur)
    }

    const cardStyle = {
        display: 'flex',
        justifyContent: 'center',
        alighnItems: 'center'
    }

    const style_no_vault = {
        minWidth: '30vw',
        minHeight: '55vh'
    }
    return (
        <Col style={cardStyle} md={{ offset: 3, size: 6 }} lg={{ offset: 3, size: 6 }} sm="12">
            <Card style={style_no_vault} className='m-1 card-payment'>
                <CardBody>
                    <Form className='form mt-2' onSubmit={e => e.preventDefault()}>
                        <Row className='d-flex flex-column justify-content-center'>
                            <Col>
                                <FormGroup>
                                    <div className='d-flex flex-row justify-content-between'>
                                        <Label for='pay_with' style={{ fontSize: '1.2em' }}>Pay With</Label>
                                        <span style={{ color: 'red', fontWeight: 'bold', paddingTop: '0.2em' }}>Balance: 0.503768158 ETH</span>
                                    </div>
                                    <InputGroup>
                                        <InputGroupAddon addonType='append'>
                                            <UncontrolledButtonDropdown>
                                                <DropdownToggle outline color='primary' caret>
                                                    <Icon name={selectCrypto1 === 'eth' ? 'eth' : selectCrypto1} size={15} />
                                                    <span className='selected-language ml-1'>{cryptoObj1[selectCrypto1]}</span>
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    <DropdownItem href='/' tag='a' onClick={e => handleCryptoUpdate1(e, 'eth')}>
                                                        <Icon name='eth' size={15} />
                                                        <span className='ml-1'>ETH</span>
                                                    </DropdownItem>
                                                    <DropdownItem href='/' tag='a' onClick={e => handleCryptoUpdate1(e, 'uni')}>
                                                        <Icon name='uni' size={15} />
                                                        <span className='ml-1'>UNI</span>
                                                    </DropdownItem>
                                                    <DropdownItem href='/' tag='a' onClick={e => handleCryptoUpdate1(e, 'dai')}>
                                                        <Icon name='dai' size={15} />
                                                        <span className='ml-1'>DAI</span>
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledButtonDropdown>
                                            {/* <Button color='primary' outline>
                                                Modify
                                            </Button> */}
                                        </InputGroupAddon>
                                        <Input className='text-right' type='text' id='pay_with' placeholder='~$4,247.15' />
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                            <Col className='text-center'>
                                <RiSwapFill size={35} color={'blue'} />
                            </Col>
                            <Col>
                                <FormGroup>
                                    <div className='d-flex flex-row justify-content-between'>
                                        <Label for='receive' style={{ fontSize: '1.2em' }}>Receive</Label>
                                        <span style={{ fontWeight: 'bold', paddingTop: '0.2em' }}>Balance: 0 DAI</span>
                                    </div>
                                    <InputGroup>
                                        <InputGroupAddon addonType='append'>
                                            <UncontrolledButtonDropdown>
                                                <DropdownToggle outline color='primary' caret>
                                                    <Icon name={selectCrypto === 'eth' ? 'eth' : selectCrypto} size={15} />
                                                    <span className='selected-language ml-1'>{cryptoObj[selectCrypto]}</span>
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    <DropdownItem href='/' tag='a' onClick={e => handleCryptoUpdate(e, 'eth')}>
                                                        <Icon name='eth' size={15} />
                                                        <span className='ml-1'>ETH</span>
                                                    </DropdownItem>
                                                    <DropdownItem href='/' tag='a' onClick={e => handleCryptoUpdate(e, 'uni')}>
                                                        <Icon name='uni' size={15} />
                                                        <span className='ml-1'>UNI</span>
                                                    </DropdownItem>
                                                    <DropdownItem href='/' tag='a' onClick={e => handleCryptoUpdate(e, 'dai')}>
                                                        <Icon name='dai' size={15} />
                                                        <span className='ml-1'>DAI</span>
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledButtonDropdown>
                                            {/* <Button color='primary' outline>
                                                Modify
                                            </Button> */}
                                        </InputGroupAddon>
                                        <Input className='text-right' type='text' id='pay_with' placeholder='~$4,229.02' />
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup className='mt-2'>
                                    <Label for='basicInput' style={{ fontSize: '1.2em' }}>Description (optional)</Label>
                                    <Input type='text' id='basicInput' placeholder='Enter Description' />
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                </CardBody>
                <CardFooter className='d-flex flex-column justify-content-center'>
                    <div className='text-center' >
                        <Button.Ripple color='primary'>Swap</Button.Ripple>
                    </div>
                </CardFooter>
            </Card>

            {/* <Col md='5'>
                <Card style={style_no_vault} className='p-3'>
                    <div style={{
                        display: 'flex',
                        flex: 1,
                        justifyContent: 'space-between'
                    }}>
                        <h6 style={{ marginTop: 10, fontSize: '1.2em' }}>Pay With</h6>
                        <label style={{
                            marginTop: 10,
                            fontWeight: 'bold',
                            fontSize: 15,
                            color: 'red'
                        }}></label>
                    </div>

                    <div style={{

                        borderWidth: 1,
                        borderStyle: 'solid',
                        padding: 5,
                        borderRadius: 5,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'

                    }}>

                        <div>


                            <label style={{
                                marginLeft: 5,
                                fontWeight: 'bold'
                            }}></label>

                        </div>

                        <h4>1</h4>


                    </div>

                    <div style={{
                        marginTop: 15,
                        marginBottom: 15,
                        display: 'flex',
                        flex: 1,
                        justifyContent: 'center'
                    }}>
                        <RiSwapFill size={25} color={'blue'} />
                    </div>

                    <div style={{
                        display: 'flex',
                        flex: 1,
                        justifyContent: 'space-between'
                    }}>
                        <h6 style={{ marginTop: 10, fontSize: '1.2em' }}>Receive</h6>
                        <label style={{
                            marginTop: 10,
                            fontWeight: 'bold',
                            fontSize: 15
                        }}>Balance: 0 DAI</label>
                    </div>

                    <div style={{

                        borderWidth: 1,
                        borderStyle: 'solid',
                        padding: 5,
                        borderRadius: 5,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'

                    }}>


                        <div>

                            <label style={{
                                marginLeft: 5,
                                fontWeight: 'bold'
                            }}></label>

                        </div>

                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10, marginBottom: 10 }}>

                    </div>

                </Card>
            </Col> */}
        </Col>
    )
}

export default Swap