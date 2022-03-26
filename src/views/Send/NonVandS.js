import { shortenIfAddress, useEthers } from "@usedapp/core"
import { Plus } from "react-feather"
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap"

const NonVandS = ({ handleadrsbookModal, setAdrsBookValue }) => {
    const { account, chainId } = useEthers()

    //getting local adrsbook data
    const localAdrsData = JSON.parse(localStorage.getItem('adrsbook'))
    //filterinf addressbook data
    const adata = localAdrsData && localAdrsData.filter(a => a.owner === account && a.network === chainId)

    //getting local vault data
    const localVaultData = JSON.parse(localStorage.getItem('vaultdata'))
    //filtering vault addresses
    const vdata = localVaultData && localVaultData.filter(v => v.owner === account && v.network === chainId)

    //getting local sega data
    const localSegaData = JSON.parse(localStorage.getItem('segadata'))
    //filtering sega addresses
    const sdata = localSegaData && localSegaData.filter(s => s.owner === account && s.network === chainId)

    const NonRpaAdrs = []

    adata.forEach(data => {
        if (vdata.find(i => i.address === data.adrs && i.network === chainId) || sdata.find(i => i.address === data.adrs && i.network === chainId)) {
            console.log('nothing')
        } else {
            NonRpaAdrs.push(data)
        }
    })

    console.log('NonRpaAdrs', NonRpaAdrs)

    return (
        <Card style={{ height: '100%' }}>
            <CardHeader>
                <h3>Other Addresses</h3>
            </CardHeader>
            <CardBody>
                {NonRpaAdrs.length === 0 ? (
                    <div className="text-center">
                        <h4>No other addresses.</h4>
                    </div>
                ) : (
                    <>
                        {NonRpaAdrs && NonRpaAdrs.map(i => {
                            return (
                                <Row>
                                    <Col className='pt-1 d-flex justify-content-between align-items-center'>
                                        <div className="d-flex flex-column">
                                            <h5 className="mb-0">{i.nickname}</h5>
                                            <h6 className="font-weight-light">{shortenIfAddress(i.adrs)}</h6>
                                        </div>
                                        <Button.Ripple size='sm' className='btn-icon' outline color='primary'
                                            onClick={() => {
                                                setAdrsBookValue(i.adrs)
                                                handleadrsbookModal()
                                            }}
                                        >
                                            <Plus size={16} />
                                        </Button.Ripple>
                                    </Col>
                                </Row>
                            )
                        })}
                    </>
                )}
            </CardBody>
        </Card>
    )
}

export default NonVandS