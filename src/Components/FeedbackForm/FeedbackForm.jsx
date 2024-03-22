import React, { useState } from 'react';
import axios from 'axios'; 
import InputField from '../InputField/InputField'; 
import Buttons from '../Button/Buttons'; 
import './FeedbackForm.css';

function FeedbackForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    feedbackType: 'Select the feedback type',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/feedback', formData);
      console.log(response.data);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      
    }
  };

  return (
    
   
    <form onSubmit={handleSubmit} className='feedbackForm'>
        
      <InputField
        id="name"
        name="name"
        placeholder="Your Name"
        onChange={handleChange}
        value={formData.name}
      />
      <InputField
        id="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        value={formData.email}
      />
      <InputField
        id="phone"
        name="phone"
        placeholder="Phone Number"
        onChange={handleChange}
        value={formData.phone}
      /> 
      
       <select
      name="feedbackType"
      value={formData.feedbackType}
      onChange={handleChange}
      className="selectFeedback"
          >
      <option value="all">Select the feedback type</option>
      <option value="General">General</option>
      <option value="Bug Report">Bug Report</option>
      <option value="Feature Request">Feature Request</option>
      </select>

      <InputField
        id="message"
        name="message"
        placeholder="Message"
        onChange={handleChange}
        value={formData.message}
        style={{ width: '100vh', height: '50vh',textAlign: 'center' }} 
      />
          
      <Buttons type="submit"    style={{ width: '20vh', height: '7vh', backgroundColor: '#51B541',color:'white'  }} >Send</Buttons>
   
    </form>


  );
}

export default FeedbackForm;
