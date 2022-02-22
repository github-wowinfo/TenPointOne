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
import { PlusCircle } from "react-feather"
import CardText from 'reactstrap/lib/CardText'
import CreateVaultModal from './CreateVaultModal'
import CreateSegaModal from './CreateSegaModal'

const CreateVs = () => {
    const [vaultmodal, setVaultModal] = useState(false)
    const handleVaultModal = () => setVaultModal(!vaultmodal)

    const [segamodal, setSegaModal] = useState(false)
    const handleSegaModal = () => setSegaModal(!segamodal)
    return (
        <div>
            <Card>
                <CardBody>
                    <Row style={{ display: 'flex', flexDirection: 'row' }}>
                        <Col md='7'>
                            <CardHeader className='py-0'>
                                <CardTitle style={{ fontSize: '1.7em' }}>Create New</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <CardText style={{ fontSize: '1rem' }}>Create new Vault and SEGAs (incurs network fees)</CardText>
                            </CardBody>
                        </Col>
                        {/* <Col md='5' className='d-flex flex-column flex-sm-row justify-content-end align-items-center'> */}
                        <Col md='5' className='d-flex flex-wrap justify-content-end align-items-center'>
                            <Button.Ripple className='mr-1 mb-1' color='primary' style={{ fontSize: '1.7em' }} onClick={handleSegaModal}><PlusCircle className='mr-1' size={25} />Sega</Button.Ripple>
                            <Button.Ripple className='mr-1 mb-1' color='primary' style={{ fontSize: '1.7em' }} onClick={handleVaultModal}><PlusCircle className='mr-1' size={25} />Vault</Button.Ripple>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
            <CreateVaultModal openvault={vaultmodal} handleVaultModal={handleVaultModal} />
            <CreateSegaModal opensega={segamodal} handleSegaModal={handleSegaModal} />
        </div>
    )
}

export default CreateVs