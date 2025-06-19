import Webcam from "react-webcam";
import React, { useEffect, useRef, useState } from "react";
import csrftoken from "../../csrf";
import "./home.css";
import image from "../assets/computer-technology-designer-studio-partnership.jpg";
import Nav from "./nav";


export default function Home() {
  const[boxshow,setBoxShow]=useState(false)
  const [index, setIndex] = useState(0);
  const [animation, setanimation] = useState(false);

  const [text, settext] = useState(
    "DeepFace integrates with several deep learning frameworks like VGG-Face, Facenet, OpenFace, DeepID, and ArcFace, ensuring flexibility and robustness."
  );
  const textarry = [
    "Attendance is marked within seconds. The system compares facial features on-the-fly with stored data to ensure quick and smooth user experiences.",
    " Our system uses DeepFace, a leading open-source facialrecognition framework developed by Meta (Facebook). It providesaccurate face detection and verification using deep learningmodels, enabling secure and reliable attendance tracking.F",
  ];





  useEffect(() => {
    const interval = setInterval(() => {
      setanimation(false);

      setTimeout(() => {
        settext(textarry[index]);
        setanimation(true);
        setIndex((prevIndex) => (prevIndex + 1) % textarry.length);
      }, 50);
    }, 3000);

    return () => clearInterval(interval);
  }, [index]);

  return (
    <div className="bg-white">
      <Nav status={"home"} />
      <div className="container py-20 h-[50vh]">
        <div className="py-5 grid grid-cols-3">
          <div className="col-span-2">
            <h1 className="text-3xl font-bold text-theme capitalize">
              Smart Attendance Using <br />
              <span className="text-black"> Face Recognition</span>{" "}
            </h1>
          </div>

          <div>
            <div className="">
              <p className="text-sm capitalize leading-7 text-left">
                Experience the future of attendance with our AI-powered facial
                recognition system. No cards,no passwords — just your face. Our
                system offers secure, contactless,
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-5 items-center justify-center">
          <div className=" flex gap-2 mb-2">
            <div className="box-1  delay-1 bg-[#fafafa] rounded-md px-15 py-5 text-sm  text-center border-1  border-[#e6e6e6]   animate__animated animate__zoomIn">
              <i class="bi bi-person-check text-3xl text-theme font-bold"></i>
              <h3 className="text-lg text-black font-semibold capitalize  pt-3">
                {" "}
                Marking Attendance <br />
                with a Glance
              </h3>
            </div>
            <div className="box-1 delay-2 bg-[#fafafa] rounded-md px-15 py-5 text-sm  border-1 border-[#e6e6e6] text-center  animate__animated animate__zoomIn">
              <i class="bi bi-person-circle text-success  text-3xl text-theme font-bold"></i>
              <h3 className="text-lg text-black font-semibold capitalize pt-3">
                {" "}
                No Cards, No Codes <br /> Just Your Face
              </h3>
            </div>
            <div className="box-1 delay-3 bg-[#fafafa] rounded-md px-15 py-5 text-sm  text-center  border-1 border-[#e6e6e6]  animate__animated animate__zoomIn">
              <i class="bi bi-gear text-success  text-3xl text-theme font-bold"></i>{" "}
              <i class="bi bi-check-circle-fill   text-3xl text-theme font-bold"></i>
              <h3 className="text-lg text-black font-semibold capitalize  pt-3">
                {" "}
                Accuracy Meets <br /> Automation
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-theme h-[50vh] py-4 mt-1">
        <div className="container">
          <div className="pt-1 pb-1">
            <div className="flex justify-center items-center w-full flex-col">
              <h1 className="text-white text-3xl font-bold capitalize">
               AI-Powered Face Recognition for Smart Attendance
              </h1>
              <p
                className={
                  animation
                    ? "text-sm text-white text-center font-normal w-[700px] fadein h-[80px] mt-3"
                    : "text-sm text-white text-center font-normal w-[700px] Fadeout h-[80px] mt-3"
                }
              >
                {text}
              </p>
            </div>
            <section className="">
              <div className="box1 flex justify-center items-center gap-2">
                <div className="box bg-white rounded px-15 py-9 mt-5 text-center text-lg capitalize font-normal text-theme">
                  <div className="text-center">
                    <h3 className="font-bold text-6xl">64</h3>
                    <h3 className="text-lg font-normal pt-1"> users</h3>
                  </div>
                </div>
                <div className="box bg-white rounded px-15 py-9 mt-5 text-center text-lg capitalize font-normal text-theme">
                  <div className="text-center">
                    <h3 className="font-bold text-6xl">5s</h3>
                    <h3 className="text-lg font-normal pt-1"> Recognition</h3>
                  </div>
                </div>
                <div className="box bg-white rounded px-15 py-9 mt-5 text-center text-lg capitalize font-normal text-theme">
                  <div>
                    <h3 className="font-bold text-6xl">100%</h3>
                    <h3 className="text-lg font-normal pt-1"> accuracy</h3>
                  </div>
                </div>
                 <div className="box bg-white rounded px-15 py-9 mt-5 text-center text-lg capitalize font-normal text-theme">
                  <div>
                    <h3 className="font-bold text-6xl">24/7</h3>
                    <h3 className="text-lg font-normal pt-1"> support</h3>
                  </div>
                </div>
                    <div className="box bg-white rounded  px-15 py-9 mt-5 text-center text-lg capitalize font-normal text-theme">
                  <div>
                    <h3 className="font-bold text-6xl">95%</h3>
                    <h3 className="text-lg font-normal pt-1"> statisficaation</h3>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <section className="w-full h-screen">

      </section>
    </div>
  );
}
