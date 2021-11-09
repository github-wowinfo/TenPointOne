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
    display: 'flex'
  }
  return (
    <div style={stylecontainer}>
      <Row style={{ flexShrink: 1, flexGrow: 1 }} className='d-flex flex-column'>
        <Col className='my-1'>
          <Button.Ripple size='lg' outline color='success' disabled>
            <span className='align-middle '>Polygon Network</span>
          </Button.Ripple>
        </Col>
        <Col>
          <Link to='/home'>
            <Avatar size='xl' color='light-danger' title='SBI Vault' icon={<BsSafe2 size={25} />} href='/home' />
          </Link>
        </Col>
        <Col>
          <UncontrolledButtonDropdown style={{ minWidth: "90%" }}>
            <DropdownToggle size="lg" className='dropdown-toggle-split my-1' color='primary' outline caret>
              SBI Vault
            </DropdownToggle>
            <DropdownMenu left  >
              <DropdownItem href='/manager' tag='a'><PlusCircle className='mr-1' size={25} />Add Vault or Sega</DropdownItem>
              <DropdownItem href='#' tag='a'> <BsSafe2 style={{ color: randomHexColor() }} size={20} className='mr-1' />HDFC Vault - 0 MATIC
                <DropdownItem><SiWebmoney style={{ color: randomHexColor() }} size={20} className='mr-1' />HDFC Fixed - 0 MATIC</DropdownItem>
                <DropdownItem><SiWebmoney style={{ color: randomHexColor() }} size={20} className='mr-1' />HDFC Savings - 0 MATIC</DropdownItem>
              </DropdownItem>
              <DropdownItem href='#' tag='a'><BsSafe2 style={{ color: randomHexColor() }} size={20} className='mr-1' />SBI Vault - 0 MATIC
                <DropdownItem><SiWebmoney style={{ color: randomHexColor() }} size={20} className='mr-1' />SBI Checking - 0 MATIC</DropdownItem>
              </DropdownItem>
              <DropdownItem href='#' tag='a'><BsSafe2 style={{ color: randomHexColor() }} size={20} className='mr-1' />ICICI Vault - 0 MATIC
                <DropdownItem><SiWebmoney style={{ color: randomHexColor() }} size={20} className='mr-1' />ICICI Savings - 0 MATIC</DropdownItem>
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
              <DropdownItem className='text-center' href='/send' tag='a'>
                <Button.Ripple color='primary' style={{ width: '120px' }}>SEND</Button.Ripple>
              </DropdownItem>
              <DropdownItem divider></DropdownItem>
              <DropdownItem className='text-center' href='/receive' tag='a'>
                <Button.Ripple color='primary' style={{ width: '120px' }}>RECEIVE</Button.Ripple>
              </DropdownItem>
              <DropdownItem divider></DropdownItem>
              <DropdownItem className='text-center' href='/manager' tag='a'>
                <Button.Ripple color='primary' style={{ width: '120px' }}>MANAGE</Button.Ripple>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledButtonDropdown>
        </Col>
      </Row>
    </div>
  )
}

export default OwnerDisplay