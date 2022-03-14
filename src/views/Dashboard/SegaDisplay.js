import AvatarGroup from '@components/avatar-group'
import react from '@src/assets/images/icons/react.svg'
import vuejs from '@src/assets/images/icons/vuejs.svg'
import angular from '@src/assets/images/icons/angular.svg'
import bootstrap from '@src/assets/images/icons/bootstrap.svg'
import avatar1 from '@src/assets/images/portrait/small/avatar-s-5.jpg'
import avatar2 from '@src/assets/images/portrait/small/avatar-s-6.jpg'
import avatar3 from '@src/assets/images/portrait/small/avatar-s-7.jpg'
import { RiSafeLine } from "react-icons/ri"
import { MoreVertical, Edit, Trash } from 'react-feather'
import { Table, Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle, Card, CardHeader, CardTitle } from 'reactstrap'
import { connect } from 'react-redux'
import { useEthers } from '@usedapp/core'
import { useState, useEffect } from 'react'
import { SiWebmoney } from 'react-icons/si'
import axios from 'axios'
import SegaOfVault from './SegaOfVault'


const SegaDisplay = ({ globalAdrs }) => {

  const { account, chainId } = useEthers()

  const [is_sega, setis_sega] = useState(false)
  const [segaList, setSegaList] = useState([])

  const getSegaListFromLocal = () => {
    const getdata = JSON.parse(localStorage.getItem('segadata'))
    if (getdata !== null) {
      const valueData = getdata && getdata.filter(a => a.show === true && a.network === chainId && a.owner === account)
      const segalist = valueData && valueData.map((sega, index) => ({ value: index, adrs: sega.address, name: sega.name, ofvault: sega.vault }))
      setSegaList(segalist)
    } else {
      console.log('no sega data')
    }
  }

  useEffect(() => {
    getSegaListFromLocal()
    const segaadrs = segaList && segaList.find(i => i.adrs === globalAdrs)
    console.log('segaadrs', segaadrs)
    if (segaadrs === undefined) {
      setis_sega(false)
    } else {
      setis_sega(true)
    }
  }, [globalAdrs, account, chainId])

  let actualdata
  if (is_sega === false) {
    const getdata = JSON.parse(localStorage.getItem('segadata'))
    if (getdata !== null) {
      actualdata = getdata && getdata.filter(a => a.show === true && a.network === chainId && a.owner === account && a.vault === globalAdrs)
      console.log('actualdata', actualdata)
    } else {
      console.log('No sega data for looping')
    }
  }

  return (
    <>
      {actualdata && actualdata.length === 0 ? null : (
        <Card className="my-1">
          <CardHeader>
            <CardTitle>Linked SEGAs</CardTitle>
          </CardHeader>
          <Table borderless responsive>
            <thead className='thead-light'>
              <tr>
                <th>Nickname</th>
                <th style={{ textAlign: "center" }}>Public Address</th>
                <th style={{ textAlign: "right" }}>Total Balance</th>
              </tr>
            </thead>
            <tbody>
              {actualdata && actualdata.map((item, index) => {
                return (
                  <SegaOfVault item={item} />
                )
              })}
            </tbody>
          </Table>
        </Card>
      )}
    </>
  )
}

// export default SegaDisplay
const mapStateToProps = (state) => ({
  globalAdrs: state.appData.globalAdrs,
})
// const mapDispatchToProp = dispatch => ({ dispatch })
export default connect(mapStateToProps, null)(SegaDisplay)