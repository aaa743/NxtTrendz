import {useContext, useState} from 'react'
import CartContext from '../../context/CartContext'

import './index.css'

const paymentOptionsList = [
  {id: 'CARD', displayText: 'Card', isDisabled: true},
  {id: 'NET BANKING', displayText: 'Net Banking', isDisabled: true},
  {id: 'UPI', displayText: 'UPI', isDisabled: true},
  {id: 'WALLET', displayText: 'Wallet', isDisabled: true},
  {id: 'CASH ON DELIVERY', displayText: 'Cash on Delivery', isDisabled: false},
]

const Payment = () => {
  const {cartList} = useContext(CartContext)

  const [paymentMethod, setPaymentMethod] = useState('')
  const [isOrderPlaced, setIsOrderPlaced] = useState(false)

  const onUpdatePaymentMethod = event => {
    setPaymentMethod(event.target.id)
  }

  const onClickConfirmOrder = () => setIsOrderPlaced(true)

  const calculateTotalAmount = () =>
    cartList.reduce((acc, item) => acc + item.quantity * item.price, 0)

  const renderPaymentMethods = () => (
    <ul className='payment-method-inputs'>
      {paymentOptionsList.map(method => {
        const labelClass = method.isDisabled ? 'disabled-label' : ''

        return (
          <li key={method.id} className='payment-method-input-container'>
            <input
              className='payment-method-input'
              id={method.id}
              type='radio'
              name='paymentMethod'
              disabled={method.isDisabled}
              onChange={onUpdatePaymentMethod}
            />
            <label
              className={`payment-method-label ${labelClass}`}
              htmlFor={method.id}
            >
              {method.displayText}
            </label>
          </li>
        )
      })}
    </ul>
  )

  const totalAmount = calculateTotalAmount()
  const cartItemsCount = cartList.length

  return (
    <div className='payments-container'>
      {isOrderPlaced ? (
        <p className='success-message'>
          Your order has been placed successfully
        </p>
      ) : (
        <>
          <h1 className='payments-heading'>Payment Details</h1>
          <p className='payments-sub-heading'>Payment Method</p>
          {renderPaymentMethods()}
          <div className='order-details'>
            <p className='payments-sub-heading'>Order details:</p>
            <p>Quantity: {cartItemsCount}</p>
            <p>Total Price: RS {totalAmount}/-</p>
          </div>
          <button
            disabled={paymentMethod === ''}
            type='button'
            className='confirm-order-button'
            onClick={onClickConfirmOrder}
          >
            Confirm Order
          </button>
        </>
      )}
    </div>
  )
}

export default Payment
