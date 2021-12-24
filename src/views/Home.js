import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardBody } from 'reactstrap'
import Col from 'reactstrap/lib/Col'
import Row from 'reactstrap/lib/Row'
import MainChart1 from "./Dashboard/MainChart1"
import MainChart2 from "./Dashboard/MainChart2"
import Assests from "./Dashboard/Assests"
import RecentTrans from "./Dashboard/RecentTrans"
import SegaDisplay from './Dashboard/SegaDisplay'
import Avatar from '@components/avatar'
import { useEthers } from '@usedapp/core/dist/esm/src/hooks/useEthers'
import helperConfig from '../helper-config.json'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Home = () => {

  const { account, chainId } = useEthers()

  const isConnected = account !== undefined

  const disconnect = () => {
    window.location.href = '/login'
  }

  const [chart, setChart] = useState(true)
  const [curt_chain, setCurt_chain] = useState(chainId)

  const MySwal = withReactContent(Swal)

  const netchange = async (netid) => {
    await ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: `${netid}` }] })
  }
  const handleAjax = (netid, name) => {
    return MySwal.fire({
      title: 'Do you want to change your current network?',
      // text: `Current network is "${helperConfig.network[chainId].name}"`,
      allowOutsideClick: true,
      showCancelButton: true,
      confirmButtonText: `Switch metamask to "${helperConfig.network[chainId].name} and log out"`,
      cancelButtonText: `Stay on "${helperConfig.network[curt_chain].name}"`,
      customClass: {
        confirmButton: 'btn btn-primary mx-1',
        cancelButton: 'btn btn-danger my-1'
      },
      showClass: {
        popup: 'animate__animated animate__flipInX'
      },
    }).then(function (result) {
      if (result.isConfirmed) {
        netchange(helperConfig.network[chainId].netid)
        setCurt_chain(chainId)
        disconnect()
      } else if (result.isDismissed) {
        netchange(helperConfig.network[curt_chain].netid)
      }
    })
  }

  useEffect(() => {
    if (chainId !== curt_chain) {
      handleAjax()
    }
  }, [chainId])

  return (

    <div>
      {isConnected ? (<Row>
        <Col>
          {/* <Card className='my-1'> */}
          {/* <CardHeader className='d-flex justify-content-start my-0 pb-0'> */}
          {/* <Avatar className='mx-1' title='wave graph' content='1' size='sm' color='warning' onClick={() => setChart(true)} />
              <Avatar className='mx-1' title='line graph' content='2' size='sm' color='info' onClick={() => setChart(false)} /> */}
          {/* <Badge className='mx-1' color='primary' pill href='#' onClick={() => setChart(true)}>
                <span className='align-middle'>.</span>
              </Badge> */}
          {/* <Badge className='mx-1' color='warning' pill href='#' onClick={() => setChart(false)}>
                <span className='align-middle'>.</span>
              </Badge> */}
          {/* </CardHeader> */}
          {/* <CardBody>
              {chart ? <MainChart2 /> : <MainChart1 />}
            </CardBody> */}
          {/* </Card> */}
          <Row >
            <Col md='4' className='my-1'>
              <Assests />
            </Col>
            <Col md='8' className='my-1'>
              <RecentTrans />
            </Col>
          </Row>
          <Row>
            <Col>
              <SegaDisplay />
            </Col>
          </Row>
        </Col>
      </Row>) : disconnect()}
    </div>

  )
}

export default Home
