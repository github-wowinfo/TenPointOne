import { Fragment } from 'react'
import { Clipboard } from 'react-feather'
import { FaRegCopy } from 'react-icons/fa'
import Avatar from '@components/avatar'
import { toast } from 'react-toastify'

const CopyAdrsDropList = ({ item }) => {

    const notifySuccess = () => toast.success(<SuccessToast />, { hideProgressBar: false })

    const copy = async () => {
        const textField = document.createElement('textarea')
        textField.innerText = item.adrs
        document.body.appendChild(textField)
        textField.select()
        document.execCommand('copy')
        textField.remove()

        notifySuccess()
        // await navigator.clipboard.writeText(item.adrs)
        // notifySuccess()
    }

    const SuccessToast = () => (
        <Fragment>
            <div className='toastify-header'>
                <div className='title-wrapper'>
                    <Avatar size='md' color='success' icon={<Clipboard size={12} />} />
                    <h3 className='toast-title'>Copied to Clipboard!</h3>
                </div>
            </div>
        </Fragment>
    )

    return (
        <>
            <FaRegCopy style={{ cursor: 'pointer' }} className='mx-1' size={25} onClick={copy} />
        </>
    )
}

export default CopyAdrsDropList