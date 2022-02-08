// ** Vertical Menu Components
import VerticalNavMenuLink from './VerticalNavMenuLink'
import VerticalNavMenuGroup from './VerticalNavMenuGroup'
import VerticalNavMenuSectionHeader from './VerticalNavMenuSectionHeader'

// ** Utils
import { resolveVerticalNavMenuItemComponent as resolveNavItemComponent } from '@layouts/utils'
import OwnerDisplay from '../../../../../navigation/vertical/OwnerDisplay'
import Favourites from '../../../../../navigation/vertical/Favourites'
import DisConnect from '../../../../../navigation/vertical/DisConnect'

const VerticalMenuNavItems = props => {
  // ** Components Object
  const Components = {
    VerticalNavMenuSectionHeader,
    VerticalNavMenuGroup,
    VerticalNavMenuLink
  }

  // ** Render Nav Menu Items
  const RenderNavItems = props.items.map((item, index) => {

    const TagName = Components[resolveNavItemComponent(item)]

    return <TagName key={item.id || item.header} item={item} {...props} />
  })

  return (
    <>
      <OwnerDisplay skin={props.skin} menuCollapsed={props.menuCollapsed} menuHover={props.menuHover} />
      {RenderNavItems}
      <DisConnect menuCollapsed={props.menuCollapsed} menuHover={props.menuHover} />
      <hr className='mx-1' />
      <Favourites menuCollapsed={props.menuCollapsed} menuHover={props.menuHover} />
    </>
  )
}

export default VerticalMenuNavItems
