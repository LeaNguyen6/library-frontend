import React, { Component } from 'react'
import AuthService from '../services/auth.service';

export const AuthContext = React.createContext()

export class AuthProvider extends Component {
    constructor() {
        super()
        this.state = { auth:false,
        user:{name:'user'}}
        this.changeLogin = this.changeLogin.bind(this)

    }
    changeLogin(login){
        console.log('changeLogin',login)
        this.setState({auth:login})
    }
    componentDidMount(){
        const user = AuthService.currentUser();
        console.log(user)
        if (user) {
            this.setState({
              user: user.user,
              auth:true
            });
          }
          else {this.setState({auth:false})}
    }
    render() {
        return (
            <AuthContext.Provider value={{ auth: this.state.auth, user:this.state.user,changeLogin:this.changeLogin  }} >
                {this.props.children}
            </AuthContext.Provider>
        )
    }
}
