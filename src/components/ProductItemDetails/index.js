import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'

import CartContext from '../../context/CartContext'
import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'

import './index.css'

const apiStatusOptions = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class ProductItemDetails extends Component {
  state = {
    productInfo: {},
    relatedProducts: [],
    apiStatus: apiStatusOptions.initial,
    itemQuantity: 1,
  }

  componentDidMount() {
    this.getProductItemInfo()
  }

  formatProductData = data => ({
    availability: data.availability,
    brand: data.brand,
    description: data.description,
    id: data.id,
    imageUrl: data.image_url,
    price: data.price,
    rating: data.rating,
    title: data.title,
    totalReviews: data.total_reviews,
  })

  getProductItemInfo = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({apiStatus: apiStatusOptions.loading})
    
    const token = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/products/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedProduct = this.formatProductData(data)
      const updatedRelatedProducts = data.similar_products.map(item => 
        this.formatProductData(item)
      )
      
      this.setState({
        productInfo: updatedProduct,
        relatedProducts: updatedRelatedProducts,
        apiStatus: apiStatusOptions.success,
      })
    } else if (response.status === 404) {
      this.setState({apiStatus: apiStatusOptions.failure})
    }
  }

  onDecreaseQuantity = () => {
    const {itemQuantity} = this.state
    if (itemQuantity > 1) {
      this.setState(prevState => ({itemQuantity: prevState.itemQuantity - 1}))
    }
  }

  onIncreaseQuantity = () => {
    this.setState(prevState => ({itemQuantity: prevState.itemQuantity + 1}))
  }

  renderSuccessView = () => (
    <CartContext.Consumer>
      {cartValue => {
        const {productInfo, itemQuantity, relatedProducts} = this.state
        const {addCartItem} = cartValue
        
        const {
          availability, brand, description, imageUrl, price, rating, title, totalReviews
        } = productInfo

        const onAddToCartClick = () => {
          addCartItem({...productInfo, quantity: itemQuantity})
        }

        return (
          <div className="product-details-success-view">
            <div className="product-details-container">
              <img src={imageUrl} alt="product" className="product-image" />
              <div className="product">
                <h1 className="product-name">{title}</h1>
                <p className="price-details">Rs {price}/-</p>
                <div className="rating-and-reviews-count">
                  <div className="rating-container">
                    <p className="rating">{rating}</p>
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                      alt="star"
                      className="star"
                    />
                  </div>
                  <p className="reviews-count">{totalReviews} Reviews</p>
                </div>
                <p className="product-description">{description}</p>
                <div className="label-value-container">
                  <p className="label">Available:</p>
                  <p className="value">{availability}</p>
                </div>
                <div className="label-value-container">
                  <p className="label">Brand:</p>
                  <p className="value">{brand}</p>
                </div>
                <hr className="horizontal-line" />
                <div className="quantity-container">
                  <button
                    type="button"
                    className="quantity-controller-button"
                    onClick={this.onDecreaseQuantity}
                    data-testid="minus"
                  >
                    <BsDashSquare className="quantity-controller-icon" />
                  </button>
                  <p className="quantity">{itemQuantity}</p>
                  <button
                    type="button"
                    className="quantity-controller-button"
                    onClick={this.onIncreaseQuantity}
                    data-testid="plus"
                  >
                    <BsPlusSquare className="quantity-controller-icon" />
                  </button>
                </div>
                <button
                  type="button"
                  className="button add-to-cart-btn"
                  onClick={onAddToCartClick}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
            <h1 className="similar-products-heading">Similar Products</h1>
            <ul className="similar-products-list">
              {relatedProducts.map(eachItem => (
                <SimilarProductItem productDetails={eachItem} key={eachItem.id} />
              ))}
            </ul>
          </div>
        )
      }}
    </CartContext.Consumer>
  )

  renderFailureView = () => (
    <div className="product-details-error-view-container">
      <img
        alt="error view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        className="error-view-image"
      />
      <h1 className="product-not-found-heading">Product Not Found</h1>
      <Link to="/products">
        <button type="button" className="button">Continue Shopping</button>
      </Link>
    </div>
  )

  renderLoaderView = () => (
    <div className="products-details-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderResult = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusOptions.success:
        return this.renderSuccessView()
      case apiStatusOptions.failure:
        return this.renderFailureView()
      case apiStatusOptions.loading:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="product-item-details-container">
          {this.renderResult()}
        </div>
      </>
    )
  }
}

export default ProductItemDetails