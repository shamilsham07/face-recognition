import React, { useEffect, useState } from "react";
import AdminNav from "./adminNav";
import image from "../assets/WhatsApp Image 2025-06-13 at 3.25.37 PM.jpeg";

export default function requestpage() {
  const [showmodal, setshowmaodal] = useState(false);
  const [details, setdetails] = useState({});
  const [id, storeId] = useState();
  async function getallrequestedusers() {
    console.log("name");
    const result = await fetch("http://localhost:8000/getpendingrequest", {
      method: "GET",
    });
    const res = await result.json();
    console.log(res);
    setdetails(res.details);
  }

  async function registered() {
    console.log(id);
    const result = await fetch("http://localhost:8000/confirmregister", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ id: id }),
    });
    const res = await result.json();
    console.log(res);
    if(res.detail){
    setdetails(res.detail);
    setshowmaodal(false)
    }
    else{
      setdetails({})
    }
  }

  useEffect(() => {
    getallrequestedusers();
  }, []);
  return (
    <>
      <AdminNav status={"request"} />
      <section className="px-20 py-25 relative">
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs  uppercase bg-theme dark:bg-gray-700 text-white">
              <tr>
                <th scope="col" class="px-6 py-3">
                  #
                </th>
                <th scope="col" class="px-6 py-3">
                  Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Phone
                </th>
                <th scope="col" class="px-6 py-3">
                  email
                </th>
                <th scope="col" class="px-6 py-3">
                  image
                </th>
                <th scope="col" class="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {details.length > 0 &&
                details.map((item, index) => (
                  <tr
                    key={index}
                    class="odd:bg-white text-black odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
                  >
                    <td class="px-6 py-4 ">{index + 1}</td>
                    <td class="px-6 py-4 font-semibold capitalize">
                      {item.first_name} {item.last_name}{" "}
                    </td>
                    <td class="px-6 py-4">{item.phonenumber}</td>
                    <td class="px-6 py-4">{item.email}</td>
                    <td class="px-6 py-4">
                      <img
                        src={`http://127.0.0.1:8000${item.image}`}
                        alt=""
                        className="w-[50px] h-[50px] object-cover rounded-full"
                      />
                    </td>
                    <td className="px-6 py-4 space-x-3.5">
                      <i
                        class="bi bi-check2 bg-green-600 text-white px-2 py-2 rounded text-lg cursor-pointer"
                        onClick={() => {
                          setshowmaodal(true);
                          storeId(item.id);
                        }}
                      ></i>
                      <i class="bi bi-trash3-fill bg-red-600 px-2 py-2 rounded text-lg text-white cursor-pointer"></i>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {showmodal && (
          <div
            id=""
            tabindex="-1"
            aria-hidden="true"
            class=" overflow-y-auto  fixed z-50 flex justify-center items-center w-full inset-0 h-full"
          >
            <div class="relative p-4 w-full max-w-xl max-h-full">
              <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                  <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    Register
                  </h3>
                  <button
                    type="button"
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="default-modal"
                    onClick={() => setshowmaodal(false)}
                  >
                    <svg
                      class="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span class="sr-only">Close modal</span>
                  </button>
                </div>

                <div class="p-4 md:p-5 text-center font-normal capitalize text-lg">
                  Are you sure ?
                </div>

                <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    data-modal-hide="default-modal"
                    type="button"
                    onClick={() => registered()}
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    I accept
                  </button>
                  <button
                    data-modal-hide="default-modal"
                    type="button"
                    onClick={() => setshowmaodal(false)}
                    class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    Decline
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
