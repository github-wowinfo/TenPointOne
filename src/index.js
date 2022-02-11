// ** React Imports
import { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom'

// ** Redux Imports
import { Provider } from 'react-redux'
import { store } from './redux/storeConfig/store'

// ** Toast & ThemeColors Context
import { ToastContainer } from 'react-toastify'
import { ThemeContext } from './utility/context/ThemeColors'

// ** Spinner (Splash Screen)
import Spinner from './@core/components/spinner/Fallback-spinner'

// ** Ripple Button
import './@core/components/ripple-button'

// ** PrismJS
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-jsx.min'

// ** React Perfect Scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css'

// ** React Toastify
import '@styles/react/libs/toastify/toastify.scss'

// ** Core styles
import './@core/assets/fonts/feather/iconfont.css'
import './@core/scss/core.scss'
import './assets/scss/style.scss'

// ** Service Worker
import * as serviceWorker from './serviceWorker'

// ** Lazy load app
const LazyApp = lazy(() => import('./App'))
import { DAppProvider, ChainId } from '@usedapp/core'

ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={<Spinner />}>
      <ThemeContext>
        <DAppProvider
          const InfuraKey="08a4622376bd4dbe82b7c0e0b3c42d46"
          config={{
            supportedChains:
              [ChainId.Polygon],
            // [ChainId.Polygon, ChainId.Kovan, ChainId.BSCTestnet, ChainId.Mumbai, 1337],

            multicallAddresses: {
              1337: "0xC158a563CFeeBab087120F3cC51Da26E844ca3F3"
            },

            readOnlyUrls: {
              [ChainId.Polygon]: `https://polygon-mainnet.infura.io/v3/08a4622376bd4dbe82b7c0e0b3c42d46`
            },

            // readOnlyUrls: {
            //   [ChainId.Mainnet]: `https://mainnet.infura.io/v3/08a4622376bd4dbe82b7c0e0b3c42d46`,
            //   [ChainId.Kovan]: `https://kovan.infura.io/v3/08a4622376bd4dbe82b7c0e0b3c42d46`,
            //   [ChainId.Mumbai]: `https://polygon-mumbai.infura.io/v3/08a4622376bd4dbe82b7c0e0b3c42d46`,
            //   [ChainId.Polygon]: `https://polygon-mainnet.infura.io/v3/08a4622376bd4dbe82b7c0e0b3c42d46`,
            // },

            notifications: {
              expirationPeriod: 1000,
              checkInterval: 1000
            }
          }}>
          <LazyApp />
        </DAppProvider>
        <ToastContainer newestOnTop />
      </ThemeContext>
    </Suspense>
  </Provider >,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
