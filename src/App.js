import "./App.css";
import { Link, Route, Routes } from "react-router-dom";

import Home from "./Components/Home";
import Tag from "./Components/AddTag";
import NoMatch from "./Components/Nomatch";
import { AppBar, Typography } from "@mui/material";

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Typography variant="h6" color="inherit">
          PhoTag
        </Typography>
        <ul>
          <Link to="/">/HOME</Link>
          <Link to="/Tag">/Tag List</Link>
        </ul>
      </AppBar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Tag" element={<Tag />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
}

export default App;
