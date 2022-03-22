import { ChainId, shortenIfAddress, useEthers } from "@usedapp/core"
import { connect } from "react-redux"
import { Button, CardSubtitle, CardTitle, Col, Modal, ModalBody, ModalHeader } from "reactstrap"
import * as AppData from '../../redux/actions/cookies/appDataType'

const AdrsBookSelect = ({ globalAdrs, globalNickName, openadrsbookselect, handleadrsbookModal, setAdrsBookValue }) => {

    const { account, chainId } = useEthers()

    const getAdrsBookData = JSON.parse(localStorage.getItem('adrsbook'))

    const newdata = getAdrsBookData && getAdrsBookData.filter(a => a.network === chainId && a.owner === account)

    console.log('newdata', newdata)

    const data = newdata && newdata.map((i, index) => {
        return (
            <Col key={index} className="my-1 d-flex flex-column justify-content-start">
                {globalAdrs === i.adrs && globalNickName === i.nickname ? null : (
                    <Button color='primary' outline caret onClick={() => {
                        setAdrsBookValue(i.adrs)
                        handleadrsbookModal()
                    }}>
                        <span>{i.nickname}</span>
                        {/* <h5 className="mb-0">{i.nickname}</h5> */}
                        {/* <h6 className="mb-0">{shortenIfAddress(i.adrs)}</h6> */}
                    </Button>
                )}
            </Col>
        )
    })

    return (
        <>
            <Modal className='modal-dialog-centered' isOpen={openadrsbookselect} toggle={() => handleadrsbookModal()}>
                <ModalHeader tag='h2' toggle={() => handleadrsbookModal()}>
                    Select an Address.
                </ModalHeader>
                <ModalBody>
                    {data}
                </ModalBody>
            </Modal>
        </>
    )
}

// export default AdrsBookSelect
const mapStateToProps = (state) => ({
    globalAdrs: state.appData.globalAdrs,
    globalNickName: state.appData.globalNickName,
})
const mapDispatchToProp = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProp)(AdrsBookSelect)