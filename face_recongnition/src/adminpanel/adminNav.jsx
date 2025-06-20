import React from "react";
import image from "../assets/WhatsApp Image 2025-06-13 at 3.25.37 PM.jpeg";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function adminNav({ status }) {
  const [count, setcount] = useState(0);
  const [modal, setmodal] = useState(true);
  const [details, setdetails] = useState({});
  async function getRequest() {
    const result = await fetch("http://localhost:8000/gettotalrequest", {
      method: "GET",
    });
    const res = await result.json();
    console.log(res);
    setcount(res.count);
    setdetails(res.details);
  }

  function show() {
    setmodal(true);
  }

  useEffect(() => {
    getRequest();
  }, []);
  const navigation = useNavigate();
  return (
    <>
      <div className="relative">
        <section className="Nav px-20 py-3 fixed w-full">
          <div className="container  bg-theme rounded py-3 ">
            <div className="flex flex-row items-center justify-between">
              <div className="flex gap-6 items-center">
                <i className="bi bi-amd text-2xl text-white"></i>
                <h3
                  className={
                    status == "home"
                      ? "text-white text-sm font-normal activeed-nav cursor-pointer"
                      : "text-white text-sm font-normal cursor-pointer"
                  }
                  onClick={() => navigation("/admin")}
                >
                  Home
                </h3>
                <h3
                  className={
                    status == "request"
                      ? "text-white text-sm font-normal activeed-nav cursor-pointer"
                      : "text-white text-sm font-normal cursor-pointer"
                  }
                  onClick={() => {
                    navigation("/request");
                  }}
                >
                  Request
                </h3>
              </div>

              <div className="flex items-center gap-3">
                {status != "request" && (
                  <div className="bg-white px-3 py-2 rounded">
                    <div>
                      <input type="text" placeholder="Search" />
                      <i class="bi bi-search text-black"></i>
                    </div>
                  </div>
                )}

                {status != "request" && (
                  <div className="relative flex">
                    <div>
                      <i
                        class="bi bi-bell-fill text-white text-xl font-bold"
                        onClick={show}
                      ></i>
                    </div>
                    {count > 0 && (
                      <div className="bg-red-600 absolute top-[-9px] left-[14px] px-2  rounded-full">
                        <h6 className="text-white  ">{count}</h6>
                      </div>
                    )}
                  </div>
                )}
                <div className="pl-5">
                  <div className="rounded-full   w-[40px] h-[40px]">
                    <img
                      src={image}
                      alt=""
                      className="object-cover rounded-full w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {modal && (
          <div className="absolute top-[82px] right-[200px] overflow-hidden overflow-y-auto">
            <div className="border-1 border-[#efefef] w-[300px] h-[200px] z-1 inset-0 bg-white  p-2 shadowss">
              <div className="flex flex-row  border-b-[#efefef] pt-3">
                <div>
                  <img
                    src={image}
                    className="w-[50px] h-[50px] rounded-full object-cover"
                  />
                </div>
                <div className="flex flex-col items-start justify-start pl-2">
                  <h2 className="text-sm font-normal capitalize">Shamil</h2>
                  <h2 className="text-sm font-normal capialize">
                    shamilSHam24@gmail.com
                  </h2>
                </div>
              </div>
              <div className="flex flex-row  border-b-[#efefef] pt-3">
                <div>
                  <img
                    src={image}
                    className="w-[50px] h-[50px] rounded-full object-cover"
                  />
                </div>
                <div className="flex flex-col items-start justify-start pl-2">
                  <h2 className="text-sm font-normal capitalize">Shamil</h2>
                  <h2 className="text-sm font-normal capialize">
                    shamilSHam24@gmail.com
                  </h2>
                </div>
              </div>
              <div className="flex flex-row  border-b-[#efefef] pt-3">
                <div>
                  <img
                    src={image}
                    className="w-[50px] h-[50px] rounded-full object-cover"
                  />
                </div>
                <div className="flex flex-col items-start justify-start pl-2">
                  <h2 className="text-sm font-normal capitalize">Shamil</h2>
                  <h2 className="text-sm font-normal capialize">
                    shamilSHam24@gmail.com
                  </h2>
                </div>
              </div>
              <div className="flex flex-row  border-b-[#efefef] pt-3">
                <div>
                  <img
                    src={image}
                    className="w-[50px] h-[50px] rounded-full object-cover"
                  />
                </div>
                <div className="flex flex-col items-start justify-start pl-2">
                  <h2 className="text-sm font-normal capitalize">Shamil</h2>
                  <h2 className="text-sm font-normal capialize">
                    shamilSHam24@gmail.com
                  </h2>
                </div>
              </div>
              <div className="flex flex-row  border-b-[#efefef] pt-3">
                <div>
                  <img
                    src={image}
                    className="w-[50px] h-[50px] rounded-full object-cover"
                  />
                </div>
                <div className="flex flex-col items-start justify-start pl-2">
                  <h2 className="text-sm font-normal capitalize">Shamil</h2>
                  <h2 className="text-sm font-normal capialize">
                    shamilSHam24@gmail.com
                  </h2>
                </div>
              </div>
              <div className="flex flex-row  border-b-[#efefef] pt-3">
                <div>
                  <img
                    src={image}
                    className="w-[50px] h-[50px] rounded-full object-cover"
                  />
                </div>
                <div className="flex flex-col items-start justify-start pl-2">
                  <h2 className="text-sm font-normal capitalize">Shamil</h2>
                  <h2 className="text-sm font-normal capialize">
                    shamilSHam24@gmail.com
                  </h2>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
