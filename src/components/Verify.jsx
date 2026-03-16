import React from "react";
import styles from "../styles/verify.module.css";

const Verify = () => {
  return (
     <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Verify Your Email</h2>

        <p className={styles.text}>
          We have sent a verification link to your email.  
          Please check your inbox and follow the instructions.
        </p>

        {/* <button className={styles.button}>
          Resend Verification Email
        </button> */}
      </div>
    </div>
  );
};

export default Verify;