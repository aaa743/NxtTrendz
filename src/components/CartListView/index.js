import CartItem from '../CartItem'
import CartContext from '../../context/CartContext'

import './index.css'

const CartListView = () => (
  <CartContext.Consumer>
    {cartContextValue => {
      const {cartList} = cartContextValue

      return (
        <ul className="cart-list">
          {cartList.map(itemDetails => (
            <CartItem 
              key={itemDetails.id} 
              cartItemDetails={itemDetails} 
            />
          ))}
        </ul>
      )
    }}
  </CartContext.Consumer>
)

export default CartListView