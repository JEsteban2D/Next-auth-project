import React from 'react'
import SigninForm from './SigninForm'
import styles from './SigninForm.module.css'
import Link from 'next/link'

const page = () => {
  return (
    <div className={styles.pageSingup}>
    <div>
      {/* <Image src={algo} alt="new image" /> */}
      IMAGEN
    </div>
    <div className={styles.containerPageForm}>
      <div>
        <h1>Enter in your account</h1>
        <p>Enter your information to get started</p>
      </div>
      <div>
        <SigninForm />
      </div>
      <div>
        Already have an account?{" "}
        <Link className="underline" href="/auth/signup">
          Login
        </Link>
      </div>
    </div>
  </div>
  )
}

export default page