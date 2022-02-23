import { FaRegCopy } from 'react-icons/fa'
import { GoLinkExternal } from 'react-icons/go'
import { BsSafe2 } from 'react-icons/bs'
import { randomHexColor } from 'random-hex-color-generator'
import { CustomInput } from 'reactstrap'
import Heart from './Heart'
import Avatar from '@components/avatar'
import { GiShipWheel } from 'react-icons/gi'


// cell: row => { return (<div><FaRegCopy size={25} /><GoLinkExternal size={25}/></div>) }
const avatar =
{
    icon: <BsSafe2 size={25} />
    // icon: <GiShipWheel size={25} />
}
export default [
    {
        id: 1,
        name: 'Arbit',
        network: 'eth',
        avatar: <Avatar className='mr-1' size='lg' color='light' style={{ color: randomHexColor() }} icon={avatar.icon} />,
        adrs: 'mrzEKwoJVvmRgdLbw98bCT9R97Yzh75HpQ',
        icon1: <FaRegCopy size={20} className='mr-1' />,
        icon2: <GoLinkExternal size={20} className='mr-1' />,
        fav: <Heart />


    },
    {
        id: 2,
        name: 'SBI Vault',
        network: 'matic',
        avatar: <Avatar className='mr-1' size='lg' color='light' style={{ color: randomHexColor() }} icon={avatar.icon} />,
        adrs: 'mhfsw4pcHRMfdBN3Nu6okg1ZF3J7j3qXxU',
        icon1: <FaRegCopy size={20} className='mr-1' />,
        icon2: <GoLinkExternal size={20} className='mr-1' />,
        fav: <Heart />
    },
    {
        id: 3,
        name: 'Test Safe',
        network: 'arg',
        avatar: <Avatar className='mr-1' size='lg' color='light' style={{ color: randomHexColor() }} icon={avatar.icon} />,
        adrs: 'mqVNYJcCpmMps1V4JWftK1Nzdfe83e5XZG',
        icon1: <FaRegCopy size={20} className='mr-1' />,
        icon2: <GoLinkExternal size={20} className='mr-1' />,
        fav: <Heart />
    },
    {
        id: 4,
        name: 'Test1',
        network: 'poly',
        avatar: <Avatar className='mr-1' size='lg' color='light' style={{ color: randomHexColor() }} icon={avatar.icon} />,
        adrs: 'n1M6M293pTNiwiqrM9CzyCmjBVJ4e76bS5',
        icon1: <FaRegCopy size={20} className='mr-1' />,
        icon2: <GoLinkExternal size={20} className='mr-1' />,
        fav: <Heart />
    },
    {
        id: 5,
        name: 'Test2',
        network: 'eth',
        avatar: <Avatar className='mr-1' size='lg' color='light' style={{ color: randomHexColor() }} icon={avatar.icon} />,
        adrs: 'mqJWS9a9ZZgcvb41z8qNLSRCYhpT4f3H8t',
        icon1: <FaRegCopy size={20} className='mr-1' />,
        icon2: <GoLinkExternal size={20} className='mr-1' />,
        fav: <Heart />
    },
    {
        id: 6,
        name: 'Test3',
        network: 'matic',
        avatar: <Avatar className='mr-1' size='lg' color='light' style={{ color: randomHexColor() }} icon={avatar.icon} />,
        adrs: 'mtSnbBmyT4zr8DUubEcmJDBEZdYDbEzZMR',
        icon1: <FaRegCopy size={20} className='mr-1' />,
        icon2: <GoLinkExternal size={20} className='mr-1' />,
        fav: <Heart />
    },
    {
        id: 7,
        name: 'Test Safe2',
        network: 'arg',
        avatar: <Avatar className='mr-1' size='lg' color='light' style={{ color: randomHexColor() }} icon={avatar.icon} />,
        adrs: 'mm5URxUDgbEN7qYAvDS3L2X3kuEZW7uERE',
        icon1: <FaRegCopy size={20} className='mr-1' />,
        icon2: <GoLinkExternal size={20} className='mr-1' />,
        fav: <Heart />
    },
    {
        id: 8,
        name: 'SBI Vault',
        network: 'poly',
        avatar: <Avatar className='mr-1' size='lg' color='light' style={{ color: randomHexColor() }} icon={avatar.icon} />,
        adrs: 'mhfsw4pcHRMfdBN3Nu6okg1ZF3J7j3qXxU',
        icon1: <FaRegCopy size={20} className='mr-1' />,
        icon2: <GoLinkExternal size={20} className='mr-1' />,
        fav: <Heart />
    },
    {
        id: 9,
        name: 'Test Safe',
        network: 'eth',
        avatar: <Avatar className='mr-1' size='lg' color='light' style={{ color: randomHexColor() }} icon={avatar.icon} />,
        adrs: 'mqVNYJcCpmMps1V4JWftK1Nzdfe83e5XZG',
        icon1: <FaRegCopy size={20} className='mr-1' />,
        icon2: <GoLinkExternal size={20} className='mr-1' />,
        fav: <Heart />
    },
    {
        id: 10,
        name: 'Test1',
        network: 'matic',
        avatar: <Avatar className='mr-1' size='lg' color='light' style={{ color: randomHexColor() }} icon={avatar.icon} />,
        adrs: 'n1M6M293pTNiwiqrM9CzyCmjBVJ4e76bS5',
        icon1: <FaRegCopy size={20} className='mr-1' />,
        icon2: <GoLinkExternal size={20} className='mr-1' />,
        fav: <Heart />
    },
    {
        id: 11,
        name: 'Test2',
        network: 'arg',
        avatar: <Avatar className='mr-1' size='lg' color='light' style={{ color: randomHexColor() }} icon={avatar.icon} />,
        adrs: 'mqJWS9a9ZZgcvb41z8qNLSRCYhpT4f3H8t',
        icon1: <FaRegCopy size={20} className='mr-1' />,
        icon2: <GoLinkExternal size={20} className='mr-1' />,
        fav: <Heart />
    },
    {
        id: 12,
        name: 'Test3',
        network: 'poly',
        avatar: <Avatar className='mr-1' size='lg' color='light' style={{ color: randomHexColor() }} icon={avatar.icon} />,
        adrs: 'mtSnbBmyT4zr8DUubEcmJDBEZdYDbEzZMR',
        icon1: <FaRegCopy size={20} className='mr-1' />,
        icon2: <GoLinkExternal size={20} className='mr-1' />,
        fav: <Heart />
    },
    {
        id: 13,
        name: 'Test Safe2',
        network: 'eth',
        avatar: <Avatar className='mr-1' size='lg' color='light' style={{ color: randomHexColor() }} icon={avatar.icon} />,
        adrs: 'mm5URxUDgbEN7qYAvDS3L2X3kuEZW7uERE',
        icon1: <FaRegCopy size={20} className='mr-1' />,
        icon2: <GoLinkExternal size={20} className='mr-1' />,
        fav: <Heart />
    }
]