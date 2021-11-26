import { Card, CardHeader, CardTitle, CardBody, CardFooter, Button, Row, Col } from 'reactstrap'
import { BsArrowDown, BsSafe2 } from 'react-icons/bs'
import { FaRegCopy } from 'react-icons/fa'
import { GoLinkExternal } from 'react-icons/go'
import { connect } from 'react-redux'
import Avatar from '@components/avatar'
import qrcode from './qrcode_localhost.png'
import Icon from 'react-crypto-icons'
import { toast } from 'react-toastify'
import { Clipboard } from "react-feather"
import { useState, Fragment } from 'react'
import { useEthers } from '@usedapp/core'

const Receive = ({ networkC }) => {

  const { account } = useEthers()

  const isConnected = account !== undefined

  const disconnect = () => {
    window.location.href = '/login'
  }

  const cardStyle = {
    display: 'flex',
    justifyContent: 'center',
    alighnItems: 'center'
  }

  const [text, setText] = useState(account)
  const notifySuccess = () => toast.success(<SuccessToast />, { hideProgressBar: true })
  const copy = async () => {
    await navigator.clipboard.writeText(text)
    notifySuccess()
  }

  const SuccessToast = () => (
    <Fragment>
      <div className='toastify-header'>
        <div className='title-wrapper'>
          <Avatar size='sm' color='success' icon={<Clipboard size={12} />} />
          <h6 className='toast-title'>Copied to Clipboard!</h6>
        </div>
      </div>
    </Fragment>
  )
  const pathname = `https://etherscan.io/address/${account}`

  const data = [
    {
      icon: <BsSafe2 size={25} />,
      color: 'light-danger'
    }
  ]
  const backgroundChange = { backgroundColor: networkC.name === 'BSC Mainet' ? '#cc9b01' : networkC.name === 'Etherum' ? '#627eea' : networkC.name === 'Optimism' ? '#ff0420' : networkC.name === 'Arbitrum' ? '#2d374b' : '#8247e5' }

  return (
    <>
      {isConnected ? (<Col style={cardStyle} md={{ offset: 3, size: 6 }} sm="12">
        <Card className='card-payment' >
          <CardHeader style={{ paddingBottom: '.3em' }}>
            <CardTitle style={{ fontSize: '1.2em' }}>Receive Assests</CardTitle>
          </CardHeader>
          <hr />
          <CardBody style={{ padding: '1em' }}>
            <Row>
              <Col style={{ ...backgroundChange, textAlign: 'center', height: '100%', paddingTop: '10px' }}>
                <p style={{ fontSize: '1.5em', color: 'white' }}><Icon className='mr-1' name={networkC.icon} size={20} />{networkC.name} - only send {networkC.name} assests to this safe.</p>
              </Col>
            </Row>
            <Col className='my-2' style={{ fontSize: '1.2em', textAlign: 'justify' }}>
              <p>This is the address of your Safe. Deposit funds by scanning the QR code or copying the above address below. Only send MATIC and assest to this address (e.g. ETH, ERC20, ERC721)!
              </p>
            </Col>
            <Row className='my-1' style={{ display: 'flex', flexDirection: 'column' }}>
              <Col style={{ textAlign: 'center', fontSize: '2.2em' }}><strong>SBI Vault</strong></Col>
              <Col style={{ textAlign: 'center' }}><img src={qrcode} style={{ width: '200px', height: '200px' }} /></Col>
            </Row>
            <Row>
              <Col sm='12' md='2' className="pr-0 mr-1"><Avatar size='lg' color={data[0].color} icon={data[0].icon} className='mx-1' /></Col>
              <Col className='pl-0 d-flex flex-column justify-content-center align-items-center'>
                <p style={{ color: 'gray', fontSize: '.9em', marginBottom: '0px' }}><strong>{account}</strong>
                </p>
                <span className='d-flex flex-row justify-content-center'>
                  <FaRegCopy className='mx-1 mt-1' color='grey' size={15} onClick={copy} />
                  <a href={pathname} target='_blank'><GoLinkExternal className='mx-1 mt-1' color='grey' size={15} /></a>
                </span>
              </Col>
            </Row>
          </CardBody>
          <CardFooter>
            <Row>
              <Col style={{ display: 'flex', justifyContent: 'center' }}>
                <Button.Ripple style={{ maxWidth: "50%" }} color='success' block>
                  Done
                </Button.Ripple>
              </Col>
            </Row>
          </CardFooter>
        </Card>
      </Col>) : disconnect()}
    </>

  )
}

const mapStateToProps = (state) => ({
  networkC: state.appData.network
})
export default connect(mapStateToProps, null)(Receive)