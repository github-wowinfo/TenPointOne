import React, { useEffect, useState } from 'react'
import { Badge, Col, Nav, Row } from 'reactstrap'
import { shortenIfAddress, useEthers } from '@usedapp/core'
import { connect } from 'react-redux'
import * as AppData from '../../redux/actions/cookies/appDataType'
import { Link } from 'react-router-dom'
import { FaRegStar, FaStar } from 'react-icons/fa'

const Favourites = ({ globalAdrs, dispatch, globalNickName, globalFavFlag, menuCollapsed, menuHover }) => {

    const { account } = useEthers()

    const [fav_list, setFav_list] = useState([])
    const getFavListFromLocal = () => {
        const getdata = JSON.parse(localStorage.getItem('adrsbook'))
        // console.log('getdata', getdata)
        const valuedata = getdata && getdata.filter(i => i.owner === account && i.isFav === true)
        // console.log('valuedata', valuedata)
        if (valuedata !== undefined || valuedata !== []) {
            setFav_list(valuedata)
        } else {
            console.log('No fav data')
        }
    }
    // console.log('fav_list', fav_list)

    useEffect(() => {
        getFavListFromLocal()
    }, [account, globalAdrs, globalNickName, globalFavFlag])

    const handleGlobal = (adrs, name) => {
        dispatch(AppData.globalAdrs(adrs))
        dispatch(AppData.globalNickName(name))
    }

    // console.log('fav_list', fav_list)
    // console.log('globalNickName', globalNickName)
    // console.log('globalAdrs', globalAdrs)

    const full_fav = () => {
        return (
            <div className='mb-1'>
                <Col>
                    <Badge color='light-primary'>Favourites</Badge>
                </Col>
                {fav_list !== null || fav_list !== [] ? (
                    fav_list && fav_list.map(i => {
                        return (
                            <>
                                <Row className='px-1 d-flex flex-row justify-conten-center' >
                                    <Col>
                                        <Link onClick={() => handleGlobal(i.adrs, i.nickname)} >{i.nickname}</Link>
                                    </Col>
                                    <Col>
                                        <h6>{shortenIfAddress(i.adrs)}</h6>
                                    </Col>
                                </Row>
                            </>
                        )
                    })
                ) : (<>{console.log('no data')}</>)
                }
            </div>
        )
    }

    const half_fav = () => {
        return (
            <>
                <Col className='ml-1'>
                    <FaRegStar size={20} />
                </Col>
            </>
        )
    }

    return (
        <>
            {
                menuCollapsed ? menuHover ? full_fav() : half_fav() : full_fav()
            }
        </>
    )
}

// export default Favourites
const mapStateToProps = (state) => ({
    globalAdrs: state.appData.globalAdrs,
    globalNickName: state.appData.globalNickName,
    globalFavFlag: state.appData.globalFavFlag
})
const mapDispatchToProp = dispatch => ({ dispatch })
export default connect(mapStateToProps, mapDispatchToProp)(Favourites)