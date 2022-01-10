const ExistingSega = ({ item }) => {

    const getSegaData = JSON.parse(localStorage.getItem('segadata'))

    let adrs
    if (getSegaData !== undefined || getSegaData !== []) {
        for (const i in getSegaData) {

            if (getSegaData[i].address === item.address) {
                // console.log('true', i, getSegaData[i].address)
                adrs = getSegaData[i].name
            } else {
                // console.log('false', i, getSegaData[i].address)
                adrs = item.address
            }

        }
    } else {
        adrs = item.address
    }

    return (adrs)
}

export default ExistingSega