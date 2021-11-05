import React from 'react'
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import {
    Card,
    Table,
    CardBody,
    Row,
    Col,
    Input
} from 'reactstrap'
import Icon from 'react-crypto-icons'


const currencyOptions = [
    { value: 'usd', label: 'USD' },
    { value: 'inr', label: 'INR' }
]


const Asset = () => {


    return (
        <>
            <Card>
                <CardBody>
                    <Row>
                        <Col >
                            <label>Asset</label>
                            <br />
                            <label>View all your assets here</label>
                        </Col>

                        <Col className='mb-1' md='2' sm='12'>
                            <Input type='select' name='select' id='select-basic'>
                                <option>USD</option>
                                <option>INR</option>
                                <option>SAR</option>
                            </Input>
                        </Col>
                    </Row>
                </CardBody>
            </Card>

            <Card>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Asset</th>
                            <th>Balance</th>
                            <th>First Value</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>

                                <Icon name='uni' size={15} />

                                <span className='align-middle font-weight-bold' style={{ marginLeft: 8 }}>UNI</span>
                            </td>
                            <td>404,373.677 UNI</td>
                            <td>
                                10,702,517,67 USD
                            </td>

                        </tr>
                        <tr>
                            <td>
                                <Icon name='eth' size={15} />
                                <span className='align-middle font-weight-bold' style={{ marginLeft: 8 }}>ETH</span>
                            </td>
                            <td>0.50377 ETH</td>
                            <td>
                                2,111.48 USD
                            </td>

                        </tr>
                        <tr>
                            <td>
                                <Icon name='wjxn' size={15} />
                                <span className='align-middle font-weight-bold' style={{ marginLeft: 8 }}>WJXN</span>
                            </td>
                            <td>10 WJXN</td>
                            <td>
                                16.48 USD
                            </td>

                        </tr>
                        <tr>
                            <td>
                                <Icon name='dai' size={15} />
                                <span className='align-middle font-weight-bold' style={{ marginLeft: 8 }}>DAI</span>
                            </td>
                            <td>0 DAI</td>
                            <td>
                                0 USD
                            </td>

                        </tr>
                        <tr>
                            <td>
                                <Icon name='usdc' size={15} />
                                <span className='align-middle font-weight-bold' style={{ marginLeft: 8 }}>USDC</span>
                            </td>
                            <td>0 USDC</td>
                            <td>
                                0 USD
                            </td>

                        </tr>
                        <tr>
                            <td>
                                <Icon name='usdt' size={15} />
                                <span className='align-middle font-weight-bold' style={{ marginLeft: 8 }}>USDT</span>
                            </td>
                            <td>0 USDT</td>
                            <td>
                                0 USD
                            </td>

                        </tr>
                    </tbody>
                </Table>
            </Card>
        </>
    )
}
export default Asset