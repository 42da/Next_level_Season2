import React from "react";
import { Route, Routes } from "react-router-dom";

import SignIn from "./pages/SignIn";
import Main from "./pages/MainPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/main" element={<Main />} />
    </Routes>
  );
}

export default App;
