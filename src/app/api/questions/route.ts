import { db } from "@/_lib/db";

export async function GET() {
  try {
    // Obtener todas las preguntas de la base de datos
    const questions = await db.question.findMany();

    // Retorna las preguntas en una respuesta JSON
    return new Response(JSON.stringify(questions), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error al obtener las preguntas:", error);
    return new Response(
      JSON.stringify({ error: "Error interno del servidor" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function PUT(request: Request) {
  try {
    // Parsear el cuerpo de la solicitud
    const { id, question } = await request.json();

    // Validar los datos recibidos
    if (!id || !question) {
      return new Response(
        JSON.stringify({
          error: "Faltan datos necesarios para actualizar la pregunta.",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Buscar la pregunta en la base de datos
    const existingQuestion = await db.question.findUnique({
      where: { id },
    });

    // Verificar si la pregunta existe
    if (!existingQuestion) {
      return new Response(
        JSON.stringify({ error: "Pregunta no encontrada." }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Actualizar la pregunta en la base de datos
    const updatedQuestion = await db.question.update({
      where: { id },
      data: { question },
    });

    // Retornar la pregunta actualizada en la respuesta JSON
    return new Response(JSON.stringify(updatedQuestion), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error al actualizar la pregunta:", error);
    return new Response(
      JSON.stringify({ error: "Error interno del servidor" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
