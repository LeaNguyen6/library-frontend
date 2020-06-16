import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar'
import Table from './components/Table'
import BookList from './pages/BookList'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
//import CssBaseline from '@material-ui/core/CssBaseline';

function App() {
  return (
    <Router>
      <div>
        <NavBar>

          {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/transactions">
              <Table/>
            </Route>
            <Route path="/books">
              <BookList />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route exact path="/">
              <Home/>
            </Route>
          </Switch>
        </NavBar>
      </div>
    </Router>
  );
}
function Home() {
  return <h2>Home</h2>;
}


function Users() {
  return <h2>Users</h2>;
}
export default App;
