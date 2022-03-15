import React, { useEffect, useState } from "react";
import Table from "./Table";
import { IoMdNotificationsOutline } from "react-icons/io";
import { AiOutlineUser } from "react-icons/ai";
import Students from "./Students";
import { useLocation } from "react-router-dom";

const Dashboard = (props) => {
  const [display, setDisplay] = useState("students");
  const location = useLocation();
  useEffect(() => console.log(location.state), []);

  return (
    <div className="min-w-full min-h-screen">
      <nav className="fixed top-0 min-w-full shadow-md bg-white ">
        <div className="min-w-screen">
          <h1 className="text-xl border-2 border-pink-600 max-w-fit text-pink-600 px-10 py-2 shadow-md m-2 inline-block">
            Lead Logo
          </h1>
          <div className="float-right m-4 min-h-full">
            <IoMdNotificationsOutline className="inline-block text-3xl mx-4 text-pink-600" />
            <AiOutlineUser className="inline-block text-3xl mx-4 text-pink-600" />
            <span className="text-2xl text-pink-600 m-2">
              {location.state.userName}
            </span>
          </div>
        </div>
      </nav>
      <div className="fixed top-0 left-0 bg-white shadow-xl mt-16 text-xl w-60 min-h-screen border-t-2">
        <h1 className="px-5 py-2">Students</h1>
        <h1
          onClick={() => setDisplay("students")}
          className={`px-5 py-2 hover:bg-gray-300 hover:text-black cursor-pointer ${
            display === "students" ? "bg-blue-500 text-white" : " "
          }`}
        >
          -View Students
        </h1>
        <h1
          onClick={() => setDisplay("addStudents")}
          className={`px-5 py-2 hover:bg-gray-300 hover:text-black cursor-pointer ${
            display === "addStudents" ? "bg-blue-500 text-white" : " "
          }`}
        >
          -Add Students
        </h1>
      </div>
      <div className="data">
        {display === "students" ? (
          <div>
            <Table />
          </div>
        ) : (
          <div>
            <Students display="addStudents" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
