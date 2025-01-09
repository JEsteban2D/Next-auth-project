"use client";
import React, { use, useEffect, useState } from "react";
import CardUser from "@/app/components/card-user/CardUser";
import styles from "./Admin.module.css";
import { User, ResponseData } from "../../../../types/types";
import Modal from "@/app/components/modal/Modal";
import GenericButton from "@/app/components/generic-button/GenericButton";
import UpdateQuestionForm from "@/app/components/update-question-form/UpdateQuestionForm";

// export interface ResponseData {
//   users: User[];
// }

export default function AdminPage() {
  const [data, setData] = useState<ResponseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/users");
      if (response.ok) {
        const data = await response.json();
        console.log("esta es la data:", data);
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
      <GenericButton onClick={openModal}>Editar las preguntas</GenericButton>
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Editar Preguntas">
        <p className={styles.textQuestion}>AQUI PODRAS EDITAR LAS PREGUNTAS DEL FORMULARIO</p>
        <UpdateQuestionForm />
      </Modal>
      <ul className={styles.cardsSection}>
        {data.users.map((user) => (
          <CardUser key={user.id} user={user} />
        ))}
      </ul>
    </div>
  );
}
