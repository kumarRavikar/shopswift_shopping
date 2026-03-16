import React from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/login.module.css";
import { useState } from "react";
import axios from "axios";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [showpassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async(e)=>{
    e.preventDefault()
    setLoading(true)
    try {
       const res = await axios.post("http://localhost:5000/api/user/login",formData)
       if(res.data.success){
          navigate("/")
       }
    } catch (error) {
       console.log(error)
    }finally{
     setLoading(false)
  }
  }
  return (
     <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.card}>

        <h2 className={styles.title}>Welcome Back 👋</h2>
        <p className={styles.subtitle}>Login to your account</p>

        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="example@gmail.com"
          onChange={handleChange}
          required
          className={styles.input}
        />

        <div className={styles.passwordBox}>
          <input
            type={showpassword ? "text" : "password"}
            name="password"
            value={formData.password}
            placeholder="Enter a password"
            onChange={handleChange}
            required
            className={styles.input}
          />

          {showpassword ? (
            <IoEyeOff
              className={styles.icon}
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <IoEye
              className={styles.icon}
              onClick={() => setShowPassword(true)}
            />
          )}
        </div>

        <button type="submit" className={styles.button}>{ loading ? "Loading..." : "Login"}</button>

        <p className={styles.loginText}>
          Don't have an account?
          <Link to="/signup" className={styles.link}> Sign Up</Link>
        </p>

      </form>
    </div>
  );
};

export default Login;
