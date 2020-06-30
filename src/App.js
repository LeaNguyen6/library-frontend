import React from 'react';
import './App.css';
import NavBar from './components/NavBar'

import Table from './components/Table'
import BookList from './pages/BookList'
import Transition from './pages/Transition'
import Profile from './pages/Profile'

import Signin from './pages/Signin'
import Signup from './pages/Signup'
import { CartProvider } from './contexts/Cart'
import { AuthProvider } from './contexts/Auth'
import AuthService from './services/auth.service';

import {
  BrowserRouter as Router,
  Switch,
  Route,Redirect
} from "react-router-dom";
//import CssBaseline from '@material-ui/core/CssBaseline';

function App() {
  return (
    <CartProvider>
      <AuthProvider>
      <Router>
        <div>
          <NavBar>

            {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
            <Switch>
              <PrivateRoute path="/transactions">
                <Transition />
              </PrivateRoute>
              <Route path="/signin">
                <Signin />
              </Route>
              <Route path="/signup">
                <Signup />
              </Route>
              <PrivateRoute path="/books">
                <BookList />
              </PrivateRoute>
              <PrivateRoute path="/users">
                <Users />
              </PrivateRoute>
              <PrivateRoute path="/profile">
                <Profile />
              </PrivateRoute>
              <Route exact path="/">
                <Home />
              </Route>
            </Switch>
          </NavBar>
        </div>
      </Router>
      </AuthProvider>
    </CartProvider>
  );
}
function Home() {
  return <Signin />
}


function Users() {
  return <Table />;
}
let isAuthenticated= (AuthService.currentUser())? true : false;
function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
    }
export default App;
