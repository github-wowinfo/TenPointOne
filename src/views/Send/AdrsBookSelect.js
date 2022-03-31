import { ChainId, shortenIfAddress, useEthers } from "@usedapp/core"
import { useEffect } from "react"
import { connect } from "react-redux"
import { Button, CardSubtitle, CardTitle, Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap"
import NonVandS from "./NonVandS"
import VandS from "./VandS"

const AdrsBookSelect = ({ openadrsbookselect, handleadrsbookModal, setAdrsBookValue }) => {
    const color = JSON.parse(localStorage.getItem('skin'))
    console.log('color', color)
    const bgstyle = {
        backgroundColor: '#000000',
        backgroundImage: 'linear-gradient(147deg, #000000 66%, #0f3070e8 94%)'
    }

    return (
        <>
            <Modal scrollable className='modal-lg modal-dialog-centered' isOpen={openadrsbookselect} toggle={() => handleadrsbookModal()}>
                <ModalHeader tag='h2' toggle={() => handleadrsbookModal()}>
                    Select Address
                </ModalHeader>
                <ModalBody style={color === 'dark' ? bgstyle : null}>
                    <Row className='d-flex flex-row justify-content-center'>
                        <Col md='6'><NonVandS handleadrsbookModal={handleadrsbookModal} setAdrsBookValue={setAdrsBookValue} /></Col>
                        <Col md='6'><VandS handleadrsbookModal={handleadrsbookModal} setAdrsBookValue={setAdrsBookValue} /></Col>
                    </Row>
                </ModalBody>
            </Modal>
        </>
    )
}

export default AdrsBookSelect
