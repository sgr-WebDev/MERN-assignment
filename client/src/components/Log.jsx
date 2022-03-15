import React from "react";
import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "./Form/FormikControl";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Log = () => {
  const [display, setDisplay] = useState("login");
  const navigate = useNavigate();

  if (display === "login") {
    return (
      <div className="min-w-full min-h-screen grid items-center justify-center">
        <div className="bg-gray-200 p-10">
          <h2 className="text-3xl font-mono mb-5">Login to Your Account</h2>
          <div>
            <Formik
              initialValues={{
                eMail: "",
                password: "",
              }}
              validationSchema={Yup.object({
                eMail: Yup.string().required("Email is required!!"),
                password: Yup.string()
                  .required("password is required!!")
                  .min(8),
              })}
              onSubmit={(values) => {
                axios
                  .post("/login", { ...values })
                  .then((data) => {
                    if (data.status === 201) {
                      navigate("/students", { state: { ...data.data } });
                    } else {
                      alert(data.data);
                    }
                  })
                  .catch((err) => console.log(err));
              }}
            >
              {(formik) => (
                <Form>
                  <FormikControl
                    className="min-w-full text-2xl border-2 border-red-300 p-2"
                    control="input"
                    label="E-mail Id/ Phone Number"
                    type="text"
                    name="eMail"
                  />
                  <FormikControl
                    className="min-w-full text-2xl border-2 border-red-500 p-2"
                    control="input"
                    label="Password"
                    type="password"
                    name="password"
                  />
                  <button
                    type="submit"
                    className="bg-red-400 px-10 py-2 text-2xl font-bold text-white cursor-pointer hover:bg-red-500 min-w-full my-4"
                  >
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
            <div className="text-center cursor-pointer text-blue-600 hover:text-blue-800 underline">
              <span>Forgot Password</span>
              <span> / </span>
              <span onClick={() => setDisplay("createAccount")}>
                Create New Account
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (display === "createAccount") {
    return (
      <div className="min-w-full min-h-screen grid items-center justify-center">
        <div className="bg-gray-200 p-10">
          <h2 className="text-3xl font-mono mb-5">Create a new Account</h2>
          <div>
            <Formik
              initialValues={{
                eMail: "",
                password: "",
              }}
              validationSchema={Yup.object({
                eMail: Yup.string().required("Email is required!!"),
                password: Yup.string()
                  .required("password is required!!")
                  .min(8),
              })}
              onSubmit={(values) => {
                axios
                  .post("/addAccount", values)
                  .then((data) => alert(data.data))
                  .catch((err) => alert(err));
              }}
            >
              {(formik) => (
                <Form>
                  <FormikControl
                    className="min-w-full text-2xl border-2 border-red-300 p-2"
                    control="input"
                    label="E-mail Id/ Phone Number"
                    type="text"
                    name="eMail"
                  />
                  <FormikControl
                    className="min-w-full text-2xl border-2 border-red-500 p-2"
                    control="input"
                    label="Password"
                    type="password"
                    name="password"
                  />
                  <button
                    type="submit"
                    className="bg-red-400 px-10 py-2 text-2xl font-bold text-white cursor-pointer hover:bg-red-500 min-w-full my-4"
                  >
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
            <div className="text-center cursor-pointer text-blue-600 hover:text-blue-800 underline">
              <span onClick={() => setDisplay("login")}>Login Page</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Log;
