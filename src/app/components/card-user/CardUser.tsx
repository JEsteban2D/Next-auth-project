import Image from "next/image";
import { CardProps } from "../../../../types/types";
import styles from "./CardUser.module.css";
import React from "react";

const CardUser: React.FC<CardProps> = ({ user }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <header className={styles.cardHeader}>
          <div className={styles.cardHeaderImage}>
            {user.image ? (
            <Image
              className={styles.cardImage}
              src={user.image}
              width={500}
              height={500}
              alt="Profile picture of the user"
              loading="lazy" // Opcional: para cargar la imagen de forma más eficiente
            />
          ) : (
            <div className={styles.defaultCardImage}></div>
          )}
            <div className={styles.cardNameContainer}>
              <h2>
                {user.name} {user.lastName}
              </h2>
              <p className={styles.cardEmail}>{user.email}</p>
            </div>
          </div>
          <p className={styles.cardRole}>{user.role}</p>
        </header>
        <section className={styles.cardFooter}>
          <hr />
          <h2 className={styles.textFooter}>Questions:</h2>
          {user.answer.length > 0 ? (
            user.answer.map((answer) => (
              <div key={answer.id} className={styles.questionContainer}>
                {/* <p className={styles.question}>{answer.question.question}:</p> */}
                <p className={styles.question}>{answer.questionText}: </p>
                <p className={styles.answer}> {answer.answer}</p>
              </div>
            ))
          ) : (
            <p className={styles.noQuestions}>No questions answered yet.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default CardUser;
