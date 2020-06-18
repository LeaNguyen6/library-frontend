import React from 'react';
import './App.css';
import NavBar from './components/NavBar'
import Table from './components/Table'
import BookList from './pages/BookList'
import Transition from './pages/Transition'
import Signin from './pages/Signin'
import { CartProvider } from './contexts/Cart'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
//import CssBaseline from '@material-ui/core/CssBaseline';

function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <NavBar>

            {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/transactions">
                <Transition />
              </Route>
              <Route path="/books">
                <BookList />
              </Route>
              <Route path="/users">
                <Users />
              </Route>
              <Route exact path="/">
                <Home />
              </Route>
            </Switch>
          </NavBar>
        </div>
      </Router>
    </CartProvider>
  );
}
function Home() {
  return <Signin />
}


function Users() {
  return <Table />;
}
export default App;
