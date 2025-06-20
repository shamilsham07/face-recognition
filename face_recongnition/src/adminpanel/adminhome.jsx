import React, { useEffect, useState } from "react";
import "../component4/home.css";
import { useNavigate } from "react-router-dom";
import AdminNav from "./adminNav";
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
  
<AdminNav status={"home"}/>
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
                      leave time
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
                   {
                    item.attendence=="present"?
                    <td className="px-6 py-4 text-green-600 font-semibold">present</td>:<td className="px-6 py-4 text-red-500 font-semibold">absent</td>
                   }
                        <td class="px-6 py-4">{item.report_time}</td>
                        <td className="px-6 py-4">
                          {
                            item.leave
                            
                          }

                        </td>
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
