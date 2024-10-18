export interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  role: string;
  foot: string;
  artist: string;
  place: string;
  color: string;
  image: string;
}

export interface ResponseData {
  users: User[];
  currentUser: User | null;
}

export interface CardProps {
  user: User;
}