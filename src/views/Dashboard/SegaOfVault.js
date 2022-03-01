import React, { useEffect, useState } from 'react'
import { useEthers } from '@usedapp/core'
import axios from 'axios'
import helperConfig from '../../helper-config.json'
import { SiWebmoney } from 'react-icons/si'
import { GiShipWheel } from 'react-icons/gi'

const SegaOfVault = ({ item }) => {

    const { account, chainId } = useEthers()

    const [sum, setSum] = useState(0)
    const getTokenBalance = async () => {
        try {
            const response = await axios.get(`https://api.unmarshal.com/v1/${helperConfig.unmarshal[chainId]}/address/${item.address}/assets?auth_key=CE2OvLT9dk2YgYAYfb3jR1NqCGWGtdRd1eoikUYs`)
            // const response = await axios.get(`https://api.unmarshal.com/v1/${helperConfig.unmarshal[chainId]}/address/${account}/assets?auth_key=CE2OvLT9dk2YgYAYfb3jR1NqCGWGtdRd1eoikUYs`)
            console.log('response', response)
            const balance = response.data.map(item => item.balance / (10 ** item.contract_decimals) * item.quote_rate).reduce((acc, curr) => acc + curr, 0)
            setSum(balance)
        } catch (error) {
            console.log(`Asset [getTokkenBalance]`, error)
        }
    }

    useEffect(() => {
        getTokenBalance()
    }, [account, chainId, item])

    return (
        <tr>
            <td>
                <span className='align-middle font-weight-bold' style={{ whiteSpace: "nowrap" }}><GiShipWheel className="mr-1" size={25} />{item.name}</span>
            </td>
            <td style={{ textAlign: "center" }}>{item.address}</td>
            <td style={{ textAlign: "right" }}> ${(sum.toFixed(6))} </td>
        </tr>

    )

}

export default SegaOfVault
// const mapStateToProps = (state) => ({
//     globalAdrs: state.appData.globalAdrs,
// })
// // const mapDispatchToProp = dispatch => ({ dispatch })
// export default connect(mapStateToProps, null)(SegaOfVault)