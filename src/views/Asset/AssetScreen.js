import React, { useState, useEffect } from 'react'
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
import DataTable from 'react-data-table-component'
import data from './data'
import { ChevronDown } from 'react-feather'
import Avatar from '@components/avatar'
import '@styles/react/libs/tables/react-dataTable-component.scss'

import axios from 'axios'

// const currencyOptions = [
//     { value: 'usd', label: 'USD' },
//     { value: 'inr', label: 'INR' }
// ]

const Asset = () => {
    const [assetList, setAssetList] = useState([])

    const getTokenBalance = async () => {
        try {
            const response = await axios.get(`https://api.unmarshal.com/v1/matic/address/0x989923d33bE0612680064Dc7223a9f292C89A538/assets?auth_key=CE2OvLT9dk2YgYAYfb3jR1NqCGWGtdRd1eoikUYs`)
            setAssetList(response.data)

        } catch (error) {
            console.log(`Asset [getTokkenBalance]`, error)
        }
    }

    useEffect(() => {
        getTokenBalance()
        return () => {

        }
    }, [])

    const columns = [
        {
            name: 'Asset',
            selector: row => (
                <div>
                    <img src={row.logo_url} alt={row.contract_ticker_symbol} style={{ height: 45, width: 45, marginRight: 10 }} />
                    {row.contract_ticker_symbol}
                </div>
            )
        },
        {
            name: 'Balance',
            selector: row => row.balance
        },
        {
            name: 'First value',
            selector: row => row.quote
        }
    ]


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
                <DataTable
                    className='react-dataTable'
                    noHeader
                    data={assetList}
                    columns={columns}
                    sortIcon={<ChevronDown size={10} />}
                />
            </Card>
        </>
    )
}
export default Asset