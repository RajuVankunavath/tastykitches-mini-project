import {Link} from 'react-router-dom'

import './index.css'

const EmptyCartView = () => (
  <div className="empty-cart-container">
    <img
      src="https://res.cloudinary.com/dkobk5oao/image/upload/v1633691028/cooking_1_qled9u.png"
      className="empty-cart-image"
      alt="empty cart"
    />
    <h1 className="no-order-heading">No Order Yet!</h1>
    <p className="no-order-text">
      Your cart is empty. Add something from the menu.
    </p>
    <Link to="/">
      <button className="order-btn" type="button">
        Order Now
      </button>
    </Link>
  </div>
)

export default EmptyCartView
