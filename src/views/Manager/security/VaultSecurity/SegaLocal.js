import React, { useState } from 'react'
import { Col, FormGroup, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row, Button } from 'reactstrap'
import { shortenIfAddress, useEthers } from "@usedapp/core"

const SegaLocal = ({ opensegaLocalModal, handleSegaLocalModal, segas, vault }) => {

    const { account, chainId } = useEthers()
    const pvault = vault

    const [newSega, setNewSega] = useState('')
    const [nickName, setNickName] = useState('')
    const handleSegaNickName = (e) => {
        if (e.target.value === '') {
            alert('Nickname cannot be blank!')
        } else {
            setNickName(e.target.value)
            // setNewSega(item.address)
        }
    }
    const data = segas.map((item, index) => (
        <>
            <FormGroup>
                <p>{index + 1} - {item.address}</p>
                <Input type='text' id={index} onChange={handleSegaNickName} placeholder={`Add Nickname for ${shortenIfAddress(item.address)}`} />
            </FormGroup>
            {/* {setNewSega(item.address)} */}
        </>
    ))

    const handleAddLocal = () => {
        const getdata = JSON.parse(localStorage.getItem('segadata'))
        const postdata =
        {
            owner: account,
            vault: pvault,
            name: nickName,
            address: newSega,
            network: chainId,
            show: true
        }
        let segadata = []
        if (getdata) {
            segadata = [...getdata, postdata]
        } else {
            segadata = [postdata]
        }
        localStorage.setItem('segadata', JSON.stringify(segadata))
    }
    return (
        <>
            <Modal className='modal-dialog-centered modal-lg' isOpen={opensegaLocalModal} toggle={handleSegaLocalModal} >
                <ModalHeader tag='h1' toggle={handleSegaLocalModal}>
                    Add Segas to Local
                </ModalHeader>
                <ModalBody style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Row className='d-flex flex-column justify-content-center' >
                        <Col>
                            <h3>Add Nicknames for all the selected Segas</h3>
                            <h3>Make sure you are the "Designated Operator" for all the selected segas.</h3>
                        </Col>
                        <Col>
                            <span>{data}</span>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter className='justify-content-center'>
                    <Button.Ripple className='mx-1' style={{ minWidth: '10vw' }} color='primary' onClick={handleAddLocal} disabled>
                        Add To Local
                    </Button.Ripple>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default SegaLocal