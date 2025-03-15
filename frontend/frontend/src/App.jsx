import { useState, useEffect } from "react";
import "./index.css";

export default function App() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", image: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ username: "", password: "" });
  const [editProduct, setEditProduct] = useState(null);

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products"); // Relative URL for the API
      const data = await res.json();
      setProducts(data.data); // Data structure based on your backend response
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    if (user.username === "admin" && user.password === "password") {
      setIsLoggedIn(true);
    } else {
      alert("Invalid credentials! Use admin/password.");
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser({ username: "", password: "" });
  };

  // Add Product
  const addProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.image) return;

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (res.ok) {
        fetchProducts();
        setNewProduct({ name: "", price: "", image: "" });
      } else {
        const data = await res.json();
        alert(data.message || "Failed to add product.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // Remove Product
  const removeProduct = async (id) => {
    await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });
    fetchProducts();
  };

  // Edit Product
  const saveEdit = async () => {
    await fetch(`/api/products/${editProduct._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editProduct),
    });
    fetchProducts();
    setEditProduct(null);
  };

  return (
    <div className="container">
      <nav className="navbar">
        <h2 className="logo">Tech Store</h2>
        <div className="nav-links">
          {isLoggedIn ? (
            <>
              <a href="#">Home</a>
              <a href="#">Products</a>
              <a href="#">About</a>
              <a href="#">Contact</a>
              <button className="btn logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <a href="#">Login</a>
          )}
        </div>
      </nav>

      {!isLoggedIn ? (
        <div className="login-page">
          <h2 className="title">Login</h2>
          <form className="login-form" onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <button type="submit" className="btn login-btn">
              Login
            </button>
          </form>
        </div>
      ) : (
        <>
          <div className="page">
            <h2 className="title">Available Products</h2>
            <div className="products">
              {products.map((product) => (
                <div key={product._id} className="product-card">
                  {editProduct?._id === product._id ? (
                    <>
                      <input
                        type="text"
                        value={editProduct.name}
                        onChange={(e) =>
                          setEditProduct({ ...editProduct, name: e.target.value })
                        }
                      />
                      <input
                        type="number"
                        value={editProduct.price}
                        onChange={(e) =>
                          setEditProduct({ ...editProduct, price: e.target.value })
                        }
                      />
                      <input
                        type="text"
                        value={editProduct.image}
                        onChange={(e) =>
                          setEditProduct({ ...editProduct, image: e.target.value })
                        }
                      />
                      <button className="btn save-btn" onClick={saveEdit}>
                        Save
                      </button>
                    </>
                  ) : (
                    <>
                      <h3>{product.name}</h3>
                      <p>
                        Price: <span className="price">${product.price}</span>
                      </p>
                      <img src={product.image} alt={product.name} />
                      <button className="btn buy-btn">Buy Now</button>
                      <button
                        className="btn edit-btn"
                        onClick={() => setEditProduct(product)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn remove-btn"
                        onClick={() => removeProduct(product._id)}
                      >
                        Remove
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="add-product">
            <h2 className="title">Add a New Product</h2>
            <form className="product-form" onSubmit={addProduct}>
              <input
                type="text"
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Price"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Image URL"
                value={newProduct.image}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, image: e.target.value })
                }
              />
              <button type="submit" className="btn add-btn">
                Add Product
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
