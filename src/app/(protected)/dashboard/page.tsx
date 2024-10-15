"use client";
import React, { useEffect, useState } from "react";
import styles from "./dashboard.module.css";
import { ResponseData } from "../../../../types/types";

export default function DashboardPage() {
  const [data, setData] = useState<ResponseData | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/users");
      if (response.ok) {
        const data = await response.json();
        setData(data);
      } else {
        console.error("Error al obtener el usuario:", response.status);
      }
    };
    fetchUsers();
  }, []);

  if (!data?.currentUser) {
    return <div>Loading...</div>;
  }
  return (
    <div className={styles.dashboard}>
      <div className={styles.userInfo}>
        <div className={styles.userGradient}></div>
        <div className={styles.userHeaderProfile}>
          <div className={styles.cardImage}></div>
          <div className={styles.containerText}>
            <p className={styles.nameProfile}>
              {data.currentUser.name} {data.currentUser.lastName}
            </p>
            <p className={styles.emailProfile}>{data.currentUser.email}</p>
          </div>
        </div>
        <section className={styles.sectionInputs}>
          <div className={styles.containerInputs}>
            <label>Nombre Completo</label>
            <input
              type="text"
              className={styles.input}
              readOnly
              value={data.currentUser.name}
            />
          </div>
          <div className={styles.containerInputs}>
            <label>Correo Electrónico</label>
            <input
              type="email"
              className={styles.input}
              readOnly
              value={data.currentUser.lastName}
            />
          </div>
          <div className={styles.containerInputs}>
            <label>Comida Favorita</label>
            <input
              type="text"
              className={styles.input}
              readOnly
              value={data.currentUser.foot}
            />
          </div>
          <div className={styles.containerInputs}>
            <label>Lugar Favorito</label>
            <input
              type="text"
              className={styles.input}
              readOnly
              value={data.currentUser.place}
            />
          </div>
          <div className={styles.containerInputs}>
            <label>Color Favorita</label>
            <input
              type="text"
              className={styles.input}
              readOnly
              value={data.currentUser.color}
            />
          </div>
          <div className={styles.containerInputs}>
            <label>Artista Favorito</label>
            <input
              type="text"
              className={styles.input}
              readOnly
              value={data.currentUser.artist}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
