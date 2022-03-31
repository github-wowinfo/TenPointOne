import React from 'react'
import { Trash2 } from 'react-feather'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import * as AppData from '../../redux/actions/cookies/appDataType'

const DeleteContact = ({ item, dispatch, globalFavFlag, globalVaultFlag }) => {

    const MySwal = withReactContent(Swal)
    const handleDelete = () => {
        const getAdrsBookList = JSON.parse(localStorage.getItem('adrsbook'))
        if (getAdrsBookList !== undefined || getAdrsBookList !== []) {
            for (const i in getAdrsBookList) {
                if (getAdrsBookList[i].adrs === item.adrs) {
                    getAdrsBookList.splice(i, 1)
                    break
                }
            }
            localStorage.setItem('adrsbook', JSON.stringify(getAdrsBookList))
        } else {
            console.log('No AddressBook data')
        }
        if (globalFavFlag === 0) {
            dispatch(AppData.globalFavFlag(1))
        } else {
            dispatch(AppData.globalFavFlag(0))
        }
        if (globalVaultFlag === 0) {
            dispatch(AppData.globalVaultFlag(1))
        } else {
            dispatch(AppData.globalVaultFlag(0))
        }
    }

    const handleConfirmDelete = () => {
        return MySwal.fire({
            title: 'Are you sure, you want to delete this address?',
            icon: 'warning',
            input: 'checkbox',
            inputValue: 0,
            inputPlaceholder:
                'Are you sure you?',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            customClass: {
                confirmButton: 'btn btn-danger m-1',
                cancelButton: 'btn btn-primary m-1',
            },
            buttonsStyling: false,
            showClass: {
                popup: 'animate__animated animate__flipInX'
            },
        }).then(function (result) {
            if (result.isConfirmed) {
                handleDelete()
            }
        })
    }

    return (
        <>
            <Trash2 style={{ cursor: 'pointer' }} className='mr-1' size={25} onClick={handleConfirmDelete} />
        </>
    )
}

// export default DeleteContact
const mapStateToProps = (state) => ({
    globalAdrs: state.appData.globalAdrs,
    globalNickName: state.appData.globalNickName,
    globalFavFlag: state.appData.globalFavFlag,
    globalVaultFlag: state.appData.globalVaultFlag
})
const mapDispatchToProp = dispatch => ({ dispatch })
export default connect(mapStateToProps, mapDispatchToProp)(DeleteContact)