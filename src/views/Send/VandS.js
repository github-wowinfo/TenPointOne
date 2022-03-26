import { shortenIfAddress, useEthers } from "@usedapp/core"
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap"
import { GiCircleCage, GiHobbitDoor, GiShipWheel } from 'react-icons/gi'
import * as AppData from '../../redux/actions/cookies/appDataType'
import { connect } from "react-redux"
import { Plus } from "react-feather"


const VandS = ({ globalAdrs, globalNickName, handleadrsbookModal, setAdrsBookValue }) => {
    const { account, chainId } = useEthers()

    //getting local vault data
    const localVaultData = JSON.parse(localStorage.getItem('vaultdata'))
    //Filtering local vault data
    const vdata = localVaultData && localVaultData.filter(v => v.owner === account && v.network === chainId)
    //getting local sega data
    const localSegaData = JSON.parse(localStorage.getItem('segadata'))
    //Filtering local sega data
    const sdata = localSegaData && localSegaData.filter(s => s.owner === account && s.network === chainId)

    return (
        <Card style={{ height: '100%' }}>
            <CardHeader>
                <h3>Vaults & Segas</h3>
            </CardHeader>
            <CardBody>
                {vdata && vdata.map((i, index) => {
                    return (
                        <>
                            <Row>
                                <Col key={index} className='pt-1 d-flex flex-row justify-content-between align-items-center'>
                                    <input type='radio' disabled />
                                    <Col>
                                        <h5 className=' mb-0 text-wrap'>{i.name}</h5>
                                        <h6 className=' font-weight-light'>{shortenIfAddress(i.address)}</h6>
                                    </Col>
                                    {globalAdrs === i.address && globalNickName === i.name ? (
                                        <Button.Ripple size='sm' className='btn-icon' outline color='secondary' disabled>
                                            <Plus size={16} />
                                        </Button.Ripple>
                                    ) : (
                                        <Button.Ripple size='sm' className='btn-icon' outline color='primary'
                                            onClick={() => {
                                                setAdrsBookValue(i.address)
                                                handleadrsbookModal()
                                            }}
                                        >
                                            <Plus size={16} />
                                        </Button.Ripple>
                                    )
                                    }
                                </Col>
                            </Row>
                            {sdata && sdata.map((j, index) => {
                                return (
                                    <>
                                        {j.vault === i.address ? (
                                            <Row className='ml-2'>
                                                <Col className='pt-1 d-flex justify-content-between align-items-center line-adrs-send' key={index}>
                                                    {globalAdrs === j.address && globalNickName === j.name ? (
                                                        <Col>
                                                            <h5 className='mb-0 text-wrap'>{j.name}</h5>
                                                            <h6 className='font-weight-light '>{shortenIfAddress(j.address)}</h6>
                                                        </Col>
                                                    ) : (
                                                        <Col>
                                                            <h5 className='mb-0 text-wrap'>{j.name}</h5>
                                                            <h6 className='font-weight-light '>{shortenIfAddress(j.address)}</h6>
                                                        </Col>
                                                    )}
                                                    {globalAdrs === j.address && globalNickName === j.name ? (
                                                        <Button.Ripple size='sm' className='btn-icon' outline color='secondary' disabled>
                                                            <Plus size={16} />
                                                        </Button.Ripple>
                                                    ) : (
                                                        <Button.Ripple size='sm' className='btn-icon' outline color='primary'
                                                            onClick={() => {
                                                                setAdrsBookValue(j.address)
                                                                handleadrsbookModal()
                                                            }}
                                                        >
                                                            <Plus size={16} />
                                                        </Button.Ripple>
                                                    )
                                                    }
                                                </Col>
                                            </Row>
                                        ) : null}
                                    </>
                                )
                            })}
                        </>
                    )
                })}
            </CardBody>
        </Card>
    )
}

// export default VandS
const mapStateToProps = (state) => ({
    globalAdrs: state.appData.globalAdrs,
    globalNickName: state.appData.globalNickName,
})
const mapDispatchToProp = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProp)(VandS)