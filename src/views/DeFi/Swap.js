import React, { useEffect, useState } from 'react'
import Icon from 'react-crypto-icons'
import { Button, Card, CardBody, CardFooter, CardText, CardTitle, Col, DropdownItem, DropdownMenu, DropdownToggle, Form, FormGroup, Input, InputGroup, InputGroupAddon, Label, Row, UncontrolledButtonDropdown } from 'reactstrap'
import { RiSwapFill } from 'react-icons/ri'
import ReactCountryFlag from 'react-country-flag'
import { connect } from 'react-redux'
import { getExplorerAddressLink, shortenIfAddress, useEthers } from '@usedapp/core'
import { FaRegCopy } from 'react-icons/fa'
import { GoLinkExternal } from 'react-icons/go'
import { GiCircleCage, GiHobbitDoor, GiShipWheel } from 'react-icons/gi'
import { BsArrowDown } from 'react-icons/bs'
import Avatar from '@components/avatar'
import helperConfig from '../../helper-config.json'
import { toast } from 'react-toastify'
import { Clipboard } from 'react-feather'

const Swap = ({ globalAdrs, globalNickName }) => {
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
                    <Row className='mt-1 d-flex flex-row'>
                        <Col xs='1' sm='1' md='1' className='mx-1'><BsArrowDown size={30} /></Col>
                        <Col>
                            <hr />
                        </Col>
                    </Row>
                    <Form className='form mt-2' onSubmit={e => e.preventDefault()}>
                        <Row className='d-flex flex-column justify-content-center'>
                            <Col>
                                <FormGroup>
                                    <div className='d-flex flex-row justify-content-between'>
                                        <Label for='pay_with' style={{ fontSize: '1.2em' }}>Pay With</Label>
                                        <Label style={{ fontSize: '1.2em' }}>Balance: 0.503768158 ETH</Label>
                                        {/* <span style={{ color: 'red', fontWeight: 'bold', paddingTop: '0.2em' }}>Balance: 0.503768158 ETH</span> */}
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
                                        <Input className='text-right' type='text' id='pay_with' value='~$4,247.15' placeholder='~$4,247.15' />
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
                                        <Input className='text-right' type='text' id='pay_with' value='~$4,229.02' placeholder='~$4,229.02' />
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

// export default Swap
const mapStateToProps = (state) => ({
    globalAdrs: state.appData.globalAdrs,
    globalNickName: state.appData.globalNickName,
    globalVaultFlag: state.appData.globalVaultFlag
})
const mapDispatchToProp = dispatch => ({ dispatch })
export default connect(mapStateToProps, mapDispatchToProp)(Swap)