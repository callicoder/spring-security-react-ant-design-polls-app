import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";

import { ACCESS_TOKEN } from "../constants";
import { getCurrentUser } from "../util/APIUtils";

import AppHeader from "../common/AppHeader";
import LoadingIndicator from "../common/LoadingIndicator";
import NotFound from "../common/NotFound";
import NewPoll from "../poll/NewPoll";
import PollList from "../poll/PollList";
import Login from "../user/login/Login";
import Profile from "../user/profile/Profile";
import Signup from "../user/signup/Signup";

import { Layout, notification } from "antd";
const { Content } = Layout;

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    notification.config({
      placement: "topRight",
      top: 70,
      duration: 3,
    });

    getCurrentUser()
      .then((response) => {
        setCurrentUser(response);
        setIsAuthenticated(true);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }, []);

  const handleLogout = ({ redirectTo = "/", notificationType = "success", description = "You're successfully logged out." }) => {
    localStorage.removeItem(ACCESS_TOKEN);

    setCurrentUser(null);
    setIsAuthenticated(false);

    navigate(redirectTo);

    notification[notificationType]({
      message: "Polling App",
      description: description,
    });
  };

  const handleLogin = () => {
    notification.success({
      message: "Polling App",
      description: "You're successfully logged in.",
    });
    getCurrentUser()
      .then((response) => {
        setCurrentUser(response);
        setIsAuthenticated(true);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
    navigate("/");
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <Layout className="app-container">
      <AppHeader isAuthenticated={isAuthenticated} currentUser={currentUser} onLogout={handleLogout} />

      <Content className="app-content">
        <div className="container">
          <Routes>
            <Route path="/" element={<PollList isAuthenticated={isAuthenticated} currentUser={currentUser} handleLogout={handleLogout} />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/users/:username" element={<Profile />} />
            <Route path="/poll/new" element={<NewPoll />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Content>
    </Layout>
  );
}

export default App;
