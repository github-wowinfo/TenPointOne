import React, { useEffect, useState } from 'react'
import { Badge, Col, Nav, NavLink, Row } from 'reactstrap'
import { shortenIfAddress, useEthers } from '@usedapp/core'
import { connect } from 'react-redux'
import * as AppData from '../../redux/actions/cookies/appDataType'
import { Link } from 'react-router-dom'
import FavAvatar from './FavAvatar'
import { Star } from 'react-feather'
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri'
import { BiHide, BiShowAlt } from 'react-icons/bi'

const Favourites = ({ globalAdrs, dispatch, globalNickName, globalFavFlag, menuCollapsed, menuHover }) => {

    const { account, chainId } = useEthers()

    const [fav_list, setFav_list] = useState([])
    const getFavListFromLocal = () => {
        const getdata = JSON.parse(localStorage.getItem('adrsbook'))
        // console.log('getdata', getdata)
        const valuedata = getdata && getdata.filter(i => i.owner === account && i.network === chainId && i.isFav === true)
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

    const [show, setShow] = useState(true)

    const full_fav = () => {
        return (
            <div className='mb-1'>
                <Col className='d-flex flex-row justify-content-between'>
                    <NavLink className='pl-1' >
                        <Star className='mr-1' size={20} />
                        {/* Favourites */}
                        <span className='font-weight-bolder' style={{ fontSize: '0.9rem' }} >FAVOURITES</span>
                    </NavLink>
                    {fav_list === undefined || fav_list === null ? null : (
                        fav_list.length > 0 && show ? (
                            <BiShowAlt style={{ cursor: 'pointer' }} size={25} onClick={() => setShow(false)} />
                        ) : (
                            <BiHide style={{ cursor: 'pointer' }} size={25} onClick={() => setShow(true)} />
                        )
                    )}
                </Col>
                {fav_list !== undefined || fav_list !== null ? (
                    show ? (
                        fav_list && fav_list.map(i => {
                            return (
                                <>
                                    <Row className='my-1 pl-1 d-flex flex-row align-items-center ' >
                                        <Col className='ml-1' lg='2'>
                                            <FavAvatar item={i} />
                                        </Col>
                                        <Col style={{ paddingLeft: '0.3em' }}>
                                            <h6 className='mb-0 font-weight-bold'><Link onClick={() => handleGlobal(i.adrs, i.nickname)} >{i.nickname}</Link></h6>
                                            <h6 className='mb-0 font-weight-light'>{shortenIfAddress(i.adrs)}</h6>
                                        </Col>
                                    </Row>
                                </>
                            )
                        })
                    ) : null
                ) : (
                    <>
                        {console.log('no data')}
                    </>
                )}
            </div>
        )
    }

    const half_fav = () => {
        return (
            <>
                <Col className='ml-1'>
                    <Star size={20} />
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