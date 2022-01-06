import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Button, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import * as AppData from '../../redux/actions/cookies/appDataType'

const NameChangeModal = ({ openmodal, handleModal, item, dispatch, globalFavFlag }) => {

    const [newName, setNewName] = useState('')
    const [name_flag, setName_flag] = useState(false)

    const handleName = (e) => {
        if (e.target.value === '') {
            alert('Name cannot be blank')
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

        if (globalFavFlag === 0) {
            dispatch(AppData.globalFavFlag(1))
        } else {
            dispatch(AppData.globalFavFlag(0))
        }
    }

    return (
        <>
            <Modal isOpen={openmodal} toggle={handleModal} className='modal-dialog-centered'>
                <ModalHeader toggle={handleModal}>Edit Name of 'Address Book' entry</ModalHeader>
                <ModalBody className='d-flex flex-column align-items-center'>
                    <h3 className='mb-1' >
                        Current Name is "{item.nickname}", add a new name below to change it!
                    </h3>
                    <FormGroup style={{ width: '-webkit-fill-available' }}>
                        <Label style={{ fontSize: '1.5rem' }} for='newname'>New Name:</Label>
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
    globalFavFlag: state.appData.globalFavFlag
})
const mapDispatchToProp = dispatch => ({ dispatch })
export default connect(mapStateToProps, mapDispatchToProp)(NameChangeModal)