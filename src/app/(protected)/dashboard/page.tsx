"use client";
import React, { useEffect, useState } from "react";
import styles from "./dashboard.module.css";
import { ResponseData } from "../../../../types/types";
import Image from "next/image";
import UpdateUserForm from "@/app/components/update-user-form/UpdateUserForm";
import Modal from "@/app/components/modal/Modal";
import GenericButton from "@/app/components/generic-button/GenericButton";
// import LogoutButton from "@/app/components/logout-button/LogoutButton";
import defaultImg from "@/app/assets/default-profile.jpg";
import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const { data: session } = useSession();
  const [data, setData] = useState<ResponseData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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

  if (!data?.currentUser && !session) {
    return <div>Loading...</div>;
  }
  return (
    <div className={styles.dashboard}>
      <div className={styles.userInfo}>
        <div className={styles.userGradient}>{/* <LogoutButton /> */}</div>
        {!session?.user && (
          <GenericButton onClick={openModal} className={styles.buttonModal}>
            Edit
          </GenericButton>
        )}
        <div className={styles.userHeaderProfile}>
          <Image
            className={styles.cardImage}
            src={data?.currentUser?.image || session?.user?.image || defaultImg}
            width={500}
            height={500}
            alt="Profile picture of the user"
            loading="lazy"
          />
          <div className={styles.containerText}>
            <p className={styles.nameProfile}>
              {data?.currentUser?.name && data?.currentUser?.lastName
                ? `${data.currentUser.name}`
                : session?.user?.name}
            </p>
            <p className={styles.emailProfile}>
              {data?.currentUser?.email
                ? `${data.currentUser.email}`
                : session?.user?.email}
            </p>
          </div>
        </div>

        <section className={styles.sectionInputs}>
          <div className={styles.containerInputs}>
            <label>Nombre Completo</label>
            <input
              type="text"
              className={styles.input}
              readOnly
              value={data?.currentUser?.name || session?.user?.name || ""}
            />
          </div>
          <div className={styles.containerInputs}>
            <label>Correo Electrónico</label>
            <input
              type="email"
              className={styles.input}
              readOnly
              value={data?.currentUser?.email || session?.user?.email || ""}
            />
          </div>
          <div className={styles.containerInputs}>
            <label>Comida Favorita</label>
            <input
              type="text"
              className={styles.input}
              readOnly
              value={data?.currentUser?.foot}
            />
          </div>
          <div className={styles.containerInputs}>
            <label>Lugar Favorito</label>
            <input
              type="text"
              className={styles.input}
              readOnly
              value={data?.currentUser?.place}
            />
          </div>
          <div className={styles.containerInputs}>
            <label>Color Favorita</label>
            <input
              type="text"
              className={styles.input}
              readOnly
              value={data?.currentUser?.color}
            />
          </div>
          <div className={styles.containerInputs}>
            <label>Artista Favorito</label>
            <input
              type="text"
              className={styles.input}
              readOnly
              value={data?.currentUser?.artist}
            />
          </div>
        </section>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Editar perfil">
        <UpdateUserForm />
      </Modal>
    </div>
  );
}
