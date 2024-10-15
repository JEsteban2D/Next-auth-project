import React from "react";
import SigninForm from "./SigninForm";
import styles from "./SigninForm.module.css";
import Link from "next/link";

const page = () => {
  return (
    <div className={styles.pageSingup}>
      <div>IMAGEN</div>
      <div className={styles.containerPageForm}>
        <div>
          <h1>Inicia sesión en tu cuenta</h1>
          <p>Ingresa tu información para comenzar</p>
        </div>
        <div>
          <SigninForm />
        </div>
        <div>
          ¿Aun no tienes una cuenta?{" "}
          <Link className="underline" href="/auth/signup">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
