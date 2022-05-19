import React, { useState, } from 'react'
import { Form, Button, Col, Image } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import {useNavigate} from "react-router-dom";
import {
    MDBCard,
    MDBCardBody,
    MDBCardFooter,
    MDBValidation,
    MDBBtn,
    MDBIcon,
    MDBSpinner,
    MDBInput,
} from "mdb-react-ui-kit";

const Payment = () => {
    const navigate=useNavigate();
    const submitHandler = (e) => {
        e.preventDefault();
         navigate('/checkout');
    }
    return (
      <>
        <FormContainer>
        <h1>Pay Here</h1>
            <Form >
                <Form.Group>
                    <Form.Label as='legend'></Form.Label>
                <Col>

                    <Image src='https://www.payhere.lk/downloads/images/payhere_long_banner_dark.png' alt='PayHere' width='440'/>
                   
                    {/*<Form.Check
                        type='radio'
                        label='PayPal or Credit Card'
                        id='PayPal'
                        name='paymentMethod'
                        value='PayPal'
                        checked
                        onChange={(e) => setPaymentMethod(e.target.value)}>
                    </Form.Check>
                    {/* <Form.Check
                        type='radio'
                        label='Stripe'
                        id='Stripe'
                        name='paymentMethod'
                        value='Stripe'
                        onChange={(e) => setPaymentMethod(e.target.value)}>
                    </Form.Check> */}
                </Col>
                </Form.Group>
            </Form>
        </FormContainer>
    <div 
    style={{
       margin:"auto",
       padding:"1px",
       maxWidth:"450px",
       alignContent:"center",
       marginTop:"90px",
   }}
   >
       <MDBCard alignment="center">
           <MDBIcon fas icon="user-circle" className='="fa-2x'>
             <h5>Customer Details</h5>
             <MDBCardBody>
                  <MDBValidation onSubmit={submitHandler} noValidate className='row g-3'>
                  <div className='col-md-6'>
                      <MDBInput
                       label="First Name"
                       type="text"
                       name="firstName"
                       required
                       invalid
                       validation="Please provide your First Name"
                     /> 
                     </div>
                     <div className='col-md-6'>
                      <MDBInput
                       label="Last Name"
                       type="text"
                       name="lastName"
                       required
                       invalid
                       validation="Please provide your Last Name"
                     /> 
                     </div>
                     <div className='col-md-12'>
                      <MDBInput
                       label="Email"
                       type="email"
                       name="email"
                       required
                       invalid
                       validation="Please provide your Email"
                     /> 
                     </div>
                       
                     <div className='col-md-12'>
                         <MDBBtn style={{width:"100%"}} className="mt-2">
                             Continue
                         </MDBBtn>
                     </div>                    
                  </MDBValidation>
             </MDBCardBody>
           </MDBIcon>
       </MDBCard>

   </div>

   </>  



    )
}

export default Payment
