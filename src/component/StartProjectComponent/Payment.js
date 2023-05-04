import React, { useContext, useEffect, useState } from 'react'
import '../../css/StartProjectComponent/Payment.css'
import DataContext from '../../context/DataContext'
import { AiFillCheckCircle } from "react-icons/ai";

function Payment() {

    const { projectId, setProjectId } = useContext(DataContext)
    const { userId, setUserId } = useContext(DataContext)
    const [creditCards, setCreditCards] = useState([])
    const [paymentIndex, setPaymentIndex] = useState(99)
    const [payment, setPayment] = useState(null)

    const [canSubmit, setCanSubmit] = useState(false)

    async function getPayment() {
        const response = await fetch(`http://127.0.0.1:8000/get_payment_method?user_id=${userId}`)
        const responseJson = await response.json()
        setCreditCards(responseJson)
        console.log(responseJson)
        const response2 = await fetch(`http://127.0.0.1:8000/get_project_credit_card/${projectId}`)
        const responseJson2 = await response2.json()
        setPayment(responseJson2)
    }


    function onCreditCardClick(theId) {
        setPaymentIndex(theId)
        setCanSubmit(true)
        console.log(paymentIndex)
    }

    async function onSavePaymentDetailClick() {

        if(!canSubmit) {
            return
        }
        const payload = {id: paymentIndex}
        setCanSubmit(false)
        await fetch(`http://127.0.0.1:8000/edit_project/${projectId}/add_credit_card/${userId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        })
        console.log(payload)
        getPayment()
        setPaymentIndex(99)
    }


    useEffect(() => {
        getPayment()
    }, [])

    let projectCreditCardElement = null
    let myProjectCardElements = null
    if(!!payment) {
        projectCreditCardElement = (
            <div className="saved-paymentmethod-detail-blockk">
                <p>{payment._CreditCardTransaction__country}</p>
                <p>{payment._CreditCardTransaction__cvc}</p>
                <p>{payment._CreditCardTransaction__expiration}</p>
                <p>{payment._CreditCardTransaction__card_number}</p>
            </div>
        )
    }
    else {
        projectCreditCardElement = (
            <div>Please add your payment methode.</div>
        )
    }
    if(creditCards.length) {
        myProjectCardElements = creditCards.map((card) => {
            return (
                <div key={card.id} className="saved-paymentmethod-detail-blockk"
                    onClick={() => onCreditCardClick(card.id)}
                >
                    <p>{card._CreditCardTransaction__country}</p>
                    <p>{card._CreditCardTransaction__cvc}</p>
                    <p>{card._CreditCardTransaction__expiration}</p>
                    <p>{card._CreditCardTransaction__card_number}</p>
                    <div className={paymentIndex == card.id ? "is-check" : "hidden"}>
                        <AiFillCheckCircle />
                    </div>
                </div>
            )
        })
    }

    return (
        <div className='set-payment'>
            <div className='set-payment-container'>
                <div className='set-payment-con'>
                    <div className={ canSubmit ? "universe" : "grand" } onClick={onSavePaymentDetailClick}>
                        Save
                    </div>
                    <div className='payment-header'>
                        <h1>
                            Verify your details and link a bank account
                        </h1>
                        <p>
                        Confirm who’s raising funds and receiving them if this project reaches its funding goal. Double-check your<br /> information—you agree the details you provide are true and acknowledge they can’t be changed <br />once submitted.
                        </p>
                    </div>
                    <div className='payment-section'>
                        <div className='flex-payment'>
                            <div className='left-element-payment'>
                                <p>Payment source</p>
                                <p>Add a Visa, Mastercard, or American Express credit or debit card. Discover, JCB, Maestro, and Visa Electron cards are not accepted.</p>
                                <p>This card must be registered to the individual or entity (or entity’s owner) raising funds for this project, and in their name.</p>
                                <p>By adding this card, you agree Kickstarter may charge it for refunds, or in the event of lost chargeback disputes for your project.</p>
                            </div>
                            <div className='right-element-payment'>
                                {projectCreditCardElement}
                            </div>
                        </div>
                        <div className='flex-payment'>
                            Select your payment method.
                        </div>
                        <div className='flex-payment'>
                            <div className='credit-card-container'>
                                {myProjectCardElements}
                            </div> 
                        </div>
                    </div>
                    
                    {/*
                    <div className='payment-header'>
                        <h1>
                            Verify your details and link a bank account
                        </h1>
                        <p>
                        Confirm who’s raising funds and receiving them if this project reaches its funding goal. Double-check your<br /> information—you agree the details you provide are true and acknowledge they can’t be changed <br />once submitted.
                        </p>
                    </div>
                    <div className='payment-section'>
                        <div className='flex-payment'>
                            <div className='left-element-payment'>
                                <p>Verify your personal details</p>
                                <p>Adipisicing enim culpa voluptate ea dolor enim ex ea. Ea veniam minim deserunt laboris.</p>
                                <p>Excepteur reprehenderit sint nostrud aliquip culpa.Labore consequat elit elit cupidatat est nisi ad dolore exercitation tempor labore culpa officia ullamco.</p>
                            </div>
                            <div className='right-element-payment'>
                                <div className='title-payment'>
                                    <div className='title-payment'>
                                        <p>Your legal name</p>
                                        <input 
                                            type='text' 
                                            placeholder='First name'
                                            name='_PaymentDetail__legal_first_name'
                                            value={payment._PaymentDetail__legal_first_name}
                                            onChange={onValueChange}
                                        />
                                        <input 
                                            type='text' 
                                            placeholder='Last name'
                                            name='_PaymentDetail__legal_last_name'
                                            value={payment._PaymentDetail__legal_last_name}
                                            onChange={onValueChange}
                                        />
                                    </div>
                                    <div className='title-payment'>
                                        <p>Email address</p>
                                        <input 
                                            type='text' 
                                            placeholder='you@example.com'
                                            name='_PaymentDetail__email_address'
                                            value={payment._PaymentDetail__email_address}
                                            onChange={onValueChange}
                                        />
                                    </div>
                                    <div className='title-payment'>
                                        <p>Date of birth</p>
                                        <input 
                                            type='date' 
                                            max={new Date().toISOString().split('T')[0]} 
                                            name='_PaymentDetail__date_of_birth'
                                            value={payment._PaymentDetail__date_of_birth}
                                            onChange={onValueChange}
                                        />
                                    </div>
                                    <div className='title-payment'>
                                        <p>Home adress</p>
                                        <input 
                                            type='text' 
                                            placeholder='Address'
                                            name='_PaymentDetail__home_address'
                                            value={payment._PaymentDetail__home_address}
                                            onChange={onValueChange}
                                        />
                                        <input 
                                            type='text' 
                                            placeholder='City'
                                            name='_PaymentDetail__city'
                                            value={payment._PaymentDetail__city}
                                            onChange={onValueChange}
                                        />
                                        <select 
                                            placeholder='State'
                                            name='_PaymentDetail__state'
                                            value={payment._PaymentDetail__state}
                                            onChange={onValueChange}
                                        >
                                            <option>BANYANG</option>
                                            <option>NEWORLENE</option>
                                            <option>FLORIDA</option>
                                        </select>
                                        <input 
                                            type='text' 
                                            placeholder='Postal code'
                                            name="_PaymentDetail__postal_code"
                                            value={payment._PaymentDetail__postal_code}
                                            onChange={onValueChange}
                                        />
                                    </div>
                                    <div className='title-payment'>
                                        <p>Phone number</p>
                                        <input 
                                            type='text'
                                            name='_PaymentDetail__phone_number'
                                            value={payment._PaymentDetail__phone_number}
                                            onChange={onValueChange}
                                        />
                                    </div>  
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='payment-section'>
                        <div className='flex-payment'>
                            <div className='left-element-payment'>
                                <p>Bank account</p>
                                <p>Add the checking account where you want to receive funds. This account must be located in the Thailand, and able to receive direct deposits in the currency in which you raise funds. We don’t support wire transfers, savings accounts, or virtual bank accounts.</p>
                                <p>You represent you're authorized to link this bank account to this project. If you’re raising funds as an individual, the account is registered in your name. If it’s on behalf of a business or nonprofit, the account is registered in the name of that entity.</p>
                                <p>Make sure all your details are correct—you can’t change them after you submit your project for review. Kickstarter isn’t responsible for lost bank transfers as a result of incorrect or unsupported bank credentials or accounts.</p>
                            </div>
                            <div className='right-element-payment'>
                                <div className='title-payment'>
                                    <p>Bank</p>
                                    <select
                                        name='_PaymentDetail__bank'
                                        value={payment._PaymentDetail__bank}
                                        onChange={onValueChange}
                                    >
                                       <option>BANGKOK BANK</option>
                                       <option>BANK OF AYUDHYA</option>
                                       <option>KASIKORNBANK</option>
                                       <option>KRUNG THAI BANK</option> 
                                       <option>SIAM COMMERCIAL BANK</option>
                                       <option>TMB BANK</option>
                                       <option>GOVERNMENT SAVINGS BANK</option>
                                    </select>
                                </div>
                                <div className='title-payment'>
                                    <p>Account number</p>
                                    <input 
                                        type='text'
                                        name='_PaymentDetail__account_number'
                                        value={payment._PaymentDetail__account_number}
                                        onChange={onValueChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='section-add-reward'>
                        <div className={canSubmit ? 'save-reward-button width50' : 'save-reward-grand width50'} onClick={onSavePaymentDetailClick}>
                            Save payment detail
                        </div>
                        <div className='cancel-reward-button'>
                            Cancel
                        </div>
                    </div>*/}
                </div>
            </div>
        </div>
    )
}

export default Payment