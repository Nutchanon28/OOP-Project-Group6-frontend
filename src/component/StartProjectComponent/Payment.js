import React, { useContext } from 'react'
import '../../css/StartProjectComponent/Payment.css'
import { AuthContext } from '../../App'

function Payment() {

    const { auth, setAuth } = useContext(AuthContext)

    function onValueChange(event) {
        const { name, value } = event.target;
        const prevProject = auth.currentEditProject
        const prevPaymentDetail = prevProject.payment_detail
        setAuth((prevAuth) => {
            return {
                ...prevAuth,
                currentEditProject: {
                    ...prevProject,
                    payment_detail: {
                        ...prevPaymentDetail,
                        [name]: value
                    }
                }
            }
        })
        console.log(auth.currentEditProject.payment_detail)
    }

    async function onSavePaymentDetailClick() {
        const tempPaymentDetail = auth.currentEditProject.payment_detail
        const paymentDetail = {
            legal_first_name: tempPaymentDetail.legal_first_name, 
            legal_last_name: tempPaymentDetail.legal_last_name,
            email_address: tempPaymentDetail.email_address,
            date_of_birth: tempPaymentDetail.date_of_birth, 
            home_address: tempPaymentDetail.home_address, 
            city: tempPaymentDetail.city, 
            state: tempPaymentDetail.state, 
            postal_code: tempPaymentDetail.postal_code, 
            phone_number: tempPaymentDetail.phone_number, 
            account_number: tempPaymentDetail.account_number, 
            bank: tempPaymentDetail.bank
        }
        await fetch(`http://127.0.0.1:8000/edit_project/${auth.currentEditProject.id}/add_payment_detail`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(paymentDetail)
        })

        console.log(paymentDetail)
    }
    return (
        <div className='set-payment'>
            <div className='set-payment-container'>
                <div className='set-payment-con'>
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
                                            name='legal_first_name'
                                            value={auth.currentEditProject.payment_detail.legal_first_name}
                                            onChange={onValueChange}
                                        />
                                        <input 
                                            type='text' 
                                            placeholder='Last name'
                                            name='legal_last_name'
                                            value={auth.currentEditProject.payment_detail.legal_last_name}
                                            onChange={onValueChange}
                                        />
                                    </div>
                                    <div className='title-payment'>
                                        <p>Email address</p>
                                        <input 
                                            type='text' 
                                            placeholder='you@example.com'
                                            name='email_address'
                                            value={auth.currentEditProject.payment_detail.email_address}
                                            onChange={onValueChange}
                                        />
                                    </div>
                                    <div className='title-payment'>
                                        <p>Date of birth</p>
                                        <input 
                                            type='date' 
                                            max={new Date().toISOString().split('T')[0]} 
                                            name='date_of_birth'
                                            value={auth.currentEditProject.payment_detail.date_of_birth}
                                            onChange={onValueChange}
                                        />
                                    </div>
                                    <div className='title-payment'>
                                        <p>Home adress</p>
                                        <input 
                                            type='text' 
                                            placeholder='Address'
                                            name='home_address'
                                            value={auth.currentEditProject.payment_detail.home_address}
                                            onChange={onValueChange}
                                        />
                                        <input 
                                            type='text' 
                                            placeholder='City'
                                            name='city'
                                            value={auth.currentEditProject.payment_detail.city}
                                            onChange={onValueChange}
                                        />
                                        <select 
                                            placeholder='State'
                                            name='state'
                                            value={auth.currentEditProject.payment_detail.state}
                                            onChange={onValueChange}
                                        >
                                            <option>BANYANG</option>
                                            <option>NEWORLENE</option>
                                            <option>FLORIDA</option>
                                        </select>
                                        <input type='text' placeholder='Postal code'/>
                                    </div>
                                    <div className='title-payment'>
                                        <p>Phone number</p>
                                        <input 
                                            type='text'
                                            name='phone_number'
                                            value={auth.currentEditProject.payment_detail.phone_number}
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
                                        name='bank'
                                        value={auth.currentEditProject.payment_detail.bank}
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
                                        name='account_number'
                                        value={auth.currentEditProject.payment_detail.account_number}
                                        onChange={onValueChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='section-add-reward'>
                        <div className='save-reward-button width50' onClick={onSavePaymentDetailClick}>
                            Save payment detail
                        </div>
                        <div className='cancel-reward-button'>
                            Cancel
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment