const ExistingSega = ({ item }) => {
    // console.log('item', item)
    const getSegaData = JSON.parse(localStorage.getItem('segadata'))

    let adrs
    if (getSegaData !== undefined || getSegaData !== []) {
        for (const i in getSegaData) {

            if (getSegaData[i].address === item.address) {
                adrs = getSegaData[i].name
                console.log('true', i, getSegaData[i].address, adrs)
                break
            } else {
                console.log('false', i, getSegaData[i].address)
                adrs = item.address
            }

        }
    } else {
        adrs = item.address
    }
    // console.log('adrs', adrs)
    return (adrs)

}

export default ExistingSega