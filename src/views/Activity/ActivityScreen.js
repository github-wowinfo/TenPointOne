import React, { useState, useEffect } from 'react'
import { Button, Card, CardBody, CardText, Col, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table, Badge, TabContent, TabPane, CardTitle, CardHeader, Nav, NavItem, NavLink, CardFooter } from 'reactstrap'
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
import { useEthers } from '@usedapp/core'
import ReactPaginate from 'react-paginate'
import helperConfig from "../../helper-config.json"

const ActivityScreen = ({ message, dispatch }) => {

    const { account, chainId } = useEthers()

    const isConnected = account !== undefined

    const disconnect = () => {
        window.location.href = '/login'
    }

    const [modalVisible, setModalVisible] = useState(false)
    const [getTransaction, setTransaction] = useState([])
    const [trxnId, setTrxnId] = useState('')
    const [dataList, setDataList] = useState([])
    const [edataList, setEdataList] = useState([])
    const [active, setActive] = useState('1')
    const [currentPage, setCurrentPage] = useState(0)

    const handleModal = () => {
        setModalVisible(!modalVisible)
    }

    const setMessage = () => {
        dispatch(AppData.setAppMessages('Hi Redux 1'))
        console.log('hit button')

    }

    const getDataForList = (value) => {
        console.log('tabvalue', value)
        let data = []
        if (value === '1') {
            data = getTransaction.length > 0 && getTransaction.transactions.filter((a) => a.type.includes('receive') || a.type.includes('send') || a.type.includes('approve'))
            console.log('getTransaction', getTransaction)
            console.log('firstcondition', data)
            setDataList(data)
        } else {
            data = getTransaction.length > 0 && getTransaction.transactions.filter((a) => !a.type.includes('receive') && !a.type.includes('send') && !a.type.includes('approve'))
            console.log('secondcondition', data)
            setDataList(data)
        }
    }

    const toggle = tab => {
        if (active !== tab) {
            setActive(tab)
        }
        // getDataForList(tab)
    }

    const getTokenTransaction = async () => {
        try {

            // const response = await axios.get(`https://stg-api.unmarshal.io/v1/matic/address/0x989923d33bE0612680064Dc7223a9f292C89A538/transactions?page=${currentPage}&pageSize=20&auth_key=CE2OvLT9dk2YgYAYfb3jR1NqCGWGtdRd1eoikUYs`)
            const response = await axios.get(`https://stg-api.unmarshal.io/v1/${helperConfig.unmarshal[chainId]}/address/${account}/transactions?page=${currentPage}&pageSize=20&auth_key=CE2OvLT9dk2YgYAYfb3jR1NqCGWGtdRd1eoikUYs`)
            setTransaction(response.data)

            const data = response.data.transactions.filter((a) => a.type.includes('receive') || a.type.includes('send') || a.type.includes('approve'))
            const exedata = response.data.transactions.filter((a) => !a.type.includes('receive') && !a.type.includes('send') && !a.type.includes('approve'))
            setDataList(data)
            setEdataList(exedata)

        } catch (error) {
            console.log(`Activity[getTokenTransaction]`, error)
        }
    }

    console.log('edatalist', edataList)
    useEffect(() => {
        getTokenTransaction()
        return () => {
        }
    }, [currentPage])

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
            width: '275px',
            selector: row => (
                <div>
                    <span>
                        <span className='align-middle font-weight-bold' style={{ wordWrap: 'break-word' }}>{row.description}</span>
                        <br />
                        <span className='align-middle font-italic' style={{
                            fontSize: 15
                        }}>Trxn Hash:{row.id.slice(0, 6)}...{row.id.slice(row.id.length - 4, row.id.length)}</span>


                    </span>

                </div>
            )
        },
        {
            name: 'Recipient',
            width: '195px',
            selector: row => (
                <span>
                    <span>
                        {
                            row.type === 'receive' ? (<>
                                <span className='align-middle font-weight-bold'  >From :</span>
                                <span className='align-middle font-weight-bold'  >{row.from.slice(0, 4)}...{row.from.slice(row.from.length - 4, row.from.length)}</span>
                            </>
                            ) : (<>
                                <span className='align-middle font-weight-bold'  >To :</span>
                                <span className='align-middle font-weight-bold'  >{row.to.slice(0, 4)}...{row.to.slice(row.to.length - 4, row.to.length)}</span>
                            </>
                            )
                        }
                        {/* <span className='align-middle font-weight-light'  >{row.from.slice(0, 10)}...{row.from.slice(row.from.length - 4, row.from.length)}</span> */}
                        <br />
                        <span className='align-middle' style={{
                            fontSize: 12
                        }} >{moment(row.date * 1000).format("MMM-DD-YYYY h:mm:ss")}</span>
                    </span>
                </span>
            )
        },
        {
            name: 'Total Amount',
            width: '150px',
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
                                <span className='align-middle'>{row.received && row.received[0].symbol}</span>
                            </>
                        ) : (
                            <>
                                <span className='align-middle font-weight-bold'>
                                    {
                                        row.sent ? row.sent[0].value / (10 ** row.sent[0].decimals) : row.received ? '' : '-'
                                    }
                                    <br />
                                    <span className='align-middle'>{row.sent && row.sent[0].symbol}</span>
                                </span>
                            </>
                        )
                    }
                    {/* <br /> */}
                </span>
            )
        },
        {
            name: '$ Value',
            maxWidth: '150px',
            selector: row => (
                <span>
                    <span className='align-middle font-weight-bold'>
                        {
                            row.sent && `$${row.sent[0].value / (10 ** row.sent[0].decimals)}`
                        }
                    </span>
                    {/* <br /> */}
                    <span className='align-middle font-weight-bold'>
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
            width: '200px',
            selector: row => (
                <Button.Ripple color='flat-primary' onClick={() => {
                    setModalVisible(!modalVisible)
                    setTrxnId(row.id)
                }}>Quick View</Button.Ripple>
            )
        }
    ]

    const tablestyle = {
        headCells: {
            style: {
                fontWeight: '500',
                fontSize: '1.285rem',
                color: '#6e6b7b'
            }
        },
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

    const handlePagination = page => { setCurrentPage(page.selected) }

    const CustomPagination = () => (
        <ReactPaginate
            previousLabel={''}
            nextLabel={''}
            forcePage={currentPage}
            onPageChange={page => handlePagination(page)}
            pageCount={getTransaction.total_pages || 1}
            breakLabel={'...'}
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
            activeClassName={'active'}
            pageClassName={'page-item'}
            nextLinkClassName={'page-link'}
            nextClassName={'page-item next'}
            previousClassName={'page-item prev'}
            previousLinkClassName={'page-link'}
            pageLinkClassName={'page-link'}
            breakClassName='page-item'
            breakLinkClassName='page-link'
            containerClassName={'pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1'}
        />
    )

    return (
        <>
            {isConnected ? (<>
                {/* <Card>
                    <CardBody>
                        <Row className='d-flex flex-row justify-content-between'>
                            <Card >
                                <CardHeader>
                                    <CardTitle>Transaction</CardTitle>
                                </CardHeader>
                            </Card>

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
                </Card> */}

                {/* <Card className='pt-2 align-items-center'> */}
                <Card className='my-1'>
                    <CardHeader className='d-flex flex-row '>
                        <CardTitle>Transaction</CardTitle>
                        <Button.Ripple color='primary' onClick={setMessage}>
                            Export
                            <HiDownload style={{ marginLeft: 5 }} />
                        </Button.Ripple>
                    </CardHeader>
                    <CardBody>
                        <CardText>Track your transaction status here</CardText>
                    </CardBody>

                    <Nav tabs style={{ display: 'flex', flex: 1, justifyContent: 'space-evenly', textAlign: 'center' }}>

                        <Col md={6} sm={6}>
                            <NavItem className='d-inline-block mr-1 mb-1'>
                                <NavLink color='primary' active={active === '1'} onClick={() => {
                                    toggle('1')
                                }}>
                                    Transactions
                                </NavLink>
                            </NavItem>
                        </Col>

                        <Col md={6} sm={6}>
                            <NavItem className='d-inline-block mr-1 mb-1'>
                                <NavLink color='primary' active={active === '2'} onClick={() => {
                                    toggle('2')
                                }}>
                                    Contract Interaction
                                </NavLink>
                            </NavItem>
                        </Col>
                    </Nav>
                </Card>

                <TabContent activeTab={active}>
                    <TabPane tabId='1'>
                        <DataTable
                            className='react-dataTable'
                            customStyles={tablestyle}
                            noHeader
                            data={dataList}
                            columns={columns}
                            pagination
                            paginationPerPage={20}
                            paginationDefaultPage={currentPage + 1}
                            paginationComponent={CustomPagination}
                        />
                    </TabPane>
                    <TabPane tabId='2'>
                        <DataTable
                            className='react-dataTable'
                            customStyles={tablestyle}
                            noHeader
                            data={edataList}
                            columns={columns}
                            pagination
                            paginationPerPage={20}
                            paginationDefaultPage={currentPage + 1}
                            paginationComponent={CustomPagination}
                        />
                    </TabPane>
                </TabContent>

                {/* <Card>
                    <DataTable
                        className='react-dataTable'
                        customStyles={tablestyle}
                        noHeader
                        data={dataList}
                        columns={columns}
                        pagination
                        paginationPerPage={20}
                        paginationDefaultPage={currentPage + 1}
                        paginationComponent={CustomPagination}
                    />
                </Card> */}

                <CustomModal open={modalVisible} handleModal={handleModal} trxnId={trxnId} />

            </>) : disconnect()}
        </>

    )
}

const mapStateToProps = (state) => ({
    message: state.appData.appMessages
})
const mapDispatchToProp = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProp)(ActivityScreen)