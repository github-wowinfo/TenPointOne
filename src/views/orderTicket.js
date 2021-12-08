// import { Box, Typography, Divider, Button, Input, makeStyles, Select, MenuItem, TextField, Snackbar } from "@material-ui/core"
// import { Alert } from "@material-ui/lab"
import { Alert } from "reactstrap"
import React, { useEffect, useState } from "react"
import { CurrencyValue, Token, useEthers, useEtherBalance, useTokenBalance, getExplorerTransactionLink } from "@usedapp/core"
import { getAddress } from "ethers/lib/utils"
import { constants, utils, BigNumber } from "ethers"
import { useTokens } from '../utility/hooks/useTokens'
import { useTransfers } from "../utility/hooks/useTransfers"

// const useStyles = makeStyles((theme) => ({
//     box: {
//         margin: 2,
//         padding: 5,
//         backgroundColor: "White",
//         borderRadius: "25px",
//     }
// }))

export const OrderTicket = (opcode, vault, sega) => {

    // const classes = useStyles()

    const operations = {
        0: "Enter Account Details",
        1: "Vault Send Out",
        2: "Sega Force Recall",
        3: "Sega Send Out",
    }

    const { chainId } = useEthers()

    /////////////////////////////////////////////
    // Getting To and From Addresses for Transfers
    //////////////////////////////////////////////

    const intialToAddress = ((opcode === '2' && vault) ? vault : "none")
    const fromAddress = (opcode === '2' || opcode === '3') ? (sega ? sega : constants.AddressZero) : (vault ? vault : constants.AddressZero)

    // Reading ToAddress Input Box Inputs
    const [toAddress, setToAddress] = useState(intialToAddress)
    function isAddress(address) {
        try {
            getAddress(address)
        } catch (e) { return false }
        return true
    }
    const handleToAddressInput = (event) => {
        const newAddress = event.target.value === "" ? "" : event.target.value
        if (isAddress(newAddress)) {
            setToAddress(newAddress)
            console.log("Setting To Address:", newAddress)
        }
    }
    useEffect(() => {
        if (opcode === '2' && vault) {
            setToAddress(vault)
        }

    }, [vault, sega, opcode])

    //////////////////////////////////////////////////
    // Getting Token TO Be Transferred
    //////////////////////////////////////////////////

    // Populating all Token Holdings and Capturing Token to Trader
    // @ Mohd : The ERC20 list should come from all asset holdings of From Account

    const [tokenTicker, setTokenTicker] = useState("")

    const { TokenZero,
        tokenAddress,
        getToken,
        getNative } = useTokens(tokenTicker)

    const nativeToken = getNative()

    const erc20List = ["RISK", "LINK", "USDC"]
    const tokenList = [nativeToken.ticker].concat(erc20List)

    const [haveToken, setHaveToken] = useState(0)
    const [usingNative, setUsingNative] = useState(0)
    const handleSetTokenTicker = (event) => {
        setUsingNative(0)
        console.log("zzz1")
        setHaveToken(0)
        const _tokenTicker = String(event.target.value)
        console.log("Got Token Name:", _tokenTicker)
        console.log("Token List:", tokenList)
        console.log(tokenList.indexOf(_tokenTicker))

        if (tokenList.indexOf(_tokenTicker) !== -1) {
            setTokenTicker(_tokenTicker)
        } else {
            setTokenTicker(TokenZero.ticker)
        }
    }

    const ercToken = getToken()
    useEffect(() => {
        if (tokenTicker === nativeToken.ticker) {
            setUsingNative(1)
            setHaveToken(1)
        }
        if (ercToken?.name !== TokenZero.name) {
            setHaveToken(1)
        }
    }, [ercToken, tokenTicker, nativeToken, TokenZero])


    //////////////////////////////////////////////////
    // Getting Amount To Transfer
    //////////////////////////////////////////////////


    const [amount, setAmount] = useState(0)
    const handleInputAmount = (event) => {
        const newAmount = (event.target.value) === "" ? "" : Number(event.target.value)
        if (newAmount) {
            setAmount(newAmount)
        } else {
            setAmount(0)
        }
        console.log("newAmt", newAmount)
    }

    const fromAccNativeBalance = useEtherBalance(fromAddress)
    const fromAccTokenBalance = useTokenBalance(tokenAddress, fromAddress)
    const nativeBal = new CurrencyValue(nativeToken, fromAccNativeBalance ? fromAccNativeBalance : BigNumber.from(0))
    const ercTokenBal = new CurrencyValue(ercToken, fromAccTokenBalance ? fromAccTokenBalance : BigNumber.from(0))
    const decimals = usingNative ? nativeToken.decimals : ercToken.decimals
    const bigNumAmount = haveToken ? utils.parseUnits(amount, decimals) : BigNumber.from(0)


    //////////////////////////////////////////////////
    // Sending Trasnfer Instructions & Their Progress
    //////////////////////////////////////////////////

    const {
        vaultTransferNative,
        vaultTransferErc,
        recallNative,
        recallErc,
        segaTransferNative,
        segaTransferErc,
        segaApproveErc,
        TransferState
    } = useTransfers(vault, sega)

    const handleVaultSend = () => {
        console.log("handleVaultSend")
        if (usingNative) {
            vaultTransferNative(toAddress, bigNumAmount)
        } else {
            vaultTransferErc(toAddress, tokenAddress, bigNumAmount)
        }
    }

    const handleForceRecall = () => {
        console.log("handleForceRecall")
        if (usingNative) {
            recallNative(bigNumAmount)
        } else {
            recallErc(tokenAddress, bigNumAmount)
        }
    }

    const handleSegaTransfer = () => {
        console.log("handleSegaTransfer")
        if (usingNative) {
            segaTransferNative(toAddress, bigNumAmount)
        } else {
            segaTransferErc(toAddress, tokenAddress, bigNumAmount)
        }
    }

    const handleSegaApprove = () => {
        console.log("handleSegaApprove")
        segaApproveErc(toAddress, tokenAddress, bigNumAmount)
    }

    //SNACKBAR FOR GENERAL TRANSACTIONS
    const [txnID, setTxnID] = useState("")
    const [showTxnMiningSnack, setShowTxnMiningSnack] = useState(false)
    const [showTxnSuccessSnack, setTxnSuccessSnack] = useState(false)
    const handleTxnSnackClose = () => {
        console.log("Txn In Progress / Completed:", getExplorerTransactionLink(txnID, chainId))
        setShowTxnMiningSnack(false)
        setTxnSuccessSnack(false)
    }

    useEffect(() => {
        if (TransferState.status === "Mining") {
            const tx_id = String(TransferState.transaction?.hash)
            setTxnID(tx_id)
            console.log("***Handle TX_ID: ", TransferState.status, tx_id)
            setShowTxnMiningSnack(true)
        }
        if (TransferState.status === "Success") { setTxnSuccessSnack(true) }
    }, [TransferState])


    const handleLog = () => {
        const y = new CurrencyValue(nativeToken, BigNumber.from("100000000000000000000"))
        //const z = new CurrencyValue(ercToken,BigNumber.from("100000000000000000000"))
        console.log(y.format())
        //console.log(z.format())
        console.log("Amount:", amount)
        console.log("Decimals:", decimals)
        console.log("BigNumAmt", utils.commify(bigNumAmount))
        console.log("Frm Address", fromAddress)
        console.log("Vault", vault)
        console.log("To Address", toAddress)
    }

    /////////////////////////////////////////////////////////////////////////////////////
    //                     COMPONENT RETURN STATEMENTS
    /////////////////////////////////////////////////////////////////////////////////////

    return ((opcode === "0") ? "" : <>
        {/* <Typography color="primary">
                <Box className={classes.box}>

                    <Box m={1} pt={0} display='flex' justifyContent="center">

                        <b>Order Ticket App</b>

                    </Box><Divider /> */}

        {/*-----------Operation Information----------*/}
        {/* <Typography color="textSecondary">
                        <Box m={1} pt={0} display="flex" justifyContent="justify">
                            <Box m={1} pt={0}>
                                <Box><b>Operation : </b>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                                </Box>
                                <Box>{operations[opcode]}</Box>
                            </Box>
                            <Box m={1} pt={0}>
                                <Box><b>Vault :&emsp;</b>{vault ? vault : "n.a."}</Box>
                                <Box><b>Sega  :&emsp;</b>{sega ? sega : "n.a."}</Box>
                            </Box>
                        </Box> </Typography><Divider /> */}

        {/*///////////////////////////////////////////////*/}
        {/*-------------------Trade Entry-----------------*/}

        {/*-------------------From Address--------------*/}
        {/* <Box sx={{ p: 1 }} display="flex">
                        <Button
                            color="primary" size="small"
                            style={{ minWidth: '175px', maxHeight: '30px' }}>
                            From :
                        </Button>&emsp;
                        <Box>{fromAddress}</Box>
                    </Box> <Divider /> */}

        {/*-------------------To Address--------------*/}
        {/* <Box sx={{ p: 1 }} display="flex">
                        <Button
                            color="primary" size="small"
                            style={{ minWidth: '175px', maxHeight: '30px' }}>
                            To :
                        </Button>&emsp;
                        {(opcode !== "2")
                            ? <Input onChange={handleToAddressInput} style={{ minWidth: '400px' }} />
                            : <Box>{toAddress}</Box>
                        }
                    </Box> <Divider /> */}

        {/*-------------Select Token For Transfer--------------*/}
        {/* <Box sx={{ p: 1 }} display="flex">
                        <Button style={{ minWidth: '175px' }}>Select Token :</Button> &emsp;

                        <Select labelId="TokenLabel" id="Token" value={tokenTicker} style={{ minWidth: '100px' }}
                            variant="outlined" onChange={handleSetTokenTicker}>
                            {tokenList.map((token, index) => (
                                <MenuItem key={index} value={token}>
                                    {token}
                                </MenuItem>
                            ))}
                        </Select> &ensp;&ensp;

                        <Box style={{ minWidth: '500px' }}>
                            {
                                haveToken === 0 ? <></> :
                                    <>
                                        <Box sx={{ p: 0 }}>
                                            Address : &ensp;
                                            {usingNative ? "native" : ercToken.address}
                                        </Box>
                                        <Box sx={{ p: 0 }}>
                                            Name :
                                            {usingNative ? nativeToken.name : ercToken.name}
                                            &emsp;Symbol :
                                            {usingNative ? nativeToken.ticker : ercToken.ticker}
                                            &emsp; Decimals :
                                            {usingNative ? nativeToken.decimals : ercToken.decimals}
                                        </Box>
                                    </>
                            }
                        </Box>
                    </Box> <Divider /> */}

        {/*-------------------Input Transfer Amount--------------*/}
        {/* <Box sx={{ p: 1 }} display="flex">
                        <Button style={{ minWidth: '175px' }}> Amount :</Button> &emsp;
                        <TextField onChange={handleInputAmount} style={{ maxWidth: '80px' }}
                            InputProps={{ inputProps: { min: 0 } }} />
                        <Box style={{ minWidth: '500px' }}>
                            {
                                haveToken === 0 ? <></> :
                                    <>
                                        <Box sx={{ p: 1 }}>
                                            &emsp; Available Balance :
                                            {usingNative ? nativeBal.format() : ercTokenBal.format()}
                                        </Box>
                                    </>
                            }
                        </Box>
                    </Box><Divider /> */}

        {/*-------------------Send Transaction Buttons--------------*/}
        {/* <Box sx={{ p: 1 }} display="flex">
                        {
                            opcode === '1' ?
                                <Button style={{ minWidth: '175px' }} color="secondary"
                                    variant="contained" onClick={handleVaultSend} >
                                    Send (from Vault) </Button>

                                : opcode === '2' ?
                                    <Button style={{ minWidth: '175px' }} color="secondary"
                                        variant="contained" onClick={handleForceRecall} >
                                        Force Recall </Button>

                                    : <>
                                        <Button style={{ minWidth: '175px' }} color="secondary"
                                            variant="contained" onClick={handleSegaTransfer} >
                                            Send (from Sega) </Button> &emsp;

                                        <Button style={{ minWidth: '175px' }} color="secondary"
                                            variant="contained" onClick={handleSegaApprove} >
                                            Approve ERC (from Sega) </Button>
                                    </>
                        } */}

        {/*------------------Dummy Dummy Dummy-----------*/}
        {/* &emsp;
                        <Button onClick={handleLog}
                            color="default" size="small" variant="contained"
                            style={{ minWidth: '175px' }}>
                            TestLog
                        </Button>
                    </Box> <Divider />

                </Box>
            </Typography> */}

        {/*------------------------------------------------------*/}
        {/*--------------------SNACKBAR ALERTS-------------------*/}

        {/* To Show Txn in Progress  */}
        {/* <Snackbar open={showTxnMiningSnack} autoHideDuration={500000} onClose={handleTxnSnackClose} > */}
        <Alert onClose={handleTxnSnackClose} severity="info">
            <div>Transaction in Progress- Txn ID : &emsp; </div>
            <a href={getExplorerTransactionLink(txnID, chainId ? chainId : 1)}
                target="_blank" rel="noreferrer">
                {(txnID)} </a>
        </Alert>
        {/* </Snackbar> */}

        {/* To Show Txn Success  */}
        {/* <Snackbar open={showTxnSuccessSnack} autoHideDuration={15000} onClose={handleTxnSnackClose} > */}
        <Alert onClose={handleTxnSnackClose} severity="success">
            <div>Transaction Completed - Txn ID :</div>
            <a href={getExplorerTransactionLink(txnID, chainId ? chainId : 1)}
                target="_blank" rel="noreferrer">
                {(txnID)} </a>
        </Alert>
        {/* </Snackbar> */}


    </>
    )
}