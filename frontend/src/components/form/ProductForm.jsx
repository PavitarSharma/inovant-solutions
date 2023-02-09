
import "./ProductForm.css";

const ProductForm = ({ values }) => {
  const {
    name,
    setName,
    sku,
    setSku,
    description,
    setDescription,
    price,
    setPrice,
    imageHandler,
    handleOnSubmit,
    errors,
  } = values;

  return (
    <div className="product_form">
      <h2>Add Product</h2>
      <form onSubmit={handleOnSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            name="name"
            id="name"
            // required
          />
          <p>{errors.name ? errors.name : null}</p>
        </div>
        <div className="form-group">
          <label htmlFor="price">Product Price</label>
          <input
            type="text"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            name="price"
            id="price"
            // required
          />
          <p>{errors.price ? errors.price : null}</p>
        </div>
        <div className="form-group">
          <label htmlFor="sku">Product SKU</label>
          <input
            type="text"
            value={sku}
            onChange={(event) => setSku(event.target.value)}
            name="sku"
            id="sku"
            // required
          />
          <p>{errors.sku ? errors.sku : null}</p>
        </div>
        <div className="form-group">
          <label htmlFor="description">Product Description</label>
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="5"
            // required
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          ></textarea>
          <p>{errors.description ? errors.description : null}</p>
        </div>
        <div className="form-group">
          <label htmlFor="images">Product Image</label>
          <input type="file" id="images" multiple onChange={imageHandler} />
          <p>{errors.images ? errors.images : null}</p>
        </div>

        <div>
          <button type="submit">Add product</button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
