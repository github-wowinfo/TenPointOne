import React, { useState } from 'react'
import Icon from 'react-crypto-icons'
import { Button, Card, Col, DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Input, Label, UncontrolledButtonDropdown } from 'reactstrap'
import { RiSwapFill } from 'react-icons/ri'

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

    return (
        <>
            <div className='row' style={{ marginTop: 20, flex: 1, justifyContent: 'center' }}>

                <Col md='4'>
                    <Card className='p-1'>
                        <div style={{
                            display: 'flex',
                            flex: 1,
                            justifyContent: 'space-between'
                        }}>
                            <h6 style={{ marginTop: 10 }}>Pay With</h6>
                            <label style={{
                                marginTop: 10,
                                fontWeight: 'bold',
                                fontSize: 10,
                                color: 'red'
                            }}>Balance: 0.503768158 ETH</label>
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

                                <label style={{
                                    marginLeft: 5,
                                    fontWeight: 'bold'
                                }}>~$4,247.15</label>

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
                            <h6 style={{ marginTop: 10 }}>Receive</h6>
                            <label style={{
                                marginTop: 10,
                                fontWeight: 'bold',
                                fontSize: 10
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

                                <label style={{
                                    marginLeft: 5,
                                    fontWeight: 'bold'
                                }}>~$4,229.02</label>

                            </div>

                        </div>


                        <FormGroup className='mt-2'>
                            <Label for='basicInput'>Description (optional)</Label>
                            <Input type='text' id='basicInput' placeholder='Enter Description' />
                        </FormGroup>

                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10, marginBottom: 10 }}>
                            <Button.Ripple color='primary'>Swap</Button.Ripple>
                        </div>

                    </Card>
                </Col>
            </div>
        </>
    )
}

export default Swap