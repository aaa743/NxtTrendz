import Header from '../Header'
import CartListView from '../CartListView'
import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'
import CartSummary from '../CartSummary'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      // వేరియబుల్ పేరు మార్చాను
      const isCartEmpty = cartList.length === 0

      const onClickRemoveAll = () => {
        removeAllCartItems()
      }

      return (
        <>
          <Header />
          <div className='cart-container'>
            {isCartEmpty ? (
              <EmptyCartView />
            ) : (
              <div className='cart-content-container'>
                <div className='cart-header'>
                  <h1 className='cart-heading'>My Cart</h1>
                  <button
                    type='button'
                    className='remove-all-btn'
                    onClick={onClickRemoveAll}
                  >
                    Remove All
                  </button>
                </div>
                <CartListView />
                <CartSummary />
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
