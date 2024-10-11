"use client";
import React from "react";
import { SignupFormSchema } from "@/_lib/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
// import GenericInput from "@/app/components/generic-input/GenericInput";
import GenericButton from "@/app/components/generic-button/GenericButton";
import styles from "./SignupForm.module.css";
import { useRouter } from "next/navigation";

type SignupFormInputs = z.infer<typeof SignupFormSchema>;
const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>({
    resolver: zodResolver(SignupFormSchema),
  });
  const router = useRouter();

  const onSubmit = async (data: SignupFormInputs) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if(res.ok) {
      router.push('/auth/signin')
    }
    // const resJSON = await res.json()
    console.log(res)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.form}>
        <div className={styles.containerInputs}>
          <label>Nombre</label>
          <input {...register("name")}  className={styles.input} placeholder="Nombre"/>
          {errors.name && <p className={styles.formError}>{errors.name.message}</p>}
        </div>
        <div className={styles.containerInputs}>
          <label>Apellido</label>
          <input {...register("lastName")} className={styles.input}/>
          {errors.lastName && (
            <p className={styles.formError}>{errors.lastName.message}</p>
          )}
        </div>
        <div className={styles.containerInputs}>
          <label>Correo Electrónico</label>
          <input type="email" {...register("email")} className={styles.input}/>
          {errors.email && (
            <p className={styles.formError}>{errors.email.message}</p>
          )}
        </div>
        <div className={styles.containerInputs}>
          <label>Contraseña</label>
          <input type="password" {...register("password")} className={styles.input}/>
          {errors.password && (
            <p className={styles.formError}>{errors.password.message}</p>
          )}
        </div>
        {/* <div className={styles.containerInputs}>
          <label>URL de la Imagen</label>
          <input type="url" {...register("image")} className={styles.input}/>
          {/* {errors.image && <p className={styles.formError}>{errors.image.message}</p>} 
        </div> */}
        <div className={styles.containerInputs}>
          <label>Comida Favorita</label>
          <input {...register("foot")} className={styles.input}/>
          {errors.foot && <p className={styles.formError}>{errors.foot.message}</p>}
        </div>
        <div className={styles.containerInputs}>
          <label>Artista Favorito</label>
          <input {...register("artist")} className={styles.input}/>
          {errors.artist && (
            <p className={styles.formError}>{errors.artist.message}</p>
          )}
        </div>
        <div className={styles.containerInputs}> 
          <label>Lugar Favorito</label>
          <input {...register("place")} className={styles.input}/>
          {errors.place && (
            <p className={styles.formError}>{errors.place.message}</p>
          )}
        </div>
        <div className={styles.containerInputs}>
          <label>Color Favorito</label>
          <input {...register("color")} className={styles.input}/>
          {errors.color && (
            <p className={styles.formError}>{errors.color.message}</p>
          )}
        </div>
        <GenericButton type="submit">Registrarse</GenericButton>
      </div>
    </form>
  );
};

export default SignupForm;
