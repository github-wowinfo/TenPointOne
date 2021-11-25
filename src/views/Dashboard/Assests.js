import classnames from 'classnames'
import Avatar from '@components/avatar'
import { Link } from 'react-router-dom'
import { TrendingUp, User, Box, DollarSign } from 'react-feather'
import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col, Media, Badge } from 'reactstrap'
import Icon from 'react-crypto-icons'

const Assests = ({ cols = 0 }) => {
  const data = [
    {
      title: '2.35 BTC',
      subtitle: '$148,201.81',
      color: 'light-primary',
      icon: <Icon name='btc' size={45} />
    },
    {
      title: '0.50377 ETH',
      subtitle: '$2,094.09',
      color: 'light-info',
      icon: <Icon name='eth' size={45} />
    },
    {
      title: '404,373.77 UNI',
      subtitle: '$10,616,345.64',
      color: 'light-danger',
      icon: <Icon name='uni' size={45} />
    },
    {
      title: '250 D',
      subtitle: '$55.12',
      color: 'light-success',
      icon: <Icon name='doge' size={45} />
    }
  ]

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
            <Avatar color={item.color} icon={item.icon} className='mx-2' />
            <Media className='my-auto' body>
              <h5 className='font-weight-bolder mb-0'>{item.title}</h5>
              <CardText className='font-small-3 mb-0'>{item.subtitle}</CardText>
            </Media>
          </Media>
        </Col>
      )
    })
  }

  return (
    <Card className='card-statistics' style={{ height: "100%" }}>
      <CardHeader>
        <CardTitle >Assests</CardTitle>
        <CardText className='card-text font-small-2 mr-25 mb-0'>
          <Link to='/asset'>
            <Badge style={{ fontSize: "1.3em" }} color="primary" >View All</Badge>
          </Link>
        </CardText>
      </CardHeader>
      <CardBody className='statistics-body'>
        <Row>{renderData()}</Row>
      </CardBody>
    </Card>
  )
}

export default Assests
