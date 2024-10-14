'use client'
// UserContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from "@/_lib/db"; // Ajusta la ruta según tu estructura de carpetas
import { auth } from '../../auth';
// import { auth } from "../../../../auth"; // Ajusta la ruta según tu estructura de carpetas

interface User {
  id: string;
  name: string;
  lastName: string;
  email: string;
  role: string;
  foot?: any; // Ajusta el tipo según lo que esperas
  artist?: any; // Ajusta el tipo según lo que esperas
  place?: any; // Ajusta el tipo según lo que esperas
  color?: any; // Ajusta el tipo según lo que esperas
}

interface UserContextType {
  users: User[];
  currentUser: User | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      if (!response.ok) {
        throw new Error('Error al obtener usuarios');
      }
      const { users, currentUser } = await response.json();
      setUsers(users);
      setCurrentUser(currentUser);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

//   useEffect(() => {
//     const fetchUsers = async () => {
//       const session = await auth();
//       if (!session) return;

//       const usersData = await db.user.findMany({
//         select: {
//           id: true,
//           name: true,
//           lastName: true,
//           email: true,
//           role: true,
//         },
//       });

//       const currentUserData = await db.user.findUnique({
//         where: { email: session.user.email },
//         select: {
//           id: true,
//           name: true,
//           lastName: true,
//           email: true,
//           role: true,
//           foot: true,
//           artist: true,
//           place: true,
//           color: true,
//         },
//       });

//       setUsers(usersData);
//       setCurrentUser(currentUserData);
//     };

//     fetchUsers();
//   }, []);

  return (
    <UserContext.Provider value={{ users, currentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
