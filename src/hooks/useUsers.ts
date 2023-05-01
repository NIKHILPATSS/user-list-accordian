import { useState, useEffect } from "react";

type Gender = "Male" | "Female" | "Transgender" | "Rather not say" | "Other";

export interface UserInterface {
  id: number;
  first: string;
  last: string;
  dob: string;
  gender: Gender;
  email: string;
  picture: string;
  country: string;
  description: string;
  disabled?: boolean;
}

function useUsers(): [UserInterface[], (users: UserInterface[]) => void] {
  const [users, setUsers] = useState<UserInterface[]>([]);

  useEffect(() => {
    let fetchUser = async () => {
      try {
        let response = await fetch("http://localhost:3001/users");
        let data: UserInterface[] = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  const setNewUsers = (users: UserInterface[]) => {
    setUsers(users);
  };

  return [users, setNewUsers];
}

export default useUsers;
