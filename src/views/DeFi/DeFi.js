import React, { useState, useEffect } from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink, Button, Col, Card, CardHeader, CardTitle } from 'reactstrap'
import Buy from './Buy'
import Swap from './Swap'
import Yield from './Yield'
import { useEthers } from '@usedapp/core'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import helperConfig from '../../helper-config.json'
import { connect } from 'react-redux'
import * as AppData from '../../redux/actions/cookies/appDataType'
import { BsArrowRightCircle } from 'react-icons/bs'
import LoginModal from '../LoginModal'

const DeFi = ({ dispatch, globalAdrs, globalNickName, globalVaultFlag }) => {

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

    const [active, setActive] = useState('1')

    const toggle = tab => {
        if (active !== tab) {
            setActive(tab)
        }
    }

    return (
        <>
            <React.Fragment>
                {globalNickName === 'Create a Vault' ? (
                    <Col className='d-flex justify-content-center align-items-center' md={{ offset: 3, size: 6 }} sm="12">
                        <Card className='my-1 card-payment'>
                            <CardHeader style={{ paddingBottom: '.3em' }}>
                                <CardTitle>DeFi</CardTitle>
                            </CardHeader>
                            <hr />
                            <Col style={{ fontSize: '2em' }} className='d-flex flex-row justify-content-center align-items-center'>
                                <NavLink href='manager' >
                                    CREATE A VAULT <BsArrowRightCircle size={35} />
                                </NavLink>
                            </Col>
                        </Card>
                    </Col>
                ) : (<>
                    <Card className='pt-2'>
                        <Nav tabs>
                            <div style={{ display: 'flex', flex: 1, justifyContent: 'space-evenly' }}>
                                <NavItem>
                                    <Col md={6} sm={12}>
                                        <div className='d-inline-block mr-1 mb-1'>
                                            <NavLink outline color='primary' size='lg' active={active === '1'} onClick={() => {
                                                toggle('1')
                                            }}>
                                                <CardTitle className='mb-0'>BUY</CardTitle>
                                            </NavLink>
                                        </div>
                                    </Col>
                                </NavItem>
                                <NavItem>
                                    <Col md={6} sm={12}>
                                        <div className='d-inline-block mr-1 mb-1'>
                                            <NavLink outline color='primary' size='lg' active={active === '2'} onClick={() => {
                                                toggle('2')
                                            }}>
                                                <CardTitle className='mb-0'>SWAP</CardTitle>
                                            </NavLink>
                                        </div>
                                    </Col>
                                </NavItem>
                                <NavItem>
                                    <Col md={6} sm={12}>
                                        <div className='d-inline-block mr-1 mb-1'>
                                            <NavLink outline color='primary' size='lg' active={active === '3'} onClick={() => {
                                                toggle('3')
                                            }}>
                                                <CardTitle className='mb-0'>YIELD</CardTitle>
                                            </NavLink>
                                        </div>
                                    </Col>
                                </NavItem>
                            </div>
                        </Nav>
                    </Card>
                    <TabContent className='py-50' activeTab={active}>
                        <TabPane tabId='1'>
                            <Buy />
                        </TabPane>
                        <TabPane tabId='2'>
                            <Swap />
                        </TabPane>
                        <TabPane tabId='3'>
                            <Yield />
                        </TabPane>
                    </TabContent>
                </>)}
            </React.Fragment>
            <LoginModal openloginmodal={loginModal} disconnect={disconnect} />
        </>
    )
}

// export default DeFi
const mapStateToProps = (state) => ({
    message: state.appData.appMessages,
    globalAdrs: state.appData.globalAdrs,
    globalNickName: state.appData.globalNickName,
    globalVaultFlag: state.appData.globalVaultFlag
})
const mapDispatchToProp = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProp)(DeFi)