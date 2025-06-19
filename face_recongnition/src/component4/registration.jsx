import React from "react";
import Nav from "./nav";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { ToastContainer, toast } from "react-toastify";
export default function registration() {
  const Navigate = useNavigate();

  const anothererror = () => {
    toast.error("something went wrong", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const showerrorNotify = () => {
    toast.error("Your Email is already registered", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const ShowNotify = () => {
    toast.success("your registration request send wait for aproove", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

    setTimeout(() => {
      Navigate("/")
    }, 1000);
  };

  const [values, setvalues] = useState({
    firstName: "",
    LastName: "",
    phonenumber: null,
    EmailAddress: "",
    image: null,
    captcha: "",
    terms: null,
  });

  const register = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("first_name", values.firstName);
    formdata.append("last_name", values.LastName);
    formdata.append("image", values.image);
    formdata.append("emailAddresss", values.EmailAddress);
    formdata.append("phonenumber", values.phonenumber);

    console.log(values);
    const result = await fetch("http://localhost:8000/register", {
      method: "POST",
      body: formdata,
    });
    const res = await result.json();
    console.log(res);
    if (res.message) {
      ShowNotify();
    } else if (res.emailerror) {
      showerrorNotify();
    } else {
      anothererror();
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <div className="bg-theme w-full h-[50vh]">
        <Nav status={"registration"} />
        <div className="w-full flex  flex-col items-center justify-center py-6">
          <div className="text-center">
            <h1 className="text-white text-lg font-bold">Register</h1>
            <p className="text-white text-sm font-normal mb-10">
              Enter your details and upload your photo to enable face-based
              attendance.
            </p>
          </div>
          <div className="h-[73vh] bg-white  w-[600px] shadow  rounded-lg p-3">
            <form onSubmit={(e) => register(e)}>
              <div class="grid gap-6 mb-3 md:grid-cols-2">
                <div>
                  <label
                    for="first_name"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={values.firstName}
                    onChange={(e) => {
                      setvalues((prev) => ({
                        ...prev,
                        firstName: e.target.value,
                      }));
                    }}
                  />
                </div>
                <div>
                  <label
                    for="last_name"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Last name
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={values.LastName}
                    onChange={(e) => {
                      setvalues((prev) => ({
                        ...prev,
                        LastName: e.target.value,
                      }));
                    }}
                  />
                </div>
              </div>

              <div className="">
                <label
                  for="phone"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phone number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={values.phonenumber}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  onChange={(e) => {
                    setvalues((prev) => ({
                      ...prev,
                      phonenumber: e.target.value,
                    }));
                  }}
                />
              </div>
              <div class="mb-3">
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  value={values.EmailAddress}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  onChange={(e) => {
                    setvalues((prev) => ({
                      ...prev,
                      EmailAddress: e.target.value,
                    }));
                  }}
                />
              </div>

              <div class=" mb-6">
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Upload Image
                </label>

                <label for="large-file-input" class="sr-only">
                  Choose file
                </label>
                <input
                  type="file"
                  name="large-file-input"
                  id="large-file-input"
                  onChange={(e) => {
                    setvalues((prev) => ({
                      ...prev,
                      image: e.target.files[0],
                    }));
                  }}
                  class="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400
      file:bg-gray-50 file:border-0
      file:me-4
      file:py-3 file:px-4 sm:file:py-5
      dark:file:bg-neutral-700 dark:file:text-neutral-400"
                ></input>
              </div>
              <div>
                <ReCAPTCHA
                  sitekey="6LefoGMrAAAAAAKHqTA_s-TX-Z0W2bwsMAL1rSPU"
                  onChange={(e) => {
                    setvalues((prev) => ({
                      ...prev,
                      captcha: e,
                    }));
                  }}
                />
                ,
              </div>
              <div class="flex items-start mb-6">
                <div class="flex items-center h-5">
                  <input
                    id="remember"
                    type="checkbox"
                    value=""
                    class="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                    required
                  />
                </div>
                <label
                  for="remember"
                  class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  I agree with the{" "}
                  <a
                    href="#"
                    class="text-blue-600 hover:underline dark:text-blue-500"
                  >
                    terms and conditions
                  </a>
                  .
                </label>
              </div>

              <div className="text-center w-full">
                <button
                  type="submit"
                  disabled={!values.captcha}
                  class={
                    " w-[100%] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  }
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
