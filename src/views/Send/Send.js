import Cleave from 'cleave.js/react'
import Avatar from '@components/avatar'
import Select, { components } from 'react-select'
import { selectThemeColors } from '@utils'
import { FaRegCopy } from 'react-icons/fa'
import { GoLinkExternal } from 'react-icons/go'
import { BsArrowDown, BsSafe2 } from 'react-icons/bs'
import { IoQrCodeOutline } from 'react-icons/io5'
import { Card, CardHeader, CardTitle, CardBody, CardFooter, Form, FormGroup, Label, Input, Button, Row, Col, CardText } from 'reactstrap'
import Badge from 'reactstrap/lib/Badge'
import Icon from 'react-crypto-icons'
import { toast } from 'react-toastify'
import { Clipboard } from "react-feather"
import { useState, Fragment } from 'react'
import { useEthers, getExplorerAddressLink, shortenIfAddress } from '@usedapp/core'
import helperConfig from '../../helper-config.json'

const Send = () => {

  const { account, chainId } = useEthers()

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
  const bitcoin = <Icon name='btc' size={45} />
  const OptionComponent = ({ data, ...props }) => {

    return (
      <components.Option {...props}>
        <Icon name={data.icon} className='mr-50' size={30} />
        {data.label}
      </components.Option>
    )
  }
  const iconOptions = [
    {
      options: [
        {
          value: 'bitcoin',
          label: 'Bitcoin',
          icon: 'btc'
        },
        {
          value: 'ethereum',
          label: 'Ethereum',
          icon: 'etc'
        },
        {
          value: 'uniswap',
          label: 'Uniswap',
          icon: 'uni'
        },
        {
          value: 'litecoin',
          label: 'Litecoin',
          icon: 'ltc'
        },
        {
          value: 'cardano',
          label: 'Cardano',
          icon: 'ada'
        },
        {
          value: 'polkadot',
          label: 'Polkadot',
          icon: 'dot'
        },
        {
          value: 'stellar',
          label: 'Stellar',
          icon: 'xlm'
        },
        {
          value: 'dogecoin',
          label: 'Dogecoin',
          icon: 'doge'
        }
      ]
    }
  ]

  const networkIcon = chainId ? helperConfig.network[chainId].icon : "Not Connected"
  const networkName = chainId ? helperConfig.network[chainId].name : "Not Connected"
  const backgroundChange = { backgroundColor: networkName === "BSC testnet" ? '#cc9b00' : networkName === "Polygon Network" ? '#8146e4' : networkName === "Ethereum" ? '#4559f4' : networkName === "Kovan" ? '#6435c9' : networkName === "BSC Mainet" ? '#cc9b00' : networkName === "Polygon Mumbai" ? '#140035' : null }
  return (
    <>
      {isConnected ? (<Col style={cardStyle} md={{ offset: 3, size: 6 }} sm="12">
        <Card className='my-1 card-payment'>
          <CardHeader style={{ paddingBottom: '.3em' }}>
            <CardTitle>Send Funds</CardTitle>
          </CardHeader>
          <hr />
          <CardBody className='p-1'>
            <Row>
              <Col className='py-1' style={{ ...backgroundChange, textAlign: 'center', height: '100%' }}>
                <CardText style={{ color: 'white' }}><Icon className='mr-1' name={networkIcon} size={20} />Only send to {networkName} address</CardText>
              </Col>
            </Row>
            <Row className='d-flex flex-column'>
              <Col className='d-flex flex-row py-1'>
                <Avatar className='mr-1' size='lg' color={data[0].color} icon={data[0].icon} />
                <CardTitle className='my-1 '>SBI Vault</CardTitle>
              </Col>
              <Col className='d-flex flex-column justify-content-start'>
                <Col className='d-flex flex-row '>
                  <p style={{ color: 'gray' }}>{shortenIfAddress(account)}</p>
                  <Col>
                    <FaRegCopy style={{ cursor: 'pointer' }} className='mx-1' color='grey' size={15} onClick={copy} />
                    <a href={getExplorerAddressLink(account, chainId)} target='_blank'><GoLinkExternal color='grey' size={15} /></a>
                  </Col>
                </Col>
                <Badge style={{ width: '130px' }} color='secondary'>Balance: <strong>0 MATIC</strong></Badge>
              </Col>
            </Row>
            <Row className='mt-1' style={{ display: 'flex', flexDirection: 'row' }}>
              <Col md='1' className='mx-1'><BsArrowDown size={30} /></Col>
              <Col>
                <hr />
              </Col>
            </Row>
            <Form className='form mt-2' onSubmit={e => e.preventDefault()}>
              <Row>
                <Col sm='12'>
                  <FormGroup className='mb-2'>
                    <Label for='recepient' style={{ fontSize: '1.2em' }}>Recepient</Label>
                    <Row>
                      <Col md='10'>
                        <Input
                          className='form-control'
                          id='recepient'
                        />
                      </Col>
                      <Col>
                        <IoQrCodeOutline href='#' size={30} />
                      </Col>
                    </Row>
                  </FormGroup>
                </Col>
                <Col style={{ fontSize: '1.2em' }} className='mb-1' md='12' >
                  <Select
                    options={iconOptions}
                    className='react-select'
                    classNamePrefix='select'
                    placeholder='Select an asset...'
                    components={{
                      Option: OptionComponent
                    }}
                  />
                </Col>
                <Col sm='12'>
                  <FormGroup className='mb-1'>
                    <Row >
                      <Col>
                        <Label for='amount' style={{ fontSize: '1.2em' }}>Amount</Label>
                      </Col>
                      <Col style={{ textAlign: 'end' }}>
                        <Badge style={{ fontSize: ".9rem" }} color="primary" href='#' pill>Send Max</Badge>
                      </Col>
                    </Row>
                    <Input placeholder='Amount' id='amount' />
                  </FormGroup>
                </Col>
                <Col>
                </Col>
              </Row>
            </Form>
          </CardBody>
          <CardFooter>
            <Row >
              <Col>
                <Button.Ripple color='primary' block>
                  Send
                </Button.Ripple>
              </Col>
              <Col>
                <Button.Ripple color='primary' block>
                  Approve ERC
                </Button.Ripple>
              </Col>
            </Row>
          </CardFooter>
        </Card>
      </Col>) : disconnect()}
    </>
  )
}

export default Send