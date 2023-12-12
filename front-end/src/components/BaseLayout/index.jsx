import React from "react";

export default function BaseLayout(props) {
  return (
    <div className="flex flex-col min-h-[100vh]">
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
