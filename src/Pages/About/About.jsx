import React from "react";
import Layout from "../../Components/Layout/Layout";
import Body from "../../Components/Body/Body";
import itemsData from "../../data/items.json";

export default function About() {
  const { about } = itemsData;

  return (
    <Layout>
      <div className="about">
        <Body> 
          <div>
          {about.map((about) => (
       
       <img
      
       src={about.imageLogo}
       alt={about.altText} 
       className="aboutImage"
     />
           
          ))}

{about.map((about) => (
       
       <p  className="aboutParagraph">{about.paragraph}</p>
      
     ))}
     </div>
        </Body>
      </div>
    </Layout>
  );
}
