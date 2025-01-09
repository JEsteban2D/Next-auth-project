import React, { useEffect, useState } from "react";
import styles from "./../SignupForm.module.css";
import { UseFormRegister } from "react-hook-form";

type Question = {
  id: number;
  question: string;
};

type QuestionFormProps = {
  register: UseFormRegister<any>;
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
            {...register(`answers.${question.id}`)}
            className={styles.input}
            placeholder={question.question}
          />
          {/* {errors.answers && errors.answers[question.id] && (
            <p className={styles.formError}>{errors.answers[question.id].message}</p>
          )} */}
        </div>
      ))}
    </>
  );
};

export default QuestionForm;
