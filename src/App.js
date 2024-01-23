
import './App.css';
import { BrowserRouter } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar';
import Topheader from './Components/Topheader/Topheader';


function App() {
  return (
    <div className="App">
   
      <BrowserRouter>
      <Topheader />
      <Navbar />
     
  
      </BrowserRouter>
      
    </div>
  );
}

export default App;
