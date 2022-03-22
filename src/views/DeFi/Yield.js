import React, { Fragment } from 'react'
import Icon from 'react-crypto-icons'
import DataTable from 'react-data-table-component'
import { ChevronDown } from 'react-feather'
import { Card, CardHeader, CardTitle, Col, Row } from 'reactstrap'
// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

const Yield = () => {
    // const tablestyle = {
    //     headCells: {
    //         style: {
    //             fontSize: '1em'
    //         }
    //     },
    //     cells: {
    //         style: {
    //             fontSize: '1em'
    //         }
    //     },
    //     rows: {
    //         style: {
    //             minHeight: '4em',

    //         }
    //     }
    // }

    const tablestyle = {
        headCells: {
            style: {
                fontWeight: '500',
                fontSize: '1.285rem',
                color: '#6e6b7b'
            }
        },
        cells: {
            style: {
                fontSize: '1.3em',
                minHeight: '5em'
            }
        },
        rows: {
            style: {
                minHeight: '5em'
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
                    {/* <Avatar size='lg' icon={<Icon name={row.icon} size={30} />} onError={addDefaultSrc} className='mr-1' /> */}
                    <Icon name={row.icon} size={30} />
                    <span className='font-weight-bold ml-1'>{row.name}</span>
                </div>
            )
        },
        {
            name: 'Balance',
            selector: 'balance',
            cell: row => (
                <div>
                    <h4>{row.balance}</h4>
                    <h5>
                        {row.balance1 !== 0 && <label>$ {row.balance1}</label>}
                    </h5>
                </div>
            )
        },
        {
            name: 'APY',
            selector: 'apy',
            sortable: true,
            cell: row => (
                <div >
                    <h4>{row.apy}</h4>
                </div>
            )
        },
        {
            name: '',
            selector: 'apy1',
            cell: row => (
                <div>
                    <h4>
                        <strong>{row.apy1}</strong>
                    </h4>
                    {/* <label style={{
                        padding: 2,
                        borderStyle: 'solid',
                        borderWidth: 1
                    }}>
                    <Icon name='matic' size={8} /> <strong>{row.apy1}</strong>
                    </label> */}
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
            <Card>
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
            </Card>
        </>
    )
}

export default Yield