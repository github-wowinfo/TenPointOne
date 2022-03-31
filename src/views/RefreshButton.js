import { useEffect, useState } from 'react'
import { TiRefreshOutline } from 'react-icons/ti'
import { RiRefreshLine } from 'react-icons/ri'

const RefreshButton = () => {
    const icon = {
        cursor: 'pointer',
        transform: 'rotate(180deg)',
        transition: 'all ease-in-out 1s'
    }
    const [isRotate, setIsRotate] = useState(false)

    const handleClick = () => {
        setIsRotate(!isRotate)
        setTimeout(() => {
            // lazy(() => window.location.reload())
            window.location.reload()
        }, 1001)
    }

    console.log('isRotate', isRotate)

    return (
        <>
            <RiRefreshLine title='Refresh'
                style={isRotate ? icon : { cursor: 'pointer' }}
                size={50}
                onClick={handleClick}
            />
        </>
    )
}

export default RefreshButton