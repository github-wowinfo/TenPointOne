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
import React, { useState } from 'react'
import data from './data'
import { CgExport, CgImport } from 'react-icons/cg'
import '@styles/react/libs/tables/react-dataTable-component.scss'

// ** Third Party Components
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus } from 'react-feather'
import DataTable from 'react-data-table-component'
import Icon from 'react-crypto-icons'
import CardText from 'reactstrap/lib/CardText'
import { useEthers, shortenIfAddress } from '@usedapp/core'

const AdddressBook = () => {

    const { account } = useEthers()

    const isConnected = account !== undefined

    const disconnect = () => {
        window.location.href = '/login'
    }

    const [modal, setModal] = useState(false)
    const handleModal = () => setModal(!modal)
    const columns = [
        {
            name: 'Name',
            maxWidth: '180px',
            sortable: true,
            selector: row => row.name
        },
        {
            name: 'Address',
            selector: 'adrs',
            minWidth: '475px',
            sortable: true,
            // cell: row => (
            //     <div className='d-flex flex-row flex-nowrap justify-center'>
            //         {/* {row.avatar} */}
            //         <label style={{ fontSize: '14px' }} className='font-weight-bold mx-1'>{row.adrs}</label>
            //     </div>
            // )
            cell: row => row.adrs
        },
        {
            name: '',
            right: true,
            cell: row => (
                <div className='d-flex flex-row justify-content-center align-items-center'>
                    {row.icon1}
                    {row.icon2}
                    {row.fav}
                </div>
            )
        },
        {
            name: 'Chain',
            selector: 'ntwrk',
            center: true,
            cell: row => (
                <div>
                    <Icon name={row.network} size={25} />
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