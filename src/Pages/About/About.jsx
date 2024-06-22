import React from "react";
import Layout from "../../Components/Layout/Layout";
import Body from "../../Components/Body/Body";
import itemsData from "../../data/items.json";
import AboutImage from "../../Assets/Grean Leaf Art Pic.png"
import "./About.css";

export default function About() {
  const { about } = itemsData;

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

              {about.map((about) => (
                <p className="aboutParagraph">{about.paragraph}</p>
              ))}
            </div>
          </div>
        </Body>
    </Layout>
  );
}
