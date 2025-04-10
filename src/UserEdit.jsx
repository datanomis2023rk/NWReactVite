import "./App.css";
import React, { useState } from "react";
import UserService from "./services/User";
import md5 from "md5";
// onSubmit tapahtumankäsittelijä funktio
const UserEdit = ({
  setMuokkaustila,
  setIsPositive,
  setMessage,
  setShowMessage,
  muokattavaUser,
}) => {
  // Komponentin tilan määritys

  const [newUserId, setNewUserId] = useState(muokattavaUser.userId);
  const [newFirstName, setNewFirstName] = useState(muokattavaUser.firstName);
  const [newLastName, setNewLastName] = useState(muokattavaUser.lastName);
  const [newEmail, setNewEmail] = useState(muokattavaUser.email);
  const [newUserName, setNewUserName] = useState(muokattavaUser.userName);
  const [newPassword, setNewPassword] = useState(muokattavaUser.password);
  const [newAccessLevelId, setNewAccessLevelId] = useState(
    muokattavaUser.accesslevelId
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    var newUser = {
      userId: newUserId,
      firstName: newFirstName,
      lastName: newLastName,
      email: newEmail,
      userName: newUserName,
      password: md5(newPassword), // Salataan md5 kirjaston metodilla
      accesslevelId: parseInt(newAccessLevelId),
    };

    UserService.update(newUser)
      .then((response) => {
        if (response.status === 200) {
          setMessage("Edited User: " + newUser.userName);
          setIsPositive(true);
          setShowMessage(true);

          setTimeout(() => {
            setShowMessage(false);
          }, 5000);

          setMuokkaustila(false);
        }
      })
      .catch((error) => {
        setMessage(error);
        setIsPositive(false);
        setShowMessage(true);

        setTimeout(() => {
          setShowMessage(false);
        }, 6000);
      });
  };

  return (
    <div id="edit">
      <h2>User edit</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>User Id </label>
          <input type="text" value={newUserId} disabled />
        </div>
        <div>
          <label>Firstname </label>
          <input
            type="text"
            value={newFirstName}
            placeholder="Firstname"
            onChange={({ target }) => setNewFirstName(target.value)}
            required
          />
        </div>
        <div>
          <label>Lastname </label>
          <input
            type="text"
            value={newLastName}
            placeholder="Lastname"
            onChange={({ target }) => setNewLastName(target.value)}
          />
        </div>
        <div>
          <label>E-mail </label>
          <input
            type="text"
            value={newEmail}
            placeholder="Email"
            onChange={({ target }) => setNewEmail(target.value)}
          />
        </div>
        <div>
          <label>Accesslevel </label>
          <input
            type="text"
            value={newAccessLevelId}
            placeholder="AccesslevelId"
            onChange={({ target }) => setNewAccessLevelId(target.value)}
          />
        </div>
        <div>
          <label>Username </label>
          <input
            type="text"
            value={newUserName}
            placeholder="Username"
            onChange={({ target }) => setNewUserName(target.value)}
          />
        </div>
        <div>
          <label>Password </label>
          <input
            type="text"
            value={newPassword}
            placeholder="Password"
            onChange={({ target }) => setNewPassword(target.value)}
          />
        </div>

        <input type="submit" value="save" className="save" />
        <input
          type="button"
          value="back"
          className="back"
          onClick={() => setMuokkaustila(false)}
        />
      </form>
    </div>
  );
};

export default UserEdit;
