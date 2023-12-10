import { PlusOutlined } from "@ant-design/icons";
import { Button, notification } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingIndicator from "../common/LoadingIndicator";
import { POLL_LIST_SIZE } from "../constants";
import { castVote, getAllPolls, getUserCreatedPolls, getUserVotedPolls } from "../util/APIUtils";
import Poll from "./Poll";
import "./PollList.css";

function PollList({ username, type, handleLogout, isAuthenticated }) {
  const navigate = useNavigate();
  const [state, setState] = useState({
    polls: [],
    page: 0,
    size: 10,
    totalElements: 0,
    totalPages: 0,
    last: true,
    isLoading: false,
  });
  const [currentVotes, setCurrentVotes] = useState([]);

  const loadPollList = (page = 0, size = POLL_LIST_SIZE) => {
    let promise;
    if (username) {
      if (type === "USER_CREATED_POLLS") {
        promise = getUserCreatedPolls(username, page, size);
      } else if (type === "USER_VOTED_POLLS") {
        promise = getUserVotedPolls(username, page, size);
      }
    } else {
      promise = getAllPolls(page, size);
    }

    if (!promise) {
      return;
    }

    setState({
      isLoading: true,
    });

    promise
      .then((response) => {
        const polls = state.polls.slice();
        const currentVotesNew = currentVotes.slice();

        setState({
          polls: polls.concat(response.content),
          page: response.page,
          size: response.size,
          totalElements: response.totalElements,
          totalPages: response.totalPages,
          last: response.last,
          isLoading: false,
        });
        setCurrentVotes(currentVotesNew.concat(Array(response.content?.length).fill(null)));
      })
      .catch((error) => {
        setState({
          isLoading: false,
        });
      });
  };

  useEffect(() => {
    loadPollList();
  }, []);

  useEffect(() => {
    setState({
      polls: [],
      page: 0,
      size: 10,
      totalElements: 0,
      totalPages: 0,
      last: true,
      isLoading: false,
    });
    setCurrentVotes([]);
    loadPollList();
  }, [isAuthenticated]);

  const handleLoadMore = () => {
    loadPollList(state.page + 1);
  };

  const handleVoteChange = (event, pollIndex) => {
    const currentVotesNew = currentVotes.slice();
    currentVotesNew[pollIndex] = event.target.value;
    setCurrentVotes(currentVotesNew);
  };

  const handleVoteSubmit = (event, pollIndex) => {
    event.preventDefault();
    if (!isAuthenticated) {
      navigate("/login");
      notification.info({
        message: "Polling App",
        description: "Please login to vote.",
      });
      return;
    }

    const poll = state.polls[pollIndex];
    const selectedChoice = currentVotes[pollIndex];

    const voteData = {
      pollId: poll.id,
      choiceId: selectedChoice,
    };

    castVote(voteData)
      .then((response) => {
        const polls = state.polls.slice();
        polls[pollIndex] = response;
        setState({
          polls: polls,
        });
      })
      .catch((error) => {
        if (error.status === 401) {
          handleLogout("/login", "error", "You have been logged out. Please login to vote");
        } else {
          notification.error({
            message: "Polling App",
            description: error.message || "Sorry! Something went wrong. Please try again!",
          });
        }
      });
  };

  const pollViews = [];
  state.polls?.forEach((poll, pollIndex) => {
    pollViews.push(
      <Poll
        key={poll.id}
        poll={poll}
        currentVote={currentVotes[pollIndex]}
        handleVoteChange={(event) => handleVoteChange(event, pollIndex)}
        handleVoteSubmit={(event) => handleVoteSubmit(event, pollIndex)}
      />
    );
  });

  return (
    <div className="polls-container">
      {pollViews}
      {!state.isLoading && state.polls?.length === 0 ? (
        <div className="no-polls-found">
          <span>No Polls Found.</span>
        </div>
      ) : null}
      {!state.isLoading && !state.last ? (
        <div className="load-more-polls">
          <Button type="dashed" onClick={handleLoadMore} disabled={state.isLoading}>
            <PlusOutlined /> Load more
          </Button>
        </div>
      ) : null}
      {state.isLoading ? <LoadingIndicator /> : null}
    </div>
  );
}
export default PollList;
