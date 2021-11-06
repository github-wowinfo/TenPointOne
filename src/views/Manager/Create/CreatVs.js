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
                    <Row style={{display:'flex', flexDirection: 'row'}}>
                        <Col md='6'>
                            <CardHeader>
                                <CardTitle>Create New</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <CardText>Create new Vault and SEGAs. Account creations incur network fees.</CardText>                                
                            </CardBody>
                        </Col>
                        <Col  md='6' style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                            <Button.Ripple className='mr-1 mb-1' size='lg' color='primary' style={{fontSize: '1.7em'}} onClick={handleVaultModal}><PlusCircle className='mr-1' size={25}/>Vault</Button.Ripple>
                            <Button.Ripple className='mr-1 mb-1' size='lg' color='primary' style={{fontSize: '1.7em'}} onClick={handleSegaModal}><PlusCircle className='mr-1' size={25}/>Sega</Button.Ripple>
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