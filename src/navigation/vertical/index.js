import { BarChart2, Power, ArrowUpRight, ArrowDownLeft, Activity} from "react-feather"
import {BsWallet2} from "react-icons/bs"
import {IoGitMergeOutline} from "react-icons/io5"
import {VscTools} from "react-icons/vsc"
import {ImAddressBook} from "react-icons/im"

export default [
  {
    id: "home",
    title: "Dashboard",
    icon: <BarChart2 size={20} />,
    navLink: "/home"
  },
  {
    id: "assests",
    title: "Assests",
    icon: <BsWallet2 size={20} />,
    navLink: "/asset"
  },
  {
    id: "activity",
    title: "Activity",
    icon: <Activity size={20} />,
    navLink: "#"
  },
  {
    id: 'send',
    title: "Send",
    icon: <ArrowUpRight size={20} />,
    navLink: "/send"
  },
  {
    id: 'receive',
    title: "Receive",
    icon: <ArrowDownLeft size={20} />,
    navLink: "/receive"
  },
  {
    id: "defi",
    title: "DeFi",
    icon: <IoGitMergeOutline size={20} />,
    navLink: "#"
  },
  {
    id: "addressbook",
    title: "Address Book",
    icon: <ImAddressBook size={20} />,
    navLink: "#"
  },
  {
    id: "manager",
    title: "Manager",
    icon: <VscTools size={20} />,
    navLink: "#"
  },
  {
    id: "disconnet",
    title: "Sign Out",
    icon: <Power size={20} />,
    navLink: "/login"
  }
]
