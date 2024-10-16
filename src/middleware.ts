import { NextResponse } from "next/server";
import { auth } from "../auth";

const publicRoutes = ["/"];
const authRoutes = ["/auth/signin", "/auth/signup"];

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  console.log("ESTA LOGG ?:", isLoggedIn);

  const role = req.auth?.user?.role;

  console.log("User Role:", role);

  // Redirigir a /dashboard si el usuario está logueado y trata de acceder a rutas de autenticación
  if (isLoggedIn && authRoutes.includes(nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl));
  }

  // Redirigir a /login si el usuario no está logueado y trata de acceder a una ruta protegida
  if (
    !isLoggedIn &&
    !authRoutes.includes(nextUrl.pathname) &&
    !publicRoutes.includes(nextUrl.pathname)
  ) {
    return NextResponse.redirect(new URL("/auth/signin", nextUrl));
  }

  // Verificar si el usuario es "admin" para acceder a la ruta /admin
  if (nextUrl.pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard", nextUrl)); // Redirigir al dashboard si no es admin
  }

  // Verificar si un usuario normal intenta acceder a /admin
  if (
    nextUrl.pathname.startsWith("/dashboard") &&
    role !== "user" &&
    role !== "admin"
  ) {
    return NextResponse.redirect(new URL("/auth/signin", nextUrl)); // Redirigir a login si no es user/admin
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard", "/admin"],
};
