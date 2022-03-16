import React, { useEffect, useState } from 'react'
import Avatar from '@components/avatar'
import { BsSafe2 } from 'react-icons/bs'
import { SiWebmoney } from 'react-icons/si'
import { useEthers } from '@usedapp/core'
import { connect } from 'react-redux'
import * as AppData from '../../redux/actions/cookies/appDataType'
import { GiCircleCage, GiHobbitDoor, GiShipWheel } from 'react-icons/gi'

const FavAvatar = ({ item }) => {

    const { account, chainId } = useEthers()

    const [is_sega, setis_sega] = useState()
    // const [segaList, setSegaList] = useState([])
    let segaList

    const getSegaListFromLocal = () => {
        const getdata = JSON.parse(localStorage.getItem('segadata'))
        const valueData = getdata && getdata.filter(a => a.show === true && a.network === chainId && a.owner === account)
        segaList = valueData && valueData.map((sega, index) => ({ value: index, adrs: sega.address, name: sega.name, ofvault: sega.vault }))
        console.log('segalist', segaList)
        // setSegaList(segalist)
    }

    const handleCheck = () => {
        console.log('segaList', segaList)
        const segaadrs = segaList && segaList.find(i => i.adrs === item.adrs)
        console.log('segaadrs', segaadrs)
        if (segaadrs === undefined || segaadrs === null) {
            console.log('issega', is_sega)
            setis_sega(false)
        } else {
            setis_sega(true)
        }
    }

    useEffect(() => {
        getSegaListFromLocal()
        handleCheck()
    }, [item.adrs])

    const logos = [
        {
            icon: <GiShipWheel size={20} />,
            // icon: <BsSafe2 size={20} />,
            color: 'primary'
        },
        {

            icon: <GiCircleCage size={20} />,
            color: 'primary'
        }
    ]

    return (
        // <>
        //     {is_sega ? (
        //         <Avatar className='mr-1' size='md' color={logos[1].color} icon={logos[1].icon} />
        //     ) : (
        //         <Avatar className='mr-1' size='md' color={logos[0].color} icon={logos[0].icon} />
        //     )}
        // </>
        <>
            {is_sega ? (
                <GiCircleCage size={25} color='#ffff' />
            ) : (
                <GiShipWheel size={25} color='#ffff' />
            )}
        </>
    )
}

// export default FavAvatar
const mapStateToProps = (state) => ({
    globalAdrs: state.appData.globalAdrs,
    globalNickName: state.appData.globalNickName,
    globalFavFlag: state.appData.globalFavFlag
})
const mapDispatchToProp = dispatch => ({ dispatch })
export default connect(mapStateToProps, mapDispatchToProp)(FavAvatar)