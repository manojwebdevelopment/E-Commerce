import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { successMessage, errorMessage } from "../Component/ToastMessage";

export default function Signup() {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = user;
    if (!name || !email || !password) {
      return errorMessage("Please fill all the fields");
    }
    try {
      const url = "http://localhost:8000/auth/signup";

      const responce = await fetch(url, {
        method: "POST",
        headers:{
          "Content-Type": "Application/JSON"
        },
        body: JSON.stringify(user)
       });

       const jsonData = await responce.json();

       const {message , success, error} = jsonData;
       if(success){
        successMessage(message);
        setTimeout(() =>{
          navigate("/login");
        }, 1000);
       }else if(error){
          errorMessage(message);
       }else if(!success){
          errorMessage(message);
       }else{
          errorMessage("Something went wrong");
       }
  }catch (error) {
    errorMessage(error);
  };
};

return (
  <div className="container mt-5">
    <div className="row justify-content-center">
      <div className="col-md-5">
        <div className="card shadow p-4">
          <h2 className="text-center mb-4">Signup</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Enter your name"
                required
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter your email"
                required
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Create a password"
                required
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Sign Up</button>
          </form>
          <p className="text-center mt-3">
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
    <ToastContainer />
  </div>
);
}
