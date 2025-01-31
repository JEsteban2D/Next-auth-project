import { db } from "@/_lib/db";
import { auth } from "../../../../auth";

export async function GET() {
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
        image: true,
        answer: {
          select: {
            questionText: true, // Seleccionar el texto de la pregunta
            answer: true,
          },
        },
      },
    });

    // Obtener el usuario de la sesión actual
    const currentUser = await db.user.findUnique({
      where: { email: session.user.email as string },
      select: {
        id: true,
        name: true,
        lastName: true,
        email: true,
        role: true,
        image: true,
        answer: {
          select: {
            questionText: true, // Seleccionar el texto de la pregunta
            answer: true,
          },
        },
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

export async function PUT(request: Request){
  const session = await auth();

  if (!session) {
    return new Response(JSON.stringify({ error: "No hay usuario disponible" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const body = await request.json();

    // Extraer los campos que pueden ser actualizados
    const { name, lastName, 
      // image 
    } = body;

    // Validación opcional para asegurarte que al menos hay datos a actualizar
    if (
      !name &&
      !lastName
      // &&
      // !image
    ) {
      return new Response(
        JSON.stringify({ error: "No hay datos para actualizar" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    const updateUser = await db.user.update({
      where: {
        email: session.user.email as string
      },
      data: {
        name: name || undefined,
        lastName: lastName || undefined,
        // image: image || undefined,
      },
    })

    return new Response(JSON.stringify(updateUser), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error)
  }
}
