"use client"
import React from "react";
import LogoutButton from "../logout-button/LogoutButton";
import styles from "./Navbar.module.css";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  
  return (
    <header className={styles.header}>
      {session ? (<h1>Profile</h1>) : <h1>Home</h1>}
      {session ? (
        <div className={styles.welcome}>
          <div className={styles.welcome}>
            <h2>bienvenido</h2>
            <h2>{session.user.name}</h2>
          </div>
          <LogoutButton/>
        </div>
      ) : null}
    </header>
  );
};

export default Navbar;
