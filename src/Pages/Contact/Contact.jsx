import React from "react";
import Layout from "../../Components/Layout/Layout";
import Body from "../../Components/Body/Body";
import InputLabel from "../../Components/InputLable/InputLable";
import "./Contact.css";
import { Icon } from "@iconify/react";
import items from "../../data/items.json";
import FeedbackForm from "../../Components/FeedbackForm/FeedbackForm";

export default function Contact() {
  return (
    <Layout>
      <Body>
        <div className="Contact_content">
          <div className="Contact_details">
            <div className="heading1">
              <Icon
                icon="el:phone-alt"
                style={{ fontSize: "4vh", color: "#62C96D" }}
              />
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

            {items.contact.map((contact, index) => (
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
                {" "}
                Phone : {contact.teleNumber}
              </InputLabel>
            ))}

            <din className="horizontalLine"></din>

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
                Write To US
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

            {items.contact.map((contact, index) => (
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
                {" "}
                Email : {contact.email1}
              </InputLabel>
            ))}
          </div>

          <FeedbackForm />
        </div>
      </Body>
    </Layout>
  );
}
