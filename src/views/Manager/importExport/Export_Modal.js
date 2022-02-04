import { Fragment, useEffect, useState } from "react"
import { connect } from "react-redux"
import { Button, Card, CardTitle, Col, Form, FormGroup, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap"
import * as AppData from '../../../redux/actions/cookies/appDataType'
import { shortenIfAddress, useEthers } from "@usedapp/core"
import exportFromJSON from 'export-from-json'
import { toast } from "react-toastify"
import Avatar from '@components/avatar'
import { FaRegCheckCircle } from "react-icons/fa"

const Export_Modal = ({ openexport_modal, handleexport_modal }) => {

    const { account, chainId } = useEthers()

    const notifySuccess = () => toast.success(<SuccessToast />, { hideProgressBar: true })
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

    const getVaultListFromLocal = () => {
        const getdata = JSON.parse(localStorage.getItem('vaultdata'))
        const valueData = getdata && getdata.filter(a => a.network === chainId && a.owner === account)
        setVaultList(valueData)
    }

    const getSegaListFromLocal = () => {
        const getdata = JSON.parse(localStorage.getItem('segadata'))
        const valueData = getdata && getdata.filter(a => a.network === chainId && a.owner === account)
        setSegaList(valueData)
    }

    useEffect(() => {
        getVaultListFromLocal()
        getSegaListFromLocal()
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

    const [newlist, setNewlist] = useState([])
    const handleExport = () => {
        console.log('v_list', v_list)
        console.log('s_list', s_list)
        if (v_list.length > 0) {
            const final_list = v_list.concat(s_list)
            for (const i in final_list) {
                delete final_list[i].owner
            }
            setNewlist(final_list)
        }
    }
    console.log('newlist', newlist)

    useEffect(() => {
        handleExport()
    }, [check_flag])

    return (
        <Modal isOpen={openexport_modal} toggle={() => {
            setV_check(false)
            setS_check(false)
            setV_list([])
            setS_list([])
            setNewlist([])
            handleexport_modal()
        }}>
            <ModalHeader toggle={() => {
                setV_check(false)
                setS_check(false)
                setV_list([])
                setS_list([])
                setNewlist([])
                handleexport_modal()
            }}>
                <CardTitle>Select Address that you want to export.</CardTitle>
            </ModalHeader>
            <ModalBody>
                <Card className='p-1 mb-0'>
                    <Form>
                        <FormGroup check>
                            {vaultList && vaultList.map((i, indexv) => {
                                return (
                                    <>
                                        <Row>
                                            <Col>
                                                <Input className='my-1' key={indexv} type='checkbox' value={i}
                                                    checked={v_check[indexv]} onChange={e => {
                                                        // console.log('i', e.target.value)
                                                        // console.log('ii', i)
                                                        setV_check(!v_check[indexv])
                                                        v_list.push(i)
                                                        if (!e.target.checked) {
                                                            setV_list(v_list.filter(vadrs => vadrs !== i))
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
                                        {segaList && segaList.map((j, indexs) => {
                                            return (
                                                <>
                                                    {i.address === j.vault ? <>
                                                        <Row>
                                                            <Col>
                                                                <Input className='my-1' key={indexs} type='checkbox' value={j}
                                                                    checked={s_check[indexs]} onChange={(e) => {
                                                                        setS_check(!s_check[indexs])
                                                                        s_list.push(j)
                                                                        if (!e.target.checked) {
                                                                            setS_list(s_list.filter(sadrs => sadrs !== j))
                                                                        }
                                                                        if (check_flag) {
                                                                            setCheck_flag(false)
                                                                        } else {
                                                                            setCheck_flag(true)
                                                                        }
                                                                    }} />
                                                                <Col className='mx-1'>
                                                                    <h4 style={{ color: '#1919d2' }} className='mb-0 '>{j.name}</h4>
                                                                    <h6 className='font-weight-light '>{shortenIfAddress(j.address)}</h6>
                                                                </Col>
                                                            </Col>
                                                        </Row>
                                                    </> : null}
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
                    <Button.Ripple color="success" onClick={() => {
                        exportFromJSON(
                            {
                                data: newlist,
                                fileName: 'Vault_Sega_Data',
                                exportType: exportFromJSON.types.json
                            }
                        )
                        setV_check(false)
                        setS_check(false)
                        setV_list([])
                        setS_list([])
                        setNewlist([])
                        notifySuccess()
                        handleexport_modal()
                    }}>Export</Button.Ripple>
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