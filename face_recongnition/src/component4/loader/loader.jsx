import React from "react";
import { SyncLoader } from "react-spinners";
import { useSelector } from "react-redux";
export default function loader() {
  const isloader = useSelector((state) => state.auth.isloader);

  return (
  <div className="fixed inset-0 w-full h-full flex justify-center items-center bg-white bg-opacity-30">


 
      <SyncLoader 
        color="blue"
        cssOverride={{
          
         
          margin: "0 auto",
          borderColor: "blue",
        }}
        size={30}
      />
    </div>
  );
}
