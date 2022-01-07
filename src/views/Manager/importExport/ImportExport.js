import {
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    Button,
    Row,
    Col,
    UncontrolledButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap'
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy, Plus, Unlock } from 'react-feather'
import CardText from 'reactstrap/lib/CardText'
import { CgExport, CgImport } from 'react-icons/cg'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { CSVLink } from "react-csv"
import { useEthers } from '@usedapp/core'
import { useEffect } from 'react'

const ImportExport = () => {

    const { account, chainId } = useEthers()

    const headers = [
        { label: "Nickname", key: "nickname" },
        { label: "Network", key: "network" },
        { label: "Address", key: "adrs" },
        { label: "Owner", key: "owner" }
    ]

    let data
    useEffect(() => {
        const adrsBookdata = JSON.parse(localStorage.getItem('adrsbook'))
        const filterAdrsBook = adrsBookdata && adrsBookdata.map(i => i.owner === account && i.network === chainId)
        data = filterAdrsBook
    }, [account, chainId])

    console.log('data', data)


    return (
        <div>
            <Card>
                <CardBody>
                    <Row style={{ display: 'flex', flexDirection: 'row' }}>
                        <Col md='6'>
                            <CardHeader className='py-0'>
                                <CardTitle style={{ fontSize: '1.7em' }}>Import & Export</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <CardText style={{ fontSize: '1rem' }}>Import/Export your account data.</CardText>
                            </CardBody>
                        </Col>
                        <Col md='6' style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            {/* <Button.Ripple className='mr-1 mb-1' size='lg' color='primary' style={{ fontSize: '1.7em' }}><Unlock className='mr-1' size={20} />Vault</Button.Ripple> */}
                            <UncontrolledButtonDropdown direction='up'>
                                <DropdownToggle className='mr-1 mb-1' color='primary' style={{ fontSize: '1.5em' }} caret >
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
                            <Button className='mr-1 mb-1' color='primary' style={{ fontSize: '1.5em' }} color='primary' caret >
                                <CgImport size={15} />
                                <span className='align-middle ml-50'>Import</span>
                            </Button>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </div>
    )
}

export default ImportExport