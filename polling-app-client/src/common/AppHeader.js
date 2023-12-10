import { DownOutlined, HomeTwoTone, UserOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import pollIcon from "../poll.svg";
import "./AppHeader.css";
const Header = Layout.Header;

function AppHeader({ currentUser, onLogout }) {
  const location = useLocation();

  let items;
  if (currentUser) {
    items = [
      {
        key: "/",
        label: (
          <Link to="/">
            <HomeTwoTone className="nav-icon" />
          </Link>
        ),
      },
      {
        key: "/poll/new",
        label: (
          <Link to="/poll/new">
            <img src={pollIcon} alt="poll" className="poll-icon" />
          </Link>
        ),
      },
      {
        key: "/profile",
        className: "profile-menu",
        label: (
          <>
            <UserOutlined className="nav-icon" style={{ marginRight: 0 }} />
            <DownOutlined />
          </>
        ),
        children: [
          {
            key: "user-info",
            disabled: true,
            className: "profile-dropdown-menu",
            label: (
              <>
                <div className="user-full-name-info">{currentUser.name}</div>
                <div className="username-info">@{currentUser.username}</div>
              </>
            ),
          },
          {
            type: "divider",
          },
          { key: "profile", label: <Link to={`/users/${currentUser.username}`}>Profile</Link> },
          { key: "logout", label: "Logout", onClick: onLogout },
        ],
      },
    ];
  } else {
    items = [
      {
        key: "/login",
        label: (
          <Link to="/login">
            <UserOutlined className="nav-icon" style={{ marginRight: 0 }} />
            Login
          </Link>
        ),
      },
      {
        key: "/signup",
        label: <Link to="/signup">Signup</Link>,
      },
    ];
  }

  return (
    <Header className="app-header">
      <div className="container">
        <div className="app-title">
          <Link to="/">Polling App</Link>
        </div>
        <Menu className="app-menu" mode="horizontal" selectedKeys={[location.pathname]} style={{ lineHeight: "64px" }} items={items} />
      </div>
    </Header>
  );
}

export default AppHeader;
