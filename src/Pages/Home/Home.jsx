import React from 'react'

import './Home.css'
import Layout from '../../Components/Layout/Layout'
import ItemCard from '../../Components/Card/Card'
import Body from '../../Components/Body/Body'
import image from '../../Assets/image.png'
import InputLabel from '../../Components/InputLable/InputLable'
import Square from '../../Components/Square/Square'


export default function Home() {
  return (
   
     
    <div className='home'>
  <Layout>
    <Body>

      <div className='title'>
    <Square size={5} color="#62C96D" marginRight={2.5} />
    <InputLabel
       htmlFor="example"
       color="black"
       fontSize="1.4em"
       fontWeight={500}
       lineHeight="1.5"
      >
        Today Sales
      </InputLabel>
      </div>

     <div className='productCards'>
    

     <ItemCard
     
    LablePrice="Rs : 375.00 LKR"
    LableProductName="Signal Strong Teeth"
    LabelProductWeight="200g"
    image={image}
    buttonProps={{ type: "submit", id: "AddtoCartbtn", btnHeight: "2.5em", btnWidth: "10em", alignSelf: "center", style: { backgroundColor: "#2EB072", color: "#EBEBEB" } }}
    buttonLabel="Add to Cart"
    cardStyles={{ maxWidth: '100%', maxHeight: 'fit-content', backgroundColor: '#FFFFFF' ,paddingTop:'1.2vh'}}
    />


  <ItemCard
   LablePrice="Rs : 375.00 LKR"
   LableProductName="Signal Strong Teeth"
   LabelProductWeight="200g"
   image={image}
   buttonProps={{ type: "submit", id: "AddtoCartbtn", btnHeight: "2.5em", btnWidth: "10em", alignSelf: "center", style: { backgroundColor: "#2EB072", color: "#EBEBEB" } }}
   buttonLabel="Add to Cart"
   cardStyles={{ maxWidth: '40%', maxHeight: 'fit-content', backgroundColor: '#FFFFFF' ,paddingTop:'1.2vh'}}
  />


<ItemCard
  LablePrice="Rs : 375.00 LKR"
  LableProductName="Signal Strong Teeth"
  LabelProductWeight="200g"
  image={image}
  buttonProps={{ type: "submit", id: "AddtoCartbtn", btnHeight: "2.5em", btnWidth: "10em", alignSelf: "center", style: { backgroundColor: "#2EB072", color: "#EBEBEB" } }}
  buttonLabel="Add to Cart"
  cardStyles={{ maxWidth: '40%', maxHeight: 'fit-content', backgroundColor: '#FFFFFF' ,paddingTop:'1.2vh'}}
/>


<ItemCard
  LablePrice="Rs : 375.00 LKR"
  LableProductName="Signal Strong Teeth"
  LabelProductWeight="200g"
  image={image}
  buttonProps={{ type: "submit", id: "AddtoCartbtn", btnHeight: "2.5em", btnWidth: "10em", alignSelf: "center", style: { backgroundColor: "#2EB072", color: "#EBEBEB" } }}
  buttonLabel="Add to Cart"
  cardStyles={{ maxWidth: '40%', maxHeight: 'fit-content', backgroundColor: '#FFFFFF' ,paddingTop:'1.2vh'}}
/>


<ItemCard
  LablePrice="Rs : 375.00 LKR"
  LableProductName="Signal Strong Teeth"
  LabelProductWeight="200g"
  image={image}
  buttonProps={{ type: "submit", id: "AddtoCartbtn", btnHeight: "2.5em", btnWidth: "10em", alignSelf: "center", style: { backgroundColor: "#2EB072", color: "#EBEBEB" } }}
  buttonLabel="Add to Cart"
  cardStyles={{ maxWidth: '100%', maxHeight: 'fit-content', backgroundColor: '#FFFFFF' ,paddingTop:'1.2vh'}}
/>

      
    </div>
    </Body>
    </Layout>   
    </div>
  
  )
}
