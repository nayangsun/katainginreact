import React, { useState } from "react";
import { Container } from "@mui/material";
import viteLogo from "/vite.svg";
import "./Home.css";
import reactLogo from "../../assets/react.svg";
import { toolbarHeight, bottomNavHeight } from "../../lib/constants";

function Home() {
  const [count, setCount] = useState(0);

  return (
    <Container
      id="home"
      component="main"
      sx={{
        minHeight: `calc(100vh - ${toolbarHeight} - ${bottomNavHeight})`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </Container>
  );
}

export default Home;
