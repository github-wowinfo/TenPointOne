import React, { useState } from 'react'
import Avatar from '@components/avatar'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

const Heart = () => {

    const [hicon, setHicon] = useState(true)
    // console.log('ok', hicon)

    return (
        <div>
            {
                hicon ? <Avatar color='light' icon={<FaRegHeart size={25} style={{ color: 'red' }} />} onClick={() => setHicon(false)} /> : <Avatar color='light-info' icon={<FaHeart size={25} style={{ color: 'red' }} />} onClick={() => setHicon(true)} />
            }
        </div>
    )
}

export default Heart