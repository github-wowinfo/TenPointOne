import React, { Fragment } from 'react'
import Icon from 'react-crypto-icons'
import DataTable from 'react-data-table-component'
import { ChevronDown } from 'react-feather'
import { Card, CardHeader, CardTitle, Col, Row } from 'reactstrap'
// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

const Yield = () => {
    const tablestyle = {
        headCells: {
            style: {
                fontSize: '1em'
            }
        },
        cells: {
            style: {
                fontSize: '1em'
            }
        },
        rows: {
            style: {
                minHeight: '4em',

            }
        }
    }

    const columns = [
        {
            name: 'Asset',
            selector: 'name',
            sortable: true,
            minWidth: '150px',
            cell: row => (
                <div>
                    <Icon name={row.icon} size={20} />
                    <label className='font-weight-bold ml-1'>{row.name}</label>
                </div>
            )
        },
        {
            name: 'Your wallet balance',
            selector: 'balance',
            cell: row => (
                <div>
                    <h6>{row.balance}</h6>
                    {row.balance1 !== 0 && <label>$ {row.balance1}</label>}
                </div>
            )
        },
        {
            name: 'APY',
            selector: 'apy',
            cell: row => (
                <div >
                    <h6>{row.apy}</h6>
                    {row.apy1 && <label style={{
                        padding: 2,
                        borderStyle: 'solid',
                        borderWidth: 1
                    }}>$ {row.apy1}</label>}
                </div>
            )
        }
    ]

    const data = [
        {
            id: 1,
            icon: 'matic',
            name: 'Matic',
            balance: 0.97718,
            balance1: 1.83,
            apy: '0.31 %',
            apy1: '3.59 % API'

        },
        {
            id: 2,
            icon: 'dai',
            name: 'DAI',
            balance: '-',
            balance1: 0,
            apy: '3.54 %',
            apy1: '2.41 % API'

        },
        {
            id: 3,
            icon: 'usd',
            name: 'USD Coin',
            balance: '-',
            balance1: 0,
            apy: '3.26 %',
            apy1: '2.06 % API'

        },
        {
            id: 4,
            icon: 'usdt',
            name: 'USDT Coin',
            balance: '-',
            balance1: 0,
            apy: '12.41 %',
            apy1: '5.04 % API'

        },
        {
            id: 5,
            icon: 'weth',
            name: 'Wrapped ETH',
            balance: '-',
            balance1: 0,
            apy: '0.93 %',
            apy1: '1.85 % API'

        },
        {
            id: 6,
            icon: 'wbtc',
            name: 'WBTC Coin',
            balance: '-',
            balance1: 0,
            apy: '0.05 %',
            apy1: '0.50 % API'

        }
    ]

    return (
        <>
            <DataTable
                noHeader
                pagination
                data={data}
                columns={columns}
                customStyles={tablestyle}
                className='react-dataTable'
                sortIcon={<ChevronDown size={10} />}
                paginationPerPage={10}
                paginationRowsPerPageOptions={[5, 10, 15, 20]}
            />
        </>
    )
}

export default Yield