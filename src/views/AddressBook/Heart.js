import React, { useEffect, useState } from 'react'
import Avatar from '@components/avatar'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

const Heart = ({ item }) => {


    const [hicon, setHicon] = useState(false)

    const handleFav = () => {
        setHicon(false)
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
        setHicon(true)
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
    // console.log('ok', hicon)
    // console.log('isFav', item.isFav)

    return (
        <div>
            {

                item?.isFav ? (<Avatar color='light-info' icon={<FaHeart size={25} style={{ color: 'red' }} />} onClick={handleNotFav} />) : (
                    <Avatar color='light' icon={<FaRegHeart size={25} style={{ color: 'red' }} />} onClick={handleFav} />)


            }
        </div>
    )
}

export default Heart