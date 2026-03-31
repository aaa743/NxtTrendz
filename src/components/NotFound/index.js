import './index.css'

const NotFound = () => {
  const notFoundImageUrl =
    'https://assets.ccbp.in/frontend/react-js/not-found-blog-img.png'

  return (
    <div className='not-found-container'>
      <img src={notFoundImageUrl} alt='not found' className='not-found-img' />
    </div>
  )
}

export default NotFound
