import {BsFilterRight} from 'react-icons/bs'
import './index.css'

const ProductsHeader = props => {
  const {sortbyOptions, activeOptionId, changeSortby} = props

  const onSelectSortBy = event => {
    changeSortby(event.target.value)
  }

  return (
    <div className="products-header">
      <h1 className="products-list-heading">All Products</h1>
      <div className="sort-by-container">
        <BsFilterRight className="sort-by-icon" />
        <p className="sort-by">Sort by</p>
        <select
          className="sort-by-select"
          value={activeOptionId}
          onChange={onSelectSortBy}
        >
          {sortbyOptions.map(option => (
            <option
              key={option.optionId}
              value={option.optionId}
              className="select-option"
            >
              {option.displayText}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default ProductsHeader