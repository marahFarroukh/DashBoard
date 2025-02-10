import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface DataArray {
  name: string;
  price: number;
  image: string;
  id?: number;
  image_url?: string;
  _method: string;
}

function CreateForm({ type }: { type?: string }) {
  const [data, setData] = useState<DataArray | null>(null);
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [image, setImage] = useState<string | File>("");
  const navigate = useNavigate();
  const params = useParams();
  const fileInput = useRef<HTMLInputElement | null>(null);
  const token = JSON.parse(localStorage.getItem("user") || "{}")?.token;

  useEffect(() => {
    if (type === "update" && params.id) {
      axios
        .get(`https://vica.website/api/items/${params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setName(res.data.name);
          setPrice(res.data.price);
          setData(res.data);
          toast.success("The element was successfully fetched ✅", {
            position: "top-right",
            autoClose: 5000,
          });
        })
        .catch((error) => {
          console.error(error);
          toast.error("Failed to fetch data!");
        });
    }
  }, [type, params.id, token]);

  const handleButton = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  // دالة لمعالجة الملف المحدد
  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImage(event.target.files[0]);
    }
  };

  const sendParameter = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price.toString());
    if (image) {
      formData.append(
        "image_url",
        image instanceof File ? image : new Blob([image])
      );
    }
    formData.append("_method", type === "update" ? "PUT" : "POST");

    const url =
      type === "update"
        ? `https://vica.website/api/items/${params.id}`
        : "https://vica.website/api/items";

    const request =
      type === "update"
        ? axios.post(url, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          })
        : axios.post(url, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          });

    request
      .then((res) => {
        console.log(res.data);
        toast.success(
          type === "update"
            ? "Product updated successfully!"
            : "Product created successfully!"
        );
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to process the request, sorry!", {
          position: "top-right",
          autoClose: 5000,
        });
      });
  };

  return (
    <>
      <form className="create flex flex-col gap-16" onSubmit={sendParameter}>
        <div className="left flex justify-between flex-wrap gap-16">
          <div className="inputs shrink flex flex-col gap-8">
            <div className="input input-g flex flex-col shrink-0 gap-1 ">
              <label
                className="text-lg text-slate-950 dark:text-slate-50 font-medium"
                htmlFor="name"
              >
                Product Name :
              </label>
              <input
                className="max-w-96 w-full h-11 p-4 rounded-lg dark:bg-slate-600 dark:text-slate-50 bg-slate-100"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setName(event.target.value)
                }
                type="text"
                id="name"
                placeholder="Enter Product Name"
                defaultValue={data?.name}
              />
            </div>
            <div className="input input-g flex flex-col shrink-0 gap-1">
              <label
                className="text-lg text-slate-950 dark:text-slate-50 font-medium"
                htmlFor="price"
              >
                Product Price :
              </label>
              <input
                className="max-w-96 w-full h-11 p-4 rounded-lg dark:bg-slate-600 dark:text-slate-50 bg-slate-100"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setPrice(Number(event.target.value))
                }
                type="number"
                id="price"
                placeholder="Enter Product Price"
                defaultValue={data?.price}
              />
            </div>
          </div>
          <div className="right flex justify-center items-center  max-w-96 w-full border-dashed dark:border-slate-600 border-2 border-slate-300">
            <label
              htmlFor="img"
              className="upload flex justify-center items-center flex-col"
            >
              {type ? (
                <img src={data?.image_url} alt="" />
              ) : (
                <img src="/assets/img/upload.svg" alt="" />
              )}
              <button
                onClick={handleButton}
                className="text-slate-950 font-medium dark:text-white"
              >
                Upload Product Image
              </button>
            </label>
            <input
              type="file"
              ref={fileInput}
              style={{ display: "none" }} // إخفاء المدخل
              onChange={handleFile}
            />
            {data && <p>Selected file: {data.name}</p>}
            <input
              className="hidden"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                handleFile(event);
              }}
              type="file"
              id="img"
              ref={fileInput}
              defaultValue={data?.image}
            />
          </div>
        </div>
        <input
          className="max-w-28 w-full shadow-sm bg-slate-300 rounded-lg mx-9 p-3 dark:bg-slate-700 dark:text-slate-50"
          type="submit"
          value={type ? "Update" : "Create"}
        />
      </form>
    </>
  );
}

export default CreateForm;
