import { BarChart2, Power, List, Settings, Package, CreditCard, Codepen, Tool, ArrowUpRight, ArrowDownLeft, Activity} from "react-feather"

export default [
  {
    id: "home",
    title: "Dashboard",
    icon: <BarChart2 size={20} />,
    navLink: "/home"
  },
  {
    id: "activity",
    title: "Activity",
    icon: <Activity size={20} />,
    navLink: "#"
  },
  {
    id:"vaults",
    title: "Vaults",
    icon: <Package size={20} />,
    badge: 'light-warning',
    badgeText: '2',
    children: [
      {
        id: "vault1",
        title: "Vault 1",
        icon: <CreditCard size={20} />,
        navLink: "#",
        children: [
          {
            id: "sega1",
            title: "Sega 1",
            icon: <Codepen size={20} />,
            navLink: "#"
          },
          {
            id: "sega2",
            title: "Sega 2",
            icon: <Codepen size={20} />,
            navLink: "#"
          }
        ]
      },
      {
        id: "vault2",
        title: "Vault 2",
        icon: <CreditCard size={20} />,
        navLink: "#",
        children: [
          {
            id: "sega1",
            title: "Sega 1",
            icon: <Codepen size={20} />,
            navLink: "#"
          },
          {
            id: "sega2",
            title: "Sega 2",
            icon: <Codepen size={20} />,
            navLink: "#"
          }
        ]
      }
    ]
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
    id: "transactions",
    title: "Transactions",
    icon: <List size={20} />,
    navLink: "#"
  },
  {
    id: "settings",
    title: "Settings",
    icon: <Settings size={20} />,
    children: [
      {
        id: "vaultSet",
        title: "Vault",
        icon: <Tool size={20} />,
        navLink: "#"
      },
      {
        id: "segaset",
        title: "Sega",
        icon: <Tool size={20} />,
        navLink: "#"
      }
    ]
  },
  {
    id: "disconnet",
    title: "Sign Out",
    icon: <Power size={20} />,
    navLink: "/login"
  }
]
