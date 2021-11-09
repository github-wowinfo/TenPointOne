import React, { useState } from 'react'
import { Card, CardHeader, CardBody } from 'reactstrap'
import Col from 'reactstrap/lib/Col'
import Row from 'reactstrap/lib/Row'
import MainChart1 from "./Dashboard/MainChart1"
import MainChart2 from "./Dashboard/MainChart2"
import Assests from "./Dashboard/Assests"
import RecentTrans from "./Dashboard/RecentTrans"
import SegaDisplay from './Dashboard/SegaDisplay'
import Avatar from '@components/avatar'

const Home = () => {

  const [chart, setChart] = useState(true)

  return (
    <div>
      <Row>
        <Col>
          <Card className='my-1'>
            <CardHeader className='d-flex justify-content-start my-0'>
              Graphs -
              <Avatar className='mx-1' title='wave graph' content='1' size='sm' color='warning' onClick={() => setChart(true)} />
              <Avatar className='mx-1' title='line graph' content='2' size='sm' color='info' onClick={() => setChart(false)} />
              {/* <Badge className='mx-1' color='primary' pill href='#' onClick={() => setChart(true)}>
                <span className='align-middle'>.</span>
              </Badge> */}
              {/* <Badge className='mx-1' color='warning' pill href='#' onClick={() => setChart(false)}>
                <span className='align-middle'>.</span>
              </Badge> */}
            </CardHeader>
            <CardBody>
              {chart ? <MainChart2 /> : <MainChart1 />}
            </CardBody>
          </Card>
          <Row style={{ minHeight: "150px" }}>
            <Col>
              <Assests />
            </Col>
            <Col>
              <RecentTrans />
            </Col>
          </Row>
          <Row>
            <Col>
              <SegaDisplay />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default Home
