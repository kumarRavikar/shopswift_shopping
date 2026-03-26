
import styles from "../src/styles/Contact.module.css"
//import { useAuth0 } from "@auth0/auth0-react"
export const Contact = () => {
  //const {user, isAuthenticated } = useAuth0()
  return (
    <section className={styles.contact}>
      <h1 className={styles.heading}>Contact Page</h1>
      <div className={styles.map}>
    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1716.3904762623058!2d83.00051271203185!3d25.288589693834236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1768743132289!5m2!1sen!2sin" 
    width="100%" 
    height="400" 
    style={{border:0 }}
    allowFullScreen="" 
    loading="lazy" 
    referrerPolicy="no-referrer-when-downgrade">
    </iframe>
    </div>
    <div className={styles.formWrapper}>
      <div>
        <form action="https://usebasin.com/f/ff0d83655055" method="POST" className={styles.form}> 
         <input type="text" 
         placeholder="User Name" 
         name="userName" 
          autoComplete = 'off' 
          
          required/>
          <input type="email" 
          name="email" 
          placeholder="Email"
           
          autoComplete="off" 
          required />
          <textarea name='Message' placeholder='Enter your Message' ></textarea>
          <input type='submit' value='send'/>
        </form>
      </div>
    </div>
    </section>
  )
}
