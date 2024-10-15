import Link from "next/link";
import React from "react";
import SignupForm from "./SignupForm";
// import Image from "next/image";
import styles from "./SignupForm.module.css";

const page = () => {
  //   const algo = "algo";
  return (
    <div className={styles.pageSingup}>
      <div>
        {/* <Image src={algo} alt="new image" /> */}
        IMAGEN
      </div>
      <div className={styles.containerPageForm}>
        <div className={styles.textSigninPage}>
          <h1>Crea una cuenta</h1>
          <p>Ingresa tu información para comenzar</p>
        </div>
        <div>
          <SignupForm />
        </div>
        <div>
          ¿Ya tienes una cuenta?{" "}
          <Link className="underline" href="/auth/signin">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
