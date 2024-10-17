import "./App.css";
import React, { useState } from "react";

const Laskuri = () => {
  // Komponentin tilan ja sitä muutavan metodin määritys
  const [luku, setLuku] = useState(0);

  return (
    <>
      <h3>{luku}</h3>

      <button onClick={() => setLuku(luku + 1)}>+</button>

      <button onClick={() => setLuku(luku - 1)}>-</button>

      <button onClick={() => setLuku(0)}>Reset</button>
    </>
  );
};

export default Laskuri;
