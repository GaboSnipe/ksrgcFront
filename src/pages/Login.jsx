import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser, logoutUser } from "../features/auth/authSlice.js";
import { store } from "../store";
import { useSelector } from "react-redux";


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginState = useSelector((state) => state.auth.isLoggedIn);


  useEffect(() => {
    if (loginState) {
      localStorage.removeItem("token");
      localStorage.removeItem("refresh");
      store.dispatch(logoutUser());
    }
  }, []);

  const isValidate = () => {
    let isProceed = true;

    if (email.length === 0) {
      isProceed = false;
      toast.warn("import email");
    } else if (password.length < 6) {
      isProceed = false;
      toast.warn("passwords length min 6");
    }
    return isProceed;
  };

  const proceedLogin = (e) => {
    e.preventDefault();
    if (isValidate()) {
      fetch(`https://mysite-uoqd.onrender.com/api/accounts/auth/jwt/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      })
      .then((res) => {
        if (!res.ok) {
          if (res.headers.get('content-type')?.includes('application/json')) {
            return res.json().then((data) => {
              throw new Error(data.detail);
            });
          } else {
            throw new Error("Cent loginned");
          }
        }
        return res.json();
      })
      .then((data) => {
        localStorage.setItem("token", data.access);
        localStorage.setItem("refresh", data.refresh);
        store.dispatch(loginUser());
        navigate("/app");
      })
      .catch((err) => {
        toast.error("Eroor: " + err.message);
      });
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center sm:py-24">
        <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
          <div className="bg-dark border border-gray-600 shadow w-full rounded-lg divide-y divide-gray-200">
            <form className="px-5 py-7" onSubmit={proceedLogin}>
              <label className="font-semibold text-sm pb-1 block text-accent-content">
                E-mail
              </label>
              <input 
                value={email}
                required={true}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className=" rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              />
              <label className="font-semibold текст-sm pb-1 block text-accent-content">
                Password
              </label>
              <input
                type="password"
                required={true}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className=" rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              />
              <button
                type="submit"
                className="transition duration-200 bg-blue-600 hover:bg-blue-500 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
              >
                <span className="inline-block mr-2">Login</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4 inline-block"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
