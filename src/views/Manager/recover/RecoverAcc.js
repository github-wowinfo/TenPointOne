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
import { Unlock } from "react-feather"
import CardText from 'reactstrap/lib/CardText'
import RecoverAccModal from './RecoverAccModal'

const RecoverAcc = () => {
    const [recovermodal, setRecoverModal] = useState(false)
    const handleRecoverModal = () => setRecoverModal(!recovermodal)
    return (
        <div>
            <Card>
                <CardBody>
                    <Row style={{ display: 'flex', flexDirection: 'row' }}>
                        <Col md='6'>
                            <CardHeader>
                                <CardTitle>Recover</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <CardText>Reclaim your Vault and SEGAs through the designated Backup Account.</CardText>
                            </CardBody>
                        </Col>
                        <Col md='6' style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Button.Ripple className='mr-1 mb-1' color='primary' style={{ fontSize: '1.7em' }} onClick={handleRecoverModal}><Unlock className='mr-1' size={25} />Vault</Button.Ripple>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
            <RecoverAccModal openrecovermodal={recovermodal} handleRecoverModal={handleRecoverModal} />
        </div>
    )
}

export default RecoverAcc