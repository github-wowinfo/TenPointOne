import React, { useEffect, useState } from 'react'
import {
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    Button,
    Row,
    Col
} from 'reactstrap'
import { Edit3 } from "react-feather"
import CardText from 'reactstrap/lib/CardText'
import AddExeVault from './AddExeVault'
import AddExeSega from './AddExeSega'
import { connect } from 'react-redux'
import * as AppData from '../../../redux/actions/cookies/appDataType'
import { useEthers } from '@usedapp/core'

const AddRemove = ({ dispatch, globalVaultFlag }) => {

    const { account, chainId } = useEthers()

    const getVaultListFromLocalGlobal = () => {
        const getdata = JSON.parse(localStorage.getItem('vaultdata'))
        const valueData = getdata && getdata.filter(a => a.show === true && a.network === chainId && a.owner === account)
        const vaultlist = valueData && valueData.map((vault, index) => ({ value: index, adrs: vault.address, name: vault.name }))
        console.log('vaultlist', vaultlist)
        if (vaultlist && vaultlist.length > 0) {
            console.log('vaultlist', vaultlist)
            dispatch(AppData.globalAdrs(vaultlist[0].adrs))
            dispatch(AppData.globalNickName(vaultlist[0].name))
            // setVaultList(vaultlist)
        } else {
            dispatch(AppData.globalAdrs(''))
            dispatch(AppData.globalNickName('Create a Vault'))
        }
    }

    useEffect(() => {
        getVaultListFromLocalGlobal()
    }, [globalVaultFlag])

    const [exevaultmodal, setExeVaultModal] = useState(false)
    const handleExeVaultModal = () => setExeVaultModal(!exevaultmodal)

    const [exesegamodal, setExeSegaModal] = useState(false)
    const handleExeSegaModal = () => setExeSegaModal(!exesegamodal)
    return (
        <div>
            <Card>
                <CardBody>
                    <Row style={{ display: 'flex', flexDirection: 'row' }}>
                        <Col md='7'>
                            <CardHeader className='py-0'>
                                <CardTitle style={{ fontSize: '1.7em' }}>Add or Remove</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <CardText style={{ fontSize: '1rem' }}>Add or Remove your existing accounts from view.</CardText>
                            </CardBody>
                        </Col>
                        <Col md='5' style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Button.Ripple className='mr-1 mb-1' color='primary' style={{ fontSize: '1.7em' }} onClick={handleExeSegaModal}><Edit3 className='mr-1' size={25} />Sega</Button.Ripple>
                            <Button.Ripple className='mr-1 mb-1' color='primary' style={{ fontSize: '1.7em' }} onClick={handleExeVaultModal}><Edit3 className='mr-1' size={25} />Vault</Button.Ripple>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
            <AddExeVault openexevault={exevaultmodal} handleExeVaultModal={handleExeVaultModal} />
            <AddExeSega openexesega={exesegamodal} handleExeSegaModal={handleExeSegaModal} />
        </div>
    )
}

// export default AddRemove
const mapStateToProps = (state) => ({
    globalAdrs: state.appData.globalAdrs,
    globalNickName: state.appData.globalNickName
})
const mapDispatchToProp = dispatch => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProp)(AddRemove)