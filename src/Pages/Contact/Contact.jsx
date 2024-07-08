import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import Body from "../../Components/Body/Body";
import InputLabel from "../../Components/InputLable/InputLable";
import { Icon } from "@iconify/react";
import FeedbackForm from "../../Components/FeedbackForm/FeedbackForm";
import { getBranchOptions } from "../../Api/BranchApi/BranchApi.jsx"; // Adjust the path accordingly
import "./Contact.css";
import MainSpiner from "../../Components/Spiner/MainSpiner/MainSpiner.jsx";

export default function Contact() {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const branchesData = await getBranchOptions();
        setBranches(branchesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching branches:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchBranches();
  }, []);

  if (loading) {
    return <p><MainSpiner/></p>; 
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Layout>
      <Body>
        <div className="Contact_content">
          <div className="Contact_details">
            <div className="heading1">
              <Icon icon="el:phone-alt" style={{ fontSize: "4vh", color: "#62C96D" }} />
              <InputLabel
                htmlFor="example"
                color="black"
                fontFamily="Poppins"
                fontSize="2.5vh"
                fontWeight={600}
                lineHeight="1.5"
                marginTop="10px"
                marginBottom="20px"
              >
                Call To Us
              </InputLabel>
            </div>

            <InputLabel
              htmlFor="example"
              color="black"
              fontFamily="Poppins"
              fontSize="2.6vh"
              fontWeight={400}
              lineHeight="2"
              marginTop="20px"
              marginBottom="20px"
            >
              We are available 24/7, 7 days a week.
            </InputLabel>

            {branches.map((branch, index) => (
              <InputLabel
                key={index}
                htmlFor={`teleNumber-${index}`}
                color="black"
                fontFamily="Poppins"
                fontSize="2.6vh"
                fontWeight={400}
                lineHeight="2"
                marginTop="2vh"
                marginBottom="20px"
              >
                Phone: {branch.contactNumber}
              </InputLabel>
            ))}

            <div className="horizontalLine"></div>

            <div className="heading1">
              <Icon
                icon="pepicons-pop:letter-circle-filled"
                style={{ fontSize: "4vh", color: "#62C96D" }}
              />
              <InputLabel
                htmlFor="example"
                color="black"
                fontFamily="Poppins"
                fontSize="2.6vh"
                fontWeight={600}
                lineHeight="1.5"
                marginTop="10px"
                marginBottom="20px"
              >
                Write To Us
              </InputLabel>
            </div>

            <InputLabel
              htmlFor="example"
              color="black"
              fontFamily="Poppins"
              fontSize="2.6vh"
              fontWeight={400}
              lineHeight="2"
              marginTop="20px"
              marginBottom="20px"
            >
              Fill out our form and we will contact you within 24 hours.
            </InputLabel>

            {branches.map((branch, index) => (
              <InputLabel
                key={index}
                htmlFor={`teleNumber-${index}`}
                color="black"
                fontFamily="Poppins"
                fontSize="2.6vh"
                fontWeight={400}
                lineHeight="2"
                marginTop="2vh"
                marginBottom="20px"
              >
                Email: {branch.email}
              </InputLabel>
            ))}
          </div>

          <FeedbackForm />
        </div>
      </Body>
    </Layout>
  );
}
