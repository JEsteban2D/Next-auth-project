import React from "react";
import LogoutButton from "../logout-button/LogoutButton";
import { auth } from "../../../../auth";
import styles from "./Navbar.module.css";

const Navbar = async () => {
  const session = await auth();
  return (
    <header className={styles.header}>
      {session ? (<h1>Profile</h1>) : <h1>Profile</h1>}
      {session ? (
        <div className={styles.welcome}>
          <div className={styles.welcome}>
            <h2>bienvenido</h2>
            <h2>{session.user.name}</h2>
          </div>
          <LogoutButton />
        </div>
      ) : null}
    </header>
  );
};

export default Navbar;
