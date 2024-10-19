import { z } from "zod";

export const SignupFormSchema = z.object({
  name: z.string().min(2, { message: "El nombre es requerido" }),
  lastName: z.string().min(2, { message: "El apellido es requerido" }),
  email: z.string().email({ message: "Debe ser un correo válido" }).trim(),
  password: z
    .string()
    .min(8, { message: "Debe tener minimo 8 caracteres" })
    .regex(/[a-zA-Z]/, { message: "Debe contener al menos una letra ." })
    .regex(/[0-9]/, { message: "Debe contener al menos un número." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Debe contener al menos un carácter especial.",
    })
    .trim(),
  foot: z.string().min(2, { message: "Esta pregunta es requerida" }).trim(),
  artist: z.string().min(2, { message: "Esta pregunta es requerida" }).trim(),
  place: z.string().min(2, { message: "Esta pregunta es requerida" }).trim(),
  color: z.string().min(2, { message: "Esta pregunta es requerida" }).trim(),
});

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Por favor ingresa un correo valido." }),
  password: z
    .string({ required_error: "La contraseña es requerida" })
    .min(4, { message: "La contraseña no puede estar vacia." }),
});
