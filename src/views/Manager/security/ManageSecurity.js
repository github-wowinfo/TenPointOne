import React, { useState } from 'react'
import {
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    Button,
    Row,
    Col
} from 'reactstrap'
import { Tool } from "react-feather"
import CardText from 'reactstrap/lib/CardText'
import VaultSecurity from './VaultSecurity/VaultSecurity'
import SegaSecurity from './SegaSecurity/SegaSecurity'

const ManageSecurity = () => {
    const [vaultsecmodal, setVaultSecModal] = useState(false)
    const handleVaultSecModal = () => setVaultSecModal(!vaultsecmodal)

    const [segasecmodal, setSegaSecModal] = useState(false)
    const handleSegaSecModal = () => setSegaSecModal(!segasecmodal)
    return (
        <div>
            <Card>
                <CardBody>
                    <Row style={{ display: 'flex', flexDirection: 'row' }}>
                        <Col md='7'>
                            <CardHeader className='py-0'>
                                <CardTitle style={{ fontSize: '1.7em' }}>Manage Security</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <CardText style={{ fontSize: '1rem' }}>Modify security and recovery parameters of your accounts.</CardText>
                            </CardBody>
                        </Col>
                        <Col md='5' style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Button.Ripple className='mr-1 mb-1' color='primary' style={{ fontSize: '1.7em' }} onClick={handleSegaSecModal}><Tool className='mr-1' size={25} />Sega</Button.Ripple>
                            <Button.Ripple className='mr-1 mb-1' color='primary' style={{ fontSize: '1.7em' }} onClick={handleVaultSecModal}><Tool className='mr-1' size={25} />Vault</Button.Ripple>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
            <VaultSecurity openvaultsec={vaultsecmodal} handleVaultSecModal={handleVaultSecModal} />
            <SegaSecurity opensegasec={segasecmodal} handleSegaSecModal={handleSegaSecModal} />
        </div>
    )
}

export default ManageSecurity