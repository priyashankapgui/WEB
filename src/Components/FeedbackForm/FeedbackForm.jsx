import React, { useRef, useState, useEffect } from "react";
import InputField from "../InputField/InputField";
import Buttons from "../Button/Buttons";
import LoaderComponent from "../Spiner/HashLoader/HashLoader";
import "./FeedbackForm.css";
import axios from "axios";
import emailjs from "@emailjs/browser";
import ConnectionWarning from "../../Components/Alerts/ConnectionWarning";
import SquareButton from "../../Components/Button/SquareButton"

export const FeedbackForm = () => {
  const feedbackApiUrl = process.env.REACT_APP_FEEDBACK_API;
  const form = useRef();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = () => {
    axios.get("http://localhost:8080/branchesWeb")
      .then(response => {
        setBranches(response.data);
      })
      .catch(error => {
        console.error("Error fetching branches:", error);
      });
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePhone = (phone) => {
    const re = /^\d{10}$/;
    return re.test(String(phone));
  };

  const sendEmail = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    if (!validatePhone(phone)) {
      setPhoneError("Please enter a valid 10-digit phone number.");
      return;
    }

    setLoading(true);

    emailjs
      .sendForm("service_s3vt08f", "template_f7grc7g", form.current, {
        publicKey: "qhvSCN--3mRnX-neP",
      })
      .then(
        () => {
          axios
            .post(feedbackApiUrl, {
              name: new FormData(form.current).get("from_name"),
              email: new FormData(form.current).get("email"),
              phone: new FormData(form.current).get("phone"),
              feedbackType: new FormData(form.current).get("feedback_type"),
              branch: new FormData(form.current).get("branch_name"),
              message: new FormData(form.current).get("message"),
            })
            .then(() => {
              console.log("SUCCESS!");
              form.current.reset();
              setEmailError("");
              setEmail("");
              setPhoneError("");
              setPhone("");
              setLoading(false);
              setSuccessMessage("Your feedback has been sent successfully!");
              setErrorMessage("");
              setTimeout(() => setSuccessMessage(""), 3000);
            })
            .catch((error) => {
              console.log(error);
              setLoading(false);
              setErrorMessage("Failed to send feedback. Please try again later.");
            });
        },
        (error) => {
          console.log("FAILED...", error.text);
          setLoading(false);
          setErrorMessage("Failed to send feedback. Please try again later.");
        }
      );
  };

  return (
    <div>
      {loading && (
        <div className="loader-wrapper">
          <LoaderComponent />
        </div>
      )}
      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="error-message">
          {errorMessage}
        </div>
      )}
      <ConnectionWarning /> {/* Add ConnectionWarning */}
      <form ref={form} onSubmit={sendEmail} className="feedbackForm">
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <span className="error">{emailError}</span>}
        <InputField
          id="phone"
          name="phone"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        {phoneError && <span className="error">{phoneError}</span>}

        <select name="feedback_type" className="selectFeedback">
          <option value="">Select the feedback type</option>
          <option value="General">General</option>
          <option value="Bug Report">Bug Report</option>
          <option value="Feature Request">Feature Request</option>
        </select>

        <select name="branch_name" className="selectBranch">
          <option value="">Select the Branch</option>
          {branches.map(branch => (
            <option key={branch.branchName} value={branch.branchName}>{branch.branchName}</option>
          ))}
        </select>

        <textarea
          name="message"
          style={{
            width: "100vh",
            height: "50vh",
            textAlign: "left",
            fontFamily: "Poppins",
            fontSize: "1em",
            backgroundColor: "#eaeaea",
            borderRadius: "0.625em",
            border: "1px solid rgba(141, 144, 147, 0.5)",
          }}
        />
        <SquareButton type="submit"
          id="sendButton"
          className="signin-btn"
          style={{ backgroundColor: "#51B541", color: "white" }}
          btnHeight="45px"
          btnWidth="342px"
          fontSize="18px"
          marginTop="2px">
          Send
        </SquareButton>
      </form>
    </div>
  );
};

export default FeedbackForm;
