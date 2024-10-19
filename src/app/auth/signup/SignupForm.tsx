"use client";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import GenericButton from "@/app/components/generic-button/GenericButton";
import styles from "./SignupForm.module.css";
import { CldUploadWidget } from "next-cloudinary";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SignupFormSchema } from "@/_lib/definitions";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type SignupFormInputs = z.infer<typeof SignupFormSchema>;

const SignupForm = () => {
  const [resource, setResource] = useState<string | null>(null);
  // const { register, handleSubmit } = useForm<SignupFormInputs>();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>({
    resolver: zodResolver(SignupFormSchema),
  });

  const onSubmit: SubmitHandler<SignupFormInputs> = async (formData) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
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
          {errors.name && (
            <p className={styles.formError}>{errors.name.message}</p>
          )}
        </div>
        <div className={styles.containerInputs}>
          <label>Apellido</label>
          <input {...register("lastName")} className={styles.input} />
          {errors.lastName && (
            <p className={styles.formError}>{errors.lastName.message}</p>
          )}
        </div>
        <div className={styles.containerInputs}>
          <label>Correo Electrónico</label>
          <input type="email" {...register("email")} className={styles.input} />
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
        <div className={styles.containerInputs}>
          <label>Comida Favorita</label>
          <input {...register("foot")} className={styles.input} />
          {errors.foot && (
            <p className={styles.formError}>{errors.foot.message}</p>
          )}
        </div>
        <div className={styles.containerInputs}>
          <label>Artista Favorito</label>
          <input {...register("artist")} className={styles.input} />
          {errors.artist && (
            <p className={styles.formError}>{errors.artist.message}</p>
          )}
        </div>
        <div className={styles.containerInputs}>
          <label>Lugar Favorito</label>
          <input {...register("place")} className={styles.input} />
          {errors.place && (
            <p className={styles.formError}>{errors.place.message}</p>
          )}
        </div>
        <div className={styles.containerInputs}>
          <label>Color Favorito</label>
          <input {...register("color")} className={styles.input} />
          {errors.color && (
            <p className={styles.formError}>{errors.color.message}</p>
          )}
        </div>
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
