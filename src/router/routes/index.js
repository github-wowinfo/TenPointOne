import { lazy } from 'react'

// ** Document title
// const TemplateTitle = '%s - Vuexy React Admin Template'

// ** Default Route
const DefaultRoute = '/home'

// ** Merge Routes
const Routes = [
  {
    path: '/home',
    component: lazy(() => import('../../views/Home'))
  },
  {
    path: '/login',
    component: lazy(() => import('../../views/Login')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/error',
    component: lazy(() => import('../../views/Error')),
    layout: 'BlankLayout'
  },
  {
    path: '/asset',
    component: lazy(() => import('../../views/Asset/AssetScreen'))
  },
  {
    path: '/activity',
    component: lazy(() => import('../../views/Activity/ActivityScreen'))
  },
  {
    path: '/send',
    component: lazy(() => import('../../views/Send/Send'))
  },
  {
    path: '/receive',
    component: lazy(() => import('../../views/Receive/Receive'))
  },
  {
    path: '/addressbook',
    component: lazy(() => import('../../views/AddressBook/AddressBook'))
  },
  {
    path: '/defi',
    component: lazy(() => import('../../views/DeFi/DeFi'))
  },
  {
    path: '/manager',
    component: lazy(() => import('../../views/Manager/Manager'))
  }
]

export { DefaultRoute, Routes }
