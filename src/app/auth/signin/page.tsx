'use client'
import React from "react";
import SigninForm from "./SigninForm";
import styles from "./SigninForm.module.css";

const page = () => {
  return (
    <div className={styles.pageSingup}>
      <div className={styles.containerPageForm}>
        <SigninForm />
      </div>
    </div>
  );
};

export default page;
