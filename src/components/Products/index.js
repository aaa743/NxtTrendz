import Header from '../Header'
import PrimeDealsSection from '../PrimeDealsSection'
import AllProductsSection from '../AllProductsSection'

import './index.css'

const Products = () => {
  return (
    <>
      <Header />
      <div className="product-sections">
        <section className="prime-deals-wrapper">
          <PrimeDealsSection />
        </section>
        <section className="all-products-wrapper">
          <AllProductsSection />
        </section>
      </div>
    </>
  )
}

export default Products