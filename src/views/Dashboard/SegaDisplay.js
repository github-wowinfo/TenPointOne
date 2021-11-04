import AvatarGroup from '@components/avatar-group'
import react from '@src/assets/images/icons/react.svg'
import vuejs from '@src/assets/images/icons/vuejs.svg'
import angular from '@src/assets/images/icons/angular.svg'
import bootstrap from '@src/assets/images/icons/bootstrap.svg'
import avatar1 from '@src/assets/images/portrait/small/avatar-s-5.jpg'
import avatar2 from '@src/assets/images/portrait/small/avatar-s-6.jpg'
import avatar3 from '@src/assets/images/portrait/small/avatar-s-7.jpg'
import {RiSafeLine} from "react-icons/ri"
import { MoreVertical, Edit, Trash } from 'react-feather'
import { Table, Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Card, CardHeader, CardTitle } from 'reactstrap'

const avatarGroupData1 = [
  {
    title: 'Sarah',
    img: avatar1,
    imgHeight: 26,
    imgWidth: 26
  },
  {
    title: 'Ainsley',
    img: avatar2,
    imgHeight: 26,
    imgWidth: 26
  },
  {
    title: 'Charissa',
    img: avatar3,
    imgHeight: 26,
    imgWidth: 26
  }
]

const avatarGroupData2 = [
  {
    title: 'Vanna',
    img: avatar1,
    imgHeight: 26,
    imgWidth: 26
  },
  {
    title: 'Inga',
    img: avatar2,
    imgHeight: 26,
    imgWidth: 26
  },
  {
    title: 'Patricia',
    img: avatar3,
    imgHeight: 26,
    imgWidth: 26
  }
]

const avatarGroupData3 = [
  {
    title: 'Justina',
    img: avatar1,
    imgHeight: 26,
    imgWidth: 26
  },
  {
    title: 'Lamar',
    img: avatar2,
    imgHeight: 26,
    imgWidth: 26
  },
  {
    title: 'Briar',
    img: avatar3,
    imgHeight: 26,
    imgWidth: 26
  }
]

const avatarGroupData4 = [
  {
    title: 'Jenette',
    img: avatar1,
    imgHeight: 26,
    imgWidth: 26
  },
  {
    title: 'Francis',
    img: avatar2,
    imgHeight: 26,
    imgWidth: 26
  },
  {
    title: 'Isaac',
    img: avatar3,
    imgHeight: 26,
    imgWidth: 26
  }
]

const SegaDisplay = () => {
  return (
    <Card className="my-1">
    <CardHeader>
      <CardTitle>Linked SEGAs</CardTitle>
    </CardHeader>
        <Table borderless responsive>
          <thead className='thead-light'>
            <tr>
              <th>Internal Name</th>
              <th style={{textAlign: "center"}}>Public Address</th>
              <th style={{textAlign: "center"}}>Date Created</th>
              <th style={{textAlign: "right"}}>Total Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                
                <span className='align-middle font-weight-bold' style={{whiteSpace:"nowrap"}}><RiSafeLine className="mr-1" size={25}/>SBI Checking</span>
              </td>
              <td style={{textAlign: "center"}}>n47dnAjyCeHitNo7cAU6tcWKz7REPs8DhJ</td>
              <td style={{textAlign: "center"}}>
                12 Sep 2021
              </td>
              <td style={{textAlign: "right"}}>
                $20,865
              </td>
            </tr>
            <tr>
              <td>
                
                <span className='align-middle font-weight-bold' style={{whiteSpace:"nowrap"}}><RiSafeLine className="mr-1" size={25}/>SBI Fixed</span>
              </td>
              <td style={{textAlign: "center"}}>mzcbgDRXJc9S6ndMPCBD3BEfsdAS8FNNYj</td>
              <td style={{textAlign: "center"}}>
                12 Sep 2021
              </td>
              <td style={{textAlign: "right"}}>
                $1,037
              </td>
            </tr>
            <tr>
              <td>
                
                <span className='align-middle font-weight-bold' style={{whiteSpace:"nowrap"}}><RiSafeLine className="mr-1" size={25}/>SBI TenPointOne</span>
              </td>
              <td style={{textAlign: "center"}}>n1CoVps1QjZ4CSTxHZRu8ozP8jq233wFwH</td>
              <td style={{textAlign: "center"}}>
                12 Sep 2021
              </td>
              <td style={{textAlign: "right"}}> 
                $11,753
              </td>
            </tr>
            
          </tbody>
        </Table>
    </Card>
  )
}

export default SegaDisplay