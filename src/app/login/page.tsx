"use client";

import { isAuthenticated } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import LoginForm from "./components/LoginForm";
import SuccessMessage from "./components/SuccessMessage";
import "./login.scss";

type AuthStep =
  | "login"
  | "forgot-password"
  | "otp-verification"
  | "new-password"
  | "success";

export default function LoginPage() {
  const [currentStep, setCurrentStep] = useState<AuthStep>("login");
  const [userEmail, setUserEmail] = useState("");
  const router = useRouter();

  const getLocaleFromPathname = () => {
    if (typeof window === "undefined") return "vi";
    const match = window.location.pathname.match(/^\/(vi|en)\b/);
    return (match?.[1] as "vi" | "en") || "vi";
  };

  // Kiểm tra nếu người dùng đã đăng nhập thì redirect về dashboard
  useEffect(() => {
    if (isAuthenticated()) {
      const locale = getLocaleFromPathname();
      router.replace(`/${locale}/public/home`);
    }
  }, [router]);

  const handleStepChange = (step: AuthStep, email?: string) => {
    setCurrentStep(step);
    if (email) {
      setUserEmail(email);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "login":
        return (
          <LoginForm
            onForgotPassword={() => handleStepChange("forgot-password")}
          />
        );
      case "forgot-password":
        return (
          <ForgotPasswordForm
            onBackToLogin={() => handleStepChange("login")}
            onOTPSent={(email) => handleStepChange("otp-verification", email)}
          />
        );
      case "success":
        return (
          <SuccessMessage onBackToLogin={() => handleStepChange("login")} />
        );
      default:
        return (
          <LoginForm
            onForgotPassword={() => handleStepChange("forgot-password")}
          />
        );
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-background">
        <div className="admin-login-card">
          {renderCurrentStep()}
          <div className="admin-login-footer">
            <p>Copy right</p>
          </div>
        </div>
      </div>
    </div>
  );
}
