"use client";

import { MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, Typography } from "antd";
import Image from "next/image";
import { useState } from "react";

const { Title, Text } = Typography;

interface ForgotPasswordFormProps {
  onBackToLogin: () => void;
  onOTPSent: (email: string) => void;
}

interface ForgotPasswordData {
  email: string;
}

export default function ForgotPasswordForm({
  onBackToLogin,
  onOTPSent,
}: ForgotPasswordFormProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: ForgotPasswordData) => {
    setLoading(true);

    // Simulate API call to send OTP
    setTimeout(() => {
      setLoading(false);
      onOTPSent(values.email);
    }, 1500);
  };

  return (
    <>
      <div className="admin-login-header">
        <div className="logo">
          <Image
            src="/images/logo1.jpg"
            alt={"logo"}
            width={120}
            height={60}
            className="logo-image"
            priority
          />
        </div>
        <Title level={4} className="title">
          Please login to continue working
        </Title>
        <Text className="subtitle"></Text>
      </div>

      <Form
        form={form}
        name="forgot-password"
        className="admin-login-form"
        onFinish={handleSubmit}
        layout="vertical"
        requiredMark={false}
      >
        <Form.Item
          label="Email or Phone number"
          name="email"
          rules={[
            { required: true, message: "Email or phone number is required" },
            { type: "email", message: "Invalid email" },
          ]}
        >
          <Input
            size="large"
            placeholder="Enter your email"
            prefix={<MailOutlined style={{ color: "#999" }} />}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={loading}
            className="submit-button"
            block
          >
            Get OTP code
          </Button>
        </Form.Item>

        <div className="back-link">
          <Button type="link" onClick={onBackToLogin}>
            Back to login
          </Button>
        </div>
      </Form>
    </>
  );
}
