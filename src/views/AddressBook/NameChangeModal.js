import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Button, CardTitle, Col, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap'
import * as AppData from '../../redux/actions/cookies/appDataType'
import { GiCircleCage, GiHobbitDoor, GiShipWheel } from 'react-icons/gi'
import Avatar from '@components/avatar'
import { shortenIfAddress, useEthers } from '@usedapp/core'
import { User } from 'react-feather'

const NameChangeModal = ({ openmodal, handleModal, item, dispatch, globalFavFlag, globalAdrs, globalNickName, globalVaultFlag }) => {
    const { account, chainId } = useEthers()

    const [newName, setNewName] = useState('')
    const [name_flag, setName_flag] = useState(false)

    const [is_sega, setis_sega] = useState()
    const [segaList, setSegaList] = useState([])
    const getSegaListFromLocal = () => {
        const getdata = JSON.parse(localStorage.getItem('segadata'))
        const valueData = getdata && getdata.filter(a => a.show === true && a.network === chainId && a.owner === account)
        const segalist = valueData && valueData.map((sega, index) => ({ value: index, adrs: sega.address, name: sega.name, ofvault: sega.vault }))
        setSegaList(segalist)
    }

    useEffect(() => {
        getSegaListFromLocal()
        const segaadrs = segaList && segaList.find(i => i.adrs === item.adrs)
        // console.log('segaadrs', segaadrs)
        if (segaadrs === undefined) {
            setis_sega(false)
        } else {
            setis_sega(true)
        }
    }, [item, account, chainId, is_sega])

    const logos = [
        {
            // icon: <BsSafe2 size={25} />,
            icon: <GiShipWheel size={25} />,
            color: 'primary'
        },
        {
            icon: <GiCircleCage size={25} />,
            color: 'primary'
        },
        {
            icon: <User size={25} />,
            color: 'primary'
        }
    ]

    const handleName = (e) => {
        if (e.target.value === '') {
            // alert('Name cannot be blank')
            setName_flag(false)
        } else {
            setNewName(e.target.value)
            setName_flag(true)
        }
    }
    // console.log('newName', newName)

    const handleChangeName = () => {
        const getAdrsBookList = JSON.parse(localStorage.getItem('adrsbook'))
        if (getAdrsBookList !== undefined || getAdrsBookList !== []) {
            for (const i in getAdrsBookList) {
                console.log('1')
                if (getAdrsBookList[i].adrs === item.adrs) {
                    getAdrsBookList[i].nickname = newName
                    break
                }
            }
            localStorage.setItem('adrsbook', JSON.stringify(getAdrsBookList))
        } else {
            console.log('No AddressBook data')
        }

        if (item.adrs === globalAdrs && item.nickname === globalNickName) {
            dispatch(AppData.globalNickName(newName))
        }

        const getVaultList = JSON.parse(localStorage.getItem('vaultdata'))
        if (getVaultList !== undefined || getVaultList !== []) {
            for (const i in getVaultList) {
                console.log('2')
                if (getVaultList[i].address === item.adrs) {
                    getVaultList[i].name = newName
                    break
                } else {
                    console.log('Not found in Vaultlist')
                }
            }
            localStorage.setItem('vaultdata', JSON.stringify(getVaultList))
        } else {
            console.log('No vault data')
        }

        const getSegaList = JSON.parse(localStorage.getItem('segadata'))
        if (getSegaList !== undefined || getSegaList !== []) {
            for (const i in getSegaList) {
                console.log('3')
                if (getSegaList[i].address === item.adrs) {
                    getSegaList[i].name = newName
                    break
                } else {
                    console.log('Not found in Segalist')
                }
            }
            localStorage.setItem('segadata', JSON.stringify(getSegaList))
        } else {
            console.log('No sega data')
        }

        if (globalVaultFlag === 0) {
            dispatch(AppData.globalVaultFlag(1))
        } else {
            dispatch(AppData.globalVaultFlag(0))
        }

        if (globalFavFlag === 0) {
            dispatch(AppData.globalFavFlag(1))
        } else {
            dispatch(AppData.globalFavFlag(0))
        }
        handleModal()
    }

    return (
        <>
            <Modal isOpen={openmodal} toggle={handleModal} className='modal-dialog-centered'>
                {/* <ModalHeader tag='h2' toggle={handleModal}>Edit Name of 'Address Book' entry</ModalHeader> */}
                <ModalHeader tag='h2' toggle={handleModal}>Update Contact</ModalHeader>
                <ModalBody className='d-flex flex-column'>
                    <Row>
                        <Col className='px-0 d-flex flex-column flex-sm-row justify-content-evenly align-items-center'>
                            {is_sega ? (
                                <Avatar className='m-1' size='lg' color={logos[1].color} icon={logos[1].icon} />
                            ) : item.hasOwnProperty('isFav') ? (
                                <Avatar className='m-1' size='lg' color={logos[0].color} icon={logos[0].icon} />
                            ) : (
                                <Avatar className='m-1' size='lg' color={logos[2].color} icon={logos[2].icon} />
                            )}
                            <Col className='px-0 d-flex flex-column justify-content-start'>
                                <CardTitle style={{ fontSize: '1.5rem' }} className='mb-0'>{item.nickname}</CardTitle>
                                <h6 className='font-weight-bold'>{shortenIfAddress(item.adrs)}</h6>
                            </Col>
                            {/* <Col className='d-flex flex-row justify-content-end'>
                                <FaRegCopy style={{ cursor: 'pointer' }} className='mx-1' size={25} onClick={copy} />
                                <a href={getExplorerAddressLink(globalAdrs, chainId)} target='_blank'><GoLinkExternal size={25} /></a>
                            </Col> */}
                        </Col>
                    </Row>
                    <p className='py-1'>Account names are stored locally and are not collected by Risk Protocol.</p>
                    {/* <Label className='py-1' style={{ fontSize: '1.2em' }}></Label> */}
                    {/* <h3 className='mb-1' >
                        Current Name is "{item.nickname}", add a new name below to change it!
                    </h3> */}
                    <FormGroup className='w-100'>
                        <Label style={{ fontSize: '1.3em' }} for='newname'>Nickname</Label>
                        <Input type='text' id='newname' placeholder='Add new name over here..' onChange={handleName} />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    {name_flag ? (
                        <Button.Ripple color='primary' onClick={handleChangeName}>
                            Change Name
                        </Button.Ripple>
                    ) : (
                        <Button.Ripple color='primary' disabled>
                            Change Name
                        </Button.Ripple>
                    )}

                </ModalFooter>
            </Modal>
        </>
    )
}

// export default NameChangeModal
const mapStateToProps = (state) => ({
    globalAdrs: state.appData.globalAdrs,
    globalNickName: state.appData.globalNickName,
    globalFavFlag: state.appData.globalFavFlag,
    globalVaultFlag: state.appData.globalVaultFlag
})
const mapDispatchToProp = dispatch => ({ dispatch })
export default connect(mapStateToProps, mapDispatchToProp)(NameChangeModal)