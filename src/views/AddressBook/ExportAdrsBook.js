import { shortenIfAddress } from "@usedapp/core"
import { Fragment, useState } from "react"
import { Button, Card, CardTitle, Col, Form, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row, FormGroup, CardSubtitle } from "reactstrap"
import exportFromJSON from 'export-from-json'
import Avatar from '@components/avatar'
import { toast } from "react-toastify"
import { FaRegCheckCircle } from "react-icons/fa"

const ExportAdrsBook = ({ openexport, handleExpAdrsBook, data }) => {

    const alldata = data
    const [a_check, setA_check] = useState(false)
    const [exp_list, setExp_list] = useState([])

    const notifySuccess = () => toast.success(<SuccessToast />, { hideProgressBar: false, position: toast.POSITION.TOP_CENTER })
    const SuccessToast = () => (
        <Fragment>
            <div className='toastify-header'>
                <div className='title-wrapper'>
                    <Avatar size='md' color='success' icon={<FaRegCheckCircle size={12} />} />
                    <h3 className='toast-title'>Data Exported!</h3>
                </div>
            </div>
            <div className='toastify-body'>
                <span role='img' aria-label='toast-text'>
                    The Addresbook data was succesfully exported, Check for "Address_Book.json" in your browser's download pane.
                </span>
            </div>
        </Fragment>
    )

    return (
        <Modal isOpen={openexport} toggle={() => {
            setExp_list([])
            handleExpAdrsBook()
        }}>
            <ModalHeader toggle={() => {
                setExp_list([])
                handleExpAdrsBook()
            }}>
                <CardTitle className='mb-0'>Select Address you want to Export, or if you want to export the whole address book click <a href='#' onClick={() => {
                    exportFromJSON(
                        {
                            data: alldata,
                            fileName: 'Address_Book',
                            exportType: exportFromJSON.types.json
                        }
                    )
                    notifySuccess()
                    handleExpAdrsBook()
                }}><u>here</u></a>.</CardTitle>
            </ModalHeader>
            <ModalBody>
                <Card className='p-1 mb-0'>
                    <Form>
                        <FormGroup check>
                            {data && data.map((i, index) => {
                                return (
                                    <>
                                        <Row>
                                            <Col className='pb-1'>
                                                <Input className='my-1' key={index} type='checkbox' value={i} checked={a_check[index]} onChange={e => {
                                                    setA_check(!a_check)
                                                    exp_list.push(i)
                                                    if (!e.target.checked) {
                                                        setExp_list(exp_list.filter(adrs => adrs !== i))
                                                    }
                                                }} />
                                                <h4 style={{ color: '#1919d2' }} className='mb-0 '>{i.nickname}</h4>
                                                <h6 className='font-weight-light '>{shortenIfAddress(i.adrs)}</h6>
                                            </Col>
                                        </Row>
                                    </>
                                )
                            })}
                        </FormGroup>
                    </Form>
                </Card>
            </ModalBody>
            <ModalFooter>
                <Col className='text-center'>
                    {exp_list.length > 0 ? (
                        <Button.Ripple color="primary" onClick={() => {
                            exportFromJSON(
                                {
                                    data: exp_list,
                                    fileName: 'Address_Book',
                                    exportType: exportFromJSON.types.json
                                }
                            )
                            notifySuccess()
                            setExp_list([])
                            handleExpAdrsBook()
                        }}>Export</Button.Ripple>
                    ) : (
                        <Button.Ripple color="primary" disabled>Export</Button.Ripple>
                    )}
                </Col>
            </ModalFooter>
        </Modal>
    )

}

export default ExportAdrsBook