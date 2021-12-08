import { useEffect, useState } from 'react'
import { BsSafe2, BsArrowDown } from 'react-icons/bs'
import Select, { components } from 'react-select'
import { Modal, ModalBody, ModalHeader, ModalFooter, Row, Col, Input, Label, FormGroup, Button, CustomInput } from 'reactstrap'
import Badge from 'reactstrap/lib/Badge'
import axios from 'axios'
import { useTokens } from '../../../../utility/hooks/useTokens'
import { useTransfers } from '../../../../utility/hooks/useTransfers'
// import { OrderTicket } from '../../../orderTicket'

const ForceRecall = ({ openrecallmodal, handlRecoverModal, selectSega, pVault, haveInfo }) => {

    const [assetList, setAssetList] = useState([])

    const getTokenBalance = async () => {
        try {
            const response = await axios.get(`https://api.unmarshal.com/v1/matic/address/0x989923d33bE0612680064Dc7223a9f292C89A538/assets?auth_key=CE2OvLT9dk2YgYAYfb3jR1NqCGWGtdRd1eoikUYs`)
            setAssetList(response.data)
        } catch (error) {
            console.log(`Asset [getTokkenBalance]`, error)
        }
    }

    useEffect(() => {
        getTokenBalance()
    }, [])

    const asset = assetList.map((item) => ({ label: item.contract_ticker_symbol, img: item.logo_url }))

    const data = asset

    const addDefaultSrc = (ev) => {
        ev.target.src = require(`@src/assets/images/logo/question.jpg`).default
    }

    const OptionComponent = ({ data, ...props }) => {


        return (
            <components.Option {...props}>
                <img src={data.img} alt='logo' style={{ height: 40, width: 40, marginRight: 10 }} onError={addDefaultSrc} />
                {data.label}
            </components.Option>
        )
    }

    // const colourOptions = [
    //     { value: 'adrs', label: 'Address 1' },
    //     { value: 'adrs', label: 'Address 2' },
    //     { value: 'adrs', label: 'Address 3' },
    //     { value: 'adrs', label: 'Address 4' },
    //     { value: 'adrs', label: 'Address 5' }
    // ]

    // const CloseBtn = <X className='cursor-pointer' size={25} onClick={handleModal} />
    return (
        <Modal className='modal-dialog-centered modal-lg' isOpen={openrecallmodal} toggle={handlRecoverModal} >
            {console.log('assest', asset)}
            {console.log('assestlist', assetList)}
            <ModalHeader tag='h1' toggle={handlRecoverModal}>
                Force Recall
            </ModalHeader>
            <ModalBody style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Row style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Col>
                        <h3>For Risk Officers and Vault operators to pull Sega assests back into its Parent Vault bypassing the Sega operator.</h3>
                    </Col>
                    <Col className='my-1'>
                        <Row className='d-flex flex-row'>
                            <Col md='1'><BsSafe2 size={40} /></Col>
                            <Col className='d-flex flex-column justify-content-start'>
                                <h3>SBI Savings</h3>
                                <h5>{selectSega}</h5>
                            </Col>
                        </Row>
                    </Col>
                    <Col className='d-flex flex-row mb-1'>
                        <Col md='1'><BsArrowDown size={40} /></Col>
                        <Col>
                            <hr />
                        </Col>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for='parentvault' style={{ fontSize: "1.3em" }}>Parent Vault</Label>
                            <Input type='text' id='parentvault' value={pVault} />
                        </FormGroup>
                    </Col>
                    {/* {
                        OrderTicket(
                            haveInfo ? "2" : "0",
                            haveInfo ? pVault : undefined,
                            haveInfo ? selectSega : undefined
                        )
                    } */}
                    <Col className='mb-1'>
                        <Label style={{ fontSize: "1.3em" }}>Select Assest</Label>
                        <Select
                            // theme={selectThemeColors}
                            className='react-select'
                            classNamePrefix='select'
                            defaultValue=''
                            name='clear'
                            options={data}
                            components={{
                                Option: OptionComponent
                            }}
                            isClearable
                        />
                    </Col>
                    <Col>
                        <FormGroup>
                            <Col className='d-flex flex-row justify-content-between'>
                                <Label for='amount' style={{ fontSize: "1.3em" }}>Amount</Label>
                                <a href='#' style={{ color: 'red' }}> Send Max</a>
                                {/* <CustomInput
                                        type='switch'
                                        id='exampleCustomSwitch'
                                        name='customSwitch'
                                        label='Send Max'
                                        inline
                                    /> */}
                            </Col>
                            <Input type='text' id='amount' />
                        </FormGroup>
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter className='justify-content-center'>
                <Button.Ripple color='primary' onClick={handlRecoverModal}>
                    Force Recall
                </Button.Ripple>
            </ModalFooter>
        </Modal>
    )
}

export default ForceRecall