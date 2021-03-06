import React, { Fragment, useState } from 'react'
import { Col, FormGroup, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row, Button } from 'reactstrap'
import { shortenIfAddress, useEthers } from "@usedapp/core"
import AddNicknameForSega from './AddNicknameForSega'
import { toast } from 'react-toastify'
import Avatar from '@components/avatar'
import { FaRegCheckCircle } from 'react-icons/fa'

const SegaLocal = ({ opensegaLocalModal, handleSegaLocalModal, segas, vault }) => {

    // console.log('segaslocal', segas)

    const { account, chainId } = useEthers()

    const pvault = vault

    const [getSega, setSega] = useState([])

    const data = segas.map((item, index) => (
        <AddNicknameForSega item={item} index={index} segas={segas} getSega={getSega} setSega={setSega} />
    ))

    const notifySuccess = () => toast.success(<SuccessToast />, { hideProgressBar: false })
    const SuccessToast = () => (
        <Fragment>
            <div className='toastify-header'>
                <div className='title-wrapper'>
                    <Avatar size='md' color='success' icon={<FaRegCheckCircle size={12} />} />
                    <h3 className='toast-title'>Sega Added!</h3>
                </div>
            </div>
            <div className='toastify-body'>
                <span role='img' aria-label='toast-text'>
                    {/* Vault with Address "{shortenIfAddress(newVaultAddress)}" has been created and can be found in your navigation pane. */}
                    Sega has been added and also included in the Address Book.
                </span>
            </div>
        </Fragment>
    )

    const handleAddLocal = () => {

        const segaList = segas.map(({ id, icon1, icon2, ...rest }) => ({ ...rest, owner: account, vault: pvault, network: chainId, show: true }))

        const getdata = JSON.parse(localStorage.getItem('segadata'))

        let segadata = []
        if (getdata) {
            segadata = getdata.concat(segaList)
        } else {
            segadata = segaList
        }

        localStorage.setItem('segadata', JSON.stringify(segadata))

        const getAdrsdata = JSON.parse(localStorage.getItem('adrsbook'))

        const adrsbook = []

        segaList.forEach(i => {
            const adrsdata =
            {
                owner: account,
                nickname: i.name,
                adrs: i.address,
                network: chainId
            }
            adrsbook.push(adrsdata)
        })
        if (getAdrsdata.length > 0) {
            // adrsbook = [...getAdrsdata, adrsdata]
            localStorage.setItem('adrsbook', JSON.stringify([...getAdrsdata, adrsbook]))
        } else {
            // adrsbook = [adrsdata]
            localStorage.setItem('adrsbook', JSON.stringify(adrsbook))
        }
        handleSegaLocalModal()
        notifySuccess()
    }
    return (
        <>
            <Modal className='modal-dialog-centered' isOpen={opensegaLocalModal} toggle={handleSegaLocalModal} >
                <ModalHeader tag='h1' toggle={handleSegaLocalModal}>
                    Add Segas to Local
                </ModalHeader>
                <ModalBody style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Row className='d-flex flex-column justify-content-center' >
                        <Col>
                            <h3>Add Nicknames for all the selected Segas</h3>
                            {/* <p>Make sure you are the "Designated Operator" for all the selected segas.</p> */}
                        </Col>
                        <Col>
                            <span>{data}</span>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter className='justify-content-center'>
                    <Button.Ripple className='mx-1' style={{ minWidth: '10vw' }} color='primary' onClick={handleAddLocal}>
                        Add To Local
                    </Button.Ripple>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default SegaLocal