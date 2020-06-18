import React, { Component } from 'react'
export const CartContext = React.createContext()
export class CartProvider extends Component {
    constructor() {
        super()
        this.state = { cartItems: [] }
        this.addtoCart = this.addtoCart.bind(this)
    }
    addtoCart(product) {
        console.log(product)
        this.setState({ cartItems: this.state.cartItems.concat(product) })
    }
    render() {
        return (
            <CartContext.Provider value={{ cartItems: this.state.cartItems, addtoCart: this.addtoCart }} >
                {this.props.children}
            </CartContext.Provider>
        )
    }
}
