import React, { useRef, useState } from 'react'
import styles from "../styles/Profile.module.css"
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '../contex/ToastContext';
import axios from "axios"
import { setUser } from '../redux/userSlice';
export const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const {userId} = useParams()
  const {showToast} = useToast()
  const {user} = useSelector((store)=>store.user)
  const fileRef = useRef()
 const [updateUser, setUpdateUser] = useState({
    firstName:user?.firstName,
    lastName:user?.lastName,
    email: user?.email,
    phoneNo: user?.phoneNo,
    city:user?.city,
    address:user?.address,
    zipCode:user?.zipCode,
    profilePic:user?.profilePic,
    role:user?.role
 })
 const [file, setFile] = useState(null)
 const [loading, setLoading] = useState(false)
 const dispatch = useDispatch()
 const handleChange =(e)=>{
    setUpdateUser({...updateUser,[e.target.name]:e.target.value})
 }
 const handleFileChange=(e)=>{
    const seletedFile = e.target.files[0];
    setFile(seletedFile)
    setUpdateUser({...updateUser, profilePic:URL.createObjectURL(seletedFile)}) // only preview 
 }
 const handleSubmit = async(e)=>{
    e.preventDefault()
    setLoading(true)
    const accessToken = localStorage.getItem("accessToken")
    try {
       //using FromData for sending text and file
       const formData = new FormData();
       formData.append("firstName", updateUser.firstName)
       formData.append("lastName", updateUser.lastName)
       formData.append("email", updateUser.email)
       formData.append("phoneNo", updateUser.phoneNo)
       formData.append("city", updateUser.city)
       formData.append("zipCode", updateUser.zipCode)
       formData.append("role", updateUser.role)
       formData.append("address", updateUser.address)
       if(file){
        //image file from backend multer
        formData.append("file",file) 
       }
       const res = await axios.put(`https://backend-shopswift-shopping.onrender.com/api/user/update/${userId}`,formData,{
        headers:{
          Authorization:`Bearer ${accessToken}`,
          "Content-Type":"multipart/form-data"
        }
       })
       if(res.data.success){
         showToast("Profile updated successfull", "success")
        dispatch(setUser(res.data.user))
        setLoading(false)
       }
    } catch (error) {
      console.log(error)
       showToast("Faild to update Profile","Error")
    }
    
 }
  return (
    <div className={styles.container}>
      
      {/* Toggle */}
      <div className={styles.toggleWrapper}>
        <button
          className={`${styles.toggleBtn} ${
            activeTab === "profile" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("profile")}
        >
          Profile
        </button>

        <button
          className={`${styles.toggleBtn} ${
            activeTab === "orders" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("orders")}
        >
          Orders
        </button>
      </div>

      {/* Card */}
      <div className={styles.card}>
        {activeTab === "profile" ? (
          <div className={styles.fadeIn}>
            
            {/* Profile Image */}
            <div className={styles.imageWrapper}>
              <img
                src={
                 
                  updateUser?.profilePic || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                }
                alt="profile"
                className={styles.profileImg}
              />
              <button
                className={styles.uploadBtn}
                 onClick={()=>fileRef.current.click()}
              >
                Update Image
              </button>
              <input
                type="file"
                accept='image/*'
                ref={fileRef}
                className={styles.hiddenInput}
                onChange={handleFileChange}
              />
            </div>

            {/* Form */}
            <form className={styles.form} onSubmit={handleSubmit}>
              
              <div className={styles.row}>
                <input type="text" placeholder="First Name" name='firstName' 
                value={updateUser?.firstName} 
                onChange={handleChange}
                />
                <input type="text" placeholder="Last Name"  name='lastName' 
                value={updateUser?.lastName}
                onChange={handleChange}
                />
              </div>

              <input
                type="email"
                value={updateUser?.email}
                disabled
                className={styles.disabledInput}
              />

              <input type="tel" placeholder="Phone Number" name='phoneNo'
               value={updateUser?.phoneNo}
               onChange={handleChange}
               />
              <input type="text" placeholder="Address" name='address' 
              value={updateUser?.address}
              onChange={handleChange} 
              />

              <div className={styles.row}>
                <input type="text" placeholder="City" name='city' 
                value={updateUser?.city}
                onChange={handleChange}
                 />
                <input type="text" placeholder="Zip Code" name='zipCode' 
                value={updateUser?.zipCode}
                onChange={handleChange}
                />
              </div>

              <button type="submit" className={styles.submitBtn}>
                {loading ? "Loading..." : "Update Profile"}
              </button>
            </form>
          </div>
        ) : (
          <div className={styles.fadeIn}>
            <h2>My Orders</h2>
            <ul>
              <li>Order #1234 - Delivered</li>
              <li>Order #5678 - Shipped</li>
              <li>Order #9101 - Processing</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
