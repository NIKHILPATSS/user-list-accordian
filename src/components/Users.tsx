import useUsers, { UserInterface } from "../hooks/useUsers";
import Accordion from "react-bootstrap/Accordion";
import User from "./User";
import SearchBar from "./SearchBar";
import { useState } from "react";

const Users = () => {
  const [users, setNewUsers]: [
    UserInterface[],
    (users: UserInterface[]) => void
  ] = useUsers();

  const [searchTerm, setSearchTerm] = useState("");

  const handleDeleteUser = (index: number) => {
    const newUsers = [...users];
    newUsers.splice(index, 1);
    setNewUsers(newUsers);
  };

  const handleSaveUser = (index: number, user: UserInterface) => {
    const newUsers = [...users];
    newUsers[index] = user;
    setNewUsers(newUsers);
  };
  const filteredUsers = users.filter((user) => {
    const fullName = `${user.first} ${user.last}`;
    return fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleFilterUser = (keyword: string) => {
    setSearchTerm(keyword);
  };

  return (
    <>
      <SearchBar onFilterUser={handleFilterUser} keyword={searchTerm} />
      <Accordion>
        {filteredUsers.map((user, index) => (
          <User
            index={index}
            user={user}
            onDeleteUser={handleDeleteUser}
            onSaveUser={handleSaveUser}
          />
        ))}
      </Accordion>
    </>
  );
};

export default Users;
