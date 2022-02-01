import { useState } from "react"
import { connect } from "react-redux"
import { Button, CardTitle, Col, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import * as AppData from '../../../redux/actions/cookies/appDataType'
import { useEthers } from "@usedapp/core"

const Import_Modal = ({ openimport_modal, handleimport_modal, globalVaultFlag, dispatch }) => {

    const { account } = useEthers()

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

    return (
        <Modal isOpen={openimport_modal} toggle={() => {

            handleimport_modal()
        }}>
            <ModalHeader toggle={() => {

                handleimport_modal()
            }}>
                <CardTitle>Upload/Select Address Book data (.JSON)</CardTitle>
            </ModalHeader>
            <ModalBody>
                <Col className='text-center'>
                    <input type="file" name="file" accept=".json" onChange={changeHandler} />
                </Col>
                <Col className='m-1' style={{ overflow: 'auto' }}>
                    {selectedFile}
                </Col>
            </ModalBody>
            <ModalFooter>
                <Col className='text-center'>
                    {isjson ? (
                        <Button.Ripple color="success" onClick={() => handleUpload(adrsFile)}>Upload</Button.Ripple>
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
export default connect(mapStateToProps, mapDispatchToProp)(Import_Modal)