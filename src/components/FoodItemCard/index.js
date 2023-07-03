import {Component} from 'react'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {ImStarFull} from 'react-icons/im'
import {FaRupeeSign} from 'react-icons/fa'

import CartContext from '../../context/CartContext'

import './index.css'

class FoodItemCard extends Component {
  state = {quantity: 0}

  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {
            addCartItem,
            incrementCartItemQuantity,
            decrementCartItemQuantity,
          } = value

          const {foodItem} = this.props
          const {id, name, imageUrl, cost, rating} = foodItem
          const {quantity} = this.state

          const onClickAdd = () => {
            this.setState(
              preState => ({quantity: preState.quantity + 1}),
              addCartItem({...foodItem, quantity: quantity + 1}),
            )
          }

          const onDecrementQuantity = () => {
            this.setState(preState => ({quantity: preState.quantity - 1}))
            decrementCartItemQuantity(id)
          }

          const onIncreaseQuantity = () => {
            this.setState(preState => ({quantity: preState.quantity + 1}))
            incrementCartItemQuantity(id)
          }

          return (
            <li className="foodItem" testid="foodItem">
              <img src={imageUrl} className="food-item-image" alt="food item" />
              <div className="food-item-info">
                <h1 className="food-item-name">{name}</h1>
                <div className="cost-cont">
                  <FaRupeeSign size={16} color="#334155" />
                  <p className="food-item-cost">{cost}</p>
                </div>
                <div className="rating-cont">
                  <ImStarFull size={16} color="#FFCC00" />
                  <p className="food-item-rating">{rating}</p>
                </div>
                {quantity === 0 ? (
                  <button
                    className="add-btn"
                    type="button"
                    onClick={onClickAdd}
                  >
                    Add
                  </button>
                ) : (
                  <div className="cart-btn-qty-cont">
                    <button
                      className="decrement-count"
                      testid="decrement-count"
                      type="button"
                      onClick={onDecrementQuantity}
                    >
                      <BsDashSquare className="icon-btn" />
                    </button>
                    <p testid="active-count" className="active-count">
                      {quantity}
                    </p>
                    <button
                      testid="increment-count"
                      type="button"
                      className="increment-count"
                      onClick={onIncreaseQuantity}
                    >
                      <BsPlusSquare className="icon-btn" />
                    </button>
                  </div>
                )}
              </div>
            </li>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default FoodItemCard
