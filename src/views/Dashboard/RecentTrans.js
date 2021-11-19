import { ArrowUp, ArrowDown } from 'react-feather'
import { Table, Badge, Card } from 'reactstrap'
import CardHeader from 'reactstrap/lib/CardHeader'
import CardTitle from 'reactstrap/lib/CardTitle'
import { Link } from 'react-router-dom'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import DataTable from 'react-data-table-component'

const RecentTrans = () => {
  const columns = [
    {
      name: '',
      selector: row => (
        <div>
          {row.icon}
          {row.name}
        </div>
      )
    },
    {
      name: '',
      center: true,
      maxWidth: '130px',
      selector: row => row.status
    },
    {
      name: '',
      maxWidth: '130px',
      selector: row => row.amount
    },
    {
      name: '',
      maxWidth: '130px',
      selector: row => row.date
    }
  ]

  const data = [
    {
      id: '1',
      icon: <ArrowUp size={25} />,
      name: 'Ken Comp (May & June) and 11 more',
      date: '28 Sep 2021',
      amount: '35,483.38738',
      status: <Badge pill color='light-success'>Completed </Badge>
    },
    {
      id: '2',
      icon: <ArrowDown size={25} />,
      name: ' Ken Comp (May & June) and 11 more',
      date: '22 Sep 2021',
      amount: '26,770.62416',
      status: <Badge pill color='light-success'>Completed </Badge>
    },
    {
      id: '3',
      icon: <ArrowUp size={25} />,
      name: 'Ken Comp (May & June) and 11 more',
      date: '21 Sep 2021',
      amount: '35,483.38738',
      status: <Badge pill color='light-danger'>Cancelled </Badge>
    },
    {
      id: '4',
      icon: <ArrowDown size={25} />,
      name: 'Ken Comp (May & June) and 11 more',
      date: '25 Sep 2021',
      amount: '30,470.8239',
      status: <Badge pill color='light-warning'>Pending </Badge>
    },
  ]
  return (
    <Card style={{ height: "100%" }}>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <Link to='/activity'>
          <Badge style={{ fontSize: "1.05em" }} color="primary">View All</Badge>
        </Link>
      </CardHeader>
      <DataTable
        className='react-dataTable'
        noHeader
        columns={columns}
        data={data}
      />
    </Card>
  )
}

export default RecentTrans