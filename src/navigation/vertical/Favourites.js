import React, { useEffect, useState } from 'react'
import { Badge, Col, Nav, Row } from 'reactstrap'
import { shortenIfAddress, useEthers } from '@usedapp/core'
import { connect } from 'react-redux'
import * as AppData from '../../redux/actions/cookies/appDataType'
import { Link } from 'react-router-dom'

const Favourites = ({ globalAdrs, dispatch, globalNickName }) => {

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
    let data
    if (fav_list === null || fav_list === []) {
        console.log('no data')
    } else {
        // data = fav_list.slice(0, 3)
        data = fav_list
    }

    console.log('data', data)

    useEffect(() => {
        getFavListFromLocal()
    }, [account, globalAdrs, globalNickName])

    const handleGlobal = (adrs, name) => {
        dispatch(AppData.globalAdrs(adrs))
        dispatch(AppData.globalNickName(name))
    }

    return (
        <div className='mb-1'>
            <Col>
                <Badge color='light-primary'>Favourites</Badge>
            </Col>
            {data && data.map(i => {
                return (
                    <>
                        <Row className='px-1 d-flex flex-row justify-conten-center' >
                            <Col>
                                <Link onClick={() => handleGlobal(i.fav_adrs, i.fav_name)} >{i.nickname}</Link>
                            </Col>
                            <Col>
                                <h6>{shortenIfAddress(i.adrs)}</h6>
                            </Col>
                        </Row>
                    </>
                )
            })}
        </div>
    )
}

// export default Favourites
const mapStateToProps = (state) => ({
    globalAdrs: state.appData.globalAdrs,
    globalNickName: state.appData.globalNickName
})
const mapDispatchToProp = dispatch => ({ dispatch })
export default connect(mapStateToProps, mapDispatchToProp)(Favourites)