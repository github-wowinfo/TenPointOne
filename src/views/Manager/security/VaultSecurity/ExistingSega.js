import { shortenIfAddress } from "@usedapp/core"

const ExistingSega = ({ item }) => {
    console.log('item', item)
    const getSegaData = JSON.parse(localStorage.getItem('segadata'))
    let adrs
    if (getSegaData && getSegaData.length > 0) {
        for (const i in getSegaData) {

            if (getSegaData[i].address === item.address) {
                adrs = getSegaData[i].name
                console.log('true', i, getSegaData[i].address, adrs)
                break
            } else {
                console.log('false', i, getSegaData[i].address)
                adrs = shortenIfAddress(item.address)
            }

        }
    } else {
        adrs = shortenIfAddress(item.address)
    }
    console.log('adrs', adrs)
    return (adrs)

}

export default ExistingSega