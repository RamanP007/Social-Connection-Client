import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GetReq, PostReq, isUserLoggedIn } from "../helpers";
import { toast } from "react-toastify";
import { ErrorMessage, Formik } from "formik";
import { LoginvalidationSchema } from "../helpers/yup";

const SignIn = ({ onToggle }) => {
  const initialValues = {
    email: "",
    password: "",
  };
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const response = await PostReq("auth/sign-in", values);
    if (!response.success) {
      toast.error(response.error);
    } else {
      const response = await GetReq("user/me");
      if (!response.success) {
        toast.error(response.error);
      } else {
        navigate("/");
      }
    }
  };

  useEffect(() => {
    if (isUserLoggedIn()) {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={LoginvalidationSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => {
            const { values, handleSubmit, errors, handleChange } = formik;
            return (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-400 mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="w-full px-3 py-2 text-black rounded"
                    type="email"
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={(e) => handleChange(e)}
                    value={values.email}
                    required
                  />
                </div>
                {errors.email && (
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error"
                  />
                )}
                <div className="mb-4">
                  <label
                    className="block text-gray-400 mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="w-full px-3 py-2 text-black rounded"
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={(e) => handleChange(e)}
                    value={values.password}
                    required
                  />
                </div>
                {errors.password && (
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error"
                  />
                )}
                <button
                  className="w-full py-2 text-white font-semibold rounded-lg bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-lg transform hover:scale-105 transition-transform"
                  type="submit"
                >
                  Sign In
                </button>
                <div className="mt-4 text-center">
                  <span className="text-gray-400">Don't have an account?</span>
                  <button className="text-blue-500 ml-2" onClick={onToggle}>
                    Sign Up
                  </button>
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default SignIn;
