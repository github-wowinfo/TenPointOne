import { Card, CardHeader, CardTitle, CardBody, CardFooter, Button, Row, Col } from 'reactstrap'
import { BsArrowDown, BsSafe2 } from 'react-icons/bs'
import { FaRegCopy } from 'react-icons/fa'
import { GoLinkExternal } from 'react-icons/go'
import { connect } from 'react-redux'
import Avatar from '@components/avatar'
import qrcode from './qrcode_localhost.png'
import Icon from 'react-crypto-icons'

const Receive = ({ networkC }) => {
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
  const backgroundChange = { backgroundColor: networkC.name === 'BSC Mainet' ? '#cc9b01' : networkC.name === 'Etherum' ? '#627eea' : networkC.name === 'Optimism' ? '#ff0420' : networkC.name === 'Arbitrum' ? '#2d374b' : '#8247e5' }

  return (
    <Col style={cardStyle} md={{ offset: 3, size: 6 }} sm="12">
      <Card className='card-payment' >
        <CardHeader style={{ paddingBottom: '.3em' }}>
          <CardTitle style={{ fontSize: '1.5em' }}>Receive Assests</CardTitle>
        </CardHeader>
        <hr />
        <CardBody style={{ padding: '1em' }}>
          <Row>
            <Col style={{ ...backgroundChange, textAlign: 'center', height: '100%', paddingTop: '10px' }}>
              <p style={{ fontSize: '1.5em', color: 'white' }}><Icon className='mr-1' name={networkC.icon} size={20} />{networkC.name} - only send {networkC.name} assests to this safe.</p>
            </Col>
          </Row>
          <Col className='my-3' style={{ fontSize: '1.5em', textAlign: 'justify' }}>
            <p>This is the address of your Safe. Deposit funds by scanning the QR code or copying the above address below. Only send MATIC and assest to this address (e.g. ETH, ERC20, ERC721)!
            </p>
          </Col>
          <Row className='my-1' style={{ display: 'flex', flexDirection: 'column' }}>
            <Col style={{ textAlign: 'center', fontSize: '2.5em' }}><strong>SBI Vault</strong></Col>
            <Col style={{ textAlign: 'center' }}><img src={qrcode} style={{ width: '200px', height: '200px' }} /></Col>
          </Row>
          <Row>
            <Col md='2' className="mx-1"><Avatar size='xl' color={data[0].color} icon={data[0].icon} className='mx-2' /></Col>
            <Col style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h4 style={{ color: 'gray' }}>mt2jon6BFcMpzBHbFKCmY5HszSj6fRQjfJ
                <FaRegCopy style={{ marginLeft: '35px', marginRight: '15px' }} size={20} />
                <GoLinkExternal size={20} />
              </h4>
            </Col>
          </Row>
        </CardBody>
        <CardFooter>
          <Row>
            <Col style={{ display: 'flex', justifyContent: 'center' }}>
              <Button.Ripple style={{ width: "50%" }} color='success' block>
                Done
              </Button.Ripple>
            </Col>
          </Row>
        </CardFooter>
      </Card>
    </Col >
  )
}

const mapStateToProps = (state) => ({
  networkC: state.appData.network
})
export default connect(mapStateToProps, null)(Receive)