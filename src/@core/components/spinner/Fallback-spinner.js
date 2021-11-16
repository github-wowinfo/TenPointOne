// ** Logo
import logo from '@src/assets/images/logo/newlogoblue.png'
import { Spinner } from 'reactstrap'

const SpinnerComponent = () => {
  return (
    <div className='fallback-spinner'>
      <div className='loading component-loader'>
        <div className='effect-1 effects'></div>
        <div className='effect-2 effects'></div>
        <div className='effect-3 effects'></div>
      </div>
    </div>
    // <div className='d-flex justify-content-center align-items-center' size='lg' style={{ background: 'rgb(0, 0, 0)', background: 'rgba(0,0,0,.5)', height: '100vh', width: '100vw' }}>
    //   <Spinner color='primary' size='lg' />
    // </div>
    // <div className='fallback-spinner'>
    //   <img className='fallback-logo' src={logo} alt='logo' />
    //   <div className='loading'>
    //     <div className='effect-1 effects'></div>
    //     <div className='effect-2 effects'></div>
    //     <div className='effect-3 effects'></div>
    //   </div>
    // </div>
  )
}

export default SpinnerComponent
