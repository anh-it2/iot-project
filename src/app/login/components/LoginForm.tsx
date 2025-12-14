/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Typography } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AccountList from "./AccountList";

const { Title } = Typography;

interface LoginFormProps {
  onForgotPassword: () => void;
}

interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
}

export default function LoginForm({ onForgotPassword }: LoginFormProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (values: LoginFormData) => {
    setLoading(true);
    router.push("/iot");
  };

  const handleAccountSelect = (email: string, password: string) => {
    form.setFieldsValue({
      email,
      password,
    });
  };

  return (
    <>
      <div className="admin-login-header">
        <div className="logo">
          <Image
            src="/images/logo1.png"
            alt="logo"
            width={120}
            height={60}
            className="logo-image"
            priority
          />
        </div>
        <Title level={4} className="title">
          Please login to continue working
        </Title>
      </div>

      <Form
        form={form}
        name="login"
        className="admin-login-form"
        onFinish={handleSubmit}
        layout="vertical"
        requiredMark={false}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Email is required" },
            { type: "email", message: "Invalid email" },
          ]}
        >
          <Input
            size="large"
            placeholder="Enter your email"
            prefix={<MailOutlined style={{ color: "#999" }} />}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Password is required" }]}
        >
          <Input.Password
            size="large"
            placeholder="Enter your password"
            prefix={<LockOutlined style={{ color: "#999" }} />}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>

        <div className="form-options">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember password</Checkbox>
          </Form.Item>
          <Button
            type="link"
            className="forgot-password-link"
            onClick={onForgotPassword}
          >
            Forgot password?
          </Button>
        </div>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={loading}
            className="submit-button"
            block
          >
            Login
          </Button>
        </Form.Item>
      </Form>

      <AccountList onAccountSelect={handleAccountSelect} />
    </>
  );
}
