import React, { useState } from 'react'
import { IoEye,IoEyeOff  } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import styles from "../styles/signup.module.css"
import axios from 'axios';
import { useToast } from '../contex/ToastContext';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName:'', lastName:'', email:'',password:''
  })
  const [loading, setLoading] = useState(false)
  const {showToast} = useToast()
  const navigate = useNavigate()
  const handleChange =(e)=>{
    const {name, value} = e.target;
    setFormData((prev)=>({
       ...prev,[name]:value
    }))
  }
 const handleSubmit= async(e)=>{
     e.preventDefault()
     setLoading(true)
     try {
      const res = await axios.post("http://localhost:5000/api/user/register",formData)
      if(res.data.success){
        showToast("User Registered Successful", "success")
         navigate('/verify')
      }
      else{
        showToast("user already registered","error")
      }
     } catch (error) {
       alert(error.response?.data?.message || "Something went wrong");
     }finally{
      setLoading(false)
     }
 }
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Create Account</h2>

        <label className={styles.label}>First Name</label>
        <input
          type="text"
          name="firstName"
          placeholder="John"
          value={formData.firstName}
          onChange={handleChange}
          required
          className={styles.input}
        />

        <label className={styles.label}>Last Name</label>
        <input
          type="text"
          name="lastName"
          placeholder="Doe"
          value={formData.lastName}
          onChange={handleChange}
          required
          className={styles.input}
        />

        <label className={styles.label}>Email</label>
        <input
          type="email"
          name="email"
          placeholder="example23@gmail.com"
          value={formData.email}
          onChange={handleChange}
          required
          className={styles.input}
        />

        <div className={styles.passwordContainer}>
          <label className={styles.label}>Password</label>

          <div className={styles.passwordInput}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
              className={styles.input}
            />

            {showPassword ? (
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
        </div>

        <button type="submit" className={styles.button}>
         {loading? "Loading..." : "Sign Up"}
        </button>

        <p className={styles.loginText}>
          Already have an account? Go to{" "}
          <Link to="/login" className={styles.link}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};


export default SignUp