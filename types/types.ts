export interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  role: string;
  image: string;
  answer: Answer[];
}

export interface Question {
  id: number;
  question: string;
}

export interface Answer {
  id: number;
  answer: string;
  question: Question;
  questionText: string;
}

export interface ResponseData {
  users: User[];
  currentUser: User | null;
}

export interface CardProps {
  user: User;
}