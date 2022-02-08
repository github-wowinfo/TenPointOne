import classnames from 'classnames'
import Avatar from '@components/avatar'
import { Link } from 'react-router-dom'
import { TrendingUp, User, Box, DollarSign } from 'react-feather'
import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col, Media, Badge, CardFooter } from 'reactstrap'
import Icon from 'react-crypto-icons'
import { useEthers } from '@usedapp/core'
import { useEffect, useState } from 'react'
import axios from 'axios'
import helperConfig from '../../helper-config.json'
import { connect } from 'react-redux'
import { BsCurrencyBitcoin, BsCurrencyDollar, BsToggle2Off, BsToggle2On } from 'react-icons/bs'
import { AiOutlineDollar } from 'react-icons/ai'
import { BiToggleLeft, BiToggleRight } from 'react-icons/bi'
import "react-toggle/style.css"
import Toggle from 'react-toggle'

const Assests = ({ cols = 0, globalAdrs }) => {

  const { account, chainId } = useEthers()

  const [assetList, setAssetList] = useState([])
  const getTokenBalance = async () => {
    try {
      const response = await axios.get(`https://api.unmarshal.com/v1/${helperConfig.unmarshal[chainId]}/address/${globalAdrs}/assets?auth_key=CE2OvLT9dk2YgYAYfb3jR1NqCGWGtdRd1eoikUYs`)
      // const response = await axios.get(`https://api.unmarshal.com/v1/${helperConfig.unmarshal[chainId]}/address/${account}/assets?auth_key=CE2OvLT9dk2YgYAYfb3jR1NqCGWGtdRd1eoikUYs`)
      console.log('response', response)
      setAssetList(response.data)


    } catch (error) {
      setAssetList([])
      console.log(`Asset [getTokkenBalance]`, error)
    }
  }

  useEffect(() => {
    getTokenBalance()
  }, [account, chainId, globalAdrs])

  console.log('assetList', assetList)

  const data = assetList.slice(0, 6)

  const addDefaultSrc = (ev) => {
    ev.target.src = require(`@src/assets/images/logo/question.jpg`).default
  }
  // const data = [
  //   {
  //     title: '2.35 BTC',
  //     subtitle: '$148,201.81',
  //     color: 'light-primary',
  //     icon: <Icon name='btc' size={45} />
  //   },
  //   {
  //     title: '0.50377 ETH',
  //     subtitle: '$2,094.09',
  //     color: 'light-info',
  //     icon: <Icon name='eth' size={45} />
  //   },
  //   {
  //     title: '404,373.77 UNI',
  //     subtitle: '$10,616,345.64',
  //     color: 'light-danger',
  //     icon: <Icon name='uni' size={45} />
  //   },
  //   {
  //     title: '250 D',
  //     subtitle: '$55.12',
  //     color: 'light-success',
  //     icon: <Icon name='doge' size={45} />
  //   }
  // ]

  const [showDollar, setShowDollar] = useState(true)

  const renderData = () => {
    return data.map((item, index) => {
      const margin = Object.keys(cols)
      return (
        <Col
          key={index}
          {...cols}
          className={classnames({
            [`mb-2 mb-${margin[0]}-0`]: index !== data.length - 1
          })}
        >
          <Media>
            <Avatar size='lg' img={item.logo_url} onError={addDefaultSrc} className='mx-2' />
            {/* <img src={item.logo_url && item.logo_url} alt={item.contract_ticker_symbol} style={{ height: 40, width: 40, marginRight: 10 }} onError={addDefaultSrc} /> */}
            <Media className='my-auto' body>
              <h5 className='font-weight-bolder mb-0'>{
                item.contract_ticker_symbol.length > 5 ? item.contract_ticker_symbol.substring(0, 5).concat('..') : item.contract_ticker_symbol}</h5>
              {showDollar ? (
                <CardText className='font-small-3 mb-0'>$ {(item.balance / (10 ** item.contract_decimals) * item.quote_rate).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</CardText>
              ) : (
                <CardText className='font-small-3 mb-0'>{((item.balance / (10 ** item.contract_decimals))).toLocaleString()} </CardText>
              )}
            </Media>
          </Media>
        </Col>
      )
    })
  }

  return (
    <Card className='card-statistics' style={{ height: "100%" }}>
      <CardHeader>
        <CardTitle >Top Assests</CardTitle>
        <CardText className='card-text font-small-2 mr-25 mb-0'>
          <Link to='/asset'>
            <Badge style={{ fontSize: "1.3em" }} color="primary" >View All</Badge>
          </Link>
        </CardText>
      </CardHeader>
      <CardBody className='statistics-body'>
        <Row>{renderData()}</Row>
      </CardBody>
      <Col className='text-right'>
        <label>
          <Toggle
            defaultChecked={showDollar}
            icons={{
              checked: <BsCurrencyDollar style={{ color: 'white' }} />,
              unchecked: <BsCurrencyBitcoin style={{ color: 'white' }} />,
            }}
            onChange={() => setShowDollar(!showDollar)} />
        </label>
        {/* {showDollar ? (
          <Col>
            <BiToggleRight size={25} style={{ cursor: 'pointer' }} onClick={() => setShowDollar(false)} />
            <BsCurrencyDollar size={30} />
          </Col>
        ) : (
          <Col>
            <BsCurrencyBitcoin size={30} />
            <BiToggleLeft size={25} style={{ cursor: 'pointer' }} onClick={() => setShowDollar(true)} />
          </Col>
        )} */}
      </Col>
      {/* <CardFooter>
        <Col className='text-right'>
          {showDollar ? (
            <Col>
              <BiToggleRight size={25} style={{ cursor: 'pointer' }} onClick={() => setShowDollar(false)} />
              <AiOutlineDollar size={30} />
            </Col>
          ) : (
            <Col>
              <BsCurrencyBitcoin size={30} />
              <BiToggleLeft size={25} style={{ cursor: 'pointer' }} onClick={() => setShowDollar(true)} />
            </Col>
          )}
        </Col>
      </CardFooter> */}
    </Card>
  )
}

// export default Assests
const mapStateToProps = (state) => ({
  globalAdrs: state.appData.globalAdrs,
  globalNickName: state.appData.globalNickName
})
// const mapDispatchToProp = dispatch => ({dispatch})

export default connect(mapStateToProps, null)(Assests)
