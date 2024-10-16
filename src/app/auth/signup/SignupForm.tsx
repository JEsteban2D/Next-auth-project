"use client";
import React, { useState } from "react";
import { SignupFormSchema } from "@/_lib/definitions";
// import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
// import GenericInput from "@/app/components/generic-input/GenericInput";
import GenericButton from "@/app/components/generic-button/GenericButton";
import styles from "./SignupForm.module.css";
import { useRouter } from "next/navigation";
import { CldUploadButton } from "next-cloudinary";

// type SignupFormInputs = z.infer<typeof SignupFormSchema>;

const SignupForm = () => {
  const [imageSelected, setImageSelected] = useState<File | null>(null);
  const { register, handleSubmit } = useForm();

  // Función para subir la imagen a Cloudinary
  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("file", imageSelected as File); // Imagen seleccionada
    formData.append("upload_preset", "tu_upload_preset"); // Tu upload_preset de Cloudinary

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/dqcrbnsjn/image/upload`, // URL de Cloudinary
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      return data.secure_url; // Retornar la URL de la imagen subida
    } catch (error) {
      
      console.error("Error al subir la imagen a Cloudinary:", error);
      return null;
    }
  };

  const onSubmit = async (formData: any) => {
    const imageUrl = await uploadImage(); // Subir imagen a Cloudinary

    if (imageUrl) {
      // Llamar a la API para registrar el usuario junto con la URL de la imagen
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          image: imageUrl, // Guardar la URL de la imagen en la base de datos
        }),
      });

      if (response.ok) {
        console.log("Usuario registrado con éxito");
      } else {
        console.error("Error al registrar el usuario");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.form}>
        <div className={styles.containerInputs}>
          <label>Nombre</label>
          <input {...register("name")}  className={styles.input} placeholder="Nombre"/>
          {/* {errors.name && <p className={styles.formError}>{errors.name.message}</p>} */}
        </div>
        <div className={styles.containerInputs}>
          <label>Apellido</label>
          <input {...register("lastName")} className={styles.input}/>
          {/* {errors.lastName && (
            <p className={styles.formError}>{errors.lastName.message}</p>
          )} */}
        </div>
        <div className={styles.containerInputs}>
          <label>Correo Electrónico</label>
          <input type="email" {...register("email")} className={styles.input}/>
          {/* {errors.email && (
            <p className={styles.formError}>{errors.email.message}</p>
          )} */}
        </div>
        <div className={styles.containerInputs}>
          <label>Contraseña</label>
          <input type="password" {...register("password")} className={styles.input}/>
          {/* {errors.password && (
            <p className={styles.formError}>{errors.password.message}</p>
          )} */}
        </div>
        <div className={styles.containerInputs}>
          <label>Comida Favorita</label>
          <input {...register("foot")} className={styles.input}/>
          {/* {errors.foot && <p className={styles.formError}>{errors.foot.message}</p>} */}
        </div>
        <div className={styles.containerInputs}>
          <label>Artista Favorito</label>
          <input {...register("artist")} className={styles.input}/>
          {/* {errors.artist && (
            <p className={styles.formError}>{errors.artist.message}</p>
          )} */}
        </div>
        <div className={styles.containerInputs}> 
          <label>Lugar Favorito</label>
          <input {...register("place")} className={styles.input}/>
          {/* {errors.place && (
            <p className={styles.formError}>{errors.place.message}</p>
          )} */}
        </div>
        <div className={styles.containerInputs}>
          <label>Color Favorito</label>
          <input {...register("color")} className={styles.input}/>
          {/* {errors.color && (
            <p className={styles.formError}>{errors.color.message}</p>
          )} */}
        </div>
        <div className={styles.containerInputs}>
          <label>Imagen de Perfil</label>
          <input
            type="file"
            {...register("image")}
            className={styles.input}
            onChange={(event) => {
              setImageSelected(event.target.files ? event.target.files[0] : null);
            }}
          />
          {/* {imageError && <p className={styles.formError}>{imageError}</p>} */}
        </div>

      </div>
    </form>
  );
};

export default SignupForm;
