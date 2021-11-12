import { DropdownToggle, DropdownItem, DropdownMenu, ButtonDropdown, UncontrolledButtonDropdown, Button, Row, Col } from "reactstrap"
import { IoQrCodeOutline } from 'react-icons/io5'
import { SiWebmoney, SiGithubactions } from "react-icons/si"
import { FaRegCopy } from 'react-icons/fa'
import { GoLinkExternal } from 'react-icons/go'
import { BsSafe2 } from 'react-icons/bs'
import { PlusCircle } from "react-feather"
import { randomHexColor } from 'random-hex-color-generator'
import Avatar from '@components/avatar'
import { Link } from "react-router-dom"

const OwnerDisplay = () => {
  const stylecontainer = {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
  }
  const networkstyle = {
    backgroundColor: 'blue',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '2em',
    color: 'white',
    fontSize: '1.5em'
  }
  return (
    <Row style={stylecontainer}>
      <Col>
        <Col style={networkstyle} className='my-1'>
          Polygon Network
        </Col>
        <Link to='/home'>
          <Avatar size='xl' color='light-danger' title='SBI Vault' icon={<BsSafe2 size={25} />} href='/home' />
        </Link>
      </Col>
      <Col>
        <UncontrolledButtonDropdown style={{ minWidth: "90%" }} direction='right'>
          <DropdownToggle size="lg" className='dropdown-toggle-split my-1' color='primary' outline caret>
            SBI Vault
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem href='/manager' tag='a'><PlusCircle className='mr-1' size={25} />Add Vault or Sega</DropdownItem>
            <DropdownItem href='#' tag='a'>
              <Row className='d-flex flex-row justify-content-between flex-nowrap mb-1'>
                <Col className='d-flex flex-row'>
                  <BsSafe2 style={{ color: randomHexColor() }} size={20} />
                  <Col className='d-flex flex-column'>HDFC Vault <sub>mxt3AjNu1ddQH3vgghfk7VaSLcbfnpMf5p</sub></Col>
                </Col>
                <Col>0 MATIC</Col>
              </Row>
              <DropdownItem>
                <Row className='d-flex flex-row justify-content-between flex-nowrap mb-1'>
                  <Col className='d-flex flex-row'>
                    <SiWebmoney style={{ color: randomHexColor() }} size={20} />
                    <Col className='d-flex flex-column'>HDFC Fixed <sub>mpTdJWDkGhxvBxNVaFaC4M43K5SrUStFED</sub></Col>
                  </Col>
                  <Col>0 MATIC</Col>
                </Row>
              </DropdownItem>
              <DropdownItem>
                <Row className='d-flex flex-row justify-content-between flex-nowrap mb-1'>
                  <Col className='d-flex flex-row'>
                    <SiWebmoney style={{ color: randomHexColor() }} size={20} />
                    <Col className='d-flex flex-column'>HDFC Savings <sub>muV7tYEeEsw6K1XGGtfVXVsfRkkSYXbavB</sub></Col>
                  </Col>
                  <Col>0 MATIC</Col>
                </Row>
              </DropdownItem>
            </DropdownItem>
            <DropdownItem href='#' tag='a'>
              <Row className='d-flex flex-row justify-content-between flex-nowrap mb-1'>
                <Col className='d-flex flex-row'>
                  <BsSafe2 style={{ color: randomHexColor() }} size={20} />
                  <Col className='d-flex flex-column'>SBI Vault <sub>miMMmeXPLjEwz9Ycx4RPSFrQm9k7DbRXhT</sub></Col>
                </Col>
                <Col>0 MATIC</Col>
              </Row>
              <DropdownItem>
                <Row className='d-flex flex-row justify-content-between flex-nowrap mb-1'>
                  <Col className='d-flex flex-row'>
                    <SiWebmoney style={{ color: randomHexColor() }} size={20} />
                    <Col className='d-flex flex-column'>SBI Checking <sub>muV7tYEeEsw6K1XGGtfVXVsfRkkSYXbavB</sub></Col>
                  </Col>
                  <Col>0 MATIC</Col>
                </Row>
              </DropdownItem>
            </DropdownItem>
            <DropdownItem href='#' tag='a'>
              <Row className='d-flex flex-row justify-content-between flex-nowrap mb-1'>
                <Col className='d-flex flex-row'>
                  <BsSafe2 style={{ color: randomHexColor() }} size={20} />
                  <Col className='d-flex flex-column'>ICICI Vault <sub>mxCuUj9nwZW5jW4XRYgRzGSM9SHzwysS5g</sub></Col>
                </Col>
                <Col>0 MATIC</Col>
              </Row>
              <DropdownItem>
                <Row className='d-flex flex-row justify-content-between flex-nowrap mb-1'>
                  <Col className='d-flex flex-row'>
                    <SiWebmoney style={{ color: randomHexColor() }} size={20} />
                    <Col className='d-flex flex-column'>ICICI Savings <sub>mn6xBdNukvvTCux9qenZRcbvFBWmW5hESM</sub></Col>
                  </Col>
                  <Col>0 MATIC</Col>
                </Row>
              </DropdownItem>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledButtonDropdown>
        <UncontrolledButtonDropdown style={{ minWidth: "90%" }}>
          <DropdownToggle size="lg" className='dropdown-toggle-split mb-1' color='primary' outline caret>
            Quick Actions
          </DropdownToggle>
          <DropdownMenu style={{ width: '15em' }} left >
            <DropdownItem href='#' tag='a'>
              <h3>SBI Vault</h3>
              <h6 style={{ color: '#D0CAB2' }}>n1n6.....Wu5</h6>
            </DropdownItem>
            <DropdownItem divider></DropdownItem>
            <DropdownItem style={{ display: 'flex', justifyContent: 'space-between' }} href='#' tag='a'>
              <IoQrCodeOutline size={25} />
              <FaRegCopy size={25} />
              <GoLinkExternal size={25} />
            </DropdownItem>
            <DropdownItem divider></DropdownItem>
            <DropdownItem className='text-center' tag='a'>
              <Button.Ripple href='/send' color='primary' style={{ width: '120px' }}>SEND</Button.Ripple>
            </DropdownItem>
            <DropdownItem divider></DropdownItem>
            <DropdownItem className='text-center' tag='a'>
              <Button.Ripple href='/receive' color='primary' style={{ width: '120px' }}>RECEIVE</Button.Ripple>
            </DropdownItem>
            <DropdownItem divider></DropdownItem>
            <DropdownItem className='text-center' href='/manager' tag='a'>
              <Button.Ripple href='/manager' color='primary' style={{ width: '120px' }}>MANAGE</Button.Ripple>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledButtonDropdown>
      </Col>
    </Row>
  )
}

export default OwnerDisplay