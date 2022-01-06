import React from 'react'
import { Trash2 } from 'react-feather'
import { connect } from 'react-redux'
import * as AppData from '../../redux/actions/cookies/appDataType'

const DeleteContact = ({ item, dispatch, globalFavFlag }) => {

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
    }

    return (
        <>
            <Trash2 style={{ cursor: 'pointer' }} className='mx-1' size={25} color='grey' onClick={handleDelete} />
        </>
    )
}

// export default DeleteContact
const mapStateToProps = (state) => ({
    globalAdrs: state.appData.globalAdrs,
    globalNickName: state.appData.globalNickName,
    globalFavFlag: state.appData.globalFavFlag
})
const mapDispatchToProp = dispatch => ({ dispatch })
export default connect(mapStateToProps, mapDispatchToProp)(DeleteContact)