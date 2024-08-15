import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import "../index.css";


const Signup = () => {
    const [isSignUp, setSignUp]=useState(true);
    console.log(isSignUp)
  return (
    <div className='roboto sign-up-container' fluid >
    <div className='sign-up-image'></div> 
    <div className='sign-up-content d-flex flex-column align-items-center justify-content-center'>
        <h1 className='display-5 text-center cursive-fonts'>
            <p className='medium-purple-color'>{isSignUp ? "Sign Up" : "Login"}</p> 
        </h1>
            {isSignUp ? <SignUpComponent/> : <LoginComponent/>}
        <button 
            type='button' 
            onClick={()=>setSignUp((prevState)=>!prevState)} 
            className='text-center btn-custom-link'
        >
            { isSignUp ?"already have an account" : "create an account" }
            <span>&#8594;</span> {!isSignUp ? "Sign Up" : "Login"}
        </button>
    </div>  
    </div>
  )
}

const LoginComponent=()=>{
    return(
        <Formik
       initialValues={{ email: '', password: '' }}
       validate={values => {
            const errors = {};
            if (!values.email) {
             errors.email = 'Email is required';
            }else if (!values.password) {
                errors.password ="Password is required"
            }
             else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
                errors.email = 'Invalid email address';
            }
            return errors;
        }}
        
        onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
            }, 400);
        }}
        >
       {({ isSubmitting }) => (
         <Form className='d-flex gap-2 flex-column justify-content-center align-items-center py-3'>
           <Field 
            type="email"  
            name="email" 
            placeholder="Enter your Email Address"  
            className="py-2 px-1 form-width"
            />
           <ErrorMessage name="email" component="div" className='text-danger' />
           <Field 
                type="password" 
                placeholder="Enter your Password" 
                name="password"  
                className="py-2 mt-1 px-1 form-width"
                />
           <ErrorMessage name="password" component="div" className='text-danger' />
           <button type="submit" className='btn-custom my-1' disabled={isSubmitting}>
             Submit
           </button>
         </Form>
       )}
     </Formik>
    )
}
const SignUpComponent=()=>{
    return(
        <Formik
       initialValues={{ email: '', password: '',username:"" }}
       validate={values => {
            const errors = {};
            if (!values.email) {
             errors.email = 'Email is required';
            }else if (!values.password) {
                errors.password ="Password is required"
            }
            else if (!values.username) {
                errors.username ="Username is required"
            }
            else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
                errors.email = 'Invalid email address';
            }
            return errors;
        }}
        
        onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
            }, 400);
        }}
        >
       {({ isSubmitting }) => (
         <Form className='d-flex gap-2 flex-column justify-content-center align-items-center py-3'>
            <Field 
            type="username"  
            name="username" 
            placeholder="Enter your Username"  
            className="py-2 px-1 form-width"
            />
           <ErrorMessage name="username" component="div" className='text-danger' />
           <Field 
            type="email"  
            name="email" 
            placeholder="Enter your Email Address"  
            className="py-2 px-1 form-width"
            />
           <ErrorMessage name="email" component="div" className='text-danger' />
           <Field 
                type="password" 
                placeholder="Enter your Password" 
                name="password"  
                className="py-2 mt-1 px-1 form-width"
                />
           <ErrorMessage name="password" component="div" className='text-danger' />
           <button type="submit" className='btn-custom my-1' disabled={isSubmitting}>
             Submit
           </button>
         </Form>
       )}
     </Formik>
    )
}
export default Signup;



