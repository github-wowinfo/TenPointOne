import React, { useState, useEffect } from 'react'
import { Button, Card, CardBody, CardText, Col, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table, Badge, TabContent, TabPane, CardTitle, CardHeader, Nav, NavItem, NavLink, CardFooter, Tooltip, UncontrolledTooltip, Spinner } from 'reactstrap'
import { HiDownload } from 'react-icons/hi'
import { BsArrowUpCircle, BsArrowDownCircle, BsInfoCircle, BsArrowRightCircle } from 'react-icons/bs'
import { GrClose, GrCloudComputer } from 'react-icons/gr'
import { IoMdCopy } from 'react-icons/io'
import "./ActivityScreenStyles.css"
import CustomModal from './AddNewModal'
import { useSelector, useDispatch, connect } from 'react-redux'
import * as AppData from '../../redux/actions/cookies/appDataType'
import DataTable from 'react-data-table-component'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import axios from 'axios'
import moment from 'moment'
import { getExplorerTransactionLink, shortenAddress, shortenIfAddress, shortenIfTransactionHash, useEthers } from '@usedapp/core'
import ReactPaginate from 'react-paginate'
import helperConfig from "../../helper-config.json"
import { isAddress } from 'ethers/lib/utils'
import { CSVLink } from "react-csv"
import downloadCsv from 'download-csv'
import Avatar from '@components/avatar'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import LoginModal from '../LoginModal'
import ExistingAdrs from './ExistingAdrs'
import ExistingDesc from './ExistingDesc'
import { AlertCircle, Check, Eye, Info, XCircle } from 'react-feather'
import { VscServerProcess } from 'react-icons/vsc'
import { FaRegCheckCircle } from 'react-icons/fa'
import { FiXCircle } from 'react-icons/fi'
import { BiErrorCircle, BiLeftTopArrowCircle } from 'react-icons/bi'
import ReceivedValue from './ReceivedValue'

const ActivityScreen = ({ message, dispatch, globalAdrs, globalNickName, globalVaultFlag }) => {
    let data

    const { account, chainId } = useEthers()

    const isConnected = account !== undefined

    const [loginModal, setLoginModal] = useState(false)
    const disconnect = () => {
        window.location.href = '/home'
        setLoginModal(!loginModal)
    }

    console.log('loginModal', loginModal)

    useEffect(() => {
        if (!isConnected) {
            setLoginModal(!loginModal)
        }
    }, [account, chainId])

    const [curr_acc, setCurr_Acc] = useState(account)
    const [vaultList, setVaultList] = useState([])
    const getVaultListFromLocal = () => {
        const getdata = JSON.parse(localStorage.getItem('vaultdata'))
        const valueData = getdata && getdata.filter(a => a.show === true && a.network === chainId && a.owner === account)
        const vaultlist = valueData && valueData.map((vault, index) => ({ value: index, adrs: vault.address, name: vault.name }))
        console.log('vaultlist', vaultlist)
        if (vaultlist === null || vaultlist === [] || vaultlist.length === 0) {
            dispatch(AppData.globalAdrs(''))
            dispatch(AppData.globalNickName('Create a Vault'))
        } else {
            console.log('vaultlist', vaultlist)
            dispatch(AppData.globalAdrs(vaultlist[0].adrs))
            dispatch(AppData.globalNickName(vaultlist[0].name))
            // setVaultList(vaultlist)
        }
    }
    useEffect(() => {
        if (globalNickName === '' || globalNickName === 'Create a Vault') {
            getVaultListFromLocal()
            // dispatch(AppData.globalNickName(''))
        } else if (curr_acc !== account) {
            setCurr_Acc(account)
            getVaultListFromLocal()
        }
    }, [account, globalVaultFlag])

    const [curt_account, setCurt_account] = useState(account)
    const [curt_chain, setCurt_chain] = useState(chainId)
    const MySwal = withReactContent(Swal)

    const netchange = async (netid) => {
        await ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: `${netid}` }] })
    }
    const accountChange = async () => {
        await ethereum.request({ method: "wallet_requestPermissions", params: [{ eth_accounts: {} }] })
    }
    const handleAjax = () => {
        return MySwal.fire({
            title: 'Do you want to change your current network?',
            // text: `Current network is "${helperConfig.network[chainId].name}"`,
            allowOutsideClick: false,
            showCancelButton: true,
            confirmButtonText: `Switch metamask to "${helperConfig.network[chainId].name} and log in again"`,
            cancelButtonText: `Stay on "${helperConfig.network[curt_chain].name}" and log in again`,
            customClass: {
                confirmButton: 'btn btn-primary mx-1',
                cancelButton: 'btn btn-danger my-1'
            },
            showClass: {
                popup: 'animate__animated animate__flipInX'
            },
        }).then(function (result) {
            if (result.isConfirmed) {
                netchange(helperConfig.network[chainId].netid)
                disconnect()
            } else if (result.isDismissed) {
                disconnect()
                netchange(helperConfig.network[curt_chain].netid)
            }
        })
    }

    const handleAccount = () => {
        return MySwal.fire({
            title: 'Your account is Changed!',
            // text: `Current network is "${helperConfig.network[chainId].name}"`,
            allowOutsideClick: false,
            showCancelButton: true,
            confirmButtonText: `Continue with current account ("${shortenIfAddress(account)}"), and log in again `,
            cancelButtonText: `Stay on previous account ("${shortenIfAddress(curt_account)}"), and log in again`,
            customClass: {
                confirmButton: 'btn btn-primary mx-1',
                cancelButton: 'btn btn-danger my-1'
            },
            showClass: {
                popup: 'animate__animated animate__flipInX'
            },
        }).then(function (result) {
            if (result.isConfirmed) {
                disconnect()
            } else if (result.isDismissed) {
                disconnect()
                accountChange()
            }
        })
    }

    console.log('curt_account', curt_account)

    useEffect(() => {
        if (chainId !== undefined && curt_chain !== undefined && chainId !== curt_chain) {
            handleAjax()
        }
        if (curt_account !== undefined && account !== undefined && account !== curt_account) {
            handleAccount()
            setCurt_account(account)
        }
    }, [chainId, account])

    const [modalVisible, setModalVisible] = useState(false)
    const [getTransaction_trans, setTransaction_trans] = useState([])
    const [getTransaction_exe, setTransaction_exe] = useState([])
    const [trxnId, setTrxnId] = useState('')
    const [desc, setDesc] = useState('')
    const [dataList, setDataList] = useState([])
    const [edataList, setEdataList] = useState([])
    const [active, setActive] = useState('1')
    const [currentPage, setCurrentPage] = useState(0)
    const [loading, setLoading] = useState(true)

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

    const [custom_adrs, setCustom_adrs] = useState('')
    const [have_custom_adrs, setHave_custom_adrs] = useState(false)

    const handleChange = (e) => {
        const entered_adrs = e.target.value
        if (isAddress(entered_adrs)) {
            setCustom_adrs(entered_adrs)
        }
    }
    const handleClick = () => {
        if (custom_adrs !== "") {
            setHave_custom_adrs(!have_custom_adrs)
        } else {
            alert('Enter an Address')
        }
    }

    const getTokenTransaction = async () => {
        try {

            // const response = await axios.get(`https://api.unmarshal.com/v2/matic/address/0x989923d33bE0612680064Dc7223a9f292C89A538/transactions?page=${currentPage}&pageSize=20&contract=string&auth_key=CE2OvLT9dk2YgYAYfb3jR1NqCGWGtdRd1eoikUYs`)
            if (have_custom_adrs) {
                const response = await axios.get(`https://api.unmarshal.com/v2/${helperConfig.unmarshal[chainId]}/address/${custom_adrs}/transactions?page=${currentPage}&pageSize=25&contract=string&auth_key=CE2OvLT9dk2YgYAYfb3jR1NqCGWGtdRd1eoikUYs`).catch(error => {
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
                setTransaction(response.data)
                const data = response.data.transactions.filter((a) => a.type.includes('receive') || a.type.includes('send') || a.type.includes('approve'))
                const exedata = response.data.transactions.filter((a) => !a.type.includes('receive') && !a.type.includes('send') && !a.type.includes('approve'))

                setDataList(data)
                setEdataList(exedata)
            } else {
                // const response = await axios.get(`https://api.unmarshal.com/v2/matic/address/0x989923d33bE0612680064Dc7223a9f292C89A538/transactions?page=${currentPage}&pageSize=20&contract=string&auth_key=CE2OvLT9dk2YgYAYfb3jR1NqCGWGtdRd1eoikUYs`)
                const response = await axios.get(`https://api.unmarshal.com/v2/${helperConfig.unmarshal[chainId]}/address/${globalAdrs}/transactions?page=${currentPage}&pageSize=25&contract=string&auth_key=CE2OvLT9dk2YgYAYfb3jR1NqCGWGtdRd1eoikUYs`).catch(error => {
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
                // setTransaction(response.data)

                const data = response.data.transactions.filter((a) => a.type.includes('receive') || a.type.includes('send') || a.type.includes('approve'))
                const exedata = response.data.transactions.filter((a) => !a.type.includes('receive') && !a.type.includes('send') && !a.type.includes('approve'))
                if (data.length === 0 || exedata.length === 0) {
                    setLoading(false)
                }
                setDataList(data)
                setTransaction_trans(data)
                setEdataList(exedata)
                setTransaction_exe(exedata)
            }

        } catch (error) {
            console.log(`Activity[getTokenTransaction]`, error)
        }
    }

    // console.log('edatalist', edataList)
    console.log('datalist', dataList)

    const [local_names, setLocal_names] = useState([])
    const getNameFromAddressBook = () => {
        const getdata = JSON.parse(localStorage.getItem('adrsbook'))
        console.log('getdata', getdata)
        if (getdata !== null || getdata !== []) {
            const valuedata = getdata && getdata.filter(a => a.owner === account && a.network === chainId)
            const names = valuedata && valuedata.map(i => ({ ladrs: i.adrs, lname: i.nickname }))
            setLocal_names(names)
        }
    }
    console.log('local_names', local_names)

    useEffect(() => {
        getTokenTransaction()
        getNameFromAddressBook()
    }, [currentPage, chainId, account, have_custom_adrs, globalAdrs])

    const addDefaultSrc = (ev) => {
        ev.target.src = require(`@src/assets/images/logo/question.jpg`).default
    }

    const columns = [
        {
            name: '',
            maxWidth: '75px',
            center: true,
            compact: true,
            wrap: true,
            selector: row => (
                <div>
                    {row.type === 'receive' && <Avatar color='light-success' icon={<BsArrowDownCircle size={30} />} />}
                    {row.type === 'send' && <Avatar color='light-danger' icon={<BsArrowUpCircle size={30} />} />}
                    {row.type === 'approve' && <Avatar color='light-primary' icon={<BsInfoCircle size={30} />} />}
                    {row.type === 'contract_execution' && <Avatar color='light-info' icon={<VscServerProcess size={30} />} />}

                </div>
            )
        },
        {
            name: 'Transaction',
            minWidth: '400px',
            compact: true,
            wrap: true,
            selector: row => (
                <div>
                    <span>
                        {/* <span className='align-middle font-weight-bold' style={{ wordWrap: 'break-word' }}>{row.description}</span> */}
                        <ExistingDesc id={row.id} api_desc={row.description} />
                        <br />
                        <a href={getExplorerTransactionLink(row.id, chainId)} target='_blank' className='align-middle font-italic' style={{
                            fontSize: 15
                        }}>{shortenIfTransactionHash(row.id)}</a>
                    </span>

                </div>
            )
        },
        {
            name: 'To / From',
            minWidth: '210px',
            wrap: true,
            selector: row => (
                <span>
                    <span>
                        {
                            row.type === 'receive' ? (<>
                                <span className='align-middle font-weight-bold'>
                                    {/* {local_names && local_names.map(i => (row.from === i.ladrs ? i.lname : shortenIfAddress(row.from)))} */}
                                    <ExistingAdrs adrs={row.from} local={local_names} />
                                    {/* {shortenIfAddress(row.from)} */}
                                </span>
                            </>
                            ) : (<>
                                <span className='align-middle font-weight-bold'>
                                    {/* {local_names && local_names.map(i => (row.to === i.ladrs ? i.lname : shortenAddress(row.to)))} */}
                                    <ExistingAdrs adrs={row.to} local={local_names} />
                                    {/* {shortenAddress(row.to)} */}
                                </span>
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
            name: 'Asset',
            minWidth: '200px',
            // center: 'true',
            selector: row => (
                <span>
                    {
                        row.type === 'receive' ? (
                            <div className='d-flex flex-row justify-content-start'>
                                <div className='align-middle font-weight-bold'>
                                    {/* <img src={row.received && row.received[0].logo_url} alt={row.received[0].symbol} style={{ height: 40, width: 40, marginRight: 10 }} onError={addDefaultSrc} /> */}
                                    <Avatar size='lg' img={row.received[0].logo_url} onError={addDefaultSrc} className='mr-1' />
                                </div>
                                <span style={{ paddingTop: '10px' }} className='font-weight-bold'>
                                    {row.received && row.received[0].symbol.length > 5 ? row.received[0].symbol.substring(0, 5).concat('..') : row.received[0].symbol}
                                </span>
                            </div>
                        ) : row.type === 'send' ? (
                            <div className='d-flex flex-row justify-content-start'>
                                <div className='align-middle font-weight-bold'>
                                    {/* <img src={row.sent && row.sent[0].logo_url} alt={row.sent[0].symbol} style={{ height: 40, width: 40, marginRight: 10 }} onError={addDefaultSrc} /> */}
                                    <Avatar size='lg' img={row.sent[0].logo_url} onError={addDefaultSrc} className='mr-1' />
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
            maxWidth: '150px',
            right: true,
            selector: row => (
                <span>
                    {
                        row.type === 'receive' ? (
                            <span className='align-middle font-weight-bold'>
                                {
                                    row.received ? (<ReceivedValue data={row.received} gadrs={globalAdrs} />) : row.sent ? '' : '-'
                                }
                            </span>
                        ) : (
                            <span className='align-middle font-weight-bold'>
                                {
                                    row.sent ? (<ReceivedValue data={row.sent} gadrs={globalAdrs} />) : row.received ? '' : '-'
                                }
                                {/* {
                                    row.sent ? (row.sent[0].value / (10 ** row.sent[0].decimals)).toLocaleString() : row.received ? '' : '-'
                                } */}
                            </span>
                        )
                    }
                </span>
            )
        },
        {
            name: 'Status',
            minWidth: '250px',
            center: true,
            selector: row => (
                <div className='d-flex flex-row justify-content-center'>
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
                    <span>
                        <Avatar style={{ backgroundColor: '#0421ed9e' }} size='md' id='details' onClick={() => {
                            setModalVisible(!modalVisible)
                            setTrxnId(row.id)
                            setDesc(row.description)
                        }} icon={<Info size={22} />} />
                        {/* <Avatar color='light-primary' size='md' id='details' onClick={() => {
                            setModalVisible(!modalVisible)
                            setTrxnId(row.id)
                            setDesc(row.description)
                        }} icon={<Eye size={22} />} /> */}
                        <UncontrolledTooltip placement='top' target='details'>
                            Click for more details
                        </UncontrolledTooltip>
                    </span>
                </div>
            )
        },
        // {
        //     name: 'More Details',
        //     minWidth: '200px',
        //     center: 'true',
        //     selector: row => (
        //         <Button.Ripple color='flat-primary' onClick={() => {
        //             setModalVisible(!modalVisible)
        //             setTrxnId(row.id)
        //             setDesc(row.description)
        //         }}>VIEW</Button.Ripple>
        //     )
        // }
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

    const CustomPagination_trans = () => (
        <ReactPaginate
            previousLabel={''}
            nextLabel={''}
            forcePage={currentPage}
            onPageChange={page => handlePagination(page)}
            pageCount={Math.ceil((getTransaction_trans.length / 10)) || 1}
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

    const CustomPagination_exe = () => (
        <ReactPaginate
            previousLabel={''}
            nextLabel={''}
            forcePage={currentPage}
            onPageChange={page => handlePagination(page)}
            pageCount={Math.ceil((getTransaction_exe.length / 10)) || 1}
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

    const headers = [
        { label: "Transaction ID", key: "nickname" },
        { label: "Description", key: "network" },
        { label: "To/From", key: "adrs" },
        { label: "Amount", key: "owner" },
        // { label: "$ Value", key: "owner" },
        { label: "Status", key: "owner" }
    ]

    const export_data = [dataList]

    // console.log('dataList', dataList)
    // const export_data = [
    //     [
    //         dataList.id,
    //         dataList.description,
    //         dataList.type === 'receive' ? (dataList.from) : (dataList.to),
    //         dataList.type === 'receive' ? (dataList.received ? dataList.received[0].value / (10 ** dataList.received[0].decimals) : dataList.sent ? '' : '-') : (dataList.sent ? dataList.sent[0].value / (10 ** dataList.sent[0].decimals) : dataList.received ? '' : '-'),
    //         dataList.status
    //     ]
    // ]

    // setTimeout(() => {
    //     setLoading(false)
    // }, 5000)

    const NoDataConst = () => {
        return (
            <Col className='nodatastyle mt-1 d-flex flex-row justify-content-center align-items-center'>
                <p>There are no records to display</p>
            </Col>
        )
    }

    return (
        <>
            <>
                {globalNickName === 'Create a Vault' ? (
                    <Col className='d-flex justify-content-center align-items-center' md={{ offset: 3, size: 6 }} sm="12">
                        <Card className='my-1 card-payment'>
                            <CardHeader style={{ paddingBottom: '.3em' }}>
                                <CardTitle>Activity</CardTitle>
                            </CardHeader>
                            <hr />
                            <Col style={{ fontSize: '2em' }} className='d-flex flex-row justify-content-center align-items-center'>
                                <NavLink href='/manager' >
                                    CREATE A VAULT <BsArrowRightCircle size={35} />
                                </NavLink>
                            </Col>
                        </Card>
                    </Col>
                ) : (<>
                    <Card className='my-1'>
                        <CardHeader className='d-flex flex-row heading'>
                            <CardTitle>Transactions</CardTitle>
                            {/* <Button color='primary' >
                                <CSVLink style={{ color: 'white' }} data={export_data} headers={headers} filename='Activity_Data.csv'>Export</CSVLink>
                                <HiDownload style={{ marginLeft: 5 }} size={15} />
                            </Button> */}
                            {/* <Button.Ripple color='primary' onClick={() => downloadCsv(dataList)} >
                                Export
                                <HiDownload style={{ marginLeft: 5 }} />
                            </Button.Ripple> */}
                        </CardHeader>
                        <CardBody>
                            <CardText>Account Transaction List</CardText>
                        </CardBody>
                    </Card>

                    <Card>
                        <Nav tabs style={{ display: 'flex', flex: 1, justifyContent: 'space-evenly', textAlign: 'center' }}>

                            <Col md={6} sm={6}>
                                <NavItem className='d-inline-block mr-1 mb-1'>
                                    <NavLink color='primary' active={active === '1'} onClick={() => {
                                        toggle('1')
                                    }}>
                                        <CardTitle className='mb-0'>Transactions</CardTitle>
                                    </NavLink>
                                </NavItem>
                            </Col>

                            <Col md={6} sm={6}>
                                <NavItem className='d-inline-block mr-1 mb-1'>
                                    <NavLink color='primary' active={active === '2'} onClick={() => {
                                        toggle('2')
                                    }}>
                                        <CardTitle className='mb-0'>Contract Interactions</CardTitle>
                                    </NavLink>
                                </NavItem>
                            </Col>
                        </Nav>
                        <TabContent activeTab={active}>
                            <TabPane tabId='1'>
                                {loading && dataList.length === 0 ? (
                                    <Col className='my-1 text-center'>
                                        <Spinner color='primary' />
                                    </Col>
                                ) : (
                                    <DataTable
                                        className='react-dataTable'
                                        customStyles={tablestyle}
                                        noHeader
                                        data={dataList}
                                        columns={columns}
                                        pagination
                                        paginationPerPage={10}
                                        paginationDefaultPage={currentPage + 1}
                                        paginationComponent={CustomPagination_trans}
                                        noDataComponent={<NoDataConst />}
                                    />
                                )}
                            </TabPane>
                            <TabPane tabId='2'>
                                {loading && edataList.length === 0 ? (
                                    <Col className='my-1 text-center'>
                                        <Spinner color='primary' />
                                    </Col>
                                ) : (
                                    <DataTable
                                        className='react-dataTable'
                                        customStyles={tablestyle}
                                        noHeader
                                        data={edataList}
                                        columns={columns}
                                        pagination
                                        paginationPerPage={10}
                                        paginationDefaultPage={currentPage + 1}
                                        paginationComponent={CustomPagination_exe}
                                        noDataComponent={<NoDataConst />}
                                    />
                                )}
                            </TabPane>
                        </TabContent>
                    </Card>

                    {/* <Card>
                        <CardHeader>
                            <CardTitle>Check Activity for an Address</CardTitle>
                        </CardHeader>
                        <CardBody className='d-flex flex-row justify-content-between'>
                            <Input className='mx-1' type='text' placeholder="Add address of the account to see it's activity" onChange={handleChange} />
                            <Button color='primary round' onClick={handleClick}>
                                Search
                            </Button>
                        </CardBody>
                    </Card> */}

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
                    <CustomModal open={modalVisible} handleModal={handleModal} trxnId={trxnId} description={desc} local={local_names} />
                </>)}
            </>
            <LoginModal openloginmodal={loginModal} disconnect={disconnect} />
        </>

    )
}

const mapStateToProps = (state) => ({
    message: state.appData.appMessages,
    globalAdrs: state.appData.globalAdrs,
    globalNickName: state.appData.globalNickName,
    globalVaultFlag: state.appData.globalVaultFlag
})
const mapDispatchToProp = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProp)(ActivityScreen)