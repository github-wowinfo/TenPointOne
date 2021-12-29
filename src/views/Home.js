import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardBody, CardTitle } from 'reactstrap'
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
import { connect } from 'react-redux'
import * as AppData from '../redux/actions/cookies/appDataType'

const Home = ({ globalFlag, globalAdrs, dispatch, globalNickName }) => {

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
  const handleAjax = () => {
    return MySwal.fire({
      title: 'Do you want to change your current network?',
      // text: `Current network is "${helperConfig.network[chainId].name}"`,
      allowOutsideClick: false,
      showCancelButton: true,
      confirmButtonText: `Switch metamask to "${helperConfig.network[chainId].name} and log in again"`,
      cancelButtonText: `Stay on "${helperConfig.network[curt_chain].name}" and log in again`,
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
        disconnect()
      } else if (result.isDismissed) {
        disconnect()
        netchange(helperConfig.network[curt_chain].netid)
      }
    })
  }

  useEffect(() => {
    if (chainId !== curt_chain) {
      handleAjax()
    }
  }, [chainId])

  const [vaultList, setVaultList] = useState([])
  const getVaultListFromLocal = () => {
    const getdata = JSON.parse(localStorage.getItem('vaultdata'))
    const valueData = getdata && getdata.filter(a => a.show === true && a.network === chainId && a.owner === account)
    const vaultlist = valueData && valueData.map((vault, index) => ({ value: index, adrs: vault.address, name: vault.name }))
    if (vaultlist === []) {
      dispatch(AppData.globalAdrs(''))
      dispatch(AppData.globalNickName('Create a Vault'))
    } else {
      dispatch(AppData.globalAdrs(vaultlist[0].adrs))
      dispatch(AppData.globalNickName(vaultlist[0].name))
      setVaultList(vaultlist)
    }
  }

  useEffect(() => {
    getVaultListFromLocal()
  }, [account])

  const [assetList, setAssetList] = useState([])
  const [sum, setSum] = useState(0)
  const getTokenBalance = async () => {
    try {
      const response = await axios.get(`https://api.unmarshal.com/v1/${helperConfig.unmarshal[chainId]}/address/${globalAdrs}/assets?auth_key=CE2OvLT9dk2YgYAYfb3jR1NqCGWGtdRd1eoikUYs`)
      console.log('response', response)
      setAssetList(response.data)
      const balance = response.data.map(item => item.balance / (10 ** item.contract_decimals) * item.quote_rate).reduce((acc, curr) => acc + curr, 0)
      setSum(balance)


    } catch (error) {
      setAssetList([])
      console.log(`Asset [getTokkenBalance]`, error)
    }
  }

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
          <Row>
            <Col className='pt-1'>
              <Card className='mb-0'>
                <CardHeader>
                  <CardTitle>
                    Total Balance:  $ {sum}
                  </CardTitle>
                </CardHeader>
              </Card>
            </Col>
          </Row>
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

// export default Home

const mapStateToProps = (state) => ({
  globalFlag: state.appData.globalFlag,
  globalAdrs: state.appData.globalAdrs,
  globalNickName: state.appData.globalNickName
})
const mapDispatchToProp = dispatch => ({ dispatch })
export default connect(mapStateToProps, mapDispatchToProp)(Home)