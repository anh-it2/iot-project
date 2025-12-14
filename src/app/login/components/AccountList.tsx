"use client";

import { companies } from "@/utils/mockAuth";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Card, Collapse, Typography } from "antd";
import { useState } from "react";

const { Title, Text } = Typography;

interface AccountListProps {
  onAccountSelect?: (email: string, password: string) => void;
}

export default function AccountList({ onAccountSelect }: AccountListProps) {
  const [showPasswords, setShowPasswords] = useState(false);

  const handleAccountClick = (email: string, password: string) => {
    onAccountSelect?.(email, password);
  };

  const items = [
    {
      key: "1",
      label: (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Text type="secondary" style={{ fontSize: "13px" }}>
            Demo {companies.length} account
          </Text>
        </div>
      ),
      children: (
        <Card size="small" style={{ marginTop: "8px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "12px",
            }}
          >
            <Title level={5} style={{ margin: 0, fontSize: "14px" }}>
              Test account list
            </Title>
            <Button
              size="small"
              type="text"
              icon={showPasswords ? <EyeInvisibleOutlined /> : <EyeOutlined />}
              onClick={() => setShowPasswords(!showPasswords)}
            >
              {showPasswords ? "Hidden password" : "Show password"}
            </Button>
          </div>

          <div style={{ display: "grid", gap: "8px" }}>
            {companies.map((company, index) => (
              <div
                key={index}
                style={{
                  padding: "8px 12px",
                  border: "1px solid #f0f0f0",
                  borderRadius: "6px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  backgroundColor: "#fafafa",
                }}
                onClick={() =>
                  handleAccountClick(company.email, company.password)
                }
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#e6f7ff";
                  e.currentTarget.style.borderColor = "#1890ff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#fafafa";
                  e.currentTarget.style.borderColor = "#f0f0f0";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <Text strong style={{ color: "#1890ff", fontSize: "12px" }}>
                      {company.company.toUpperCase()}
                    </Text>
                    <br />
                    <Text style={{ fontSize: "11px", color: "#666" }}>
                      {company.email}
                    </Text>
                  </div>
                  {showPasswords && (
                    <Text code style={{ fontSize: "11px" }}>
                      {company.password}
                    </Text>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: "12px",
              padding: "8px",
              backgroundColor: "#f6ffed",
              borderRadius: "4px",
            }}
          >
            <Text style={{ fontSize: "11px", color: "#52c41a" }}>
              Click on any account to automatically fill login information
            </Text>
          </div>
        </Card>
      ),
    },
  ];

  return (
    <div style={{ marginTop: "24px" }}>
      <Collapse ghost items={items} />
    </div>
  );
}
