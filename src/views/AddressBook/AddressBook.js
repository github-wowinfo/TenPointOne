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
  import {CgExport, CgImport} from 'react-icons/cg'

// ** Third Party Components
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus } from 'react-feather'
import DataTable from 'react-data-table-component'
import CardText from 'reactstrap/lib/CardText'

const AdddressBook = () => {
    const [modal, setModal] = useState(false)
    const handleModal = () => setModal(!modal)
    const columns = [
        {
            name: 'Name',
            selector: row => row.name
        },
        {
            name: 'Vault',
            selector: row => row.avatar
        },
        {
            name: 'Address',
            selector: row => row.adrs
        },
        {
            name: 'Copy',
            selector: row => row.icon1
        },
        {
            name: 'More details',
            selector: row => row.icon2
        }
    ]
    
    const tablestyle = {
        headCells:{
            style:{
                fontSize: '1.5em'
            }
        },
        cells: {
            style:{
                fontSize: '1.3em'
            }
        },
        rows: {
            style:{
                minHeight: '5em'
            }
        }
    }
    return (
        <div>
        <Card>
        <CardHeader>
          <CardTitle style={{fontSize: '2em'}}>Address Book</CardTitle>
        </CardHeader>
        <CardBody>
          <CardText style={{fontSize: '1.3em'}}>Give individual names to your Vaults, Segas and Counterparties. All names are stored locally on your computer and Risk Protocol does not have access to them.</CardText>
        </CardBody>
      </Card>
            <DataTable
                className='react-dataTable'
                customStyles={tablestyle}
                noHeader
                pagination
                data={data}
                columns={columns}
                className='react-dataTable'
                sortIcon={<ChevronDown size={10} />}
                paginationPerPage = {5}
                paginationRowsPerPageOptions={[5, 10, 15, 20]}
            />
            <Card>
            <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
          <div className='d-flex mt-md-0 mt-1'>
            <UncontrolledButtonDropdown direction='up'>
              <DropdownToggle color='success'  caret outline>
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
        </div>
    )
}

export default AdddressBook