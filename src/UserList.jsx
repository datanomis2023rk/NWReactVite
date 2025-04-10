import "./App.css";
import React, { useState, useEffect } from "react";
import UserService from "./services/User";
import User from "./User";
import UserAdd from "./UserAdd";
import UserEdit from "./UserEdit";

const UserList = ({ setIsPositive, setShowMessage, setMessage }) => {
  // Komponentin tilan määritys
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  const [lisäystila, setLisäystila] = useState(false);
  const [muokkaustila, setMuokkaustila] = useState(false);
  const [reload, reloadNow] = useState(false);
  const [muokattavaUser, setMuokattavaUser] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    UserService.setToken(token);

    UserService.getAll().then((data) => {
      setUsers(data);
    });
  }, [lisäystila, muokkaustila, reload]);

  const handleSearchInputChange = (event) => {
    setShowUsers(true);
    setSearch(event.target.value.toLowerCase());
  };

  const editUser = (user) => {
    setMuokattavaUser(user);
    setMuokkaustila(true);
  };
  return (
    <>
      <h1>
        <nobr
          style={{ cursor: "pointer" }}
          onClick={() => setShowUsers(!showUsers)}
        >
          Users
        </nobr>

        {!lisäystila && (
          <button className="nappi" onClick={() => setLisäystila(true)}>
            Add new
          </button>
        )}
      </h1>

      {!lisäystila && !muokkaustila && (
        <input
          className="kysely"
          placeholder="Search by Last Name"
          value={search}
          onChange={handleSearchInputChange}
        />
      )}

      {lisäystila && (
        <UserAdd
          setLisäystila={setLisäystila}
          setIsPositive={setIsPositive}
          setMessage={setMessage}
          setShowMessage={setShowMessage}
        />
      )}

      {muokkaustila && (
        <UserEdit
          setMuokkaustila={setMuokkaustila}
          setIsPositive={setIsPositive}
          setMessage={setMessage}
          setShowMessage={setShowMessage}
          muokattavaUser={muokattavaUser}
        />
      )}

      {!lisäystila &&
        !muokkaustila &&
        showUsers &&
        users &&
        users.map((u) => {
          const lowerCaseName = u.lastName.toLowerCase();
          if (lowerCaseName.indexOf(search) > -1) {
            return (
              <User
                key={u.userId}
                user={u}
                reloadNow={reloadNow}
                reload={reload}
                setIsPositive={setIsPositive}
                setShowMessage={setShowMessage}
                setMessage={setMessage}
                editUser={editUser}
              />
            );
          }
        })}
    </>
  );
};

export default UserList;
