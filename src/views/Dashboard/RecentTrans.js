import { ArrowUp, ArrowDown, Check, XCircle, AlertCircle } from 'react-feather'
import { Table, Badge, Card, Spinner, Col } from 'reactstrap'
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
import Avatar from '@components/avatar'
import moment from 'moment'
import { FaRegCheckCircle } from 'react-icons/fa'
import { FiXCircle } from 'react-icons/fi'
import { BiErrorCircle } from 'react-icons/bi'
import ReceivedValue from '../Activity/ReceivedValue'

const RecentTrans = ({ globalAdrs, globalNickName }) => {

  const { account, chainId } = useEthers()

  const [getTransaction, setTransaction] = useState([])
  const [dataList, setDataList] = useState([])
  const [loading, setLoading] = useState(true)
  const getTokenTransaction = async () => {
    try {
      const response = await axios.get(`https://api.unmarshal.com/v2/${helperConfig.unmarshal[chainId]}/address/${globalAdrs}/transactions?page=1&pageSize=20&contract=string&auth_key=CE2OvLT9dk2YgYAYfb3jR1NqCGWGtdRd1eoikUYs`).catch(error => {
        if (error.response) {
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
          setLoading(false)
        } else if (error.request) {
          console.log(error.request)
          setLoading(false)
        } else {
          console.log('Error', error.message)
          setLoading(false)
        }
      })
      // const response = await axios.get(`https://stg-api.unmarshal.io/v1/${helperConfig.unmarshal[chainId]}/address/${account}/transactions?page=1&pageSize=20&auth_key=CE2OvLT9dk2YgYAYfb3jR1NqCGWGtdRd1eoikUYs`)
      setTransaction(response.data)
      const data = response.data.transactions.filter((a) => a.type.includes('receive') || a.type.includes('send') || a.type.includes('approve'))
      if (data.length === 0) {
        setLoading(false)
      }
      setDataList(data)
    } catch (error) {
      console.log(`Activity[getTokenTransaction]`, error)
    }
  }

  const data = dataList

  useEffect(() => {
    getTokenTransaction()
  }, [account, chainId, globalAdrs])

  const addDefaultSrc = (ev) => {
    ev.target.src = require(`@src/assets/images/logo/question.jpg`).default
  }

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
      center: true,
      compact: true,
      wrap: true,
      selector: row => (
        <>
          {row.type === 'receive' && <Avatar color='light-success' icon={<BsArrowDownCircle size={30} />} />}
          {row.type === 'send' && <Avatar color='light-danger' icon={<BsArrowUpCircle size={30} />} />}
          {row.type === 'approve' && <Avatar color='light-primary' icon={<BsInfoCircle size={30} />} />}
        </>
      )
    },
    {
      name: 'Transaction',
      minWidth: '250px',
      selector: row => row.description
    },
    // {
    //   name: 'Asset',
    //   center: true,
    //   compact: true,
    //   wrap: true,
    //   selector: row => (
    //     <span>
    //       {
    //         row.type === 'receive' ? (
    //           <div className='align-middle font-weight-bold'>
    //             <img src={row.received && row.received[0].logo_url} alt={row.received[0].symbol} style={{ height: 40, width: 40, marginRight: 10 }} onError={addDefaultSrc} />
    //           </div>
    //         ) : row.type === 'send' ? (
    //           <div className='align-middle font-weight-bold'>
    //             <img src={row.sent && row.sent[0].logo_url} alt={row.sent[0].symbol} style={{ height: 40, width: 40, marginRight: 10 }} onError={addDefaultSrc} />
    //           </div>
    //         ) : null
    //       }
    //     </span>

    //   )
    // },
    // {
    //   name: 'Token',
    //   minWidth: '100px',
    //   center: 'true',
    //   compact: true,
    //   selector: row => (
    //     <span>
    //       {
    //         row.type === 'receive' ? (
    //           <span className='font-weight-bold'>
    //             {row.received && row.received[0].symbol}
    //           </span>
    //         ) : (
    //           <span className='font-weight-bold'>
    //             {row.sent && row.sent[0].symbol}
    //           </span>
    //         )
    //       }
    //     </span>
    //   )
    // },
    {
      name: 'Asset',
      minWidth: '170px',
      // center: 'true',
      compact: true,
      selector: row => (
        <span>
          {
            row.type === 'receive' ? (
              <div className='d-flex flex-row justify-content-start'>
                <div className=' align-middle font-weight-bold'>
                  <img src={row.received && row.received[0].logo_url} alt={row.received[0].symbol} style={{ height: 40, width: 40, marginRight: 10 }} onError={addDefaultSrc} />
                </div>
                <span style={{ paddingTop: '10px' }} className='font-weight-bold'>
                  {row.received && row.received[0].symbol.length > 5 ? row.received[0].symbol.substring(0, 5).concat('..') : row.received[0].symbol}
                </span>
              </div>
            ) : row.type === 'send' ? (
              <div className='d-flex flex-row justify-content-start'>
                <div className=' align-middle font-weight-bold'>
                  <img src={row.sent && row.sent[0].logo_url} alt={row.sent[0].symbol} style={{ height: 40, width: 40, marginRight: 10 }} onError={addDefaultSrc} />
                </div>
                <span style={{ paddingTop: '10px' }} className='font-weight-bold'>
                  {row.sent && row.sent[0].symbol.length > 5 ? row.sent[0].symbol.substring(0, 5).concat('..') : row.sent[0].symbol}
                </span>
              </div>
            ) : null
          }
        </span>
      )
    },
    {
      name: 'Amount',
      maxWidth: '90px',
      right: 'true',
      compact: true,
      selector: row => (
        <span>
          {
            row.type === 'receive' ? (
              <>
                <span className='align-middle font-weight-bold'>
                  {
                    row.received ? (<ReceivedValue data={row.received} gadrs={globalAdrs} />) : row.sent ? '' : '-'
                  }
                  {/* {
                    row.received ? (row.received[0].value / (10 ** row.received[0].decimals)).toLocaleString() : row.sent ? '' : '-'
                  } */}
                </span>
              </>
            ) : (
              <>
                <span className='align-middle font-weight-bold'>
                  {
                    row.sent ? (<ReceivedValue data={row.sent} gadrs={globalAdrs} />) : row.received ? '' : '-'
                  }
                  {/* {
                    row.sent ? (row.sent[0].value / (10 ** row.sent[0].decimals)).toLocaleString() : row.received ? '' : '-'
                  } */}
                </span>
              </>
            )
          }
          {/* <br /> */}
        </span>
      )
    },
    {
      name: 'Status',
      minWidth: '90px',
      right: 'true',
      selector: row => (
        <span className='mx-1'>
          {
            row.status === 'completed' ? (
              <div className='mr-1'>
                <Avatar style={{ cursor: 'default' }} size='md' color='light-success' icon={<FaRegCheckCircle size={22} />} />
              </div>
            ) : row.status === 'error' ? (
              <div className='mr-1'>
                <Avatar style={{ cursor: 'default' }} size='md' color='light-danger' icon={<FiXCircle size={22} />} />
              </div>
            ) : (
              <div className='mr-1'>
                <Avatar style={{ cursor: 'default' }} size='md' color='light-warning' icon={<BiErrorCircle size={22} />} />
              </div>

            )
          }
        </span>
      )
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
      {loading && data.length === 0 ? (
        <Col className='my-1 text-center'>
          <Spinner color='primary' />
        </Col>
      ) : (
        <DataTable
          className='react-dataTable'
          noHeader
          columns={columns}
          data={data}
        />
      )}
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