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
import DataTable from 'react-data-table-component'
import data from './data'
import { ChevronDown } from 'react-feather'
import '@styles/react/libs/tables/react-dataTable-component.scss'


const currencyOptions = [
    { value: 'usd', label: 'USD' },
    { value: 'inr', label: 'INR' }
]


const Asset = () => {
    const columns = [
        {
            name: 'Asset',
            selector: row => (
                <div>
                    {row.icon}
                    {row.name}
                </div>
            )
        },
        {
            name: 'Balance',
            selector: row => row.balance
        },
        {
            name: 'First value',
            selector: row => row.firstvalue
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
                    data={data}
                    columns={columns}
                    sortIcon={<ChevronDown size={10} />}
                />
            </Card>
        </>
    )
}
export default Asset