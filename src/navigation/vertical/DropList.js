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
    }, [account, chainId])

    // const handleGlobalAdrs = (adrs, name) => {
    //     dispatch(AppData.globalAdrs(adrs))
    //     dispatch(AppData.globalNickName(name))
    // }

    const [nick_name, setNick_Name] = useState('')
    const [adrs, setAdrs] = useState('')
    const handleChange = (e, name) => {
        const value = e.target.value
        if (isAddress(value)) {
            setAdrs(value)
            setNick_Name(name)
        }
    }

    const handleGlobalAdrs = () => {
        // console.log('adrs', adrs)
        // console.log('nick_name', nick_name)
        dispatch(AppData.globalAdrs(adrs))
        dispatch(AppData.globalNickName(nick_name))
    }

    const CloseBtn = <X className='cursor-pointer' size={15} onClick={() => {
        handleDropList()
        setAdrs('')
        setNick_Name('')
    }} />
    return (
        <div>
            <Modal
                isOpen={opendroplist}
                toggle={() => {
                    handleDropList()
                    setAdrs('')
                    setNick_Name('')
                }}
                className='sidebar-sm'
                modalClassName='modal-slide-in'
                contentClassName='py-0' >
                <ModalHeader className='mb-1' close={CloseBtn} tag='div' toggle={() => {
                    handleDropList()
                    setAdrs('')
                    setNick_Name('')
                }}>
                    Select a Vault or Sega
                </ModalHeader>
                <ModalBody className='flex-grow-1'>
                    <Form>
                        <FormGroup check>
                            {vaultList.map((i, index) => {
                                return (
                                    <>
                                        <Label check>
                                            <Input key={index} name='vaults' type='radio' value={i.adrs} onChange={e => handleChange(e, i.name)} />
                                            <Row className='d-flex flex-row justify-content-between'>
                                                <Col className='d-flex flex-column'>
                                                    <h6>{i.name}</h6>
                                                    <h6 className='font-weight-light'>{shortenIfAddress(i.adrs)}</h6>
                                                </Col>
                                                <Col>
                                                    <FaRegCopy color='grey' size={15} />
                                                    <a href={getExplorerAddressLink(i.adrs, chainId)} target='_blank'><GoLinkExternal color='grey' size={15} /></a>
                                                </Col>
                                            </Row>
                                        </Label>
                                        {segaList.map((j, index) => {
                                            return (
                                                <>
                                                    {j.ofvault === i.adrs ? <FormGroup check>
                                                        <Label check>
                                                            <Input key={index} id={index} type='radio' name='vaults' value={j.adrs} onChange={e => handleChange(e, j.name)} />
                                                            <Row className='d-flex flex-row justify-content-between'>
                                                                <Col className='d-flex flex-column'>
                                                                    <h6>{j.name}</h6>
                                                                    <h6 className='font-weight-light'>{shortenIfAddress(j.adrs)}</h6>
                                                                </Col>
                                                                <Col>
                                                                    <FaRegCopy color='grey' size={15} />
                                                                    <a href={getExplorerAddressLink(j.adrs, chainId)} target='_blank'><GoLinkExternal color='grey' size={15} /></a>
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
                <ModalFooter>
                    <Button.Ripple color='primary' onClick={() => {
                        handleGlobalAdrs()
                        setAdrs('')
                        setNick_Name('')
                        handleDropList()
                    }} >OK</Button.Ripple>
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