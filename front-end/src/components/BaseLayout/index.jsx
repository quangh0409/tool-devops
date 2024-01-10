import { Avatar, Button, Popover, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ROUTE } from "../../constants/router";

export default function BaseLayout(props) {
  const navigate = useNavigate();
  // const param = useLocation()
const fullName = localStorage.getItem("fullname")
  const fullname = useSelector((state) => state.admin.fullname);
  console.log(fullname);
  const content = (
    <div className="text-center">
      <Avatar size={70} icon={<UserOutlined />} />
      <p>{fullname || fullName}</p>
      <Button
        type="primary"
        danger
        onClick={() => {
          localStorage.clear();
          navigate("/");
        }}
      >
        Log out
      </Button>
    </div>
  );
  return (
    <div className="flex flex-col min-h-[100vh] overflow-y-auto z-1">
      <div className="h-24 shadow-lg flex gap-16 justify-between items-center px-5">
        <div className="flex gap-8">
          <p
            className="text-3xl font-bold hover:underline cursor-pointer pr-6"
            onClick={() => navigate(ROUTE.HOME)}
          >
            Template
          </p>
          <p
            className="text-3xl font-bold hover:underline cursor-pointer"
            onClick={() => navigate(ROUTE.SCAN)}
          >
            Scan
          </p>
        </div>
        <div>
          <Popover content={content}>
            <Avatar size={40} icon={<UserOutlined />} />
          </Popover>
        </div>
      </div>
      <hr />
      {props.children}
      <div className="mt-auto  ">
        <hr />
        <div className="text-blue-500 grid h-14 grid-cols-4 items-center ">
          <p className="cursor-pointer justify-self-center"> Information</p>
          <p className="justify-self-center cursor-pointer">Docs</p>
          <p className="justify-self-center cursor-pointer">Contact Tools</p>
          <p className="justify-self-center cursor-pointer">Blogs</p>
        </div>
      </div>
    </div>
  );
}
