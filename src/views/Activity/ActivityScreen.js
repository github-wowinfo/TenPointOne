import React, { useState, useEffect } from 'react'
import { Button, Card, CardBody, Col, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table, Badge } from 'reactstrap'
import { HiDownload } from 'react-icons/hi'
import { BsArrowUpCircle, BsArrowDownCircle, BsInfoCircle } from 'react-icons/bs'
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
    const [dataList, setDataList] = useState([])
    const [active, setActive] = useState('1')

    const handleModal = () => {
        setModalVisible(!modalVisible)
    }

    const setMessage = () => {
        dispatch(AppData.setAppMessages('Hi Redux 1'))
        console.log('hit button')

    }

    const getDataForList = (value) => {
        if (value === '1') {

            const data = getTransaction.transactions.filter((a) => a.type.includes('receive') || a.type.includes('send') || a.type.includes('approve'))
            setDataList(data)
        } else {
            const data = getTransaction.transactions.filter((a) => !a.type.includes('receive') && !a.type.includes('send') && !a.type.includes('approve'))

            setDataList(data)
        }
    }

    const toggle = tab => {
        if (active !== tab) {
            setActive(tab)
        }
        getDataForList(tab)
    }

    const getTokenTransaction = async () => {
        try {

            const response = await axios.get(`https://stg-api.unmarshal.io/v1/matic/address/0x989923d33bE0612680064Dc7223a9f292C89A538/transactions?page=1&pageSize=20&auth_key=CE2OvLT9dk2YgYAYfb3jR1NqCGWGtdRd1eoikUYs`)
            setTransaction(response.data)

            const data = response.data.transactions.filter((a) => a.type.includes('receive') || a.type.includes('send') || a.type.includes('approve'))
            setDataList(data)

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
            width: '75px',
            selector: row => (
                <div>
                    {row.type === 'receive' && <BsArrowDownCircle size={30} />}
                    {row.type === 'send' && <BsArrowUpCircle size={30} />}
                    {row.type === 'approve' && <BsInfoCircle size={30} />}

                </div>
            )
        },
        {
            name: 'Transaction',
            selector: row => (
                <div>
                    <span>
                        <span className='align-middle font-weight-bold'  >{row.id.slice(0, 30)}...{row.id.slice(row.id.length - 4, row.id.length)}</span>

                        <br />
                        <span>
                            {
                                row.type === 'receive' ? (<span className='align-middle font-weight-bold'  >From :</span>) : (<span className='align-middle font-weight-bold'  >To :</span>)
                            }
                            <span className='align-middle font-weight-light'  >{row.to.slice(0, 8)}...{row.to.slice(row.to.length - 4, row.to.length)}</span>

                        </span>
                        <br />
                        <span className='align-middle font-italic' style={{
                            fontSize: 12
                        }}>{row.description}</span>
                        <br />
                        <span className='align-middle' style={{
                            fontSize: 10
                        }} >{moment(row.date * 1000).format("MMM-DD-YYYY h:mm:ss")}</span>

                    </span>

                </div>
            )
        },
        {
            name: 'Total Amount',
            maxWidth: '300px',
            selector: row => (
                <span>
                    <span>
                        {
                            row.sent && row.sent[0].value / (10 ** row.sent[0].decimals)
                        }
                        <span className='ml-1'>{row.sent && row.sent[0].symbol}</span>
                    </span>
                    <br />
                    <span>
                        {
                            row.received && row.received[0].value / (10 ** row.received[0].decimals)
                        }
                        <span className='ml-1'>{row.received && row.received[0].symbol}</span>
                    </span>
                </span>
            )
        },
        {
            name: '',
            maxWidth: '150px',
            selector: row => (
                <span>
                    <span>
                        {
                            row.sent && `$${row.sent[0].value / (10 ** row.sent[0].decimals)}`
                        }
                    </span>
                    <br />
                    <span>
                        {
                            row.received && `$${row.received[0].value / (10 ** row.received[0].decimals)}`
                        }
                    </span>
                </span>
            )
        },
        {
            name: 'Status',
            maxWidth: '150px',
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

            <Card className='pt-2 align-items-center'>

                <div className='col-6' style={{ display: 'flex', flex: 1, justifyContent: 'space-evenly' }}>

                    <Col md={6} sm={6}>
                        <div className='d-inline-block mr-1 mb-1'>
                            <Button.Ripple outline color='primary' size='lg' active={active === '1'} onClick={() => {
                                toggle('1')

                            }}>
                                Transactions
                            </Button.Ripple>
                        </div>
                    </Col>

                    <Col md={6} sm={6}>
                        <div className='d-inline-block mr-1 mb-1'>
                            <Button.Ripple outline color='primary' size='lg' active={active === '2'} onClick={() => {
                                toggle('2')
                            }}>
                                Execution
                            </Button.Ripple>
                        </div>
                    </Col>

                </div>

            </Card>

            <Card>
                <DataTable
                    className='react-dataTable'
                    customStyles={tablestyle}
                    noHeader
                    data={dataList}
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