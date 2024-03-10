import React from 'react'
import Layout from '../../Components/Layout/Layout'
import Body from '../../Components/Body/Body'
import Card from '../../Components/Card/Card'
import itemsData from '../../data/items.json'

export default function About() {
  const {about} = itemsData;

  return (
    <Layout>
    <div className='about'>

      <Body>

      {about.map(about => (
        <Card
       LableProductName={about.paragraph}
        image={about.image}
        cardStyles={{ width: '40vh', height: 'fix-content', backgroundColor: '#FFFFFF' ,paddingTop:'0'}}
        width="50vh"
        height="auto"
       showButton={false} 
       showRating={false}
        showQuarter={false}
        
         />
      ))}
      </Body>
      
    </div>
    </Layout>
  )
}
