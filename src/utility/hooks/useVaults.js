import { TransactionStatus, useContractCall, useContractFunction } from "@usedapp/core"
import { utils, constants } from "ethers"
import { Contract } from "@ethersproject/contracts"
import { useState, useEffect } from "react"

import Vault from "../../brownie_exports/chain-info/contracts/Vault.json"
//import Sega from "../brownie_exports/chain-info/contracts/SEGA.json"

export const useVault = (vault) => {
    //console.log("In useVault - Vault:", vault)

    //const SegaInterface = new utils.Interface(Sega.abi)
    const VaultInterface = new utils.Interface(Vault.abi)
    const VaultContract = new Contract(vault ? vault : constants.AddressZero, VaultInterface)

    /*-------------------------------------------------------
    -----------------Blue View Only Functions----------------
    -------------------------------------------------------*/

    // getRecoveryInfo() - Get Recovery Info
    const getRecoveryInfoFn = { abi: VaultInterface, address: vault, method: "getRecoveryInfo", args: [], }
    const [_owner, _backup, c, d] = useContractCall(vault && getRecoveryInfoFn) ?? []
    const getRecoveryInfo = () => {
        if (vault.length > 0) {
            const x = new Date(c && c.toNumber() * 1000)
            const _releaseDt = x.toLocaleDateString('en-Gbackup', { day: 'numeric', month: 'short', year: 'numeric' }).replace(/ /g, ' ')
            const _unlockDays = d && d.toNumber()
            console.log("Original Info")
            console.log(_owner, _backup, c, d)
            console.log("Rec Info:", _owner, _backup, _releaseDt, _unlockDays)
            return { _owner, _backup, _releaseDt, _unlockDays }
        } else {
            return { _owner: "", _backup: "", _releaseDt: "0", _unlockDays: 9999 }
        }
    }

    // viewSegaList() - Get list of Segas linked to this Vault
    const getSegaListFn = { abi: VaultInterface, address: vault, method: "viewSegaList", args: [], }
    const [segaList] = useContractCall(vault && getSegaListFn) ?? []
    const getSegaList = () => {
        console.log("Sega List:", { segaList })
        return segaList
    }

    /*-------------------------------------------------------
    ------------------Red Vault Security Fn------------------
    -------------------------------------------------------*/

    // setBackup() - To set a new backup account
    const { send: changeBackupSend, state: changeBackupState } =
        useContractFunction(VaultContract, "setBackup", { transactionName: "Set Backup Account" })
    const changeBackup = (address) => { return changeBackupSend(address) }

    // setUnlockPeriod() - To set a new inactivity time period
    const { send: changeUnlockPeriodSend, state: changeUnlockPeriodState } =
        useContractFunction(VaultContract, "setUnlockPeriod", { transactionName: "Set Unlock Period" })
    const changeUnlockPeriod = (days) => { return changeUnlockPeriodSend(days) }

    // claimVault() - For the backup account to claim ownership
    const { send: claimVaultSend, state: claimVaultState } =
        useContractFunction(VaultContract, "claimVault", { transactionName: "Claim Vault" })
    const claimVault = () => { return claimVaultSend() }

    // createNewSega() - To Launch a new SEGA
    const { send: createNewSegaSend, state: createNewSegaState } =
        useContractFunction(VaultContract, "createNewSega", { transactionName: "Create New Sega" })
    const createNewSega = () => { return createNewSegaSend() }

    //Clubbing All non-sega contract creation txns
    const [txnState, setTxnState] = useState(changeBackupState)

    //-----updated code for aggregating txnState
    useEffect(() => {
        setTxnState(changeBackupState)
    }, [changeBackupState])

    useEffect(() => {
        setTxnState(changeUnlockPeriodState)
    }, [changeUnlockPeriodState])

    useEffect(() => {
        setTxnState(claimVaultState)
    }, [claimVaultState])

    // const testSameTxn = (a, b) => {
    //     return (a.transaction?.hash === b.transaction?.hash)
    // }
    // useEffect(() => {
    //     console.log("Txn State Before: ", txnState.transaction?.hash, txnState.status)
    //     if (changeBackupState.status === "Mining") {
    //         setTxnState(changeBackupState)
    //     } else if (changeUnlockPeriodState.status === "Mining") {
    //         setTxnState(changeUnlockPeriodState)
    //     } else if (claimVaultState.status === "Mining") {
    //         setTxnState(claimVaultState)
    //     } else if (testSameTxn(txnState, changeBackupState) && changeBackupState.status === "Success") {
    //         setTxnState(changeBackupState)
    //     } else if (testSameTxn(txnState, changeUnlockPeriodState) && changeUnlockPeriodState.status === "Success") {
    //         setTxnState(changeUnlockPeriodState)
    //     } else if (testSameTxn(txnState, claimVaultState) && claimVaultState.status === "Success") {
    //         setTxnState(claimVaultState)
    //     } else { console.log("Not Mining") }

    //     console.log("Txn State After: ", txnState.transaction?.hash, txnState.status)
    // }, [changeBackupState, changeUnlockPeriodState, claimVaultState, txnState]
    // )

    return {
        getRecoveryInfo,
        getSegaList,
        changeBackup,
        changeUnlockPeriod,
        claimVault,
        txnState,
        createNewSega,
        createNewSegaState,
    }


}