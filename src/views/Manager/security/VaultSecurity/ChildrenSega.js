import { BsSafe2 } from 'react-icons/bs'
import { FaRegCopy } from 'react-icons/fa'
import { GoLinkExternal } from 'react-icons/go'
import { Modal, ModalBody, ModalHeader, ModalFooter, Row, Col, Button, Table } from 'reactstrap'
import DataTable from 'react-data-table-component'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { useState } from 'react'
import SegaLocal from './SegaLocal'

const ChildrenSega = ({ openchildsegamodal, handleChildSegatModal, vault, vaultName, segas }) => {

    const [segaLocalModal, setSegaLocalModal] = useState(false)
    const handleSegaLocalModal = () => {
        setSegaLocalModal(!segaLocalModal)
    }

    const columns = [
        {
            name: 'Sega Address',
            selector: row => (
                <div>
                    {row.address}
                    {row.icon1}
                    {row.icon2}
                </div>
            )
        }
        // {
        //     name: 'Created On',
        //     maxWidth: '130px',
        //     selector: row => row.date
        // }
    ]

    // const data = [
    //     {
    //         id: '1',
    //         address: '0x851De59419E68133803eC175159b9F3ecFf8C5A0',
    //         icon1: <FaRegCopy className='mx-1' />,
    //         icon2: <GoLinkExternal className='mx-1' />,
    //         date: '12 Sep 2021'
    //     },
    //     {
    //         id: '2',
    //         address: '0x851De59419E68133803eC175159b9F3ecFf8C5A0',
    //         icon1: <FaRegCopy className='mx-1' />,
    //         icon2: <GoLinkExternal className='mx-1' />,
    //         date: '01 Oct 2021'
    //     },
    //     {
    //         id: '3',
    //         address: '0x851De59419E68133803eC175159b9F3ecFf8C5A0',
    //         icon1: <FaRegCopy className='mx-1' />,
    //         icon2: <GoLinkExternal className='mx-1' />,
    //         date: '10 Oct 2021'
    //     }
    // ]
    const actualSegas = segas.filter((sega) => { return sega.address !== "0x0000000000000000000000000000000000000000" })

    const data = actualSegas

    const [selectedRows, setSelectedRows] = useState([])
    const handleChange = ({ selectedRows }) => {

        // const address = selectedRows.map(({ id, icon1, icon2, ...rest }) => ({ ...rest }))

        setSelectedRows(selectedRows)

        // console.log('selected', address)
    }
    // console.log(selectedRows)
    // const CloseBtn = <X className='cursor-pointer' size={25} onClick={handleModal} />
    return (
        <>
            <Modal className='modal-dialog-centered modal-lg' isOpen={openchildsegamodal} toggle={handleChildSegatModal} >
                {/* {console.log('segas', segas)}
                {console.log('data', data)}
                {console.log('actual segas', actualSegas)} */}
                <ModalHeader tag='h1' toggle={handleChildSegatModal}>
                    Children Sega
                </ModalHeader>
                <ModalBody style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Row style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Col>
                            <h3>View all the Sega created through your Vault and linked to it</h3>
                        </Col>
                        <Col className='my-1'>
                            <Row className='d-flex flex-row'>
                                <Col md='1'><BsSafe2 size={40} /></Col>
                                <Col className='d-flex flex-column justify-content-start'>
                                    <h3>{vaultName}</h3>
                                    <h5>{vault}</h5>
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                            <hr />
                        </Col>
                        <Col>
                            <DataTable
                                className='react-dataTable'
                                data={data}
                                columns={columns}
                                selectableRows
                                onSelectedRowsChange={handleChange}
                                noHeader
                            />
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter className='justify-content-center'>
                    <Button.Ripple className='mx-1' style={{ minWidth: '10vw' }} color='primary' onClick={handleSegaLocalModal}>
                        Add Selected Sega
                    </Button.Ripple>
                    {/* <Button.Ripple className='mx-1' style={{ minWidth: '10vw' }} color='primary' onClick={handleChildSegatModal}>
                        Add All Sega
                    </Button.Ripple> */}
                </ModalFooter>
            </Modal>
            <SegaLocal opensegaLocalModal={segaLocalModal} handleSegaLocalModal={handleSegaLocalModal} vault={vault} segas={selectedRows} />
        </>
    )
}

export default ChildrenSega