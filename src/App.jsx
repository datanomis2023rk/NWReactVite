import React, { useState, useEffect } from "react";
import "./App.css";
import Laskuri from "./Laskuri";
import Posts from "./Posts";
import CustomerList from "./CustomerList";
import UserList from "./UserList";
import Message from "./Message";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  // App komponentin tila
  const [showLaskuri, setShowLaskuri] = useState(false);
  // Statet messagen näyttämistä varten
  const [showMessage, setShowMessage] = useState("");
  const [message, setMessage] = useState("");
  const [isPositive, setIsPositive] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState("");
  const [adminUser, setAdminUser] = useState(false);
  const huomio = () => {
    alert("Huomio!");
  };
  // huomio(=props)={huomio=funktio}

  useEffect(() => {
    let storedUser = localStorage.getItem("username");
    let storedAdmin = parseInt(localStorage.getItem("accesslevelId"));
    console.log(storedUser);
    console.log(storedAdmin);
    if (storedAdmin < 2) {
      setAdminUser(true);
    }

    console.log(adminUser);

    if (storedUser !== null) {
      setLoggedInUser(storedUser);
    }
  }, []);

  // Logout napin tapahtumankäsittelijä
  const logout = () => {
    localStorage.clear();
    setLoggedInUser("");
  };
  return (
    <div className="App">
      {!loggedInUser && (
        <Login
          setMessage={setMessage}
          setIsPositive={setIsPositive}
          setShowMessage={setShowMessage}
          setLoggedInUser={setLoggedInUser}
          setAdminUser={setAdminUser}
        />
      )}
      {loggedInUser && (
        <Router>
          <Navbar bg="dark" variant="dark">
            <Nav className="mr-auto">
              <Nav.Link href="/Customers">Customers</Nav.Link>
              {adminUser && <Nav.Link href="/UserList">Users</Nav.Link>}
              <Nav.Link href="/Posts">Some higlights</Nav.Link>

              <Nav.Link href="/Laskuri">Laskuri</Nav.Link>
              <> </>
              <button className="logout" onClick={() => logout()}>
                Logout
              </button>
            </Nav>
          </Navbar>

          <h1>Northwind Corporation</h1>

          {showMessage && <Message message={message} isPositive={isPositive} />}

          <Routes>
            <Route
              path="/Customers"
              element={
                <CustomerList
                  setMessage={setMessage}
                  setIsPositive={setIsPositive}
                  setShowMessage={setShowMessage}
                />
              }
            ></Route>

            {adminUser && (
              <Route
                path="/UserList"
                element={
                  <UserList
                    setMessage={setMessage}
                    setIsPositive={setIsPositive}
                    setShowMessage={setShowMessage}
                  />
                }
              ></Route>
            )}

            <Route path="/Posts" element={<Posts />}></Route>

            <Route path="/Laskuri" element={<Laskuri />}></Route>
          </Routes>
        </Router>
      )}
    </div>
  );
};

export default App;
