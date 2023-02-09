import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductForm from "../../components/form/ProductForm";
import ProductList from "../../components/product/ProductList";

const Home = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [sku, setSku] = useState("");
  const [images, setImages] = useState([]);
  const [productFiles, setProductFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [imageUrls, setImageUrls] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("https://inovant-solutions-backend.onrender.com/v1/products");
      setProducts(data.products);
    };
    fetchProducts();
  }, []);

  const imageHandler = (event) => {
    const files = Array.from(event.target.files);
    setProductFiles(event.target.files);
    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const validateData = () => {
    let errors = {};

    if (!name) {
      errors.name = "Product name is requitred";
    }

    if (!price) {
      errors.price = "Product price is required";
    }

    if (!description) {
      errors.description = "Product description is required";
    }

    if (!sku) {
      errors.sku = "Product sku is required";
    }

    if (images.length < 1) {
      errors.images = "Product image is required";
    }

    return errors;
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const errors = validateData();

    if (Object.keys(errors).length) {
      setErrors(errors);
      return;
    }
    setErrors({});

    try {
      let formData = {
        name,
        price,
        sku,
        description,
      };

      Object.keys(productFiles).forEach((key) => {
        formData[productFiles.item(key).name] = productFiles.item(key);
      });

      const response = await axios.post(
        `https://inovant-solutions-backend.onrender.com/v1/products`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setImageUrls(response.data.images);
      setProducts([...products, response.data.product]);
      setName("");
      setDescription("");
      setPrice("");
      setImages([]);
      setProductFiles([])
      setSku("");
      return response.data;
    } catch (error) {
      console.log(error.message);
    }

   
  };

  const values = {
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
    images,
    setImages,
    errors
  }

  return (
    <div>
      <ProductForm values={values} />
      <ProductList products={products} setProducts={setProducts} />
    </div>
  );
};

export default Home;
