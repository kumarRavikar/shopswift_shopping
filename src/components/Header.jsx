
import { NavLink, Outlet } from 'react-router-dom'
import logo from "../assets/Photo/logo.png"
import Nav from './Nav'
import styles from '../styles/Header.module.css'
//import { UseProductContext } from '../contex/productContext'
const Header = () => {

  return (
    <>
    <header className={styles.header}>
        <NavLink to= '/' className={styles.logoLink}>
          <img src={logo} alt='Logo ' className={styles.logo}/>
        </NavLink>
       
        <Nav/>
    </header>
    
     <Outlet/>
     </>
  )
}

export default Header