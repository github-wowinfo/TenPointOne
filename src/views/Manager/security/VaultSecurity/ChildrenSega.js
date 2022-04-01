import { BsSafe2 } from 'react-icons/bs'
import { FaRegCopy } from 'react-icons/fa'
import { GoLinkExternal } from 'react-icons/go'
import { Modal, ModalBody, ModalHeader, ModalFooter, Row, Col, Button, Table, CardTitle } from 'reactstrap'
import DataTable from 'react-data-table-component'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { useState } from 'react'
import SegaLocal from './SegaLocal'
import ExistingSega from './ExistingSega'
import Avatar from '@components/avatar'
import { ChainId, getExplorerAddressLink, shortenIfAddress, useEthers } from '@usedapp/core'
import { GiCircleCage, GiHobbitDoor, GiShipWheel } from 'react-icons/gi'
import CopyAdrsSegaList from './CopyAdrsSegaList'

const ChildrenSega = ({ openchildsegamodal, handleChildSegatModal, vault, vaultName, segas }) => {

    const { chainId, account } = useEthers()

    const [segaLocalModal, setSegaLocalModal] = useState(false)
    const handleSegaLocalModal = () => {
        setSegaLocalModal(!segaLocalModal)
    }

    const actualSegas = segas.filter((sega) => { return sega.address !== "0x0000000000000000000000000000000000000000" })

    const data = actualSegas

    // console.log('tabledata', data)

    const columns = [
        {
            name: 'Sega Address',
            selector: row => (
                <div>
                    {<ExistingSega item={row} />}

                    {/* {row.icon1}
                    {row.icon2} */}
                </div>
            )
        },
        {
            name: '',
            rigth: 'true',
            compact: 'true',
            selector: row => (
                <div>
                    <CopyAdrsSegaList item={row.address} />
                    <a href={getExplorerAddressLink(row.address, chainId ? chainId : 1)} target='_blank'><GoLinkExternal className='mx-1' /></a>
                </div>
            )
        }
    ]

    const rowDisabledCriteria = row => row.isInLocal

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
            <Modal className='modal-dialog-centered ' isOpen={openchildsegamodal} toggle={() => {
                setSelectedRows([])
                handleChildSegatModal()
            }} >
                {/* {console.log('segas', segas)}
                {console.log('data', data)}
                {console.log('actual segas', actualSegas)} */}
                <ModalHeader tag='h2' toggle={() => {
                    setSelectedRows([])
                    handleChildSegatModal()
                }}>
                    Children Sega
                </ModalHeader>
                <ModalBody >
                    <Row className='d-flex flex-column justify-content-center align-items-center'>
                        <Col>
                            <p>View all the Sega created through your Vault and linked to it</p>
                        </Col>
                        <Col className='my-1'>
                            <Row className='d-flex flex-row'>
                                {/* <Col className='mx-1' md='1'><Avatar size='lg' color='light-primary' icon={<BsSafe2 size={35} />} /></Col> */}
                                {/* <Col className='mx-1' md='1'><Avatar size='lg' color='light-primary' icon={<GiCircleCage size={35} />} /></Col> */}
                                <Col className='mx-1' md='1'><Avatar size='lg' color='light-primary' icon={<GiShipWheel size={35} />} /></Col>
                                <Col className='d-flex flex-column justify-content-start'>
                                    <CardTitle className='mb-0' tag='h3'>{vaultName}</CardTitle>
                                    <h5 className='font-weight-bold'>{shortenIfAddress(vault)}</h5>
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
                                selectableRowDisabled={rowDisabledCriteria}
                            />
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter className='justify-content-center'>
                    {data.length === 0 || selectedRows.length === 0 ? (
                        <Button.Ripple className='mx-1' style={{ minWidth: '10vw' }} color='primary' disabled>
                            Add Selected Sega
                        </Button.Ripple>
                    ) : (
                        <Button.Ripple className='mx-1' style={{ minWidth: '10vw' }} color='primary' onClick={handleSegaLocalModal}>
                            Add Selected Sega
                        </Button.Ripple>
                    )}

                </ModalFooter>
            </Modal>
            <SegaLocal opensegaLocalModal={segaLocalModal} handleSegaLocalModal={handleSegaLocalModal} vault={vault} segas={selectedRows} />
        </>
    )
}

export default ChildrenSega