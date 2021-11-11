// ** Logo
import logo from '@src/assets/images/logo/newlogoblue.png'
import { Spinner } from 'reactstrap'

const SpinnerComponent = () => {
  return (
    // <div className='d-flex justify-content-center align-items-center' size='lg' style={{ backgroundColor: 'rgba(0,0,0,.5)', height: '100vh', width: '100vw' }}>
    //   <Spinner color='primary' />
    // </div>
    <div className='fallback-spinner'>
      <img className='fallback-logo' src={logo} alt='logo' />
      <div className='loading'>
        <div className='effect-1 effects'></div>
        <div className='effect-2 effects'></div>
        <div className='effect-3 effects'></div>
      </div>
    </div>
  )
}

export default SpinnerComponent
