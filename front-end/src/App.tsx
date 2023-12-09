import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./assets/components/Dashboard";
import Data from "./assets/components/Data";
import Employees from "./assets/components/AdminFunctionality/Users";
import Login from "./assets/components/Login";
import SignUp from "./assets/components/SignUp";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/data" element={<Data />} />
        <Route path="/users" element={<Employees />} />
        <Route path="/users" element={<Employees />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;

