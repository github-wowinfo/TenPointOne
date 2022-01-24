import { TransactionStatus, useContractCall, useContractFunction } from "@usedapp/core"
import { utils, constants } from "ethers"
import { Contract } from "@ethersproject/contracts"
import { useState, useEffect } from "react"

import Vault from "../../brownie_exports/chain-info/contracts/Vault_v112.json"
import Sega from "../../brownie_exports/chain-info/contracts/SEGA_v112.json"

export const useManager = (vault, sega) => {

    const SegaInterface = new utils.Interface(Sega.abi)
    const VaultInterface = new utils.Interface(Vault.abi)
    const VaultContract = new Contract(vault ? vault : constants.AddressZero, VaultInterface)
    //const SegaContract = new Contract(sega?sega:constants.AddressZero,SegaInterface)


    // getInfo() - To Freeze the SEGA's Trader
    const getSegaInfoFn = { abi: SegaInterface, address: sega.toString(), method: "getInfo", args: [], }
    const [_parentVault, _trader, _active] = useContractCall(
        sega && getSegaInfoFn) ?? []
    const getSegaInfo = () => {
        console.log("Rec Info:", _parentVault, _trader, _active)
        return { _parentVault, _trader, _active }
    }

    // pauseSega() - To Freeze the SEGA's Trader
    const { send: pauseSegaSend, state: pauseSegaState } =
        useContractFunction(VaultContract, "pauseSega", { transactionName: "Pause Sega" })
    const pauseSega = () => { return pauseSegaSend(sega) }

    // unpauseSega() - To Unfreeze the SEGA's Trader
    const { send: unpauseSegaSend, state: unpauseSegaState } =
        useContractFunction(VaultContract, "unpauseSega", { transactionName: "Unpause Sega" })
    const unpauseSega = () => { return unpauseSegaSend(sega) }

    // changeTrader() - To Freeze the SEGA's Trader
    const { send: changeSegaTraderSend, state: changeSegaTraderState } =
        useContractFunction(VaultContract, "changeTrader", { transactionName: "Change Trader" })
    const changeSegaTrader = (trader) => { return changeSegaTraderSend(sega, trader) }

    //Clubbing All Txns States into 1 Variable
    const [txnState, setTxnState] = useState(pauseSegaState)
    //-----updated code for aggregating txnState
    useEffect(() => {
        setTxnState(pauseSegaState)
    }, [pauseSegaState])

    useEffect(() => {
        setTxnState(unpauseSegaState)
    }, [unpauseSegaState])

    useEffect(() => {
        setTxnState(changeSegaTraderState)
    }, [changeSegaTraderState])

    // const testSameTxn = (a, b) => {
    //     return (a.transaction?.hash === b.transaction?.hash)
    // }
    // useEffect(() => {
    //     console.log("Txn State Before: ", txnState.transaction?.hash, txnState.status)

    //     if (pauseSegaState.status === "Mining") {
    //         setTxnState(pauseSegaState)
    //     } else if (unpauseSegaState.status === "Mining") {
    //         setTxnState(unpauseSegaState)
    //     } else if (changeSegaTraderState.status === "Mining") {
    //         setTxnState(changeSegaTraderState)
    //     } else if (testSameTxn(txnState, pauseSegaState) && pauseSegaState.status === "Success") {
    //         setTxnState(pauseSegaState)
    //     } else if (testSameTxn(txnState, unpauseSegaState) && unpauseSegaState.status === "Success") {
    //         setTxnState(unpauseSegaState)
    //     } else if (testSameTxn(txnState, changeSegaTraderState) && changeSegaTraderState.status === "Success") {
    //         setTxnState(changeSegaTraderState)
    //     } else { console.log("Not Mining") }

    //     console.log("Txn State After: ", txnState.transaction?.hash, txnState.status)

    // }, [pauseSegaState, unpauseSegaState, changeSegaTraderState, txnState])

    return {
        getSegaInfo,
        pauseSega,
        unpauseSega,
        changeSegaTrader,
        txnState
    }
}