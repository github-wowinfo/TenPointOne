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
import { SiWebmoney } from 'react-icons/si'
import Import_Modal from './Import_Modal'

const ImportExport = ({ globalFavFlag, globalVaultFlag, dispatch }) => {
    const { account, chainId } = useEthers()

    // // const [Vaultdata, setVaultdata] = useState([])
    // const getVaultData = JSON.parse(localStorage.getItem('vaultdata'))
    // if (getVaultData !== undefined || getVaultData !== []) {
    //     const LocalVaultData = getVaultData && getVaultData.map(i => i.owner === account && i.network === chainId)
    //     // setVaultdata(LocalVaultData)
    // } else {
    //     alert('Create a Vault')
    // }
    const [noData, setNoData] = useState()
    const [Vaultdata, setVaultdata] = useState([])
    const [SegaData, setSegaData] = useState([])

    useEffect(() => {
        const getVaultData = JSON.parse(localStorage.getItem('vaultdata'))
        if (getVaultData !== undefined || getVaultData !== []) {
            const LocalVaultData = getVaultData && getVaultData.filter(i => i.owner === account && i.network === chainId)
            setVaultdata(LocalVaultData)
            setNoData(true)
        } else {
            setNoData(false)
            alert('Create a Vault')
        }
        const getSegaData = JSON.parse(localStorage.getItem('segadata'))
        if (getSegaData !== undefined || getSegaData !== []) {
            const LocalSegaData = getSegaData && getSegaData.filter(i => i.owner === account && i.network === chainId)
            setSegaData(LocalSegaData)
            setNoData(true)
        } else {
            setNoData(false)
            alert('Create a Vault')
        }
    }, [globalFavFlag, globalVaultFlag])

    const Vheaders = [
        { label: "Nickname", key: "name" },
        { label: "Network", key: "network" },
        { label: "Address", key: "address" },
        { label: "User", key: "owner" }
    ]

    const Sheaders = [
        { label: "Nickname", key: "name" },
        { label: "Network", key: "network" },
        { label: "Address", key: "address" },
        { label: "Of_Vault", key: "vault" },
        // { label: "User", key: "owner" }
    ]

    const [import_modal, setImport_modal] = useState(false)
    const handleimport_modal = () => setImport_modal(!import_modal)

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
                                {console.log('noData', noData)}
                                {console.log('Vaultdata', Vaultdata)}
                                {noData ? (
                                    <DropdownMenu right>
                                        <DropdownItem className='w-100'>
                                            {Vaultdata && Vaultdata.length > 0 ? (
                                                <>
                                                    <BsSafe2 className='mx-1' size={15} />
                                                    <CSVLink style={{ color: '#31c975' }} data={Vaultdata} headers={Vheaders} filename='Addres_Book_Data.csv'>VAULT DATA</CSVLink>
                                                </>
                                            ) : null}
                                        </DropdownItem>
                                        <DropdownItem className='w-100' >
                                            {SegaData && SegaData.length > 0 ? (
                                                <>
                                                    <SiWebmoney className='mx-1' size={15} />
                                                    <CSVLink style={{ color: '#31c975' }} data={SegaData} headers={Sheaders} filename='Addres_Book_Data.csv'>SEGA DATA</CSVLink>
                                                </>
                                            ) : null}
                                        </DropdownItem>
                                    </DropdownMenu>
                                ) : null}
                            </UncontrolledButtonDropdown>
                            <Button className='mr-1 mb-1' color='primary' style={{ fontSize: '1.5em' }} color='primary' caret onClick={handleimport_modal}>
                                <CgImport size={15} />
                                <span className='align-middle ml-50'>Import</span>
                            </Button>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
            <Import_Modal openimport_modal={import_modal} handleimport_modal={handleimport_modal} />
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