import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../../constants/router";

export default function CardComponent(props) {
  const navigate = useNavigate();
  const { data } = props;
  const onClick = () => {
    navigate(ROUTE.TEMPLATEDETAIL.replace(":tab/:id", props.url));
  };
  return (
    <div className={`hover:${props.bg}  rounded-lg border  p-5 h-fit`}>
      <div className="flex justify-between items-end flex-row-reverse">
        <img alt="#" src="/images/logo1.svg" />
        <p className="text-xl font-semibold ">{data.name}</p>
      </div>
      <p className="max-h-[50px] h-full content">{data.description}</p>
      <div className="flex mt-2 justify-between ">
        <button onClick={onClick} className="button">
          Configure
        </button>
        <p className="flex items-center">
          {data.language}
          <span
            className={`w-4 h-4 ${props.color} ml-3 rounded-full border block`}
          ></span>
        </p>
      </div>
    </div>
  );
}
