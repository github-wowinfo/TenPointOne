import AvatarGroup from '@components/avatar-group'
import react from '@src/assets/images/icons/react.svg'
import vuejs from '@src/assets/images/icons/vuejs.svg'
import angular from '@src/assets/images/icons/angular.svg'
import bootstrap from '@src/assets/images/icons/bootstrap.svg'
import avatar1 from '@src/assets/images/portrait/small/avatar-s-5.jpg'
import avatar2 from '@src/assets/images/portrait/small/avatar-s-6.jpg'
import avatar3 from '@src/assets/images/portrait/small/avatar-s-7.jpg'
import { MoreVertical, Edit, Trash, ArrowUp, ArrowDown } from 'react-feather'
import { Table, Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Card } from 'reactstrap'
import CardHeader from 'reactstrap/lib/CardHeader'
import CardTitle from 'reactstrap/lib/CardTitle'

const avatarGroupData1 = [
  {
    title: 'Yoshi',
    img: avatar1,
    imgHeight: 26,
    imgWidth: 26
  },
  {
    title: 'Kevyn',
    img: avatar2,
    imgHeight: 26,
    imgWidth: 26
  },
  {
    title: 'Louis',
    img: avatar3,
    imgHeight: 26,
    imgWidth: 26
  }
]

const avatarGroupData2 = [
  {
    title: 'Aileen',
    img: avatar1,
    imgHeight: 26,
    imgWidth: 26
  },
  {
    title: 'Karleigh',
    img: avatar2,
    imgHeight: 26,
    imgWidth: 26
  },
  {
    title: 'Elmo',
    img: avatar3,
    imgHeight: 26,
    imgWidth: 26
  }
]

const avatarGroupData3 = [
  {
    title: 'Blossom',
    img: avatar1,
    imgHeight: 26,
    imgWidth: 26
  },
  {
    title: 'Jescie',
    img: avatar2,
    imgHeight: 26,
    imgWidth: 26
  },
  {
    title: 'Gemma',
    img: avatar3,
    imgHeight: 26,
    imgWidth: 26
  }
]

const avatarGroupData4 = [
  {
    title: 'Thor',
    img: avatar1,
    imgHeight: 26,
    imgWidth: 26
  },
  {
    title: 'Jack',
    img: avatar2,
    imgHeight: 26,
    imgWidth: 26
  },
  {
    title: 'Reece',
    img: avatar3,
    imgHeight: 26,
    imgWidth: 26
  }
]

const RecentTrans = () => {
  return (
    <Card style={{height: "100%"}}>
    <CardHeader>
      <CardTitle>Recent Transactions</CardTitle>
      <Badge style={{fontSize: "1.05em"}} color="primary" href='#'>View All</Badge>
    </CardHeader>
      <Table className='table-hover-animation' responsive>
        {/* <thead style={{backgroundColor: "white"}}>
          <tr>
            <th style={{backgroundColor: "white"}}>Recent Transactions</th>
            <th>Client</th>
            <th>Users</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead> */}
        <tbody>
          <tr >
            <td >        
              <span className='align-middle font-weight-bold' style={{whiteSpace:"nowrap"}}><ArrowUp size={25} /> Ken Comp (May & June) and 11 more</span>
            </td>
            <td>28 Sep 2021</td>
            <td>35,483.38738</td>
            
            <td>
              <Badge pill color='light-success' className='mr-1'>
                Completed
              </Badge>
            </td>
          </tr>
          <tr >
          <td >        
              <span className='align-middle font-weight-bold' style={{whiteSpace:"nowrap"}}><ArrowDown size={25} /> Ken Comp (May & June) and 11 more</span>
            </td>
            <td>22 Sep 2021</td>
            <td>26,770.62416</td>
            
            <td>
              <Badge pill color='light-success' className='mr-1'>
                Completed
              </Badge>
            </td>
            
          </tr>
          <tr >
          <td >        
              <span className='align-middle font-weight-bold' style={{whiteSpace:"nowrap"}}><ArrowUp size={25} /> Ken Comp (May & June) and 11 more</span>
            </td>
            <td>21 Sep 2021</td>
            <td>35,483.38738</td>
            
            <td>
              <Badge pill color='light-danger' className='mr-1'>
                Cancelled
              </Badge>
            </td>
            
          </tr>
          <tr >
          <td >        
              <span className='align-middle font-weight-bold' style={{whiteSpace:"nowrap"}}><ArrowDown size={25} /> Ken Comp (May & June) and 11 more</span>
            </td>
            <td>25 Sep 2021</td>
            <td>30,470.8239</td>           
            <td>
              <Badge pill color='light-warning' className='mr-1'>
                Pending
              </Badge>
            </td>            
          </tr>
        </tbody>
      </Table>
    </Card>
  )
}

export default RecentTrans