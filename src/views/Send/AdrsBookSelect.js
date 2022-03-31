import { ChainId, shortenIfAddress, useEthers } from "@usedapp/core"
import { connect } from "react-redux"
import { Button, CardSubtitle, CardTitle, Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap"
import NonVandS from "./NonVandS"
import VandS from "./VandS"

const AdrsBookSelect = ({ openadrsbookselect, handleadrsbookModal, setAdrsBookValue }) => {

    return (
        <>
            <Modal scrollable className='modal-lg modal-dialog-centered' isOpen={openadrsbookselect} toggle={() => handleadrsbookModal()}>
                <ModalHeader tag='h2' toggle={() => handleadrsbookModal()}>
                    Select Address
                </ModalHeader>
                <ModalBody>
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
