import { useEffect, useState, useContext } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaBox, FaShoppingBag, FaBars } from "react-icons/fa";
import Swal from "sweetalert2";
import CartContext from "./CartContext";
import axios from "axios";



function Home() {

  const [product, setProduct] = useState([]);            //loading the product details from database
  
  const { counts, setCounts, selectedSize, setSelectedSize } = useContext(CartContext);

  useEffect(() => {
    axios.get("http://localhost:8080/ReactProj/ViewProducts")
      .then((res) => {
        //console.log(res.data);
        setProduct(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const nav = useNavigate();
 

  const navtoLogin = () => {
    nav('/')
  }

  const wishlistmsg = () => {
    Swal.fire({
      title: "Added to your wishlist",
      icon: "info",
      confirmButtonText: "Browse more",
      confirmButtonColor: "green"
    }).then(() => {
      nav('/Home');
    });
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

  // const count = counts[item.id] || 0;

  const handleAddCart = (id) => {

    const sizeSelected = selectedSize[id];

    if(!sizeSelected){
      Swal.fire({
      title: "Please select a size before adding to cart!",
      icon: "warning",
      confirmButtonText: "Ok!",
      confirmButtonColor: "red"
    });
    return;
    }
    Swal.fire({
      title: "Added to your cart",
      icon: "info",
      confirmButtonText: "Looks great!",
      confirmButtonColor: "green"
    }).then(() => {
      setCounts({ ...counts, [id]: 1 })
      setSelectedSize({ ...selectedSize, [id]: selectedSize[id] });
      // nav('/Home');
    });
  }

  const handleIncreaseCart = (id) => {
    setCounts({ ...counts, [id]: counts[id] + 1 })      
  }

  const handleDecreaseCart = (id) => {
    const newCount = counts[id] - 1;

    if (newCount <= 0) {
      const { [id]: _, ...rest } = counts;
      setCounts(rest)
    } else {
      setCounts({ ...counts, [id]: newCount })
    }
  }

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
                <a className="nav-link" onClick={() => nav('/Cart')} style={{cursor:'pointer'}}><FaShoppingCart /> Cart</a>
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

      <div className="container mt-5">
        <div className="row g-4">
          
          {product.map((item) => (

            // const quant = counts[item.id];

            <div key={item.product_id} className="col-md-2 col-sm-6 card-cs">
              <div className="card h-100 text-center border border-dark shadow-sm">
                <img
                  src={item.product_image_url}
                  className="card-img-top"
                  alt={item.product_name}
                  style={{ height: "300px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.product_name}</h5>
                  <p className="card-text text-muted">{item.product_brand}</p>
                  <p className="fw-bold">₹{item.product_price}</p>
                  <div className="mb-3">
                    <select
                      className="form-select size-box"
                      value={selectedSize[item.product_id] || ""}
                      onChange={(e) =>
                        setSelectedSize({ ...selectedSize, [item.product_id]: e.target.value })
                      }>
                      <option value="">Size</option>
                      {item.product_size && item.product_size.split(",").map((sizeValue) => (
                        <option key={sizeValue.trim()} value={sizeValue.trim()}>
                          {sizeValue.trim()}
                        </option>
                      ))}
                    </select>
                  </div>

                  {(counts[item.product_id] || 0) === 0 ? (
                    <button className="btn btn-primary btn-sm me-2" onClick={() => handleAddCart(item.product_id)}>
                      Add to Cart
                    </button>
                  ) : (
                    <div>
                      <button className="btn btn-outline-secondary btn-sm quantity-button" onClick={() => handleDecreaseCart(item.product_id)}>-</button>
                      <span className="quantity">{counts[item.product_id] || 0}</span>
                      <button className="btn btn-outline-secondary btn-sm quantity-button" onClick={() => handleIncreaseCart(item.product_id)}>+</button>
                    </div>
                  )}
                  <button className="btn btn-outline-danger btn-sm" onClick={wishlistmsg}>
                    <i className="bi bi-heart"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        
        </div>
      </div>
      <footer>
        <div className="footer-container">
          <p>&copy; 2025 All rights reserved Prithviraj Enterprises.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;