
import './App.css';
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom'
import Home from './Pages/Home';
import Products from './Pages/Products';
import About from './Pages/About';
import Signup from './Pages/Signup';
import Contact from './Pages/Contact';

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


        </Switch>
      </div>
      </Router>

      
    </div>
  );
}

export default App;
