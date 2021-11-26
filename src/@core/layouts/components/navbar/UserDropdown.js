// ** React Imports
import { useEffect, useState, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

// ** Custom Components
import Avatar from '@components/avatar'
import Text from '../../../../views/CustomComponent/Text'

// ** Utils
import { isUserLoggedIn } from '@utils'

// ** Store & Actions
import { connect, useDispatch } from 'react-redux'
import { handleLogout } from '@store/actions/auth'

// ** Third Party Components
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Button, Row, Col, Dropdown, Card, CardBody, CardTitle, CardText, Badge } from 'reactstrap'
import { User, Mail, CheckSquare, MessageSquare, Settings, CreditCard, HelpCircle, Power, ShoppingCart, Clipboard } from 'react-feather'
import { GiFoxHead } from 'react-icons/gi'

// ** Default Avatar Image
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg'
import { BsSafe2 } from 'react-icons/bs'
import { FaRegCopy } from 'react-icons/fa'
import { GoLinkExternal } from 'react-icons/go'
import { RiWallet3Line } from 'react-icons/ri'

// ** useDapp
import { useEthers } from '@usedapp/core'
import helperConfig from '../../../../helper-config.json'

const UserDropdown = ({ networkC }) => {

  const { account, deactivate, chainId } = useEthers()

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
  // ** Store Vars
  const dispatch = useDispatch()

  // ** State
  const [userData, setUserData] = useState(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const toggle = () => setDropdownOpen(prevState => !prevState)

  //** ComponentDidMount
  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      setUserData(JSON.parse(localStorage.getItem('userData')))
    }
  }, [])

  //** Vars
  const userAvatar = (userData && userData.avatar) || defaultAvatar

  const circle = {
    height: 10,
    width: 10,
    borderRadius: '50%',
    borderWidth: 10,
    backgroundColor: 'orange',
    marginLeft: 2
  }


  const pathname = `https://etherscan.io/address/${account}`

  const backgroundChange = { backgroundColor: networkC.name === 'BSC Mainet' ? '#cc9b00' : networkC.name === 'Etherum' ? '#627eea' : networkC.name === 'Optimism' ? '#ff0420' : networkC.name === 'Arbitrum' ? '#2d374b' : '#8247e5' }

  const networkName = chainId ? helperConfig[chainId] : "Not Connected"

  return (
    <>
      <Dropdown isOpen={dropdownOpen} toggle={toggle} tag='li' className='nav-item'>
        <DropdownToggle tag='a' className='nav-link'>

          <div style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: 250
          }}>
            <div style={{
              marginRight: 5,
              textAlign: 'right'
            }}>
              <span className='user-name font-weight-bold'>{(userData && userData['username']) || `Metamask @  ${networkName}`}</span>
              <br />
              <span className='user-status'>{(userData && userData.role) || (account && account.slice(0, 4))}...{account && account.slice(account.length - 4, account.length)}</span>
              {/* <Text name={account} fchar={4} lchar={4} /> */}
              {/* accAdrs.slice(0, 4)}...{accAdrs.slice(accAdrs.length - 4, accAdrs.length) */}
            </div >
            <div>
              <Avatar color='light-warning' icon={<GiFoxHead size={40} />} status='online' />
            </div>
          </div >

        </DropdownToggle>
        <DropdownMenu tag='ul' className='dropdown-menu-media w-100'>
          <li className='dropdown-menu-header'>
            <DropdownItem tag='div' className='d-flex justify-content-center' header>
              <div>
                <div style={{
                  display: 'flex',
                  flex: 1,
                  justifyContent: 'center'
                }}>

                  <Avatar size='lg' color='light-danger' title='SBI Vault' icon={<BsSafe2 size={25} />} href='/home' />
                </div>
                <br />
                <div style={{
                  padding: 5,
                  backgroundColor: '#f9f9f9aa'
                }}>
                  <label className='mr-1'> {account && account.slice(0, 4)}...{account && account.slice(account.length - 4, account.length)}</label>
                  {/* {account.slice(0, 4)}...{account.slice(account.length - 4, account.length)} */}
                  {/* <Text name={account} fchar={4} lchar={4} /> */}
                  <FaRegCopy size={15} className='mr-1' onClick={copy} />
                  <a href={pathname} target='_blank'><GoLinkExternal color='grey' size={15} /></a>
                </div>

              </div>
            </DropdownItem>
          </li>
          <li className='dropdown-menu-header'>
            <div className='d-flex justify-content-between p-1'>
              <label>Wallet</label>

              <div>

                <RiWallet3Line />
                <label>Metamask</label>
              </div>
            </div>
          </li>
          <li className='dropdown-menu-header'>
            <div className='d-flex justify-content-between p-1'>
              <label>Connected network</label>

              <div className='row d-flex justify-content-center align-items-center' style={{ marginRight: 0 }}>
                <div className='circle' style={{ ...backgroundChange }}></div>
                <label style={{ marginLeft: 2 }}>{networkName.toUpperCase()}</label>
              </div>
            </div>
          </li>
          <div className='d-flex justify-content-center p-1'>
            <Button.Ripple color='danger' href='/' onClick={deactivate}>Disconnect</Button.Ripple>
          </div>
        </DropdownMenu>
      </Dropdown>
    </>
  )
}

const mapStateToProps = (state) => ({
  networkC: state.appData.network
})
export default connect(mapStateToProps, null)(UserDropdown)