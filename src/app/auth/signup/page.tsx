"use client";
import React from "react";
import SignupForm from "./SignupForm";
import styles from "./SignupForm.module.css";

const page = () => {

  return (
    <div className={styles.pageSingup}>
      <div className={styles.containerPageForm}>
        <SignupForm />
      </div>
    </div>
  );
};

export default page;
