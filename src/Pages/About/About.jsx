import React, { useState, useEffect } from "react"; // Add useEffect here
import Layout from "../../Components/Layout/Layout";
import Body from "../../Components/Body/Body";
import itemsData from "../../data/items.json";
import AboutImage from "../../Assets/Grean Leaf Art Pic.png";
import "./About.css";
import MainSpiner from "../../Components/Spiner/MainSpiner/MainSpiner";

export default function About() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { about } = itemsData;

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      if (itemsData) {
        setLoading(false);
      } else {
        setLoading(false);
        setError("Failed to load data");
      }
    }, 1000); // Simulate a network delay
  }, []);

  if (loading) {
    return (
      <p>
        <MainSpiner />
      </p>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Layout>
      <Body>
        <div className="aboutContent">
          <div className="aboutImage">
          <img
                  src={`https://flexflowstorage01.blob.core.windows.net/webimage/aboutimages(${0}).png`}
                  alt="logo"
                />
          </div>
          <div className="aboutPhara">
            {about.map((item, index) => (
              <p className="aboutParagraph" key={index}>
                {item.paragraph}
              </p>
            ))}
          </div>
        </div>
      </Body>
    </Layout>
  );
}
