import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
interface Product {
  id: number;
  name: string;
  image_url: string;
  price: number;
  created_at: number | string;
}
function ProductsShow() {
  const params = useParams();
  const [data, setData] = useState<Product>();
  const token = JSON.parse(localStorage.getItem("user") || "{}")?.token;

  useEffect(() => {
    axios
      .get(`https://vica.website/api/items/${params.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => console.log(error));
  });
  return (
    <>
      <div className="w-full card shrink-0 my-8 max-w-80 h-fit gap-4 dark:bg-slate-700  p-5 bg-white flex flex-col items-start justify-between rounded-lg shadow">
        <img
          className="w-max-w-52 object-cover align-middle h-56 mx-auto "
          src={data?.image_url}
          alt=""
        />
        <h3 className="text-lg text-slate-950 dark:text-stone-50 font-medium">
          {data?.name}
        </h3>
        <div className="property flex flex-col gap-2">
          <p className="text-sm text-sky-500">{data?.price}</p>
          <p className="text-sm text-slate-950  dark:text-slate-50">
            {data?.id}
          </p>
          <p className="text-sm text-slate-950  dark:text-slate-50">
            Added at : <span>{data?.created_at}</span>
          </p>
          <button>
            <Link
              to="/"
              className="rounded-3xl w-32 p-p-4 bg-slate-100 text-xs dark:bg-slate-600 dark:text-slate-50 text-slate-950 font-medium"
            >
              Home
            </Link>
          </button>
        </div>
      </div>
    </>
  );
}

export default ProductsShow;
