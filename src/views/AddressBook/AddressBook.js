import {
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    Button,
    UncontrolledButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Input,
    Label,
    Row,
    Col,
    NavLink
} from 'reactstrap'
import AddNewModal from './AddNewModal'
import React, { useEffect, useState, Fragment } from 'react'
import data from './data'
import { CgExport, CgImport } from 'react-icons/cg'
import '@styles/react/libs/tables/react-dataTable-component.scss'

// ** Third Party Components
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus, Trash2, X, User } from 'react-feather'
import DataTable from 'react-data-table-component'
import Icon from 'react-crypto-icons'
import CardText from 'reactstrap/lib/CardText'
import helperConfig from '../../helper-config.json'
import { useEthers, shortenIfAddress, getExplorerAddressLink } from '@usedapp/core'
import Heart from './Heart'
import { FaRegCheckCircle, FaRegCopy } from 'react-icons/fa'
import { GoLinkExternal } from 'react-icons/go'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import CopyAdrs from './CopyAdrs'
import ChangeName from './ChangeName'
import { connect } from 'react-redux'
import { CSVLink } from "react-csv"
import * as AppData from '../../redux/actions/cookies/appDataType'
import DeleteContact from './DeleteContact'
import LoginModal from '../LoginModal'
import { BsArrowRightCircle } from 'react-icons/bs'
import ImportAdrsBook from './ImportAdrsBook'
import ExportAdrsBook from './ExportAdrsBook'
import { GiCircleCage, GiHobbitDoor, GiShipWheel } from 'react-icons/gi'
import Avatar from '@components/avatar'
import Select from 'react-select'

const AdddressBook = ({ globalFavFlag, globalVaultFlag, dispatch, globalNickName }) => {

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

    const handleAdrsBookDeleteLocal = () => {
        const getAdrsBookList = JSON.parse(localStorage.getItem('adrsbook'))
        const newAddArray = getAdrsBookList.filter(i => i.owner !== account && i.network === chainId)
        console.log('getAdrsBookList', getAdrsBookList)
        console.log('newAddArray', newAddArray)
        // for (const i in getAdrsBookList) {
        //     if (getAdrsBookList[i].owner === account && getAdrsBookList[i].network === chainId) {
        //         getAdrsBookList.splice(i, 1)
        //     } else {
        //         console.log('No matching data')
        //     }
        // }
        localStorage.setItem('adrsbook', JSON.stringify(newAddArray))
        if (globalVaultFlag === 0) {
            dispatch(AppData.globalVaultFlag(1))
        } else {
            dispatch(AppData.globalVaultFlag(0))
        }

    }

    const handleConfirmDelete = () => {
        return MySwal.fire({
            title: 'Are you sure, you want to delete the whole Address Book data?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            input: 'checkbox',
            inputValue: 0,
            inputPlaceholder:
                'Are you sure you want to delete?',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            customClass: {
                confirmButton: 'btn btn-danger m-1',
                cancelButton: 'btn btn-primary m-1',
            },
            buttonsStyling: false,
            inputValidator: (result) => {
                console.log('result', result)
                if (result === 1) {
                    handleAdrsBookDeleteLocal()
                    MySwal.fire({
                        icon: 'success',
                        title: 'Deleted!',
                        text: 'Your file has been deleted.',
                        customClass: {
                            confirmButton: 'btn btn-success'
                        }
                    })
                } else {
                    return !result && 'You need to check the box'
                }
            },
        })
        // .then(function (result) {
        //     if (result.value) {
        //         handleAdrsBookDeleteLocal()
        //         MySwal.fire({
        //             icon: 'success',
        //             title: 'Deleted!',
        //             text: 'Your file has been deleted.',
        //             customClass: {
        //                 confirmButton: 'btn btn-success'
        //             }
        //         })
        //     }
        // })
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


    const [data, setData] = useState([])
    const getAdrsBookList = () => {
        const getdata = JSON.parse(localStorage.getItem('adrsbook'))
        const adrsData = getdata && getdata.filter(i => i.owner === account && i.network === chainId)
        if (getdata) {
            // console.log('first fetch')
            setData(adrsData)
        } else {
            setData([])
        }
    }

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

    useEffect(() => {
        getAdrsBookList()
    }, [chainId, account, globalVaultFlag, globalFavFlag])


    const getVaultList = JSON.parse(localStorage.getItem('vaultdata'))
    const vaultListLocal = getVaultList && getVaultList.filter(v => v.owner === account && v.network === chainId)
    const vaultadrs = vaultListLocal.map(i => i.address)
    console.log('vaultadrs', vaultadrs)

    const getSegaList = JSON.parse(localStorage.getItem('segadata'))
    const segaListLocal = getSegaList && getSegaList.filter(s => s.owner === account && s.network === chainId)
    const segaadrs = segaListLocal.map(j => j.address)
    console.log('segaadrs', segaadrs)

    const [modal, setModal] = useState(false)
    const handleModal = () => setModal(!modal)

    const logos = [
        {
            // icon: <BsSafe2 size={25} />,
            icon: <GiShipWheel size={25} />,
            color: 'primary'
        },
        {
            icon: <GiCircleCage size={25} />,
            color: 'primary'
        },
        {
            icon: <User size={25} />,
            color: 'primary'
        }
    ]

    const columns = [
        {
            name: '',
            maxWidth: '50px',
            selector: row => (
                <div>
                    {vaultadrs.includes(row.adrs) ? (
                        <Avatar size='md' color={logos[0].color} icon={logos[0].icon} />
                    ) : segaadrs.includes(row.adrs) ? (
                        <Avatar size='md' color={logos[1].color} icon={logos[1].icon} />
                    ) : (
                        <Avatar size='md' color={logos[2].color} icon={logos[2].icon} />
                    )}
                </div>
            )
        },
        {
            name: 'Name',
            sortable: true,
            selector: row => row.nickname
            // selector: row => (
            //     <div className='d-flex flex-row justify-content-between'>
            //         {/* <span className='mr-1'>
            //             {<ChangeName item={row} />}
            //         </span> */}
            //         <span className='text-truncate'>
            //             {row.nickname}
            //         </span>
            //     </div>
            // )
        },
        {
            name: 'Address',
            minWidth: '200px',
            center: true,
            selector: 'adrs',
            cell: row => shortenIfAddress(row.adrs)
        },
        {
            name: '',
            right: true,
            maxWidth: '400px',
            cell: row => (
                <span className='d-flex felx-row justify-content-around align-items-center'>
                    {(getVaultList && getVaultList.find(i => i.address === row.adrs && i.network === row.network)) || (getSegaList && getSegaList.find(i => i.address === row.adrs && i.network === row.network)) ? <Heart item={row} /> : null}
                    <div className='mx-2 d-flex flex-row justify-content-around align-items-center'>
                        {<ChangeName item={row} />}
                        {<CopyAdrs item={row} />}
                        {<a href={getExplorerAddressLink(row.adrs, chainId ? chainId : 1)} target='_blank'><GoLinkExternal size={25} /></a>}
                    </div>
                    {<DeleteContact item={row} />}
                </span>
            )
        },
        // {
        //     name: 'Chain',
        //     selector: 'ntwrk',
        //     cell: row => (
        //         <div>
        //             {row.network && row.network.map((i) => <Icon className='mr-1' name={i ? helperConfig.network[i].icon : 'mty'} size={25} />)}
        //             {/* <Icon name={helperConfig.network[row.network].icon} size={25} /> */}
        //             {/* <Icon name={row.network ? helperConfig.network[row.network].icon : 'mty'} size={25} /> */}
        //             {/* <Icon name={row.network} size={25} /> */}
        //         </div>
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
                // minHeight: '5em',
                color: '#6e6b7b'
            }
        },
        rows: {
            style: {
                minHeight: '2em'
            }
        }
    }

    const headers = [
        { label: "Nickname", key: "nickname" },
        { label: "Network", key: "network" },
        { label: "Address", key: "adrs" },
        { label: "User", key: "owner" }
    ]

    const [adrs_data, setAdrs_data] = useState([])
    useEffect(() => {
        const adrsBookdata = JSON.parse(localStorage.getItem('adrsbook'))
        const filterAdrsBook = adrsBookdata && adrsBookdata.filter(i => i.owner === account && i.network === chainId)
        if (filterAdrsBook && filterAdrsBook.length > 0) {
            for (const i in filterAdrsBook) {
                delete filterAdrsBook[i].owner
            }
        }
        setAdrs_data(filterAdrsBook)
    }, [account, chainId, globalVaultFlag, globalFavFlag])

    // const csvReport = {
    //     data: adrsdata,
    //     headers: headers,
    //     filename: 'AddresBookData.csv'
    //   }
    console.log('adrs_data', adrs_data)

    const [impAdrsBook, setImpAdrsBook] = useState(false)
    const handleImpAdrsBook = () => setImpAdrsBook(!impAdrsBook)

    const [expAdrsBook, setExpAdrsBook] = useState(false)
    const handleExpAdrsBook = () => setExpAdrsBook(!expAdrsBook)

    const NoDataConst = () => {
        return (
            <Col className='nodatastyle d-flex flex-row justify-content-center align-items-center'>
                <p className='py-1 mb-0'>There are no Addresses to display</p>
            </Col>
        )
    }

    const [searchValue, setSearchValue] = useState('')

    // ** Function to handle filter
    const handleFilter = e => {
        setSearchValue(e.target.value)
    }

    // ** Table data to render
    const dataToRender = () => {
        const filters = {
            q: searchValue
        }

        const isFiltered = Object.keys(filters).some(function (k) {
            return filters[k].length > 0
        })

        console.log('isFiltered', isFiltered, data)

        if (data.length > 0 && isFiltered === false) {
            // console.log('pehle case', data)
            return data
        } else if (data.length === 0 && isFiltered) {
            console.log('empty aya', data)
            return []
        } else {
            //data jo text ke saath match kare
            console.log('aya', data)
            return data.filter(i => i.nickname.toLowerCase().includes(searchValue.toLowerCase()) || i.adrs.includes(searchValue))
        }
    }

    const [selection, setSelection] = useState('Select a type')
    const handleFilterTable = e => {
        setSelection(e.target.value)
        const getdata = JSON.parse(localStorage.getItem('adrsbook'))
        const adrsData = getdata && getdata.filter(i => i.owner === account && i.network === chainId)
        if (e.target.value === 'vault') {
            const onlyVault = adrsData && adrsData.filter(vault => vaultadrs.includes(vault.adrs))
            setData(onlyVault)

        } else if (e.target.value === 'sega') {
            const onlySega = adrsData && adrsData.filter(sega => segaadrs.includes(sega.adrs))
            setData(onlySega)

        } else if (e.target.value === 'external') {
            const nonrpc = adrsData && adrsData.filter(external => !vaultadrs.includes(external.adrs) && !segaadrs.includes(external.adrs))
            setData(nonrpc)

        } else {
            return setData(adrsData)
        }

    }


    return (
        <>

            <div>
                <Card className='my-1'>
                    <CardHeader className='heading'>
                        <CardTitle>Address Book</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <CardText>Give individual names to your Vaults, Segas and Counterparties. All names are stored locally on your computer and Risk Protocol does not have access to them.</CardText>
                    </CardBody>
                </Card>
                <Card>
                    <Row className='mx-0 mt-1 mb-50'>
                        <Col sm='6'>
                            <div className='d-flex align-items-center'>
                                <Input
                                    // style={{ width: 'fit-content' }}
                                    className='w-25  dataTable-select'
                                    type='select'
                                    id='sort-select'
                                    value={selection}
                                    onChange={e => handleFilterTable(e)}
                                >
                                    <option value='all' selected>All</option>
                                    <option value='vault'>Vault</option>
                                    <option value='sega'>Sega</option>
                                    <option value='external'>External</option>
                                </Input>
                            </div>
                        </Col>
                        <Col className='d-flex align-items-center justify-content-sm-end mt-sm-0 mt-1' sm='6'>
                            <Input
                                className='dataTable-filter'
                                type='text'
                                bsSize='sm'
                                id='search-input'
                                placeholder='Search'
                                value={searchValue}
                                onChange={handleFilter}
                            />
                        </Col>
                    </Row>
                    <DataTable
                        className='react-dataTable'
                        customStyles={tablestyle}
                        noHeader
                        pagination
                        data={dataToRender()}
                        // data={data}
                        columns={columns}
                        sortIcon={<ChevronDown size={10} />}
                        paginationPerPage={10}
                        paginationRowsPerPageOptions={[5, 10, 15, 20]}
                        noDataComponent={<NoDataConst />}
                    />
                </Card>
                <Card>
                    <Row className='p-1'>
                        <Col md='3' className='py-1'>
                            <Button color='primary' block outline onClick={handleModal}>
                                <Plus size={15} />
                                <span className='align-middle ml-50'>Add Address</span>
                            </Button>
                        </Col>
                        <Col md='3' className='py-1'>
                            <Button color='primary' onClick={handleImpAdrsBook} block outline>
                                <CgImport size={15} />
                                <span className='align-middle ml-50'>Import</span>
                            </Button>
                        </Col>
                        <Col md='3' className='py-1'>
                            {adrs_data && adrs_data.length > 0 ? (
                                <Button color='primary' onClick={() => { handleExpAdrsBook() }} block outline>
                                    <CgExport size={15} />
                                    <span className='align-middle ml-50'>Export</span>
                                </Button>
                            ) : (
                                <Button color='primary' block outline disabled>
                                    <CgExport size={15} />
                                    <span className='align-middle ml-50'>Export</span>
                                </Button>
                            )}
                        </Col>
                        <Col md='3' className='text-right py-1'>
                            {adrs_data && adrs_data.length > 0 ? (
                                <Button className='px-0' color='danger' block outline onClick={handleConfirmDelete}>
                                    <X size={15} />
                                    <span className='align-middle ml-50'>Delete Adddress Book</span>
                                </Button>
                            ) : (
                                <Button className='px-0' color='danger' block outline disabled>
                                    <X size={15} />
                                    <span className='align-middle ml-50'>Delete Adddress Book</span>
                                </Button>
                            )}
                        </Col>
                    </Row>
                </Card>
                {/* <Card>
                    <CardBody className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
                        <Col className='d-flex mt-md-0 mt-1 flex-md-row justify-content-between'> */}
                {/* <UncontrolledButtonDropdown direction='up'>
                                <DropdownToggle color='success' caret outline>
                                    <CgExport size={15} />
                                    <span className='align-middle ml-50'>Export</span>
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem className='w-100'>
                                        <Printer size={15} />
                                        <span className='align-middle ml-50'>Print</span>
                                    </DropdownItem>
                                    <DropdownItem className='w-100' onClick={() => downloadCSV(data)}>
                                        <FileText size={15} />
                                        <span className='align-middle ml-50'>CSV</span>
                                    </DropdownItem>
                                    <DropdownItem className='w-100'>
                                        <Grid size={15} />
                                        <span className='align-middle ml-50'>Excel</span>
                                    </DropdownItem>
                                    <DropdownItem className='w-100'>
                                        <File size={15} />
                                        <span className='align-middle ml-50'>PDF</span>
                                    </DropdownItem>
                                    <DropdownItem className='w-100'>
                                        <Copy size={15} />
                                        <span className='align-middle ml-50'>Copy</span>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledButtonDropdown> */}
                {/* <Button className='ml-2' color='primary' caret outline>
                                <CgExport className='mx-1' size={15} />
                                <CSVLink style={{ color: '#31c975' }} data={adrs_data} headers={headers} filename='Addres_Book_Data.csv'>Export</CSVLink>
                            </Button> */}
                {/* <Button className='ml-2' color='primary' caret outline onClick={handleModal}>
                                <Plus size={15} />
                                <span className='align-middle ml-50'>Add Address</span>
                            </Button>
                            <div className='d-flex flex-row justify-content-between md-align-items-center'>
                                <Button className='ml-2' color='primary' onClick={handleImpAdrsBook} caret outline>
                                    <CgImport size={15} />
                                    <span className='align-middle ml-50'>Import</span>
                                </Button>
                                {adrs_data.length > 0 ? (
                                    <Button className='ml-2' color='primary' onClick={() => { handleExpAdrsBook() }} caret outline>
                                        <CgExport className='mx-1' size={15} />Export
                                    </Button>
                                ) : (
                                    <Button className='ml-2' color='primary' caret outline disabled>
                                        <CgExport className='mx-1' size={15} />Export
                                    </Button>
                                )}
                            </div>
                            <Button className='ml-2' color='danger' caret outline onClick={handleConfirmDelete}>
                                <X size={15} />
                                <span className='align-middle ml-50'>Delete Address Book</span>
                            </Button>
                        </Col>
                    </CardBody>
                </Card> */}
                <AddNewModal open={modal} handleModal={handleModal} />
            </div>
            <ImportAdrsBook openimport={impAdrsBook} handleImpAdrsBook={handleImpAdrsBook} />
            <ExportAdrsBook openexport={expAdrsBook} handleExpAdrsBook={handleExpAdrsBook} data={adrs_data} />
            <LoginModal openloginmodal={loginModal} disconnect={disconnect} />
        </>

    )
}

// export default AdddressBook
const mapStateToProps = (state) => ({
    globalAdrs: state.appData.globalAdrs,
    globalNickName: state.appData.globalNickName,
    globalVaultFlag: state.appData.globalVaultFlag,
    globalFavFlag: state.appData.globalFavFlag
})
const mapDispatchToProp = dispatch => ({ dispatch })
export default connect(mapStateToProps, mapDispatchToProp)(AdddressBook)