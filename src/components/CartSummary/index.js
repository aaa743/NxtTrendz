import Popup from 'reactjs-popup'
import Payment from '../Payment'
import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {cartContextValue => {
      const {cartList} = cartContextValue

      const totalItemsCount = cartList.length

      const totalOrderAmount = cartList.reduce(
        (accumulator, eachItem) =>
          accumulator + eachItem.quantity * eachItem.price,
        0,
      )

      return (
        <div className='cart-summary-container'>
          <div className='cart-summary-card'>
            <h1 className='cart-items-total-price'>
              Order Total:{' '}
              <span className='order-price-value'>RS {totalOrderAmount}/-</span>
            </h1>
            <p className='cart-items-count'>{totalItemsCount} Items in cart</p>

            <Popup
              modal
              trigger={
                <button className='checkout-btn' type='button'>
                  Checkout
                </button>
              }
            >
              {close => (
                <div className='popup-wrapper'>
                  <Payment close={close} />
                </div>
              )}
            </Popup>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
