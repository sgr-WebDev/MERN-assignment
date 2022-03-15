import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "./Form/FormikControl";
import axios from "axios";

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
const radioOptions = [
  { key: "Active", value: "Active" },
  { key: "Inactive", value: "Inactive" },
];

const Students = (props) => {
  const initialVal = () => {
    if (props.data !== undefined) {
      return {
        name: props.data.name,
        dob: null,
        school: props.data.school,
        class: props.data.class,
        division: props.data.division,
        status: props.data.status === true ? "Active" : "Inactive",
      };
    } else {
      return {
        name: "",
        dob: null,
        school: "",
        class: "",
        division: "",
        status: "",
      };
    }
  };
  return (
    <div className="ml-60 mt-16 p-5">
      {props.display === "edit" ? (
        <div>
          <h1 className="text-4xl border-b-2 p-2 font-semibold mb-5">Edit</h1>
        </div>
      ) : (
        <div>
          <h1 className="text-4xl border-b-2 p-2 font-semibold mb-5">
            Add Student
          </h1>
        </div>
      )}
      <div>
        <Formik
          initialValues={initialVal()}
          validationSchema={Yup.object({
            name: Yup.string().required("Name is required!!").max(30),
            dob: Yup.date().required("Date pf birth is required!!").nullable(),
            school: Yup.string().required("School is required!!"),
            class: Yup.string().required("Class is required!!"),
            division: Yup.string().required("Division is required!!"),
            status: Yup.string().required("Status is required!!"),
          })}
          onSubmit={(values) => {
            console.log({ ...values });
            if (props.display === "edit") {
              axios
                .put("/updateStudent", { ...values, _id: props.data._id })
                .then((data) => {})
                .catch((err) => alert(err));
            } else {
              axios
                .post("/addStudent", { ...values })
                .then((data) => console.log(data.data))
                .catch((err) => alert(err));
            }
          }}
        >
          {(formik) => (
            <Form>
              <FormikControl
                className=" ml-2 text-lg border-2 border-red-200 p-1 "
                control="input"
                label="Full Name"
                type="text"
                name="name"
              />
              <FormikControl
                className="text-lg border-2 border-red-200 p-1"
                control="date"
                label="Date of Birth"
                type="text"
                name="dob"
              />
              <FormikControl
                className="text-lg p-2"
                control="select"
                label="Select a School"
                name="school"
                options={dropdownSchool}
              />
              <FormikControl
                className="text-lg p-2"
                control="select"
                label="Select a Class"
                name="class"
                options={dropdownClass}
              />
              <FormikControl
                className="text-lg p-2"
                control="select"
                label="Select a Division"
                name="division"
                options={dropdownDivision}
              />
              <FormikControl
                className="ml-5"
                control="radio"
                label="Status"
                name="status"
                options={radioOptions}
              />
              <button
                type="submit"
                className="bg-red-400 px-10 py-2 text-2xl font-bold text-white cursor-pointer hover:bg-red-500 my-4"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Students;
