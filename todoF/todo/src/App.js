import "./App.css";
import { BrowserRouter, Route, Routes, Outlet, Navigate } from "react-router-dom";
import Layout from "./components/Layouts/Layout";
import Home from "./pages/home/index";
import CreateTodo from "./pages/createTodo/CreateTodo";
import Login from "./pages/login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Settings from './pages/Settings/settings'
import MyTodos from './pages/MyTodos/myTodos'

function App() {
  const Auth = () => {
    const login = localStorage.getItem("token");
    // Redirect to /login if not logged in, otherwise render Outlet
    return login ? <Outlet /> : <Navigate to="/login" replace />;
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Define the login page as the default route */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protect other routes with authentication */}
          <Route element={<Auth />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/createtodo" element={<CreateTodo />} />
              <Route path="/edit-todo/:id" element={<CreateTodo />} />
              <Route path = '/logout' element={<Layout/>} />
              <Route path = '/settings' element={<Settings/>} />
              <Route path = '/mytodos' element={<MyTodos/>} />
              <Route path = '/profile' element={<Profile/>} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
