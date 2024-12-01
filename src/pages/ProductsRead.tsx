import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext, TurnOnContext } from "../components/NavBar";

interface Product {
  id: number;
  name: string;
  price: string; // أو number حسب الحاجة
  image_url: string;
}

interface ProductsProps {
  products: Product[];
  createProducts: () => void;
  updateProducts: (id: number) => void;
  deleteProducts: (id: number) => void;
  showProducts: (id: number) => void;
  searchQuery: string;
}

const Products: React.FC<ProductsProps> = ({
  searchQuery,
}: {
  searchQuery: string;
}) => {
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setsearch] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [done, setDone] = useState<boolean>(false);
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("user") || "{}")?.token;

  const filteredProducts = products.filter(
    (product) =>
      product.name &&
      searchQuery &&
      search &&
      TurnOnContext &&
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
  }, [done]);

  const createProducts = () => {
    navigate("create");
  };

  const updateProducts = (id: number) => {
    navigate(`update/${id}`);
  };

  const showProducts = (id: number) => {
    navigate(`show/${id}`);
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
    <SearchContext.Provider value={searchQuery}>
      <div className="w-full max-h-screen bg-slate-100 dark:bg-slate-900">
        <div className="top p-5 flex items-center justify-between">
          <h1 className="text-slate-950 text-2xl font-bold dark:text-stone-50">
            All Products
          </h1>
          <button
            className="bg-sky-500 max-w-max w-full p-4 rounded-md text-lg font-bold text-white"
            onClick={createProducts}
          >
            Create Products
          </button>
        </div>
        <div className="cards p-5 bg-slate-100 dark:bg-slate-900 h-full w-full flex gap-6 flex-wrap">
          {products ? (
            products?.map((ele) => {
              return (
                <div
                  key={ele.id}
                  className="card shrink-0 my-8 max-w-80 h-fit gap-4 dark:bg-slate-700 p-5 bg-white flex flex-col items-start justify-between rounded-lg shadow"
                >
                  <img
                    src={ele.image_url}
                    alt={ele.name}
                    className="w-max-w-52 object-cover align-middle h-56 mx-auto"
                  />
                  <div className="property flex flex-col gap-2">
                    <h3 className="text-lg text-slate-950 dark:text-stone-50 font-medium">
                      {ele.name}
                    </h3>
                    <p className="text-sm text-slate-950 dark:text-slate-50">
                      {ele.id}
                    </p>
                    <p className="text-sm text-sky-500">{ele.price}</p>
                    <div className="btn flex justify-between items-center gap-10">
                      <button
                        className="rounded-3xl  w-10 flex items-center justify-center py-2 px-6 bg-slate-100 text-xs dark:bg-slate-600 dark:text-slate-50 text-slate-950 font-medium"
                        onClick={() => updateProducts(ele.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="rounded-3xl w-10 text-center flex items-center justify-center py-2 px-6 bg-slate-100 text-xs dark:bg-slate-600 dark:text-slate-50 text-slate-950 font-medium"
                        onClick={() => showProducts(ele.id)}
                      >
                        Show
                      </button>
                      <button className="w-4 h-6">
                        <img
                          className="w-full"
                          src="/assets/img/heart.svg"
                          alt=""
                        />
                      </button>
                      <button
                        className="w-4 h-6"
                        onClick={() => {
                          setSelectedProductId(ele.id);
                          setDone(true);
                        }}
                      >
                        <img
                          className="w-full"
                          src="/assets/img/del.svg"
                          alt=""
                        />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center dark:text-slate-50 text-slate-950 text-2xl ">
              No products found ...
            </div>
          )}
        </div>
        {filteredProducts.length > 0 ? (
          <div className="cards p-5 bg-slate-100 dark:bg-slate-900 h-full w-full flex gap-6 flex-wrap">
            {filteredProducts.map((ele) => (
              <div
                key={ele.id} // استخدم id كـ key
                className="card shrink-0 my-8 max-w-80 h-fit gap-4 dark:bg-slate-700 p-5 bg-white flex flex-col items-start justify-between rounded-lg shadow"
              >
                <img
                  src={ele.image_url}
                  alt={ele.name}
                  className="w-max-w-52 object-cover align-middle h-56 mx-auto"
                />
                <div className="property flex flex-col gap-2">
                  <h3 className="text-lg text-slate-950 dark:text-stone-50 font-medium">
                    {ele.name}
                  </h3>
                  <p className="text-sm text-slate-950 dark:text-slate-50">
                    {ele.id}
                  </p>
                  <p className="text-sm text-sky-500">{ele.price}</p>
                  <div className="btn flex justify-between items-center gap-10">
                    <button
                      className="rounded-3xl w-4 h-6 p-p-4 bg-slate-100 text-xs dark:bg-slate-600 dark:text-slate-50 text-slate-950 font-medium"
                      onClick={() => updateProducts(ele.id)}
                    >
                      Edit Product
                    </button>
                    <button
                      className="rounded-3xl w-4 h-6 p-p-4 bg-slate-100 text-xs dark:bg-slate-600 dark:text-slate-50 text-slate-950 font-medium"
                      onClick={() => showProducts(ele.id)}
                    >
                      Show
                    </button>
                    <button className="rounded-3xl w-4 h-6 p-p-4 bg-slate-100 text-xs dark:bg-slate-600 dark:text-slate-50 text-slate-950 font-medium">
                      Fav
                    </button>
                    <button
                      onClick={() => {
                        setSelectedProductId(ele.id);
                        setDone(true);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>No products found.</div>
        )}

        {done && selectedProductId !== null && (
          <div className="absolute left-0 top-0 max-w-[100vw] h-screen flex justify-center items-start ">
            <div className="content max-w-[300px] p-8 bg-white dark:bg-slate-800 flex rounded shadow ml-">
              <div className="flex flex-col gap-6 items-center justify-center">
                <p>Are you sure you want to delete this product?</p>
                <div className="modal-buttons flex justify-between gap-10">
                  <button
                    className="p-4 w-20 rounded-md bg-slate-100 dark:bg-slate-700 dark:text-slate-50 text-slate-950"
                    onClick={() => setDone(false)}
                  >
                    No
                  </button>
                  <button
                    className="p-4 w-20 rounded-md bg-red-900 text-white"
                    onClick={() => {
                      if (selectedProductId !== null) {
                        deleteProducts(selectedProductId);
                        setDone(false);
                        setSelectedProductId(null);
                      }
                    }}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </SearchContext.Provider>
  );
};

export default Products;
