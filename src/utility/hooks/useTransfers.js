import { TransactionStatus, useContractFunction } from "@usedapp/core"
import { utils, constants, BigNumber } from "ethers"
import { Contract } from "@ethersproject/contracts"
import { getAddress, isAddress } from "ethers/lib/utils"
import { useState, useEffect } from "react"

import Vault from "../../brownie_exports/chain-info/contracts/Vault_v112.json"
import Sega from "../../brownie_exports/chain-info/contracts/SEGA_v112.json"


export const useTransfers = (vault, sega) => {

    const addressZero = constants.AddressZero
    const SegaInterface = new utils.Interface(Sega.abi)
    const VaultInterface = new utils.Interface(Vault.abi)
    const VaultContract = new Contract(vault ? vault : addressZero, VaultInterface)
    const SegaContract = new Contract(sega ? sega : addressZero, SegaInterface)

    /*-------------------------------------------------------
    --------------------- Vault  Functions-------------------
    -------------------------------------------------------*/

    // Send Out Assets - from VAULT - Native Currency and Tokens

    const { send: vaultTransferNativeSend, state: vaultTransferNativeState } =
        useContractFunction(VaultContract, "sendNativeAssets", { transactionName: "Transfer Native Out From Vault" })

    const vaultTransferNative = (_to, _amount) => {
        console.log("Vault Contract:", vault)
        if (isAddress(_to)) { return vaultTransferNativeSend(getAddress(_to), _amount) }
    }

    const { send: vaultTransferERCSend, state: vaultTransferERCState } =
        useContractFunction(VaultContract, "sendTokenAssets", { transactionName: "Transfer ERC Out From Vault" })

    const vaultTransferErc = (_to, _token, _amount) => {
        console.log("Vault Contract:", vault)
        if (isAddress(_to)) { return vaultTransferERCSend(getAddress(_to), _token, _amount) }
    }

    // Force Recall Assets From Sega - VAULT - Native & Tokens

    const { send: recallNativeSend, state: recallNativeState } =
        useContractFunction(VaultContract, "RecallNativeFromSega", { transactionName: "Force Recall Native From Sega" })
    const recallNative = (_amount) => {
        if (sega) { return recallNativeSend(sega, _amount) }
    }

    const { send: recallErcSend, state: recallErcState } =
        useContractFunction(VaultContract, "RecallErcFromSega", { transactionName: "Force Recall ERC From Sega" })
    const recallErc = (_token, _amount) => {
        if (sega) { return recallErcSend(sega, _token, _amount) }
    }

    /*------------------------------------------------------
    --------------------- Sega  Functions-------------------
    -------------------------------------------------------*/

    // Send Out Assets - from SEGA - Native Currency and Tokens

    const { send: segaTransferNativeSend, state: segaTransferNativeState } =
        useContractFunction(SegaContract, "sendNativeAssets", { transactionName: "Transfer Native From Sega" })
    const segaTransferNative = (_to, _amount) => {
        if (isAddress(_to)) {
            return segaTransferNativeSend(getAddress(_to), _amount)
        }
    }
    const { send: segaTransferERCSend, state: segaTransferERCState } =
        useContractFunction(SegaContract, "sendTokenAssets", { transactionName: "Transfer ERC From Sega" })
    const segaTransferErc = (_to, _token, _amount) => {
        if (isAddress(_to)) {
            return segaTransferERCSend(getAddress(_to), _token, _amount)
        }
    }

    // tokenApprove() - SEGA - To Approve Assets from Sega
    const { send: segaApproveSend, state: segaApproveState } =
        useContractFunction(SegaContract, "tokenApprove", { transactionName: "Approve From Sega" })
    const segaApproveErc = (_spender, _token, _amount) => {
        if (isAddress(_spender)) {
            return segaApproveSend(getAddress(_spender), _token, _amount)
        }
    }

    /*------------------------------------------------------
    ---------------- Clubbing Txn States -------------------
    -------------------------------------------------------*/

    const [TransferState, setTransferState] = useState(vaultTransferNativeState)
    const testSameTxn = (a, b) => {
        return (a.transaction?.hash === b.transaction?.hash)
    }
    useEffect(() => {
        console.log("Txn State Before: ", TransferState.transaction?.hash, TransferState.status)

        if (vaultTransferNativeState.status === "Mining") {
            setTransferState(vaultTransferNativeState)
        } else if (vaultTransferERCState.status === "Mining") {
            setTransferState(vaultTransferERCState)
        } else if (recallNativeState.status === "Mining") {
            setTransferState(recallNativeState)
        } else if (recallErcState.status === "Mining") {
            setTransferState(recallErcState)
        } else if (segaTransferNativeState.status === "Mining") {
            setTransferState(segaTransferNativeState)
        } else if (segaTransferERCState.status === "Mining") {
            setTransferState(segaTransferERCState)
        } else if (segaApproveState.status === "Mining") {
            setTransferState(segaApproveState)
        } else if (testSameTxn(TransferState, vaultTransferNativeState) && vaultTransferNativeState.status === "Success") {
            setTransferState(vaultTransferNativeState)
        } else if (testSameTxn(TransferState, vaultTransferERCState) && vaultTransferERCState.status === "Success") {
            setTransferState(vaultTransferERCState)
        } else if (testSameTxn(TransferState, recallNativeState) && recallNativeState.status === "Success") {
            setTransferState(recallNativeState)
        } else if (testSameTxn(TransferState, recallErcState) && recallErcState.status === "Success") {
            setTransferState(recallErcState)
        } else if (testSameTxn(TransferState, segaTransferNativeState) && segaTransferNativeState.status === "Success") {
            setTransferState(segaTransferNativeState)
        } else if (testSameTxn(TransferState, segaTransferERCState) && segaTransferERCState.status === "Success") {
            setTransferState(segaTransferERCState)
        } else if (testSameTxn(TransferState, segaApproveState) && segaApproveState.status === "Success") {
            setTransferState(segaApproveState)
        } else { console.log("Not Mining") }

        console.log("Txn State After: ", TransferState.transaction?.hash, TransferState.status)

    }, [
        vaultTransferNativeState,
        vaultTransferERCState,
        recallNativeState,
        recallErcState,
        segaTransferNativeState,
        segaTransferERCState,
        segaApproveState,
        TransferState
    ]
    )

    return {
        vaultTransferNative,
        vaultTransferErc,
        recallNative,
        recallErc,
        segaTransferNative,
        segaTransferErc,
        segaApproveErc,
        TransferState
    }
}