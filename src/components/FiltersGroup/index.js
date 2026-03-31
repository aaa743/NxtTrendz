import {BsSearch} from 'react-icons/bs'
import './index.css'

const FiltersGroup = props => {
  const renderSearchInputSection = () => {
    const {searchInput, changeSearchInput, enterSearchInput} = props

    const onKeyDownSearch = event => {
      if (event.key === 'Enter') {
        enterSearchInput()
      }
    }

    const onChangeSearch = event => {
      changeSearchInput(event.target.value)
    }

    return (
      <div className='search-input-container'>
        <input
          value={searchInput}
          type='search'
          className='search-input'
          placeholder='Search'
          onChange={onChangeSearch}
          onKeyDown={onKeyDownSearch}
        />
        <BsSearch className='search-icon' />
      </div>
    )
  }

  const renderCategoriesSection = () => {
    const {categoryOptions, activeCategoryId, changeCategory} = props

    return (
      <>
        <h1 className='category-heading'>Category</h1>
        <ul className='categories-list'>
          {categoryOptions.map(eachCategory => {
            const isActive = eachCategory.categoryId === activeCategoryId
            const categoryClassName = isActive
              ? 'category-name active-category-name'
              : 'category-name'

            const onClickCategory = () =>
              changeCategory(eachCategory.categoryId)

            return (
              <li
                className='category-item'
                key={eachCategory.categoryId}
                onClick={onClickCategory}
              >
                <p className={categoryClassName}>{eachCategory.name}</p>
              </li>
            )
          })}
        </ul>
      </>
    )
  }

  const renderRatingsSection = () => {
    const {ratingsList, activeRatingId, changeRating} = props

    return (
      <div className='ratings-filter-container'>
        <h1 className='rating-heading'>Rating</h1>
        <ul className='ratings-list'>
          {ratingsList.map(eachRating => {
            const isRatingActive = activeRatingId === eachRating.ratingId
            const ratingClassName = isRatingActive
              ? 'and-up active-rating'
              : 'and-up'

            const onClickRating = () => changeRating(eachRating.ratingId)

            return (
              <li
                className='rating-item'
                key={eachRating.ratingId}
                onClick={onClickRating}
              >
                <img
                  src={eachRating.imageUrl}
                  alt={`rating ${eachRating.ratingId}`}
                  className='rating-img'
                />
                <p className={ratingClassName}>& up</p>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  const {clearFilters} = props

  return (
    <div className='filters-group-container'>
      {renderSearchInputSection()}
      {renderCategoriesSection()}
      {renderRatingsSection()}
      <button
        type='button'
        className='clear-filters-btn'
        onClick={clearFilters}
      >
        Clear Filters
      </button>
    </div>
  )
}

export default FiltersGroup
