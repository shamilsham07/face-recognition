import React from "react";
import image from "../assets/WhatsApp Image 2025-06-13 at 3.25.37 PM.jpeg";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "../component4/home.css";

export default function adminNav({ status }) {
  const [count, setcount] = useState(0);
  const [showcalender, setcalender] = useState(false);
  const [notDetails, setNOtDetails] = useState({});
  const [modal, setmodal] = useState(false);
  const [value, onChange] = useState();
  const [details, setdetails] = useState({});

  const show = () => {
    setmodal(true);
  };

  async function getRequest() {
    const result = await fetch("http://localhost:8000/gettotalrequest", {
      method: "GET",
    });
    const res = await result.json();
    console.log(res);
    setcount(res.count);
    setdetails(res.details);
  }

  async function goCheckanynotification() {
    const result = await fetch("http://localhost:8000/goCheckanynotification", {
      method: "get",
    });
    const res = await result.json();
    console.log(res);
    console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
    setNOtDetails(res.details);
  }

  useEffect(() => {
    console.log(status);
    getRequest();
    goCheckanynotification();
  }, []);
  const navigation = useNavigate();
  return (
    <>
      <div className="relative">
        <section className="Nav z-50 px-20 py-3 fixed w-full">
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
                  onClick={() => navigation("/request")}
                >
                  Request
                </h3>
              </div>

              <div className="flex items-center gap-2 ">
                <div className=" bg-[#ffff] rounded flex gap-1 items-center justify-center px-2 relative w-[170px] border-[#eaeaea]">
                  <input
                    type="text"
                    className="w-full h-full inp capitalize p-2  outline-none focus:ring-0 focus:outline-none"
                    placeholder="select date"
                    onClick={() => setcalender(true)}
                    value={value}
                  />
                  <i
                    class="bi bi-calendar border-none "
                    onClick={() => setcalender(true)}
                  ></i>
                  {showcalender && (
                    <div className="absolute  calend">
                      <DatePicker
                        dateformat="MM/dd/yyyy"
                        
                        onChange={(date) => {
                          onChange(date);

                          setcalender(false);
                        }}
                        value={value}
                      />
                    </div>
                  )}
                </div>

                {status != "request" && (
                  <div className="relative flex">
                    <div>
                      <i
                        class="bi bi-bell-fill text-white text-xl font-bold cursor-pointer"
                        onMouseOver={show}
                        onMouseOut={() => setmodal(false)}
                      ></i>
                    </div>
                    {count > 0 && (
                      <div className="bg-red-600 absolute top-[-9px] left-[14px] px-2  rounded-full ">
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
          <div>
            <div className="absolute top-[82px] right-[200px] overflow-hidden overflow-y-auto shadowss">
              <div className="border-1 border-[#efefef] w-[300px] max-h-[200px] z-1 inset-0 bg-white overflow-hidden overflow-y-auto  p-2 shadowss">
                {notDetails.length > 0 &&
                  notDetails.map((item, index) => (
                    <div className="flex flex-row  border-b-[#efefef] pt-3">
                      <div className="w-[40px] h-[40px] rounded-full">
                        <img
                          src={`http://127.0.0.1:8000/${item.img}`}
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col items-start justify-start pl-2">
                        <h2 className="text-sm font-normal capitalize">
                          {item.name}
                        </h2>
                        <h2 className="text-sm font-normal capialize">
                          {item.email}{" "}
                        </h2>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
