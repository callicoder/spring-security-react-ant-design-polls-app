import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Select, notification } from "antd";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { MAX_CHOICES, POLL_CHOICE_MAX_LENGTH, POLL_QUESTION_MAX_LENGTH } from "../constants";
import { createPoll } from "../util/APIUtils";
import "./NewPoll.css";

const { Option } = Select;

function NewPoll() {
  const [question, setQuestion] = useState({
    text: "",
    validateStatus: "success",
    errorMsg: null,
  });
  const [choices, setChoices] = useState([{ text: "", validateStatus: "success", errorMsg: null }]);
  const [pollLength, setPollLength] = useState({ days: 1, hours: 0 });

  const addChoice = () => {
    const newChoices = choices.slice();
    newChoices.push({ text: "", validateStatus: "success", errorMsg: null });
    setChoices(newChoices);
  };

  const removeChoice = (choiceNumber) => {
    const newChoices = choices.slice();
    newChoices.splice(choiceNumber, 1);
    setChoices(newChoices);
  };

  const onFinish = (event) => {
    const pollData = {
      question: question.text,
      choices: choices.map((choice) => {
        return { text: choice.text };
      }),
      pollLength: pollLength,
    };

    createPoll(pollData)
      .then(() => {
        window.location.href = "/";
      })
      .catch((error) => {
        if (error.status === 401) {
          window.location.href = "/login";
          notification.error({
            message: "Polling App",
            description: "You have been logged out. Please login to create poll.",
          });
        } else {
          notification.error({
            message: "Polling App",
            description: error.message || "Sorry! Something went wrong. Please try again!",
          });
        }
      });
  };

  const onFinishFailed = (errorInfo) => {
    notification.error({
      message: "Polling App",
      description: errorInfo,
    });
  };

  const validateQuestion = (questionText) => {
    if (questionText.length === 0) {
      return {
        validateStatus: "error",
        errorMsg: "Please enter your question!",
      };
    } else if (questionText.length > POLL_QUESTION_MAX_LENGTH) {
      return {
        validateStatus: "error",
        errorMsg: `Question is too long (Maximum ${POLL_QUESTION_MAX_LENGTH} characters allowed)`,
      };
    } else {
      return {
        validateStatus: "success",
        errorMsg: null,
      };
    }
  };

  const handleQuestionChange = (event) => {
    const value = event.target.value;
    const newQuestion = { ...question, text: value, ...validateQuestion(value) };
    setQuestion(newQuestion);
  };

  const validateChoice = (choiceText) => {
    if (choiceText.length === 0) {
      return {
        validateStatus: "error",
        errorMsg: "Please enter a choice!",
      };
    } else if (choiceText.length > POLL_CHOICE_MAX_LENGTH) {
      return {
        validateStatus: "error",
        errorMsg: `Choice is too long (Maximum ${POLL_CHOICE_MAX_LENGTH} characters allowed)`,
      };
    } else {
      return {
        validateStatus: "success",
        errorMsg: null,
      };
    }
  };

  const handleChoiceChange = (event, choiceNumber) => {
    const value = event.target.value;
    const newChoices = choices.slice();
    const newChoice = { ...newChoices[choiceNumber], text: value, ...validateChoice(value) };
    newChoices[choiceNumber] = newChoice;
    setChoices(newChoices);
  };

  const handlePollDaysChange = (value) => {
    setPollLength((prevPollLength) => ({ ...prevPollLength, days: value }));
  };

  const handlePollHoursChange = (value) => {
    setPollLength((prevPollLength) => ({ ...prevPollLength, hours: value }));
  };

  const isFormInvalid = () => {
    if (question.validateStatus !== "success") {
      return true;
    }

    for (let i = 0; i < choices.length; i++) {
      const choice = choices[i];
      if (choice.validateStatus !== "success") {
        return true;
      }
    }

    return false;
  };

  const choiceViews = choices.map((choice, index) => (
    <PollChoice key={index} choice={choice} choiceNumber={index} removeChoice={removeChoice} handleChoiceChange={handleChoiceChange} />
  ));

  return (
    <div className="new-poll-container">
      <h1 className="page-title">Create Poll</h1>
      <div className="new-poll-content">
        <Form onFinish={onFinish} onFinishFailed={onFinishFailed} className="create-poll-form">
          <FormItem validateStatus={question.validateStatus} help={question.errorMsg} className="poll-form-row">
            <TextArea
              placeholder="Enter your question"
              style={{ fontSize: "16px" }}
              autosize={{ minRows: 3, maxRows: 6 }}
              name="question"
              value={question.text}
              onChange={handleQuestionChange}
            />
          </FormItem>

          {choiceViews}

          <FormItem className="poll-form-row">
            <Button type="dashed" onClick={addChoice} disabled={choices.length === MAX_CHOICES}>
              <PlusOutlined /> Add a choice
            </Button>
          </FormItem>

          <FormItem className="poll-form-row">
            <Col xs={24} sm={4}>
              Poll length:
            </Col>

            <Col xs={24} sm={20}>
              <span style={{ marginRight: "18px" }}>
                <Select name="days" defaultValue="1" onChange={handlePollDaysChange} value={pollLength.days} style={{ width: 60 }}>
                  {Array.from(Array(8).keys()).map((i) => (
                    <Option key={i}>{i}</Option>
                  ))}
                </Select>
              </span>

              <span>Days</span>

              <span style={{ marginLeft: "18px" }}>
                <Select name="hours" defaultValue="0" onChange={handlePollHoursChange} value={pollLength.hours} style={{ width: 60 }}>
                  {Array.from(Array(24).keys()).map((i) => (
                    <Option key={i}>{i}</Option>
                  ))}
                </Select>
              </span>

              <span>Hours</span>
            </Col>
          </FormItem>

          <FormItem className="poll-form-row">
            <Button type="primary" htmlType="submit" size="large" disabled={isFormInvalid()}>
              Create Poll
            </Button>
          </FormItem>
        </Form>
      </div>
    </div>
  );
}

function PollChoice({ choice, choiceNumber, removeChoice, handleChoiceChange }) {
  return (
    <FormItem validateStatus={choice.validateStatus} help={choice.errorMsg} className="poll-form-row">
      <Input
        placeholder={`Choice ${choiceNumber + 1}`}
        size="large"
        value={choice.text}
        className={choiceNumber > 1 ? "optional-choice" : null}
        onChange={(event) => handleChoiceChange(event, choiceNumber)}
      />

      {choiceNumber > 1 ? (
        <CloseOutlined className="dynamic-delete-button" disabled={choiceNumber <= 1} onClick={() => removeChoice(choiceNumber)} />
      ) : null}
    </FormItem>
  );
}

export default NewPoll;
