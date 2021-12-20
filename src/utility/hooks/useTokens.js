import { useEthers, useContractCall, NativeCurrency, Token, ERC20Interface } from "@usedapp/core"
import { constants } from "ethers"
import brownieConfig from "../../brownie_exports/brownie-config.json"
import helperConfig from "../../helper-config.json"
import helper2 from "../../helper-config2.json"

export const useTokens = (tokenTicker, assetAdrs) => {

    const { chainId } = useEthers()
    const networkName = chainId ? helperConfig[chainId] : "No Network"
    const networkId = chainId ? chainId : 0

    const addressZero = constants.AddressZerao
    const TokenZero = new Token("RP TokenZero", "ERROR", 0, addressZero, 0)

    // console.log('asssetadrs', assetAdrs)
    // console.log('tokenticker', tokenTicker)
    let tokenAddress = addressZero
    if (assetAdrs === addressZero) {
        tokenAddress = chainId ? brownieConfig["networks"][networkName][tokenTicker] : ""
        console.log('tokenaddress', tokenAddress)
    } else {
        tokenAddress = assetAdrs
    }

    // const tokenAddress = chainId ? brownieConfig["networks"][networkName][tokenTicker] : ""
    // console.log('tokenadrs', tokenAddress)
    const getNameFn = { abi: ERC20Interface, address: tokenAddress, method: "name", args: [], }
    const getSymbolFn = { abi: ERC20Interface, address: tokenAddress, method: "symbol", args: [], }
    const getDecimalFn = { abi: ERC20Interface, address: tokenAddress, method: "decimals", args: [], }

    const [name] = useContractCall(tokenAddress && getNameFn) ?? []
    const [symbol] = useContractCall(tokenAddress && getSymbolFn) ?? []
    const [decimals] = useContractCall(tokenAddress && getDecimalFn) ?? []
    console.log('from blockchain', name, symbol, decimals)

    const getToken = () => {
        if (tokenTicker.length > 0) {
            const token = new Token(name, symbol, networkId, tokenAddress, decimals)
            if (token.name) {
                return token
            } else {
                return TokenZero
            }
        } else {
            return TokenZero
        }
    }

    const getNative = () => {
        const Info = networkName ? helper2[networkName] : {}
        if (networkId) {
            const Native = new NativeCurrency(
                Info["name"], Info["symbol"],
                networkId, Info["decimals"]
            )
            return Native
        } else {
            const Native = new NativeCurrency(
                "ErrorNative", "ERROR", 0, 0)
            return Native
        }
    }

    return { addressZero, TokenZero, tokenAddress, getToken, getNative }
}