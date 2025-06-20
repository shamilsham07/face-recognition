import React from "react";
import Nav from "../nav";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import { Buffer } from "buffer";
import Loader from "../loader/loader";
import { useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function Setattendence() {
  const [loader, setloader] = useState(false);
  const webcamRef = useRef();

  const toaster = (result) => {
    if (result.no_face) {
      toast.error("Bro No Face Detected", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (result.contact) {
      toast.error("please contact admin to view ur register", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (result.good) {
      toast.error("Bro you are not registered", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (result.faceRecognise) {
      toast.success(`attendence marked ${result.faceRecognise}` , {
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
    else if (result.already) {
      toast.info(`alrady marked attendence ${result.already}`, {
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
    
    
    
    else {
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
    }
  };

  const CheckAttendence = async () => {
    const screenshot = webcamRef.current.getScreenshot();
    const response = await fetch(screenshot);
    const blob = await response.blob();
    const jpegBlob = new Blob([blob], { type: "image/jpeg" });
    const file = new File([jpegBlob], "photo.jpg", { type: "image/jpeg" });
    console.log(file);
    if (file) {
      const formdata = new FormData();
      formdata.append("image", file);
      const result = await fetch("http://localhost:8000/checkattendence", {
        method: "POST",
        body: formdata,
      });
      const res = await result.json();
      console.log(res);
      if (res) {
        console.log(res.faceRecognise)
        setloader(false);
        toaster(res);
      }
    }
  };

  return (
    <div className="bg-white h-screen">
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
      <Nav status={"attendence"} />
      <div className="h-[50vh] flex justify-center items-center ">
        <div className="pt-55 text-center">
          <div className="bg-white rounded border-1 border-[#eaeaea]  w-[500px] h-[400px] ">
            <Webcam
              ref={webcamRef}
              audio={false}
              mirrored={true}
              screenshotFormat="image/jpeg"
              className="w-full h-full transform -scale-x-100"
              style={{ transform: "scaleX(-1)" }}
              videoConstraints={{
                width: 500,
                height: 400,
                facingMode: "user",
              }}
            />
          </div>
          <button
            className="bg-white mt-2 text-center px-2 py-1  text-lg font-semibold text-theme "
            onClick={() => {
              CheckAttendence();
              setloader(true);
            }}
          >
            {" "}
            submit
          </button>
        </div>
      </div>
      <div className="bg-theme h-[50vh]"></div>
      {loader && <Loader />}
    </div>
  );
}
