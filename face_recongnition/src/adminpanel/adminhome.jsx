import React, { useEffect, useState } from "react";
import "../component4/home.css";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";
import { Line } from "react-chartjs-2";
import image from "../assets/WhatsApp Image 2025-06-13 at 3.25.37 PM.jpeg";
export default function adminhome() {
  const navigation=useNavigate()
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "My First Dataset",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: "rgb(86,125,244)",
        tension: 0.1,
      },
    ],
  };
  const [count, setcount] = useState(0);
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

  useEffect(() => {
    getRequest();
  }, []);

  return (
    <div className="">
      <section className="Nav px-20 py-3 fixed w-full">
        <div className="container  bg-theme rounded py-3 ">
          <div className="flex flex-row items-center justify-between">
            <div className="flex gap-6 items-center">
              <i className="bi bi-amd text-2xl text-white"></i>
              <h3 className="text-white text-sm font-normal   activeed-nav">
                Home
              </h3>
              <h3 className="text-white text-sm font-normal"onClick={()=>{navigation("/request")}}>Request</h3>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white px-3 py-2 rounded">
                <div>
                  <input type="text" placeholder="Search" />
                  <i class="bi bi-search text-black"></i>
                </div>
              </div>

              <div className="relative flex">
                <i
                  class="bi bi-bell-fill text-white text-lg"
                  id="dropdownDelayButton"
                  data-dropdown-toggle="dropdownDelay"
                  data-dropdown-delay="500"
                  data-dropdown-trigger="hover"
                  type="button"
                ></i>
                <div
                  id="dropdownDelay"
                  class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700"
                >
                  <ul
                    class="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownDelayButton"
                  >
                    <li>
                      <a
                        href="#"
                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Settings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Earnings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Sign out
                      </a>
                    </li>
                  </ul>
                </div>
                {count > 0 && (
                  <div className="bg-red-600 absolute top-[-9px] left-[14px] px-2  rounded-full">
                    <h6 className="text-white  ">{count}</h6>
                  </div>
                )}
              </div>
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

      <section className="dashboard px-20 py-25">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <div class="relative overflow-x-auto">
              <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs  uppercase bg-theme text-white">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      #
                    </th>
                    <th scope="col" class="px-6 py-3">
                      user name
                    </th>
                    <th scope="col" class="px-6 py-3">
                      attendence
                    </th>
                    <th scope="col" class="px-6 py-3">
                      report time
                    </th>
                    <th scope="col" class="px-6 py-3">
                      image
                    </th>
                    <th scope="col" class="px-6 py-3">
                      email
                    </th>
                    <th scope="col" class="px-6 py-3">
                      contact
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {details.length > 0 &&
                    details.map((item, index) => (
                      <tr
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 text-black"
                        key={index}
                      >
                        <td class="px-6 py-4">{index + 1}</td>

                        <td class="px-6 py-4 capitalize ">
                          {item.first_name} {item.last_name}
                        </td>
                        <td class="px-6 py-4">0</td>
                        <td class="px-6 py-4">0</td>
                        <td className="px-6 py-4">
                          <img
                            src={`http://127.0.0.1:8000${item.image}`}
                            className=""
                            alt=""
                          />
                        </td>
                        <td class="px-6 py-4">{item.email}</td>
                        <td class="px-6 py-4">{item.phonenumber}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-span-6 ">
            <div>
              <Line options={labels} data={data} />
            </div>
            <div className="p-10">
              <div className="flex gap-4">
                <div className="card-1 bg-theme px-10 py-10 text-center rounded">
                  <h3 className="text-lg font-semibold capitalize text-white ">
                    Total users
                  </h3>
                  <div className="flex items-center gap-4 justify-center">
                    <h3 className="text-5xl font-semibold capitalize text-white ">
                      100
                    </h3>
                  </div>
                </div>
                <div className="card-1 bg-theme px-10 py-10 text-center rounded">
                  <h3 className="text-lg font-semibold capitalize text-white ">
                    Total present
                  </h3>
                  <div className="flex items-center gap-4 justify-center">
                    <h3 className="text-5xl font-semibold capitalize text-white ">
                      10
                    </h3>
                  </div>
                </div>{" "}
                <div className="card-1 bg-theme px-10 py-10 text-center rounded">
                  <h3 className="text-lg font-semibold capitalize text-white ">
                    Total updates
                  </h3>
                  <div className="flex items-center gap-4 justify-center">
                    <h3 className="text-5xl font-semibold capitalize text-white ">
                      3
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
