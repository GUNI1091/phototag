import "./App.css";
import { Link, Route, Routes } from "react-router-dom";

import Home from "./Components/Home";
import Tag from "./Components/TagList";
import NoMatch from "./Components/Nomatch";
import { AppBar, Typography } from "@mui/material";

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Typography variant="h6" color="inherit">
          PhoTag
        </Typography>
      </AppBar>
      <Home />
    </div>
  );
}

export default App;
