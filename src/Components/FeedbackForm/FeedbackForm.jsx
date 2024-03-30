import React, { useRef } from 'react';
import InputField from '../InputField/InputField'; 
import Buttons from '../Button/Buttons'; 
import emailjs from '@emailjs/browser';
import './FeedbackForm.css';
import axios from 'axios';

export const FeedbackForm = () => {

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();


    emailjs
      .sendForm('service_s3vt08f', 'template_f7grc7g', form.current, {
        publicKey: 'qhvSCN--3mRnX-neP',
      })
      .then(
        () => {
         
          axios.post("http://localhost:8080/feedback", {
            name : new FormData(form.current).get('from_name'),
            email : new FormData(form.current).get('email'),
            phone : new FormData(form.current).get('phone'),
            feedbackType : new FormData(form.current).get('feedback_type'),
            message : new FormData(form.current).get('message'),
        })
        .then(() => {
            console.log('SUCCESS!');
        })
        .catch((error) => {
            console.log(error);
        });
        
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };


  return (
    
   
    <form ref={form} onSubmit={sendEmail} className='feedbackForm'>
        
      <InputField
        id="name"
        name="from_name"
        placeholder="Your Name"
        type="text"
      />
      <InputField
        id="email"
        name="email"
        placeholder="Email"
        type="email"
      />
      <InputField
        id="phone"
        name="phone"
        placeholder="Phone Number"
      /> 
      
       <select
      name="feedback_type"
      className="selectFeedback"
          >
      <option value="all">Select the feedback type</option>
      <option value="General">General</option>
      <option value="Bug Report">Bug Report</option>
      <option value="Feature Request">Feature Request</option>
      </select>

     
      <textarea name="message"   style={{ width: '100vh', height: '50vh',textAlign: 'left' ,fontFamily:'Poppins',fontSize:'1em',backgroundColor:'#eaeaea' ,borderRadius: '0.625em',border: '1px solid rgba(141, 144, 147, 0.5)'}}  />
          
      <Buttons type="submit"    style={{ width: '20vh', height: '7vh', backgroundColor: '#51B541',color:'white'  }} value='send'>Send</Buttons>
    
   
    </form>


  );
}

export default FeedbackForm;
