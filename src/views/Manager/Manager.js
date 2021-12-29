import AddRemove from "./addRemove/AddRemove"
import CreateVs from "./Create/CreatVs"
import RecoverAcc from "./recover/RecoverAcc"
import ManageSecurity from "./security/ManageSecurity"
import { Card, CardHeader, CardTitle } from 'reactstrap'
import ImportExport from "./importExport/ImportExport"
import { useEthers } from "@usedapp/core"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import helperConfig from '../../helper-config.json'
import { useState, useEffect } from "react"

const Manager = () => {
    const { account, chainId } = useEthers()

    const isConnected = account !== undefined

    const disconnect = () => {
        window.location.href = '/login'
    }

    const [curt_chain, setCurt_chain] = useState(chainId)
    const MySwal = withReactContent(Swal)

    const netchange = async (netid) => {
        await ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: `${netid}` }] })
    }
    const handleAjax = () => {
        return MySwal.fire({
            title: 'Do you want to change your current network?',
            // text: `Current network is "${helperConfig.network[chainId].name}"`,
            allowOutsideClick: false,
            showCancelButton: true,
            confirmButtonText: `Switch metamask to "${helperConfig.network[chainId].name} and log in again"`,
            cancelButtonText: `Stay on "${helperConfig.network[curt_chain].name}" and log in again`,
            customClass: {
                confirmButton: 'btn btn-primary mx-1',
                cancelButton: 'btn btn-danger my-1'
            },
            showClass: {
                popup: 'animate__animated animate__flipInX'
            },
        }).then(function (result) {
            if (result.isConfirmed) {
                netchange(helperConfig.network[chainId].netid)
                disconnect()
            } else if (result.isDismissed) {
                disconnect()
                netchange(helperConfig.network[curt_chain].netid)
            }
        })
    }

    useEffect(() => {
        if (chainId !== curt_chain) {
            handleAjax()
        }
    }, [chainId])

    return (
        <div>
            {isConnected ? (<div className="my-1"><CreateVs /><AddRemove /><ManageSecurity /><RecoverAcc /><ImportExport /></div>) : disconnect()}

        </div>
    )
}

export default Manager