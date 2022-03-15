import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Log from "./components/Log";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Log />} />
        <Route exact path="/login" element={<Log />} />
        <Route
          exact
          path="/students"
          element={<Dashboard display={"students"} />}
        />
        <Route
          exact
          path="/students/add"
          element={<Dashboard display={"addStudent"} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
