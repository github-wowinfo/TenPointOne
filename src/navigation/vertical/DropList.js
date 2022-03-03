import React, { Fragment, useEffect, useState } from 'react'
import { Button, CardTitle, Col, DropdownItem, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap'
import { useEthers, shortenIfAddress, getExplorerAddressLink } from '@usedapp/core'
import Avatar from '@components/avatar'
import { FaRegCopy } from 'react-icons/fa'
import { GoLinkExternal } from 'react-icons/go'
import { connect } from 'react-redux'
import * as AppData from '../../redux/actions/cookies/appDataType'
import { isAddress } from "ethers/lib/utils"
import { X } from 'react-feather'
import CopyAdrsDropList from './CopyAdrsDropList'
import { GiCircleCage, GiHobbitDoor, GiShipWheel } from 'react-icons/gi'
import { SiWebmoney } from 'react-icons/si'

const DropList = ({ opendroplist, handleDropList, globalAdrs, dispatch, globalNickName }) => {

    const { account, chainId } = useEthers()

    const [vaultList, setVaultList] = useState([])
    const [segaList, setSegaList] = useState([])

    const getVaultListFromLocal = () => {
        const getdata = JSON.parse(localStorage.getItem('vaultdata'))
        const valueData = getdata && getdata.filter(a => a.network === chainId && a.owner === account)
        const vaultlist = valueData && valueData.map((vault, index) => ({ value: index, adrs: vault.address, name: vault.name }))
        setVaultList(vaultlist)
    }

    const getSegaListFromLocal = () => {
        const getdata = JSON.parse(localStorage.getItem('segadata'))
        const valueData = getdata && getdata.filter(a => a.network === chainId && a.owner === account)
        const segalist = valueData && valueData.map((sega, index) => ({ value: index, adrs: sega.address, name: sega.name, ofvault: sega.vault }))
        setSegaList(segalist)
    }

    useEffect(() => {
        getVaultListFromLocal()
        getSegaListFromLocal()
    }, [account, chainId, opendroplist, globalAdrs])

    console.log('vaultList', vaultList)
    console.log('segaList', segaList)

    // const handleGlobalAdrs = (adrs, name) => {
    //     dispatch(AppData.globalAdrs(adrs))
    //     dispatch(AppData.globalNickName(name))
    // }

    const [nick_name, setNick_Name] = useState('')
    const [adrs, setAdrs] = useState('')
    const [select_flag, setSelect_Flag] = useState(false)
    const handleChange = (e, name) => {
        const value = e.target.value
        if (isAddress(value)) {
            setAdrs(value)
            setNick_Name(name)
            setSelect_Flag(true)
        }
    }

    const handleGlobalAdrs = () => {
        // console.log('adrs', adrs)
        // console.log('nick_name', nick_name)
        dispatch(AppData.globalAdrs(adrs))
        dispatch(AppData.globalNickName(nick_name))
        // const getdata = JSON.parse(localStorage.getItem('g_acc'))
        const postdata = {
            gadrs: adrs,
            nickName: nick_name,
            owner: account,
            chain: chainId
        }
        let global_data = []
        global_data = [postdata]
        localStorage.setItem('g_acc', JSON.stringify(global_data))
    }

    const CloseBtn = <X className='cursor-pointer' size={30} onClick={() => {
        handleDropList()
        setAdrs('')
        setNick_Name('')
        setSelect_Flag(false)
    }} />
    const logos = [
        {
            // icon: <GiHobbitDoor size={30} />,
            icon: <GiCircleCage size={27} />,
            // icon: <BsSafe2 size={20} />,
            color: 'light-primary'
        },
        {
            icon: <GiShipWheel size={27} />,
            color: 'light-primary'
        }
    ]
    return (
        <div>
            <Modal
                isOpen={opendroplist}
                toggle={() => {
                    handleDropList()
                    setAdrs('')
                    setNick_Name('')
                    setSelect_Flag(false)
                }}
                className='sidebar-sm droplist'
                modalClassName='modal-slide-in'
                contentClassName='py-0' >
                <ModalHeader className='mb-1' close={CloseBtn} tag='h3' toggle={() => {
                    handleDropList()
                    setAdrs('')
                    setNick_Name('')
                    setSelect_Flag(false)
                }}>
                    {/* <h3 style={{ color: '#000080' }}>Select Account</h3> */}
                    <CardTitle className='modal-title'>Select Account</CardTitle>
                </ModalHeader>
                <ModalBody className='flex-grow-1'>
                    <Form>
                        <FormGroup check>
                            {/* <FormGroup className='decor' check> */}
                            {vaultList && vaultList.map((i, index) => {
                                return (
                                    <>
                                        {/* <Label style={{ width: '100%' }} check> */}
                                        <Row className='d-flex flex-row justify-content-around'>
                                            <Col className='d-flex flex-column'>
                                                {/* <Col className='d-flex flex-column line-vault'> */}
                                                <Input
                                                    className='mt-1'
                                                    key={index}
                                                    name='vaults'
                                                    type='radio'
                                                    value={i.adrs}
                                                    onChange={e => handleChange(e, i.name)}
                                                    style={{ transform: "scale(1.5)", zIndex: '1' }}
                                                />
                                                {/* <Avatar className='mr-1' size='md' color={logos[0].color} icon={logos[0].icon} /> */}
                                                <h4 style={{ color: '#1919d2' }} className='ml-1 mb-0 '>{i.name}</h4>
                                                <h6 className='ml-1 font-weight-light '>{shortenIfAddress(i.adrs)}</h6>
                                            </Col>
                                            <Col className='mb-1 d-flex flex-row justify-content-end align-items-center'>
                                                {/* <FaRegCopy color='grey' size={15} /> */}
                                                <Avatar className='mr-1' color={logos[0].color} icon={logos[0].icon} />
                                                <CopyAdrsDropList item={i} />
                                                <a href={getExplorerAddressLink(i.adrs, chainId)} target='_blank'><GoLinkExternal size={27} /></a>
                                            </Col>
                                        </Row>
                                        {/* <hr className='my-0' /> */}
                                        {/* </Label> */}
                                        {segaList && segaList.map((j, index) => {
                                            return (
                                                <>
                                                    {j.ofvault === i.adrs ? <>
                                                        {/* <Label style={{ width: '100%' }} check> */}
                                                        <Row className='my-1 d-flex flex-row justify-content-around'>
                                                            {/* <Col className='ml-3 w-50 d-flex flex-column'> */}
                                                            <Col className='ml-3 w-50 d-flex flex-column line-sega '>
                                                                <Input
                                                                    className='mt-1'
                                                                    key={index}
                                                                    id={index}
                                                                    type='radio'
                                                                    name='vaults'
                                                                    value={j.adrs}
                                                                    onChange={e => handleChange(e, j.name)}
                                                                    style={{ transform: "scale(1.5)" }}
                                                                />
                                                                {/* <Avatar className='mr-1' size='md' color={logos[1].color} icon={logos[1].icon} /> */}
                                                                <h4 style={{ color: '#1919d2' }} className='mb-0 ml-1'>{j.name}</h4>
                                                                <h6 className='font-weight-light mx-2'>{shortenIfAddress(j.adrs)}</h6>
                                                            </Col>
                                                            <Col className='mb-1 d-flex flex-row justify-content-end align-items-center'>
                                                                {/* <FaRegCopy color='grey' size={15} /> */}
                                                                <Avatar className='mr-1' color={logos[1].color} icon={logos[1].icon} />
                                                                <CopyAdrsDropList item={j} />
                                                                <a href={getExplorerAddressLink(j.adrs, chainId)} target='_blank'><GoLinkExternal size={27} /></a>
                                                            </Col>
                                                        </Row>
                                                        {/* <hr /> */}
                                                        {/* </Label> */}
                                                    </> : null}
                                                </>
                                            )
                                        })}
                                    </>
                                )
                            })}
                        </FormGroup>
                    </Form>
                    {/* {vaultList.map((i, index) => {
                        return (
                            <Fragment>
                                <DropdownItem href='#' tag='button' key={index} onClick={() => {
                                    handleGlobalAdrs(i.adrs, i.name)
                                }} >
                                    <Row className='d-flex flex-row justify-content-around' >
                                        <Col className='d-flex flex-column flex-start'>
                                            <span>{i.name}</span>
                                            <span>{shortenIfAddress(i.adrs)}</span>
                                        </Col>
                                        <Col>
                                            <FaRegCopy color='grey' size={20} />
                                            <a href={getExplorerAddressLink(i.adrs, chainId)} target='_blank'><GoLinkExternal color='grey' size={20} /></a>
                                        </Col>
                                        <Col>
                                            0 MATIC
                                        </Col>
                                    </Row>
                                    {segaList.map((j, index) => {
                                        return (
                                            <Fragment>
                                                {j.ofvault === i.adrs ? (<DropdownItem href='#' tag='a' key={index}>
                                                    <Row className='d-flex flex-row justify-content-around'>
                                                        <Col className='d-flex flex-column flex-start'>
                                                            <span>{j.name}</span>
                                                            <span>{shortenIfAddress(j.adrs)}</span>
                                                        </Col>
                                                        <Col>
                                                            <FaRegCopy color='grey' size={20} />
                                                            <a href={getExplorerAddressLink(j.adrs, chainId)} target='_blank'><GoLinkExternal color='grey' size={20} /></a>
                                                        </Col>
                                                        <Col>
                                                            0 MATIC
                                                        </Col>
                                                    </Row>
                                                </DropdownItem>) : null}
                                            </Fragment>
                                        )
                                    })}
                                </DropdownItem>
                            </Fragment>
                        )
                    })} */}

                </ModalBody>
                <ModalFooter className='d-flex justify-content-center'>
                    {select_flag ? (
                        <Button.Ripple size='lg' color='primary' onClick={() => {
                            handleGlobalAdrs()
                            setAdrs('')
                            setNick_Name('')
                            handleDropList()
                            setSelect_Flag(false)
                        }} >OK</Button.Ripple>
                    ) : (<Button.Ripple size='lg' color='primary' disabled >OK</Button.Ripple>)}
                </ModalFooter>
            </Modal>
        </div>
    )
}

// export default DropList
const mapStateToProps = (state) => ({
    globalAdrs: state.appData.globalAdrs,
    globalNickName: state.appData.globalNickName
})
const mapDispatchToProp = dispatch => ({ dispatch })
export default connect(mapStateToProps, mapDispatchToProp)(DropList)