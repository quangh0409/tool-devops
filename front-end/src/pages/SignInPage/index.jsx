import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import { Button, Checkbox, Form, Input } from "antd";

export default function SignInPage() {
  const navigate = useNavigate();
  const handleSignUp = () => {
    navigate("/home");
  };
  return (
    <div className=" bgSignIn h-[100vh]">
      <div className="max-w-7xl mx-auto h-full flex justify-end items-center">
        <div className=" w-1/3">
          <p className="text-3xl font-bold  mb-3">Đăng nhập</p>
          <Form layout="vertical" onFinish={handleSignUp}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Vui lòng nhập email" }]}
            >
              <Input size="large" type="text" placeholder="Email" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập password" }]}
            >
              <Input.Password size="large" placeholder="Password" />
            </Form.Item>
            <div className="flex justify-between mb-2">
              <Checkbox>Remember me</Checkbox>
              <Link className="underline hover:underline">Quên mật khẩu ?</Link>
            </div>
            <Form.Item className="text-center">
              <Button
                className="w-full mt-3 bg-blue-300 text-white"
                size="large"
                htmlType="submit"
              >
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
