import SigninForm from "./auth/signin/SigninForm";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div>
      <main className={styles.mainPage}>
        <div className={styles.containerPageForm}>
          <SigninForm />
        </div>
      </main>
    </div>
  );
}
