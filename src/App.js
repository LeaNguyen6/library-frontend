import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar'
import Table from './components/Table'
import BookList from './pages/BookList'
import Transition from './pages/Transition'
import axios from 'axios'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
//import CssBaseline from '@material-ui/core/CssBaseline';

function App() {
  const [listBooks, setListBooks] = useState()
  const [listUsers, setlistUsers] = useState()

  useEffect(() => {
    //GET BOOKS
    axios({
      method: 'get',
      url: 'https://27--rest-api.glitch.me/api/book/all',
    })
      .then(function (res) {
        let listBooks = {}
        for (let i = 0; i < res.data.length; i++) {
          listBooks[res.data[i]._id] = res.data[i].title
        }
        setListBooks(listBooks)
       
      })
      .catch(err => console.log(err));
      //GET USERS
      axios({
        method: 'get',
        url: 'https://27--rest-api.glitch.me/api/user',
      })
        .then(function (res) {
          let listUsers = {}
          for (let i = 0; i < res.data.length; i++) {
            listUsers[res.data[i]._id] = res.data[i].name
          }
          setlistUsers(listUsers)
        })
        .catch(err => console.log(err));
  }, [])
  return (
    <Router>
      <div>
        <NavBar>

          {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/transactions">
              <Transition listBooks={listBooks} listUsers={listUsers}  />
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
  );
}
function Home() {
  return <h2>Home</h2>;
}


function Users() {
  return <Table />;
}
export default App;
