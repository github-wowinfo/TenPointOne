import {DropdownToggle, DropdownItem, DropdownMenu, ButtonDropdown, UncontrolledButtonDropdown} from "reactstrap"
const OwnerDisplay = () => {
  const stylecontainer = {
    textAlign: 'center'
  }
  return (
    <div style={stylecontainer}>    
      <UncontrolledButtonDropdown  style={{minWidth: "90%"}}>      
        <DropdownToggle   size="lg" className='dropdown-toggle-split btn-gradient-primary my-1' color='none' caret>
          SBI Vault
        </DropdownToggle>
        <DropdownMenu right >
          <DropdownItem href='/' tag='a'>Option 1</DropdownItem>
          <DropdownItem href='/' tag='a'>
            Option 2
          </DropdownItem>
          <DropdownItem href='/' tag='a'>Option 3</DropdownItem>
        </DropdownMenu>
      </UncontrolledButtonDropdown>
      <UncontrolledButtonDropdown  style={{minWidth: "90%"}}>      
        <DropdownToggle   size="lg" className='dropdown-toggle-split btn-gradient-primary mb-1' color='none' caret>
          Quick Actions
        </DropdownToggle>
        <DropdownMenu right >
          <DropdownItem href='/' tag='a'>
            <h3>SBI Vault</h3>
            <h6 style={{color: '#D0CAB2'}}>fake Address</h6>
          </DropdownItem>
          <DropdownItem divider></DropdownItem>
          <DropdownItem href='/' tag='a'>
            Option 2
          </DropdownItem>
          <DropdownItem href='/' tag='a'>Option 3</DropdownItem>
        </DropdownMenu>
      </UncontrolledButtonDropdown>
    </div>
  )
}

export default OwnerDisplay