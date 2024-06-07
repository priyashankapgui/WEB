import React from 'react'
import InputLabel from "../../../Components/InputLable/InputLable";
import Square from "../../../Components/Square/Square";
import Layout from "../../../Components/Layout/Layout";
import Body from "../../../Components/Body/Body";
import "./ProductsAll.css"


export default function ProductsAll() {
  return (
    <Layout>
      <Body>
      <div className="productsAll">
      <div className="ProductsAll-title">
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

              </div>
            </div>
      </Body>
      </Layout>
  )
}

