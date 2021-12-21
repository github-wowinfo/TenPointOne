import { Card, CardHeader, CardTitle, CardBody, CardFooter, Button, Row, Col, CardText, CardSubtitle } from 'reactstrap'
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
import { useEthers, shortenIfAddress, getExplorerAddressLink } from '@usedapp/core'
import helperConfig from '../../helper-config.json'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const Receive = ({ networkC }) => {

  const { account, chainId } = useEthers()

  const isConnected = account !== undefined

  const disconnect = () => {
    window.location.href = '/login'
  }

  const cardStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
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
  // const pathname = `https://etherscan.io/address/${account}`
  const pathname = `https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl= ${account}`

  const handleImageAlert = () => {
    return MySwal.fire({
      title: '',
      text: '',
      imageUrl: pathname,
      imageWidth: 300,
      imageHeight: 300,
      imageAlt: 'Custom image',
      customClass: { confirmButton: 'btn btn-primary' },
      buttonsStyling: false
    })
  }

  const data = [
    {
      icon: <BsSafe2 size={25} />,
      color: 'light-danger'
    }
  ]

  const networkIcon = helperConfig.network[chainId].icon
  const networkName = helperConfig.network[chainId].name
  const backgroundChange = { backgroundColor: networkName === "BSC testnet" ? '#cc9b00' : networkName === "Polygon Network" ? '#8146e4' : networkName === "Ethereum" ? '#4559f4' : networkName === "Kovan" ? '#6435c9' : networkName === "BSC Mainet" ? '#cc9b00' : networkName === "Polygon Mumbai" ? '#140035' : null }
  // const backgroundChange = { backgroundColor: networkC.name === 'BSC Mainet' ? '#cc9b01' : networkC.name === 'Etherum' ? '#627eea' : networkC.name === 'Optimism' ? '#ff0420' : networkC.name === 'Arbitrum' ? '#2d374b' : '#8247e5' }

  return (
    <>
      {isConnected ? (<Col style={cardStyle} md={{ offset: 3, size: 6 }} sm="12">
        <Card className='card-payment' >
          <CardHeader style={{ paddingBottom: '.1em' }}>
            <CardTitle>Receive Assests</CardTitle>
          </CardHeader>
          {/* <hr /> */}
          <CardBody style={{ padding: '1em' }}>
            <Row>
              <Col className='py-1' style={{ ...backgroundChange, textAlign: 'center', height: '100%' }}>
                <CardText style={{ color: 'white' }}><Icon className='mr-1' name={networkIcon} size={20} />{networkName} - only send {networkName} assests to this safe.</CardText>
              </Col>
            </Row>
            <Col className='my-1' style={{ textAlign: 'justify' }}>
              <CardText>This is the address of your Safe. Deposit funds by scanning the QR code or copying the above address below. Only send MATIC and assest to this address (e.g. ETH, ERC20, ERC721)!
              </CardText>
            </Col>
            <Row className='my-1 d-flex flex-column justify-content-center align-items-center'>
              <CardTitle style={{ textAlign: 'center', marginBottom: 0 }}><strong>SBI Vault</strong></CardTitle>
              <Button.Ripple size='sm' color='primary' style={{ width: 'fit-content' }} onClick={handleImageAlert}>Click here for QR Code</Button.Ripple>
              {/* <a href={pathname} target='_blank'>click for qr code</a>
              <Col style={{ textAlign: 'center' }}><img src={qrcode} style={{ width: '100px', height: '100px' }} /></Col> */}
            </Row>
            <Row className='d-flex flex-column justify-content-center align-items-center'>
              <Col className='text-center pb-1'><Avatar size='lg' color={data[0].color} icon={data[0].icon} /></Col>
              <Col className='text-center'>
                {/* <CardSubtitle style={{ color: 'gray' }} > <strong>{shortenIfAddress(account)}</strong></CardSubtitle> */}
                <CardSubtitle style={{ color: 'gray' }} > <strong>{account}</strong></CardSubtitle>
              </Col>
              <Col>
                <span className='d-flex flex-row justify-content-center'>
                  <FaRegCopy style={{ cursor: 'pointer' }} className='mx-1 mt-1' color='grey' size={20} onClick={copy} />
                  <a href={getExplorerAddressLink(account, chainId)} target='_blank'><GoLinkExternal className='mx-1 mt-1' color='grey' size={20} /></a>
                </span>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>) : disconnect()
      }
    </>

  )
}

const mapStateToProps = (state) => ({
  networkC: state.appData.network
})
export default connect(mapStateToProps, null)(Receive)