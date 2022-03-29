import React, { useState, useContext, useEffect, Fragment } from 'react'
import ReactCountryFlag from 'react-country-flag'
import { UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Col, Input, UncontrolledButtonDropdown, Button, Card, CardHeader, CardTitle, CardFooter, CardBody, Form, FormGroup, Row, Label, InputGroup, InputGroupAddon, CardText } from 'reactstrap'
import { IntlContext } from '@src/utility/context/Internationalization'
import Icon from 'react-crypto-icons'
import { connect } from 'react-redux'
import { getExplorerAddressLink, shortenIfAddress, useEthers } from '@usedapp/core'
import { FaRegCopy } from 'react-icons/fa'
import { GoLinkExternal } from 'react-icons/go'
import { GiCircleCage, GiHobbitDoor, GiShipWheel } from 'react-icons/gi'
import Avatar from '@components/avatar'
import helperConfig from '../../helper-config.json'
import { toast } from 'react-toastify'
import { Clipboard } from 'react-feather'

const BuyCrypto = ({ globalAdrs, globalNickName }) => {

    const { account, chainId } = useEthers()

    const notifySuccess = () => toast.success(<SuccessToast />, { hideProgressBar: false })
    const copy = async () => {
        // let text
        // if (navigator.clipboard) {
        //   text = await navigator.clipboard.writeText(globalAdrs)
        //   notifySuccess()
        // } else {
        //   text = window.clipboardData.setData('text/plain')
        // }
        // console.log('Got pasted text: ', text)

        const textField = document.createElement('textarea')
        textField.innerText = globalAdrs
        document.body.appendChild(textField)
        textField.select()
        document.execCommand('copy')
        textField.remove()
        notifySuccess()
    }

    const SuccessToast = () => (
        <Fragment>
            <div className='toastify-header'>
                <div className='title-wrapper'>
                    <Avatar size='md' color='success' icon={<Clipboard size={12} />} />
                    <h3 className='toast-title'>Copied to Clipboard!</h3>
                </div>
            </div>
        </Fragment>
    )

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

    const [is_sega, setis_sega] = useState()
    const [segaList, setSegaList] = useState([])
    const getSegaListFromLocal = () => {
        const getdata = JSON.parse(localStorage.getItem('segadata'))
        const valueData = getdata && getdata.filter(a => a.show === true && a.network === chainId && a.owner === account)
        const segalist = valueData && valueData.map((sega, index) => ({ value: index, adrs: sega.address, name: sega.name, ofvault: sega.vault }))
        setSegaList(segalist)
    }

    useEffect(() => {
        getSegaListFromLocal()
        const segaadrs = segaList && segaList.find(i => i.adrs === globalAdrs)
        // console.log('segaadrs', segaadrs)
        if (segaadrs === undefined) {
            setis_sega(false)
        } else {
            setis_sega(true)
        }
    }, [globalAdrs, account, chainId, is_sega])

    const cardStyle = {
        display: 'flex',
        justifyContent: 'center',
        alighnItems: 'center'
    }

    const style_no_vault = {
        minWidth: '30vw',
        minHeight: '55vh'
    }
    const logos = [
        {
            // icon: <BsSafe2 size={25} />,
            icon: <GiShipWheel size={25} />,
            color: 'primary'
        },
        {

            icon: <GiCircleCage size={25} />,
            color: 'primary'
        }
    ]

    const networkIcon = chainId ? helperConfig.network[chainId].icon : "Not Connected"
    const networkName = chainId ? helperConfig.network[chainId].name : "Not Connected"
    const backgroundChange = { backgroundColor: networkName === "BSC Testnet" ? '#cc9b00' : networkName === "Polygon" ? '#8146e4' : networkName === "Ethereum" ? '#4559f4' : networkName === "Kovan" ? '#6435c9' : networkName === "BSC Mainet" ? '#cc9b00' : networkName === "Polygon Mumbai" ? '#140035' : null }


    return (
        <Col style={cardStyle} md={{ offset: 3, size: 6 }} lg={{ offset: 3, size: 6 }} sm="12">
            <Card style={style_no_vault} className='m-1 card-payment'>
                {/* <CardHeader className='py-1 heading`'>
                    <CardTitle>Buy</CardTitle>
                </CardHeader> */}
                <CardBody className='pt-0 px-1 pb-1'>
                    <Row>
                        <Col className='py-1' style={{ ...backgroundChange, textAlign: 'center', height: '100%' }}>
                            <CardText style={{ color: 'white' }}><Icon className='mr-1' name={networkIcon} size={20} />Only send to {networkName} address</CardText>
                        </Col>
                    </Row>
                    <Row className='d-flex flex-column'>
                        <Col className='d-flex flex-column flex-sm-row pt-1 justify-content-evenly align-items-center'>
                            {is_sega ? (
                                <Avatar className='m-1' size='lg' color={logos[1].color} icon={logos[1].icon} />
                            ) : (
                                <Avatar className='m-1' size='lg' color={logos[0].color} icon={logos[0].icon} />
                            )}
                            <Col className='px-0 d-flex flex-column justify-content-start'>
                                <CardTitle style={{ fontSize: '1.5rem' }} className='mt-1 mb-0'>{globalNickName}</CardTitle>
                                <h6 className='font-weight-bold'>{shortenIfAddress(globalAdrs)}</h6>
                            </Col>
                            {/* <Col className='d-flex flex-row justify-content-end'>
                                <FaRegCopy style={{ cursor: 'pointer' }} className='mx-1' size={25} onClick={copy} />
                                <a href={getExplorerAddressLink(globalAdrs, chainId)} target='_blank'><GoLinkExternal size={25} /></a>
                            </Col> */}
                        </Col>
                    </Row>
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

// export default BuyCrypto
const mapStateToProps = (state) => ({
    globalAdrs: state.appData.globalAdrs,
    globalNickName: state.appData.globalNickName,
    globalVaultFlag: state.appData.globalVaultFlag
})
const mapDispatchToProp = dispatch => ({ dispatch })
export default connect(mapStateToProps, mapDispatchToProp)(BuyCrypto)