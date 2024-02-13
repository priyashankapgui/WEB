
import './App.css';
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom'
import Home from './Pages/HomePage/Home';
import Products from './Pages/ProductsPage/Products';
import About from './Pages/AboutPage/About';
import Signup from './Pages/SignupPage/Signup';
import Contact from './Pages/ContactPage/Contact';
import Cart from './Pages/CartPage/Cart';

function App() {
  return (
    <div className="App">
   
   <Router>
      <div>

        <Switch>

          <Route exact path="/Home">
            <Home/>
          </Route>

          <Route path="/Products">
            <Products/>
          </Route>

          <Route path="/About">
            <About/>
          </Route>

          <Route path="/Signup">
            <Signup/>
          </Route>

          <Route path="/Contact">
            <Contact/>
          </Route>

          <Route path="/Cart">
            <Cart/>
          </Route>


        </Switch>
      </div>
      </Router>

      
    </div>
  );
}

export default App;
