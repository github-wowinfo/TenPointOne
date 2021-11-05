import {FaRegCopy} from 'react-icons/fa'
import {GoLinkExternal} from 'react-icons/go'
import {BsSafe2} from 'react-icons/bs'
import {randomHexColor} from 'random-hex-color-generator'
import Avatar from '@components/avatar'
const avatar = 
    {
        icon: <BsSafe2 size={25} />
    }
export default [
    {
        id: 1,
        name: 'Arbit',
        avatar: <Avatar size='lg' color='light' style={{color: randomHexColor()}} icon={avatar.icon}/>,
        adrs: 'mrzEKwoJVvmRgdLbw98bCT9R97Yzh75HpQ',
        icon1: <FaRegCopy />,
        icon2: <GoLinkExternal />
        // cell: row => { return (<div><FaRegCopy size={25} /><GoLinkExternal size={25}/></div>) }
    
    },
    {
        id: 2,
        name: 'SBI Vault',
        avatar: <Avatar size='lg' color='light' style={{color: randomHexColor()}} icon={avatar.icon}/>,
        adrs: 'mhfsw4pcHRMfdBN3Nu6okg1ZF3J7j3qXxU',
        icon1: <FaRegCopy />,
        icon2: <GoLinkExternal />
    },
    {
        id: 3,
        name: 'Test Safe',
        avatar: <Avatar size='lg' color='light' style={{color: randomHexColor()}} icon={avatar.icon}/>,
        adrs: 'mqVNYJcCpmMps1V4JWftK1Nzdfe83e5XZG',
        icon1: <FaRegCopy />,
        icon2: <GoLinkExternal />
    },
    {
        id: 4,
        name: 'Test1',
        avatar: <Avatar size='lg' color='light' style={{color: randomHexColor()}} icon={avatar.icon}/>,
        adrs: 'n1M6M293pTNiwiqrM9CzyCmjBVJ4e76bS5',
        icon1: <FaRegCopy />,
        icon2: <GoLinkExternal />
    },
    {
        id: 5,
        name: 'Test2',
        avatar: <Avatar size='lg' color='light' style={{color: randomHexColor()}} icon={avatar.icon}/>,
        adrs: 'mqJWS9a9ZZgcvb41z8qNLSRCYhpT4f3H8t',
        icon1: <FaRegCopy />,
        icon2: <GoLinkExternal />
    },
    {
        id: 6,
        name: 'Test3',
        avatar: <Avatar size='lg' color='light' style={{color: randomHexColor()}} icon={avatar.icon}/>,
        adrs: 'mtSnbBmyT4zr8DUubEcmJDBEZdYDbEzZMR',
        icon1: <FaRegCopy />,
        icon2: <GoLinkExternal />
    },
    {
        id: 7,
        name: 'Test Safe2',
        avatar: <Avatar size='lg' color='light' style={{color: randomHexColor()}} icon={avatar.icon}/>,
        adrs: 'mm5URxUDgbEN7qYAvDS3L2X3kuEZW7uERE',
        icon1: <FaRegCopy />,
        icon2: <GoLinkExternal />
    },
    {
        id: 8,
        name: 'SBI Vault',
        avatar: <Avatar size='lg' color='light' style={{color: randomHexColor()}} icon={avatar.icon}/>,
        adrs: 'mhfsw4pcHRMfdBN3Nu6okg1ZF3J7j3qXxU',
        icon1: <FaRegCopy />,
        icon2: <GoLinkExternal />
    },
    {
        id: 9,
        name: 'Test Safe',
        avatar: <Avatar size='lg' color='light' style={{color: randomHexColor()}} icon={avatar.icon}/>,
        adrs: 'mqVNYJcCpmMps1V4JWftK1Nzdfe83e5XZG',
        icon1: <FaRegCopy />,
        icon2: <GoLinkExternal />
    },
    {
        id: 10,
        name: 'Test1',
        avatar: <Avatar size='lg' color='light' style={{color: randomHexColor()}} icon={avatar.icon}/>,
        adrs: 'n1M6M293pTNiwiqrM9CzyCmjBVJ4e76bS5',
        icon1: <FaRegCopy />,
        icon2: <GoLinkExternal />
    },
    {
        id: 11,
        name: 'Test2',
        avatar: <Avatar size='lg' color='light' style={{color: randomHexColor()}} icon={avatar.icon}/>,
        adrs: 'mqJWS9a9ZZgcvb41z8qNLSRCYhpT4f3H8t',
        icon1: <FaRegCopy />,
        icon2: <GoLinkExternal />
    },
    {
        id: 12,
        name: 'Test3',
        avatar: <Avatar size='lg' color='light' style={{color: randomHexColor()}} icon={avatar.icon}/>,
        adrs: 'mtSnbBmyT4zr8DUubEcmJDBEZdYDbEzZMR',
        icon1: <FaRegCopy />,
        icon2: <GoLinkExternal />
    },
    {
        id: 13,
        name: 'Test Safe2',
        avatar: <Avatar size='lg' color='light' style={{color: randomHexColor()}} icon={avatar.icon}/>,
        adrs: 'mm5URxUDgbEN7qYAvDS3L2X3kuEZW7uERE',
        icon1: <FaRegCopy />,
        icon2: <GoLinkExternal />
    }
]