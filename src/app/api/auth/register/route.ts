import { db } from "@/_lib/db";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const userFound = await db.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (userFound) {
      return NextResponse.json({
        message: "El usuario ya existe",
      });
    }

    console.log("Datos recibidos:", data);

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await db.user.create({
      data: {
        name: data.name,
        lastName: data.lastName,
        email: data.email,
        password: hashedPassword,
        foot: data.foot,
        artist: data.artist,
        place: data.place,
        color: data.color,
        image: data.image,
      },
    });

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
