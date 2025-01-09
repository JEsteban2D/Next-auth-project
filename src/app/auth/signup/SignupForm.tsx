"use client";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import GenericButton from "@/app/components/generic-button/GenericButton";
import styles from "./SignupForm.module.css";
import { CldUploadWidget } from "next-cloudinary";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { SignupFormSchema } from "@/_lib/definitions";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import QuestionForm from "./question-form/QuestionForm";

// type SignupFormInputs = z.infer<typeof SignupFormSchema>;

const SignupForm = () => {
  const [resource, setResource] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  const onSubmit = async (formData: any) => {
    setIsLoading(true);
    console.log("Enviando datos:", formData);
    const filteredAnswers = formData.answers.filter((answer: any) => answer !== null);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          answers: filteredAnswers,
          image: resource || null,
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        console.log("Usuario registrado con éxito");
        alert(
          "¡Registro Exitoso! Serás redirigido a la página de inicio de sesión."
        );
        router.push("/auth/signin");
      } else {
        console.error("Error al registrar el usuario");
      }
    } catch (error) {
      console.error("Error en la solicitud de registro:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.form}>
        <div className={styles.textSigninPage}>
          <h1>Crea una cuenta</h1>
          <p>Ingresa tu información para comenzar</p>
        </div>
        <div className={styles.containerInputs}>
          <label>Nombre</label>
          <input
            {...register("name")}
            className={styles.input}
            placeholder="Nombre"
          />
          {/* {errors.name && (
            <p className={styles.formError}>{errors.name.message}</p>
          )} */}
        </div>
        <div className={styles.containerInputs}>
          <label>Apellido</label>
          <input {...register("lastName")} placeholder="Apellido" className={styles.input} />
          {/* {errors.lastName && (
            <p className={styles.formError}>{errors.lastName.message}</p>
          )} */}
        </div>
        <div className={styles.containerInputs}>
          <label>Correo Electrónico</label>
          <input type="email" {...register("email")} placeholder="Correo Electronico" className={styles.input} />
          {/* {errors.email && (
            <p className={styles.formError}>{errors.email.message}</p>
          )} */}
        </div>
        <div className={styles.containerInputs}>
          <label>Contraseña</label>
          <input
            type="password"
            {...register("password")}
            placeholder="Contraseña"
            className={styles.input}
          />
          {/* {errors.password && (
            <p className={styles.formError}>{errors.password.message}</p>
          )} */}
        </div>
        <QuestionForm register={register} />
        <div className={styles.containerInputs}>
          <label>Imagen de Perfil</label>
          <CldUploadWidget
            uploadPreset="ml_default"
            onSuccess={(result) => {
              setResource((result.info as { url: string }).url);
            }}
          >
            {({ open }) => {
              return (
                <button
                  className={styles.uploadImage}
                  type="button"
                  onClick={() => open()}
                >
                  Subir una Imagen
                </button>
              );
            }}
          </CldUploadWidget>
        </div>
        <GenericButton type="submit" disabled={isLoading}>
          {isLoading ? "Enviando..." : "Registrarse"}
        </GenericButton>

        {isSuccess && (
          <p className={styles.successMessage}>Registro exitoso!</p>
        )}
        <div className={styles.linkTextFooter}>
          ¿Ya tienes una cuenta?{" "}
          <Link className={styles.link} href="/auth/signin">
            Login
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignupForm;
