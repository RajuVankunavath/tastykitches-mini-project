import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'
import Carousel from '../Carousel'
import Footer from '../Footer'
import PopularRestaurants from '../PopularRestaurants'

import Header from '../Header'

import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <>
      <Header />
      <div className="home-container">
        <Carousel />
        <PopularRestaurants />
      </div>
      <Footer />
    </>
  )
}

export default Home
