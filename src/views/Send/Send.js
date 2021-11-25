import Cleave from 'cleave.js/react'
import Avatar from '@components/avatar'
import Select, { components } from 'react-select'
import { selectThemeColors } from '@utils'
import { FaRegCopy } from 'react-icons/fa'
import { GoLinkExternal } from 'react-icons/go'
import { BsArrowDown, BsSafe2 } from 'react-icons/bs'
import { IoQrCodeOutline } from 'react-icons/io5'
import { Card, CardHeader, CardTitle, CardBody, CardFooter, Form, FormGroup, Label, Input, Button, Row, Col } from 'reactstrap'
import Badge from 'reactstrap/lib/Badge'
import Icon from 'react-crypto-icons'
import { toast } from 'react-toastify'
import { Clipboard } from "react-feather"
import { useState, Fragment } from 'react'
import { useEthers } from '@usedapp/core'

const Send = () => {

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
  return (
    <>
      {isConnected ? (<Col style={cardStyle} md={{ offset: 3, size: 6 }} sm="12">
        <Card className='card-payment'>
          <CardHeader style={{ paddingBottom: '.3em' }}>
            <CardTitle style={{ fontSize: '1.2em' }}>Send Funds</CardTitle>
          </CardHeader>
          <hr />
          <CardBody>
            <Row>
              <Col md='2'><Avatar size='lg' color={data[0].color} icon={data[0].icon} /></Col>
              <Col className='d-flex flex-column justify-content-start'>
                <h4>SBI Vault</h4>
                <p style={{ color: 'gray', fontSize: '.9rem' }}>{account}
                  <FaRegCopy className='ml-1 mr-1' color='grey' size={15} onClick={copy} />
                  <a href={pathname}><GoLinkExternal color='grey' size={15} /></a>
                </p>
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
                        <Cleave
                          className='form-control'
                          options={{ creditCard: true }}
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
                <Button.Ripple color='success' outline block>
                  Review
                </Button.Ripple>
              </Col>
              <Col>
                <Button.Ripple color='success' outline block>
                  Clear
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