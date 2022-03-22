import React, { useState, useContext } from 'react'
import ReactCountryFlag from 'react-country-flag'
import { UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Col, Input, UncontrolledButtonDropdown, Button, Card, CardHeader, CardTitle, CardFooter, CardBody, Form, FormGroup, Row, Label, InputGroup, InputGroupAddon } from 'reactstrap'
import { IntlContext } from '@src/utility/context/Internationalization'
import Icon from 'react-crypto-icons'

const BuyCrypto = () => {

    const [selected, setSelected] = useState('en')
    const [selectCrypto, setSelectCrypto] = useState('eth')
    const langObj = {
        en: 'USD',
        fr: 'EURO',
        in: 'INR',
    }

    const cryptoObj = {
        eth: 'ETH',
        uni: 'UNI',
        dai: 'DAI',
    }

    const handleLangUpdate = (e, lang) => {
        e.preventDefault()
        setSelected(lang)
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
                {/* <CardHeader className='py-1 heading`'>
                    <CardTitle>Buy</CardTitle>
                </CardHeader> */}
                <CardBody>
                    <Form className='form mt-2' onSubmit={e => e.preventDefault()}>
                        <Row className='d-flex flex-column justify-content-center'>
                            <Col>
                                <FormGroup>
                                    <Label for='you_spend' style={{ fontSize: '1.2em' }}>You Spend</Label>
                                    <InputGroup>
                                        <Input type='text' id='you_spend' placeholder='600' />
                                        <InputGroupAddon addonType='append'>
                                            <UncontrolledButtonDropdown>
                                                <DropdownToggle outline color='primary' caret>
                                                    <ReactCountryFlag
                                                        className='country-flag flag-icon'
                                                        countryCode={selected === 'en' ? 'us' : selected}
                                                        svg
                                                    />
                                                    <span className='selected-language ml-1'>{langObj[selected]}</span>
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    <DropdownItem href='/' tag='a' onClick={e => handleLangUpdate(e, 'en')}>
                                                        <ReactCountryFlag className='country-flag' countryCode='us' svg />
                                                        <span className='mx-1'>USD</span>
                                                    </DropdownItem>
                                                    <DropdownItem href='/' tag='a' onClick={e => handleLangUpdate(e, 'fr')}>
                                                        <ReactCountryFlag className='country-flag' countryCode='fr' svg />
                                                        <span className='mx-1'>EURO</span>
                                                    </DropdownItem>
                                                    <DropdownItem href='/' tag='a' onClick={e => handleLangUpdate(e, 'in')}>
                                                        <ReactCountryFlag className='country-flag' countryCode='in' svg />
                                                        <span className='mx-1'>INR</span>
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledButtonDropdown>
                                            {/* <Button color='primary' outline>
                                                Modify
                                            </Button> */}
                                        </InputGroupAddon>
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label for='you_get' style={{ fontSize: '1.2em' }}>You Get</Label>
                                    <InputGroup>
                                        <Input type='text' id='you_get' placeholder='~ 0.13537784' />
                                        <InputGroupAddon addonType='append'>
                                            <UncontrolledButtonDropdown>
                                                <DropdownToggle outline color='primary' caret>
                                                    <Icon name={selectCrypto === 'eth' ? 'eth' : selectCrypto} size={15} />
                                                    <span className='selected-language ml-1'>{cryptoObj[selectCrypto]}</span>
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    <DropdownItem href='/' tag='a' onClick={e => handleCryptoUpdate(e, 'eth')}>
                                                        <Icon name='eth' size={15} />
                                                        <span className='mx-1'>ETH</span>
                                                    </DropdownItem>
                                                    <DropdownItem href='/' tag='a' onClick={e => handleCryptoUpdate(e, 'uni')}>
                                                        <Icon name='uni' size={15} />
                                                        <span className='mx-1'>UNI</span>
                                                    </DropdownItem>
                                                    <DropdownItem href='/' tag='a' onClick={e => handleCryptoUpdate(e, 'dai')}>
                                                        <Icon name='dai' size={15} />
                                                        <span className='mx-1'>DAI</span>
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledButtonDropdown>
                                            {/* <Button color='primary' outline>
                                                Modify
                                            </Button> */}
                                        </InputGroupAddon>
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                            <Col className='text-right'>
                                <h6 className='mb-0'>1 ETH = 4432.04 USD</h6>
                            </Col>
                        </Row>
                    </Form>

                    {/* <h6 style={{ marginTop: 10 }}>YOU SPEND</h6>
                    <div style={{

                        borderWidth: 1,
                        borderStyle: 'solid',
                        padding: 5,
                        borderRadius: 5,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'

                    }}>
                        <h4>600</h4>
                    </div>

                    <h6 style={{ marginTop: 20 }}>YOU GET (ROUGH ESTIMATE)</h6>
                    <div style={{

                        borderWidth: 1,
                        borderStyle: 'solid',
                        padding: 5,
                        borderRadius: 5,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'

                    }}>
                        <h4>~ 0.13537784</h4>

                    </div>
 */}

                </CardBody>

                <CardFooter className='d-flex flex-column justify-content-center'>
                    <div className='text-center' >
                        <Button.Ripple color='primary'>Buy</Button.Ripple>
                    </div>
                </CardFooter>
            </Card>
        </Col>
    )
}

export default BuyCrypto