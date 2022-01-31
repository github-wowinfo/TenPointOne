import { useState } from "react"
import { Button, CardTitle, Col, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"

const ImportAdrsBook = ({ openimport, handleImpAdrsBook }) => {

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

    const handleUpload = (adrsFile) => {
        const getLocalAdrs = JSON.parse(localStorage.getItem('adrsbook'))
        console.log('getLocalAdrs', getLocalAdrs)
        if (getLocalAdrs.length > 0) {
            const newAdrsBookData = getLocalAdrs.concat(adrsFile)
            console.log('newAdrsBookData', newAdrsBookData)
        }
        handleImpAdrsBook()
        setSelectedFile()
        setIsjson(false)
        setAdrsFile()
    }

    return (
        <Modal isOpen={openimport} toggle={() => {
            setSelectedFile()
            setIsjson(false)
            setAdrsFile()
            handleImpAdrsBook()
        }}>
            <ModalHeader toggle={() => {
                setSelectedFile()
                setIsjson(false)
                setAdrsFile()
                handleImpAdrsBook()
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

export default ImportAdrsBook