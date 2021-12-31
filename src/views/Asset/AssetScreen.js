import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { selectThemeColors } from '@utils'
import {
    Card,
    Table,
    CardBody,
    Row,
    Col,
    Input,
    CardTitle,
    CardText,
    CardFooter,
    CardHeader,
    Button
} from 'reactstrap'
import Icon from 'react-crypto-icons'
import DataTable from 'react-data-table-component'
import data from './data'
import { ChevronDown } from 'react-feather'
import Avatar from '@components/avatar'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import axios from 'axios'
import { useEthers } from '@usedapp/core'
import { useCoingeckoPrice } from '@usedapp/coingecko'
import helperConfig from "../../helper-config.json"
import { isAddress } from 'ethers/lib/utils'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

// const currencyOptions = [
//     { value: 'usd', label: 'USD' },
//     { value: 'inr', label: 'INR' }
// ]

const Asset = ({ globalAdrs, globalNickName }) => {

    const { account, chainId } = useEthers()

    const isConnected = account !== undefined

    const disconnect = () => {
        window.location.href = '/login'
    }

    const [curt_chain, setCurt_chain] = useState(chainId)
    const MySwal = withReactContent(Swal)

    const netchange = async (netid) => {
        await ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: `${netid}` }] })
    }
    const handleAjax = () => {
        return MySwal.fire({
            title: 'Do you want to change your current network?',
            // text: `Current network is "${helperConfig.network[chainId].name}"`,
            allowOutsideClick: false,
            showCancelButton: true,
            confirmButtonText: `Switch metamask to "${helperConfig.network[chainId].name} and log in again"`,
            cancelButtonText: `Stay on "${helperConfig.network[curt_chain].name}" and log in again`,
            customClass: {
                confirmButton: 'btn btn-primary mx-1',
                cancelButton: 'btn btn-danger my-1'
            },
            showClass: {
                popup: 'animate__animated animate__flipInX'
            },
        }).then(function (result) {
            if (result.isConfirmed) {
                netchange(helperConfig.network[chainId].netid)
                disconnect()
            } else if (result.isDismissed) {
                disconnect()
                netchange(helperConfig.network[curt_chain].netid)
            }
        })
    }

    useEffect(() => {
        if (chainId !== curt_chain) {
            handleAjax()
        }
    }, [chainId])

    const [assetList, setAssetList] = useState([])
    const [sum, setSum] = useState(0)

    const [custom_adrs, setCustom_adrs] = useState('')
    const [have_custom_adrs, setHave_custom_adrs] = useState(false)

    const handleChange = (e) => {
        const entered_adrs = e.target.value
        if (isAddress(entered_adrs)) {
            setCustom_adrs(entered_adrs)
        }
    }
    const handleClick = () => {
        if (custom_adrs !== "") {
            setHave_custom_adrs(!have_custom_adrs)
        } else {
            alert('Enter an Address')
        }
    }

    const getTokenBalance = async () => {
        try {
            // const response = await axios.get(`https://api.unmarshal.com/v1/matic/address/0x989923d33bE0612680064Dc7223a9f292C89A538/assets?auth_key=CE2OvLT9dk2YgYAYfb3jR1NqCGWGtdRd1eoikUYs`)

            if (have_custom_adrs) {
                const response = await axios.get(`https://api.unmarshal.com/v1/${helperConfig.unmarshal[chainId]}/address/${custom_adrs}/assets?auth_key=CE2OvLT9dk2YgYAYfb3jR1NqCGWGtdRd1eoikUYs`)
                console.log('response_have_custom_adrs', response)
                setAssetList(response.data)
                const balance = response.data.map(item => item.balance / (10 ** item.contract_decimals) * item.quote_rate).reduce((acc, curr) => acc + curr, 0)
                setSum(balance)
                console.log(balance)
            } else {
                const response = await axios.get(`https://api.unmarshal.com/v1/${helperConfig.unmarshal[chainId]}/address/${globalAdrs}/assets?auth_key=CE2OvLT9dk2YgYAYfb3jR1NqCGWGtdRd1eoikUYs`)
                console.log('response', response)
                setAssetList(response.data)
                const balance = response.data.map(item => item.balance / (10 ** item.contract_decimals) * item.quote_rate).reduce((acc, curr) => acc + curr, 0)
                setSum(balance)
                console.log(balance)
            }

        } catch (error) {
            setAssetList([])
            console.log(`Asset [getTokkenBalance]`, error)
        }
    }
    console.log('assetList', assetList)
    useEffect(() => {
        getTokenBalance()
    }, [chainId, account, sum, have_custom_adrs, globalAdrs])

    const addDefaultSrc = (ev) => {
        ev.target.src = require(`@src/assets/images/logo/question.jpg`).default

    }

    const columns = [
        {
            name: 'Asset',
            selector: row => (
                <div className='align-middle font-weight-bold'>
                    <img src={row.logo_url && row.logo_url} alt={row.contract_ticker_symbol} style={{ height: 40, width: 40, marginRight: 10 }} onError={addDefaultSrc} />
                    {row.contract_ticker_symbol}
                </div>
            )
        },
        {
            name: 'Balance',
            selector: row => (
                <span className='align-middle font-weight-bold'>
                    {

                        row.balance && (row.balance / (10 ** row.contract_decimals)).toFixed(6)

                    }
                </span>

            )
        },
        {
            name: '$ value',
            selector: row => (
                <span className='align-middle font-weight-bold'>
                    {
                        row.balance && `$${(row.balance / (10 ** row.contract_decimals) * row.quote_rate).toLocaleString()}`
                    }
                </span>
            )
        }
    ]

    const tablestyle = {
        headCells: {
            style: {
                TextAlign: 'center',
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
    // const etherPrice = useCoingeckoPrice('01coin', 'usd')

    return (
        <>


            {isConnected ? (<>
                {/* <Row>
                    <Col>
                        <p>${etherPrice}</p>
                    </Col>
                </Row> */}
                <Card className='my-1'>
                    <CardBody>
                        <Row>
                            <Col >
                                <CardHeader>
                                    <CardTitle >Asset</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <CardText>View all your assets here</CardText>
                                </CardBody>
                            </Col>

                            <Col className='mb-1' md='2' sm='12'>
                                <Input type='select' name='select' id='select-basic'>
                                    <option>USD</option>
                                    <option>INR</option>
                                    <option>SAR</option>
                                </Input>
                            </Col>
                        </Row>
                        <div className='d-flex flex-column align-items-end pb-0'>
                            <CardTitle className='mb-25' tag='h4'>
                                Total balance: ${sum}
                            </CardTitle>
                            {/* <CardText className='mb-0'>Total balance</CardText> */}
                        </div>
                    </CardBody>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Check assest for an Address</CardTitle>
                    </CardHeader>
                    <CardBody className='d-flex flex-row justify-content-between'>
                        <Input className='mx-1' type='text' placeholder="Add address of the account to see it's assests" onChange={handleChange} />
                        <Button color='primary round' onClick={handleClick}>
                            Search
                        </Button>
                    </CardBody>
                </Card>
                <Card>
                    <DataTable
                        className='react-dataTable'
                        noHeader
                        customStyles={tablestyle}
                        data={assetList}
                        columns={columns}
                        sortIcon={<ChevronDown size={10} />}
                    />
                </Card>
            </>) : disconnect()}
        </>

    )
}
// export default Asset
const mapStateToProps = (state) => ({
    globalAdrs: state.appData.globalAdrs,
    globalNickName: state.appData.globalNickName
})
export default connect(mapStateToProps, null)(Asset)