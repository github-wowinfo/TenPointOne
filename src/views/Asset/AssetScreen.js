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
    Button,
    NavLink
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
import { BsArrowRightCircle } from 'react-icons/bs'
import LoginModal from '../LoginModal'
import * as AppData from '../../redux/actions/cookies/appDataType'

// const currencyOptions = [
//     { value: 'usd', label: 'USD' },
//     { value: 'inr', label: 'INR' }
// ]

const Asset = ({ globalAdrs, globalNickName, globalVaultFlag, dispatch }) => {

    const { account, chainId } = useEthers()

    const isConnected = account !== undefined

    const [loginModal, setLoginModal] = useState(false)
    const disconnect = () => {
        window.location.href = '/home'
        setLoginModal(!loginModal)
    }

    console.log('loginModal', loginModal)

    useEffect(() => {
        if (!isConnected) {
            setLoginModal(!loginModal)
        }
    }, [account, chainId])

    const [curr_acc, setCurr_Acc] = useState(account)
    const [vaultList, setVaultList] = useState([])
    const getVaultListFromLocal = () => {
        const getdata = JSON.parse(localStorage.getItem('vaultdata'))
        const valueData = getdata && getdata.filter(a => a.show === true && a.network === chainId && a.owner === account)
        const vaultlist = valueData && valueData.map((vault, index) => ({ value: index, adrs: vault.address, name: vault.name }))
        console.log('vaultlist', vaultlist)
        if (vaultlist === null || vaultlist === [] || vaultlist.length === 0) {
            dispatch(AppData.globalAdrs(''))
            dispatch(AppData.globalNickName('Create a Vault'))
        } else {
            console.log('vaultlist', vaultlist)
            dispatch(AppData.globalAdrs(vaultlist[0].adrs))
            dispatch(AppData.globalNickName(vaultlist[0].name))
            // setVaultList(vaultlist)
        }
    }
    useEffect(() => {
        if (globalNickName === '' || globalNickName === 'Create a Vault') {
            getVaultListFromLocal()
            // dispatch(AppData.globalNickName(''))
        } else if (curr_acc !== account) {
            setCurr_Acc(account)
            getVaultListFromLocal()
        }
    }, [account, globalVaultFlag])

    const [curt_account, setCurt_account] = useState(account)
    const [curt_chain, setCurt_chain] = useState(chainId)
    const MySwal = withReactContent(Swal)

    const netchange = async (netid) => {
        await ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: `${netid}` }] })
    }
    const accountChange = async () => {
        await ethereum.request({ method: "wallet_requestPermissions", params: [{ eth_accounts: {} }] })
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

    const handleAccount = () => {
        return MySwal.fire({
            title: 'Your account is Changed!',
            // text: `Current network is "${helperConfig.network[chainId].name}"`,
            allowOutsideClick: false,
            showCancelButton: true,
            confirmButtonText: `Continue with current account ("${shortenIfAddress(account)}"), and log in again `,
            cancelButtonText: `Stay on previous account ("${shortenIfAddress(curt_account)}"), and log in again`,
            customClass: {
                confirmButton: 'btn btn-primary mx-1',
                cancelButton: 'btn btn-danger my-1'
            },
            showClass: {
                popup: 'animate__animated animate__flipInX'
            },
        }).then(function (result) {
            if (result.isConfirmed) {
                disconnect()
            } else if (result.isDismissed) {
                disconnect()
                accountChange()
            }
        })
    }

    console.log('curt_account', curt_account)

    useEffect(() => {
        if (chainId !== undefined && curt_chain !== undefined && chainId !== curt_chain) {
            handleAjax()
        }
        if (curt_account !== undefined && account !== undefined && account !== curt_account) {
            handleAccount()
            setCurt_account(account)
        }
    }, [chainId, account])

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
                const asset_data = response.data
                if (asset_data.length === 0) {
                    setLoading(false)
                }
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
            name: 'Amount',
            maxWidth: '150px',
            right: true,
            // right: true,
            selector: row => (
                <span className='align-middle font-weight-bold'>
                    {

                        (row.balance && (row.balance / (10 ** row.contract_decimals))).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 6 })

                    }
                </span>

            )
        },
        {
            name: '$ value',
            right: true,
            selector: row => (
                <span className='align-middle font-weight-bold'>
                    {
                        row.balance && `$${(row.balance / (10 ** row.contract_decimals) * row.quote_rate).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
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
            <>
                {globalNickName === 'Create a Vault' ? (
                    <Col className='d-flex justify-content-center align-items-center' md={{ offset: 3, size: 6 }} sm="12">
                        <Card className='my-1 card-payment'>
                            <CardHeader style={{ paddingBottom: '.3em' }}>
                                <CardTitle>Assets</CardTitle>
                            </CardHeader>
                            <hr />
                            <Col style={{ fontSize: '2em' }} className='d-flex flex-row justify-content-center align-items-center'>
                                <NavLink href='/manager' >
                                    CREATE A VAULT <BsArrowRightCircle size={35} />
                                </NavLink>
                            </Col>
                        </Card>
                    </Col>
                ) : (
                    <>
                        <Card className='my-1'>
                            <CardBody className='px-1'>
                                <Row className='d-flex flex-row justify-content-between'>
                                    <Col>
                                        <CardHeader className='px-0'>
                                            <CardTitle>Assets</CardTitle>
                                        </CardHeader>
                                        <CardBody className='px-0'>
                                            <CardText>View all your assets here</CardText>
                                        </CardBody>
                                    </Col>

                                    <Col className='d-flex flex-column align-items-end pb-0'>
                                        <CardBody className='px-0 pb-0 pt-2'>
                                            <h3 className='mb-0 pb-1'>${sum.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</h3>
                                        </CardBody>
                                        <CardHeader className='pr-0 pt-0'>
                                            <CardTitle>Total Balance</CardTitle>
                                        </CardHeader>
                                    </Col>

                                    {/* <Col className='mt-2 d-flex flex-column align-items-end'> */}
                                    {/* <Col className='mt-1 mb-0' md='6' sm='6'>
                                            <Input type='select' name='select' id='select-basic'>
                                                <option>USD</option>
                                                <option>INR</option>
                                                <option>SAR</option>
                                            </Input>
                                        </Col> */}
                                    {/* <Col className='d-flex flex-column align-items-end pb-0'>
                                            <CardTitle className='mb-25' tag='h4'>
                                                TOTAL BALANCE
                                            </CardTitle>
                                            <CardTitle>${sum.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</CardTitle> */}
                                    {/* <CardText className='mb-0'>Total balance</CardText> */}
                                    {/* </Col> */}
                                    {/* </Col> */}
                                </Row>
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

                        {/* <Card>
                            <CardHeader>
                                <CardTitle>Check Assets of any other Address</CardTitle>
                            </CardHeader>
                            <CardBody className='d-flex flex-row justify-content-between'>
                                <Input className='mx-1' type='text' placeholder="Add address of the account to see it's assests" onChange={handleChange} />
                                <Button color='primary round' onClick={handleClick}>
                                    Search
                                </Button>
                            </CardBody>
                        </Card> */}
                    </>
                )}
            </>
            <LoginModal openloginmodal={loginModal} disconnect={disconnect} />
        </>

    )
}
// export default Asset
const mapStateToProps = (state) => ({
    globalAdrs: state.appData.globalAdrs,
    globalNickName: state.appData.globalNickName,
    globalVaultFlag: state.appData.globalVaultFlag
})
const mapDispatchToProp = dispatch => ({ dispatch })
export default connect(mapStateToProps, mapDispatchToProp)(Asset)