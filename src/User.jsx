import "./App.css";
import React, { useState } from "react";
import UserService from "./services/User";

const User = ({
  user,
  editUser,
  setIsPositive,
  setShowMessage,
  setMessage,
  reload,
  reloadNow,
}) => {
  // customer props

  // Komponentin tilan määritys
  const [showDetails, setShowDetails] = useState(false);

  const deleteUser = (user) => {
    if (window.confirm(`Remove User ${user.lastName}`) === true) {
      UserService.remove(user.userId)
        .then((res) => {
          if (res.status === 200) {
            setMessage(`Removed user ${user.lastName}`);
            setIsPositive(true);
            setShowMessage(true);
            window.scrollBy(0, -10000); // Scrollataan ylös jotta nähdään alert
            // ilmoituksen piilotus
            setTimeout(() => {
              setShowMessage(false);
            }, 5000);
            reloadNow(!reload);
          }
        })
        .catch((error) => {
          setMessage(error);
          setIsPositive(false);
          setShowMessage(true);
          window.scrollBy(0, -10000); // Scrollataan ylös jotta nähdään alert
          setTimeout(() => {
            setShowMessage(false);
          }, 6000);
        });
    } else {
      setMessage("Poisto peruttu onnistuneesti.");
      setIsPositive(true);
      setShowMessage(true);
      window.scrollBy(0, -10000); // Scrollataan ylös jotta nähdään alert :)

      // Ilmoituksen piilotus
      setTimeout(() => {
        setShowMessage(false);
      }, 5000);
    }
  };

  return (
    <div className="userDiv">
      <h4
        onClick={() => setShowDetails(!showDetails)}
        style={{ cursor: "pointer" }}
      >
        {user.firstName}, {user.lastName}
      </h4>
      {showDetails && (
        <div className="customerDetails">
          <h3>
            {user.firstName}, {user.lastName}
          </h3>
          <button onClick={() => deleteUser(user)}>Delete</button>
          <> </>
          <button onClick={() => editUser(user)}>Edit</button>
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Email</th>
                <th>Accesslevel</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{user.userName}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.accesslevelId}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default User;
