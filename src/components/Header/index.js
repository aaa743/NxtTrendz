import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import CartContext from '../../context/CartContext'

import './index.css'

const Header = props => {
  // Logout లాజిక్
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  // కార్ట్ కౌంట్ బ్యాడ్జ్ రెండరింగ్
  const renderCartCount = () => (
    <CartContext.Consumer>
      {cartValue => {
        const {cartList} = cartValue
        const itemsInCart = cartList.length

        return (
          <>
            {itemsInCart > 0 && (
              <span className="cart-count-badge">{itemsInCart}</span>
            )}
          </>
        )
      }}
    </CartContext.Consumer>
  )

  const logoUrl = 'https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png'

  return (
    <nav className="nav-header">
      <div className="nav-content">
        {/* మొబైల్ వ్యూ లోగో మరియు లాగౌట్ */}
        <div className="nav-bar-mobile-logo-container">
          <Link to="/">
            <img
              className="website-logo"
              src={logoUrl}
              alt="website logo"
            />
          </Link>

          <button
            type="button"
            className="nav-mobile-btn"
            onClick={onLogout}
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
              alt="nav logout"
              className="nav-bar-img"
            />
          </button>
        </div>

        {/* డెస్క్‌టాప్ వ్యూ కంటైనర్ */}
        <div className="nav-bar-large-container">
          <Link to="/">
            <img
              className="website-logo"
              src={logoUrl}
              alt="website logo"
            />
          </Link>
          <ul className="nav-menu">
            <li className="nav-menu-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>

            <li className="nav-menu-item">
              <Link to="/products" className="nav-link">Products</Link>
            </li>

            <li className="nav-menu-item">
              <Link to="/cart" className="nav-link">
                Cart
                {renderCartCount()}
              </Link>
            </li>
          </ul>
          <button
            type="button"
            className="logout-desktop-btn"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {/* మొబైల్ బాటమ్ నావిగేషన్ మెనూ */}
      <div className="nav-menu-mobile">
        <ul className="nav-menu-list-mobile">
          <li className="nav-menu-item-mobile">
            <Link to="/" className="nav-link">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-icon.png"
                alt="nav home"
                className="nav-bar-img"
              />
            </Link>
          </li>

          <li className="nav-menu-item-mobile">
            <Link to="/products" className="nav-link">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-products-icon.png"
                alt="nav products"
                className="nav-bar-img"
              />
            </Link>
          </li>
          <li className="nav-menu-item-mobile">
            <Link to="/cart" className="nav-link">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-icon.png"
                alt="nav cart"
                className="nav-bar-img"
              />
              {renderCartCount()}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(Header)