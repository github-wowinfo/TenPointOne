// ** React Imports
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils
import { isUserLoggedIn } from '@utils'

// ** Store & Actions
import { useDispatch } from 'react-redux'
import { handleLogout } from '@store/actions/auth'

// ** Third Party Components
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Button, Row, Col, Dropdown, Card, CardBody, CardTitle, CardText, Badge } from 'reactstrap'
import { User, Mail, CheckSquare, MessageSquare, Settings, CreditCard, HelpCircle, Power, ShoppingCart } from 'react-feather'
import { GiFoxHead } from 'react-icons/gi'

// ** Default Avatar Image
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg'
import { BsSafe2 } from 'react-icons/bs'
import { FaRegCopy } from 'react-icons/fa'
import { GoLinkExternal } from 'react-icons/go'
import { RiWallet3Line } from 'react-icons/ri'

const UserDropdown = () => {
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
              <span className='user-name font-weight-bold'>{(userData && userData['username']) || 'Metamask @ Polygon'}</span>
              <br />
              <span className='user-status'>{(userData && userData.role) || '0x12D8....7474'}</span>
            </div>
            <div>
              <Avatar color='light-warning' icon={<GiFoxHead size={40} />} status='online' />
            </div>
          </div>

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
                  <label className='mr-1'>{'0x12D8....7474'}</label>
                  <FaRegCopy size={15} className='mr-1' />
                  <GoLinkExternal size={15} />
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
                <div className='circle' style={{backgroundColor:'orange'}}></div>
                <label style={{ marginLeft: 2 }}>Rinkeby</label>
              </div>
            </div>
          </li>
          <div className='d-flex justify-content-center p-1'>

            <Button.Ripple href='/login' color='danger'>Disconnect</Button.Ripple>
          </div>
        </DropdownMenu>
      </Dropdown>


    </>
  )
}

export default UserDropdown
