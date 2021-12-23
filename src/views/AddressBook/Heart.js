import React, { useState } from 'react'
import Avatar from '@components/avatar'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

const Heart = () => {

    const [hicon, setHicon] = useState(true)
    // console.log('ok', hicon)

    return (
        <div>
            {
                hicon ? <Avatar size='sm' color='light' icon={<FaRegHeart size={12} style={{ color: 'red' }} />} onClick={() => setHicon(false)} /> : <Avatar size='sm' color='light-info' icon={<FaHeart size={12} style={{ color: 'red' }} />} onClick={() => setHicon(true)} />
            }
        </div>
    )
}

export default Heart