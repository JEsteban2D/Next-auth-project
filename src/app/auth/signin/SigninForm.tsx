"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import GenericButton from "@/app/components/generic-button/GenericButton";
import styles from "./SigninForm.module.css";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type SignupFormInputs = {
  email: string;
  password: string;
};

const SigninForm = () => {
  const [authError, setAuthError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>();

  const router = useRouter();

  const onSubmit = async (data: SignupFormInputs) => {
    setAuthError(null);
    console.log(data);
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (!res) {
      setAuthError("Error en el servidor.");
      return;
    }

    if (res.error) {
      setAuthError("Credenciales incorrectas. Intenta de nuevo.");
    } else {
      const sessionRes = await fetch("/api/auth/session");
      const session = await sessionRes.json();

      if (session?.user?.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    }
  };

  return (
    <div className={styles.form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formIn}>
          <div className={styles.textHeaderForm}>
            <h1>Inicia sesión en tu cuenta</h1>
            <p>Ingresa tu información para comenzar</p>
          </div>
          <div className={styles.containerInputs}>
            <label>Correo Electrónico</label>
            <input
              type="email"
              {...register("email")}
              className={styles.input}
            />
            {errors.email && (
              <p className={styles.formError}>{errors.email.message}</p>
            )}
          </div>
          <div className={styles.containerInputs}>
            <label>Contraseña</label>
            <input
              type="password"
              {...register("password")}
              className={styles.input}
            />
            {errors.password && (
              <p className={styles.formError}>{errors.password.message}</p>
            )}
          </div>
          {authError && <p className={styles.authError}>{authError}</p>}
          <GenericButton type="submit">Login</GenericButton>
          <div className={styles.linkTextFooter}>
            ¿Aun no tienes una cuenta?{" "}
            <Link className={styles.link} href="/auth/signup">
              Register
            </Link>
          </div>
        </div>
      </form>
      <div className={styles.separator}>
        <hr className={styles.lineSeparator} />
        O continuar con
        <hr className={styles.lineSeparator} />
      </div>
      <button
        className={styles.googleButton}
        onClick={() => signIn("google", { callbackUrl: `/dashboard` })}
      >
        Iniciar sesión con Google
      </button>
    </div>
  );
};

export default SigninForm;
