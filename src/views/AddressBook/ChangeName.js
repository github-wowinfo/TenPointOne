import React, { useState } from 'react'
import { Edit3 } from 'react-feather'
import NameChangeModal from './NameChangeModal'

const ChangeName = ({ item }) => {

    const [modal, setModal] = useState(false)
    const handleModal = () => setModal(!modal)

    return (
        <>
            <Edit3 style={{ cursor: 'pointer' }} size={25} color='grey' onClick={handleModal} />
            <NameChangeModal openmodal={modal} handleModal={handleModal} item={item} />
        </>
    )
}

export default ChangeName