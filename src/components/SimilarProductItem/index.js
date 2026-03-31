import './index.css'

const SimilarProductItem = props => {
  const {productDetails} = props
  // డిస్ట్రక్చరింగ్ ఆర్డర్ మార్చాను
  const {imageUrl, title, brand, price, rating} = productDetails

  const starUrl = 'https://assets.ccbp.in/frontend/react-js/star-img.png'

  return (
    <li className="similar-product-item">
      <img
        src={imageUrl}
        className="similar-product-img"
        alt="similar product"
      />
      <p className="similar-product-title">{title}</p>
      <p className="similar-products-brand">by {brand}</p>
      
      <div className="similar-product-price-rating-container">
        <p className="similar-product-price">Rs {price}/-</p>
        <div className="similar-product-rating-container">
          <p className="similar-product-rating">{rating}</p>
          <img
            src={starUrl}
            alt="star"
            className="similar-product-star"
          />
        </div>
      </div>
    </li>
  )
}

export default SimilarProductItem