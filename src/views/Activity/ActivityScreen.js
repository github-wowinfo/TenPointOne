import React, { useState, useEffect } from 'react'
import { Button, Card, CardBody, Col, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table, Badge } from 'reactstrap'
import { HiDownload } from 'react-icons/hi'
import { BsArrowUpCircle, BsArrowDownCircle, BsBoxArrowUpRight } from 'react-icons/bs'
import { GrClose } from 'react-icons/gr'
import { IoMdCopy } from 'react-icons/io'
import "./ActivityScreenStyles.css"
import CustomModal from './AddNewModal'
import { useSelector, useDispatch, connect } from 'react-redux'
import * as AppData from '../../redux/actions/cookies/appDataType'
import DataTable from 'react-data-table-component'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import axios from 'axios'
import moment from 'moment'

const ActivityScreen = ({ message, dispatch }) => {

    const [modalVisible, setModalVisible] = useState(false)
    const [getTransaction, setTransaction] = useState([])
    const [trxnId, setTrxnId] = useState('')

    const handleModal = () => {
        setModalVisible(!modalVisible)
    }

    const setMessage = () => {
        dispatch(AppData.setAppMessages('Hi Redux 1'))
        console.log('hit button')

    }

    const getTokenTransaction = async () => {
        try {

            const response = await axios.get(`https://stg-api.unmarshal.io/v1/matic/address/0x989923d33bE0612680064Dc7223a9f292C89A538/transactions?page=1&pageSize=20&auth_key=CE2OvLT9dk2YgYAYfb3jR1NqCGWGtdRd1eoikUYs`)
            setTransaction(response.data)

        } catch (error) {
            console.log(`Activity [getTokenTransaction]`, error)
        }
    }

    useEffect(() => {
        getTokenTransaction()
        return () => {
        }
    }, [])

    const columns = [
        {
            name: '',
            width: '80px',
            selector: row => (
                <div>
                    {row.type === 'receive' && <BsArrowDownCircle size={30} />}
                    {row.type === 'send' && <BsArrowUpCircle size={30} />}

                </div>
            )
        },
        {
            name: 'Transaction',
            selector: row => (
                <div>
                    {/* {row.type === 'receive' && <BsArrowDownCircle size={30} />}
                    {row.type === 'send' && <BsArrowUpCircle size={30} />} */}
                    <span><span className='align-middle font-weight-bold'  >{row.id}</span> <br /> <span className='align-middle' >{moment(row.date).format("MMM-DD-YYYY h:mm:ss")}</span> </span>
                </div>
            )
        },
        {
            name: 'Total Amount',
            maxWidth: '300px',
            selector: row => row.value
        },
        {
            name: 'Status',
            maxWidth: '200px',
            selector: row => (
                <Badge pill color='light-success' className='mr-1'> {row.status} </Badge>
            )
        },
        {
            name: 'More Details',
            maxWidth: '200px',
            selector: row => (
                <Button.Ripple color='flat-primary' onClick={() => {
                    setModalVisible(!modalVisible)
                    setTrxnId(row.id)
                }}>Quick View</Button.Ripple>
            )
        }
    ]

    const data = [
        {
            id: '1',
            transicon: <BsArrowUpCircle size={30} style={{ marginRight: 16 }} />,
            transaction: <span><span className='align-middle font-weight-bold' >Gnosis</span> <br /> <span className='ml-4 align-middle' >Dec-31-1969 19:00:00</span> </span>,
            amount: '',
            status: <Badge pill color='light-warning' className='mr-1'> Pending </Badge>,
            details: ''
        },
        {
            id: '2',
            transicon: <BsArrowUpCircle size={30} style={{ marginRight: 16 }} />,
            transaction: <span> <span className='align-middle font-weight-bold' >Ken Comp (May & June) and 11 more</span> <br /> <span className='mx-4 align-middle' >Sep-22-2021 12:53:44</span>
            </span>,
            amount: <span> <span>35,483.38738 UNI</span> <br /> <span style={{ fontSize: 12 }}>-$739,221.86</span> </span>,
            status: <Badge pill color='light-success' className='mr-1'> Complete </Badge>,
            details: <Button.Ripple color='flat-primary' onClick={() => setModalVisible(!modalVisible)}>Quick View</Button.Ripple>
        },
        {
            id: '3',
            transicon: <BsArrowUpCircle size={30} style={{ marginRight: 16 }} />,
            transaction: <span> <span className='align-middle font-weight-bold' >Ken Comp (May & June) and 11 more</span> <br /> <span className='mx-4 align-middle' >Sep-22-2021 12:53:44</span>
            </span>,
            amount: <span> <span>35,483.38738 UNI</span> <br /> <span style={{ fontSize: 12 }}>-$739,221.86</span> </span>,
            status: <Badge pill color='light-danger' className='mr-1'> Failed </Badge>,
            details: <Button.Ripple color='flat-primary' onClick={() => setModalVisible(!modalVisible)}>Quick View</Button.Ripple>
        },
        {
            id: '4',
            transicon: <BsArrowUpCircle size={30} style={{ marginRight: 16 }} />,
            transaction: <span> <span className='align-middle font-weight-bold' >Ken Comp (May & June) and 11 more</span> <br /> <span className='mx-4 align-middle' >Sep-22-2021 12:53:44</span>
            </span>,
            amount: <span> <span>26,770.62416 UNI</span> <br /> <span style={{ fontSize: 12 }}>-$690,625.89</span> </span>,
            status: <Badge pill color='light-danger' className='mr-1'> Failed </Badge>,
            details: <Button.Ripple color='flat-primary' onClick={() => setModalVisible(!modalVisible)}>Quick View</Button.Ripple>
        },
        {
            id: '5',
            transicon: <BsArrowUpCircle size={30} style={{ marginRight: 16 }} />,
            transaction: <span> <span className='align-middle font-weight-bold' >Hack Money and 12 more</span> <br /> <span className='mx-4 align-middle' >Aug-16-2021 21:29:04</span>
            </span>,
            amount: <span> <span>11,530.06293 UNI</span> <br /> <span style={{ fontSize: 12 }}>-$332,619.05</span> </span>,
            status: <Badge pill color='light-success' className='mr-1'> Complete </Badge>,
            details: <Button.Ripple color='flat-primary' onClick={() => setModalVisible(!modalVisible)}>Quick View</Button.Ripple>
        },
        {
            id: '6',
            transicon: <BsArrowDownCircle size={30} style={{ marginRight: 16 }} />,
            transaction: <span> <span className='align-middle font-weight-bold' >Incoming</span> <br /> <span className='mx-4 align-middle' >Aug-16-2021 16:26:57</span>
            </span>,
            amount: <span> <span>0</span> <br /> <span style={{ fontSize: 12 }}>+$16.5</span> </span>,
            status: <Badge pill color='light-success' className='mr-1'> Complete </Badge>,
            details: <Button.Ripple color='flat-primary' onClick={() => setModalVisible(!modalVisible)}>Quick View</Button.Ripple>
        }
    ]

    const tablestyle = {
        cells: {
            style: {
                fontSize: '1.3em',
                minHeight: '5em'
            }
        },
        rows: {
            style: {
                minHeight: '5em'
            }
        }
    }
    return (
        <>
            <Card>
                <CardBody>
                    <Row>
                        <Col >
                            <label style={{ fontWeight: 'bold', fontSize: 16 }}>Transaction</label>
                            <br />
                            <label>Track your transaction status here</label>
                        </Col>

                        <Col className='mb-1' md='2' sm='12'>
                            
                            <Button.Ripple color='primary'
                                onClick={setMessage}
                            >
                                <Row>
                                    Export
                                    <HiDownload style={{ marginLeft: 5 }} />
                                </Row>
                            </Button.Ripple>
                        </Col>
                    </Row>
                </CardBody>
            </Card>

            <Card>
                <DataTable
                    className='react-dataTable'
                    customStyles={tablestyle}
                    noHeader
                    data={getTransaction.transactions}
                    columns={columns}
                />
            </Card>
            <CustomModal open={modalVisible} handleModal={handleModal} trxnId={trxnId} />

        </>
    )
}

const mapStateToProps = (state) => ({
    message: state.appData.appMessages
})
const mapDispatchToProp = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProp)(ActivityScreen)