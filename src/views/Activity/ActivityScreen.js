import React, { useState, useEffect } from 'react'
import { Button, Card, CardBody, Col, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Table } from 'reactstrap'
import { HiDownload } from 'react-icons/hi'
import { BsArrowUpCircle, BsArrowDownCircle, BsBoxArrowUpRight } from 'react-icons/bs'
import { GrClose } from 'react-icons/gr'
import { IoMdCopy } from 'react-icons/io'
import "./ActivityScreenStyles.css"
import CustomModal from './AddNewModal'
import { useSelector, useDispatch, connect } from 'react-redux'
import * as AppData from '../../redux/actions/cookies/appDataType'

const ActivityScreen = ({ message, dispatch }) => {

    // const dispatch = useDispatch()
    // const appMessage = useSelector((state) => state.appData.appMessages)

    const [modalVisible, setModalVisible] = useState(false)

    const handleModal = () => {
        setModalVisible(!modalVisible)
    }

    const setMessage = () => {
        dispatch(AppData.setAppMessages('Hi Redux 1'))
        console.log('hit button')

    }

    useEffect(() => {
        console.log('redux', message)
        return () => {
        }
    }, [message])

    return (
        <>
            <Card>
                <CardBody>
                    <Row>
                        <Col >
                            <label style={{ fontWeight: 'bold', fontSize: 16 }}>Transaction</label>
                            <br />
                            <label>Track your transaction status here</label>
                        </Col>

                        <Col className='mb-1' md='2' sm='12'>

                            <Button.Ripple color='primary'
                                onClick={setMessage}
                            >
                                <Row>
                                    Export
                                    <HiDownload style={{ marginLeft: 5 }} />
                                </Row>
                            </Button.Ripple>
                        </Col>
                    </Row>
                </CardBody>
            </Card>

            <Card>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Transaction</th>
                            <th>Total Amount</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td >
                                <span className="row">

                                    <span>

                                        <BsArrowUpCircle size={30} style={{ marginRight: 16 }} />
                                    </span>

                                    <span>

                                        <span className='align-middle font-weight-bold' >Gnosis
                                        </span>
                                        <br />
                                        <span className='align-middle' >Dec-31-1969 19:00:00</span>
                                    </span>
                                </span>
                            </td>
                            <td>
                                <span style={{ color: 'orange' }}>Pending</span>
                            </td>
                            <td>
                                {/* <Button.Ripple color='flat-primary'>Quick View</Button.Ripple> */}
                            </td>
                            <td></td>

                        </tr>
                        <tr>
                            <td >
                                <span className='row'>

                                    <span>

                                        <BsArrowUpCircle size={30} style={{ marginRight: 16 }} />
                                    </span>

                                    <span>

                                        <span className='align-middle font-weight-bold' >Ken Comp (May & June) and 11 more</span>
                                        <br />
                                        <span className='align-middle' >Sep-22-2021 12:53:44</span>
                                    </span>
                                </span>
                            </td>
                            <td>
                                <span style={{ color: 'green' }}>Complete</span>
                            </td>
                            <td>
                                <span>35,483.38738 UNI</span>
                                <br />
                                <span style={{ fontSize: 12 }}>-$739,221.86</span>
                            </td>
                            <td>
                                <Button.Ripple color='flat-primary' onClick={() => setModalVisible(!modalVisible)}>Quick View</Button.Ripple>
                            </td>

                        </tr>
                        <tr>
                            <td >
                                <span className='row'>

                                    <span>

                                        <BsArrowUpCircle size={30} style={{ marginRight: 16 }} />
                                    </span>

                                    <span>

                                        <span className='align-middle font-weight-bold' >Ken Comp (May & June) and 11 more</span>
                                        <br />
                                        <span className='align-middle' >Dec-31-1969 21:31:17</span>
                                    </span>
                                </span>
                            </td>
                            <td>
                                <span style={{ color: 'red' }}>Failed</span>
                            </td>
                            <td>
                                <span>35,483.38738 UNI</span>
                                <br />
                                <span>-$682,302.96</span>
                            </td>
                            <td>
                                <Button.Ripple color='flat-primary' onClick={() => setModalVisible(!modalVisible)}>Quick View</Button.Ripple>
                            </td>

                        </tr>
                        <tr>
                            <td >
                                <span className='row'>

                                    <span>

                                        <BsArrowUpCircle size={30} style={{ marginRight: 16 }} />
                                    </span>

                                    <span>

                                        <span className='align-middle font-weight-bold' >Ken Comp (May & June) and 11 more</span>
                                        <br />
                                        <span className='align-middle' >Dec-31-1969 21:31:17</span>
                                    </span>
                                </span>
                            </td>
                            <td>
                                <span style={{ color: 'red' }}>Failed</span>
                            </td>
                            <td>
                                <span>26,770.62416 UNI</span>
                                <br />
                                <span>-$690,625.89</span>
                            </td>
                            <td>
                                <Button.Ripple color='flat-primary' onClick={() => setModalVisible(!modalVisible)}>Quick View</Button.Ripple>
                            </td>

                        </tr>
                        <tr>
                            <td >
                                <span className='row'>

                                    <span>
                                        <BsArrowUpCircle size={30} style={{ marginRight: 16 }} />
                                    </span>

                                    <span>

                                        <span className='align-middle font-weight-bold' style={{ marginLeft: 8 }}>Hack Money and 12 more</span>
                                        <br />
                                        <span className='align-middle' style={{ marginLeft: 8 }}>Aug-16-2021 21:29:04</span>
                                    </span>
                                </span>
                            </td>
                            <td>
                                <span style={{ color: 'green' }}>Complete</span>
                            </td>
                            <td>
                                <span>11,530.06293 UNI</span>
                                <br />
                                <span>-$332,619.05</span>
                            </td>
                            <td>
                                <Button.Ripple color='flat-primary' onClick={() => setModalVisible(!modalVisible)}>Quick View</Button.Ripple>
                            </td>

                        </tr>
                        <tr>
                            <td>
                                <span className='row'>
                                    <span>

                                        <BsArrowDownCircle size={30} style={{ marginRight: 16 }} />
                                    </span>

                                    <span>

                                        <span className='align-middle font-weight-bold' style={{ marginLeft: 8 }}>Incoming</span>
                                        <br />
                                        <span className='align-middle' style={{ marginLeft: 8 }}>Aug-16-2021 16:26:57</span>
                                    </span>

                                </span>
                            </td>
                            <td>
                                <span style={{ color: 'green' }}>Complete</span>
                            </td>
                            <td>
                                <span>0</span>
                                <br />
                                <span>+$16.5</span>
                            </td>
                            <td>
                                <Button.Ripple color='flat-primary' onClick={() => setModalVisible(!modalVisible)}>Quick View</Button.Ripple>
                            </td>

                        </tr>

                    </tbody>
                </Table>
            </Card>


            <CustomModal open={modalVisible} handleModal={handleModal} />

        </>
    )
}

const mapStateToProps = (state) => ({
    message: state.appData.appMessages
})
const mapDispatchToProp = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProp)(ActivityScreen)