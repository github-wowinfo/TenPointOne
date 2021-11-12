import React, {useState} from 'react'
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

const AddRemove = () => {
    const [exevaultmodal, setExeVaultModal] = useState(false)
    const handleExeVaultModal = () => setExeVaultModal(!exevaultmodal)

    const [exesegamodal, setExeSegaModal] = useState(false)
    const handleExeSegaModal = () => setExeSegaModal(!exesegamodal)
    return (
        <div>
            <Card>
                <CardBody>
                    <Row style={{display:'flex', flexDirection: 'row'}}>
                        <Col md='6'>
                            <CardHeader>
                                <CardTitle>Add or Remove</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <CardText>Show or hide your existing accounts from view.</CardText>                                
                            </CardBody>
                        </Col>
                        <Col  md='6' style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                            <Button.Ripple className='mr-1 mb-1' size='lg' color='primary' style={{fontSize: '1.7em'}} onClick={handleExeVaultModal}><Edit3 className='mr-1' size={25}/>Vault</Button.Ripple>
                            <Button.Ripple className='mr-1 mb-1' size='lg' color='primary' style={{fontSize: '1.7em'}} onClick={handleExeSegaModal}><Edit3 className='mr-1' size={25}/>Sega</Button.Ripple>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
            <AddExeVault openexevault={exevaultmodal} handleExeVaultModal={handleExeVaultModal} />
            <AddExeSega openexesega={exesegamodal} handleExeSegaModal={handleExeSegaModal} />
        </div>
    )
}

export default AddRemove