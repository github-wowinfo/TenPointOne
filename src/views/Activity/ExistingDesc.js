
const ExistingDesc = ({ id, api_desc }) => {
    const data = JSON.parse(localStorage.getItem('txnAdrsData'))
    let to_display_desc
    if (data && data.length > 0) {
        console.log('inside')
        for (const i in data) {
            if (data[i].txn_id === id) {
                to_display_desc = data[i].custom_desc
                break
            } else {
                to_display_desc = api_desc
            }
        }
    } else {
        to_display_desc = api_desc
    }

    return (to_display_desc)
}

export default ExistingDesc