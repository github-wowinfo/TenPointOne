
const ReceivedValue = ({ data, gadrs }) => {
    let value
    for (const i in data) {
        if (data[i].to === gadrs) {
            value = (data[i].value / (10 ** data[i].decimals)).toLocaleString()
            break
        }
        value = (data[0].value / (10 ** data[0].decimals)).toLocaleString()

        return (value)
    }
}

export default ReceivedValue