"use client";

import { CheckCircleOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useEffect, useState } from "react";

interface SuccessMessageProps {
  onBackToLogin: () => void;
}

export default function SuccessMessage({ onBackToLogin }: SuccessMessageProps) {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onBackToLogin();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onBackToLogin]);

  return (
    <>
      <div className="admin-login-header">
        <div className="logo">
          <Image
            src="/images/logo1.jpg"
            alt="logo"
            width={120}
            height={60}
            className="logo-image"
            priority
          />
        </div>
      </div>

      <div className="success-container">
        <div className="success-icon">
          <CheckCircleOutlined />
        </div>

        <h1 className="success-title">Login success</h1>

        <p className="success-message">Login success</p>

        <button className="submit-button" onClick={onBackToLogin}>
          Login now
        </button>

        <p className="countdown-text">count down {countdown}</p>
      </div>
    </>
  );
}
