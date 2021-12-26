import axios from "axios";
import "./style.css";
import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { set } from "react-ga";

const Login = (props) => {
  // Mian
  const [loginToggle, setLoginToggle] = useState(false);
  const [login, setLogin] = useState(false);
  const [name, setName] = useState("");
  const [email, SetEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resMessage, setResMessage] = useState("");
  const [forgetPassword, setForgetPassword] = useState(false);
  const [forgetEmail, setForgetEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetResponse, setResetResponse] = useState("");

  const LoginHandler = async (e) => {
    e.preventDefault();
    if (email.length === 0 || password.length === 0) {
      setResMessage("Empty Feilds");
      return;
    }
    const data = { email: email, password: password };
    try {
      const response = await axios.post("/login", data);
      setLogin(response.data["success"]);
      props.setLogin(response.data["success"]);
      props.setCurrentUser(response.data["user"]);
      setResMessage(response.data["msg"]);
    } catch (error) {
      console.log(error.message);
    }
  };
  const SignUpHandler = async (e) => {
    e.preventDefault();

    if (name.length === 0 || email.length === 0 || password.length === 0) {
      setResMessage("Empty Feilds");
      return;
    }
    const data = { name: name, email: email, password: password };
    try {
      const response = await axios.post("/userReg", data);
      setResMessage(response.data["msg"]);
      setLoginToggle(!response.data["success"]);
      // console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  // Forget Email Handler

  const forgetEmailHanlder = async (e) => {
    setResetResponse("");
    e.preventDefault();
    if (forgetEmail.length === 0) {
      return;
    }
    const response = await axios.put("/resetpassword", {
      email: forgetEmail,
      password: newPassword,
    });
    setResetResponse(response.data["msg"]);
  };

  // Eof

  {
    if (login) {
      return <Redirect to="/" />;
    } else {
      return (
        <div className="login min-h-screen flex justify-center items-center ">
          <div className=" h-auto w-11/12 px-2 py-4 my-2 sm:w-2/3 md:w-2/3: lg:w-1/3 xl:w-3/12 bg-white rounded-sm shadow-lg">
            <Link to="/">
              <div className="flex justify-start">
                <div className="flex items-center cursor-pointer">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  <p>Home</p>
                </div>
              </div>
            </Link>
            {/* this is used to increase the space */}
            <div className="  border-transparent md:my-8"></div>
            {/* End of Space */}
            {forgetPassword ? (
              // Forget password
              <div className="flex justify-center  ">
                <div className="flex flex-col my-8 items-center w-full">
                  <p className="text-center text-lg mt-4">Reset Password</p>

                  <input
                    className="border border-gray-400 rounded-sm my-1 py-1 px-2  text-sm w-3/4 outline-none"
                    type="text"
                    placeholder="Enter Email Adresss"
                    onChange={(e) => {
                      setForgetEmail(e.target.value);
                    }}
                    value={forgetEmail}
                  ></input>
                  <input
                    className="border border-gray-400 rounded-sm my-1 py-1 px-2  text-sm w-3/4 outline-none"
                    type="password"
                    placeholder="Enter New Password"
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                    }}
                  ></input>

                  <button
                    className="text-white bg-blue-500 font-medium w-2/3  py-1 rounded-md my-2"
                    onClick={forgetEmailHanlder}
                  >
                    Continue
                  </button>
                  <p className="text-center p-1  my-2" text-gray-700 text-xs>
                    {resetResponse}
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <div className="text-center text-2xl mt-4 mb-8 text-gray-800">
                  {loginToggle ? "Sign Up" : "Login"}
                </div>
                <div className="box-border ">
                  <form>
                    {loginToggle
                      ? (function () {
                          return (
                            <div className="box-border p-1 my-1 flex justify-center">
                              <input
                                className="bbrder w-full md:w-5/6 lg:w-5/6 p-2 rounded-sm outline-none text-sm bg-gray-100"
                                type="text"
                                placeholder="Name"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                              ></input>
                            </div>
                          );
                        })()
                      : false}

                    <div className="box-border p-1 my-1 flex justify-center">
                      <input
                        className=" border border-blue-300 w-full  md:w-5/6 lg:w-5/6 p-2 rounded-sm outline-none text-sm bg-white "
                        type="email"
                        placeholder="Email"
                        onChange={(e) => SetEmail(e.target.value)}
                        value={email}
                      ></input>
                    </div>
                    <div className=" box-border p-1 my-1 flex justify-center">
                      <input
                        className="border border-blue-300 w-full md:w-5/6 lg:w-5/6 p-2 rounded-sm outline-none text-sm bg-white "
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                      ></input>
                    </div>
                    <div className=" flex justify-end p-1">
                      {loginToggle ? (
                        false
                      ) : (
                        <a
                          className="text-xs my-1 text-gray-600"
                          href="#"
                          onClick={() => {
                            setForgetPassword(true);
                          }}
                        >
                          Forget Password?
                        </a>
                      )}
                    </div>
                    <div className="flex justify-center p-2 my-1">
                      <button
                        className="login__btn w-2/3 md:w-1/2 py-2  bg-blue-500 rounded-md text-white"
                        onClick={loginToggle ? SignUpHandler : LoginHandler}
                      >
                        {loginToggle ? "Sign Up" : "Login"}
                      </button>
                    </div>

                    <p className="w-full text-center p-1 text-gray-700">
                      {resMessage}
                    </p>
                  </form>
                </div>
              </div>
            )}

            {/* spacer */}
            <div className="border border-transparent md:my-8 lg:my-12"></div>
            {/* End of spacer  */}

            {forgetPassword ? (
              false
            ) : (
              <div className=" mt-8 flex flex-col items-center text-gray-500">
                <p className="text-xs">
                  Or {loginToggle ? "Login" : "Sign Up"} Using
                </p>

                <span
                  className="font-semibold text-sm cursor-pointer text-gray-800"
                  onClick={() => {
                    setLoginToggle(!loginToggle);
                  }}
                >
                  {loginToggle ? "LOGIN" : "SIGN UP"}
                </span>
              </div>
            )}
          </div>
        </div>
      );
    }
  }
};

export default Login;
