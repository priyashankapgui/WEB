import React from "react";
import "./Products.css"
import InputLabel from "../../Components/InputLable/InputLable";
import Square from "../../Components/Square/Square";
import Layout from "../../Components/Layout/Layout";
import Body from "../../Components/Body/Body";


export default function Products() {
  return (
    <Layout>
      <Body>
      <div className="products">
      <div className="Products-title">
              <Square size={5} color="#62C96D" marginRight={2.5} />
              <InputLabel
                htmlFor="example"
                color="black"
                fontSize="1.4em"
                fontWeight={500}
                lineHeight="1.5"
              >
                Discounts
              </InputLabel>
              <a href="" className="products_ViewAll">View All..</a>
              
            </div>

        
      </div>
      </Body>
      
    </Layout>
  );
}
