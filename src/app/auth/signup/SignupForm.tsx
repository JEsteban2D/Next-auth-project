"use client";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import GenericButton from "@/app/components/generic-button/GenericButton";
import styles from "./SignupForm.module.css";
import { CldUploadWidget } from "next-cloudinary";

// type SignupFormInputs = z.infer<typeof SignupFormSchema>;

interface SignupFormInputs {
  name: string;
  lastName: string;
  email: string;
  password: string;
  foot: string;
  artist: string;
  place: string;
  color: string;
  image: string;
}

const SignupForm = () => {

  const [resource, setResource] = useState<string | null>(null); // Usamos string ya que será la URL de la imagen
  const { register, handleSubmit } = useForm<SignupFormInputs>();

  const onSubmit: SubmitHandler<SignupFormInputs> = async (formData) => {
    if (resource) {
      try {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            image: resource, // Pasar la URL de la imagen al servidor
          }),
        });

        if (response.ok) {
          console.log("Usuario registrado con éxito");
        } else {
          console.error("Error al registrar el usuario");
        }
      } catch (error) {
        console.error("Error en la solicitud de registro:", error);
      }
    } else {
      console.error("No se ha seleccionado una imagen");
    }
  };

  // console.log("O AQUI :", resource.url)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.form}>
        <div className={styles.containerInputs}>
          <label>Nombre</label>
          <input
            {...register("name")}
            className={styles.input}
            placeholder="Nombre"
          />
          {/* {errors.name && <p className={styles.formError}>{errors.name.message}</p>} */}
        </div>
        <div className={styles.containerInputs}>
          <label>Apellido</label>
          <input {...register("lastName")} className={styles.input} />
          {/* {errors.lastName && (
            <p className={styles.formError}>{errors.lastName.message}</p>
          )} */}
        </div>
        <div className={styles.containerInputs}>
          <label>Correo Electrónico</label>
          <input type="email" {...register("email")} className={styles.input} />
          {/* {errors.email && (
            <p className={styles.formError}>{errors.email.message}</p>
          )} */}
        </div>
        <div className={styles.containerInputs}>
          <label>Contraseña</label>
          <input
            type="password"
            {...register("password")}
            className={styles.input}
          />
          {/* {errors.password && (
            <p className={styles.formError}>{errors.password.message}</p>
          )} */}
        </div>
        <div className={styles.containerInputs}>
          <label>Comida Favorita</label>
          <input {...register("foot")} className={styles.input} />
          {/* {errors.foot && <p className={styles.formError}>{errors.foot.message}</p>} */}
        </div>
        <div className={styles.containerInputs}>
          <label>Artista Favorito</label>
          <input {...register("artist")} className={styles.input} />
          {/* {errors.artist && (
            <p className={styles.formError}>{errors.artist.message}</p>
          )} */}
        </div>
        <div className={styles.containerInputs}>
          <label>Lugar Favorito</label>
          <input {...register("place")} className={styles.input} />
          {/* {errors.place && (
            <p className={styles.formError}>{errors.place.message}</p>
          )} */}
        </div>
        <div className={styles.containerInputs}>
          <label>Color Favorito</label>
          <input {...register("color")} className={styles.input} />
          {/* {errors.color && (
            <p className={styles.formError}>{errors.color.message}</p>
          )} */}
        </div>
        <div className={styles.containerInputs}>
          <label>Imagen de Perfil</label>
          <CldUploadWidget
            uploadPreset="ml_default"
            onSuccess={(result) => {
              setResource(result?.info.url);
            }}
          >
            {({ open }) => {
              return <button type="button" onClick={() => open()}>Upload an Image</button>;
            }}
          </CldUploadWidget>
        </div>
        <GenericButton type="submit" />
      </div>
    </form>
  );
};

export default SignupForm;
