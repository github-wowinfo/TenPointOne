import { shortenAddress, shortenIfAddress } from "@usedapp/core"
import { isAddress } from "../../utility/hooks/useRCU"

const ExistingAdrs = ({ adrs, local }) => {
    // const getadrsData = JSON.parse(localStorage.getItem('adrsbook'))
    // console.log('getadrsData', getadrsData)
    // console.log('adrs', adrs)
    console.log('local', local.length)
    let name
    if (local.length > 0) {
        for (const i in local) {
            const Cap_LocalAdrs = local[i].ladrs.toUpperCase()
            const Cap_adrs = adrs.toUpperCase()
            console.log(Cap_LocalAdrs, Cap_adrs)
            if (Cap_LocalAdrs === Cap_adrs) {
                name = local[i].lname
                break
            } else {
                // console.log('false', i, getadrsData[i].adrs)
                // console.log('item', item)
                name = adrs
            }
        }
    } else {
        name = adrs
    }
    console.log('name', name)
    return (
        <>
            {isAddress(name) ? shortenAddress(name) : name}
        </>
    )
}

export default ExistingAdrs