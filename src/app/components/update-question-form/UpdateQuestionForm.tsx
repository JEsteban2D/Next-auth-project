import React, { useEffect, useState } from "react";
import styles from "./UpdateQuestionForm.module.css";

interface Question {
  id: number;
  question: string;
}

const UpdateQuestionForm: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );
  const [newQuestionText, setNewQuestionText] = useState("");

  useEffect(() => {
    // Fetch existing questions from the API
    const fetchQuestions = async () => {
      try {
        const response = await fetch("/api/questions");
        if (response.ok) {
          const data = await response.json();
          setQuestions(data);
        } else {
          console.error("Error al obtener las preguntas:", response.status);
        }
      } catch (error) {
        console.error("Error al obtener las preguntas:", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleQuestionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const questionId = parseInt(event.target.value, 10);
    const question = questions.find((q) => q.id === questionId) || null;
    setSelectedQuestion(question);
    setNewQuestionText(question ? question.question : "");
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewQuestionText(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedQuestion) return;

    try {
      const response = await fetch("/api/questions", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: selectedQuestion.id,
          question: newQuestionText,
        }),
      });

      if (response.ok) {
        // Update the local state with the new question text
        setQuestions((prevQuestions) =>
          prevQuestions.map((q) =>
            q.id === selectedQuestion.id
              ? { ...q, question: newQuestionText }
              : q
          )
        );
        alert("Pregunta actualizada con éxito");
      } else {
        console.error("Error al actualizar la pregunta:", response.status);
      }
    } catch (error) {
      console.error("Error al actualizar la pregunta:", error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor="questionSelect">Seleccionar Pregunta:</label>
      <select id="questionSelect" onChange={handleQuestionChange}>
        <option value="">Seleccione una pregunta</option>
        {questions.map((question) => (
          <option key={question.id} value={question.id}>
            {question.question}
          </option>
        ))}
      </select>

      {selectedQuestion && (
        <>
          <label htmlFor="questionText">Editar Pregunta:</label>
          <input
            id="questionText"
            type="text"
            value={newQuestionText}
            onChange={handleTextChange}
          />

          <button type="submit">Actualizar Pregunta</button>
        </>
      )}
    </form>
  );
};

export default UpdateQuestionForm;
