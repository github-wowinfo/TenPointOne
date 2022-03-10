import { Fragment, useState } from "react"
import { Alert, Button, CardTitle, Col, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import { useEthers } from "@usedapp/core"
import * as AppData from '../../redux/actions/cookies/appDataType'
import { connect } from "react-redux"
import { FaRegCheckCircle } from "react-icons/fa"
import { toast } from "react-toastify"
import Avatar from '@components/avatar'
import { AlertTriangle } from "react-feather"
import 'animate.css'
import FileDrop from "./FileDrop"
import DragDropScratch from "./DragDropScratch"

const ImportAdrsBook = ({ openimport, handleImpAdrsBook, globalVaultFlag, dispatch }) => {

    const { account } = useEthers()

    const notifySuccess = () => toast.success(<SuccessToast />, { hideProgressBar: false })
    const SuccessToast = () => (
        <Fragment>
            <div className='toastify-header'>
                <div className='title-wrapper'>
                    <Avatar size='md' color='success' icon={<FaRegCheckCircle size={12} />} />
                    <h3 className='toast-title'>Address Book Imported!</h3>
                </div>
            </div>
            <div className='toastify-body'>
                <span role='img' aria-label='toast-text'>
                    The Address Book data was succesfully imported.
                </span>
            </div>
        </Fragment>
    )

    const [visible, setVisible] = useState(false)

    const handleAlert = () => {
        setVisible(true)
        setTimeout(() => {
            setVisible(false)
        }, 5000)
    }

    const WrongFormat = () => (
        <Fragment>
            <Alert className='animate__animated animate__slideInDown' color='danger' isOpen={visible} toggle={() => setVisible(false)}>
                <div className='my-1 alert-heading'>
                    <AlertTriangle size={20} /><span className='ml-1'>Please select file with JSON format!</span>
                </div>
            </Alert>
        </Fragment>
    )

    const [adrsFile, setAdrsFile] = useState()
    const [selectedFile, setSelectedFile] = useState()
    const [isjson, setIsjson] = useState(false)
    const changeHandler = (e) => {
        const upload = e.target.files[0]
        if (upload.type === "application/json") {
            setIsjson(true)
            const fileReader = new FileReader()
            fileReader.readAsText(e.target.files[0], "UTF-8")
            fileReader.onload = e => {
                setSelectedFile(e.target.result)
                const result = JSON.parse(e.target.result)
                setAdrsFile(result)
            }
        } else {
            // alert('The uploaded file is of the wrong format. File should be a ".JSON" file')
            handleAlert()
            setIsjson(false)
        }
    }

    const handleImport = (adrsFile) => {
        if (adrsFile.length > 0) {
            for (const i in adrsFile) {
                adrsFile[i]['owner'] = account
            }
        }
        const getLocalAdrs = JSON.parse(localStorage.getItem('adrsbook'))
        console.log('getLocalAdrs', getLocalAdrs)
        let newAdrsBookData
        if (getLocalAdrs && getLocalAdrs.length > 0) {
            newAdrsBookData = getLocalAdrs.concat(adrsFile)
            console.log('newAdrsBookData', newAdrsBookData)
        } else {
            newAdrsBookData = adrsFile
        }
        localStorage.setItem('adrsbook', JSON.stringify(newAdrsBookData))
        if (globalVaultFlag === 0) {
            dispatch(AppData.globalVaultFlag(1))
        } else {
            dispatch(AppData.globalVaultFlag(0))
        }
        setSelectedFile()
        setIsjson(false)
        setAdrsFile()
        notifySuccess()
        handleImpAdrsBook()
    }

    const custom_file_upload = {
        border: '1px solid #ccc',
        display: 'inline - block',
        padding: '6px 12px',
        cursor: 'pointer'
    }

    return (
        <Modal isOpen={openimport} toggle={() => {
            setSelectedFile()
            setIsjson(false)
            setAdrsFile()
            handleImpAdrsBook()
        }}>
            <ModalHeader tag='h2' toggle={() => {
                setSelectedFile()
                setIsjson(false)
                setAdrsFile()
                handleImpAdrsBook()
            }}>
                Upload Address Book data (.JSON)
            </ModalHeader>
            <Col>
                {visible ? <WrongFormat /> : null}
            </Col>
            <ModalBody>
                <Col className='text-center'>
                    <label className={custom_file_upload}>
                        <input type="file" name="file" accept=".json" onChange={changeHandler} />
                    </label>
                </Col>
                {selectedFile ? (
                    <Col className='m-1' style={{ overflow: 'auto' }}>
                        {selectedFile}
                    </Col>
                ) : null}
                {/* <Col>
                    <DragDropScratch />
                </Col> */}
                {/* <Col>
                    <FileDrop />
                </Col> */}
            </ModalBody>
            <ModalFooter>
                <Col className='text-center'>
                    {isjson ? (
                        <Button.Ripple color="primary" onClick={() => handleImport(adrsFile)}>Import</Button.Ripple>
                    ) : (
                        <Button.Ripple color="primary" disabled>Import</Button.Ripple>
                    )}
                </Col>
            </ModalFooter>
        </Modal>
    )
}

// export default ImportAdrsBook
const mapStateToProps = (state) => ({
    globalAdrs: state.appData.globalAdrs,
    globalNickName: state.appData.globalNickName,
    globalVaultFlag: state.appData.globalVaultFlag,
    globalFavFlag: state.appData.globalFavFlag
})
const mapDispatchToProp = dispatch => ({ dispatch })
export default connect(mapStateToProps, mapDispatchToProp)(ImportAdrsBook)