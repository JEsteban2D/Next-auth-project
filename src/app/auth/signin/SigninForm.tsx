"use client";
import React from "react";
import { LoginFormSchema } from "@/_lib/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
// import GenericInput from "@/app/components/generic-input/GenericInput";
import GenericButton from "@/app/components/generic-button/GenericButton";
import styles from "./SigninForm.module.css";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type SignupFormInputs = z.infer<typeof LoginFormSchema>;

const SigninForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>({
    resolver: zodResolver(LoginFormSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: SignupFormInputs) => {
    console.log(data);
    const res = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      }
    )
    if (!res) {
      console.error('No se pudo obtener una respuesta del servidor.');
      return;
    }
    if (res.error) {
      console.error('Error en el login:', res.error);

    } else {
      const sessionRes = await fetch("/api/auth/session");
      const session = await sessionRes.json();

      // Verificamos el rol del usuario y redirigimos
      if (session?.user?.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.form}>
        <div className={styles.containerInputs}>
          <label>Correo Electrónico</label>
          <input type="email" {...register("email")} />
          {errors.email && (
            <p className={styles.formError}>{errors.email.message}</p>
          )}
        </div>
        <div className={styles.containerInputs}>
          <label>Contraseña</label>
          <input type="password" {...register("password")} />
          {errors.password && (
            <p className={styles.formError}>{errors.password.message}</p>
          )}
        </div>
        <GenericButton type="submit">Login</GenericButton>
      </div>
    </form>
  );
};

export default SigninForm;
