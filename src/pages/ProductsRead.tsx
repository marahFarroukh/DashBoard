import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  price: string; // أو number حسب الحاجة
  image_url: string;
}


const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [done, setDone] = useState<boolean>(false);
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("user") || "{}")?.token;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://vica.website/api/items", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [done, token]); // إضافة `token` إلى قائمة الاعتماديات

  const createProducts = () => {
    navigate("/create");
  };

  const updateProducts = (id: number) => {
    navigate(`/update/${id}`);
  };

  const showProducts = (id: number) => {
    navigate(`/show/${id}`);
  };

  const deleteProducts = async (id: number) => {
    try {
      await axios.delete(`https://vica.website/api/items/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDone(!done); // Toggle done state to refresh products
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // عرض رسالة تحميل أثناء الانتظار
  }

  return (
    <div>
      <h1>Products</h1>
      <button onClick={createProducts}>Create Product</button>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <img src={product.image_url} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.price}</p>
            <button onClick={() => updateProducts(product.id)}>Update</button>
            <button onClick={() => showProducts(product.id)}>Show</button>
            <button onClick={() => deleteProducts(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
