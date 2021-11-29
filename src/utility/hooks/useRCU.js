import { useEthers, useContractFunction, useContractCall } from "@usedapp/core"
import { utils, constants } from "ethers"
import { Contract } from "@ethersproject/contracts"
import brownieConfig from '../../brownie_exports/brownie-config.json'
import helperConfig from '../../helper-config.json'
import RCU from '../../brownie_exports/chain-info/contracts/DeployRCU_P.json'

export const useRCU = () => {

    const { chainId } = useEthers()
    const networkName = chainId ? helperConfig[chainId] : "Not Connected"
    const rcu = chainId ? brownieConfig["networks"][networkName]["RCU"] : constants.AddressZero

    const { abi } = RCU
    const RcuInterface = new utils.Interface(abi)
    const RcuContract = new Contract(rcu, RcuInterface)

    // getVaultList() - SHOW ALL VAULTS
    const getVaultListFn = { abi: RcuInterface, address: rcu, method: "getVaultList", args: [], }
    const [vaultList] = useContractCall(getVaultListFn) ?? []
    const getVaultList = () => {
        console.log("All Vault List :", { vaultList })
        return vaultList
    }

    const { send: launchVaultSend, state: launchVaultState } =
        useContractFunction(RcuContract, "launchVault", { transactionName: "Create New Vault" })
    const launchVault = () => {
        console.log(RcuContract)
        return launchVaultSend()
    }

    return {
        launchVault,
        launchVaultState,
        getVaultList,
    }
}