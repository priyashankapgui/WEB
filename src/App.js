
import './App.css';
import { BrowserRouter } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar';
import Topheader from './Components/Topheader/Topheader';
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <div className="App">
   
      <BrowserRouter>
      <Topheader />
      <Navbar />
      <Footer />
     
  
      </BrowserRouter>
      
    </div>
  );
}

export default App;
