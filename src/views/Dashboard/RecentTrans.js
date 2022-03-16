import { ArrowUp, ArrowDown, Check, XCircle, AlertCircle } from 'react-feather'
import { Table, Badge, Card, Spinner, Col, CardBody } from 'reactstrap'
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
      console.log('response', response)
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

  const data = dataList.slice(0, 5)

  console.log('data', data)

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

  const truncate_stn = (stn) => {
    // return (stn.length > 30) ? stn.substring(0, 30) + '...' : stn
    if (stn.length > 30) {
      let newstn = stn.substring(0, 28)
      newstn += '...'
      return newstn
    } else {
      return stn
    }
  }

  const columns = [
    // {
    //   name: '',
    //   // width: '75px',
    //   // width: '12%',
    //   maxWidth: '75px',
    //   center: true,
    //   compact: true,
    //   wrap: true,
    //   selector: row => (
    //     <>
    //       {row.type === 'receive' && <Avatar color='light-success' icon={<BsArrowDownCircle size={30} />} />}
    //       {row.type === 'send' && <Avatar color='light-danger' icon={<BsArrowUpCircle size={30} />} />}
    //       {row.type === 'approve' && <Avatar color='light-primary' icon={<BsInfoCircle size={30} />} />}
    //     </>
    //   )
    // },
    {
      name: 'Transaction',
      minWidth: '270px',
      compact: 'true',
      wrap: 'true',
      // width: '50%',
      selector: row => (
        <Col className='d-flex flex-row align-items-center'>
          <span>
            {row.type === 'receive' && <Avatar color='light-success' icon={<BsArrowDownCircle size={30} />} />}
            {row.type === 'send' && <Avatar color='light-danger' icon={<BsArrowUpCircle size={30} />} />}
            {row.type === 'approve' && <Avatar color='light-primary' icon={<BsInfoCircle size={30} />} />}
          </span>
          {/* <span className='ml-1'>{row.description.substring(0, 30)}</span> */}
          <span className='ml-1 font-weight-bold'>{truncate_stn(row.description)}</span>
        </Col>
      )
    },
    {
      name: 'Asset',
      // maxWidth: '150px',
      // width: '14%',
      // center: 'true',
      minWidth: '150px',
      compact: true,
      selector: row => (
        <span>
          {
            row.type === 'receive' ? (
              <div className='d-flex flex-row justify-content-start'>
                <div className=' align-middle font-weight-bold'>
                  {/* <img src={row.received && row.received[0].logo_url} alt={row.received[0].symbol} style={{ height: 40, width: 40, marginRight: 10 }} onError={addDefaultSrc} /> */}
                  <Avatar className='mr-1' size='md' img={row.received[0].logo_url} onError={addDefaultSrc} />
                </div>
                <span style={{ paddingTop: '10px' }} className='font-weight-bold'>
                  {row.received && row.received[0].symbol.length > 5 ? row.received[0].symbol.substring(0, 5).concat('..') : row.received[0].symbol}
                </span>
              </div>
            ) : row.type === 'send' ? (
              <div className='d-flex flex-row justify-content-start'>
                <div className=' align-middle font-weight-bold'>
                  {/* <img src={row.sent && row.sent[0].logo_url} alt={row.sent[0].symbol} style={{ height: 40, width: 40, marginRight: 10 }} onError={addDefaultSrc} /> */}
                  <Avatar className='mr-1' size='md' img={row.sent[0].logo_url} onError={addDefaultSrc} />
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
      // maxWidth: '100px',
      // width: '12%',
      maxWidth: '150px',
      right: true,
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
      // maxWidth: '10px',
      // width: '12%',
      right: 'true',
      compact: 'true',
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

  const customStyles = {
    rows: {
      style: {
        height: '55px', // override the row height
      },
    }
  }

  const NoDataConst = () => {
    return (
      <Col className='nodatastyle d-flex flex-row justify-content-center align-items-center' >
        <p>There are no records to display</p>
      </Col>
    )
  }

  return (
    // <Card className='h-100 mb-0'>
    <Card className='mb-0' style={{ maxHeight: '28em' }}>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <Link to='/activity'>
          <Badge style={{ fontSize: "1.05em" }} color="primary">View All</Badge>
        </Link>
      </CardHeader>
      <CardBody className='p-0'>
        {loading && data.length === 0 ? (
          <Col className='my-1 text-center'>
            <Spinner color='primary' />
          </Col>
        ) : (
          <Col className='pb-2 px-0'>
            <DataTable
              className='react-dataTable'
              noHeader
              columns={columns}
              data={data}
              customStyles={customStyles}
              noDataComponent={<NoDataConst />}
            />
          </Col>
        )}
      </CardBody>
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