import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import ProductCard from '../ProductCard'
import './index.css'

const apiStatusState = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class PrimeDealsSection extends Component {
  state = {
    primeDealsData: [],
    status: apiStatusState.initial,
  }

  componentDidMount() {
    this.fetchPrimeDeals()
  }

  fetchPrimeDeals = async () => {
    this.setState({
      status: apiStatusState.inProgress,
    })

    const token = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/prime-deals'

    const requestOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const apiResponse = await fetch(apiUrl, requestOptions)

    if (apiResponse.ok) {
      const data = await apiResponse.json()
      const formattedData = data.prime_deals.map(eachProduct => ({
        title: eachProduct.title,
        brand: eachProduct.brand,
        price: eachProduct.price,
        id: eachProduct.id,
        imageUrl: eachProduct.image_url,
        rating: eachProduct.rating,
      }))

      this.setState({
        primeDealsData: formattedData,
        status: apiStatusState.success,
      })
    } else if (apiResponse.status === 401) {
      this.setState({
        status: apiStatusState.failure,
      })
    }
  }

  renderSuccessView = () => {
    const {primeDealsData} = this.state
    return (
      <div className='prime-deals-list-container'>
        <h1 className='primedeals-list-heading'>Exclusive Prime Deals</h1>
        <ul className='products-list'>
          {primeDealsData.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => (
    <img
      src='https://assets.ccbp.in/frontend/react-js/exclusive-deals-banner-img.png'
      alt='register prime'
      className='register-prime-img'
    />
  )

  renderLoaderView = () => (
    <div className='primedeals-loader-container'>
      <Loader type='ThreeDots' color='#0b69ff' height='50' width='50' />
    </div>
  )

  render() {
    const {status} = this.state

    switch (status) {
      case apiStatusState.success:
        return this.renderSuccessView()
      case apiStatusState.failure:
        return this.renderFailureView()
      case apiStatusState.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }
}

export default PrimeDealsSection
