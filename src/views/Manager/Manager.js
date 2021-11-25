import AddRemove from "./addRemove/AddRemove"
import CreateVs from "./Create/CreatVs"
import RecoverAcc from "./recover/RecoverAcc"
import ManageSecurity from "./security/ManageSecurity"
import { Card, CardHeader, CardTitle } from 'reactstrap'
import ImportExport from "./importExport/ImportExport"
import { useEthers } from "@usedapp/core"

const Manager = () => {
    const { account } = useEthers()

    const isConnected = account !== undefined

    const disconnect = () => {
        window.location.href = '/login'
    }
    return (
        <div>
            {isConnected ? (<><CreateVs /><AddRemove /><ManageSecurity /><RecoverAcc /><ImportExport /></>) : disconnect()}

        </div>
    )
}

export default Manager