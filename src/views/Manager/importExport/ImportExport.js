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
import { BsSafe2 } from 'react-icons/bs'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import * as AppData from '../../../redux/actions/cookies/appDataType'

const ImportExport = ({ globalFavFlag, globalVaultFlag, dispatch }) => {
    const { account, chainId } = useEthers()

    // const [Vaultdata, setVaultdata] = useState([])
    const getVaultData = JSON.parse(localStorage.getItem('vaultdata'))
    if (getVaultData !== undefined || getVaultData !== []) {
        const LocalVaultData = getVaultData && getVaultData.map(i => i.owner === account && i.network === chainId)
        // setVaultdata(LocalVaultData)
    } else {
        alert('Create a Vault')
    }

    useEffect(() => {
        getVaultData()
    }, [globalFavFlag, globalVaultFlag])

    const Vheaders = [
        { label: "Nickname", key: "name" },
        { label: "Network", key: "network" },
        { label: "Address", key: "address" },
        { label: "User", key: "owner" }
    ]

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
                                        <BsSafe2 className='mx-1' size={15} />
                                        <CSVLink style={{ color: '#31c975' }} data={LocalVaultData} headers={Vheaders} filename='Addres_Book_Data.csv'>VAULT DATA</CSVLink>
                                    </DropdownItem>
                                    <DropdownItem className='w-100' onClick={() => downloadCSV(data)}>
                                        <CgExport className='mx-1' size={15} />
                                        {/* <CSVLink style={{ color: '#31c975' }} data={adrsdata} headers={headers} filename='Addres_Book_Data.csv'>Export</CSVLink> */}
                                    </DropdownItem>
                                    {/* <DropdownItem className='w-100'>
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
                                    </DropdownItem> */}
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

// export default ImportExport
const mapStateToProps = (state) => ({
    globalAdrs: state.appData.globalAdrs,
    globalNickName: state.appData.globalNickName,
    globalVaultFlag: state.appData.globalVaultFlag,
    globalFavFlag: state.appData.globalFavFlag
})
const mapDispatchToProp = dispatch => ({ dispatch })
export default connect(mapStateToProps, mapDispatchToProp)(ImportExport)