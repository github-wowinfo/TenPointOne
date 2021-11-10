import React, { useState, useContext } from 'react'
import ReactCountryFlag from 'react-country-flag'
import { UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Col, Input, UncontrolledButtonDropdown, Button } from 'reactstrap'
import { IntlContext } from '@src/utility/context/Internationalization'
import Icon from 'react-crypto-icons'

const SellBTC = () => {

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

    return (
        <>

            <h6 style={{ marginTop: 10 }}>YOU SPENG</h6>
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
                            <span className='ml-1'>USD</span>
                        </DropdownItem>
                        <DropdownItem href='/' tag='a' onClick={e => handleLangUpdate(e, 'fr')}>
                            <ReactCountryFlag className='country-flag' countryCode='fr' svg />
                            <span className='ml-1'>EURO</span>
                        </DropdownItem>
                        <DropdownItem href='/' tag='a' onClick={e => handleLangUpdate(e, 'in')}>
                            <ReactCountryFlag className='country-flag' countryCode='in' svg />
                            <span className='ml-1'>INR</span>
                        </DropdownItem>

                    </DropdownMenu>
                </UncontrolledButtonDropdown>

            </div>

            <h6 style={{ marginTop: 20 }}>YOU GET (ROUGH EXTIMATE)</h6>
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

            </div>

            <h6 style={{ marginTop: 10, textAlign: 'end' }}>1 ETH = 4432.04 USD</h6>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10, marginBottom: 10 }}>
                <Button.Ripple color='primary'>Sell</Button.Ripple>
            </div>
        </>
    )
}

export default SellBTC