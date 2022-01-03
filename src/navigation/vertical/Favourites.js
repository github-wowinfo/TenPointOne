import React, { useEffect, useState } from 'react'
import { Badge, Col, Nav, Row } from 'reactstrap'
import { shortenIfAddress, useEthers } from '@usedapp/core'
import { connect } from 'react-redux'
import * as AppData from '../../redux/actions/cookies/appDataType'
import { Link } from 'react-router-dom'

const Favourites = ({ globalAdrs, dispatch, globalNickName }) => {

    const { account } = useEthers()

    // const [is_sega, setis_sega] = useState(false)
    // const [segaList, setSegaList] = useState([])
    // const getSegaListFromLocal = () => {
    //     const getdata = JSON.parse(localStorage.getItem('segadata'))
    //     const valueData = getdata && getdata.filter(a => a.show === true && a.network === chainId && a.owner === account)
    //     const segalist = valueData && valueData.map((sega, index) => ({ value: index, adrs: sega.address, name: sega.name, ofvault: sega.vault }))
    //     setSegaList(segalist)
    // }

    // useEffect(() => {
    //     getSegaListFromLocal()
    //     const segaadrs = segaList && segaList.find(i => i.adrs === globalAdrs)
    //     console.log('segaadrs', segaadrs)
    //     if (segaadrs === undefined) {
    //         setis_sega(false)
    //     } else {
    //         setis_sega(true)
    //     }
    // }, [globalAdrs, account, chainId])

    const [fav_list, setFav_list] = useState([])
    const getFavListFromLocal = () => {
        const getdata = JSON.parse(localStorage.getItem('fav'))
        if (getdata !== undefined || getdata !== []) {
            setFav_list(getdata)
        } else {
            console.log('No fav data')
        }
    }

    // console.log('fav_list', fav_list)
    let data
    if (fav_list === null || fav_list === []) {
        console.log('no data')
    } else {
        data = fav_list.slice(0, 3)
    }

    // console.log('data', data)

    useEffect(() => {
        getFavListFromLocal()
    }, [account])

    const handleGlobal = (adrs, name) => {
        dispatch(AppData.globalAdrs(adrs))
        dispatch(AppData.globalNickName(name))
    }

    return (
        <div className='mb-1'>
            <Col>
                <Badge color='light-primary'>Favourites</Badge>
            </Col>
            {data !== undefined || data !== [] ? <>
                {data && data.map(i => {
                    return (
                        <>
                            <Row className='px-1 d-flex flex-row justify-conten-center' >
                                <Col>
                                    <Link onClick={() => handleGlobal(i.fav_adrs, i.fav_name)} >{i.fav_name}</Link>
                                </Col>
                                <Col>
                                    <h6>{shortenIfAddress(i.fav_adrs)}</h6>
                                </Col>
                            </Row>
                        </>
                    )
                })}
            </> : '-'}
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