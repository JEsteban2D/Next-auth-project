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
        <div>
          <h1>Create an account</h1>
          <p>Enter your information to get started</p>
        </div>
        <div>
          <SignupForm />
        </div>
        <div>
          Already have an account?{" "}
          <Link className="underline" href="/auth/signin">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
