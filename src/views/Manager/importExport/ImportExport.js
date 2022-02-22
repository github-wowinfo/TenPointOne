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
import Export_Modal from './Export_Modal'

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

    const [export_modal, setExport_modal] = useState(false)
    const handleexport_modal = () => setExport_modal(!export_modal)

    return (
        <div>
            <Card>
                <CardBody>
                    <Row style={{ display: 'flex', flexDirection: 'row' }}>
                        <Col md='7'>
                            <CardHeader className='py-0'>
                                <CardTitle style={{ fontSize: '1.7em' }}>Import & Export</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <CardText style={{ fontSize: '1rem' }}>Import/Export your account data.</CardText>
                            </CardBody>
                        </Col>
                        <Col md='5' className='d-flex flex-column flex-sm-row justify-content-end align-items-center'>
                            <Button.Ripple className='mr-1 mb-1' color='primary' style={{ fontSize: '1.2em' }} onClick={handleexport_modal}><CgExport className='mr-1' size={25} />Export</Button.Ripple>
                            <Button.Ripple className='mr-1 mb-1' color='primary' style={{ fontSize: '1.2em' }} onClick={handleimport_modal}><CgImport className='mr-1' size={25} />Import</Button.Ripple>
                        </Col>
                        {/* <Col md='5' style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Button className='mr-1 mb-1' color='primary' style={{ fontSize: '1.5em', mi }} color='primary' caret onClick={handleexport_modal}>
                                <CgExport size={15} />
                                <span className='align-middle ml-50'>Export</span>
                            </Button>
                            <Button className='mr-1 mb-1' color='primary' style={{ fontSize: '1.5em' }} color='primary' caret onClick={handleimport_modal}>
                                <CgImport size={15} />
                                <span className='align-middle ml-50'>Import</span>
                            </Button>
                        </Col> */}
                    </Row>
                </CardBody>
            </Card>
            <Import_Modal openimport_modal={import_modal} handleimport_modal={handleimport_modal} />
            <Export_Modal openexport_modal={export_modal} handleexport_modal={handleexport_modal} />
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