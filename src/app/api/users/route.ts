import { db } from "@/_lib/db";
import { auth } from "../../../../auth";

export async function GET(request: Request) {
  // Obtiene la sesión del usuario actual
  const session = await auth();

  // Si no hay sesión, retorna un error 401 (No autorizado)
  if (!session) {
    return new Response(JSON.stringify({ error: "No autorizado" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    // Obtener todos los usuarios de la base de datos
    const users = await db.user.findMany({
      select: {
        id: true,
        name: true,
        lastName: true,
        email: true,
        role: true,
        foot: true,
        artist: true,
        place: true,
        color: true,
      },
    });

    // Obtener el usuario de la sesión actual
    const currentUser = await db.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        name: true,
        lastName: true,
        email: true,
        role: true,
        foot: true,
        artist: true,
        place: true,
        color: true,
      },
    });

    // Retorna los datos en una estructura que contenga los usuarios y el usuario actual
    return new Response(
      JSON.stringify({ users, currentUser }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    return new Response(JSON.stringify({ error: "Error interno del servidor" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
