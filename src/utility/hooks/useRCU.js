import { useEthers, useContractFunction, useContractCall } from "@usedapp/core"
import { utils, constants } from "ethers"
import { getAddress } from "ethers/lib/utils"
import { Contract } from "@ethersproject/contracts"
import brownieConfig from "../../brownie_exports/brownie-config.json"
import helperConfig from "../../helper-config.json"

import RCU from "../../brownie_exports/chain-info/contracts/DeployRCU_P.json"
import vFact from "../../brownie_exports/chain-info/contracts/VaultFactP.json"
import sFact from "../../brownie_exports/chain-info/contracts/SegaFactP.json"

export const useRCU = () => {

    const { chainId } = useEthers()
    const networkName = chainId ? helperConfig[chainId] : "Not Connected"
    const rcu = chainId ? brownieConfig["networks"][networkName]["RCU"] : constants.AddressZero
    const _sf = chainId ? brownieConfig["networks"][networkName]["sFact"] : constants.AddressZero
    const _vf = chainId ? brownieConfig["networks"][networkName]["vFact"] : constants.AddressZero

    const RcuInterface = new utils.Interface(RCU.abi)
    const RcuContract = new Contract(rcu, RcuInterface)
    const vFactInterface = new utils.Interface(vFact.abi)
    const sFactInterface = new utils.Interface(sFact.abi)


    //RiskProtocol() - get Admin
    const RiskProtoFunction = { abi: RcuInterface, address: rcu, method: "RiskProtocol", args: [], }
    const [RPAdmin] = useContractCall(rcu && RiskProtoFunction) ?? []
    const getRPAdmin = () => {
        console.log("RP Admin :", { RPAdmin })
        return getAddress(RPAdmin)
    }

    //VaultFact() - get Currecnt Vault Factory in Use
    // There is some issue here - Refresh happens on second click
    // If i change VF to sega address and then revert, it gets stuck at sega address.
    // Network instructions are going out fine. It is changing at the back end - but the front end gets stuck
    // Refresh page solves it
    const VF_Fn = { abi: RcuInterface, address: rcu, method: "VaultFact", args: [], }
    const [VF] = useContractCall(rcu && VF_Fn) ?? []
    const getVaultFactory = () => {
        console.log("Vault Factory in TS file :", { VF })
        return (VF ? VF : "")
    }

    //SegaFactory - get Currecnt Vault Factory in Use
    const SF_Fn = { abi: vFactInterface, address: (VF ? VF : _vf), method: "segaFactory", args: [], }
    const [SF] = useContractCall(VF && SF_Fn) ?? []
    const getSegaFactory = () => {
        console.log("Sega Factory in TS file :", { SF })
        return (SF ? SF : "")
    }

    // getVaultList() - SHOW ALL VAULTS
    const getVaultListFn = { abi: vFactInterface, address: (VF ? VF : _vf), method: "getVaultList", args: [], }
    const [vaultList] = useContractCall(rcu && getVaultListFn) ?? []
    const getVaultList = () => {
        console.log("All Vault List :", { vaultList })
        return vaultList
    }

    // getSegaList() - SHOW ALL SEGAs
    const getSegaListFn = { abi: sFactInterface, address: (SF ? SF : _sf), method: "getSegaList", args: [], }
    const [segaList] = useContractCall(SF && getSegaListFn) ?? []
    const getSegaList = () => {
        console.log("All Sega List :", { segaList })
        return segaList
    }

    // changeAdmin() - Admin Function Only
    const { send: changeAdminSend, state: changeAdminState } =
        useContractFunction(RcuContract, "changeAdmin", { transactionName: "Change RP Admin" })
    const changeAdmin = (address) => { return changeAdminSend(address) }

    // changeAdmin() - Admin Function Only
    const { send: changeVFactSend, state: changeVFactState } =
        useContractFunction(RcuContract, "changeVaultFactory", { transactionName: "Change VFact" })
    const changeVFact = (address) => { return changeVFactSend(address) }

    // changeAdmin() - Admin Function Only
    const { send: changeSFactSend, state: changeSFactState } =
        useContractFunction(RcuContract, "updateSegaFactList", { transactionName: "Update SFact" })
    const changeSFact = (address, onoff) => { return changeSFactSend(address, onoff) }


    // launchVault() - Public Function
    const { send: launchVaultSend, state: launchVaultState } =
        useContractFunction(RcuContract, "launchVault", { transactionName: "Create New Vault" })
    const launchVault = () => {
        console.log(RcuContract)
        return launchVaultSend()
    }

    return {
        getRPAdmin,
        getVaultFactory,
        getSegaFactory,
        getVaultList,
        getSegaList,
        changeAdmin,
        changeAdminState,
        changeVFact,
        changeVFactState,
        changeSFact,
        changeSFactState,
        launchVault,
        launchVaultState,
    }
}
export function isAddress(address) {
    if (address) {
        try {
            getAddress(address)
        } catch (e) { return false }
        return true
    } else {
        return false
    }

}