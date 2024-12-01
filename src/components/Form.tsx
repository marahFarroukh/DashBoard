import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface inputElements {
  tit?: string;
  type?: string;
  placeholder?: string;
  name: string;
}
interface formProps {
  title: string;
  descrip: string;
  inputs?: inputElements[];
  btn: string;
  ques: string;
  url: string;
  type: string;
}

interface UserData {
  first_name: string;
  last_name: string;
  user_name: string;
  email: string;
  password: string | number;
  confirmation_password: string | number;
  profile_image
?: string | File;
}

function Form({ title, descrip, inputs, btn, ques, url, type }: formProps) {
  const [data, setData] = useState<UserData>({
    first_name: "",
    last_name: "",
    user_name: "",
    email: "",
    password: "",
    confirmation_password: "",
    profile_image
: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (name: string, value: string | File) => {
    setData({ ...data, [name]: value });
  };

  const send = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axios.post(url, data).then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate("/");
        if (type === "register") {
          toast.error("Created your account sucessfully", {
            position: "top-right",
            autoClose: 5000,
          });
        } else {
          toast("Welcome To You 🤎😁");
        }
      });
    } catch (error) {
      console.error("Error:", error);
      if (data.password != data.confirmation_password) {
        toast.error("Password do not match", {
          position: "top-right",
          autoClose: 5000,
        });
      }
    }
  };

  return (
    <>
      <form
        onSubmit={send}
        className={` w-full ${
          type == "register" ? "max-w-3xl" : "max-w-md"
        } flex w-full flex-col gap-8 rounded-3xl bg-white p-6`}
      >
        <div className="top">
          <h1 className="text-2xl font-extrabold text-center">{title}</h1>
          <p className="p-p8-p32 text-sm font-semibold text-text-slate-950 text-center">
            {descrip}
          </p>
        </div>
        <div
          className={`inputs ${
            type == "register" ? "flex-row" : "flex-col"
          } input flex gap-8 flex-wrap`}
        >
          {inputs?.map((ele, index) => (
            <div className="input g-input flex flex-col gap-2" key={index}>
              <label className="text-text-slate-950" htmlFor={ele.tit}>
                {ele.tit}
              </label>
              {ele.type === "file" ? (
                <label htmlFor={ele.tit}>
                  <img
                    src="/assets/img/profile-avatar.png"
                    className="w-28"
                    alt=""
                  />
                </label>
              ) : null}
              <input
                className={`${
                  ele.type == "file" ? "hidden" : "block"
                } max-w-sm w-full border border-border-gray-700 rounded-md  bg-sky-100 p-1`}
                type={ele.type}
                placeholder={ele.placeholder}
                id={ele.tit}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const value =
                    ele.type === "file" && event.target.files
                      ? event.target.files[0]
                      : event.target.value;
                  handleInputChange(ele.name, value);
                }}
              />
            </div>
          ))}
        </div>
        <input
          type="submit"
          value={btn}
          className={`${
            type == "login" ? "m-my-16" : "m-my-12"
          } mx-auto  justify-self-end bg-sky-500 max-w-80 w-full py-2.5 rounded-md text-lg font-bold text-white`}
        />
        <p className="text-sm font-semibold text-text-slate-950 text-center">
          {ques}
          {type == "login" ? (
            <Link className="text-sky-500 underline pl-1" to={"register"}>
              Create Account
            </Link>
          ) : (
            <Link className="text-sky-500 underline pl-1" to={"/"}>
              Login
            </Link>
          )}
        </p>
      </form>
    </>
  );
}

export default Form;
