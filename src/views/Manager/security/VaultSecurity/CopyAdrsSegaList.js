import { Fragment } from 'react'
import { Clipboard } from 'react-feather'
import { FaRegCopy } from 'react-icons/fa'
import Avatar from '@components/avatar'
import { toast } from 'react-toastify'

const CopyAdrsSegaList = ({ item }) => {

    const notifySuccess = () => toast.success(<SuccessToast />, { hideProgressBar: false })

    const copy = async () => {
        await navigator.clipboard.writeText(item)
        notifySuccess()
    }

    const SuccessToast = () => (
        <Fragment>
            <div className='toastify-header'>
                <div className='title-wrapper'>
                    <Avatar size='sm' color='success' icon={<Clipboard size={12} />} />
                    <h6 className='toast-title'>Copied to Clipboard!</h6>
                </div>
            </div>
        </Fragment>
    )

    return (
        <>
            <FaRegCopy style={{ cursor: 'pointer' }} className='mx-1' onClick={copy} />
        </>
    )
}

export default CopyAdrsSegaList