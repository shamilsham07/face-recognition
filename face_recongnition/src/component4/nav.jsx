import React from "react";
import "./home.css"
import { useNavigate } from "react-router-dom";
import * as faceapi from 'face-api.js';

export default function Nav({status}) {
  const usenavigation=useNavigate()
  return (
    <div className="fixed w-full">
      <section className="px-20 py-3 ">
        <div className="flex justify-between items-center bg-[#f5f5f5] p-3 rounded-sm px-3">
          <div className="flex items-center gap-2 text-theme">
            <i className="bi bi-amd text-2xl"></i>
            <h3 className="text-lg font-bold capitalize">Face app</h3>
          </div>
          
          <div className="flex gap-3 text-md capitalize font-semibold cursor-pointer items-center">
            <h4 className={status=="home"?"nav-active":""} onClick={()=>usenavigation("/")}>Home</h4>
            <h4 onClick={()=>usenavigation("/attendence")} className={status=="attendence"?"nav-active":""}>Attendence</h4>
            <h4 onClick={()=>usenavigation("/registration")} className={status=="registration"?"nav-active":""}>register</h4>
          

          </div>
        </div>
      </section>
    </div>
  );
}
