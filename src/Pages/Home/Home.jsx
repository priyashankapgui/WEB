import React from 'react';
import './Home.css'
import { Link } from 'react-router-dom';

import Layout from '../../Components/Layout/Layout'


export default function Home() {
 
  return (
    <Layout>
      <div className='home'>

          <Link to='/login'>
            <h1>Home Page</h1>
          
          </Link>
         

      </div>
    </Layout>
  );
  
}
