import React, { useEffect, useState } from 'react'
import Avatar from '@components/avatar'
import { FaStar, FaRegStar } from 'react-icons/fa'
import { connect } from 'react-redux'
import * as AppData from '../../redux/actions/cookies/appDataType'
import { useEthers } from '@usedapp/core'

const Heart = ({ item, globalFavFlag, dispatch }) => {

    const [hicon, setHicon] = useState(false)
    const [flag, setflag] = useState(0)

    const handleFav = () => {
        if (globalFavFlag === 0) {
            dispatch(AppData.globalFavFlag(1))
        } else {
            dispatch(AppData.globalFavFlag(0))
        }
        setHicon(!hicon)
        setflag(1)
        const getFavData = JSON.parse(localStorage.getItem('fav'))
        if (getFavData !== undefined || getFavData !== []) {
            const postdata = {
                fav_name: item.nickname,
                fav_adrs: item.adrs
            }
            let fav_list = []
            if (getFavData) {
                fav_list = [...getFavData, postdata]
            } else {
                fav_list = [postdata]
            }
            localStorage.setItem('fav', JSON.stringify(fav_list))
            const getAdrsBookData = JSON.parse(localStorage.getItem('adrsbook'))
            for (const i in getAdrsBookData) {
                if (getAdrsBookData[i].adrs === item.adrs) {
                    getAdrsBookData[i].isFav = true
                }
            }
            localStorage.setItem('adrsbook', JSON.stringify(getAdrsBookData))
        } else {
            console.log('No fav data')
        }
    }

    const handleNotFav = () => {
        if (globalFavFlag === 0) {
            dispatch(AppData.globalFavFlag(1))
        } else {
            dispatch(AppData.globalFavFlag(0))
        }
        setHicon(!hicon)
        setflag(1)
        const getFavData = JSON.parse(localStorage.getItem('fav'))
        if (getFavData !== undefined || getFavData !== []) {
            for (const i in getFavData) {
                if (getFavData[i].fav_adrs === item.adrs) {
                    getFavData.splice(i, 1)
                    break
                }
            }
            localStorage.setItem('fav', JSON.stringify(getFavData))
            const getAdrsBookData = JSON.parse(localStorage.getItem('adrsbook'))
            for (const i in getAdrsBookData) {
                if (getAdrsBookData[i].adrs === item.adrs) {
                    getAdrsBookData[i].isFav = false
                }
            }
            localStorage.setItem('adrsbook', JSON.stringify(getAdrsBookData))
        } else {
            console.log('No fav data')
        }
    }
    // console.log('hicon', hicon)
    // console.log('item.isFav', item.isFav)
    console.log('globalFavFlag', globalFavFlag)

    return (
        <div>
            {
                //<Avatar color='light-info' icon={<FaStar size={25} style={{ color: '#FFCD3C' }} />} onClick={handleNotFav} />
                //<Avatar color='light' icon={<FaRegStar size={25} style={{ color: '#FFCD3C' }} />} onClick={handleFav} />
                flag === 0 &&
                    item?.isFav === true && hicon === true ? (
                    <FaStar size={25} style={{ color: '#FFCD3C' }} onClick={handleNotFav} />
                ) : (null)
            }
            {

                flag === 1 &&
                    item?.isFav === true && hicon === true ? (
                    <FaRegStar size={25} style={{ color: '#FFCD3C' }} onClick={handleFav} />
                ) : (null)
            }
            {
                (item?.isFav === false || item?.isFav === undefined) && hicon === false ? (
                    <FaRegStar size={25} style={{ color: '#FFCD3C' }} onClick={handleFav} />
                ) : (null)
            }
            {
                item?.isFav === true && hicon === false ? (
                    <FaStar size={25} style={{ color: '#FFCD3C' }} onClick={handleNotFav} />
                ) : (null)
            }
            {
                item?.isFav === false && hicon === true ? (
                    <FaStar size={25} style={{ color: '#FFCD3C' }} onClick={handleNotFav} />
                ) : (null)
            }
            {/* {
                item?.isFav === true && hicon === false ? (<Avatar color='light' icon={<FaRegStar size={25} style={{ color: '#FFCD3C' }} />} onClick={handleFav} />) : (null)
            } */}

        </div>
    )
}

// export default Heart
const mapStateToProps = (state) => ({
    globalAdrs: state.appData.globalAdrs,
    globalNickName: state.appData.globalNickName,
    globalFavFlag: state.appData.globalFavFlag
})
const mapDispatchToProp = dispatch => ({ dispatch })
export default connect(mapStateToProps, mapDispatchToProp)(Heart)