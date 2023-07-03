import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'

import RestaurantBanner from '../RestaurantBanner'
import Header from '../Header'
import Footer from '../Footer'
import FoodItemCard from '../FoodItemCard'
import './index.css'

class RestaurantDetails extends Component {
  state = {
    restaurantData: {},
    foodItemsList: [],
    isLoading: false,
    searchFoodItems: '',
  }

  componentDidMount() {
    this.getRestaurantData()
  }

  getRestaurantData = async () => {
    this.setState({isLoading: true})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/restaurants-list/${id}`
    const option = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, option)
    const data = await response.json()
    const restaurantData = {
      costForTwo: data.cost_for_two,
      cuisine: data.cuisine,
      foodItems: data.food_items,
      id: data.id,
      imageUrl: data.image_url,
      itemsCount: data.items_count,
      location: data.location,
      name: data.name,
      opensAt: data.opens_at,
      rating: data.rating,
      reviewsCount: data.reviews_count,
    }
    const foodItems = data.food_items.map(eachFoodItem => ({
      cost: eachFoodItem.cost,
      foodType: eachFoodItem.food_type,
      id: eachFoodItem.id,
      imageUrl: eachFoodItem.image_url,
      name: eachFoodItem.name,
      rating: eachFoodItem.rating,
    }))
    this.setState({
      restaurantData,
      foodItemsList: foodItems,
      isLoading: false,
    })
  }

  onChangeFilterFoodItems = event => {
    // const {searchFoodItems} = this.state
    this.setState({searchFoodItems: event.target.value})
  }

  renderRestaurantDetails = () => {
    const {restaurantData, foodItemsList, searchFoodItems} = this.state

    const filteredFoodItems = foodItemsList.filter(eachItem =>
      eachItem.name.toLowerCase().includes(searchFoodItems.toLowerCase()),
    )
    console.log(filteredFoodItems.length)

    return (
      <>
        <RestaurantBanner restaurantData={restaurantData} />
        <div className="food-items-card-container">
          <div className="search-item-container">
            <BsSearch size={20} />
            <input
              value={searchFoodItems}
              className="search-input-item"
              type="search"
              placeholder="Search food items "
              onChange={this.onChangeFilterFoodItems}
            />
          </div>
          {filteredFoodItems.length === 0 ? (
            <div className="not-found-item-container">
              <img
                src="https://res.cloudinary.com/dxdhyib3l/image/upload/v1688282477/cooking_1_pjpwnd.png"
                className="not-found-item-image"
                alt="not found"
              />
              <h1 className="not-find-item-heading">Not Found</h1>
            </div>
          ) : (
            <ul className="food-items-list">
              {filteredFoodItems.map(eachItems => (
                <FoodItemCard foodItem={eachItems} key={eachItems.id} />
              ))}
            </ul>
          )}
        </div>
      </>
    )
  }

  renderLoading = () => (
    <div className="restaurant-loader" testid="restaurant-details-loader">
      <Loader type="ThreeDots" color="#F7931E" height={50} width={50} />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return (
      <>
        <Header />

        {isLoading ? this.renderLoading() : this.renderRestaurantDetails()}

        <Footer />
      </>
    )
  }
}

export default RestaurantDetails
