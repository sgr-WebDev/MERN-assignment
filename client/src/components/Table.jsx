import React, { useState, useEffect } from "react";
import Students from "./Students";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { AiTwotoneEdit } from "react-icons/ai";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { Formik, Form } from "formik";
import FormikControl from "./Form/FormikControl";
import moment from "moment";

const dropdownSchool = [
  { key: "Select an option", value: "" },
  { key: "School-1", value: "School-1" },
  { key: "School-2", value: "School-2" },
  { key: "School-3", value: "School-3" },
  { key: "School-4", value: "School-4" },
  { key: "School-5", value: "School-5" },
  { key: "School-6", value: "School-6" },
  { key: "School-7", value: "School-7" },
  { key: "School-8", value: "School-8" },
  { key: "School-9", value: "School-9" },
  { key: "School-10", value: "School-10" },
];
const dropdownClass = [
  { key: "Select an option", value: "" },
  { key: "Class-1", value: "Class-1" },
  { key: "Class-2", value: "Class-2" },
  { key: "Class-3", value: "Class-3" },
  { key: "Class-4", value: "Class-4" },
  { key: "Class-5", value: "Class-5" },
  { key: "Class-6", value: "Class-6" },
  { key: "Class-7", value: "Class-7" },
  { key: "Class-8", value: "Class-8" },
  { key: "Class-9", value: "Class-9" },
  { key: "Class-10", value: "Class-10" },
];
const dropdownDivision = [
  { key: "Select an option", value: "" },
  { key: "A", value: "A" },
  { key: "B", value: "B" },
  { key: "C", value: "C" },
  { key: "D", value: "D" },
  { key: "E", value: "E" },
  { key: "F", value: "F" },
  { key: "G", value: "G" },
  { key: "H", value: "H" },
  { key: "I", value: "I" },
  { key: "J", value: "J" },
  { key: "K", value: "K" },
  { key: "L", value: "L" },
];

const Table = (props) => {
  const [update, setUpdate] = useState(true);
  const [filter, setFilter] = useState({
    name: "",
    school: "",
    class: "",
    division: "",
  });
  const [display, setDisplay] = useState("table");
  const [edit, setEdit] = useState({});
  const [data, setData] = useState([]);
  const location = useLocation();
  useEffect(() => {
    const obj = location.state;
    axios
      .post("/allStudents", { _id: obj._id })
      .then((data) => {
        setData(data.data);
      })
      .catch((err) => console.log(err));
  }, [update]);

  if (display === "table") {
    return (
      <>
        <div className="ml-60 mt-28">
          <div>
            <Formik
              initialValues={{
                name: "",
                school: "",
                class: "",
                division: "",
              }}
              onSubmit={(values) => {
                setFilter({ ...values });
              }}
            >
              {(formik) => (
                <Form className="grid grid-cols-5 m-2 items-center justify-center">
                  <FormikControl
                    className="text-lg border-2 border-red-200 p-1 "
                    control="input"
                    placeholder="Name"
                    type="text"
                    name="name"
                  />
                  <FormikControl
                    className="text-lg p-2"
                    control="select"
                    placeholder="Select a School"
                    name="school"
                    options={dropdownSchool}
                  />
                  <FormikControl
                    className="text-lg p-2"
                    control="select"
                    placeholder="Select a Class"
                    name="class"
                    options={dropdownClass}
                  />
                  <FormikControl
                    className="text-lg p-2"
                    control="select"
                    placeholder="Select a Division"
                    name="division"
                    options={dropdownDivision}
                  />
                  <button
                    type="submit"
                    className="bg-red-400 px-5 py-2 text-xl font-bold text-white cursor-pointer hover:bg-red-500 w-fit"
                  >
                    Search
                  </button>
                </Form>
              )}
            </Formik>
          </div>
          <table
            id="studentsTable"
            className="table-auto border-collapse border border-slate-500 rounded-2xl ml-5 text-lg bg-white shadow-lg"
          >
            <thead>
              <tr>
                <th className="border border-slate-600 px-2 py-1 bg-sky-300">
                  ID
                </th>
                <th className="border border-slate-600 px-2 py-1 bg-sky-300 w-64">
                  Name
                </th>
                <th className="border border-slate-600 px-2 py-1 bg-sky-300">
                  Age
                </th>
                <th className="border border-slate-600 px-2 py-1 bg-sky-300">
                  School
                </th>
                <th className="border border-slate-600 px-2 py-1 bg-sky-300">
                  Class
                </th>
                <th className="border border-slate-600 px-2 py-1 bg-sky-300">
                  Division
                </th>
                <th className="border border-slate-600 px-2 py-1 bg-sky-300">
                  Status
                </th>
                <th className="border border-slate-600 px-2 py-1 bg-sky-300">
                  Edit/Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {data
                .filter((val) => {
                  if (filter.name === "") {
                    return val;
                  } else if (
                    val.name.toLowerCase().includes(filter.name.toLowerCase())
                  ) {
                    return val;
                  }
                })
                .filter((val) => {
                  if (filter.class === "") {
                    return val;
                  } else if (
                    val.class.toLowerCase().includes(filter.class.toLowerCase())
                  ) {
                    return val;
                  }
                })
                .filter((val) => {
                  if (filter.school === "") {
                    return val;
                  } else if (
                    val.school
                      .toLowerCase()
                      .includes(filter.school.toLowerCase())
                  ) {
                    return val;
                  }
                })
                .filter((val) => {
                  if (filter.division === "") {
                    return val;
                  } else if (
                    val.division
                      .toLowerCase()
                      .includes(filter.division.toLowerCase())
                  ) {
                    return val;
                  }
                })
                .sort((a, b) => {
                  return a.name.localeCompare(b.name);
                })
                .map((val, index) => {
                  return (
                    <tr key={val._id}>
                      <td className="border border-slate-700 px-2 py-1">
                        {index + 1}
                      </td>
                      <td className="border border-slate-700 px-2 py-1">
                        {val.name}
                      </td>
                      <td className="border border-slate-700 px-2 py-1">
                        {moment().diff(val.dob, "years")}
                      </td>
                      <td className="border border-slate-700 px-2 py-1">
                        {val.school}
                      </td>
                      <td className="border border-slate-700 px-2 py-1">
                        {val.class}
                      </td>
                      <td className="border border-slate-700 px-2 py-1">
                        {val.division}
                      </td>
                      <td className="border border-slate-700 px-2 py-1">
                        {val.status === true ? "Active" : "Incative"}
                      </td>
                      <td className="border border-slate-700 px-2 py-1">
                        <button
                          onClick={() => {
                            setEdit({ ...val });
                            setDisplay("edit");
                          }}
                          className="bg-green-600 text-white hover:bg-green-700 p-2 rounded-lg text-xl m-1"
                        >
                          <AiTwotoneEdit />
                        </button>
                        <button
                          onClick={() => {
                            axios
                              .delete("/delete/" + val._id)
                              .then((data) => {
                                update === true
                                  ? setUpdate(false)
                                  : setUpdate(true);
                              })
                              .catch((err) => console.log(err));
                          }}
                          className="bg-red-600 text-white hover:bg-red-700 p-2 rounded-lg text-xl m-1"
                        >
                          <MdDelete />
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <ReactHTMLTableToExcel
            className="download-table-xls-button bg-green-700 px-6 py-1 text-xl font-bold text-white cursor-pointer hover:bg-green-800 m-4"
            table="studentsTable"
            filename="StudentsTablexls"
            sheet="Students"
            buttonText="Download Excel"
          />
        </div>
      </>
    );
  } else if (display === "edit") {
    return <Students display="edit" data={edit} />;
  }
};

export default Table;
