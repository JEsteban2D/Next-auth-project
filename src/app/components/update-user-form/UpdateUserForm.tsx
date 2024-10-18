import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';

interface UserFormInputs {
    name: string;
    lastName: string;
    foot: string;
    artist: string;
    place: string;
    color: string;
    // image: string;
}

const UpdateUserForm = () => {

  const { register, handleSubmit, setValue } = useForm<UserFormInputs>();
  const [message, setMessage] = useState<string>("");

  // Obtener los datos actuales del usuario (puedes obtenerlo desde tu API)
  useEffect(() => {
    fetch("/api/users")
      .then((response) => response.json())
      .then((data) => {
        // Rellenar los campos del formulario con los datos actuales
        setValue("name", data.name);
        setValue("lastName", data.lastName);
        setValue("foot", data.foot);
        setValue("artist", data.artist);
        setValue("place", data.place);
        setValue("color", data.color);
        // setValue("image", data.image);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [setValue]);

  // Manejar el envío del formulario
  const onSubmit = async (formData: UserFormInputs) => {
    try {
      const response = await fetch("/api/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setMessage("Datos actualizados correctamente");
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error actualizando usuario:", error);
      setMessage("Error actualizando usuario");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Nombre</label>
        <input
          type="text"
          {...register("name", { required: true })}
        />
      </div>

      <div>
        <label>Apellido</label>
        <input
          type="text"
          {...register("lastName", { required: true })}
        />
      </div>

      <div>
        <label>Comida preferida</label>
        <input
          type="text"
          {...register("foot")}
        />
      </div>

      <div>
        <label>Artista favorito</label>
        <input
          type="text"
          {...register("artist")}
        />
      </div>

      <div>
        <label>Lugar favorito</label>
        <input
          type="text"
          {...register("place")}
        />
      </div>

      <div>
        <label>Color favorito</label>
        <input
          type="text"
          {...register("color")}
        />
      </div>

      {/* <div>
        <label>Imagen (URL)</label>
        <input
          type="text"
          {...register("image")}
        />
      </div> */}

      <button type="submit">Actualizar datos</button>

      {message && <p>{message}</p>}
    </form>
  )
}

export default UpdateUserForm