import Link from "next/link";
import SigninForm from "./auth/signin/SigninForm";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div>
      <main className={styles.mainPage}>
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
      </main>
    </div>
  );
}
