
import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaBox, FaShoppingBag, FaBars } from "react-icons/fa";
import Swal from "sweetalert2";
import CartContext from "./CartContext";

function Cart() {

  const nav = useNavigate();

  const navtoLogin = () => {
    nav('/')
  }

  const checkout = () => {
    Swal.fire({
      title: "Checkedout Successfully",
      text: "Waiting for payment...",
      icon: "info",
      confirmButtonText: "Proceed",
      confirmButtonColor: "green"
    })
  }


  const { counts, setCounts, selectedSize, setSelectedSize } = useContext(CartContext);     //accessing the context data which is parsed from home using useContext

  console.log(counts, selectedSize);

  const [products, setProducts] = useState([]);            //loading the product details from json file(product.json)

  useEffect(() => {
    fetch("/data/product.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.log(error));
  }, []);


  const cartItems = products.filter(item => counts[item.id]);            //filter function to take only selected items

  const totalprice = cartItems.reduce(                                    //reduce function to calculated total price 
    (total, item) => total + item.price * counts[item.id], 0)

  return (
    <div className="home-img">
      <header>
        <div className="header-container">
          <h2>E-commerce Football Shoes</h2>
        </div>


        <nav className="navbar navbar-expand-lg nav-cs">
          <div className="container-fluid">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/Home"><FaBars /> Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#"><FaBox /> Your orders</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={() => nav('/Cart')} style={{ cursor: 'pointer' }}><FaShoppingCart /> Cart</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#"><FaHeart /> Wishlist</a>
              </li>
              <li>
                <button className="checkout-button btn btn-primary" onClick={checkout}>Checkout <FaShoppingBag /></button>
              </li>
              <li>
                <button className="logout-button btn btn-danger" onClick={navtoLogin}>Logout <i className="bi bi-box-arrow-right"></i></button>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <h2 className="text-center">Your Cart</h2>
      <div>
        {cartItems.length === 0 ? (
          <p>No items added yet.</p>
        ) : (
          <>
            {cartItems.map((item, index) => (
              <div key={item.id}>
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Image</th>
                      <th scope="col">Name</th>
                      <th scope="col">Size</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>
                        <img
                          src={item.image_url}
                          className="card-img-top"
                          alt={item.name}
                          style={{ width: "150px", objectFit: "cover" }}
                        />
                      </td>
                      <td>
                        <h5>{item.name}</h5>
                      </td>
                      <td>
                        <p>Size: {selectedSize[item.id]}</p>
                      </td>
                      <td>
                        <p>Quantity: {counts[item.id]}</p>
                      </td>
                      <td>
                        <p>Price: ₹{item.price * counts[item.id]}</p>
                      </td>
                    </tr>
                  </tbody>

                </table>
              </div>
            ))}
            <div>
              <p style={{ textAlign: "right" }}>Total Price: ₹{totalprice}</p>
            </div>
          </>
        )}
      </div>
      <footer>
        <div className="footer-container">
          <p>&copy; 2025 All rights reserved Prithviraj Enterprises.</p>
        </div>
      </footer>
    </div>
  )
}

export default Cart;