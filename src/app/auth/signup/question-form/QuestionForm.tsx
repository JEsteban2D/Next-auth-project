import React, { useEffect, useState } from "react";
import styles from "./../SignupForm.module.css";
import { Path, UseFormRegister } from "react-hook-form";

type Question = {
  id: number;
  question: string;
};

type FormValues = {
  name: string;
  lastName: string;
  email: string;
  password: string;
  answers: Record<number, string>; // Las respuestas están indexadas por id
};

type QuestionFormProps = {
  register: UseFormRegister<FormValues>;
};

const QuestionForm: React.FC<QuestionFormProps> = ({ register }) => {

  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("/api/questions");
        if (response.ok) {
          const data = await response.json();
          setQuestions(data);
        } else {
          console.error("Error al obtener las preguntas");
        }
      } catch (error) {
        console.error("Error en la solicitud para obtener preguntas:", error);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <>
      {questions.map((question) => (
        <div key={question.id} className={styles.containerInputs}>
          <label>{question.question}</label>
          <input
            {...register(`answers.${question.id}` as Path<FormValues>)} // Asegura que TypeScript no marque error
            className={styles.input}
            placeholder={question.question}
          />
        </div>
      ))}
    </>
  );
};

export default QuestionForm;
