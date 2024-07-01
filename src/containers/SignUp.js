import React from "react";
import { useNavigate } from "react-router-dom";
import { PostReq } from "../helpers";
import { toast } from "react-toastify";
import { ErrorMessage, Formik, Form, Field } from "formik";
import { RegistervalidationSchema } from "../helpers/yup";

const SignUp = ({ onToggle }) => {
  const initialValues = {
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    console.log("values", values);
    const response = await PostReq("auth/sign-up", values);
    if (!response.success) {
      toast.error(response.error);
    } else {
      navigate("/auth");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={RegistervalidationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, handleChange }) => (
            <Form>
              <div className="mb-4">
                <label className="block text-gray-400 mb-2" htmlFor="fullname">
                  Full Name
                </label>
                <Field
                  className="w-full px-3 py-2 text-black rounded"
                  type="text"
                  id="fullname"
                  name="fullname"
                  autoComplete="fullname"
                  onChange={handleChange}
                  required
                />
                {errors.fullname && (
                  <ErrorMessage
                    name="fullname"
                    component="div"
                    className="error"
                  />
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-400 mb-2" htmlFor="email">
                  Email
                </label>
                <Field
                  className="w-full px-3 py-2 text-black rounded"
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                  required
                />
                {errors.email && (
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error"
                  />
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-400 mb-2" htmlFor="password">
                  Password
                </label>
                <Field
                  className="w-full px-3 py-2 text-black rounded"
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handleChange}
                  required
                />
                {errors.password && (
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error"
                  />
                )}
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-400 mb-2"
                  htmlFor="confirmPassword"
                >
                  Confirm Password
                </label>
                <Field
                  className="w-full px-3 py-2 text-black rounded"
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  autoComplete="current-password"
                  onChange={handleChange}
                  required
                />
                {errors.confirmPassword && (
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="error"
                  />
                )}
              </div>
              <button
                type="submit"
                className="w-full py-2 text-white font-semibold rounded-lg bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-lg transform hover:scale-105 transition-transform"
              >
                Sign Up
              </button>
              <div className="mt-4 text-center">
                <span className="text-gray-400">Already have an account?</span>
                <button className="text-blue-500 ml-2" onClick={onToggle}>
                  Sign In
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUp;
