import React from "react";
import Loader from "./loader/loader";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function Login() {
  const navigation=useNavigate()
  const [loader, setloader] = useState(false);
  const [inpValues, setvalues] = useState();
  const [pass, setPass] = useState();

function toasts(e,value){
  toast[value](e, {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "colored",

});
}


  function makenull() {
    setvalues("");
    setPass("");
  }

  async function submit(e) {
    e.preventDefault();
    setloader(true);
    console.log(inpValues);
    console.log(pass);
    const formdata = new FormData();
    formdata.append("username", inpValues);
    formdata.append("pass", pass);

    const result = await fetch("http://localhost:8000/userlog", {
      method: "POST",
      body: formdata,
    });
    const res = await result.json();
    console.log(res);
    setloader(false);
    makenull();
    res.error?toasts(res.error,"error"):navigation("/admin")
  }

  return (
    <>
      <div className="px-30 py-30">
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
          theme="light"
  
        />

        <div className="grid grid-cols-2">
          <div className="bg-theme flex justify-center items-center flex-col p-5 rounded-bl-lg rounded-tl-lg">
            <i className="bi bi-amd text-9xl text-white"></i>
            <h1 className="text-white text-5xl font-bold capitalize">
              face recognition
            </h1>
          </div>
          <div className="bg-white border-2 border-[#eaeaea] h-[70vh] flex justify-center items-center">
            <div className="w-full">
              <div className="text-center">
                <h3 className="text-theme font-bold text-lg">Admin Login</h3>
                <p className="text-xs text-gray-500">
                  Hey, enter your credinentals to sign into your account
                </p>
                <form
                  action=""
                  className=" text-center flex justify-center flex-col gap-2 px-10 mt-2"
                  onSubmit={submit}
                >
                  <div className="bg-white border-[#eaeaea] rounded px-2 py-1 border-2 flex gap-1">
                    <i class="bi bi-lock"></i>
                    <input
                      type="text"
                      required
                      placeholder="enter username"
                      value={inpValues}
                      className="outline-none focus:ring-0 focus:outline-none  placeholder:text-gray-700"
                      onChange={(e) => setvalues(e.target.value)}
                    />
                  </div>
                  <div className="bg-white border-[#eaeaea] rounded px-2 py-1 border-2 flex gap-1">
                    <i class="bi bi-key"></i>
                    <input
                      type="password"
                      placeholder="enter password"
                      required
                      value={pass}
                      className="outline-none focus:ring-0 focus:outline-none placeholder:text-gray-700"
                      onChange={(e) => setPass(e.target.value)}
                    />
                  </div>
                  <button
                    className="bg-theme text-white rounded py-1 font-bold"
                    type="submit"
                  >
                    LOGIN
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        {loader && <Loader />}
      </div>
    </>
  );
}
