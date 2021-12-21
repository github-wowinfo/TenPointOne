import React, { useState } from 'react'
import { shortenIfAddress } from '@usedapp/core'
import { FormGroup, Input } from 'reactstrap'

const AddNicknameForSega = ({ item, index, segas, getSega, setSega }) => {

    const handleSegaNickName = (e) => {
        if (e.target.value === '') {
            alert('Nickname cannot be blank!')
        } else {

            for (const i in segas) {
                if (segas[i].address === item.address) {
                    segas[i].name = e.target.value
                    break
                }
            }

            setSega(segas)

        }
    }

    return (
        <>
            <FormGroup>
                <p>{index + 1} - {item.address}</p>
                <Input type='text' id={index} onChange={handleSegaNickName} placeholder={`Add Nickname for ${shortenIfAddress(item.address)}`} />
            </FormGroup>
            {/* {setNewSega(item.address)} */}
        </>
    )
}

export default AddNicknameForSega