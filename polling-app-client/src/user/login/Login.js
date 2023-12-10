import { Link, useNavigate } from "react-router-dom";
import { ACCESS_TOKEN } from "../../constants";
import { login } from "../../util/APIUtils";
import "./Login.css";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, notification } from "antd";

const { Item: FormItem } = Form;

function Login({ onLogin }) {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    const loginRequest = { ...values };
    login(loginRequest)
      .then((response) => {
        localStorage.setItem(ACCESS_TOKEN, response.accessToken);
        onLogin();
      })
      .catch((error) => {
        if (error.status === 401) {
          notification.error({
            message: "Polling App",
            description: "Your Username or Password is incorrect. Please try again!",
          });
        } else {
          notification.error({
            message: "Polling App",
            description: error.message || "Sorry! Something went wrong. Please try again!",
          });
        }
      });
  };

  return (
    <div className="login-container">
      <h1 className="page-title">Login</h1>
      <div className="login-content">
        <Form form={form} onFinish={handleSubmit} className="login-form">
          <FormItem name="usernameOrEmail" rules={[{ required: true, message: "Please input your username or email!" }]}>
            <Input prefix={<UserOutlined />} size="large" placeholder="Username or Email" />
          </FormItem>
          <FormItem name="password" rules={[{ required: true, message: "Please input your Password!" }]}>
            <Input prefix={<LockOutlined />} size="large" type="password" placeholder="Password" />
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" size="large" className="login-form-button">
              Login
            </Button>
            Or <Link to="/signup">register now!</Link>
          </FormItem>
        </Form>
      </div>
    </div>
  );
}

export default Login;
