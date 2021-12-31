import { ArrowUp, ArrowDown } from 'react-feather'
import { Table, Badge, Card } from 'reactstrap'
import CardHeader from 'reactstrap/lib/CardHeader'
import CardTitle from 'reactstrap/lib/CardTitle'
import { Link } from 'react-router-dom'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import DataTable from 'react-data-table-component'
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import { useEthers } from '@usedapp/core'
import { BsArrowDownCircle, BsArrowUpCircle, BsInfoCircle } from 'react-icons/bs'
import helperConfig from '../../helper-config.json'
import axios from 'axios'
import moment from 'moment'

const RecentTrans = ({ globalAdrs, globalNickName }) => {

  const { account, chainId } = useEthers()

  const [getTransaction, setTransaction] = useState([])
  const [dataList, setDataList] = useState([])
  const getTokenTransaction = async () => {
    try {
      const response = await axios.get(`https://stg-api.unmarshal.io/v1/${helperConfig.unmarshal[chainId]}/address/${globalAdrs}/transactions?page=1&pageSize=10&auth_key=CE2OvLT9dk2YgYAYfb3jR1NqCGWGtdRd1eoikUYs`)
      // const response = await axios.get(`https://stg-api.unmarshal.io/v1/${helperConfig.unmarshal[chainId]}/address/${account}/transactions?page=1&pageSize=20&auth_key=CE2OvLT9dk2YgYAYfb3jR1NqCGWGtdRd1eoikUYs`)
      setTransaction(response.data)
      const data = response.data.transactions.filter((a) => a.type.includes('receive') || a.type.includes('send') || a.type.includes('approve'))
      setDataList(data)
    } catch (error) {
      console.log(`Activity[getTokenTransaction]`, error)
    }
  }

  const data = dataList

  useEffect(() => {
    getTokenTransaction()
  }, [account, chainId, globalAdrs])

  // const data = [
  //   {
  //     id: '1',
  //     icon: <ArrowUp size={25} />,
  //     name: 'Ken Comp (May & June) and 11 more',
  //     date: '28 Sep 2021',
  //     amount: '35,483.38738',
  //     status: <Badge pill color='light-success'>Completed </Badge>
  //   },
  //   {
  //     id: '2',
  //     icon: <ArrowDown size={25} />,
  //     name: ' Ken Comp (May & June) and 11 more',
  //     date: '22 Sep 2021',
  //     amount: '26,770.62416',
  //     status: <Badge pill color='light-success'>Completed </Badge>
  //   },
  //   {
  //     id: '3',
  //     icon: <ArrowUp size={25} />,
  //     name: 'Ken Comp (May & June) and 11 more',
  //     date: '21 Sep 2021',
  //     amount: '35,483.38738',
  //     status: <Badge pill color='light-danger'>Cancelled </Badge>
  //   },
  //   {
  //     id: '4',
  //     icon: <ArrowDown size={25} />,
  //     name: 'Ken Comp (May & June) and 11 more',
  //     date: '25 Sep 2021',
  //     amount: '30,470.8239',
  //     status: <Badge pill color='light-warning'>Pending </Badge>
  //   },
  // ]

  const columns = [
    {
      name: '',
      maxWidth: '20px',
      compact: true,
      wrap: true,
      selector: row => (
        <>
          {row.type === 'receive' && <BsArrowDownCircle className='mr-1' size={30} />}
          {row.type === 'send' && <BsArrowUpCircle className='mr-1' size={30} />}
          {row.type === 'approve' && <BsInfoCircle className='mr-1' size={30} />}
        </>
      )
    },
    {
      name: 'Transaction',
      maxWidth: '250px',
      compact: true,
      wrap: true,
      selector: row => row.description
    },
    {
      name: 'Status',
      maxWidth: '120px',
      selector: row => (
        <Badge pill color='light-success' className='mr-1'> {row.status} </Badge>
      )
    },
    {
      name: 'Amount',
      maxWidth: '120px',
      compact: true,
      selector: row => (
        <span>
          {
            row.type === 'receive' ? (
              <>
                <span className='align-middle font-weight-bold'>
                  {
                    row.received ? row.received[0].value / (10 ** row.received[0].decimals) : row.sent ? '' : '-'
                  }
                  <br />
                </span>
                <span className='align-middle font-weight-light' style={{
                  fontSize: 12
                }}>{row.received && row.received[0].symbol}</span>
              </>
            ) : (
              <>
                <span className='align-middle font-weight-bold'>
                  {
                    row.sent ? row.sent[0].value / (10 ** row.sent[0].decimals) : row.received ? '' : '-'
                  }
                  <br />
                  <span className='align-middle font-weight-light' style={{
                    fontSize: 12
                  }}>{row.sent && row.sent[0].symbol}</span>
                </span>
              </>
            )
          }
          {/* <br /> */}
        </span>
      )
    }
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

// export default RecentTrans
const mapStateToProps = (state) => ({
  globalAdrs: state.appData.globalAdrs,
  globalNickName: state.appData.globalNickName
})
// const mapDispatchToProp = dispatch => ({dispatch})

export default connect(mapStateToProps, null)(RecentTrans)