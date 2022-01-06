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
    Col
} from 'reactstrap'
import AddNewModal from './AddNewModal'
import React, { useEffect, useState, Fragment } from 'react'
import data from './data'
import { CgExport, CgImport } from 'react-icons/cg'
import '@styles/react/libs/tables/react-dataTable-component.scss'

// ** Third Party Components
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus, Trash2 } from 'react-feather'
import DataTable from 'react-data-table-component'
import Icon from 'react-crypto-icons'
import CardText from 'reactstrap/lib/CardText'
import helperConfig from '../../helper-config.json'
import { useEthers, shortenIfAddress, getExplorerAddressLink } from '@usedapp/core'
import Heart from './Heart'
import { FaRegCopy } from 'react-icons/fa'
import { GoLinkExternal } from 'react-icons/go'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import CopyAdrs from './CopyAdrs'
import ChangeName from './ChangeName'
import { connect } from 'react-redux'
import * as AppData from '../../redux/actions/cookies/appDataType'
import DeleteContact from './DeleteContact'

const AdddressBook = ({ globalFavFlag }) => {

    const { account, chainId } = useEthers()

    const isConnected = account !== undefined

    const disconnect = () => {
        window.location.href = '/login'
    }

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
        if (chainId !== curt_chain) {
            handleAjax()
        }
        if (account !== curt_account) {
            handleAccount()
            setCurt_account(account)
        }
    }, [chainId, account])


    const [data, setData] = useState([])
    const getAdrsBookList = () => {
        const getdata = JSON.parse(localStorage.getItem('adrsbook'))
        const adrsData = getdata && getdata.filter(i => i.owner === account)
        console.log()
        if (getdata) {
            setData(adrsData)
        } else {
            setData([])
        }
    }

    useEffect(() => {
        getAdrsBookList()
    }, [chainId, account, globalFavFlag])


    const getVaultList = JSON.parse(localStorage.getItem('vaultdata'))
    console.log('getVaultList', getVaultList)

    const getSegaList = JSON.parse(localStorage.getItem('segadata'))
    console.log('getSegaList', getSegaList)

    const [modal, setModal] = useState(false)
    const handleModal = () => setModal(!modal)

    const columns = [
        {
            name: 'Name',
            sortable: true,
            selector: row => (
                <div className='d-flex flex-row justify-content-between'>
                    <span className='mr-1'>
                        {<ChangeName item={row} />}
                    </span>
                    <span>
                        {row.nickname}
                    </span>
                </div>
            )
        },
        {
            name: 'Address',
            selector: 'adrs',
            cell: row => shortenIfAddress(row.adrs)
        },
        {
            name: '',
            cell: row => (
                <span className='d-flex felx-row align-items-center'>
                    {<CopyAdrs item={row} />}
                    {<a href={getExplorerAddressLink(row.adrs, chainId ? chainId : 1)} target='_blank'><GoLinkExternal className='mr-1' size={25} color='grey' /></a>}
                    {<DeleteContact item={row} />}
                    {(getVaultList && getVaultList.find(i => i.address === row.adrs)) || (getSegaList && getSegaList.find(i => i.address === row.adrs)) ? <Heart item={row} /> : null}
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
                minHeight: '5em',
                color: '#6e6b7b'
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
            {isConnected ? (<div>
                <Card className='my-1'>
                    <CardHeader>
                        <CardTitle>Address Book</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <CardText>Give individual names to your Vaults, Segas and Counterparties. All names are stored locally on your computer and Risk Protocol does not have access to them.</CardText>
                    </CardBody>
                </Card>
                <Card>
                    <DataTable
                        className='react-dataTable'
                        customStyles={tablestyle}
                        noHeader
                        pagination
                        data={data}
                        columns={columns}
                        sortIcon={<ChevronDown size={10} />}
                        paginationPerPage={10}
                        paginationRowsPerPageOptions={[5, 10, 15, 20]}
                    />
                </Card>
                <Card>
                    <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
                        <div className='d-flex mt-md-0 mt-1'>
                            <UncontrolledButtonDropdown direction='up'>
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
                            </UncontrolledButtonDropdown>
                            <Button className='ml-2' color='success' caret outline>
                                <CgImport size={15} />
                                <span className='align-middle ml-50'>Import</span>
                            </Button>
                            <Button className='ml-2' color='success' caret outline onClick={handleModal}>
                                <Plus size={15} />
                                <span className='align-middle ml-50'>Create Entry</span>
                            </Button>
                        </div>
                    </CardHeader>
                </Card>
                <AddNewModal open={modal} handleModal={handleModal} />
            </div>) : disconnect()}
        </>

    )
}

// export default AdddressBook
const mapStateToProps = (state) => ({
    globalAdrs: state.appData.globalAdrs,
    globalNickName: state.appData.globalNickName,
    globalFavFlag: state.appData.globalFavFlag
})
const mapDispatchToProp = dispatch => ({ dispatch })
export default connect(mapStateToProps, mapDispatchToProp)(AdddressBook)