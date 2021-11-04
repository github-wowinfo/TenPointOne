import { UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'

const Network = () => {
  return (
    <UncontrolledButtonDropdown style={{marginLeft:20, marginRight:20}}>
      <DropdownToggle color='primary' caret>
        Networks
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem href='/' tag='a'>Etherum</DropdownItem>
        <DropdownItem href='/' tag='a'>BSC Mainet</DropdownItem>
        <DropdownItem href='/' tag='a'>Polygon Network</DropdownItem>
        <DropdownItem href='/' tag='a'>Optimism</DropdownItem>
        <DropdownItem href='/' tag='a'>Arbitrum</DropdownItem>
      </DropdownMenu>
    </UncontrolledButtonDropdown>
  )
}
export default Network