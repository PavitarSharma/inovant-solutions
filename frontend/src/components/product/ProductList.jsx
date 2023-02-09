import axios from "axios";
import FormatPrice from "../../utils/PriceFormat";
import "./ProductList.css";

const ProductList = ({ products, setProducts }) => {
  const handleToggleActive = async (id) => {
    try {
      const res = await axios.patch(`https://inovant-solutions-backend.onrender.com/v1/products/${id}`, {
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

  // console.log(products[0].images[0].url);
  return (
    // <div className="product_grid">
    //   {products &&
    //     products.map((product) => {
    //     console.log(product);
    //       return (
    //         <div className="product_card" key={product._id}>
    //           <div className="product_image">
    //             <img
    //               src={`http://localhost:5000/images/products/63e4d062f58b23bab623d8ac/1675939938496.jpg`}
    //               alt={product.name}
    //             />
    //           </div>
    //           <div className="product_body">
    //             <h5>{product.name}</h5>
    //             <h6>{product.sku}</h6>
    //             <p className="product_price">₹{product.price}</p>
    //             <p className="product_des">{product.description}</p>
    //             <div>
    //               <button>Read More</button>
    //             </div>
    //           </div>
    //         </div>
    //       );
    //     })}
    // </div>
    <div className="table__body">
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
          {products &&
            products?.map((product) => {
              return (
                <tr key={product._id}>
                  <td className="product_name">{product.name}</td>
                  <td className="product_price">{<FormatPrice price={product.price} />}</td>
                  <td className="product_sku">{product.sku}</td>
                  <td className="product_des">{product.description}</td>
                  <td>
                    <div className="table_image">
                      {product?.images.map((image, index) => (
                        <img
                          key={index}
                          src={image.url}
                          alt={product.name}
                          className="product_image"
                        />
                      ))}
                    </div>
                  </td>
                  <td>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={product.active}
                        onChange={() => handleToggleActive(product._id)}
                      />
                      <span className="slider round"></span>
                    </label>
                    {/* <input
                      type="checkbox"
                      checked={product.active}
                      onChange={() => handleToggleActive(product._id)}
                    /> */}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
