import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { lazy, Suspense } from "react";
const Dashboard = lazy(() => import("./AppComponents/Dashboard"));
const LogIn = lazy(() => import("./AppComponents/LogIn"));
const SignUp = lazy(() => import("./AppComponents/SignUp"));
const FinantialControl = lazy(() => import("./AppComponents/UI/UI"));
import './index.css';



export default function App() {

  const [users, setUsers] = useState([]);
  const [userLoggedIn, setUserLoggedIn] = useState(() => {
    const storedUser = sessionStorage.getItem("userLoggedIn");
    return storedUser ? parseInt(storedUser) : null;
  });

  useEffect(() => {
    if (userLoggedIn !== null) {
      sessionStorage.setItem("userLoggedIn", userLoggedIn.toString());
    } else {
      sessionStorage.removeItem("userLoggedIn");
    }
  }, [userLoggedIn]);

  //Hacer solicitud para obtención de usuarios a la API
  useEffect(() => {
    fetch('https://fca-api-5k3h.onrender.com/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(err => console.log(err))
  }, []);

  return (
    <div className="app_container">
      <HashRouter>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/log-in" element={<LogIn users={users} userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn} />} />
            <Route path="/sign-up" element={<SignUp users={users} setUsers={setUsers} setUserLoggedIn={setUserLoggedIn} />} />
            <Route
              path="/finantial_control"
              element={
                  userLoggedIn !== null ? 
                  <FinantialControl
                    users={users}
                    setUsers={setUsers}
                    userLoggedIn={userLoggedIn}
                    setUserLoggedIn={setUserLoggedIn} />
                    :
                    <Navigate to="/log-in" />
              }
            />
          </Routes>
        </Suspense>
      </HashRouter>
    </div>
  );
}