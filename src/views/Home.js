import React, {useState} from 'react'
import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink } from 'reactstrap'
import Col from 'reactstrap/lib/Col'
import Row from 'reactstrap/lib/Row'
import MainChart1 from "./Dashboard/MainChart1"
import MainChart2 from "./Dashboard/MainChart2"
import Assests from "./Dashboard/Assests"
import RecentTrans from "./Dashboard/RecentTrans"
import SegaDisplay from './Dashboard/SegaDisplay'


const Home = () => {
  const cardstyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  }
  return (
      <div>
        <Row>
            <Col>
              {/* <MainChart1 /> */}
              <MainChart2 />
              <Row style={{minHeight: "150px"}}>
              <Col>
              <Assests />
              </Col>
              <Col>
              <RecentTrans />
              </Col>
              </Row>
              <Row>
                <Col><SegaDisplay/></Col>
              </Row>
            </Col>
        </Row>
      </div>
  )
}

export default Home
