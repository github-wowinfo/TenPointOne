import {DropdownToggle, DropdownItem, DropdownMenu, ButtonDropdown, UncontrolledButtonDropdown, Button} from "reactstrap"
import {IoQrCodeOutline} from 'react-icons/io5'
import {FaRegCopy} from 'react-icons/fa'
import {GoLinkExternal} from 'react-icons/go'
const OwnerDisplay = () => {
  const stylecontainer = {
    textAlign: 'center'
  }
  return (
    <div style={stylecontainer}>    
      <UncontrolledButtonDropdown direction='right' style={{minWidth: "90%"}}>      
        <DropdownToggle   size="lg" className='dropdown-toggle-split btn-gradient-primary my-1' color='none' caret>
          SBI Vault
        </DropdownToggle>
        <DropdownMenu right >
          <DropdownItem href='#' tag='a'>Option 1</DropdownItem>
          <DropdownItem href='#' tag='a'>
            Option 2
          </DropdownItem>
          <DropdownItem href='#' tag='a'>Option 3</DropdownItem>
        </DropdownMenu>
      </UncontrolledButtonDropdown>
      <UncontrolledButtonDropdown  style={{minWidth: "90%"}}>      
        <DropdownToggle   size="lg" className='dropdown-toggle-split btn-gradient-primary mb-1' color='none' caret>
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
          <DropdownItem href='#' tag='a'>
            <Button.Ripple color='primary' style={{width: '120px'}}>SEND</Button.Ripple>
          </DropdownItem>
          <DropdownItem divider></DropdownItem>
          <DropdownItem href='#' tag='a'>
            <Button.Ripple color='primary' style={{width: '120px'}}>RECEIVE</Button.Ripple>
          </DropdownItem>
          <DropdownItem divider></DropdownItem>
          <DropdownItem href='#' tag='a'>
            <Button.Ripple color='primary' style={{width: '120px'}}>MANAGE</Button.Ripple>
          </DropdownItem>
          <DropdownItem divider></DropdownItem>
        </DropdownMenu>
      </UncontrolledButtonDropdown>
    </div>
  )
}

export default OwnerDisplay