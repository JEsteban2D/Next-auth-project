import { db } from "@/_lib/db";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import bcrypt from "bcrypt-edge";
// import argon2 from "argon2"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { name, lastName, email, password, image, answers } = data;

    const userFound = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (userFound) {
      return NextResponse.json(
        {
          message: "El usuario ya existe",
        },
        { status: 400 }
      );
    }

    console.log("Datos recibidos:", data);

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await db.user.create({
      data: {
        name,
        lastName,
        email,
        password: hashedPassword,
        image: image || null,
      },
    });

    // Guardar las respuestas del usuario
    if (answers && answers.length > 0) {
      const answerPromises = answers.map(
        async (answer: string, index: number) => {
          if (answer !== null) {
            const questionId = index + 1;

            const originalQuestion = await db.question.findUnique({
              where: { id: questionId },
            });

            if (!originalQuestion) {
              throw new Error(`Pregunta con ID ${questionId} no encontrada`);
            }

            return db.answer.create({
              data: {
                answer: answer as string,
                userId: newUser.id,
                questionId: questionId,
                questionText: originalQuestion.question,
              },
            });
          }
        }
      );

      await Promise.all(answerPromises);
    }

    return NextResponse.json({ message: "Registro exitoso", newUser });
  } catch (error: unknown) {
    let errorMessage = "Something went wrong";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      {
        message: errorMessage,
      },
      {
        status: 500,
      }
    );
  }
}
