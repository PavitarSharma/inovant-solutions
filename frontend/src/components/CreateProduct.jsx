import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [sku, setSku] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("http://localhost:5000/v1/products");
      setProducts(data.products);
    };
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = {
      name,
      price,
      sku,
      description,
    };

    images.forEach((image) => (formData.images = image));

    try {
      const res = await axios.post(
        "http://localhost:5000/v1/products",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setImageUrls(res.data.images);
      setProducts([...products, res.data]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleActive = async (id) => {
    try {
      const res = await axios.patch(`/api/products/${id}`, {
        active: !products.find((product) => product._id === id).active,
      });
      setProducts(
        products.map((product) =>
          product._id === id ? { ...product, active: res.data.active } : product
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="sku">SKU:</label>
          <input
            type="text"
            id="sku"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="images">Images:</label>
          <input
            type="file"
            id="images"
            multiple
            onChange={(e) => setImages(e.target.files)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <h2>Product List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>SKU</th>
            <th>Description</th>
            <th>Images</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.sku}</td>
              <td>{product.description}</td>
              <td>
                {product.images.map((image) => (
                  <img
                    key={image}
                    src={image}
                    alt={product.name}
                    style={{ width: "100px" }}
                  />
                ))}
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={product.active}
                  onChange={() => handleToggleActive(product._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CreateProduct;
