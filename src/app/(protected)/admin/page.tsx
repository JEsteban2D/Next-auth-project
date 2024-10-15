"use client";
import React, { useEffect, useState } from "react";
import CardUser from "@/app/components/card-user/CardUser";
import styles from "./Admin.module.css";
import { ResponseData } from "../../../../types/types";

export default function AdminPage() {
  const [data, setData] = useState<ResponseData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/users");
      if (response.ok) {
        const data = await response.json();
        setData(data);
      } else {
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
      <ul className={styles.cardsSection}>
        {data.users.map((user) => (
          <CardUser key={user.id} user={user} />
        ))}
      </ul>
      {/* <h2>Usuario Actual</h2>
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
      )} */}
    </div>
  );
}
