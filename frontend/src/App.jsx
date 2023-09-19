import * as React from "react";
import "./App.css";
import Header from "./Header.jsx";
import Content from "./Content.jsx";
import { CssBaseline, AppBar } from "@mui/material";

function App() {
  return (
    <>
      <CssBaseline />
      <Header/>
      <Content />
    </>
  );
}

export default App;
