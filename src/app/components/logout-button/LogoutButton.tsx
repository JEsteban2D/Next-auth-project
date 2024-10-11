'use client'
import React from "react";
import styles from "./LogoutButton.module.css";
import { signOut } from "next-auth/react";

const LogoutButton = () => {
  const handleClick = async () => {
    await signOut({
      callbackUrl: "/auth/signin",
    });
  };
  return (
    <button onClick={handleClick} className={styles.button}>
      Logout
    </button>
  );
};

export default LogoutButton;
