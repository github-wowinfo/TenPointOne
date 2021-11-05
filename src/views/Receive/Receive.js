import { Card, CardHeader, CardTitle, CardBody, Form, FormGroup, Label, Input, Button, Row, Col } from 'reactstrap'
import {BsArrowDown, BsSafe2} from 'react-icons/bs'
import {FaRegCopy} from 'react-icons/fa'
import {GoLinkExternal} from 'react-icons/go'
import Avatar from '@components/avatar'
import qrcode from './qrcode_localhost.png'

const Receive = () => {
  const cardStyle = {
    display: 'flex',
    justifyContent: 'center',
    alighnItems: 'center'       
}
const data = [
  {
      icon: <BsSafe2 size={25} />,
      color: 'light-danger'
  }
]
  return (
    <Col style={cardStyle} md={{offset: 3, size: 6 }} sm="12">
      <Card className='card-payment' > 
          <CardHeader>
            <CardTitle style={{fontSize: '2em'}}>Receive Assests</CardTitle>
          </CardHeader>
          <hr/>
          <CardBody>
            <Row>
              <Col style = {{backgroundColor: '#7367f0', textAlign: 'center', height:'100%', width: '10vw', padding: '10px', borderRadius:'10px'}}>
                <p style={{fontSize: '1.5em', color:'white'}}>Polygon Network - only send Polygon assests to this safe.</p>
              </Col>
            </Row>
            <Col className='my-1' style={{fontSize:'1.5em', textAlign:'justify'}}>
              <p>This is the address of your Safe. Deposit funds by scanning the QR code or copying the above address below. Only send MATIC and assest to this address (e.g. ETH, ERC20, ERC721)!  
              </p>
            </Col>
            <Row style={{display:'flex', flexDirection: 'column'}}>
              <Col style={{textAlign:'center', fontSize:'2em'}}><strong>SBI Vault</strong></Col>
              <Col style={{textAlign: 'center'}}><img src={qrcode} style={{width: '200px', height:'200px'}}/></Col>
            </Row>
            <Row>
            <Col md='2'><Avatar size='xl' color={data[0].color} icon={data[0].icon} className='m2' /></Col>
            <Col style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <h4 style={{color: 'gray'}}>mt2jon6BFcMpzBHbFKCmY5HszSj6fRQjfJ
                 <FaRegCopy style={{marginLeft: '35px', marginRight:'15px' }}  size={20}/>
                <GoLinkExternal size={20}/>
                </h4>
            </Col>
            </Row>            
            <hr/>
                <Row >
                  <Col style={{display:'flex', justifyContent:'center'}}>
                      <Button.Ripple style={{width:"50%"}} size='lg' color='success' block>
                        Done
                      </Button.Ripple>
                  </Col>
                </Row>
          </CardBody>
          </Card>
    </Col>
  )
}

export default Receive