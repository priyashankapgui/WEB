
import './App.css';
import { BrowserRouter as Router} from 'react-router-dom'
import createRoutes from './routes';
// import Home from './Pages/Home';
// import Products from './Pages/Products';
// import About from './Pages/About';
// import Signup from './Pages/Signup';
// import Contact from './Pages/Contact';
// import Cart from './Pages/Cart';

function App() {
  return (
  //   <div className="App">
   
  //  <Router>
  //     <div>

  //       <Switch>

  //         <Route exact path="/Home">
  //           <Home/>
  //         </Route>

  //         <Route path="/Products">
  //           <Products/>
  //         </Route>

  //         <Route path="/About">
  //           <About/>
  //         </Route>

  //         <Route path="/Signup">
  //           <Signup/>
  //         </Route>

  //         <Route path="/Contact">
  //           <Contact/>
  //         </Route>

  //         <Route path="/Cart">
  //           <Cart/>
  //         </Route>


  //       </Switch>
  //     </div>
  //     </Router>

      
  //   </div>

  <div>
    <Router>
    {createRoutes()}
    </Router>
  </div>
  );
}

export default App;
