"use client";
import React, { useEffect, useState } from "react";
import { auth } from "../../../../auth";
import LogoutButton from "@/app/components/logout-button/LogoutButton";
import CardUser from "@/app/components/card-user/CardUser";
import styles from './Admin.module.css';

interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  role: string;
  foot: String;
  artist: String;
  place: String;
  color: String;
}

interface ResponseData {
  users: User[];
  currentUser: User | null; // Puede ser null si no hay un usuario actual
}

export default function AdminPage() {
  // const session = await auth();

  // if (!session) {
  //   return <div> Not Admin</div>;
  // }

  const [data, setData] = useState<ResponseData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/users");
      if (response.ok) {
        const data = await response.json();
        setData(data);
      } else {
        // Manejo de error
        console.error("Error al obtener usuarios:", response.status);
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Cargando usuarios...</div>;
  }

  if (!data) {
    return <div>No se pudo obtener la información.</div>;
  }
  return (
    <div className={styles.admin}>
      <header className={styles.headerAdmin}>
        <h1>AdminPage</h1>
        <LogoutButton />
      </header>
      {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}
      <ul className={styles.cardsSection}>
        {data.users.map((user) => (
          <CardUser key={user.id} user={user} />
        ))}
      </ul>
      <h2>Usuario Actual</h2>
      {data.currentUser ? (
        <div>
          <p>
            {data.currentUser.name} {data.currentUser.lastName}
          </p>
          <p>
            {data.currentUser.email} ({data.currentUser.role})
          </p>
        </div>
      ) : (
        <p>No hay un usuario actual.</p>
      )}
    </div>
  );
}
