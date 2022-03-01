import { DropdownToggle, DropdownItem, DropdownMenu, ButtonDropdown, UncontrolledButtonDropdown, Button, Row, Col } from "reactstrap"
import { Link } from 'react-router-dom'
import { IoQrCodeOutline } from 'react-icons/io5'
import { SiWebmoney, SiGithubactions } from "react-icons/si"
import { FaRegCopy } from 'react-icons/fa'
import { GoLinkExternal } from 'react-icons/go'
import { BsSafe2 } from 'react-icons/bs'
import { BiChevronDown } from 'react-icons/bi'
import { PlusCircle, Clipboard, ChevronRight, ChevronsRight } from "react-feather"
import { randomHexColor } from 'random-hex-color-generator'
import { toast } from 'react-toastify'
import Avatar from '@components/avatar'
import { connect } from 'react-redux'
import { Fragment, useEffect, useState } from 'react'
import { useEthers, getExplorerAddressLink, getExplorerTransactionLink, shortenIfAddress } from "@usedapp/core"
import Icon from 'react-crypto-icons'
import helperConfig from '../../helper-config.json'
import Text from '../../views/CustomComponent/Text'
import DropList from "./DropList"
import { GiCircleCage, GiShipWheel } from "react-icons/gi"
// import { useSkin } from '@hooks/useSkin'


const OwnerDisplay = ({ menuCollapsed, menuHover, networkC, globalAdrs, globalNickName, globalVaultFlag, skin }) => {

  const { account, chainId } = useEthers()
  // const [skin, setSkin] = useSkin()

  const notifySuccess = () => toast.success(<SuccessToast />, { hideProgressBar: false })

  const copy = async () => {
    // await navigator.clipboard.writeText(globalAdrs)
    // notifySuccess()
    const textField = document.createElement('textarea')
    textField.innerText = globalAdrs
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()

    notifySuccess()
  }

  const SuccessToast = () => (
    <Fragment>
      <div className='toastify-header'>
        <div className='title-wrapper'>
          <Avatar size='md' color='success' icon={<Clipboard size={12} />} />
          <h3 className='toast-title'>Copied to Clipboard!</h3>
        </div>
      </div>
    </Fragment>
  )

  const [is_sega, setis_sega] = useState()
  const [segaList, setSegaList] = useState([])
  const getSegaListFromLocal = () => {
    const getdata = JSON.parse(localStorage.getItem('segadata'))
    const valueData = getdata && getdata.filter(a => a.show === true && a.network === chainId && a.owner === account)
    const segalist = valueData && valueData.map((sega, index) => ({ value: index, adrs: sega.address, name: sega.name, ofvault: sega.vault }))
    setSegaList(segalist)
  }

  useEffect(() => {
    getSegaListFromLocal()
    const segaadrs = segaList && segaList.find(i => i.adrs === globalAdrs)
    // console.log('segaadrs', segaadrs)
    if (segaadrs === undefined || segaadrs === null) {
      setis_sega(false)
    } else {
      setis_sega(true)
    }
  }, [globalAdrs, account, chainId, is_sega])

  const stylecontainer = {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    margin: ' 0px 1rem'
  }
  const networkstyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '2em',
    color: 'white',
    fontSize: '1.5em'
  }

  const networkIcon = chainId ? helperConfig.network[chainId].icon : "Not Connected"
  const networkName = chainId ? helperConfig.network[chainId].name : "Not Connected"
  const backgroundChange = { backgroundColor: networkName === "BSC Testnet" ? '#cc9b00' : networkName === "Polygon" ? '#8146e4' : networkName === "Ethereum" ? '#4559f4' : networkName === "Kovan" ? '#6435c9' : networkName === "BSC Mainet" ? '#cc9b00' : networkName === "Polygon Mumbai" ? '#140035' : null }

  const [dropList, setDropList] = useState(false)
  const handleDropList = () => setDropList(!dropList)

  const logos = [
    {
      // icon: <GiShipWheel size={25} />,
      icon: <GiCircleCage size={27} />,
      color: 'primary',
      // color: 'light-primary'
    },
    {
      icon: <GiShipWheel size={27} />,
      color: 'primary',
      // color: 'light-primary'
    }
  ]

  const dstyle = skin === 'dark' ? {
    border: '1px solid  white',
    borderRadius: '10px'
  } : {
    background: "#fcfaff",
    boxShadow: '-20px 20px 60px #d6d5d9, 20px -20px 60px #ffffff',
    borderRadius: '10px'
  }

  const renderItem = () => {
    return (
      <div className="mb-2 pb-1" style={dstyle} >
        <Col style={{ padding: '0px 0px' }}>
          <Col style={{ ...networkstyle, ...backgroundChange, fontSize: '1em', marginBottom: '0px' }} className='my-1 d-flex flex-row flex-nowrap align-self-center '>
            {/* <Icon className='mr-1' name={networkC.icon} size={20} />{networkC.name} */}
            <Icon className='mr-1' name={networkIcon} size={20} />{networkName}
          </Col>
          {/* <Link to='/home'>
            {globalNickName === 'Create a Vault' ? (
              <Avatar size='xl' color={logos[0].color} title={globalNickName} icon={logos[0].icon} href='/home' />
            ) : (
              is_sega ? (
                <Avatar size='xl' color={logos[1].color} title={globalNickName} icon={logos[1].icon} href='/home' />
              ) : (
                <Avatar size='xl' color={logos[0].color} title={globalNickName} icon={logos[0].icon} href='/home' />
              )
            )}
          </Link> */}
          <Col>
            <Link to='/home'>
              {/* <Avatar size='xl' color='light-danger' title='SBI Vault' icon={<BsSafe2 size={25} />} href='/home' /> */}
              {globalNickName === 'Create a Vault' ? (
                <Row className='d-flex flex-row justify-content-center align-items-center'>
                  <Col md='2' style={{ paddingLeft: '10px' }}>
                    <Avatar size='md' color={logos[0].color} onClick={() => { window.location.href = '/manager' }} title={globalNickName} icon={logos[0].icon} href='/home' />
                  </Col>
                  <Col md='10' className='px-0'>
                    <h4 className="mb-0 text-primary" style={{ cursor: 'pointer' }} onClick={() => { window.location.href = 'manager' }}>{globalNickName}</h4>
                  </Col>
                </Row>
              ) : (
                is_sega ? (
                  <Row className='d-flex flex-row justify-content-center align-items-center'>
                    <Col md='2' style={{ paddingLeft: '10px' }}>
                      <Avatar size='md' color={logos[1].color} title={globalNickName} icon={logos[1].icon} href='/home' />
                    </Col>
                    <Col md='10' className='px-0 text-break text-wrap'>
                      <h4 className="mb-0 text-primary">{globalNickName}</h4>
                      {/* <h5 className="font-weight-light">{shortenIfAddress(globalAdrs)}</h5> */}
                    </Col>
                  </Row>
                ) : (
                  <Row className='d-flex flex-row justify-content-center align-items-center'>
                    <Col md='2' style={{ paddingLeft: '10px' }}>
                      <Avatar size='md' color={logos[0].color} title={globalNickName} icon={logos[0].icon} href='/home' />
                    </Col>
                    <Col md='10' className='px-0 text-break text-wrap'>
                      <h4 className="mb-0 text-primary">{globalNickName}</h4>
                      {/* <h5 className="font-weight-light">{shortenIfAddress(globalAdrs)}</h5> */}
                    </Col>
                  </Row>
                )
              )}
            </Link>
          </Col>
        </Col>

        <Col style={{ padding: '0px 0px' }}>
          {/* {globalNickName === 'Create a Vault' ? (
            <Link to='/manager'>
              <h3 className="text-primary my-1" style={{ cursor: 'pointer' }} >{globalNickName} </h3>
            </Link>
          ) : (
            <div>
              <h3 className="text-primary mt-1" >{globalNickName}</h3>
            </div>
          )} */}
          <Row className='py-1 d-flex flex-column'>
            {/* <h3 className="font-weight-light">{shortenIfAddress(globalAdrs)}</h3> */}
            <Col>
              <h4 className="font-weight-light">{shortenIfAddress(globalAdrs)}</h4>
            </Col>
            <Col className='d-flex flex-row justify-content-around align-items-center'>
              <Link to='/receive'><IoQrCodeOutline className="mx-1" color={skin === 'dark' ? 'white' : 'gray'} size={25} /></Link>

              <FaRegCopy style={{ cursor: 'pointer' }} className="mx-1" color={skin === 'dark' ? 'white' : 'gray'} size={25} onClick={copy} />

              <a href={getExplorerAddressLink(globalAdrs, chainId ? chainId : 1)} target='_blank'><GoLinkExternal className="mx-1" color={skin === 'dark' ? 'white' : 'gray'} size={25} /></a>
            </Col>
          </Row>
          {/* < <Col></Col>Button.Ripple className='my-1' color='flat-primary' onClick={handleDropList}>
          {/* < <Col></Col>Button.Ripple className='my-1' color='flat-primary' onClick={handleDropList}>
          {/* < <Col></Col>Button.Ripple className='my-1' color='flat-primary' onClick={handleDropList}>
            {globalNickName} <ChevronRight size={25} />
          </Button.Ripple> */}
          {/* <UncontrolledButtonDropdown style={{ minWidth: "90%" }} direction='right' onClick={handleDropList}> */}
          {/* <UncontrolledButtonDropdown style={{ minWidth: "90%" }} onClick={handleDropList}>
            <DropdownToggle className='pt-1 pb-0 flat-primary' color='none' caret>
              <h2 className="text-primary" >{globalNickName} <ChevronRight size={25} /></h2>
            </DropdownToggle> */}
          {/* <DropdownMenu >
              <Link to='/manager'>
                <DropdownItem tag='a' ><PlusCircle className='mr-1' size={25} />Add Vault or Sega</DropdownItem>
              </Link>
              <DropdownItem href='#' tag='a' >
                <Row className='d-flex flex-row justify-content-between flex-nowrap ' >
                  <Col className='d-flex flex-row'>
                    <BsSafe2 style={{ color: randomHexColor() }} size={20} />
                    <Col>
                      <dl>
                        <dt>HDFC Vault</dt> <dd>mxt3AjNu1ddQH3vgghfk7VaSLcbfnpMf5p</dd>
                      </dl></Col>
                  </Col>
                  <Col className='text-right'>0 MATIC</Col>
                </Row>
                <DropdownItem>
                  <Row className='d-flex flex-row justify-content-between flex-nowrap '>
                    <Col className='d-flex flex-row'>
                      <SiWebmoney style={{ color: randomHexColor() }} size={20} />
                      <Col><dl><dt>HDFC Fixed</dt> <dd>mpTdJWDkGhxvBxNVaFaC4M43K5SrUStFED</dd></dl></Col>
                    </Col>
                    <Col className='text-right'>0 MATIC</Col>
                  </Row>
                </DropdownItem>
                <DropdownItem>
                  <Row className='d-flex flex-row justify-content-between flex-nowrap '>
                    <Col className='d-flex flex-row'>
                      <SiWebmoney style={{ color: randomHexColor() }} size={20} />
                      <Col><dl><dt>HDFC Savings</dt> <dd>muV7tYEeEsw6K1XGGtfVXVsfRkkSYXbavB</dd></dl></Col>
                    </Col>
                    <Col className='text-right'>0 MATIC</Col>
                  </Row>
                </DropdownItem>
              </DropdownItem>
              <DropdownItem href='#' tag='a'>
                <Row className='d-flex flex-row justify-content-between flex-nowrap '>
                  <Col className='d-flex flex-row'>
                    <BsSafe2 style={{ color: randomHexColor() }} size={20} />
                    <Col><dl><dt>SBI Vault</dt> <dd>miMMmeXPLjEwz9Ycx4RPSFrQm9k7DbRXhT</dd></dl></Col>
                  </Col>
                  <Col className='text-right'>0 MATIC</Col>
                </Row>
                <DropdownItem>
                  <Row className='d-flex flex-row justify-content-between flex-nowrap '>
                    <Col className='d-flex flex-row'>
                      <SiWebmoney style={{ color: randomHexColor() }} size={20} />
                      <Col><dl><dt>SBI Checking</dt> <dd>muV7tYEeEsw6K1XGGtfVXVsfRkkSYXbavB</dd></dl></Col>
                    </Col>
                    <Col className='text-right'>0 MATIC</Col>
                  </Row>
                </DropdownItem>
              </DropdownItem>
              <DropdownItem href='#' tag='a'>
                <Row className='d-flex flex-row justify-content-between flex-nowrap '>
                  <Col className='d-flex flex-row'>
                    <BsSafe2 style={{ color: randomHexColor() }} size={20} />
                    <Col><dl><dt>ICICI Vault</dt> <dd>mxCuUj9nwZW5jW4XRYgRzGSM9SHzwysS5g</dd></dl></Col>
                  </Col>
                  <Col className='text-right'>0 MATIC</Col>
                </Row>
                <DropdownItem>
                  <Row className='d-flex flex-row justify-content-between flex-nowrap '>
                    <Col className='d-flex flex-row'>
                      <SiWebmoney style={{ color: randomHexColor() }} size={20} />
                      <Col><dl><dt>ICICI Savings</dt> <dd>mn6xBdNukvvTCux9qenZRcbvFBWmW5hESM</dd></dl></Col>
                    </Col>
                    <Col className='text-right'>0 MATIC</Col>
                  </Row>
                </DropdownItem>
              </DropdownItem>
            </DropdownMenu> */}
          {/* </UncontrolledButtonDropdown> */}
          <Col className='d-flex flex-row justify-content-center align-items-center'>
            <UncontrolledButtonDropdown md='6' >
              <DropdownToggle size='md' className='btn-gradient-primary round' color='none' caret>
                Quick Actions
              </DropdownToggle>
              <DropdownMenu style={{ minWidth: '200px' }} >
                {/* <DropdownItem className='px-1 py-0' >
                  <dl>
                    <dt>{globalNickName}</dt>
                    <dd>{shortenIfAddress(globalAdrs)}</dd> */}
                {/* <dd>{account && account.slice(0, 10)}...{account && account.slice(account.length - 4, account.length)}</dd> */}
                {/* <Text name={account} fchar={10} lchar={4} /> */}
                {/* <dd>{accAdrs}</dd> */}
                {/* </dl>
                </DropdownItem> */}
                {/* <DropdownItem divider></DropdownItem>
                <DropdownItem style={{ display: 'flex', justifyContent: 'space-between' }} href='#'>
                  <Link to='/receive'><IoQrCodeOutline color='grey' size={25} /></Link>
                  <FaRegCopy color='grey' size={25} onClick={copy} />
                  <a href={getExplorerAddressLink(globalAdrs, chainId ? chainId : 1)} target='_blank'><GoLinkExternal color='grey' size={25} /></a>
                </DropdownItem>
                <DropdownItem divider></DropdownItem> */}
                <DropdownItem className='text-center py-0' tag='a'>
                  <Link to='/send'>
                    <Button.Ripple color='primary' style={{ minWidth: '120px' }}>SEND</Button.Ripple>
                  </Link>
                  {/* <Link to='/send'>SEND</Link> */}
                </DropdownItem>
                <DropdownItem divider></DropdownItem>
                <DropdownItem className='text-center py-0' tag='a'>
                  <Link to='/receive'>
                    <Button.Ripple color='primary' style={{ minWidth: '120px' }}>RECEIVE</Button.Ripple>
                  </Link>
                  {/* <Link to='/receive'>RECEIVE</Link> */}
                </DropdownItem>
                <DropdownItem divider></DropdownItem>
                <DropdownItem className='text-center py-0' href='/manager' tag='a'>
                  <Link to='/manager'>
                    <Button.Ripple color='primary' style={{ minWidth: '120px' }}>MANAGE</Button.Ripple>
                  </Link>
                  {/* <Link to='/manager'>MANAGE</Link> */}
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledButtonDropdown>
            <div md='6' className="w-100">
              {globalNickName === 'Create a Vault' ? (
                <Avatar size='md' color='light-primary' onClick={() => { window.location.href = '/manager' }} icon={<ChevronsRight size={25} />} />
              ) : (
                <Avatar size='md' color='light-primary' title='Click to select account' onClick={handleDropList} icon={<ChevronsRight size={25} />} />
              )}
            </div>
          </Col>
          {/* <hr style={{ borderTop: '1px solid black' }} /> */}
        </Col>
      </div>
    )
  }

  const renderItemCollapse = () => {
    return (
      <>
        <Col className='my-1 align-self-center' style={{ ...backgroundChange, minHeight: '3em' }} >
          <Icon className='mt-1' name={networkIcon} size={20} />
        </Col>
        <Col className='my-1 pl-0'>
          {globalNickName === 'Create a Vault' ? (
            <Avatar size='lg' color={logos[0].color} title={globalNickName} icon={logos[0].icon} href='/home' />
          ) : (
            is_sega ? (
              <Avatar size='lg' color={logos[1].color} title={globalNickName} icon={logos[1].icon} href='/home' />
            ) : (
              <Avatar size='lg' color={logos[0].color} title={globalNickName} icon={logos[0].icon} href='/home' />
            )
          )}
        </Col>
        <Col className=' px-0'>
          <Button.Ripple style={{ width: '35px', padding: ' 10px 6px' }} color='primary'>{globalNickName && globalNickName.slice(0, 1)}...{globalNickName && globalNickName.slice(globalNickName.length - 1, globalAdrs.length)}</Button.Ripple>
        </Col>
        <Col className='my-1 px-0'>
          <Button.Ripple style={{ width: '35px', padding: ' 8px 6px' }} color='primary'><BiChevronDown size={20} /></Button.Ripple>
        </Col>
      </>
    )
  }

  return (
    <>
      <Row style={stylecontainer}>
        {
          menuCollapsed ? menuHover ? renderItem() : renderItemCollapse() : renderItem()
        }
      </Row>
      <DropList opendroplist={dropList} handleDropList={handleDropList} />
    </>
  )
}


const mapStateToProps = (state) => ({
  networkC: state.appData.network,
  globalAdrs: state.appData.globalAdrs,
  globalNickName: state.appData.globalNickName,
  globalVaultFlag: state.appData.globalVaultFlag
})
export default connect(mapStateToProps, null)(OwnerDisplay)