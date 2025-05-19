import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import JobDescription from "./components/JobDescription";
import Interview from "./components/Interview";
import Result from "./components/Result";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<JobDescription />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
