import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  // కార్ట్‌లో ఐటమ్ యాడ్ చేసే లాజిక్
  addCartItem = product => {
    this.setState(prevState => {
      const {cartList} = prevState
      const isExisting = cartList.find(each => each.id === product.id)

      if (isExisting) {
        const updatedList = cartList.map(item => {
          if (item.id === product.id) {
            return {...item, quantity: item.quantity + product.quantity}
          }
          return item
        })
        return {cartList: updatedList}
      }

      return {cartList: [...cartList, product]}
    })
  }

  // కార్ట్ నుండి ఐటమ్ తొలగించడం
  removeCartItem = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(item => item.id !== id),
    }))
  }

  // కార్ట్ మొత్తం క్లియర్ చేయడం
  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  // ఐటమ్ క్వాంటిటీ పెంచడం
  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(item =>
        item.id === id ? {...item, quantity: item.quantity + 1} : item,
      ),
    }))
  }

  // ఐటమ్ క్వాంటిటీ తగ్గించడం (1 కన్నా తక్కువైతే రిమూవ్ చేయడం)
  decrementCartItemQuantity = id => {
    this.setState(prevState => {
      const updatedCartList = prevState.cartList
        .map(item => {
          if (item.id === id) {
            return {...item, quantity: item.quantity - 1}
          }
          return item
        })
        .filter(item => item.quantity > 0)

      return {cartList: updatedCartList}
    })
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App