import React from "react";
import { Route, Routes, Switch, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from './contexts/AuthContext';

import SignIn from "./pages/SignIn";
import Main from "./pages/Main";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = React.useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={props =>
        currentUser ? (
          <Component {...props} />
        ) : (
          <Navigate to="/login" />
        )
      }
    />
  );
};

function App() {
  return (
    <AuthProvider>
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/main" element={<Main />} />
    </Routes>
    </AuthProvider>
  );
}

export default App;
