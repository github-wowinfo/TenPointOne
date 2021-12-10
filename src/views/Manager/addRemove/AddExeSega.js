import { useEffect, useState } from 'react'
import Select from 'react-select'
import { X, Edit3 } from 'react-feather'
import { selectThemeColors } from '@utils'
import { Modal, ModalBody, ModalHeader, ModalFooter, Row, Col, Input, Label, FormGroup, Button } from 'reactstrap'

const AddExeSega = ({ openexesega, handleExeSegaModal }) => {

    // const CloseBtn = <X className='cursor-pointer' size={25} onClick={handleModal} />

    const [VaultList, setVaultList] = useState([])

    const colourOptions = [
        { value: 'adrs', label: 'Address 1' },
        { value: 'adrs', label: 'Address 2' },
        { value: 'adrs', label: 'Address 3' },
        { value: 'adrs', label: 'Address 4' },
        { value: 'adrs', label: 'Address 5' }
    ]

    const getVaultListFromLocal = () => {
        const getdata = JSON.parse(localStorage.getItem('vaultdata'))
        const valueData = getdata.filter(a => a.show === true)
        const vaultlist = valueData.map((vault, index) => ({ value: index, label: `${vault.name} - ${vault.address}` }))
        setVaultList(vaultlist)
    }

    useEffect(() => {

        getVaultListFromLocal()

        return () => {

        }
    }, [])

    return (
        <Modal className='modal-dialog-centered' isOpen={openexesega} toggle={handleExeSegaModal} >
            <ModalHeader tag='h2' toggle={handleExeSegaModal}>
                Add Existing Sega
            </ModalHeader>
            <ModalBody style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Row style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Col>
                        <h3>Start tracking your alreadt existing Sega.</h3>
                    </Col>
                    <Col>
                        <p>Add external Vaults first, and then their Sega.</p>
                    </Col>
                    <Col>
                        <p>All names set by you are stored locally on your PC and are not collected by Risk Protocol.</p>
                    </Col>
                    <Col className='mb-1'>
                        <Label style={{ fontSize: "1.3em" }}>Parent Vault</Label>
                        <Select
                            // theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            defaultValue=''
                            name='clear'
                            options={VaultList}
                            isClearable
                        />
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for='nickname' style={{ fontSize: "1.3em" }}>Nickname</Label>
                            <Input type='text' id='nickname' />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for='accadrs' style={{ fontSize: "1.3em" }}>Account Address</Label>
                            <Input type='text' id='accadrs' />
                        </FormGroup>
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter className='justify-content-center'>
                <Button.Ripple color='primary' onClick={handleExeSegaModal}>
                    <Edit3 className='mr-1' size={25} />
                    Create
                </Button.Ripple>
            </ModalFooter>
        </Modal>
    )
}

export default AddExeSega