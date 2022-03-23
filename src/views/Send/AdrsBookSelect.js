import { ChainId, shortenIfAddress, useEthers } from "@usedapp/core"
import { connect } from "react-redux"
import { Button, CardSubtitle, CardTitle, Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap"
import * as AppData from '../../redux/actions/cookies/appDataType'
import { GiCircleCage, GiHobbitDoor, GiShipWheel } from 'react-icons/gi'

const AdrsBookSelect = ({ globalAdrs, globalNickName, openadrsbookselect, handleadrsbookModal, setAdrsBookValue }) => {

    const { account, chainId } = useEthers()

    // const getAdrsBookData = JSON.parse(localStorage.getItem('adrsbook'))

    // const newdata = getAdrsBookData && getAdrsBookData.filter(a => a.network === chainId && a.owner === account)

    // const data = newdata && newdata.map((i, index) => {
    //     return (
    //         <Col key={index} className="my-1 d-flex flex-column justify-content-start">
    //             {globalAdrs === i.adrs && globalNickName === i.nickname ? null : (
    //                 <Button color='primary' outline caret onClick={() => {
    //                     setAdrsBookValue(i.adrs)
    //                     handleadrsbookModal()
    //                 }}>
    //                     <span>{i.nickname}</span>
    //                     {/* <h5 className="mb-0">{i.nickname}</h5> */}
    //                     {/* <h6 className="mb-0">{shortenIfAddress(i.adrs)}</h6> */}
    //                 </Button>
    //             )}
    //         </Col>
    //     )
    // })

    //getting local vault data
    const localVaultData = JSON.parse(localStorage.getItem('vaultdata'))
    //Filtering local vault data
    const vdata = localVaultData && localVaultData.filter(v => v.owner === account && v.network === chainId)
    //getting local sega data
    const localSegaData = JSON.parse(localStorage.getItem('segadata'))
    //Filtering local sega data
    const sdata = localSegaData && localSegaData.filter(s => s.owner === account && s.network === chainId)

    return (
        <>
            <Modal className='modal-dialog-centered' isOpen={openadrsbookselect} toggle={() => handleadrsbookModal()}>
                <ModalHeader tag='h2' toggle={() => handleadrsbookModal()}>
                    Select an Address.
                </ModalHeader>
                <ModalBody>
                    {vdata && vdata.map((i, index) => {
                        return (
                            <>
                                <Row>
                                    <Col className='mb-1' key={index}>
                                        {globalAdrs === i.address && globalNickName === i.name ? (
                                            <Button.Ripple style={{ position: 'relative', zIndex: '100' }} className='round' color='danger'>
                                                <div className="d-flex flex-row justify-content-center align-items-center">
                                                    <GiShipWheel className="mr-1" size={35} />
                                                    <div>
                                                        <h5 style={{ color: '#ffff' }} className=' mb-0 text-wrap'>{i.name}</h5>
                                                        <h6 style={{ color: '#ffff' }} className=' font-weight-light'>{shortenIfAddress(i.address)}</h6>
                                                    </div>
                                                </div>
                                            </Button.Ripple>
                                        ) : (
                                            <Button.Ripple style={{ position: 'relative', zIndex: '100' }} className='round' color='primary' onClick={() => {
                                                setAdrsBookValue(i.address)
                                                handleadrsbookModal()
                                            }}>
                                                <div className="d-flex flex-row justify-content-center align-items-center">
                                                    <GiShipWheel className="mr-1" size={35} />
                                                    <div>
                                                        <h5 style={{ color: '#ffff' }} className=' mb-0 text-wrap'>{i.name}</h5>
                                                        <h6 style={{ color: '#ffff' }} className=' font-weight-light'>{shortenIfAddress(i.address)}</h6>
                                                    </div>
                                                </div>
                                            </Button.Ripple>
                                        )}
                                    </Col>
                                </Row>
                                {sdata && sdata.map((j, index) => {
                                    return (
                                        <>
                                            {j.vault === i.address ? (
                                                <Col style={{ marginLeft: '6em' }} className='w-50 my-1 line-adrs-send' key={index}>
                                                    {globalAdrs === j.address && globalNickName === j.name ? (
                                                        <Button.Ripple className='round' color='danger'>
                                                            <div className="d-flex flex-row justify-content-center align-items-center">
                                                                <GiCircleCage className="mr-1" size={35} />
                                                                <div>
                                                                    <h5 style={{ color: '#ffff' }} className='mb-0 text-wrap'>{j.name}</h5>
                                                                    <h6 style={{ color: '#ffff' }} className='font-weight-light '>{shortenIfAddress(j.address)}</h6>
                                                                </div>
                                                            </div>
                                                        </Button.Ripple>
                                                    ) : (
                                                        <Button.Ripple className='round' color='primary' onClick={() => {
                                                            setAdrsBookValue(j.address)
                                                            handleadrsbookModal()
                                                        }}>
                                                            <div className="d-flex flex-row justify-content-center align-items-center">
                                                                <GiCircleCage className="mr-1" size={35} />
                                                                <div>
                                                                    <h5 style={{ color: '#ffff' }} className='mb-0 text-wrap'>{j.name}</h5>
                                                                    <h6 style={{ color: '#ffff' }} className='font-weight-light '>{shortenIfAddress(j.address)}</h6>
                                                                </div>
                                                            </div>
                                                        </Button.Ripple>
                                                    )}
                                                </Col>
                                            ) : null}
                                        </>
                                    )
                                })}
                            </>
                        )
                    })}
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