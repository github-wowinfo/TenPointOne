import AddRemove from "./addRemove/AddRemove"
import CreateVs from "./Create/CreatVs"
import RecoverAcc from "./recover/RecoverAcc"
import ManageSecurity from "./security/ManageSecurity"
import { Card, CardHeader, CardTitle } from 'reactstrap'
import ImportExport from "./importExport/ImportExport"

const Manager = () => {
    return (
        <div>
            <CreateVs />
            <AddRemove />
            <ManageSecurity />
            <RecoverAcc />
            <ImportExport />
        </div>
    )
}

export default Manager