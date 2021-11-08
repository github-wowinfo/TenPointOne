import {DropdownToggle, DropdownItem, DropdownMenu, ButtonDropdown, UncontrolledButtonDropdown, Button, Row, Col} from "reactstrap"
import {IoQrCodeOutline} from 'react-icons/io5'
import {FaRegCopy} from 'react-icons/fa'
import {GoLinkExternal} from 'react-icons/go'
import {BsSafe2} from 'react-icons/bs'
import { PlusCircle } from "react-feather"
import Avatar from '@components/avatar'

const OwnerDisplay = () => {
  const stylecontainer = {
    textAlign: 'center'
  }
  return (
    <div style={stylecontainer}>    
      <Row className='d-flex flex-column'>
        <Col className='my-1'>
          <Button.Ripple outline color='primary' disabled>
          <span className='align-middle ml-25'>Polygon Network</span>
          </Button.Ripple>
        </Col>
        <Col>
        <Avatar size='xl' color='light-danger' icon={<BsSafe2 size={25}/>} />
        </Col>
        <Col>
          <UncontrolledButtonDropdown  style={{minWidth: "90%"}}>      
            <DropdownToggle   size="lg" className='dropdown-toggle-split my-1' color='primary' outline caret>
              SBI Vault
            </DropdownToggle>
            <DropdownMenu right >
              <DropdownItem href='/manager' tag='a'><PlusCircle className='mr-1' size={25}/>Add Vault or Sega</DropdownItem>
              <DropdownItem href='#' tag='a'>
                Option 2
              </DropdownItem>
              <DropdownItem href='#' tag='a'>Option 3</DropdownItem>
            </DropdownMenu>
          </UncontrolledButtonDropdown>
          <UncontrolledButtonDropdown style={{minWidth: "90%"}}>      
            <DropdownToggle   size="lg" className='dropdown-toggle-split mb-1' color='primary' outline caret>
              Quick Actions
            </DropdownToggle>
            <DropdownMenu right >
              <DropdownItem href='#' tag='a'>
                <h3>SBI Vault</h3>
                <h6 style={{color: '#D0CAB2'}}>n1n6.....Wu5</h6>
              </DropdownItem>
              <DropdownItem divider></DropdownItem>
              <DropdownItem style={{display: 'flex', justifyContent: 'space-between'}} href='#' tag='a'>
                <IoQrCodeOutline  size={25}/>
                <FaRegCopy  size={25}/>
                <GoLinkExternal size={25}/>
              </DropdownItem>
              <DropdownItem divider></DropdownItem>
              <DropdownItem href='/send' tag='a'>
                <Button.Ripple color='primary' style={{width: '120px'}}>SEND</Button.Ripple>
              </DropdownItem>
              <DropdownItem divider></DropdownItem>
              <DropdownItem href='/receive' tag='a'>
                <Button.Ripple color='primary' style={{width: '120px'}}>RECEIVE</Button.Ripple>
              </DropdownItem>
              <DropdownItem divider></DropdownItem>
              <DropdownItem href='/manager' tag='a'>
                <Button.Ripple color='primary' style={{width: '120px'}}>MANAGE</Button.Ripple>
              </DropdownItem>
              <DropdownItem divider></DropdownItem>
            </DropdownMenu>
        </UncontrolledButtonDropdown>
        </Col>
      </Row>
    </div>
  )
}

export default OwnerDisplay