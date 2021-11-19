import { DropdownToggle, DropdownItem, DropdownMenu, ButtonDropdown, UncontrolledButtonDropdown, Button, Row, Col } from "reactstrap"
import { Link } from 'react-router-dom'
import { IoQrCodeOutline } from 'react-icons/io5'
import { SiWebmoney, SiGithubactions } from "react-icons/si"
import { FaRegCopy } from 'react-icons/fa'
import { GoLinkExternal } from 'react-icons/go'
import { BsSafe2 } from 'react-icons/bs'
import { BiChevronDown } from 'react-icons/bi'
import { PlusCircle, Clipboard } from "react-feather"
import { randomHexColor } from 'random-hex-color-generator'
import { toast } from 'react-toastify'
import Avatar from '@components/avatar'
import { connect } from 'react-redux'
import { Fragment } from 'react'
import Icon from 'react-crypto-icons'

const OwnerDisplay = ({ menuCollapsed, menuHover, networkC }) => {

  const stylecontainer = {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    margin: ' 0px 1rem'
  }
  const networkstyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '2em',
    color: 'white',
    fontSize: '1.5em'
  }
  const backgroundChange = { backgroundColor: networkC.name === 'BSC Mainet' ? '#cc9b00' : networkC.name === 'Etherum' ? '#627eea' : networkC.name === 'Optimism' ? '#ff0420' : networkC.name === 'Arbitrum' ? '#2d374b' : '#8247e5' }
  const SuccessToast = () => (
    <Fragment>
      <div className='toastify-header'>
        <div className='title-wrapper'>
          <Avatar size='sm' color='success' icon={<Clipboard size={12} />} />
          <h6 className='toast-title'>Copied to Clipboard!</h6>
        </div>
      </div>
    </Fragment>
  )

  const notifySuccess = () => toast.success(<SuccessToast />, { hideProgressBar: true })

  const renderItem = () => {
    return (
      <>
        <Col style={{ padding: '0px 0px' }}>
          <Col style={{ ...networkstyle, ...backgroundChange, fontSize: '1.2em', marginBottom: '0px' }} className='my-1 d-flex flex-row flex-nowrap align-self-center '>
            <Icon className='mr-1' name={networkC.icon} size={20} />{networkC.name}
          </Col>
          <Link to='/home'>
            <Avatar size='xl' color='light-danger' title='SBI Vault' icon={<BsSafe2 size={25} />} href='/home' />
          </Link>
        </Col>

        <Col style={{ padding: '0px 0px' }}>
          <UncontrolledButtonDropdown style={{ minWidth: "90%" }} direction='right'>
            <DropdownToggle size="lg" className='my-1' color='primary' outline caret>
              SBI Vault
            </DropdownToggle>
            <DropdownMenu >
              <Link to='/manager'>
                <DropdownItem tag='a' ><PlusCircle className='mr-1' size={25} />Add Vault or Sega</DropdownItem>
              </Link>
              <DropdownItem href='#' tag='a' >
                <Row className='d-flex flex-row justify-content-between flex-nowrap ' >
                  <Col className='d-flex flex-row'>
                    <BsSafe2 style={{ color: randomHexColor() }} size={20} />
                    <Col>
                      <dl>
                        <dt>HDFC Vault</dt> <dd>mxt3AjNu1ddQH3vgghfk7VaSLcbfnpMf5p</dd>
                      </dl></Col>
                  </Col>
                  <Col className='text-right'>0 MATIC</Col>
                </Row>
                <DropdownItem>
                  <Row className='d-flex flex-row justify-content-between flex-nowrap '>
                    <Col className='d-flex flex-row'>
                      <SiWebmoney style={{ color: randomHexColor() }} size={20} />
                      <Col><dl><dt>HDFC Fixed</dt> <dd>mpTdJWDkGhxvBxNVaFaC4M43K5SrUStFED</dd></dl></Col>
                    </Col>
                    <Col className='text-right'>0 MATIC</Col>
                  </Row>
                </DropdownItem>
                <DropdownItem>
                  <Row className='d-flex flex-row justify-content-between flex-nowrap '>
                    <Col className='d-flex flex-row'>
                      <SiWebmoney style={{ color: randomHexColor() }} size={20} />
                      <Col><dl><dt>HDFC Savings</dt> <dd>muV7tYEeEsw6K1XGGtfVXVsfRkkSYXbavB</dd></dl></Col>
                    </Col>
                    <Col className='text-right'>0 MATIC</Col>
                  </Row>
                </DropdownItem>
              </DropdownItem>
              <DropdownItem href='#' tag='a'>
                <Row className='d-flex flex-row justify-content-between flex-nowrap '>
                  <Col className='d-flex flex-row'>
                    <BsSafe2 style={{ color: randomHexColor() }} size={20} />
                    <Col><dl><dt>SBI Vault</dt> <dd>miMMmeXPLjEwz9Ycx4RPSFrQm9k7DbRXhT</dd></dl></Col>
                  </Col>
                  <Col className='text-right'>0 MATIC</Col>
                </Row>
                <DropdownItem>
                  <Row className='d-flex flex-row justify-content-between flex-nowrap '>
                    <Col className='d-flex flex-row'>
                      <SiWebmoney style={{ color: randomHexColor() }} size={20} />
                      <Col><dl><dt>SBI Checking</dt> <dd>muV7tYEeEsw6K1XGGtfVXVsfRkkSYXbavB</dd></dl></Col>
                    </Col>
                    <Col className='text-right'>0 MATIC</Col>
                  </Row>
                </DropdownItem>
              </DropdownItem>
              <DropdownItem href='#' tag='a'>
                <Row className='d-flex flex-row justify-content-between flex-nowrap '>
                  <Col className='d-flex flex-row'>
                    <BsSafe2 style={{ color: randomHexColor() }} size={20} />
                    <Col><dl><dt>ICICI Vault</dt> <dd>mxCuUj9nwZW5jW4XRYgRzGSM9SHzwysS5g</dd></dl></Col>
                  </Col>
                  <Col className='text-right'>0 MATIC</Col>
                </Row>
                <DropdownItem>
                  <Row className='d-flex flex-row justify-content-between flex-nowrap '>
                    <Col className='d-flex flex-row'>
                      <SiWebmoney style={{ color: randomHexColor() }} size={20} />
                      <Col><dl><dt>ICICI Savings</dt> <dd>mn6xBdNukvvTCux9qenZRcbvFBWmW5hESM</dd></dl></Col>
                    </Col>
                    <Col className='text-right'>0 MATIC</Col>
                  </Row>
                </DropdownItem>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledButtonDropdown>
          <UncontrolledButtonDropdown style={{ minWidth: "90%" }}>
            <DropdownToggle size="lg" className='mb-1' color='primary' outline caret>
              Quick Actions
            </DropdownToggle>
            <DropdownMenu style={{ minWidth: '200px' }} >
              <DropdownItem className='px-1' style={{ overflow: 'auto' }}>
                <dl>
                  <dt>SBI Vault</dt>
                  <dd>moG7...mgbj</dd>
                </dl>
              </DropdownItem>
              <DropdownItem divider></DropdownItem>
              <DropdownItem style={{ display: 'flex', justifyContent: 'space-between' }} href='#'>
                <IoQrCodeOutline size={25} />
                <FaRegCopy size={25} onClick={notifySuccess} />
                <GoLinkExternal size={25} />
              </DropdownItem>
              <DropdownItem divider></DropdownItem>
              <DropdownItem className='text-center py-0' tag='a'>
                <Link to='/send'>
                  <Button.Ripple color='primary' style={{ minWidth: '120px' }}>SEND</Button.Ripple>
                </Link>
                {/* <Link to='/send'>SEND</Link> */}
              </DropdownItem>
              <DropdownItem divider></DropdownItem>
              <DropdownItem className='text-center py-0' tag='a'>
                <Link to='/receive'>
                  <Button.Ripple color='primary' style={{ minWidth: '120px' }}>RECEIVE</Button.Ripple>
                </Link>
                {/* <Link to='/receive'>RECEIVE</Link> */}
              </DropdownItem>
              <DropdownItem divider></DropdownItem>
              <DropdownItem className='text-center py-0' href='/manager' tag='a'>
                <Link to='/manager'>
                  <Button.Ripple color='primary' style={{ minWidth: '120px' }}>MANAGE</Button.Ripple>
                </Link>
                {/* <Link to='/manager'>MANAGE</Link> */}
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledButtonDropdown>
        </Col>

      </>
    )
  }

  const renderItemCollapse = () => {
    return (
      <>
        <Col className='my-1 align-self-center' style={{ ...backgroundChange, minHeight: '3em' }} >
          <Icon className='mt-1' name={networkC.icon} size={20} />
        </Col>
        <Col className='my-1 pl-0'>
          <Avatar size='lg' color='light-danger' title='SBI Vault' icon={<BsSafe2 size={25} />} href='/home' />
        </Col>
        <Col className='my-1 px-0'>
          <Button.Ripple style={{ width: '35px', padding: ' 10px 6px' }} color='primary'>SBI</Button.Ripple>
        </Col>
        <Col className='my-1 px-0'>
          <Button.Ripple style={{ width: '35px', padding: ' 8px 6px' }} color='primary'><BiChevronDown size={20} /></Button.Ripple>
        </Col>
      </>
    )
  }

  return (
    <>
      <Row style={stylecontainer}>
        {
          menuCollapsed ? menuHover ? renderItem() : renderItemCollapse() : renderItem()
        }
      </Row>
    </>
  )
}


const mapStateToProps = (state) => ({
  networkC: state.appData.network
})
export default connect(mapStateToProps, null)(OwnerDisplay)