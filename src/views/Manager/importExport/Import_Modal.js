import { Fragment, useState } from "react"
import { connect } from "react-redux"
import { Button, CardTitle, Col, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import * as AppData from '../../../redux/actions/cookies/appDataType'
import { useEthers } from "@usedapp/core"
import { toast } from "react-toastify"
import Avatar from '@components/avatar'
import { FaRegCheckCircle } from "react-icons/fa"

const Import_Modal = ({ openimport_modal, handleimport_modal, globalVaultFlag, dispatch }) => {

    const { account } = useEthers()

    const disconnect = () => {
        window.location.href = '/home'
        // setLoginModal(!loginModal)
    }

    const notifySuccess = () => toast.success(<SuccessToast />, { hideProgressBar: false })
    const SuccessToast = () => (
        <Fragment>
            <div className='toastify-header'>
                <div className='title-wrapper'>
                    <Avatar size='md' color='success' icon={<FaRegCheckCircle size={12} />} />
                    <h3 className='toast-title'>Data Imported!</h3>
                </div>
            </div>
            <div className='toastify-body'>
                <span role='img' aria-label='toast-text'>
                    The Vault/Sega's data was succesfully imported and can be found in your navigation pane.
                </span>
            </div>
        </Fragment>
    )

    const [adrsFile, setAdrsFile] = useState()
    const [selectedFile, setSelectedFile] = useState()
    const [isjson, setIsjson] = useState(false)
    const changeHandler = (e) => {
        const upload = e.target.files[0]
        if (upload.type === "application/json") {
            setIsjson(true)
            const fileReader = new FileReader()
            fileReader.readAsText(e.target.files[0], "UTF-8")
            fileReader.onload = e => {
                setSelectedFile(e.target.result)
                const result = JSON.parse(e.target.result)
                setAdrsFile(result)
            }
        } else {
            alert('The uploaded file is of the wrong format. File should be a ".JSON" file')
            setIsjson(false)
        }
    }

    const addToAdrsBook = (list) => {
        for (const i in list) {
            delete list[i].show
            delete list[i].vault
            list[i]['isFav'] = false
        }
        const adrs_list = list.map(j => ({ adrs: j.address, nickname: j.name, isFav: j.isFav, network: j.network, owner: j.owner }))
        const getAdrsdata = JSON.parse(localStorage.getItem('adrsbook'))
        let adrsbook = []
        if (getAdrsdata) {
            adrsbook = [...getAdrsdata].concat(adrs_list)
        } else {
            adrsbook = adrs_list
        }
        localStorage.setItem('adrsbook', JSON.stringify(adrsbook))
    }

    const handleImport = (adrsFile) => {
        if (adrsFile.length > 0) {
            for (const i in adrsFile) {
                adrsFile[i]['owner'] = account
            }
        }
        let v_list = []
        let s_list = []
        adrsFile.forEach(i => {
            if (i.vault) {
                s_list.push(i)
            } else {
                v_list.push(i)
            }
        })

        /*Pushing data to local Vault data*/
        const getvdata = JSON.parse(localStorage.getItem('vaultdata'))
        let vaultdata = []
        if (getvdata) {
            vaultdata = getvdata.concat(v_list)
        } else {
            vaultdata = v_list
        }
        localStorage.setItem('vaultdata', JSON.stringify(vaultdata))

        /*Pushing data to local Sega data*/
        const getsdata = JSON.parse(localStorage.getItem('segadata'))
        let segadata = []
        if (getsdata) {
            segadata = getsdata.concat(s_list)
        } else {
            segadata = s_list
        }
        localStorage.setItem('segadata', JSON.stringify(segadata))
        addToAdrsBook(adrsFile)

        if (globalVaultFlag === 0) {
            dispatch(AppData.globalVaultFlag(1))
        } else {
            dispatch(AppData.globalVaultFlag(0))
        }

        v_list = []
        s_list = []
        setSelectedFile()
        setAdrsFile()
        setIsjson(false)
        notifySuccess()
        handleimport_modal()
        // disconnect()

        // console.log('v_list', v_list)
        // console.log('s_list', s_list)
        // console.log('adrsFile', adrsFile)
    }

    return (
        <Modal isOpen={openimport_modal} toggle={() => {
            setSelectedFile()
            setAdrsFile()
            setIsjson(false)
            handleimport_modal()
        }}>
            <ModalHeader tag='h2' toggle={() => {
                setSelectedFile()
                setAdrsFile()
                setIsjson(false)
                handleimport_modal()
            }}>
                {/* <span style={{ color: '#1919d2' }}>Upload/Select Address Book data (.JSON)</span> */}
                <CardTitle className='mb-0'>Upload Vault & Sega data (.JSON)</CardTitle>
            </ModalHeader>
            <ModalBody>
                <Col className='text-center'>
                    <input type="file" name="file" accept=".json" onChange={changeHandler} />
                </Col>
                {selectedFile ? (
                    <Col className='m-1' style={{ overflow: 'auto' }}>
                        {selectedFile}
                    </Col>
                ) : null}
            </ModalBody>
            <ModalFooter>
                <Col className='text-center'>
                    {isjson ? (
                        <Button.Ripple color="primary" onClick={() => handleImport(adrsFile)}>Import</Button.Ripple>
                    ) : (
                        <Button.Ripple color="primary" disabled>Import</Button.Ripple>
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
export default connect(mapStateToProps, mapDispatchToProp)(Import_Modal)