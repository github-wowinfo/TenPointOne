import { Fragment, useState } from "react"
import { Button, CardTitle, Col, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import { useEthers } from "@usedapp/core"
import * as AppData from '../../redux/actions/cookies/appDataType'
import { connect } from "react-redux"
import { FaRegCheckCircle } from "react-icons/fa"
import { toast } from "react-toastify"
import Avatar from '@components/avatar'

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
            alert('The uploaded file is of the wrong format. File should be a ".JSON" file')
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
        if (getLocalAdrs.length > 0) {
            newAdrsBookData = getLocalAdrs.concat(adrsFile)
            console.log('newAdrsBookData', newAdrsBookData)
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
                <CardTitle className='mb-0'>Upload Address Book data (.JSON)</CardTitle>
            </ModalHeader>
            <ModalBody>
                <Col className='text-center'>
                    <input type="file" name="file" accept=".json" onChange={changeHandler} />
                </Col>
                {selectedFile ? (
                    <Col className='m-1' style={{ overflow: 'auto' }}>
                        {selectedFile}
                    </Col>
                ) : null}
            </ModalBody>
            <ModalFooter>
                <Col className='text-center'>
                    {isjson ? (
                        <Button.Ripple color="success" onClick={() => handleImport(adrsFile)}>Import</Button.Ripple>
                    ) : (
                        <Button.Ripple color="success" disabled>Upload</Button.Ripple>
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