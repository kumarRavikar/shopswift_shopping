import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from "../styles/verifyEmail.module.css"
const VerifyEmail = () => {
  const [status, setStatus] = useState("Verifying your email...")
    const {token} = useParams()
    const navigate = useNavigate()
   const verifyEmail = async()=>{
   try {
     const res = await axios.post("http://localhost:5000/api/user/verify", {},{
       headers:{
         Authorization: `Bearer ${token}`
       }
     })
     if(res.data.success){
       setStatus("Verification Successful 🎉")
       setTimeout(()=>{
          navigate("/login")
       },3000)
     }
   } catch (error) {
     console.log(error)
     setStatus("Verification Failed ❌ Please try again.")
   }
   }
   useEffect(()=>{
    verifyEmail()
   },[token])
  return (
   <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.loader}></div>
        <h2 className={styles.title}>Email Verification</h2>
        <p className={styles.status}>{status}</p>
      </div>
    </div>
  )
}

export default VerifyEmail