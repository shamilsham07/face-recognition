import React from "react";
import Webcam from "react-webcam";
import { useRef,useState } from "react";
export default function Signup() {
  const [loadImage,setLoadImage]=useState(null)
    const[image,setimage]=useState(null)
    const[active,setactive]=useState(false)
    const currentref=useRef(null)

// const registers=async(event)=>{
//   try{
//     console.log(event.target.files)
//   const file=event.target.files
//   const formData=new FormData()
//    formData.append("file",event.target.files[0])
//    const  result=await fetch("http://localhost:8000/CheckingAttendence",{
//     method:"POST",
//     body:formData,
//    })
//    const res=await result.json()
//    console.log(res)
//   }
//   catch(error){
//     console.log(error)

//   }

// }


  const registers = async () => {
  if (currentref.current) {
    const base64 = currentref.current.getScreenshot({ type: "image/jpeg" });
    if (!base64) return;

    setimage(base64); 

    const byteString = atob(base64.split(',')[1]);
    const mimeString = base64.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([ab], { type: mimeString });
    const formData = new FormData();
    formData.append("image", blob, "attendence.jpg");

    try {
      const res = await fetch("http://localhost:8000/CheckingAttendence", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log("Server response:", data);
      if (data.result){
        console.log(data.result)
        setactive(true)

      }
    } catch (error) {
      console.error(" Upload error:", error);
    }
  }
};

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center flex-col">
        <div className="rounded-full w-[400px] h-[400px] border-1">
          <Webcam className="object-cover w-full h-full rounded-full" ref={currentref} />
        </div>
        <div>
          <button className="bg-theme mt-2 text-white px-3 py-2 text-sm capitalize" onClick={()=>registers()}>mark Attendence</button>
        </div>
        {
          active&&
          <div className="text-green-700">
            hey shamil
            </div>
        }
      </div>
    </>
  );
}
