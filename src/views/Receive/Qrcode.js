import { getExplorerAddressLink, useEthers } from '@usedapp/core'
import React, { Fragment, useState } from 'react'
import { FaRegCopy } from 'react-icons/fa'
import { GoLinkExternal } from 'react-icons/go'
import { toast } from 'react-toastify'
import Avatar from '@components/avatar'
import { Alert, Button, CardSubtitle, Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import { Clipboard } from 'react-feather'


const Qrcode = ({ openqrcode, handleQrcode, account }) => {

    const { chainId } = useEthers()
    const [visible, setVisible] = useState(false)
    const [text, setText] = useState(account)

    const notifySuccess = () => toast.success(<SuccessToast />, { hideProgressBar: true })

    // const alert_shown = {
    //     opacity: '1',
    //     transition: 'all 250ms ease-in'
    // }
    // const alert_hidden = {
    //     opacity: '0',
    //     transition: 'all 250ms linear'
    // }
    const copy = async () => {
        await navigator.clipboard.writeText(text)
        setVisible(true)
        setTimeout(() => {
            setVisible(false)
        }, 3000)
        // notifySuccess()
    }

    const SuccessToast = () => (
        <Fragment>
            <div className='toastify-header'>
                <div className='title-wrapper'>
                    <Avatar size='sm' color='success' icon={<Clipboard size={12} />} />
                    <h6 className='toast-title'>Copied to Clipboard!</h6>
                </div>
            </div>
        </Fragment>
    )

    const pathname = `https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl= ${account}`

    return (
        <Modal className='modal-dialog-centered' isOpen={openqrcode} toggle={() => {
            handleQrcode()
            setVisible(false)
        }}>
            <ModalHeader toggle={() => {
                handleQrcode()
                setVisible(false)
            }}>
                QR-CODE
            </ModalHeader>
            <ModalBody>
                <Row className='d-flex flex-column jsutify-content-center align-items-center' >
                    <Col>
                        <CardSubtitle className='pt-1 h3 text-center'><strong>SBI VAULT</strong></CardSubtitle>
                    </Col>
                    <Col className='p-0 m-0 text-center'>
                        <img src={pathname} alt='QR CODE' width='250' height='250' />
                    </Col>
                    <Col className='my-1 text-center'>
                        <CardSubtitle style={{ color: 'gray' }} > <strong>{account}</strong></CardSubtitle>
                    </Col>
                    <Col>
                        <span className='d-flex flex-row justify-content-center'>
                            <FaRegCopy style={{ cursor: 'pointer' }} className='mx-1' color='grey' size={20} onClick={copy} />
                            <a href={getExplorerAddressLink(account, chainId)} target='_blank'><GoLinkExternal className='mx-1' color='grey' size={20} /></a>
                        </span>
                    </Col>
                    <Col className='py-1 text-center'>
                        <Button.Ripple color='flat-primary' onClick={() => {
                            handleQrcode()
                            setVisible(false)
                        }}>OK</Button.Ripple>
                    </Col>
                    {visible ? (
                        <Col>
                            <Alert className='animate__animated animate__slideInDown' color='success' isOpen={visible} toggle={() => setVisible(false)}>
                                <div className='my-1 alert-heading'>
                                    <Clipboard size={20} /><span className='ml-1'>Copied to Clipboard!</span>
                                </div>
                            </Alert>
                        </Col>
                    ) : null}
                </Row>
            </ModalBody>
        </Modal>
    )
}

export default Qrcode