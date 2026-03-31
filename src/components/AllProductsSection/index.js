import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

// Options list అలాగే ఉంచాలి (లేకపోతే టెస్ట్ కేసులు ఫెయిల్ అవుతాయి)
const categoryOptions = [
  {name: 'Clothing', categoryId: '1'},
  {name: 'Electronics', categoryId: '2'},
  {name: 'Appliances', categoryId: '3'},
  {name: 'Grocery', categoryId: '4'},
  {name: 'Toys', categoryId: '5'},
]

const sortbyOptions = [
  {optionId: 'PRICE_HIGH', displayText: 'Price (High-Low)'},
  {optionId: 'PRICE_LOW', displayText: 'Price (Low-High)'},
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AllProductsSection extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    productsList: [],
    activeOptionId: sortbyOptions[0].optionId,
    searchInput: '',
    activeCategoryId: '',
    activeRatingId: '',
  }

  componentDidMount() {
    this.fetchProductsData()
  }

  fetchProductsData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {activeOptionId, activeCategoryId, searchInput, activeRatingId} =
      this.state
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${activeCategoryId}&title_search=${searchInput}&rating=${activeRatingId}`
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const {products} = await response.json() // Destructuring మార్చాను
      const formattedData = products.map(eachItem => ({
        title: eachItem.title,
        brand: eachItem.brand,
        price: eachItem.price,
        id: eachItem.id,
        imageUrl: eachItem.image_url,
        rating: eachItem.rating,
      }))

      this.setState({
        productsList: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeSortByOption = selectedOptionId => {
    this.setState({activeOptionId: selectedOptionId}, this.fetchProductsData)
  }

  onResetFilters = () => {
    this.setState(
      {
        searchInput: '',
        activeCategoryId: '',
        activeRatingId: '',
      },
      this.fetchProductsData,
    )
  }

  onClickRating = ratingId => {
    this.setState({activeRatingId: ratingId}, this.fetchProductsData)
  }

  onClickCategory = categoryId => {
    this.setState({activeCategoryId: categoryId}, this.fetchProductsData)
  }

  onSearchKeyEnter = () => {
    this.fetchProductsData()
  }

  onChangeSearchText = text => {
    this.setState({searchInput: text})
  }

  renderProductsList = () => {
    const {productsList, activeOptionId} = this.state
    const hasProducts = productsList.length > 0

    return hasProducts ? (
      <div className='all-products-container'>
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={this.onChangeSortByOption}
        />
        <ul className='products-list'>
          {productsList.map(item => (
            <ProductCard productData={item} key={item.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className='no-products-view'>
        <img
          src='https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png'
          className='no-products-img'
          alt='no products'
        />
        <h1 className='no-products-heading'>No Products Found</h1>
        <p className='no-products-description'>
          We could not find any products. Try other filters.
        </p>
      </div>
    )
  }

  renderLoadingSpinner = () => (
    <div className='products-loader-container' data-testid='loader'>
      <Loader type='ThreeDots' color='#0b69ff' height='50' width='50' />
    </div>
  )

  renderFailureView = () => (
    <div className='products-error-view-container'>
      <img
        src='https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png'
        alt='all-products-error'
        className='products-failure-img'
      />
      <h1 className='product-failure-heading-text'>
        Oops! Something Went Wrong
      </h1>
      <p className='products-failure-description'>
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )

  renderContentBasedOnApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductsList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingSpinner()
      default:
        return null
    }
  }

  render() {
    const {activeCategoryId, searchInput, activeRatingId} = this.state

    return (
      <div className='all-products-section'>
        <FiltersGroup
          searchInput={searchInput}
          categoryOptions={categoryOptions}
          ratingsList={ratingsList}
          changeSearchInput={this.onChangeSearchText}
          enterSearchInput={this.onSearchKeyEnter}
          activeCategoryId={activeCategoryId}
          activeRatingId={activeRatingId}
          changeCategory={this.onClickCategory}
          changeRating={this.onClickRating}
          clearFilters={this.onResetFilters}
        />
        {this.renderContentBasedOnApiStatus()}
      </div>
    )
  }
}

export default AllProductsSection
