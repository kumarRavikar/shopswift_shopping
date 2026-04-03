import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FiShoppingCart } from "react-icons/fi";
import { CgMenuMotion,CgClose  } from "react-icons/cg";
import styles from "../styles/Nav.module.css";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUser } from '../redux/userSlice';
const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false);
  const {total_items} = useSelector((state)=>state.addToCart);
  const accessToken = localStorage.getItem('accessToken')
  const dispatch = useDispatch()
  const {user} = useSelector((state)=>state.user)
     const logOutHandler = async()=>{
      try {
         const res = await axios.post(`https://backend-shopswift-shopping.onrender.com/api/user/logout`,{},{
          headers:{
            Authorization: `Bearer ${accessToken}`
          }
         })
         if(res.data.success){
            dispatch(setUser(null))
         }
      } catch (error) {
         console.log("from logOut:",error)
      }
     }
  return (
   <>
   <nav className={styles.nav}>
      {/* Nav Links */}
      <div className={`${styles.links} ${menuOpen ? styles.showMenu : ""}`}>
        <NavLink to="/" className={styles.link} onClick={closeMenu}>
          Home
        </NavLink>

        <NavLink to="/about" className={styles.link} onClick={closeMenu}>
          About
        </NavLink>

        <NavLink to="/contact" className={styles.link} onClick={closeMenu}>
          Contact
        </NavLink>

        <NavLink to="/products" className={styles.link} onClick={closeMenu}>
          Products
        </NavLink>
        {
          user && (<NavLink to={`/profile/${user._id}`} onClick={closeMenu} className={styles.link}> Welcome {user.firstName}</NavLink>)
        }
        
        
        <NavLink to="/cart" className={styles.link} onClick={closeMenu}>
          <div className={styles.cartWrapper}>
          
              <FiShoppingCart className={styles.cartIcon} />
            <span className={styles.cartCount}>{total_items}</span>
           
          </div>
        </NavLink>
        {
          user ? <NavLink onClick={logOutHandler} className={styles.link}>LogOut</NavLink>:
          <NavLink to="/login" className={styles.link} onClick={closeMenu}>
          LogIn
        </NavLink>
        }
      </div>

      {/* Menu Button (mobile only) */}
      <div className={styles.menuIcon} onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <CgClose /> : <CgMenuMotion />}
      </div>
    </nav>
   </>

  )
}

export default Nav