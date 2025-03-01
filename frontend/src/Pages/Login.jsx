import React, { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { successMessage, errorMessage } from "../Component/ToastMessage";

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = credentials;
    if (!email || !password) {
      return errorMessage("Please fill all the fields");
    };

    try {
      const url = "http://localhost:8000/auth/login";
      const responce = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(credentials)
      });

      const jsonData = await responce.json();
      // console.log(jsonData);
      const {message, success, token, error} = jsonData;
      if(success){
        successMessage(message);
        localStorage.setItem("token", token);
        setTimeout(() =>{
          navigate("/");
        }, 1000);
      }else if(error){
        errorMessage(error);
      }else if(!success){
        errorMessage(message);
      }else{
        errorMessage("Something went wrong");
        }

    } catch (error) {
      errorMessage(error);
    }

  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow p-4">
            <h2 className="text-center mb-4">Login</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={credentials.email}
                  
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={credentials.password}
                  placeholder="Enter your password"
                  
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn btn-success w-100">Login</button>
            </form>
            <p className="text-center mt-3">
              Don't have an account? <a href="/signup">Sign up</a>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}
