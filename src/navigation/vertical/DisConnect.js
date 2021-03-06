import React from 'react'
import { Power } from 'react-feather'
import { NavLink } from 'reactstrap'
import { useEthers } from '@usedapp/core'

const DisConnect = ({ menuCollapsed, menuHover }) => {

    const { deactivate } = useEthers()

    const full = () => {
        return (
            <>
                <NavLink className='ml-2 mb-1' onClick={deactivate}>
                    <Power className='mr-1' size={20} />
                    <span className='font-weight-bolder' style={{ fontSize: '0.9rem', paddingLeft: '0.3em' }} >DISCONNECT</span>
                </NavLink>
            </>
        )
    }

    const half = () => {
        return (
            <>
                <NavLink className='ml-2 mb-1'>
                    <Power className='mr-1' size={20} />
                </NavLink>
            </>
        )
    }

    return (
        <>
            {
                menuCollapsed ? menuHover ? full() : half() : full()
            }
        </>
    )

}

export default DisConnect