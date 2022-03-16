import { BarChart2, Power, ArrowUpRight, ArrowDownLeft, Activity } from "react-feather"
import { BsWallet2, BsSafe2 } from "react-icons/bs"
import { SiWebmoney, SiGithubactions } from "react-icons/si"
import { IoGitMergeOutline, IoQrCodeOutline } from "react-icons/io5"
import { VscTools } from "react-icons/vsc"
import { ImAddressBook } from "react-icons/im"
import { randomHexColor } from 'random-hex-color-generator'

export default [
  {
    id: "home",
    title: "DASHBOARD",
    icon: <BarChart2 size={20} />,
    navLink: "/home",
  },
  {
    id: "assets",
    title: "ASSETS",
    icon: <BsWallet2 size={20} />,
    navLink: "/asset"
  },
  {
    id: "activity",
    title: "ACTIVITY",
    icon: <Activity size={20} />,
    navLink: "/activity"
  },
  {
    header: ''
  },
  {
    id: 'send',
    title: "SEND",
    icon: <ArrowUpRight size={20} />,
    navLink: "/send"
  },
  {
    id: 'receive',
    title: "RECEIVE",
    icon: <ArrowDownLeft size={20} />,
    navLink: "/receive"
  },
  {
    id: "defi",
    title: "DeFi - COMING SOON",
    icon: <IoGitMergeOutline size={20} />,
    navLink: "/defi",
    // disabled: true
  },
  {
    header: ''
  },
  {
    id: "addressbook",
    title: "ADDRESS BOOK",
    icon: <ImAddressBook size={20} />,
    navLink: "/addressbook"
  },
  {
    id: "manager",
    title: "MANAGER",
    icon: <VscTools size={20} />,
    navLink: "/manager"
  },
  // {
  //   header: 'Favourites'
  // },
  // {
  //   id: 'sbivault',
  //   title: 'SBI Vault',
  //   icon: <BsSafe2 size={25} style={{ color: randomHexColor() }} />,
  //   navLink: '#'
  // },
  // {
  //   id: 'sbicheck',
  //   title: 'SBI Checking',
  //   icon: <SiWebmoney size={25} style={{ color: randomHexColor() }} />,
  //   navLink: '#'
  // },
  // {
  //   id: 'hdfcfix',
  //   title: 'HDFC Fixed',
  //   icon: <SiWebmoney size={25} style={{ color: randomHexColor() }} />,
  //   navLink: '#'
  // }
]
