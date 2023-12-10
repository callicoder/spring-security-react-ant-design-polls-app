import { Avatar, Tabs } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingIndicator from "../../common/LoadingIndicator";
import NotFound from "../../common/NotFound";
import ServerError from "../../common/ServerError";
import PollList from "../../poll/PollList";
import { getUserProfile } from "../../util/APIUtils";
import { getAvatarColor } from "../../util/Colors";
import { formatDate } from "../../util/Helpers";
import "./Profile.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [serverError, setServerError] = useState(false);
  const { username } = useParams();

  const loadUserProfile = (username) => {
    setIsLoading(true);

    getUserProfile(username)
      .then((response) => {
        setUser(response);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.status === 404) {
          setNotFound(true);
        } else {
          setServerError(true);
        }
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadUserProfile(username);
  }, [username]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (notFound) {
    return <NotFound />;
  }

  if (serverError) {
    return <ServerError />;
  }

  const tabBarStyle = {
    textAlign: "center",
  };

  const items = [
    {
      key: "1",
      label: `${user?.pollCount} Polls`,
      children: <PollList username={username} type="USER_CREATED_POLLS" isAuthenticated={true}/>,
    },
    {
      key: "2",
      label: `${user?.voteCount} Votes`,
      children: <PollList username={username} type="USER_VOTED_POLLS" isAuthenticated={true}/>,
    },
  ];

  return (
    <div className="profile">
      {user && (
        <div className="user-profile">
          <div className="user-details">
            <div className="user-avatar">
              <Avatar className="user-avatar-circle" style={{ backgroundColor: getAvatarColor(user.name) }}>
                {user.name[0].toUpperCase()}
              </Avatar>
            </div>
            <div className="user-summary">
              <div className="full-name">{user.name}</div>
              <div className="username">@{user.username}</div>
              <div className="user-joined">Joined {formatDate(user.joinedAt)}</div>
            </div>
          </div>
          <div className="user-poll-details">
            <Tabs defaultActiveKey="1" centered animated={false} tabBarStyle={tabBarStyle} size="large" className="profile-tabs" items={items} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
