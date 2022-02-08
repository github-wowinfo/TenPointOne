import { Fragment, useEffect, useState } from "react"
import { connect } from "react-redux"
import { Button, Card, CardTitle, Col, Form, FormGroup, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap"
import * as AppData from '../../../redux/actions/cookies/appDataType'
import { shortenIfAddress, useEthers } from "@usedapp/core"
import exportFromJSON from 'export-from-json'
import { toast } from "react-toastify"
import Avatar from '@components/avatar'
import { FaRegCheckCircle } from "react-icons/fa"
// import CheckboxTree from 'react-checkbox-tree'
// import 'react-checkbox-tree/lib/react-checkbox-tree.css'

const Export_Modal = ({ openexport_modal, handleexport_modal }) => {

    const { account, chainId } = useEthers()

    const notifySuccess = () => toast.success(<SuccessToast />, { hideProgressBar: false, position: toast.POSITION.TOP_CENTER })
    const SuccessToast = () => (
        <Fragment>
            <div className='toastify-header'>
                <div className='title-wrapper'>
                    <Avatar size='md' color='success' icon={<FaRegCheckCircle size={12} />} />
                    <h3 className='toast-title'>Data Exported!</h3>
                </div>
            </div>
            <div className='toastify-body'>
                <span role='img' aria-label='toast-text'>
                    The Vault/Sega's data was succesfully exported, check for "Vault_Sega_Data.json" in your browser's download pane.
                </span>
            </div>
        </Fragment>
    )

    const [vaultList, setVaultList] = useState([])
    const [segaList, setSegaList] = useState([])
    const [dlist, setDlist] = useState([])

    const getVaultListFromLocal = () => {
        const getdata = JSON.parse(localStorage.getItem('vaultdata'))
        const valueData = getdata && getdata.filter(a => a.network === chainId && a.owner === account)
        setVaultList(valueData)
        // const reqData = valueData && valueData.map((vadrs) => ({ value: vadrs.address, label: vadrs.name }))
        // setVaultList(reqData)
    }

    const getSegaListFromLocal = () => {
        const getdata = JSON.parse(localStorage.getItem('segadata'))
        const valueData = getdata && getdata.filter(a => a.network === chainId && a.owner === account)
        setSegaList(valueData)
        // const reqData = valueData && valueData.map((sadrs) => ({ value: sadrs.address, label: sadrs.name, ofvault: sadrs.vault }))
        // setSegaList(reqData)
    }

    // console.log('vaultList', vaultList)
    // console.log('segaList', segaList)

    const [display_list, setDisplay_list] = useState([])
    const display = () => {
        vaultList.forEach(vault => { vault["checked"] = "no" })
        vaultList.forEach(vault => { vault["children"] = [] })
        segaList.forEach(sega => { sega["checked"] = "no" })
        // console.log('vaultList', vaultList)
        vaultList.forEach(vadrs => {
            segaList.forEach(sadrs => {
                if (sadrs.vault === vadrs.address) {
                    vadrs.children.push(sadrs)
                }
            })
        })
        setDisplay_list(vaultList)
    }

    useEffect(() => {
        getVaultListFromLocal()
        getSegaListFromLocal()
        display()
    }, [account, chainId, openexport_modal])

    // console.log('vaultList', vaultList)
    // console.log('segaList', segaList)

    const [v_check, setV_check] = useState(false)
    const [s_check, setS_check] = useState(false)
    const [v_list, setV_list] = useState([])
    const [s_list, setS_list] = useState([])
    const [check_flag, setCheck_flag] = useState(false)

    // console.log('v_list', v_list)
    // console.log('s_list', s_list)    

    const [final_list, setFinal_list] = useState([])
    const handleExport = () => {
        console.log('v_list', v_list)
        console.log('s_list', s_list)
        if (v_list.length > 0) {
            const newlist = v_list.concat(s_list)
            for (const i in newlist) {
                delete newlist[i].owner
            }
            setFinal_list(newlist)
        } else {
            setFinal_list([])
        }
    }
    console.log('final_list', final_list)

    useEffect(() => {
        handleExport()
    }, [check_flag])

    // const [expanded, setExpanded] = useState([])
    // const [checked, setChecked] = useState([])
    // console.log('checked', checked)

    return (
        <Modal isOpen={openexport_modal} toggle={() => {
            setV_check(false)
            setS_check(false)
            setV_list([])
            setS_list([])
            setFinal_list([])
            handleexport_modal()
        }}>
            <ModalHeader toggle={() => {
                setV_check(false)
                setS_check(false)
                setV_list([])
                setS_list([])
                setFinal_list([])
                handleexport_modal()
            }}>
                <CardTitle>Select Address that you want to export.</CardTitle>
            </ModalHeader>
            <ModalBody>
                <Card className='p-1 mb-0'>
                    <Form>
                        <FormGroup check>
                            {/* <CheckboxTree
                                nodes={display_list}
                                checked={checked}
                                expanded={expanded}
                                onCheck={checked => setChecked(checked)}
                                onExpand={expanded => setExpanded(expanded)}
                                showExpandAll='true'
                                noCascade='true'
                            /> */}
                            {display_list && display_list.map((i, indexv) => {
                                return (
                                    <>
                                        <Row>
                                            <Col>
                                                <Input className='my-1' key={indexv} type='checkbox' value={i}
                                                    checked={v_check[indexv]} onChange={e => {
                                                        setV_check(!v_check[indexv])
                                                        i.checked = "yes"
                                                        v_list.push(i)
                                                        // const { children, ...resti } = i
                                                        // v_list.push(resti)
                                                        if (!e.target.checked) {
                                                            setV_list(v_list.filter(vadrs => vadrs !== i))
                                                            i.checked = "no"
                                                            for (const i in s_list) {
                                                                if (s_list[i].checked === 'yes') {
                                                                    s_list.splice(i)
                                                                }
                                                            }
                                                        }
                                                        if (check_flag) {
                                                            setCheck_flag(false)
                                                        } else {
                                                            setCheck_flag(true)
                                                        }
                                                    }} />
                                                <h4 style={{ color: '#1919d2' }} className='mb-0 '>{i.name}</h4>
                                                <h6 className='font-weight-light '>{shortenIfAddress(i.address)}</h6>
                                            </Col>
                                        </Row>
                                        {i.children && i.children.map((j, indexs) => {
                                            return (
                                                <>
                                                    <Row>
                                                        <Col>
                                                            {i.checked === "yes" ? (
                                                                <Input className='my-1' key={indexs} type='checkbox' value={j}
                                                                    checked={s_check[indexs]} onChange={(e) => {
                                                                        setS_check(!s_check[indexs])
                                                                        j.checked = "yes"
                                                                        s_list.push(j)
                                                                        if (!e.target.checked) {
                                                                            setS_list(s_list.filter(sadrs => sadrs !== j))
                                                                            j.checked = "no"
                                                                        }
                                                                        if (check_flag) {
                                                                            setCheck_flag(false)
                                                                        } else {
                                                                            setCheck_flag(true)
                                                                        }
                                                                    }} />
                                                            ) : (
                                                                <Input className='my-1' key={indexs} type='checkbox'
                                                                    checked={false} disabled />
                                                            )}
                                                            <Col className='mx-1'>
                                                                <h4 style={{ color: '#1919d2' }} className='mb-0 '>{j.name}</h4>
                                                                <h6 className='font-weight-light '>{shortenIfAddress(j.address)}</h6>
                                                            </Col>
                                                        </Col>
                                                    </Row>
                                                </>
                                            )
                                        })}
                                    </>
                                )
                            })}
                        </FormGroup>
                    </Form>
                </Card>
            </ModalBody>
            <ModalFooter>
                <Col className='text-center'>
                    {final_list.length > 0 ? (
                        <Button.Ripple color="success" onClick={() => {
                            for (const i in final_list) {
                                delete final_list[i].children
                                delete final_list[i].checked
                            }
                            const export_list = final_list
                            console.log('export_list', export_list)

                            exportFromJSON(
                                {
                                    data: export_list,
                                    fileName: 'Vault_Sega_Data',
                                    exportType: exportFromJSON.types.json
                                }
                            )

                            setV_check(false)
                            setS_check(false)
                            setV_list([])
                            setS_list([])
                            setFinal_list([])
                            notifySuccess()
                            handleexport_modal()
                        }}>Export</Button.Ripple>
                    ) : (
                        <Button.Ripple color="success" disabled>Export</Button.Ripple>
                    )}

                </Col>
            </ModalFooter>
        </Modal>
    )
}

// export default ImportAdrsBook
const mapStateToProps = (state) => ({
    globalAdrs: state.appData.globalAdrs,
    globalNickName: state.appData.globalNickName,
    globalVaultFlag: state.appData.globalVaultFlag,
    globalFavFlag: state.appData.globalFavFlag
})
const mapDispatchToProp = dispatch => ({ dispatch })
export default connect(mapStateToProps, mapDispatchToProp)(Export_Modal)