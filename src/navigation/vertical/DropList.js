import React, { Fragment, useEffect, useState } from 'react'
import { Button, Col, DropdownItem, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap'
import { useEthers, shortenIfAddress, getExplorerAddressLink } from '@usedapp/core'
import Avatar from '@components/avatar'
import { FaRegCopy } from 'react-icons/fa'
import { GoLinkExternal } from 'react-icons/go'
import { connect } from 'react-redux'
import * as AppData from '../../redux/actions/cookies/appDataType'
import { isAddress } from "ethers/lib/utils"
import { X } from 'react-feather'
import CopyAdrsDropList from './CopyAdrsDropList'

const DropList = ({ opendroplist, handleDropList, globalAdrs, dispatch, globalNickName }) => {

    const { account, chainId } = useEthers()

    const [vaultList, setVaultList] = useState([])
    const [segaList, setSegaList] = useState([])

    const getVaultListFromLocal = () => {
        const getdata = JSON.parse(localStorage.getItem('vaultdata'))
        const valueData = getdata && getdata.filter(a => a.show === true && a.network === chainId && a.owner === account)
        const vaultlist = valueData && valueData.map((vault, index) => ({ value: index, adrs: vault.address, name: vault.name }))
        setVaultList(vaultlist)
    }

    const getSegaListFromLocal = () => {
        const getdata = JSON.parse(localStorage.getItem('segadata'))
        const valueData = getdata && getdata.filter(a => a.show === true && a.network === chainId && a.owner === account)
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

    const CloseBtn = <X className='cursor-pointer' size={15} onClick={() => {
        handleDropList()
        setAdrs('')
        setNick_Name('')
        setSelect_Flag(false)
    }} />
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
                className='sidebar-sm'
                modalClassName='modal-slide-in'
                contentClassName='py-0' >
                <ModalHeader className='mb-1' close={CloseBtn} tag='div' toggle={() => {
                    handleDropList()
                    setAdrs('')
                    setNick_Name('')
                    setSelect_Flag(false)
                }}>
                    <h3>Select Account</h3>
                </ModalHeader>
                <ModalBody className='flex-grow-1'>
                    <Form>
                        <FormGroup check>
                            {vaultList && vaultList.map((i, index) => {
                                return (
                                    <>
                                        <Label check>
                                            <Row style={{ width: '-webkit-fill-available' }} className='d-flex flex-row justify-content-between'>
                                                <Col className='pt-1 pr-0'>
                                                    <Input key={index} name='vaults' type='radio' value={i.adrs} onChange={e => handleChange(e, i.name)} />
                                                </Col>
                                                <Col className='d-flex flex-column'>
                                                    <h4 className='mb-0'>{i.name}</h4>
                                                    <h6 className='font-weight-light'>{shortenIfAddress(i.adrs)}</h6>
                                                </Col>
                                                <Col className='mt-1 d-flex flex-row justify-content-between'>
                                                    {/* <FaRegCopy color='grey' size={15} /> */}
                                                    <CopyAdrsDropList item={i} />
                                                    <a href={getExplorerAddressLink(i.adrs, chainId)} target='_blank'><GoLinkExternal color='grey' size={20} /></a>
                                                </Col>
                                            </Row>
                                        </Label>
                                        {segaList && segaList.map((j, index) => {
                                            return (
                                                <>
                                                    {j.ofvault === i.adrs ? <FormGroup check>
                                                        <Label check>
                                                            <Row style={{ width: '-webkit-fill-available' }} className='d-flex flex-row justify-content-between'>
                                                                <Col className='pt-1 pr-0'>
                                                                    <Input key={index} id={index} type='radio' name='vaults' value={j.adrs} onChange={e => handleChange(e, j.name)} />
                                                                </Col>
                                                                <Col className='d-flex flex-column'>
                                                                    <h4 className='mb-0'>{j.name}</h4>
                                                                    <h6 className='font-weight-light'>{shortenIfAddress(j.adrs)}</h6>
                                                                </Col>
                                                                <Col className='mt-1 d-flex flex-row justify-content-between'>
                                                                    {/* <FaRegCopy color='grey' size={15} /> */}
                                                                    <CopyAdrsDropList item={j} />
                                                                    <a href={getExplorerAddressLink(j.adrs, chainId)} target='_blank'><GoLinkExternal color='grey' size={20} /></a>
                                                                </Col>
                                                            </Row>
                                                        </Label>
                                                    </FormGroup> : null}
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
                        <Button.Ripple color='primary' onClick={() => {
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