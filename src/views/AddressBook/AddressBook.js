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
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus } from 'react-feather'
import DataTable from 'react-data-table-component'
import Icon from 'react-crypto-icons'
import CardText from 'reactstrap/lib/CardText'
import helperConfig from '../../helper-config.json'
import { useEthers, shortenIfAddress, getExplorerAddressLink } from '@usedapp/core'
import Heart from './Heart'
import { FaRegCopy } from 'react-icons/fa'
import { GoLinkExternal } from 'react-icons/go'
import { toast } from 'react-toastify'
import Avatar from '@components/avatar'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const AdddressBook = () => {

    const { account, chainId } = useEthers()

    const isConnected = account !== undefined

    const disconnect = () => {
        window.location.href = '/login'
    }

    const [curt_chain, setCurt_chain] = useState(chainId)
    const MySwal = withReactContent(Swal)

    const netchange = async (netid) => {
        await ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: `${netid}` }] })
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

    useEffect(() => {
        if (chainId !== curt_chain) {
            handleAjax()
        }
    }, [chainId])

    const [text, setText] = useState(account)

    const notifySuccess = () => toast.success(<SuccessToast />, { hideProgressBar: false })

    const copy = async () => {
        await navigator.clipboard.writeText(text)
        notifySuccess()
    }

    const SuccessToast = () => (
        <Fragment>
            <div className='toastify-header'>
                <div className='title-wrapper'>
                    <Avatar size='sm' color='success' icon={<Clipboard size={12} />} />
                    <h6 className='toast-title'>Copied to Clipboard!</h6>
                </div>
            </div>
        </Fragment>
    )

    // const vaultData = JSON.parse(localStorage.getItem('vaultdata'))
    // const vfilter = vaultData.map(v => ({
    //     nickname: v.name,
    //     adrs: v.address,
    //     chain: v.network,
    //     icon1: <FaRegCopy className='mx-1' size={20} />,
    //     icon2: <GoLinkExternal className='mx-1' size={20} />,
    //     fav: <Heart />
    // }))

    // const segaData = JSON.parse(localStorage.getItem('segadata'))
    // const sfilter = segaData.map(s => ({
    //     nickname: s.name,
    //     adrs: s.address,
    //     chain: s.network,
    //     icon1: <FaRegCopy className='mx-1' size={20} />,
    //     icon2: <GoLinkExternal className='mx-1' size={20} />,
    //     fav: <Heart />
    // }))

    // const adrslist = [...vfilter, ...sfilter]
    // const adrslist = Array.prototype.push.apply(vfilter, sfilter)

    // localStorage.setItem('adrsbook', JSON.stringify(vfilter))

    // const adrsbook = adrslist
    // if (getdata) {
    //     adrsbook = [adrslist]
    // }
    // useEffect(() => {
    //     const getdata = JSON.parse(localStorage.getItem('adrsbook'))
    //     if (getdata) {
    //         const adrsbook = adrslist
    //         localStorage.setItem('adrsbook', JSON.stringify(adrsbook))
    //     } else {
    //         const adrsbook = adrslist
    //         localStorage.setItem('adrsbook', JSON.stringify(adrsbook))
    //     }

    //     console.log('adrsbook', adrsbook)
    // }, [])
    // localStorage.setItem('adrsbook', JSON.stringify(adrsbook))
    // console.log('adrsbook', adrsbook)

    // console.log('vaultData', vaultData)
    // console.log('vfilter', vfilter)

    // console.log('segaData', segaData)
    // console.log('sfilter', sfilter)

    // console.log('adrslist', adrslist)

    // useEffect(() => {
    //     const getdata = JSON.parse(localStorage.getItem('adrsbook'))
    //     let data = []
    //     if (getdata) {
    //         data = getdata
    //     } else {
    //         data = []
    //     }

    // }, [])

    const getdata = JSON.parse(localStorage.getItem('adrsbook'))
    const adrsData = getdata && getdata.filter(i => i.owner === account)
    let data = []
    if (getdata) {
        data = adrsData
    } else {
        data = []
    }

    const [modal, setModal] = useState(false)
    const handleModal = () => setModal(!modal)
    const columns = [
        {
            name: 'Name',
            sortable: true,
            selector: row => row.nickname
            // selector: row => row.name
        },
        {
            name: 'Address',
            selector: 'adrs',
            // cell: row => (
            //     <div className='d-flex flex-row flex-nowrap justify-center'>
            //         {/* {row.avatar} */}
            //         <label style={{ fontSize: '14px' }} className='font-weight-bold mx-1'>{row.adrs}</label>
            //     </div>
            // )
            cell: row => shortenIfAddress(row.adrs)

            // cell: row => row.adrs
        },
        {
            name: '',
            cell: row => (
                <span className='d-flex felx-row align-items-center'>
                    {<FaRegCopy style={{ cursor: 'pointer' }} className='mx-1' size={25} />}
                    {<a href={getExplorerAddressLink(row.adrs, row.network)} target='_blank'><GoLinkExternal className='mr-1' size={25} /></a>}
                    {/* {<Heart name={row.nickname} adrs={row.adrs} isFav={row.isFav} />} */}
                    {<Heart item={row} />}
                </span>
            )
        },
        {
            name: 'Chain',
            selector: 'ntwrk',
            cell: row => (
                <div>
                    {row.network && row.network.map((i) => <Icon className='mr-1' name={i ? helperConfig.network[i].icon : 'mty'} size={25} />)}
                    {/* <Icon name={helperConfig.network[row.network].icon} size={25} /> */}
                    {/* <Icon name={row.network ? helperConfig.network[row.network].icon : 'mty'} size={25} /> */}
                    {/* <Icon name={row.network} size={25} /> */}
                </div>
            )
        },
        // {
        //     name: '',
        //     maxWidth: '10px',
        //     right: true,
        //     selector: row => (
        //         <div className='text-center'>
        //             {row.fav}
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
                        paginationPerPage={5}
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

export default AdddressBook